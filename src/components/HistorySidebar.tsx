import { X, Trash2 } from "lucide-react";
import type { HistoryItem } from "../types";

interface HistorySidebarProps {
  isDarkMode: boolean;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (val: boolean) => void;
  history: HistoryItem[];
  loadHistoryItem: (item: HistoryItem) => void;
  deleteHistoryItem: (id: string) => void;
}

export function HistorySidebar({
  isDarkMode,
  isHistoryOpen,
  setIsHistoryOpen,
  history,
  loadHistoryItem,
  deleteHistoryItem,
}: HistorySidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isHistoryOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsHistoryOpen(false)}
        />
      )}

      {/* History Sidebar */}
      <div
        className={`${isHistoryOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 fixed right-0 lg:relative z-40 h-full flex flex-col shrink-0 transition-all duration-300 ${isHistoryOpen ? "w-80 border-l-4" : "lg:w-0 lg:border-none w-80 border-l-4 overflow-hidden"} ${isDarkMode ? "bg-black border-white" : "bg-white border-slate-900"}`}
      >
        <div
          className={`flex justify-between items-center p-4 border-b-4 shrink-0 overflow-hidden ${isDarkMode ? "border-white" : "border-slate-900"}`}
        >
          <h2 className="font-black uppercase text-xl truncate">History</h2>
          <button
            onClick={() => setIsHistoryOpen(false)}
            className="lg:hidden p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 truncate min-w-0">
          {history.length === 0 && (
            <p className="text-sm font-bold opacity-50 text-center mt-10">
              No history yet.
            </p>
          )}
          {history.map((item) => (
            <div
              key={item.id}
              className={`flex items-start justify-between p-3 border-2 rounded-md transition-all group ${isDarkMode ? "border-white hover:bg-white/10" : "border-slate-900 hover:bg-yellow-50"}`}
            >
              <button
                className="flex-1 text-left min-w-0 pr-2"
                onClick={() => loadHistoryItem(item)}
              >
                <div
                  className="font-bold truncate text-base"
                  title={item.projectPath}
                >
                  {item.projectPath.split(/[\\/]/).pop() || item.projectPath}
                </div>
                <div
                  className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  {new Date(item.timestamp).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs font-black mt-1 uppercase flex items-center gap-1">
                  Score:{" "}
                  <span
                    className={`${item.result.readinessScore > 80 ? "text-emerald-500" : item.result.readinessScore > 50 ? "text-amber-500" : "text-red-500"}`}
                  >
                    {item.result.readinessScore}%
                  </span>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHistoryItem(item.id);
                }}
                className={`p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 border-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${isDarkMode ? "hover:bg-red-950 text-red-500 border-red-500 shadow-[2px_2px_0_0_#ef4444]" : "bg-white hover:bg-red-50 text-red-600 border-red-600 shadow-[2px_2px_0_0_#dc2626]"}`}
                title="Delete history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
