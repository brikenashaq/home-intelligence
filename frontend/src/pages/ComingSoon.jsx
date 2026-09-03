export default function ComingSoon({ pageName }) {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center p-5 sm:p-8">
      <div className="mt-16 flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
          🚧
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{pageName}</h3>
        <p className="mt-1 max-w-xs text-sm text-slate-400">
          This section isn't built yet — the sidebar is wired up and ready
          whenever you add it.
        </p>
      </div>
    </div>
  );
}
