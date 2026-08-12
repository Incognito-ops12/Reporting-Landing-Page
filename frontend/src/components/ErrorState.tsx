interface ErrorStateProps {
  title?: string
  message?: string
  onRetry: () => void
}

export function ErrorState({
  title = "We couldn't load this report.",
  message = 'Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-6 py-8"
    >
      <h2 className="font-semibold text-red-950">{title}</h2>
      <p className="mt-1 text-sm text-red-800">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 min-h-11 rounded-lg bg-red-700 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-800"
      >
        Retry
      </button>
    </section>
  )
}
