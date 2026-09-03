// Central place for status → visual style. Add a new status here once,
// every component that shows a status badge picks it up automatically.
export const STATUS_STYLES = {
  Online: {
    badge: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
    text: "text-emerald-600",
  },
  Normal: {
    badge: "bg-emerald-50 text-emerald-600",
    dot: "bg-emerald-500",
    text: "text-emerald-600",
  },
  Offline: {
    badge: "bg-slate-100 text-slate-500",
    dot: "bg-slate-400",
    text: "text-slate-400",
  },
  Soon: {
    badge: "bg-amber-50 text-amber-600",
    dot: "bg-amber-500",
    text: "text-amber-500",
  },
  Alert: {
    badge: "bg-red-50 text-red-600",
    dot: "bg-red-500",
    text: "text-red-600",
  },
};

export function statusStyle(status) {
  return STATUS_STYLES[status] ?? STATUS_STYLES.Offline;
}
