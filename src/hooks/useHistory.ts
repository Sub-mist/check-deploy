import { useState, useEffect } from "react";
import type { AnalysisResult, HistoryItem } from "../types";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("checkdeploy_history");
    if (!saved) return [];
    try {
      const parsed: HistoryItem[] = JSON.parse(saved);
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      return parsed.filter((item) => item.timestamp >= thirtyDaysAgo);
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("checkdeploy_history");
    if (saved) {
      try {
        const parsed: HistoryItem[] = JSON.parse(saved);
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const recentHistory = parsed.filter(
          (item) => item.timestamp >= thirtyDaysAgo,
        );
        if (recentHistory.length < parsed.length) {
          localStorage.setItem(
            "checkdeploy_history",
            JSON.stringify(recentHistory),
          );
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const saveToHistory = (path: string, res: AnalysisResult) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      projectPath: path,
      result: res,
    };
    setHistory((prev) => {
      const updated = [
        newItem,
        ...prev.filter(
          (h) =>
            h.projectPath !== path ||
            h.result.readinessScore !== res.readinessScore,
        ),
      ].slice(0, 20);
      localStorage.setItem("checkdeploy_history", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      localStorage.setItem("checkdeploy_history", JSON.stringify(updated));
      return updated;
    });
  };

  return {
    history,
    isHistoryOpen,
    setIsHistoryOpen,
    saveToHistory,
    deleteHistoryItem,
  };
}
