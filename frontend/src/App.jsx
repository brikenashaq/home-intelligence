import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const temperatureData = [
  { time: "08:00", value: 23.4 },
  { time: "10:00", value: 24.1 },
  { time: "12:00", value: 25.8 },
  { time: "14:00", value: 27.1 },
  { time: "16:00", value: 26.5 },
  { time: "18:00", value: 25.4 },
  { time: "20:00", value: 24.8 },
];

const devices = [
  { name: "ESP32", type: "Controller", status: "Online", icon: "🔵" },
  {
    name: "DHT11",
    type: "Temperature & Humidity",
    status: "Online",
    icon: "🌡️",
  },
  { name: "Soil Sensor", type: "Plant Monitor", status: "Offline", icon: "🌱" },
  { name: "Aquarium", type: "Water Monitor", status: "Soon", icon: "🐠" },
];

function SensorCard({ icon, title, value, unit, status, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
          {icon}
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
          {status}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </span>
          <span className="text-sm font-medium text-slate-500">{unit}</span>
        </div>

        <p className="mt-2 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function Sidebar({ activePage, setActivePage }) {
  const menu = [
    { name: "Overview", icon: "▦" },
    { name: "Devices", icon: "◉" },
    { name: "Analytics", icon: "⌁" },
    { name: "AI Insights", icon: "✦" },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg">
          🏠
        </div>

        <div>
          <h1 className="font-bold text-slate-900">Home Intelligence</h1>
          <p className="text-xs text-slate-400">Smart home platform</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <div className="space-y-1">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                activePage === item.name
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
            B
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">Brikena</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </button>
      </div>
    </aside>
  );
}

function App() {
  const [sensors, setSensors] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/sensors")
      .then((response) => response.json())
      .then((data) => {
        console.log("Sensor data:", data);
        setSensors(data);
      });
  }, []);
  const [activePage, setActivePage] = useState("Overview");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
            <div>
              <p className="text-sm text-slate-400">Home / {activePage}</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                {activePage}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Home online
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
                B
              </div>
            </div>
          </header>

          {/* Dashboard */}
          <div className="mx-auto max-w-7xl p-5 sm:p-8">
            <section className="mb-8">
              <p className="text-sm font-medium text-slate-400">
                Tuesday, August 25
              </p>

              <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Good evening 👋
              </h3>

              <p className="mt-2 text-slate-500">
                Here's what's happening in your home right now.
              </p>
            </section>

            {/* Sensor cards */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SensorCard
                icon="🌡️"
                title="Temperature"
                value="27.1"
                unit="°C"
                status="Normal"
                description="Living area · DHT11"
              />

              <SensorCard
                icon="💧"
                title="Humidity"
                value="47"
                unit="%"
                status="Normal"
                description="Living area · DHT11"
              />

              <SensorCard
                icon="🌱"
                title="Soil Moisture"
                value="—"
                unit=""
                status="Offline"
                description="Plant sensor unavailable"
              />

              <SensorCard
                icon="🐠"
                title="Aquarium"
                value="—"
                unit=""
                status="Soon"
                description="Monitoring not configured"
              />
            </section>

            {/* Main grid */}
            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              {/* Chart */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">Temperature</h4>
                    <p className="mt-1 text-xs text-slate-400">
                      Today's readings
                    </p>
                  </div>

                  <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
                    Today
                  </span>
                </div>

                <div className="mt-6 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={temperatureData}>
                      <defs>
                        <linearGradient
                          id="temperatureGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#0f172a"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="#0f172a"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e2e8f0"
                      />

                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />

                      <YAxis
                        domain={["dataMin - 2", "dataMax + 2"]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />

                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0f172a"
                        strokeWidth={2}
                        fill="url(#temperatureGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Insight */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    ✦
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    AI ready
                  </span>
                </div>

                <h4 className="mt-6 text-xl font-bold">AI Insights</h4>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Your system is collecting data. Once enough historical data is
                  available, AI will learn your home's normal patterns.
                </p>

                <div className="mt-6 rounded-xl bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Current analysis
                  </p>

                  <p className="mt-2 text-sm text-slate-200">
                    No unusual activity detected.
                  </p>
                </div>

                <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                  View AI insights
                </button>
              </div>
            </section>

            {/* Devices */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Devices</h4>
                  <p className="mt-1 text-xs text-slate-400">
                    Connected hardware
                  </p>
                </div>

                <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                  View all →
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {devices.map((device) => (
                  <div
                    key={device.name}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-4"
                  >
                    <div className="text-xl">{device.icon}</div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {device.name}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {device.type}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-medium ${
                          device.status === "Online"
                            ? "text-emerald-600"
                            : device.status === "Offline"
                              ? "text-slate-400"
                              : "text-amber-500"
                        }`}
                      >
                        {device.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
              <p>Home Intelligence · v0.1</p>
              <p>Last updated just now</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
