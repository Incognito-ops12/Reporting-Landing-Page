interface LoadingStateProps {
  variant: 'cards' | 'table'
}

export function LoadingState({ variant }: LoadingStateProps) {
  if (variant === 'cards') {
    return (
      <div
        role="status"
        aria-label="Loading reports"
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            aria-hidden="true"
            className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="size-12 rounded-2xl bg-slate-200" />
            <div className="mt-5 h-5 w-1/3 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-3/4 rounded bg-slate-100" />
            <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
            <div className="mt-16 h-11 w-full rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-label="Loading report data"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div aria-hidden="true" className="animate-pulse">
        <div className="h-12 border-b border-slate-200 bg-slate-100" />
        {[0, 1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex gap-8 border-b border-slate-100 px-5 py-5 last:border-b-0"
          >
            <div className="h-4 w-24 rounded bg-slate-100" />
            <div className="h-4 w-40 rounded bg-slate-100" />
            <div className="h-4 w-32 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
