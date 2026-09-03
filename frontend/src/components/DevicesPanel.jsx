import { Router, Thermometer, Sprout, Droplets } from "lucide-react";
import { statusStyle } from "../utils/status";

function DeviceRow({ icon: Icon, name, label, status }) {
  const style = statusStyle(status);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        <Icon size={18} strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{name}</p>
        <p className="truncate text-xs text-slate-400">{label}</p>
      </div>

      <span
        className={`flex items-center gap-1.5 text-xs font-medium ${style.text}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
        {status}
      </span>
    </div>
  );
}

export default function DevicesPanel({ sensorStatus, sensors, onViewAll }) {
  const waterStatus =
    sensors?.water_detected === true
      ? "Alert"
      : sensors?.water_detected === false
        ? "Normal"
        : "Offline";

  const devices = [
    { icon: Router, name: "ESP32", label: "Controller", status: sensorStatus },
    {
      icon: Thermometer,
      name: "DHT11",
      label: "Temperature & Humidity",
      status: sensorStatus,
    },
    {
      icon: Sprout,
      name: "Soil Sensor",
      label: "Plant Monitor",
      status: "Offline",
    },
    {
      icon: Droplets,
      name: "Water Sensor",
      label: "Water Leak / Presence",
      status: waterStatus,
    },
  ];

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900">Devices</h4>
          <p className="mt-1 text-xs text-slate-400">Connected hardware</p>
        </div>

        <button
          onClick={onViewAll}
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          View all →
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {devices.map((device) => (
          <DeviceRow key={device.name} {...device} />
        ))}
      </div>
    </section>
  );
}
