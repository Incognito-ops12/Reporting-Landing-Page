import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { DepartmentsReportPage } from './pages/DepartmentsReportPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectsReportPage } from './pages/ProjectsReportPage'
import { ReportsLandingPage } from './pages/ReportsLandingPage'
import { UsersReportPage } from './pages/UsersReportPage'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ReportsLandingPage />} />
        <Route path="/reports/users" element={<UsersReportPage />} />
        <Route
          path="/reports/departments"
          element={<DepartmentsReportPage />}
        />
        <Route path="/reports/projects" element={<ProjectsReportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  )
}
