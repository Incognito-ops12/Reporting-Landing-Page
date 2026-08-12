import { useUsersReport } from '../hooks/useReports'
import { userColumns } from '../routes/reportDefinitions'
import { ReportPage } from './ReportPage'

export function UsersReportPage() {
  const query = useUsersReport()
  return (
    <ReportPage
      title="Users"
      description="People in the system"
      columns={userColumns}
      query={query}
      getRowKey={(row) => row.userId}
      icon="users"
    />
  )
}
