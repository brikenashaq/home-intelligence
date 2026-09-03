import { Sparkles } from "lucide-react";

export default function AIInsightPanel() {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Sparkles size={18} strokeWidth={1.75} />
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
  );
}
