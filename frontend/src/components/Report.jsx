import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const brandData = {
  name: "Mountain Peak Coffee",
  tagline: "Fuel Your Next Summit",
  archetype: "Explorer",
  confidence: 89,
  coreValues: ["Freedom", "Adventure", "Discovery"],
  brandVoice: ["Authentic", "Inspiring", "Rugged"],
  audience: {
    type: "Remote Workers",
    age: "25–40",
    role: "Professionals",
    motivations: ["Productivity", "Lifestyle", "Flexibility"],
    painPoints: ["Burnout", "Lack of routine"],
  },
  narrative: `The modern professional\nisn't climbing mountains.\n\nThey're building them.\n\nEvery morning begins\nwith a small decision:\nshow up or stay comfortable.`,
  photography: ["Natural Lighting", "Mountain Landscapes", "Warm Interiors"],
  typography: ["Modern Serif", "High Contrast Headlines"],
  colors: ["#3A2416", "#C89F65", "#F6F0E8", "#4A6741"],
  prompts: {
    instagram: "A lone hiker at golden hour holding a steaming coffee cup overlooking a misty mountain valley, cinematic lighting, warm tones, editorial photography style, shot on film",
    hero: "Premium coffee bag resting on weathered wood with mountain peaks in soft focus background, natural morning light, luxury product photography, muted earth tones",
    video: "Time-lapse of dawn breaking over mountain peaks, cut to close-up hands wrapping around warm coffee mug, ambient lo-fi morning sounds, 15 seconds, cinematic grade",
  },
  workflow: [
    "Brand Analysis",
    "Archetype Detection",
    "Audience Profiling",
    "Narrative Strategy",
    "Visual Direction",
    "Prompt Generation",
    "Review Agent",
  ],
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handle} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors">
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}

function SectionLabel({ number, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-semibold text-gray-300 tracking-widest uppercase">0{number}</span>
      <h2 className="text-sm font-semibold text-gray-400 tracking-wide uppercase">{title}</h2>
    </div>
  )
}

function Tag({ children, color = "gray" }) {
  const colors = {
    gray: "bg-gray-50 text-gray-600 border-gray-100",
    brown: "bg-[#F6F0E8] text-[#3A2416] border-[#e8ddd0]",
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}

export default function Report() {
  const [openPrompt, setOpenPrompt] = useState(null)
  const d = brandData

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">

      {/* Header */}
      <div className="text-center space-y-2 pb-8 border-b border-gray-100">
        <p className="text-xs text-gray-300 tracking-widest uppercase font-medium">AI Creative Strategist</p>
        <h1 className="text-3xl font-bold text-gray-900">{d.name}</h1>
        <p className="text-sm text-gray-400">Brand Strategy Report</p>
      </div>

      {/* Section 1 — Brand Identity */}
      <div>
        <SectionLabel number={1} title="Brand Identity" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1 flex flex-col items-center justify-center text-center space-y-2">
            <p className="text-xs text-gray-300 uppercase tracking-widest">Brand Archetype</p>
            <p className="text-4xl font-bold text-gray-900">{d.archetype}</p>
            <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full font-medium">
              Confidence {d.confidence}%
            </span>
          </Card>
          <Card className="md:col-span-1 space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Core Values</p>
            <div className="flex flex-wrap gap-2">
              {d.coreValues.map(v => <Tag key={v} color="brown">{v}</Tag>)}
            </div>
          </Card>
          <Card className="md:col-span-1 space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Brand Voice</p>
            <div className="flex flex-wrap gap-2">
              {d.brandVoice.map(v => <Tag key={v}>{v}</Tag>)}
            </div>
          </Card>
        </div>
      </div>

      {/* Section 2 — Audience */}
      <div>
        <SectionLabel number={2} title="Audience Insights" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="space-y-2">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Target Audience</p>
            <p className="text-2xl font-bold text-gray-900">{d.audience.type}</p>
            <p className="text-sm text-gray-400">{d.audience.age} · {d.audience.role}</p>
          </Card>
          <div className="space-y-4">
            <Card className="space-y-3">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Motivations</p>
              <div className="flex flex-wrap gap-2">
                {d.audience.motivations.map(m => <Tag key={m} color="brown">{m}</Tag>)}
              </div>
            </Card>
            <Card className="space-y-3">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Pain Points</p>
              <div className="flex flex-wrap gap-2">
                {d.audience.painPoints.map(p => <Tag key={p}>{p}</Tag>)}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Section 3 — Narrative */}
      <div>
        <SectionLabel number={3} title="Campaign Narrative" />
        <Card className="space-y-4">
          <p className="text-xl font-bold text-gray-900">{d.tagline}</p>
          <p className="text-gray-500 leading-relaxed whitespace-pre-line text-sm">{d.narrative}</p>
        </Card>
      </div>

      {/* Section 4 — Visual Direction */}
      <div>
        <SectionLabel number={4} title="Visual Direction" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Photography</p>
            <ul className="space-y-2">
              {d.photography.map(p => (
                <li key={p} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-green-400">✓</span> {p}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Typography</p>
            <ul className="space-y-2">
              {d.typography.map(t => (
                <li key={t} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-green-400">✓</span> {t}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Color Direction</p>
            <div className="space-y-2">
              {d.colors.map(c => (
                <div key={c} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg border border-gray-100 shadow-sm flex-shrink-0" style={{ backgroundColor: c }} />
                  <span className="text-xs text-gray-400 font-mono">{c}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Section 5 — Prompts */}
      <div>
        <SectionLabel number={5} title="Generated Creative Prompts" />
        <Card className="space-y-3">
          {Object.entries(d.prompts).map(([key, value]) => {
            const labels = { instagram: "Instagram Ad Prompt", hero: "Hero Image Prompt", video: "Video Prompt" }
            const isOpen = openPrompt === key
            return (
              <div key={key} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenPrompt(isOpen ? null : key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">{labels[key]}</span>
                  <span className="text-gray-300 text-xs">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-2">
                    <p className="text-sm text-gray-500 leading-relaxed">{value}</p>
                    <CopyButton text={value} />
                  </div>
                )}
              </div>
            )
          })}
        </Card>
      </div>

      {/* Section 6 — Workflow */}
      <div>
        <SectionLabel number={6} title="Agent Workflow" />
        <Card className="flex flex-col items-center space-y-2 py-8">
          {d.workflow.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <div className="px-6 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700">
                {step}
              </div>
              {i < d.workflow.length - 1 && (
                <div className="text-gray-200 text-lg leading-none my-1">↓</div>
              )}
            </div>
          ))}
        </Card>
      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-300">Generated by AI Creative Strategist</p>
        <button className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
          Download Strategy Report
        </button>
      </div>

    </div>
  )
}