import { RefreshCw } from "lucide-react";
import type { AnalysisResult } from "../types";
import { Badge } from "./Badge";

export function DetailedBoard({
  isDarkMode,
  result,
  recheckCategory,
  recheckingId,
  projectPath,
}: {
  isDarkMode: boolean;
  result: AnalysisResult;
  recheckCategory?: (
    projectPath: string,
    checkId: number,
    categoryName: string,
  ) => void;
  recheckingId?: number | null;
  projectPath?: string;
}) {
  const checks = result.detailedChecks || [];

  return (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12 items-start">
        {checks.map((check) => {
          let statusColor: string;
          let icon: string;
          let borderLeftColor: string;

          if (check.status === "Pass") {
            statusColor = isDarkMode
              ? "text-emerald-400 border-emerald-500 bg-emerald-950/30"
              : "text-emerald-700 border-emerald-500 bg-emerald-50";
            icon = "✅";
            borderLeftColor = "border-l-emerald-400";
          } else if (check.status === "Fail") {
            statusColor = isDarkMode
              ? "text-red-400 border-red-500 bg-red-950/30"
              : "text-red-700 border-red-500 bg-red-50";
            icon = "❌";
            borderLeftColor = "border-l-red-500";
          } else if (check.status === "Warn") {
            statusColor = isDarkMode
              ? "text-amber-400 border-amber-500 bg-amber-950/30"
              : "text-amber-700 border-amber-500 bg-amber-50";
            icon = "⚠️";
            borderLeftColor = "border-l-amber-400";
          } else {
            statusColor = isDarkMode
              ? "text-slate-400 border-slate-500 bg-slate-800"
              : "text-slate-500 border-slate-300 bg-slate-100";
            icon = "❔";
            borderLeftColor = "border-l-slate-400";
          }

          const isRechecking = recheckingId === check.id;

          return (
            <div
              key={check.id}
              className={`rounded-xl p-4 border-2 shadow-sm flex flex-col transition-transform hover:-translate-y-1 ${isDarkMode ? "bg-black border-white shadow-[4px_4px_0_0_#fff]" : "bg-white border-slate-900 shadow-[4px_4px_0_0_#0f172a]"}`}
            >
              <div className="flex items-start gap-2 mb-2">
                <div
                  className={`shrink-0 px-2 py-1 rounded-md text-xs font-black border-2 uppercase ${statusColor}`}
                >
                  {icon} {check.status}
                </div>
              </div>
              <h3
                className={`font-black text-sm mb-2 leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {check.categoryName}
              </h3>
              <p
                className={`text-xs font-medium leading-relaxed mb-4 flex-1 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                {check.findings}
              </p>

              <div className="flex flex-col gap-3 mt-auto mb-4">
                {check.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-md p-3 border-2 border-l-8 ${borderLeftColor} ${isDarkMode ? "border-t-white border-r-white border-b-white bg-slate-900/50" : "border-slate-900 bg-slate-50"} shrink-0`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h4
                        className={`font-bold text-xs leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {item.title}
                      </h4>
                      <Badge
                        text={item.priorityOrStatus}
                        isDarkMode={isDarkMode}
                      />
                    </div>
                    <div
                      className={`text-[10px] font-mono font-semibold mb-1 truncate ${isDarkMode ? "text-slate-300" : "text-slate-500"}`}
                    >
                      {item.path}
                    </div>
                    <p
                      className={`text-xs leading-snug font-medium mt-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {recheckCategory && projectPath && (
                <button
                  onClick={() =>
                    recheckCategory(projectPath, check.id, check.categoryName)
                  }
                  disabled={isRechecking || recheckingId !== null}
                  className={`mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-md font-bold text-xs border-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${isDarkMode ? "bg-slate-800 text-white border-white hover:bg-slate-700" : "bg-slate-100 text-slate-900 border-slate-900 hover:bg-slate-200"}`}
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isRechecking ? "animate-spin" : ""}`}
                  />
                  {isRechecking ? "Rechecking..." : "Recheck"}
                </button>
              )}
            </div>
          );
        })}
        {checks.length === 0 && (
          <div
            className={`col-span-full text-center p-8 border-4 border-dashed rounded-xl font-bold ${isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-300 text-slate-400"}`}
          >
            Detailed checks data is not available for this run. Try re-running
            the check.
          </div>
        )}
      </div>
    </div>
  );
}
