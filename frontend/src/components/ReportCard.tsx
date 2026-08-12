import { Link } from 'react-router-dom'
import type { ReportMetadata } from '../types/reports'
import { Icon } from './Icon'

interface ReportCardProps {
  report: ReportMetadata
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})

export function ReportCard({ report }: ReportCardProps) {
  const identity = {
    users: { icon: 'users' as const, color: 'bg-violet-100 text-violet-700' },
    departments: {
      icon: 'building' as const,
      color: 'bg-emerald-100 text-emerald-700',
    },
    projects: { icon: 'folder' as const, color: 'bg-blue-100 text-blue-700' },
  }[report.id]
  return (
    <article className="report-card group flex min-h-72 flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] transition-all duration-250 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_18px_45px_rgba(79,70,229,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`mb-5 grid size-12 place-items-center rounded-2xl ${identity.color}`}
          >
            <Icon name={identity.icon} className="size-6" />
          </span>
          <h2 className="text-lg font-semibold text-slate-950">
            {report.name}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {report.description}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
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
        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 text-sm font-semibold text-indigo-700 transition-all duration-200 hover:bg-indigo-600 hover:text-white active:scale-[0.98]"
        to={`/reports/${report.id}`}
        aria-label={`View ${report.name} report`}
      >
        View report
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </article>
  )
}
