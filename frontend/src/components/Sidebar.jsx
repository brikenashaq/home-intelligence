import {
  LayoutDashboard,
  Router,
  BarChart3,
  Sparkles,
  Home,
} from "lucide-react";

const MENU = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Devices", icon: Router },
  { name: "Analytics", icon: BarChart3 },
  { name: "AI Insights", icon: Sparkles },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Home size={18} strokeWidth={1.75} />
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
          {MENU.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.name)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={17} strokeWidth={1.75} />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
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
