import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            className="text-sm font-semibold tracking-wide text-slate-950"
            to="/"
          >
            ENFOS <span className="font-normal text-slate-500">Reporting</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </main>
    </div>
  )
}
