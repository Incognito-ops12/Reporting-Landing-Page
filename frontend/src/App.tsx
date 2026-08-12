import { Navigate, Route, Routes } from 'react-router-dom'

function ScaffoldPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Enfos Reporting Portal
      </h1>
      <p className="mt-3 text-slate-600">Frontend scaffold is ready.</p>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ScaffoldPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
