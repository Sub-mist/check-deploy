import { useState } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, DetailedCheck } from "../types";
import { mockDataFallback } from "../utils/mockData";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itemSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    path: { type: Type.STRING },
    priorityOrStatus: {
      type: Type.STRING,
      description: "e.g. High, Medium, Low, or Done",
    },
    category: {
      type: Type.STRING,
      description: "e.g. Security, Performance, UX, Backend, Infra, Legal",
    },
  },
};

const detailedCheckSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.INTEGER, description: "Check ID from 1 to 20" },
    categoryName: {
      type: Type.STRING,
      description: "Name of the check category (e.g. '1. Core Functionality')",
    },
    status: {
      type: Type.STRING,
      description: "'Pass', 'Fail', 'Warn', or 'Unknown'",
    },
    findings: {
      type: Type.STRING,
      description:
        "1-2 short sentences summarizing the finding for this specific category",
    },
    items: {
      type: Type.ARRAY,
      items: itemSchema,
      description:
        "List of specific findings or actions for this category, detailing path, priority, description, etc.",
    },
  },
};

export function useAiAnalysis(
  saveToHistory: (path: string, res: AnalysisResult) => void,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [recheckingId, setRecheckingId] = useState<number | null>(null);
  const [loadingText, setLoadingText] = useState("Checking...");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recheckCategory = async (
    projectPath: string,
    checkId: number,
    categoryName: string,
  ) => {
    if (!projectPath.trim() || !result) return;
    setRecheckingId(checkId);
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY is not defined.");
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are re-evaluating a SINGLE deployment readiness check for the following project.
        Project: ${projectPath}
        Project Type: ${result.projectType}
        Primary Language: ${result.primaryLanguage}
        
        Check to Re-evaluate: "${categoryName}"
        
        Provide the updated analysis for this single check. Try to give specific actionable items based on the project path structure.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: detailedCheckSchema,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received while rechecking category.");
      }

      const parsed = JSON.parse(responseText.trim()) as DetailedCheck;

      setResult((prev) => {
        if (!prev) return prev;
        const updatedChecks = prev.detailedChecks?.map((c) =>
          c.id === checkId ? { ...c, ...parsed, id: checkId } : c,
        );
        const newResult = { ...prev, detailedChecks: updatedChecks };
        saveToHistory(projectPath, newResult);
        return newResult;
      });
    } catch (err) {
      console.error(err);
      // On failure, don't break the whole app, just clear loading state
    } finally {
      setRecheckingId(null);
    }
  };

  const analyzeProject = async (projectPath: string) => {
    if (!projectPath.trim()) return;
    setIsLoading(true);
    setIsLoadingDetails(false);
    setError(null);
    setLoadingText("Phase 1: Scanning Directory Structure...");

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY is not defined.");
      }

      // STEP 0: SCAN DIRECTORY STRUCTURE
      let structureString = "DIRECTORY SCAN UNAVAILABLE. Please make realistic assumptions based on common project structures for the given path name.";
      try {
        const scanResponse = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectPath }),
        });
        const scanData = await scanResponse.json();
        if (scanData.structure && !scanData.error) {
          structureString = JSON.stringify(scanData.structure, null, 2);
        } else if (scanData.error) {
          console.warn("Scan server error:", scanData.error);
        }
      } catch (e) {
        console.warn("Could not connect to scan server. Ensure 'npm run server' is active.", e);
      }

      setLoadingText("Phase 2: Analyzing Core, Security & Env...");

      // CALL 1: OVERVIEW & OVERALL METRICS
      const overviewResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following project and provide a highly detailed high-level deployment readiness report.
        
Project Path: ${projectPath}
Directory Structure:
${structureString}

---

Step 1: Validate Input
- Determine if the project path and structure look like a valid software project.
- If invalid, return: isValidProject: false, errorMessage: "..."
- Otherwise: isValidProject: true

---

Step 2: Generate High-Level Assessment
If valid, classify the software type and primary language based on the files present (e.g., presence of package.json, requirements.txt, etc.). Evaluate its readiness for deployment. Focus strongly on actionable Kanban items.

Return the JSON structure as requested.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isValidProject: { type: Type.BOOLEAN },
              errorMessage: { type: Type.STRING },
              readinessScore: {
                type: Type.INTEGER,
                description: "A score from 0 to 100",
              },
              readinessSummary: { type: Type.STRING },
              projectType: {
                type: Type.STRING,
                description: "Type of software",
              },
              primaryLanguage: {
                type: Type.STRING,
                description: "Main language/framework",
              },
              features: { type: Type.ARRAY, items: itemSchema },
              risks: { type: Type.ARRAY, items: itemSchema },
              solutions: { type: Type.ARRAY, items: itemSchema },
              implemented: { type: Type.ARRAY, items: itemSchema },
            },
          },
        },
      });

      const overviewText = overviewResponse.text;
      if (!overviewText) {
        throw new Error("Empty overview response received from AI.");
      }

      const parsedOverview = JSON.parse(overviewText.trim()) as AnalysisResult;

      if (
        parsedOverview.isValidProject === false ||
        parsedOverview.errorMessage
      ) {
        setError(parsedOverview.errorMessage || "Invalid project path.");
        setResult(null);
        setIsLoading(false);
        return;
      }

      // Initialize result with overview data and empty detailed checks
      setResult({ ...parsedOverview, detailedChecks: [] });
      setIsLoading(false); // Stop main loading spinner, let user see Overview
      setIsLoadingDetails(true);

      // CALL 2: DETAILED CHECKS
      const detailsResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Now that you have assessed the project: ${projectPath}
Directory Structure:
${structureString}

Type: ${parsedOverview.projectType}
Language: ${parsedOverview.primaryLanguage}

Perform a deep production-readiness analysis across exactly 20 categories.
Use the DIRECTORY STRUCTURE to identify SPECIFIC missing files or configurations (e.g., missing .env.example, missing tests/ folder, missing Dockerfile).
Assign a status ("Pass", "Warn", "Fail") to each category.
Provide granular actionable checklist items.

The 20 Categories:
1. Core Functionality
2. Security
3. Performance
4. SEO
5. Responsiveness
6. Theming
7. Testing
8. Logging & Monitoring
9. CI/CD
10. Environment Management
11. UX Details
12. Backend / API Readiness
13. Database
14. Deployment Infra
15. Legal / Compliance
16. Cleanup Before Deploy
17. Analytics
18. Failure Handling
19. Authentication Edge Cases
20. Build Check`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              detailedChecks: {
                type: Type.ARRAY,
                items: detailedCheckSchema,
              },
            },
          },
        },
      });

      const detailsText = detailsResponse.text;
      if (!detailsText) {
        throw new Error("Empty detailed checks response received from AI.");
      }

      const parsedDetails = JSON.parse(detailsText.trim());
      const finalResult = {
        ...parsedOverview,
        detailedChecks: parsedDetails.detailedChecks,
      };

      setResult(finalResult);
      saveToHistory(projectPath, finalResult);
    } catch (err) {
      console.error(err);
      setError("AI generation failed. Using mock data for demonstration.");
      setResult(mockDataFallback);
      saveToHistory(projectPath, mockDataFallback);
    } finally {
      setIsLoading(false);
      setIsLoadingDetails(false);
    }
  };

  return {
    isLoading,
    isLoadingDetails,
    loadingText,
    result,
    setResult,
    error,
    setError,
    analyzeProject,
    recheckCategory,
    recheckingId,
  };
}
