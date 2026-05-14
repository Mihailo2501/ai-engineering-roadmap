import { useEffect } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { useHashRoute } from "./lib/router";
import { RoadmapPage } from "./pages/Roadmap";
import { GlossaryPage } from "./pages/Glossary";
import { StudyWorkflowPage } from "./pages/StudyWorkflow";

export default function App() {
  const route = useHashRoute();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      {route === "/glossary" ? (
        <GlossaryPage />
      ) : route === "/study" ? (
        <StudyWorkflowPage />
      ) : (
        <RoadmapPage />
      )}
    </div>
  );
}
