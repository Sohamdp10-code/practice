import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { Dashboard } from "./pages/Dashboard";
import { Machines } from "./pages/Machines";
import { MachineDetail } from "./pages/MachineDetail";
import { Diagnosis } from "./pages/Diagnosis";
import { AIAssistant } from "./pages/AIAssistant";
import { Sensors } from "./pages/Sensors";
import { Alerts } from "./pages/Alerts";
import { Maintenance } from "./pages/Maintenance";
import { HistoryPage } from "./pages/History";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { Reports } from "./pages/Reports";
import { machines } from "./data/mockData";
import type { Machine } from "./data/mockData";
import { C } from "./lib/colors";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  const [selectedMachine, setSelectedMachine] = useState<Machine>(machines[1]); // M-102
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const handleNavigate = (page: string, machineId?: string) => {
    if (machineId) {
      const found = machines.find((m) => m.id === machineId);
      if (found) setSelectedMachine(found);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNav={handleNavigate} />;
      case "machines":
        return (
          <Machines
            onNav={setCurrentPage}
            onSelectMachine={(m) => {
              setSelectedMachine(m);
            }}
          />
        );
      case "machinedetail":
        return <MachineDetail machine={selectedMachine} onNav={handleNavigate} />;
      case "diagnosis":
        return <Diagnosis onNav={setCurrentPage} />;
      case "assistant":
        return <AIAssistant />;
      case "sensors":
        return <Sensors />;
      case "alerts":
        return <Alerts onNav={handleNavigate} />;
      case "maintenance":
        return <Maintenance />;
      case "history":
        return <HistoryPage />;
      case "knowledge":
        return <KnowledgeBase />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard onNav={handleNavigate} />;
    }
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden select-none font-sans"
      style={{ background: C.bg }}
    >
      {/* Collapsible Left Sidebar */}
      <Sidebar
        current={currentPage}
        onNav={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopBar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigateAlerts={() => setCurrentPage("alerts")}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
