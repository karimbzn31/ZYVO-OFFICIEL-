import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Home, Search as SearchIcon, Calendar, Heart, User, ArrowRight, Zap, Sparkles } from 'lucide-react'

const commands = [
  { label: 'Accueil', icon: Home, to: '/' },
  { label: 'Rechercher un service', icon: SearchIcon, to: '/search' },
  { label: 'Mes réservations', icon: Calendar, to: '/bookings' },
  { label: 'Mes favoris', icon: Heart, to: '/favorites' },
  { label: 'Mon profil', icon: User, to: '/profile' },
  { label: 'Connexion / Inscription', icon: Sparkles, to: '/auth' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const filtered = query
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  const handleSelect = useCallback((cmd) => {
    setOpen(false)
    navigate(cmd.to)
  }, [navigate])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(prev => Math.min(prev + 1, filtered.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(prev => Math.max(prev - 1, 0))
    }
    if (e.key === 'Enter' && filtered[selected]) {
      handleSelect(filtered[selected])
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* MODAL */}
      <div
        className="relative glass-premium rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SEARCH INPUT */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-white/5">
          <Search className="w-4 h-4 text-zyvo-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher une page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-zyvo-muted text-white"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-zyvo-muted">
            ESC
          </kbd>
        </div>

        {/* RESULTS */}
        <div className="p-2 max-h-[300px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-sm text-zyvo-muted">
              Aucun résultat pour "{query}"
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.to}
                onClick={() => handleSelect(cmd)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                  i === selected ? 'bg-white/10 text-white' : 'text-zyvo-muted hover:text-white hover:bg-white/5'
                }`}
              >
                <cmd.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="flex-1 text-sm font-semibold">{cmd.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
