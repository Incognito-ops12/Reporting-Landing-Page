import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as reportsApi from '../api/reports'
import App from '../App'

vi.mock('../api/reports')

function renderRoute(route: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('report detail pages', () => {
  beforeEach(() => {
    vi.mocked(reportsApi.getReports).mockReset()
    vi.mocked(reportsApi.getUsersReport).mockReset()
    vi.mocked(reportsApi.getDepartmentsReport).mockReset()
    vi.mocked(reportsApi.getProjectsReport).mockReset()
  })

  it('renders every required Users column and row value', async () => {
    vi.mocked(reportsApi.getUsersReport).mockResolvedValue([
      {
        userId: 'USR-1001',
        name: 'Maya Thompson',
        email: 'maya.thompson@example.test',
        role: 'Program Manager',
        status: 'ACTIVE',
        createdDate: '2023-02-14',
      },
    ])
    renderRoute('/reports/users')

    const table = await screen.findByRole('table', { name: 'Users report' })
    expect(document.title).toBe('Users | Enfos Reporting Portal')
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((header) => header.textContent),
    ).toEqual(['User ID', 'Name', 'Email', 'Role', 'Status', 'Created Date'])
    expect(within(table).getByText('Maya Thompson')).toBeInTheDocument()
    expect(within(table).getByText('Active')).toBeInTheDocument()
    expect(within(table).getByText('Feb 14, 2023')).toBeInTheDocument()
  })

  it('renders every required Departments column', async () => {
    vi.mocked(reportsApi.getDepartmentsReport).mockResolvedValue([
      {
        departmentId: 'DEP-101',
        departmentName: 'Environmental Operations',
        manager: 'Jordan Lee',
        employeeCount: 24,
        location: 'Chicago, IL',
      },
    ])
    renderRoute('/reports/departments')

    const table = await screen.findByRole('table', {
      name: 'Departments report',
    })
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((header) => header.textContent),
    ).toEqual([
      'Department ID',
      'Department Name',
      'Manager',
      'Employee Count',
      'Location',
    ])
    expect(
      within(table).getByText('Environmental Operations'),
    ).toBeInTheDocument()
  })

  it('renders Projects dates and an accessible missing end date', async () => {
    vi.mocked(reportsApi.getProjectsReport).mockResolvedValue([
      {
        projectId: 'PRJ-2001',
        projectName: 'North Basin Remediation',
        department: 'Environmental Operations',
        owner: 'Elena Garcia',
        status: 'ON_HOLD',
        startDate: '2025-04-07',
        endDate: null,
      },
    ])
    renderRoute('/reports/projects')

    const table = await screen.findByRole('table', { name: 'Projects report' })
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((header) => header.textContent),
    ).toEqual([
      'Project ID',
      'Project Name',
      'Department',
      'Owner',
      'Status',
      'Start Date',
      'End Date',
    ])
    expect(within(table).getByText('On hold')).toBeInTheDocument()
    expect(within(table).getByText('Apr 7, 2025')).toBeInTheDocument()
    expect(within(table).getByLabelText('Not scheduled')).toBeInTheDocument()
  })

  it('shows loading and empty states', async () => {
    vi.mocked(reportsApi.getUsersReport).mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve([]), 50)),
    )
    renderRoute('/reports/users')
    expect(
      screen.getByRole('status', { name: 'Loading report data' }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', {
        name: 'No data available for this report.',
      }),
    ).toBeInTheDocument()
  })

  it('shows an error, retries, and provides back navigation', async () => {
    vi.mocked(reportsApi.getProjectsReport)
      .mockRejectedValueOnce(new Error('Unavailable'))
      .mockResolvedValueOnce([])
    renderRoute('/reports/projects')

    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Back to reports' }),
    ).toHaveAttribute('href', '/')
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(
      await screen.findByRole('heading', {
        name: 'No data available for this report.',
      }),
    ).toBeInTheDocument()
    expect(reportsApi.getProjectsReport).toHaveBeenCalledTimes(2)
  })

  it('filters report rows and clears a no-results search', async () => {
    vi.mocked(reportsApi.getUsersReport).mockResolvedValue([
      {
        userId: 'USR-1001',
        name: 'Maya Thompson',
        email: 'maya@example.test',
        role: 'Program Manager',
        status: 'ACTIVE',
        createdDate: '2023-02-14',
      },
      {
        userId: 'USR-1002',
        name: 'Marcus Chen',
        email: 'marcus@example.test',
        role: 'Data Analyst',
        status: 'INACTIVE',
        createdDate: '2024-03-20',
      },
    ])
    renderRoute('/reports/users')

    const search = await screen.findByRole('searchbox', {
      name: 'Search Users report',
    })
    fireEvent.change(search, { target: { value: 'analyst' } })
    expect(screen.getByText('Marcus Chen')).toBeInTheDocument()
    expect(screen.queryByText('Maya Thompson')).not.toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'missing' } })
    expect(
      screen.getByRole('heading', {
        name: 'No users match “missing”.',
      }),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(screen.getByText('Maya Thompson')).toBeInTheDocument()
  })

  it('refreshes and exports report data', async () => {
    vi.mocked(reportsApi.getDepartmentsReport).mockResolvedValue([
      {
        departmentId: 'DEP-101',
        departmentName: 'Environmental Operations',
        manager: 'Jordan Lee',
        employeeCount: 24,
        location: 'Chicago, IL',
      },
    ])
    const createObjectURL = vi.fn(() => 'blob:report')
    const revokeObjectURL = vi.fn()
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL,
    })
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURL,
    })
    const anchorClick = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined)

    renderRoute('/reports/departments')
    await screen.findByRole('table', { name: 'Departments report' })

    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }))
    expect(reportsApi.getDepartmentsReport).toHaveBeenCalledTimes(2)

    fireEvent.click(screen.getByRole('button', { name: 'Export' }))
    expect(createObjectURL).toHaveBeenCalledOnce()
    expect(anchorClick).toHaveBeenCalledOnce()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:report')
  })
})
