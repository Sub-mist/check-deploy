import type { AnalysisResult } from "../types";
import { StatBadge } from "./StatBadge";

interface OverviewPanelProps {
  isDarkMode: boolean;
  result: AnalysisResult | null;
}

export function OverviewPanel({ isDarkMode, result }: OverviewPanelProps) {
  if (!result) return null;

  return (
    <div
      className={`shrink-0 rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 border-4 transition-colors ${isDarkMode ? "bg-black border-white shadow-[8px_8px_0_0_#fff]" : "bg-white/90 border-slate-900 shadow-[8px_8px_0_0_#0f172a]"}`}
    >
      <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            className={`${isDarkMode ? "text-slate-800" : "text-slate-200"} stroke-current`}
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className={`${result.readinessScore > 80 ? "text-emerald-500" : result.readinessScore > 50 ? "text-amber-500" : "text-red-500"} stroke-current transition-all duration-1000 ease-out`}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * result.readinessScore) / 100}
            strokeLinecap="round"
          />
        </svg>
        <span
          className={`absolute text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          {result.readinessScore}%
        </span>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2
          className={`text-2xl font-black uppercase mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          Readiness Score & Progress
        </h2>

        {result.projectType && result.primaryLanguage && (
          <div
            className={`flex flex-wrap gap-2 mb-3 text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}
          >
            <span
              className={`px-2 py-1 rounded-md border-2 ${isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-300 bg-slate-100"} ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              {result.projectType}
            </span>
            <span
              className={`px-2 py-1 rounded-md border-2 ${isDarkMode ? "border-indigo-800 bg-indigo-900/30" : "border-indigo-300 bg-indigo-50"} text-indigo-500`}
            >
              {result.primaryLanguage}
            </span>
          </div>
        )}

        <p
          className={`font-medium text-lg leading-snug mb-5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
        >
          {result.readinessSummary}
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <StatBadge
            count={result.risks?.length || 0}
            label={result.risks?.length === 1 ? "Risk" : "Risks"}
            color="red"
            isDarkMode={isDarkMode}
          />
          <StatBadge
            count={result.features?.length || 0}
            label={
              result.features?.length === 1
                ? "Feature Needed"
                : "Features Needed"
            }
            color="indigo"
            isDarkMode={isDarkMode}
          />
          <StatBadge
            count={result.solutions?.length || 0}
            label={
              result.solutions?.length === 1
                ? "Fix Recommended"
                : "Fixes Recommended"
            }
            color="blue"
            isDarkMode={isDarkMode}
          />
          <StatBadge
            count={result.implemented?.length || 0}
            label={
              result.implemented?.length === 1
                ? "Check Passed"
                : "Checks Passed"
            }
            color="emerald"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}
