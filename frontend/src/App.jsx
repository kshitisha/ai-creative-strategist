import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import InputForm from './components/InputForm'
import Report from './components/Report'
import PurposePage from './pages/PurposePage'
import TermsPage from './pages/TermsPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://kshitisha-ai-creative-strategist-api.hf.space/generate',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error(`Server error: ${response.status}`)
      const result = await response.json()
      result.brandName = formData.brandName
      setReportData(result)
      window.history.pushState({ page: 'report' }, '', window.location.href)
    } catch (err) {
      setError('Something went wrong. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setReportData(null)
    setError(null)
    window.history.replaceState({ page: 'home' }, '', window.location.href)
  }

  const handleNavigate = (targetPage) => {
    // If navigating away from report, clear it
    if (targetPage !== 'home') setReportData(null)
    setPage(targetPage)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.history.replaceState({ page: 'home' }, '', window.location.href)
    const handlePopState = (e) => {
      if (!e.state || e.state.page === 'home') setReportData(null)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Which page to show in the home tab
  const homeContent = () => {
    if (loading) return (
      <div className="min-h-screen bg-[#F9F8F6] pt-14 flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        <p className="text-sm text-gray-400 tracking-wide">Generating your brand strategy...</p>
      </div>
    )
    if (reportData) return <Report data={reportData} onReset={handleReset} />
    return (
      <div className="pt-14">
        <InputForm onSubmit={handleSubmit} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <Navbar currentPage={page} onNavigate={handleNavigate} />

      {error && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2 rounded-lg z-50 shadow-sm">
          {error}
        </div>
      )}

      {page === 'home' && homeContent()}
      {page === 'purpose' && <PurposePage />}
      {page === 'terms' && <TermsPage />}
      {page === 'contact' && <ContactPage />}
    </div>
  )
}//built by kshitisha
