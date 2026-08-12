import type { ReportMetadata } from '../types/reports'
import { ReportCard } from './ReportCard'

interface ReportGridProps {
  reports: ReportMetadata[]
}

export function ReportGrid({ reports }: ReportGridProps) {
  return (
    <section
      aria-label="Available reports"
      className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </section>
  )
}
