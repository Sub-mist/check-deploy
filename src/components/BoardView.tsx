import { useState } from "react";
import type { AnalysisResult } from "../types";
import { KanbanColumn } from "./KanbanColumn";
import { DetailedBoard } from "./DetailedBoard";

interface BoardViewProps {
  isDarkMode: boolean;
  result: AnalysisResult | null;
  recheckCategory?: (
    projectPath: string,
    checkId: number,
    categoryName: string,
  ) => void;
  recheckingId?: number | null;
  projectPath?: string;
  isLoadingDetails?: boolean;
}

export function BoardView({
  isDarkMode,
  result,
  recheckCategory,
  recheckingId,
  projectPath,
  isLoadingDetails,
}: BoardViewProps) {
  const [boardMode, setBoardMode] = useState<"default" | "detailed">("default");

  if (!result) return null;

  return (
    <div className="flex flex-col h-full min-h-[0] gap-4">
      <div className="flex justify-start shrink-0 items-center gap-4">
        <select
          value={boardMode}
          onChange={(e) =>
            setBoardMode(e.target.value as "default" | "detailed")
          }
          className={`px-3 py-2 rounded-md font-bold text-sm border-2 focus:outline-none transition-all ${
            isDarkMode
              ? "border-white shadow-[4px_4px_0_0_#fff] bg-black text-white"
              : "border-slate-900 shadow-[4px_4px_0_0_#0f172a] bg-white text-slate-900"
          }`}
        >
          <option value="default">Default</option>
          <option value="detailed">Detailed</option>
        </select>

        {isLoadingDetails && (
          <div
            className={`text-sm font-bold flex items-center gap-2 animate-pulse ${isDarkMode ? "text-amber-300" : "text-amber-600"}`}
          >
            <span className="w-2 h-2 rounded-full bg-current"></span>
            Generating detailed checks...
          </div>
        )}
      </div>

      {boardMode === "default" ? (
        <div className="flex-1 min-h-[0] overflow-y-auto md:overflow-visible pl-1 pr-3 md:pr-0">
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 pb-6 md:pb-2 h-auto md:h-full">
            <KanbanColumn
              isDarkMode={isDarkMode}
              title="Features Needed"
              count={result.features?.length || 0}
              items={result.features || []}
              borderColor="border-l-indigo-400"
              pillClass={
                isDarkMode
                  ? "bg-indigo-950 text-indigo-200 border-white"
                  : "bg-indigo-200 text-indigo-900 border-slate-900"
              }
            />
            <KanbanColumn
              isDarkMode={isDarkMode}
              title="Risk & Issues"
              count={result.risks?.length || 0}
              items={result.risks || []}
              borderColor="border-l-red-500"
              pillClass={
                isDarkMode
                  ? "bg-red-950 text-red-200 border-white"
                  : "bg-red-200 text-red-900 border-slate-900"
              }
            />
            <KanbanColumn
              isDarkMode={isDarkMode}
              title="AI Recommended Fixes"
              count={result.solutions?.length || 0}
              items={result.solutions || []}
              borderColor="border-l-blue-400"
              pillClass={
                isDarkMode
                  ? "bg-blue-950 text-blue-200 border-white"
                  : "bg-blue-200 text-blue-900 border-slate-900"
              }
            />
            <KanbanColumn
              isDarkMode={isDarkMode}
              title="Already Implemented"
              count={result.implemented?.length || 0}
              items={result.implemented || []}
              borderColor="border-l-emerald-400"
              pillClass={
                isDarkMode
                  ? "bg-emerald-950 text-emerald-200 border-white"
                  : "bg-emerald-200 text-emerald-900 border-slate-900"
              }
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 relative min-h-[0] flex flex-col">
          <DetailedBoard
            isDarkMode={isDarkMode}
            result={result}
            recheckCategory={recheckCategory}
            recheckingId={recheckingId}
            projectPath={projectPath}
          />
          {isLoadingDetails && (
            <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div
                className={`p-6 border-4 rounded-xl font-bold shadow-[8px_8px_0_0] ${
                  isDarkMode
                    ? "bg-black border-white text-white shadow-white"
                    : "bg-white border-slate-900 text-slate-900 shadow-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
                  Analyzing 20 architecture categories...
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
