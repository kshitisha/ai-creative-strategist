export default function BrandNameCard({ nameObj, onSelect, position }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:bg-white hover:border-gray-200 transition-all space-y-3">
      {/* Name Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-2 flex-1">
          <span className="text-[10px] font-semibold text-gray-300 tracking-widest">
            {position < 10 ? `0${position}` : position}
          </span>
          <h3 className="text-lg font-bold text-gray-900">{nameObj.name}</h3>
        </div>
        {/* Confidence Stars */}
        <div className="flex gap-0.5 text-sm whitespace-nowrap">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < nameObj.confidence_stars ? 'text-yellow-400' : 'text-gray-300'}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm italic text-gray-600">"{nameObj.tagline}"</p>

      {/* Confidence Info */}
      <div className="flex items-center gap-2 py-2 border-t border-gray-200">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
          Confidence
        </span>
        <span className="text-sm font-bold text-gray-900">
          {(nameObj.confidence_score * 100).toFixed(0)}%
        </span>
      </div>

      {/* Rationale */}
      <p className="text-xs text-gray-600 leading-relaxed">{nameObj.rationale}</p>

      {/* Select Button */}
      <button
        onClick={onSelect}
        className="w-full mt-2 px-4 py-2.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 transition-colors"
      >
        Select this name
      </button>
    </div>
  )
}