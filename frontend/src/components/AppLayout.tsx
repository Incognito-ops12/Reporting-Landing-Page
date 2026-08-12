import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from './Icon'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f6f7fb] lg:grid lg:grid-cols-[248px_1fr]">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <aside className="border-b border-slate-200/80 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-b-0">
        <div className="flex h-18 items-center px-5 lg:px-6">
          <Link
            className="inline-flex items-center gap-3 text-sm font-bold tracking-tight text-[#10152f]"
            to="/"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
              <Icon name="grid" className="size-4" />
            </span>
            ENFOS Reporting
          </Link>
        </div>
        <nav
          aria-label="Primary navigation"
          className="flex gap-2 border-t border-slate-100 px-4 py-3 lg:flex-col lg:py-5"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `inline-flex min-h-11 flex-1 items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-colors duration-200 lg:flex-none ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`
            }
          >
            <Icon name="grid" className="size-4" /> Reports
          </NavLink>
          <a
            href="https://www.enfos.com"
            className="hidden min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950 lg:inline-flex"
          >
            <span className="grid size-4 place-items-center rounded-full border border-current text-[10px]">
              i
            </span>{' '}
            About
          </a>
        </nav>
        <div className="mt-auto hidden border-t border-slate-100 p-5 lg:block">
          <p className="text-xs font-semibold text-slate-900">
            Reporting workspace
          </p>
          <p className="mt-1 text-xs text-slate-500">Internal data portal</p>
        </div>
      </aside>
      <main
        id="main-content"
        tabIndex={-1}
        className="page-enter mx-auto w-full max-w-360 px-4 py-8 sm:px-7 sm:py-10 lg:px-10 xl:px-14 xl:py-12"
      >
        {children}
      </main>
    </div>
  )
}
