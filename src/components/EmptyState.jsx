import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const illustrations = {
  heart: (
    <svg className="w-16 h-16 text-pink-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  search: (
    <svg className="w-16 h-16 text-blue-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M8 11h6" />
      <path d="M11 8v6" />
    </svg>
  ),
  calendar: (
    <svg className="w-16 h-16 text-amber-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  ),
  message: (
    <svg className="w-16 h-16 text-purple-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  box: (
    <svg className="w-16 h-16 text-zyvo-muted/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  ),
  star: (
    <svg className="w-16 h-16 text-amber-400/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  user: (
    <svg className="w-16 h-16 text-zyvo-muted/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  ),
}

const gradients = {
  heart: 'from-pink-500/10 to-rose-500/5',
  search: 'from-blue-500/10 to-cyan-500/5',
  calendar: 'from-amber-500/10 to-orange-500/5',
  message: 'from-purple-500/10 to-violet-500/5',
  box: 'from-gray-500/10 to-slate-500/5',
  star: 'from-amber-500/10 to-yellow-500/5',
  user: 'from-blue-500/10 to-indigo-500/5',
}

export default function EmptyState({
  icon = 'box',
  title = 'Aucune donnée',
  description = 'Il n\'y a rien à afficher pour le moment.',
  actionLabel,
  actionTo,
  onAction,
  className = '',
}) {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${gradients[icon] || gradients.box} flex items-center justify-center mx-auto mb-6`}>
        {illustrations[icon] || illustrations.box}
      </div>
      <h3 className="text-xl font-extrabold text-white mb-2">{title}</h3>
      <p className="text-sm text-zyvo-muted max-w-xs mx-auto leading-relaxed">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          onClick={onAction}
          className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all mt-6 glow-worm"
        >
          <Sparkles className="w-4 h-4" /> {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all mt-6 glow-worm"
        >
          <Sparkles className="w-4 h-4" /> {actionLabel}
        </button>
      )}
    </div>
  )
}
