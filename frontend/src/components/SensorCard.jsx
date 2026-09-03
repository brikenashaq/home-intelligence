import { statusStyle } from "../utils/status";

export default function SensorCard({
  icon: Icon,
  title,
  value,
  unit,
  status,
  description,
  loading,
}) {
  const style = statusStyle(status);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={20} strokeWidth={1.75} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        {loading ? (
          <div className="mt-2 h-8 w-20 animate-pulse rounded-md bg-slate-100" />
        ) : (
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </span>
            <span className="text-sm font-medium text-slate-500">{unit}</span>
          </div>
        )}

        <p className="mt-2 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}
