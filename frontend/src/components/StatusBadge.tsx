import type { ProjectStatus, UserStatus } from '../types/reports'

type Status = UserStatus | ProjectStatus

const styles: Record<Status, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  INACTIVE: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  COMPLETED: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  PLANNED: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  ON_HOLD: 'bg-amber-50 text-amber-800 ring-amber-600/20',
}

const labels: Record<Status, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  COMPLETED: 'Completed',
  PLANNED: 'Planned',
  ON_HOLD: 'On hold',
}

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
