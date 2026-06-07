import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { FaGithub, FaLinkedin, FaPinterest } from 'react-icons/fa'
import { Copy, Check } from 'lucide-react'



function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}

function SectionLabel({ number, title }) {
  const display = number < 10 ? `0${number}` : `${number}`
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-semibold text-gray-300 tracking-widest uppercase">{display}</span>
      <h2 className="text-sm font-semibold text-gray-400 tracking-wide uppercase">{title}</h2>
    </div>
  )
}

function Tag({ children, color = 'gray' }) {
  const colors = {
    gray: 'bg-gray-50 text-gray-600 border-gray-100',
    brown: 'bg-[#F6F0E8] text-[#3A2416] border-[#e8ddd0]',
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}const workflow = [
  'Brand Analysis',
  'Archetype Detection',
  'Audience Profiling',
  'Narrative Strategy',
  'Visual Direction',
  'Prompt Generation',
  'Review Agent',
]

const promptLabels = {
  instagram: 'Instagram Ad Prompt',
  hero: 'Hero Image Prompt',
  video: 'Video Prompt',
}



export default function Report({ data, onReset }) {
  const [openPrompt, setOpenPrompt] = useState(null)
  const reportRef = useRef(null)
  const d = data
//pdf export
  const downloadPDF = async () => {
    const element = reportRef.current
    if (!element) return

    
    const previousOpenPrompt = openPrompt
    setOpenPrompt('__all__') // sentinel value — see render logic below

    
    const controls = document.getElementById('pdf-controls')
    if (controls) controls.style.display = 'none'

    
    await new Promise(resolve => setTimeout(resolve, 150))

    
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    
    const totalPages = Math.ceil(imgHeight / pageHeight)

    
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage()
      const yOffset = -(i * pageHeight)
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight)
    }

    
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      pdf.setFontSize(9)
      pdf.setTextColor(180, 180, 180)
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 32, pageHeight - 8)
      
      pdf.setFontSize(8)
      pdf.text('AI Creative Strategist', 10, pageHeight - 8)
    }

    pdf.save(`${d.brandName || 'Strategy'}_Brand_Strategy_Report.pdf`)

    
    if (controls) controls.style.display = 'flex'
    setOpenPrompt(previousOpenPrompt)
  }

  
  const isPromptOpen = (key) => openPrompt === '__all__' || openPrompt === key

  return (
    <div ref={reportRef} className="max-w-3xl mx-auto px-6 py-16 space-y-12 bg-[#F9F8F6]">

      {/*header */}
      <div className="text-center space-y-2 pb-8 border-b border-gray-100">
        <p className="text-xs text-gray-300 tracking-widest uppercase font-medium">
          AI Creative Strategist
        </p>
        <h1 className="text-3xl font-bold text-gray-900">{d.brandName || d.archetype}</h1>
        <p className="text-sm text-gray-400">Brand Strategy Report</p>
      </div>

      {/*brand Identity*/}
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

      {/*audience */}
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

      {/*narrative */}
      <div>
        <SectionLabel number={3} title="Campaign Narrative" />
        <Card className="space-y-4">
          <p className="text-xl font-bold text-gray-900">{d.tagline}</p>
          <p className="text-gray-500 leading-relaxed whitespace-pre-line text-sm">{d.narrative}</p>
        </Card>
      </div>

      {/* visual Direction  */}
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
                  <div
                    className="w-7 h-7 rounded-lg border border-gray-100 shadow-sm flex-shrink-0"
                    style={{ backgroundColor: c }}
                  />
                  <span className="text-xs text-gray-400 font-mono">{c}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* prompts── */}
      
      <div>
        <SectionLabel number={5} title="Generated Creative Prompts" />
        <Card className="space-y-3">
          {Object.entries(d.prompts).map(([key, value]) => {
            const isOpen = isPromptOpen(key)
            return (
              <div key={key} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenPrompt(isOpen && openPrompt !== '__all__' ? null : key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">{promptLabels[key]}</span>
                  <span className="text-gray-300 text-xs">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-2">
                    <p className="text-sm text-gray-500 leading-relaxed">{value}</p>
                    {openPrompt !== '__all__' && <CopyButton text={value} />}
                  </div>
                )}
              </div>
            )
          })}
        </Card>
      </div>

      {/* agent Workflow  */}
      <div>
        <SectionLabel number={6} title="Agent Workflow" />
        <Card className="flex flex-col items-center space-y-2 py-8">
          {workflow.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <div className="px-6 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700">
                {step}
              </div>
              {i < workflow.length - 1 && (
                <div className="text-gray-200 text-lg leading-none my-1">↓</div>
              )}
            </div>
          ))}
        </Card>
      </div>

      

      

      {/* footer  */}
      
      <div className="pt-8 border-t border-gray-100 space-y-6">
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-gray-700">Where strategy meets aesthetics.</p>
          <p className="text-xs text-gray-400">Built by Kshitisha Negi — AI engineer, Strategist, Curator.</p>
          <p className="text-[11px] text-gray-300">
            Copyright © AI Creative Strategist 2026. All rights reserved.
          </p>
        </div>

        {/* Social links always visible, including in PDF */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/kshitisha"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            <FaGithub size={14} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kshitisha3333/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            <FaLinkedin size={14} /> LinkedIn
          </a>
          <a
            href="https://in.pinterest.com/ruuhhiii/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            <FaPinterest size={14} /> Pinterest
          </a>
        </div>

        {/* Action buttons — hidden during PDF export */}
        <div id="pdf-controls" className="flex items-center justify-center gap-3">
          <button
            onClick={onReset}
            className="text-xs border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← New Strategy
          </button>
          <button
            onClick={downloadPDF}
            className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Download Report
          </button>
        </div>
      </div>

    </div>
  )
}//built by kshitisha