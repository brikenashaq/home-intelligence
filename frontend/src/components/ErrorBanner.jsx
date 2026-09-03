import { AlertTriangle } from "lucide-react";

export default function ErrorBanner() {
  return (
    <div className="mx-5 mt-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-8">
      <AlertTriangle size={18} className="shrink-0" />
      <p>
        Can't reach the sensor API right now. Showing the last known values —
        check that the FastAPI backend is running on port 8000.
      </p>
    </div>
  );
}
