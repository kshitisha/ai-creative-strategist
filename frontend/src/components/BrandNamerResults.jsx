import BrandNameCard from './BrandNameCard'

export default function BrandNamerResults({ names, onSelectName, onBack }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        >
          ← Back
        </button>
        <p className="text-xs text-gray-400">{names.length} brand names generated</p>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {names.map((nameObj, index) => (
          <BrandNameCard
            key={index}
            nameObj={nameObj}
            onSelect={() => onSelectName(nameObj)}
            position={index + 1}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 text-center">
        <p className="text-xs text-gray-400">
          Select a name to auto-fill it in your brand strategy form.
        </p>
      </div>
    </div>
  )
}