export type KanbanItem = {
  title: string;
  description: string;
  path: string;
  priorityOrStatus: string;
  category: string;
};

export type DetailedCheck = {
  id: number;
  categoryName: string;
  status: "Pass" | "Fail" | "Warn" | "Unknown";
  findings: string;
  items?: KanbanItem[];
};

export type AnalysisResult = {
  isValidProject?: boolean;
  errorMessage?: string;
  readinessScore: number;
  readinessSummary: string;
  projectType: string;
  primaryLanguage: string;
  detailedChecks?: DetailedCheck[];
  features: KanbanItem[];
  risks: KanbanItem[];
  solutions: KanbanItem[];
  implemented: KanbanItem[];
};

export type HistoryItem = {
  id: string;
  timestamp: number;
  projectPath: string;
  result: AnalysisResult;
};
