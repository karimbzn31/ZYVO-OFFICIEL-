import { useTheme } from '../context/theme'

export default function Logo({ showText = true, logoSize = 'sm' }) {
  const { theme } = useTheme()

  const sizes = {
    sm: { icon: 32, text: 'text-lg', gap: 1.5, dot: 8 },
    md: { icon: 40, text: 'text-xl', gap: 2, dot: 10 },
    lg: { icon: 52, text: 'text-2xl', gap: 2.5, dot: 12 },
  }
  const s = sizes[logoSize] || sizes.sm

  return (
    <div className={`flex items-center gap-${s.gap} group shrink-0`}>
      <div className="relative shrink-0" style={{ width: s.icon, height: s.icon }}>
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="logo-z" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="url(#logo-bg)" />
          <rect x="0.5" y="0.5" width="31" height="31" rx="8" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <path
            d="M9 11h14l-12 10h12"
            stroke="url(#logo-z)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div
          className="absolute -top-0.5 -right-0.5 bg-zyvo-gold rounded-full animate-pulse-soft shadow-lg"
          style={{ width: s.dot / 2, height: s.dot / 2 }}
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${s.text} font-extrabold gradient-text-brand leading-tight`}>Zyvo</span>
          <span className="text-[7px] sm:text-[8px] font-semibold text-zyvo-muted tracking-[0.2em] uppercase leading-tight">
            Le bon pro
          </span>
        </div>
      )}
    </div>
  )
}
