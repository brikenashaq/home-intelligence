import { Router, Thermometer, Droplets, Sprout } from "lucide-react";
import { statusStyle } from "../utils/status";
import { formatTimestamp, relativeTime } from "../hooks/useSensors";

function DeviceDetailCard({
  icon: Icon,
  name,
  label,
  status,
  value,
  lastSeen,
}) {
  const style = statusStyle(status);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
        <p className="text-sm font-medium text-slate-500">{name}</p>
        <p className="mt-0.5 text-xs text-slate-400">{label}</p>

        {value && (
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        )}

        <div className="mt-4 border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-400">
            Last seen{" "}
            <span className="font-medium text-slate-600">
              {lastSeen ? relativeTime(lastSeen) : "—"}
            </span>
          </p>
          {lastSeen && (
            <p className="mt-0.5 text-xs text-slate-400">
              {formatTimestamp(lastSeen)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Devices({ sensors, sensorStatus }) {
  const waterStatus =
    sensors?.water_detected === true
      ? "Alert"
      : sensors?.water_detected === false
        ? "Normal"
        : "Offline";

  const devices = [
    {
      icon: Router,
      name: "ESP32",
      label: "Controller",
      status: sensorStatus,
      value: sensorStatus === "Online" ? "Connected" : "Unreachable",
      lastSeen: sensors?.timestamp,
    },
    {
      icon: Thermometer,
      name: "DHT11 — Temperature",
      label: "Living area",
      status: sensorStatus,
      value:
        sensors?.temperature !== null && sensors?.temperature !== undefined
          ? `${sensors.temperature.toFixed(1)} °C`
          : null,
      lastSeen: sensors?.timestamp,
    },
    {
      icon: Droplets,
      name: "DHT11 — Humidity",
      label: "Living area",
      status: sensorStatus,
      value:
        sensors?.humidity !== null && sensors?.humidity !== undefined
          ? `${sensors.humidity.toFixed(0)} %`
          : null,
      lastSeen: sensors?.timestamp,
    },
    {
      icon: Droplets,
      name: "Water Sensor",
      label: "Water leak / presence",
      status: waterStatus,
      value:
        sensors?.water_detected === true
          ? "Detected"
          : sensors?.water_detected === false
            ? "No water"
            : null,
      lastSeen: sensors?.timestamp,
    },
    {
      icon: Sprout,
      name: "Soil Sensor",
      label: "Plant monitor",
      status: "Offline",
      value: null,
      lastSeen: null,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl p-5 sm:p-8">
      <section className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          Devices
        </h3>
        <p className="mt-1 text-slate-500">
          All connected hardware and their current status.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {devices.map((device) => (
          <DeviceDetailCard key={device.name} {...device} />
        ))}
      </section>
    </div>
  );
}
