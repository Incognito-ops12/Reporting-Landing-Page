interface PageHeaderProps {
  eyebrow?: string
  title: string
  description: string
  icon?: 'users' | 'building' | 'folder'
  meta?: string
}

import { Icon } from './Icon'

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  meta,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-4">
        {icon ? (
          <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-700 shadow-sm ring-1 ring-indigo-100">
            <Icon name={icon} className="size-6" />
          </span>
        ) : null}
        <div>
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-blue-700 uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-bold tracking-[-0.035em] text-[#11162f] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>
      </div>
      {meta ? (
        <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Icon name="calendar" className="size-4" />
          {meta}
        </p>
      ) : null}
    </header>
  )
}
