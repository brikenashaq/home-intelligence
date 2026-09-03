import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/sensors";
const POLL_INTERVAL_MS = 10000;

// How long we consider the ESP32 to be online
const ONLINE_THRESHOLD_MS = 30 * 1000; // 30 seconds

export function useSensors() {
  const [sensors, setSensors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sensorStatus, setSensorStatus] = useState("Offline");

  useEffect(() => {
    let cancelled = false;

    const fetchSensors = () => {
      fetch(API_URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch sensor data");
          }

          return response.json();
        })
        .then((data) => {
          if (cancelled) return;

          setSensors(data);
          setLoading(false);
          setError(false);

          // -----------------------------------------
          // Check when the ESP32 last sent data
          // -----------------------------------------

          if (!data.timestamp) {
            setSensorStatus("Offline");
            return;
          }

          const lastReading = new Date(data.timestamp);
          const now = Date.now();

          const age = now - lastReading.getTime();

          if (age <= ONLINE_THRESHOLD_MS) {
            setSensorStatus("Online");
          } else {
            setSensorStatus("Offline");
          }
        })
        .catch((err) => {
          if (cancelled) return;

          console.error("Sensor API error:", err);

          setError(true);
          setLoading(false);
          setSensorStatus("Offline");
        });
    };

    // Get data immediately
    fetchSensors();

    // Check again every 10 seconds
    const interval = setInterval(fetchSensors, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return {
    sensors,
    loading,
    error,
    sensorStatus,
  };
}

// --------------------------------------------------
// Format timestamp
// --------------------------------------------------

export function formatTimestamp(timestamp) {
  if (!timestamp) {
    return "No data";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// --------------------------------------------------
// Relative time
// --------------------------------------------------

export function relativeTime(timestamp) {
  if (!timestamp) {
    return "No data";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diffSeconds < 5) {
    return "just now";
  }

  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;

  if (diffHours < 24) {
    return `${diffHours}h ${remainingMinutes}m ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  return `${diffDays}d ago`;
}
