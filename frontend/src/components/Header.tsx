import { Link, useMatchRoute } from '@tanstack/react-router'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/lights', label: 'Lights' },
  { to: '/temperature', label: 'Temperature' },
  { to: '/camera', label: 'Camera' },
] as const

export default function Header() {
  const matchRoute = useMatchRoute()

  return (
    <header className="h-16 lg:h-20 px-4 sm:px-8 lg:px-14 shrink-0 mt-3 lg:mt-5 grid grid-cols-[auto_1fr_auto] items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 select-none">
        {/* Icon badge */}
        <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-[#C8601F] flex items-center justify-center shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        {/* Wordmark */}
        <div className="flex flex-col leading-none">
          <span className="text-[10px] lg:text-[12px] font-semibold tracking-[0.18em] text-stone-400 uppercase">Smart</span>
          <span className="text-[20px] lg:text-[26px] font-black tracking-tight text-stone-900 leading-none">
            YOLO<span className="text-[#C8601F]">HOME</span>
          </span> 
        </div>
      </Link>

      {/* Nav — center */}
      <nav className="hidden md:flex items-center justify-center gap-2">
        {navItems.map((item) => {
          const isActive = item.to === '/'
            ? matchRoute({ to: '/' }) !== false
            : matchRoute({ to: item.to, fuzzy: true }) !== false
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 lg:px-7 py-2 lg:py-2.5 rounded-2xl text-base lg:text-xl transition-all duration-150 ${
                isActive
                  ? 'bg-white text-stone-900 font-semibold shadow-sm shadow-stone-200/60'
                  : 'text-stone-500 font-medium hover:text-stone-700'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Right — icons + avatar + chevron */}
      <div className="flex items-center gap-1.5 lg:gap-2">
        {/* Notification */}
        <button className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/70 flex items-center justify-center text-stone-400 hover:bg-white hover:text-stone-600 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </button>
        {/* Settings - hidden on mobile */}
        <button className="hidden md:flex w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/70 items-center justify-center text-stone-400 hover:bg-white hover:text-stone-600 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
        {/* Avatar + chevron */}
        <button className="flex items-center gap-1 ml-0.5 group">
          <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white overflow-hidden flex items-center justify-center text-stone-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 10-16 0" />
            </svg>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden sm:block text-stone-400 group-hover:text-stone-600 transition-colors">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </header>
  )
}
