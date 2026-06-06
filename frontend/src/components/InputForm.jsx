import { useState } from 'react'

export default function InputForm({ onSubmit }) {
  const [form, setForm] = useState({
    brandName: '',
    brandDescription: '',
    targetAudience: '',
    campaignGoal: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.brandName || !form.brandDescription || !form.targetAudience || !form.campaignGoal) return
    onSubmit(form)
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs text-gray-300 tracking-widest uppercase font-medium">AI Creative Strategist</p>
          <h1 className="text-3xl font-bold text-gray-900">Build your brand strategy.</h1>
          <p className="text-sm text-gray-400">Fill in four fields. Get a full creative package.</p>
        </div>

        {/* Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Brand Name</label>
            <input
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              placeholder="e.g. Mountain Peak Coffee"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Brand Description</label>
            <textarea
              name="brandDescription"
              value={form.brandDescription}
              onChange={handleChange}
              placeholder="e.g. Premium small-batch coffee for remote workers who treat their mornings like a ritual."
              rows={3}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Target Audience</label>
            <input
              name="targetAudience"
              value={form.targetAudience}
              onChange={handleChange}
              placeholder="e.g. Remote professionals, 25–40, value quality and independence"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Campaign Goal</label>
            <input
              name="campaignGoal"
              value={form.campaignGoal}
              onChange={handleChange}
              placeholder="e.g. Launch Instagram campaign to drive online store traffic"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
        >
          Generate Strategy →
        </button>

      </div>
    </div>
  )
}