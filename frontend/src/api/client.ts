interface ApiErrorResponse {
  message?: string
}

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new ApiError(await getErrorMessage(response), response.status)
  }

  return response.json() as Promise<T>
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const error = (await response.json()) as ApiErrorResponse
    if (typeof error.message === 'string' && error.message.trim().length > 0) {
      return error.message
    }
  } catch {
    // A non-JSON error response is represented by the safe fallback below.
  }

  return `Request failed with status ${response.status}`
}
