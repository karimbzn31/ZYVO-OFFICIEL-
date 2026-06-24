import { useState } from 'react'
import { Search, SlidersHorizontal, Star, ArrowUpDown, X } from 'lucide-react'
import { providers } from '../data/mockData'
import ProviderCard from '../components/ProviderCard'

const filters = ['Tous', 'Maison', 'Réparation', 'Numérique', 'Déménagement', 'Cours', 'Santé']

const sortOptions = [
  { label: 'Pertinence', value: 'relevance' },
  { label: 'Note', value: 'rating' },
  { label: 'Prix croissant', value: 'price-asc' },
  { label: 'Prix décroissant', value: 'price-desc' },
  { label: 'Missions', value: 'missions' },
]

export default function SearchPage() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [query, setQuery] = useState('')
  const [showSort, setShowSort] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showFilters, setShowFilters] = useState(false)
  const [minRating, setMinRating] = useState(0)

  const sorted = [...providers].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating
      case 'price-asc': return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''))
      case 'price-desc': return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''))
      case 'missions': return b.missions - a.missions
      default: return 0
    }
  })

  const filtered = sorted.filter(p => {
    const price = parseInt(p.price.replace(/\D/g, ''))
    return price >= priceRange[0] && price <= priceRange[1] && p.rating >= minRating
  })

  return (
    <div className="py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold">Rechercher</h2>

      {/* SEARCH BAR */}
      <div className="mt-4 glass-premium rounded-2xl px-5 h-12 flex items-center gap-3">
        <Search className="w-4 h-4 text-zyvo-gold shrink-0" />
        <input
          type="text"
          placeholder="Plombier, coiffeuse, cours..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-zyvo-muted"
          autoFocus
        />
        <button onClick={() => setShowFilters(!showFilters)} className={`p-1.5 rounded-lg transition-colors ${showFilters ? 'bg-white/10 text-zyvo-gold' : 'text-zyvo-muted hover:text-white'}`}>
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* FILTERS CHIPS */}
      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`whitespace-nowrap px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              f === activeFilter
                ? 'gradient-brand text-white shadow-lg'
                : 'glass-premium-light text-zyvo-muted hover:text-white hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* SORT & FILTERS BAR */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm font-semibold text-zyvo-muted">
          {providers.length} prestataires disponibles
        </p>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1.5 text-xs font-bold text-zyvo-muted hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOptions.find(o => o.value === sortBy)?.label}
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-2 glass-premium rounded-xl p-1.5 shadow-xl z-20 min-w-[160px]">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    sortBy === opt.value ? 'bg-white/10 text-white' : 'text-zyvo-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ADVANCED FILTERS PANEL */}
      {showFilters && (
        <div className="glass-premium rounded-2xl p-5 mt-4 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm">Filtres avancés</h4>
            <button onClick={() => setShowFilters(false)} className="text-zyvo-muted hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* PRICE RANGE */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted block mb-2">
              Budget max : <span className="text-white">{priceRange[1]} DA</span>
            </label>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-zyvo-gold"
            />
            <div className="flex justify-between text-[10px] text-zyvo-muted mt-1">
              <span>0 DA</span>
              <span>5 000 DA</span>
            </div>
          </div>

          {/* MIN RATING */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted block mb-2">
              Note minimum : <span className="text-amber-400">{minRating > 0 ? `${minRating}+` : 'Aucune'}</span>
            </label>
            <div className="flex gap-2">
              {[0, 3, 3.5, 4, 4.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    minRating === rating ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-zyvo-muted hover:text-white'
                  }`}
                >
                  {rating > 0 ? `${rating}+` : 'Tous'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setPriceRange([0, 5000]); setMinRating(0) }}
            className="text-xs text-zyvo-gold font-semibold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* RESULTS */}
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  )
}
