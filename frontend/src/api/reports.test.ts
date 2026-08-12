import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  getDepartmentsReport,
  getProjectsReport,
  getReports,
  getUsersReport,
} from './reports'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('report API', () => {
  it.each([
    ['metadata', getReports, '/api/reports'],
    ['users', getUsersReport, '/api/reports/users'],
    ['departments', getDepartmentsReport, '/api/reports/departments'],
    ['projects', getProjectsReport, '/api/reports/projects'],
  ])('requests the %s endpoint', async (_name, request, path) => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('[]', {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(request()).resolves.toEqual([])
    expect(fetchMock).toHaveBeenCalledWith(path, {
      headers: { Accept: 'application/json' },
    })
  })
})
