export default function Navbar({ currentPage, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'purpose', label: 'Our Purpose' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'contact', label: 'Contact Us' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="text-sm font-bold text-gray-900 tracking-tight hover:text-gray-600 transition-colors"
        >
          AI Creative Strategist
        </button>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentPage === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}//built by kshitisha