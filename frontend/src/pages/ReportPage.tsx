import type { UseQueryResult } from '@tanstack/react-query'
import { BackLink } from '../components/BackLink'
import { DataTable, type TableColumn } from '../components/DataTable'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { PageHeader } from '../components/PageHeader'

interface ReportPageProps<Row> {
  title: string
  description: string
  columns: TableColumn<Row>[]
  query: UseQueryResult<Row[], Error>
  getRowKey: (row: Row) => string
}

export function ReportPage<Row>({
  title,
  description,
  columns,
  query,
  getRowKey,
}: ReportPageProps<Row>) {
  return (
    <div>
      <BackLink />
      <div className="mt-5">
        <PageHeader eyebrow="Report" title={title} description={description} />
      </div>
      <div className="mt-8">
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
        {query.isSuccess && query.data.length > 0 ? (
          <DataTable
            caption={`${title} report`}
            columns={columns}
            rows={query.data}
            getRowKey={getRowKey}
          />
        ) : null}
      </div>
    </div>
  )
}
