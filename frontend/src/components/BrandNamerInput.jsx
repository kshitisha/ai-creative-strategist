import { useState } from 'react'

export default function BrandNamerInput({ onGenerate, isLoading, error }) {
  const [formData, setFormData] = useState({
    product_description: '',
    target_audience: '',
    business_goal: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.product_description.trim() || formData.product_description.trim().length < 10) {
      alert('Please describe your product/service (at least 10 characters)')
      return
    }
    if (!formData.target_audience.trim() || formData.target_audience.trim().length < 5) {
      alert('Please describe your target audience')
      return
    }
    if (!formData.business_goal.trim() || formData.business_goal.trim().length < 5) {
      alert('Please describe your business goal')
      return
    }

    onGenerate(formData)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Product Description */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          What does your brand do?
          <span className="block text-[11px] font-normal text-gray-300 mt-1">
            Describe your product, service, or business
          </span>
        </label>
        <textarea
          name="product_description"
          value={formData.product_description}
          onChange={handleChange}
          placeholder="E.g., A sustainable fashion brand creating ethically-sourced organic cotton apparel..."
          rows="3"
          disabled={isLoading}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition disabled:bg-gray-50 disabled:text-gray-400 resize-none"
        />
      </div>

      {/* Target Audience */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Who is your target audience?
          <span className="block text-[11px] font-normal text-gray-300 mt-1">
            Describe your ideal customer
          </span>
        </label>
        <textarea
          name="target_audience"
          value={formData.target_audience}
          onChange={handleChange}
          placeholder="E.g., Environmentally-conscious women aged 25-40, urban professionals seeking quality..."
          rows="3"
          disabled={isLoading}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition disabled:bg-gray-50 disabled:text-gray-400 resize-none"
        />
      </div>

      {/* Business Goal */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          What's your main goal?
          <span className="block text-[11px] font-normal text-gray-300 mt-1">
            E.g., profitability, growth, market disruption, social impact
          </span>
        </label>
        <textarea
          name="business_goal"
          value={formData.business_goal}
          onChange={handleChange}
          placeholder="E.g., To become the leading sustainable fashion brand globally while maintaining 40% profit margins..."
          rows="3"
          disabled={isLoading}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition disabled:bg-gray-50 disabled:text-gray-400 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Brand Names'}
      </button>

      {/* Note */}
      <p className="text-xs text-gray-400 text-center">
        We'll generate 10 unique brand names with taglines and confidence scores.
      </p>
    </form>
  )
}