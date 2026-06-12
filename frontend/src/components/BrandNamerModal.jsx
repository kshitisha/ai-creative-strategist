import { useState } from 'react'
import BrandNamerInput from './BrandNamerInput'
import BrandNamerResults from './BrandNamerResults'

export default function BrandNamerModal({ isOpen, onClose, onSelectName }) {
  const [step, setStep] = useState('input') // 'input' | 'loading' | 'results'
  const [formData, setFormData] = useState({
    product_description: '',
    target_audience: '',
    business_goal: ''
  })
  const [generatedNames, setGeneratedNames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

 const handleGenerateNames = async (data) => {
  setFormData(data)
  setIsLoading(true)
  setError(null)

  try {
    const response = await fetch('https://kshitisha-ai-creative-strategist-api.hf.space/generate-brand-names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      
      const result = await response.json()
      setGeneratedNames(result.names || [])
      setStep('results')
    } catch (err) {
      console.error('Brand namer error:', err)
      setError(err.message || 'Failed to generate names. Please try again.')
      setStep('input')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectName = (nameObj) => {
    onSelectName(nameObj.name)
    onClose()
  }

  const handleClose = () => {
    setStep('input')
    setFormData({
      product_description: '',
      target_audience: '',
      business_goal: ''
    })
    setGeneratedNames([])
    setError(null)
    onClose()
  }

  const handleBackToInput = () => {
    setStep('input')
    setGeneratedNames([])
    setError(null)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20 px-4 pb-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl border border-gray-100 shadow-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Brand Name Generator</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
          {step === 'input' && (
            <BrandNamerInput
              onGenerate={handleGenerateNames}
              isLoading={isLoading}
              error={error}
            />
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
              <p className="text-sm text-gray-400 tracking-wide">Generating brand names...</p>
            </div>
          )}

          {step === 'results' && (
            <BrandNamerResults
              names={generatedNames}
              onSelectName={handleSelectName}
              onBack={handleBackToInput}
            />
          )}
        </div>
      </div>
    </div>
  )
}