import { Link } from 'react-router-dom'

export function BackLink() {
  return (
    <Link
      className="back-link inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-indigo-700 transition-all duration-200 hover:gap-3 hover:text-indigo-900"
      to="/"
    >
      <span aria-hidden="true">←</span>
      Back to reports
    </Link>
  )
}
