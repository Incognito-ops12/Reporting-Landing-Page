import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <div>
      <PageHeader
        eyebrow="404"
        title="Page not found"
        description="The page you requested does not exist or may have moved."
      />
      <Link
        className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
        to="/"
      >
        Return to reports
      </Link>
    </div>
  )
}
