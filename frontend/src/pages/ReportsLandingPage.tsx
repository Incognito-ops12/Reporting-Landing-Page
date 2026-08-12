import { useMemo, useState } from 'react'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { PageHeader } from '../components/PageHeader'
import { ReportGrid } from '../components/ReportGrid'
import { SearchInput } from '../components/SearchInput'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useReports } from '../hooks/useReports'

export function ReportsLandingPage() {
  useDocumentTitle('Reports')
  const [searchText, setSearchText] = useState('')
  const reportsQuery = useReports()
  const normalizedSearch = searchText.trim().toLocaleLowerCase()
  const filteredReports = useMemo(
    () =>
      (reportsQuery.data ?? []).filter((report) =>
        report.name.toLocaleLowerCase().includes(normalizedSearch),
      ),
    [normalizedSearch, reportsQuery.data],
  )

  return (
    <div className="max-w-6xl">
      <PageHeader
        eyebrow="Reporting portal"
        title="Reports"
        description="Browse and explore available company reports."
      />
      <section className="mt-10" aria-labelledby="reports-section-title">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="reports-section-title"
              className="text-lg font-bold text-[#11162f]"
            >
              Available reports
            </h2>
            <p aria-live="polite" className="mt-1 text-sm text-slate-500">
              {reportsQuery.isSuccess
                ? `${filteredReports.length} ${filteredReports.length === 1 ? 'report' : 'reports'}`
                : 'Find a report by name'}
            </p>
          </div>
          <div className="w-full sm:max-w-md">
            <SearchInput value={searchText} onChange={setSearchText} />
          </div>
        </div>

        {reportsQuery.isPending ? <LoadingState variant="cards" /> : null}
        {reportsQuery.isError ? (
          <ErrorState
            title="We couldn't load the available reports."
            onRetry={() => void reportsQuery.refetch()}
          />
        ) : null}
        {reportsQuery.isSuccess && reportsQuery.data.length === 0 ? (
          <EmptyState
            title="No reports are currently available."
            message="Please check back later or contact your administrator."
          />
        ) : null}
        {reportsQuery.isSuccess &&
        reportsQuery.data.length > 0 &&
        filteredReports.length === 0 ? (
          <EmptyState
            title={`No reports match “${searchText.trim()}”.`}
            message="Try a different report name or clear your search."
            actionLabel="Clear search"
            onAction={() => setSearchText('')}
          />
        ) : null}
        {reportsQuery.isSuccess && filteredReports.length > 0 ? (
          <ReportGrid reports={filteredReports} />
        ) : null}
      </section>
    </div>
  )
}
