import { FolderOpen, RefreshCw } from "lucide-react";
import type { AnalysisResult } from "../types";

interface SearchBarProps {
  isDarkMode: boolean;
  projectPath: string;
  setProjectPath: (val: string) => void;
  isLoading: boolean;
  loadingText: string;
  handleCheck: () => void;
  error: string | null;
  result: AnalysisResult | null;
  view: "overview" | "board";
  setView: (val: "overview" | "board") => void;
}

export function SearchBar({
  isDarkMode,
  projectPath,
  setProjectPath,
  isLoading,
  loadingText,
  handleCheck,
  error,
  result,
  view,
  setView,
}: SearchBarProps) {
  return (
    <div
      className={`p-5 pl-5 pr-5 border-b-4 shrink-0 transition-colors duration-300 ${isDarkMode ? "bg-black border-white" : "bg-white border-slate-900"}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* hidden elements keep HTML structure but remove from view since new design moves search to header bar */}
        <h1 className="sr-only">Analyze Your Project</h1>
        <p className="sr-only">
          Enter your project path and get a structured overview of features,
          risks, and implemented modules.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <div
            className={`font-bold text-sm hidden sm:block ${isDarkMode ? "text-white" : "text-slate-800"}`}
          >
            Project Path:
          </div>
          <div className="relative w-full sm:w-[500px]">
            <div
              className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDarkMode ? "text-white" : "text-slate-500"}`}
            >
              <FolderOpen className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              value={projectPath}
              onChange={(e) => setProjectPath(e.target.value)}
              className={`block w-full pl-9 pr-3 py-2 border-2 rounded-md font-mono text-sm font-semibold focus:outline-none transition-all ${isDarkMode ? "bg-black text-white border-white shadow-[4px_4px_0_0_#fff] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_#fff] placeholder-slate-400" : "bg-white text-slate-900 border-slate-900 shadow-[4px_4px_0_0_#0f172a] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0_0_#0f172a] placeholder-slate-400"}`}
              placeholder="e.g. C:\Users\... or 'React + Node.js E-commerce app'"
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={isLoading || !projectPath.trim()}
            className={`flex items-center justify-center gap-2 px-6 py-2 border-2 font-black rounded-md disabled:opacity-70 disabled:cursor-not-allowed transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:shadow-none disabled:translate-x-[4px] disabled:translate-y-[4px] ${isDarkMode ? "border-white shadow-[4px_4px_0_0_#fff] bg-emerald-600 text-white hover:bg-emerald-500" : "border-slate-900 shadow-[4px_4px_0_0_#0f172a] bg-emerald-400 text-slate-900 hover:bg-emerald-300"}`}
          >
            {isLoading ? (
              <RefreshCw
                className="h-4 w-4 animate-spin text-current"
                strokeWidth={2.5}
              />
            ) : null}
            {isLoading ? loadingText : "Check"}
          </button>
        </div>

        {error && (
          <p
            className={`mt-3 text-sm py-1.5 px-4 rounded-md font-bold border-2 inline-block mx-auto ${isDarkMode ? "text-red-200 bg-red-900 border-white shadow-[2px_2px_0_0_#fff]" : "text-red-800 bg-red-200 border-slate-900 shadow-[2px_2px_0_0_#0f172a]"}`}
          >
            {error}
          </p>
        )}

        {result && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setView("overview")}
              className={`px-6 py-2 border-2 font-bold rounded-md transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                view === "overview"
                  ? isDarkMode
                    ? "bg-white text-black border-white shadow-[4px_4px_0_0_#fff]"
                    : "bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0_0_#0f172a]"
                  : isDarkMode
                    ? "bg-black text-white border-white hover:bg-white/10"
                    : "bg-white text-slate-900 border-slate-900 hover:bg-slate-100"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setView("board")}
              className={`px-6 py-2 border-2 font-bold rounded-md transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                view === "board"
                  ? isDarkMode
                    ? "bg-white text-black border-white shadow-[4px_4px_0_0_#fff]"
                    : "bg-slate-900 text-white border-slate-900 shadow-[4px_4px_0_0_#0f172a]"
                  : isDarkMode
                    ? "bg-black text-white border-white hover:bg-white/10"
                    : "bg-white text-slate-900 border-slate-900 hover:bg-slate-100"
              }`}
            >
              Board
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
