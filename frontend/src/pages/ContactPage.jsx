import { useState } from 'react'
import { FaGithub, FaLinkedin, FaPinterest } from 'react-icons/fa'

function ContactForm({ onBack }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', jobTitle: '',
    phone: '', country: '', company: '', industry: '', message: '', agree: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.agree) return
    setSending(true)
    setSendError(null)
    try {
      const res = await fetch('https://formspree.io/f/xjgdyngz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          jobTitle: form.jobTitle,
          phone: form.phone,
          country: form.country,
          company: form.company,
          industry: form.industry,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setSendError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) return (
    <div className="min-h-screen bg-[#F9F8F6] pt-14 flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-4">
        <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-500 text-xl">✓</div>
        <h2 className="text-2xl font-bold text-gray-900">Thank you.</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          We've received your message and will get back to you shortly.
        </p>
        <button
          onClick={onBack}
          className="text-xs text-gray-400 hover:text-gray-700 transition-colors underline underline-offset-2"
        >
          Back to Contact
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F9F8F6] pt-14">
      <div className="max-w-2xl mx-auto px-6 py-20 space-y-10">

        <div className="space-y-2">
          <p className="text-xs text-gray-300 tracking-widest uppercase font-medium">Get in Touch</p>
          <h1 className="text-3xl font-bold text-gray-900">Submit a Request</h1>
          <p className="text-sm text-gray-400">
            Please provide the following information and we'll get back to you.
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">First Name *</label>
              <input name="firstName" value={form.firstName} onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Last Name *</label>
              <input name="lastName" value={form.lastName} onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Work Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Job Title</label>
              <input name="jobTitle" value={form.jobTitle} onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone (Optional)</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Country</label>
              <input name="country" value={form.country} onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Company</label>
              <input name="company" value={form.company} onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Industry</label>
            <input name="industry" value={form.industry} onChange={handleChange}
              placeholder="e.g. Fashion, Technology, F&B, Marketing..."
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">How can we help?</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition resize-none" />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-gray-900" />
            <span className="text-xs text-gray-400 leading-relaxed">
              I agree to receive communication regarding my inquiry. By submitting this form,
              I acknowledge that I have read and understood the{' '}
              <span className="text-gray-600 underline underline-offset-2">Terms & Conditions</span>.
            </span>
          </label>

          {sendError && (
            <p className="text-xs text-red-500">{sendError}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={sending}
          className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : 'Submit Request'}
        </button>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [showForm, setShowForm] = useState(false)

  if (showForm) return <ContactForm onBack={() => setShowForm(false)} />

  return (
    <div className="min-h-screen bg-[#F9F8F6] pt-14">
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">

        <div className="space-y-4 pb-10 border-b border-gray-100">
          <p className="text-xs text-gray-300 tracking-widest uppercase font-medium">Get in Touch</p>
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
            Questions about AI Creative Strategist? Feedback, partnerships, or a bug to report?
            We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm space-y-4 text-center">
          <p className="text-sm text-gray-400">Ready to reach out?</p>
          <h2 className="text-2xl font-bold text-gray-900">Submit a Request</h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            Fill out our contact form and we'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Submit a Request →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <FaGithub size={22} />, href: 'https://github.com/kshitisha', desc: 'Code, experiments, and late-night engineering decisions.' },
            { icon: <FaLinkedin size={22} />, href: 'https://www.linkedin.com/in/kshitisha3333/', desc: 'Connect professionally or send a message.' },
            { icon: <FaPinterest size={22} />, href: 'https://in.pinterest.com/ruuhhiii/', desc: 'Curated references in design, fashion, architecture, storytelling, and visual culture..' },
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noreferrer"
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3 hover:shadow-md transition-shadow block group">
              <span className="text-gray-400 group-hover:text-gray-700 transition-colors inline-block">
                {link.icon}
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">{link.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}//built by kshitisha