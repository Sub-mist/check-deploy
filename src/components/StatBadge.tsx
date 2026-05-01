export function StatBadge({
  count,
  label,
  color,
  isDarkMode,
}: {
  count: number;
  label: string;
  color: "red" | "indigo" | "blue" | "emerald";
  isDarkMode: boolean;
}) {
  const colors = {
    red: {
      light: "bg-red-200 text-red-900",
      dark: "bg-red-950 text-red-200 border-white shadow-[2px_2px_0_0_#fff]",
    },
    indigo: {
      light: "bg-indigo-200 text-indigo-900",
      dark: "bg-indigo-950 text-indigo-200 border-white shadow-[2px_2px_0_0_#fff]",
    },
    blue: {
      light: "bg-blue-200 text-blue-900",
      dark: "bg-blue-950 text-blue-200 border-white shadow-[2px_2px_0_0_#fff]",
    },
    emerald: {
      light: "bg-emerald-200 text-emerald-900",
      dark: "bg-emerald-950 text-emerald-200 border-white shadow-[2px_2px_0_0_#fff]",
    },
  };

  return (
    <div
      className={`px-3 py-1.5 rounded-md font-bold text-sm border-2 shrink-0 flex items-center gap-2 ${isDarkMode ? colors[color].dark : `${colors[color].light} border-slate-900 shadow-[2px_2px_0_0_#0f172a]`}`}
    >
      <span className="text-lg leading-none">{count}</span>
      <span className="opacity-80 font-semibold">{label}</span>
    </div>
  );
}
