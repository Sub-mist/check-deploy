import { useState } from "react";
import type { HistoryItem } from "./types";
import { useHistory } from "./hooks/useHistory";
import { useAiAnalysis } from "./hooks/useAiAnalysis";
import { Header } from "./components/Header";
import { HistorySidebar } from "./components/HistorySidebar";
import { SearchBar } from "./components/SearchBar";
import { OverviewPanel } from "./components/OverviewPanel";
import { BoardView } from "./components/BoardView";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [projectPath, setProjectPath] = useState(
    "C:\\Users\\username\\Documents\\my-blog-project",
  );
  const [downloadFormat, setDownloadFormat] = useState<"md" | "pdf">("pdf");
  const [view, setView] = useState<"overview" | "board">("overview");

  const {
    history,
    isHistoryOpen,
    setIsHistoryOpen,
    saveToHistory,
    deleteHistoryItem,
  } = useHistory();

  const {
    isLoading,
    isLoadingDetails,
    loadingText,
    result,
    setResult,
    error,
    setError,
    analyzeProject,
    recheckCategory,
    recheckingId,
  } = useAiAnalysis(saveToHistory);

  const loadHistoryItem = (item: HistoryItem) => {
    setProjectPath(item.projectPath);
    setResult(item.result);
    setError(null);
    if (window.innerWidth < 1024) {
      setIsHistoryOpen(false);
    }
  };

  const handleCheck = () => {
    analyzeProject(projectPath);
  };

  return (
    <div
      className={`h-screen flex font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? "dark bg-gradient-to-br from-black via-[#0a192f] to-black text-slate-100" : "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-slate-800"}`}
    >
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isHistoryOpen={isHistoryOpen}
          setIsHistoryOpen={setIsHistoryOpen}
          downloadFormat={downloadFormat}
          setDownloadFormat={setDownloadFormat}
          result={result}
          projectPath={projectPath}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <SearchBar
            isDarkMode={isDarkMode}
            projectPath={projectPath}
            setProjectPath={setProjectPath}
            isLoading={isLoading}
            loadingText={loadingText}
            handleCheck={handleCheck}
            error={error}
            result={result}
            view={view}
            setView={setView}
          />

          <div className="flex-1 overflow-hidden p-6 bg-transparent">
            {!result && !isLoading && (
              <div
                className={`h-full flex items-center justify-center text-sm font-bold border-4 border-dashed rounded-xl ${isDarkMode ? "text-blue-300 border-blue-600 bg-blue-900/50" : "text-slate-600 border-yellow-400 bg-yellow-100/50"}`}
              >
                Enter a project path and run the check to view the dashboard and
                board.
              </div>
            )}
            {result && (
              <div className="flex flex-col h-full gap-6">
                {view === "overview" && (
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-6">
                    <OverviewPanel isDarkMode={isDarkMode} result={result} />
                  </div>
                )}
                {view === "board" && (
                  <BoardView
                    isDarkMode={isDarkMode}
                    result={result}
                    recheckCategory={recheckCategory}
                    recheckingId={recheckingId}
                    projectPath={projectPath}
                    isLoadingDetails={isLoadingDetails}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <footer
          className={`flex justify-center items-center px-6 py-2 shrink-0 transition-colors duration-300 border-t-4 text-xs font-bold ${isDarkMode ? "bg-black border-white text-slate-300" : "bg-white border-slate-900 text-slate-700"}`}
        >
          CheckDeploy © {new Date().getFullYear()}
        </footer>
      </main>

      <HistorySidebar
        isDarkMode={isDarkMode}
        isHistoryOpen={isHistoryOpen}
        setIsHistoryOpen={setIsHistoryOpen}
        history={history}
        loadHistoryItem={loadHistoryItem}
        deleteHistoryItem={deleteHistoryItem}
      />
    </div>
  );
}
