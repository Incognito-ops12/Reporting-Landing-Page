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
      className="state-enter rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white px-6 py-12 text-center shadow-sm"
    >
      <span
        aria-hidden="true"
        className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-red-100 text-xl text-red-700"
      >
        !
      </span>
      <h2 className="text-base font-bold text-red-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-800">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 min-h-11 rounded-xl bg-red-700 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-800 active:translate-y-0"
      >
        Retry
      </button>
    </section>
  )
}
