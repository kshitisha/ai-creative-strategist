export default function PurposePage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] pt-14">
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">

        {/* Hero */}
        <div className="space-y-4 pb-10 border-b border-gray-100">
          <p className="text-xs text-gray-300 tracking-widest uppercase font-medium">About</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">Our Purpose</h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
            We believe great ideas deserve great strategy.
          </p>
        </div>

        {/* Body */}
        <div className="space-y-8 text-gray-500 text-sm leading-[1.9]">
          <p>
            In a world overflowing with content, products, and brands, the challenge is no longer
            creating something — it is communicating it clearly.
          </p>
          <p>
            AI Creative Strategist was built to bridge the gap between inspiration and execution.
            Our goal is to help founders, creators, freelancers, marketers, startups, and dreamers
            transform rough ideas into coherent brand narratives. Through the power of artificial
            intelligence, strategic thinking, and creative direction, we generate actionable insights
            that traditionally require hours of workshops, consultations, and research.
          </p>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-2 shadow-sm">
            <p className="text-gray-900 font-semibold text-base">
              But this platform is not here to replace human creativity.
            </p>
            <p className="text-gray-500 text-sm">It exists to amplify it.</p>
          </div>

          <p>
            Every recommendation, narrative, visual direction, and creative prompt is designed to
            serve as a starting point — a catalyst for deeper thinking, stronger storytelling, and
            more intentional design decisions.
          </p>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { label: 'Strategy', body: 'Should be accessible to everyone — not just brands with agencies on retainer.' },
              { label: 'Creativity', body: 'Should be empowered by tools that understand the nuance of brand identity.' },
              { label: 'Voice', body: 'Every brand deserves the opportunity to discover what makes it truly distinct.' },
            ].map(item => (
              <div key={item.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <p>
            Where strategy meets aesthetics. Where data meets imagination. Where ideas become identities.
          </p>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-300 italic">
              Built with curiosity, creativity, and a deep respect for the people who dare to build
              something meaningful.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}//built by kshitisha