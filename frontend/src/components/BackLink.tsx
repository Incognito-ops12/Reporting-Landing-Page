import { Link } from 'react-router-dom'

export function BackLink() {
  return (
    <Link
      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
      to="/"
    >
      <span aria-hidden="true">←</span>
      Back to reports
    </Link>
  )
}
