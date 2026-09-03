export default function Header({ activePage, sensorStatus }) {
  const isOnline = sensorStatus === "Online";

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div>
        <p className="text-sm text-slate-400">Home / {activePage}</p>
        <h2 className="mt-1 text-lg font-bold text-slate-900">{activePage}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold sm:flex ${
            isOnline
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isOnline ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          {isOnline ? "Home online" : "Home offline"}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
          B
        </div>
      </div>
    </header>
  );
}
