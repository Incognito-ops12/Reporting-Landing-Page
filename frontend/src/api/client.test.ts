import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, getJson } from './client'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getJson', () => {
  it('returns decoded JSON for a successful request', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: 'users' }]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      getJson<Array<{ id: string }>>('/api/reports'),
    ).resolves.toEqual([{ id: 'users' }])
    expect(fetchMock).toHaveBeenCalledWith('/api/reports', {
      headers: { Accept: 'application/json' },
    })
  })

  it('uses the backend message for an unsuccessful response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Report not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    const request = getJson('/api/reports/unknown')

    await expect(request).rejects.toBeInstanceOf(ApiError)
    await expect(request).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Report not found',
      status: 404,
    })
  })

  it('uses a safe fallback for a non-JSON error response', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('Gateway unavailable', { status: 502 }),
        ),
    )

    const request = getJson('/api/reports')

    await expect(request).rejects.toBeInstanceOf(ApiError)
    await expect(request).rejects.toMatchObject({
      message: 'Request failed with status 502',
      status: 502,
    })
  })

  it('preserves network failures for the query layer', async () => {
    const networkError = new TypeError('Failed to fetch')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(networkError))

    await expect(getJson('/api/reports')).rejects.toBe(networkError)
  })
})
