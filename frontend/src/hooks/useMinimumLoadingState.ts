import { useEffect, useState } from 'react'

const DEFAULT_MINIMUM_LOADING_MS = 700

export function useMinimumLoadingState(
  isPending: boolean,
  minimumLoadingMs = DEFAULT_MINIMUM_LOADING_MS,
) {
  const [minimumElapsed, setMinimumElapsed] = useState(
    import.meta.env.MODE === 'test',
  )

  useEffect(() => {
    if (import.meta.env.MODE === 'test') return

    const timeoutId = window.setTimeout(
      () => setMinimumElapsed(true),
      minimumLoadingMs,
    )
    return () => window.clearTimeout(timeoutId)
  }, [minimumLoadingMs])

  return isPending || !minimumElapsed
}
