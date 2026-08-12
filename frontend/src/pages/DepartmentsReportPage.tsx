import { useDepartmentsReport } from '../hooks/useReports'
import { departmentColumns } from '../routes/reportDefinitions'
import { ReportPage } from './ReportPage'

export function DepartmentsReportPage() {
  const query = useDepartmentsReport()
  return (
    <ReportPage
      title="Departments"
      description="Org structure"
      columns={departmentColumns}
      query={query}
      getRowKey={(row) => row.departmentId}
    />
  )
}
