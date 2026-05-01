export function Badge({
  text,
  isDarkMode,
}: {
  text: string;
  isDarkMode: boolean;
}) {
  let colorClass = isDarkMode
    ? "bg-black text-white border-white"
    : "bg-slate-200 text-slate-800 border-slate-900";
  const lower = (text || "unknown").toLowerCase();

  if (
    lower.includes("high") ||
    lower.includes("critical") ||
    lower.includes("fail") ||
    lower.includes("poor")
  ) {
    colorClass = isDarkMode
      ? "bg-red-600 text-white border-white"
      : "bg-red-400 text-black border-slate-900";
  } else if (
    lower.includes("medium") ||
    lower.includes("improvement") ||
    lower.includes("warn")
  ) {
    colorClass = isDarkMode
      ? "bg-amber-600 text-white border-white"
      : "bg-amber-300 text-black border-slate-900";
  } else if (lower.includes("low")) {
    colorClass = isDarkMode
      ? "bg-blue-600 text-white border-white"
      : "bg-blue-300 text-black border-slate-900";
  } else if (
    lower.includes("done") ||
    lower.includes("passed") ||
    lower.includes("complete") ||
    lower.includes("good") ||
    lower.includes("pass")
  ) {
    colorClass = isDarkMode
      ? "bg-emerald-600 text-white border-white"
      : "bg-emerald-400 text-black border-slate-900";
  }

  return (
    <span
      className={`text-[10px] font-black px-1.5 py-0.5 rounded-sm border-2 ${isDarkMode ? "shadow-[2px_2px_0_0_#fff]" : "shadow-[2px_2px_0_0_#0f172a]"} ${colorClass} uppercase tracking-wider shrink-0`}
    >
      {text}
    </span>
  );
}
