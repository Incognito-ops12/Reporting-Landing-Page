import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ReportsLandingPage } from './pages/ReportsLandingPage'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ReportsLandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}
