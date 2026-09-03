import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TemperatureChart({ data }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900">Temperature History</h4>
          <p className="mt-1 text-xs text-slate-400">
            Last {data.length} sensor readings
          </p>
        </div>

        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
          History
        </span>
      </div>

      <div className="mt-6 h-72">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="temperatureGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0f172a" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
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
                tickFormatter={(time) => {
                  const date = new Date(time);

                  return date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }}
              />

              <YAxis
                domain={["dataMin - 2", "dataMax + 2"]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => [`${value} °C`, "Temperature"]}
                labelFormatter={(label) => `Time: ${label}`}
              />

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#0f172a"
                strokeWidth={2}
                fill="url(#temperatureGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-400">
              No temperature history available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
