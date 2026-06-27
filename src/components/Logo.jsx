export default function Logo({ showText = true, logoSize = 'sm' }) {
  const sizes = {
    sm: { icon: 32, text: 'text-base', gap: 1.5, dot: 8 },
    md: { icon: 40, text: 'text-lg', gap: 2, dot: 10 },
    lg: { icon: 52, text: 'text-xl', gap: 2.5, dot: 12 },
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
          className="drop-shadow-xl"
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
          <rect x="0.5" y="0.5" width="31" height="31" rx="8" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
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
          className="absolute -top-0.5 -right-0.5 bg-zyvo-gold rounded-full animate-pulse-soft shadow-lg shadow-zyvo-gold/30"
          style={{ width: s.dot / 2, height: s.dot / 2 }}
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${s.text} font-bold tracking-tight`}
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 40%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Zyvo
          </span>
          <span className="hidden sm:block text-[7px] sm:text-[8px] font-semibold text-zyvo-muted/50 tracking-[0.15em] uppercase leading-tight mt-px">
            Le bon pro
          </span>
        </div>
      )}
    </div>
  )
}
