import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import type { ReportMetadata } from '../types/reports'
import { DataTable, type TableColumn } from './DataTable'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { ReportCard } from './ReportCard'
import { SearchInput } from './SearchInput'
import { StatusBadge } from './StatusBadge'

describe('shared components', () => {
  it('renders accessible report card metadata and navigation', () => {
    const report: ReportMetadata = {
      id: 'users',
      name: 'Users',
      description: 'People in the system',
      lastUpdated: '2026-08-11T14:30:00Z',
      rowCount: 15,
    }

    render(
      <MemoryRouter>
        <ReportCard report={report} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
    expect(screen.getByText('15 rows')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'View Users report' }),
    ).toHaveAttribute('href', '/reports/users')
    expect(screen.getByText('Aug 11, 2026')).toBeInTheDocument()
  })

  it('reports search input changes', () => {
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)

    fireEvent.change(
      screen.getByRole('searchbox', { name: 'Search reports by name' }),
      {
        target: { value: 'Users' },
      },
    )

    expect(onChange).toHaveBeenCalledWith('Users')
  })

  it('renders a semantic typed table', () => {
    interface Row {
      id: string
      name: string
    }
    const columns: TableColumn<Row>[] = [
      { key: 'id', header: 'ID', render: (row) => row.id },
      { key: 'name', header: 'Name', render: (row) => row.name },
    ]

    render(
      <DataTable
        caption="Example report"
        columns={columns}
        rows={[{ id: '1', name: 'Maya' }]}
        getRowKey={(row) => row.id}
      />,
    )

    const table = screen.getByRole('table', { name: 'Example report' })
    expect(
      screen.getByRole('region', {
        name: 'Example report, scroll horizontally to view all columns',
      }),
    ).toHaveAttribute('tabindex', '0')
    expect(within(table).getAllByRole('columnheader')).toHaveLength(2)
    expect(
      within(table).getByRole('cell', { name: 'Maya' }),
    ).toBeInTheDocument()
  })

  it('renders readable status labels', () => {
    render(<StatusBadge status="ON_HOLD" />)
    expect(screen.getByText('On hold')).toBeInTheDocument()
  })

  it('provides labeled loading and retry states', () => {
    const onRetry = vi.fn()
    const { rerender } = render(<LoadingState variant="cards" />)
    expect(
      screen.getByRole('status', { name: 'Loading reports' }),
    ).toBeInTheDocument()

    rerender(<ErrorState onRetry={onRetry} />)
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
