import type { UseQueryResult } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { BackLink } from '../components/BackLink'
import { DataTable, type TableColumn } from '../components/DataTable'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { PageHeader } from '../components/PageHeader'
import { Icon } from '../components/Icon'
import { SearchInput } from '../components/SearchInput'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

interface ReportPageProps<Row> {
  title: string
  description: string
  columns: TableColumn<Row>[]
  query: UseQueryResult<Row[], Error>
  getRowKey: (row: Row) => string
  icon: 'users' | 'building' | 'folder'
}

export function ReportPage<Row>({
  title,
  description,
  columns,
  query,
  getRowKey,
  icon,
}: ReportPageProps<Row>) {
  useDocumentTitle(title)
  const [searchText, setSearchText] = useState('')
  const normalizedSearch = searchText.trim().toLocaleLowerCase()
  const filteredRows = useMemo(
    () =>
      (query.data ?? []).filter((row) =>
        Object.values(row as Record<string, unknown>).some((value) =>
          String(value ?? '')
            .toLocaleLowerCase()
            .includes(normalizedSearch),
        ),
      ),
    [normalizedSearch, query.data],
  )

  function exportCsv() {
    if (!query.data?.length) return
    const header = columns.map((column) => column.header)
    const body = query.data.map((row) =>
      Object.values(row as Record<string, unknown>).map(
        (value) => `"${String(value ?? '').replaceAll('"', '""')}"`,
      ),
    )
    const csv = [header, ...body].map((line) => line.join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${title.toLocaleLowerCase()}-report.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl">
      <BackLink />
      <div className="mt-5">
        <PageHeader
          eyebrow="Report"
          title={title}
          description={description}
          icon={icon}
          meta="Last updated: Aug 11, 2026"
        />
      </div>
      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white/60 p-2 shadow-[0_14px_45px_rgba(15,23,42,0.04)] sm:p-3">
        {query.isSuccess && query.data.length > 0 ? (
          <div className="mb-3 flex flex-col gap-3 rounded-xl bg-white p-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-sm">
              <SearchInput
                id="row-search"
                label={`Search ${title} report`}
                placeholder="Search in report…"
                value={searchText}
                onChange={setSearchText}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void query.refetch()}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 active:scale-[0.98] sm:flex-none"
              >
                <Icon
                  name="refresh"
                  className={`size-4 ${query.isFetching ? 'animate-spin' : ''}`}
                />
                Refresh
              </button>
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 active:scale-[0.98] sm:flex-none"
              >
                <Icon name="download" className="size-4" />
                Export
              </button>
            </div>
          </div>
        ) : null}
        {query.isPending ? <LoadingState variant="table" /> : null}
        {query.isError ? (
          <ErrorState onRetry={() => void query.refetch()} />
        ) : null}
        {query.isSuccess && query.data.length === 0 ? (
          <EmptyState
            title="No data available for this report."
            message="Report data will appear here when it becomes available."
          />
        ) : null}
        {query.isSuccess &&
        query.data.length > 0 &&
        filteredRows.length === 0 ? (
          <EmptyState
            title={`No ${title.toLocaleLowerCase()} match “${searchText.trim()}”.`}
            message="Try a different search term or clear the current search."
            actionLabel="Clear search"
            onAction={() => setSearchText('')}
          />
        ) : null}
        {query.isSuccess && filteredRows.length > 0 ? (
          <DataTable
            caption={`${title} report`}
            columns={columns}
            rows={filteredRows}
            getRowKey={getRowKey}
          />
        ) : null}
      </div>
    </div>
  )
}
