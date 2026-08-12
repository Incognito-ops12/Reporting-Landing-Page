import { Link } from 'react-router-dom'
import type { ReportMetadata } from '../types/reports'

interface ReportCardProps {
  report: ReportMetadata
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})

export function ReportCard({ report }: ReportCardProps) {
  return (
    <article className="group flex min-h-60 flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            {report.name}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {report.description}
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          {report.rowCount.toLocaleString()} rows
        </span>
      </div>
      <p className="mt-auto pt-8 text-xs text-slate-500">
        Updated{' '}
        <time dateTime={report.lastUpdated}>
          {dateFormatter.format(new Date(report.lastUpdated))}
        </time>
      </p>
      <Link
        className="mt-4 inline-flex min-h-11 items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-blue-700"
        to={`/reports/${report.id}`}
        aria-label={`View ${report.name} report`}
      >
        View report
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </article>
  )
}
