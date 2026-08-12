import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as reportsApi from '../api/reports'
import type { ReportMetadata } from '../types/reports'
import { ReportsLandingPage } from './ReportsLandingPage'

vi.mock('../api/reports')

const reports: ReportMetadata[] = [
  {
    id: 'users',
    name: 'Users',
    description: 'People in the system',
    lastUpdated: '2026-08-11T14:30:00Z',
    rowCount: 15,
  },
  {
    id: 'departments',
    name: 'Departments',
    description: 'Org structure',
    lastUpdated: '2026-08-11T14:30:00Z',
    rowCount: 8,
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Active & past work',
    lastUpdated: '2026-08-11T14:30:00Z',
    rowCount: 12,
  },
]

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ReportsLandingPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('ReportsLandingPage', () => {
  beforeEach(() => vi.mocked(reportsApi.getReports).mockReset())

  it('shows loading while metadata is fetched', () => {
    vi.mocked(reportsApi.getReports).mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve([]), 50)),
    )
    renderPage()
    expect(
      screen.getByRole('status', { name: 'Loading reports' }),
    ).toBeInTheDocument()
  })

  it('renders all available reports', async () => {
    vi.mocked(reportsApi.getReports).mockResolvedValue(reports)
    renderPage()
    expect(
      await screen.findByRole('heading', { name: 'Users' }),
    ).toBeInTheDocument()
    expect(document.title).toBe('Reports | Enfos Reporting Portal')
    expect(
      screen.getByRole('heading', { name: 'Departments' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Projects' }),
    ).toBeInTheDocument()
    expect(screen.getByText('3 reports')).toBeInTheDocument()
  })

  it('filters by trimmed case-insensitive name and clears search', async () => {
    vi.mocked(reportsApi.getReports).mockResolvedValue(reports)
    renderPage()
    const search = await screen.findByRole('searchbox', {
      name: 'Search reports by name',
    })
    fireEvent.change(search, { target: { value: '  USERS  ' } })
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Departments' }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('1 report')).toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'missing' } })
    expect(
      screen.getByRole('heading', { name: 'No reports match “missing”.' }),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(
      screen.getByRole('heading', { name: 'Departments' }),
    ).toBeInTheDocument()
  })

  it('shows a useful empty state when no reports exist', async () => {
    vi.mocked(reportsApi.getReports).mockResolvedValue([])
    renderPage()
    expect(
      await screen.findByRole('heading', {
        name: 'No reports are currently available.',
      }),
    ).toBeInTheDocument()
  })

  it('shows an error and retries the request', async () => {
    vi.mocked(reportsApi.getReports)
      .mockRejectedValueOnce(new Error('Unavailable'))
      .mockResolvedValueOnce(reports)
    renderPage()
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(
      await screen.findByRole('heading', { name: 'Users' }),
    ).toBeInTheDocument()
    expect(reportsApi.getReports).toHaveBeenCalledTimes(2)
  })
})
