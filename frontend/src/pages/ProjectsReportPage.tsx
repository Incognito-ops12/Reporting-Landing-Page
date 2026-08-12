import { useProjectsReport } from '../hooks/useReports'
import { projectColumns } from '../routes/reportDefinitions'
import { ReportPage } from './ReportPage'

export function ProjectsReportPage() {
  const query = useProjectsReport()
  return (
    <ReportPage
      title="Projects"
      description="Active & past work"
      columns={projectColumns}
      query={query}
      getRowKey={(row) => row.projectId}
    />
  )
}
