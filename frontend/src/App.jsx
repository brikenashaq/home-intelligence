import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ErrorBanner from "./components/ErrorBanner";
import Overview from "./pages/Overview";
import Devices from "./pages/Devices";
import ComingSoon from "./pages/ComingSoon";
import { useSensors } from "./hooks/useSensors";

export default function App() {
  const [activePage, setActivePage] = useState("Overview");

  const { sensors, loading, error, sensorStatus } = useSensors();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="min-w-0 flex-1">
          <Header activePage={activePage} sensorStatus={sensorStatus} />

          {error && <ErrorBanner />}

          {activePage === "Overview" ? (
            <Overview
              sensors={sensors}
              sensorStatus={sensorStatus}
              loading={loading}
              onNavigateToDevices={() => setActivePage("Devices")}
            />
          ) : activePage === "Devices" ? (
            <Devices sensors={sensors} sensorStatus={sensorStatus} />
          ) : (
            <ComingSoon pageName={activePage} />
          )}
        </main>
      </div>
    </div>
  );
}
