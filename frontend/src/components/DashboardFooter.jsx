export default function DashboardFooter({ lastReadingLabel }) {
  return (
    <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
      <p>Home Intelligence · v0.1</p>
      <p>Last updated {lastReadingLabel}</p>
    </footer>
  );
}
