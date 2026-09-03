export default function SystemStatusPanel({ lastReadingLabel }) {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          ESP32
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800">Connected</span>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Sending sensor data to FastAPI
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Database
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800">
            InfluxDB connected
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Sensor readings are being stored
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Last Reading
        </p>

        <p className="mt-3 font-semibold text-slate-800">{lastReadingLabel}</p>
        <p className="mt-2 text-xs text-slate-400">
          Automatically updated every 10 seconds
        </p>
      </div>
    </section>
  );
}
