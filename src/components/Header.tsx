import { Sun, Moon, History, Download } from "lucide-react";
import type { AnalysisResult } from "../types";
import { handleDownload } from "../utils/exportUtils";

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (val: boolean) => void;
  downloadFormat: "md" | "pdf";
  setDownloadFormat: (val: "md" | "pdf") => void;
  result: AnalysisResult | null;
  projectPath: string;
}

export function Header({
  isDarkMode,
  setIsDarkMode,
  isHistoryOpen,
  setIsHistoryOpen,
  downloadFormat,
  setDownloadFormat,
  result,
  projectPath,
}: HeaderProps) {
  return (
    <header
      className={`flex justify-center sm:justify-between items-center px-3 sm:px-6 py-3 shrink-0 transition-colors duration-300 border-b-4 ${isDarkMode ? "bg-black border-white text-white" : "bg-white border-slate-900 text-slate-800"}`}
    >
      <div className="hidden sm:flex items-center gap-3">
        <div className="font-black text-2xl tracking-tighter uppercase hidden sm:block">
          CheckDeploy
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm font-medium w-full sm:w-auto">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-md border-2 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${isDarkMode ? "border-white shadow-[4px_4px_0_0_#fff] bg-blue-900 text-white hover:bg-blue-800" : "border-slate-900 shadow-[4px_4px_0_0_#0f172a] bg-yellow-100 text-slate-800 hover:bg-yellow-200"}`}
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className={`p-2 rounded-md border-2 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${isDarkMode ? "border-white shadow-[4px_4px_0_0_#fff] bg-black text-white hover:bg-slate-900" : "border-slate-900 shadow-[4px_4px_0_0_#0f172a] bg-white text-slate-800 hover:bg-slate-50"}`}
          title="Toggle History"
        >
          <History className="w-5 h-5" />
        </button>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value as "md" | "pdf")}
            disabled={!result}
            className={`px-3 py-2 h-[40px] rounded-md font-bold border-2 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? "border-white shadow-[4px_4px_0_0_#fff] bg-black text-white" : "border-slate-900 shadow-[4px_4px_0_0_#0f172a] bg-white text-slate-900"}`}
          >
            <option value="pdf">PDF</option>
            <option value="md">Markdown</option>
          </select>
          <button
            onClick={() => handleDownload(downloadFormat, projectPath, result)}
            disabled={!result}
            className={`h-[40px] flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold border-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:shadow-none disabled:translate-x-[4px] disabled:translate-y-[4px] ${isDarkMode ? "border-white shadow-[4px_4px_0_0_#fff] bg-blue-600 text-white hover:bg-blue-500" : "border-slate-900 shadow-[4px_4px_0_0_#0f172a] bg-yellow-400 text-slate-900 hover:bg-yellow-300"}`}
          >
            <Download className="w-4 h-4 text-current shrink-0" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>
    </header>
  );
}
