import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { KanbanItem } from "../types";
import { Badge } from "./Badge";

interface KanbanColumnProps {
  title: string;
  count: number;
  items: KanbanItem[];
  borderColor?: string;
  pillClass?: string;
  isDarkMode: boolean;
}

export function KanbanColumn({
  title,
  count,
  items,
  borderColor,
  pillClass,
  isDarkMode,
}: KanbanColumnProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl p-4 flex flex-col ${
        isExpanded
          ? "h-[400px] md:h-full max-h-[500px] md:max-h-full"
          : "h-auto md:h-full"
      } md:max-h-full overflow-hidden border-4 transition-all duration-300 ${isDarkMode ? "bg-black border-white shadow-[8px_8px_0_0_#fff]" : "bg-white/90 border-slate-900 shadow-[8px_8px_0_0_#0f172a]"}`}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`text-sm font-black uppercase mb-0 flex justify-between items-center shrink-0 cursor-pointer md:cursor-auto select-none ${isDarkMode ? "text-white" : "text-slate-900"}`}
      >
        <div className="flex items-center gap-2">
          <div className="md:hidden flex items-center justify-center">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 pointer-events-none" />
            ) : (
              <ChevronDown className="w-5 h-5 pointer-events-none" />
            )}
          </div>
          <span>{title}</span>
        </div>
        <span
          className={`border-2 text-[11px] px-2 py-0.5 rounded-md ${isDarkMode ? "shadow-[2px_2px_0_0_#fff] " : "shadow-[2px_2px_0_0_#0f172a] "} ${pillClass}`}
        >
          {count} {count === 1 ? "Item" : "Items"}
        </span>
      </div>
      <div
        className={`flex-1 overflow-y-auto flex-col gap-3 outline-none pr-2 custom-scrollbar mt-4 ${isExpanded ? "flex" : "hidden md:flex"}`}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-md p-3.5 border-2 border-l-8 ${borderColor || "border-l-slate-900"} ${isDarkMode ? "border-t-white border-r-white border-b-white hover:-translate-y-1 hover:translate-x-[1px] shadow-[4px_4px_0_0_#fff] bg-black" : "border-slate-900 hover:-translate-y-1 hover:translate-x-[1px] shadow-[4px_4px_0_0_#0f172a] bg-white"} transition-transform shrink-0`}
          >
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3
                className={`font-bold text-sm leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {item.title}
              </h3>
              <Badge text={item.priorityOrStatus} isDarkMode={isDarkMode} />
            </div>
            <div
              className={`text-[11px] font-mono font-semibold mb-1 truncate ${isDarkMode ? "text-slate-300" : "text-slate-500"}`}
            >
              {item.path}
            </div>
            <p
              className={`text-sm leading-snug font-medium mt-1.5 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
            >
              {item.description}
            </p>
          </div>
        ))}
        {items.length === 0 && (
          <div
            className={`text-center font-bold p-4 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-400"}`}
          >
            No items found.
          </div>
        )}
      </div>
    </div>
  );
}

