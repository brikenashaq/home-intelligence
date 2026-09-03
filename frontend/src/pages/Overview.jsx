import { Thermometer, Droplets, Sprout } from "lucide-react";
import SensorCard from "../components/SensorCard";
import TemperatureChart from "../components/TemperatureChart";
import AIInsightPanel from "../components/AIInsightPanel";
import DevicesPanel from "../components/DevicesPanel";
import SystemStatusPanel from "../components/SystemStatusPanel";
import DashboardFooter from "../components/DashboardFooter";
import { formatTimestamp, relativeTime } from "../hooks/useSensors";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Overview({
  sensors,
  history,
  sensorStatus,
  loading,
  onNavigateToDevices,
}) {
  const currentDate = new Date().toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const temperature = sensors?.temperature;
  const humidity = sensors?.humidity;

  const temperatureValue =
    temperature !== null && temperature !== undefined
      ? temperature.toFixed(1)
      : "—";

  const humidityValue =
    humidity !== null && humidity !== undefined ? humidity.toFixed(0) : "—";

  const lastReadingLabel = formatTimestamp(sensors?.timestamp);
  const lastReadingRelative = relativeTime(sensors?.timestamp);

  const temperatureData = Array.isArray(history)
    ? history
        .filter(
          (reading) =>
            reading.temperature !== null && reading.temperature !== undefined,
        )
        .map((reading) => ({
          time: reading.timestamp,
          temperature: Number(reading.temperature),
          humidity:
            reading.humidity !== null && reading.humidity !== undefined
              ? Number(reading.humidity)
              : null,
        }))
    : [];

  return (
    <div className="mx-auto max-w-7xl p-5 sm:p-8">
      <section className="mb-8">
        <p className="text-sm font-medium text-slate-400">{currentDate}</p>
        <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {greeting()}, Brikena
        </h3>
        <p className="mt-2 text-slate-500">
          Here's what's happening in your home right now.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SensorCard
          icon={Thermometer}
          title="Temperature"
          value={temperatureValue}
          unit="°C"
          status={sensorStatus}
          description="Living area · DHT11"
          loading={loading}
        />
        <SensorCard
          icon={Droplets}
          title="Humidity"
          value={humidityValue}
          unit="%"
          status={sensorStatus}
          description="Living area · DHT11"
          loading={loading}
        />
        <SensorCard
          icon={Sprout}
          title="Soil Moisture"
          value="—"
          unit=""
          status="Offline"
          description="Plant sensor unavailable"
        />
        <SensorCard
          icon={Droplets}
          title="Water Sensor"
          value={
            sensors?.water_detected === true
              ? "Detected"
              : sensors?.water_detected === false
                ? "No water"
                : "—"
          }
          unit=""
          status={
            sensors?.water_detected === true
              ? "Alert"
              : sensors?.water_detected === false
                ? "Normal"
                : "Offline"
          }
          description="Water leak / presence sensor"
          loading={loading}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-3">
        <TemperatureChart data={temperatureData} />
        <AIInsightPanel />
      </section>

      <DevicesPanel
        sensorStatus={sensorStatus}
        sensors={sensors}
        onViewAll={onNavigateToDevices}
      />
      <SystemStatusPanel
        lastReadingLabel={lastReadingLabel}
        lastReadingRelative={lastReadingRelative}
      />
      <DashboardFooter lastReadingLabel={lastReadingLabel} />
    </div>
  );
}
