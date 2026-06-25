import { useState, useEffect, useRef } from 'react'
import { Search, SlidersHorizontal, Star, ArrowUpDown, X, Clock, TrendingUp, MapPin, Sparkles, RotateCcw } from 'lucide-react'
import { providers } from '../data/mockData'
import ProviderCard from '../components/ProviderCard'
import { Link } from 'react-router-dom'

const popularSearches = ['Plombier', 'Ménage', 'Cours de maths', 'Coiffure', 'Électricien', 'Jardinage']

const categories = [
  { label: 'Tous', icon: '✨', slug: null },
  { label: 'Plomberie', icon: '🔧', slug: 'plomberie' },
  { label: 'Ménage', icon: '🧹', slug: 'menage' },
  { label: 'Électricité', icon: '⚡', slug: 'electricite' },
  { label: 'Coiffure', icon: '💇', slug: 'coiffure' },
  { label: 'Cours', icon: '📚', slug: 'cours' },
  { label: 'Jardinage', icon: '🌿', slug: 'jardinage' },
]

const sortOptions = [
  { label: 'Pertinence', value: 'relevance' },
  { label: 'Note', value: 'rating' },
  { label: 'Prix croissant', value: 'price-asc' },
  { label: 'Prix décroissant', value: 'price-desc' },
  { label: 'Missions', value: 'missions' },
]

const RECENT_KEY = 'zyvo_recent_searches'

function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
  } catch { return [] }
}

function saveRecent(searches) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(searches.slice(0, 5)))
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [sortBy, setSortBy] = useState('relevance')
  const [showSort, setShowSort] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [minRating, setMinRating] = useState(0)
  const [recentSearches, setRecentSearches] = useState(loadRecent)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)
  const suggestionRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowSuggestions(false)
    }
    const onClick = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onClick)
    }
  }, [])

  // autocomplete suggestions based on query
  const suggestions = query.trim()
    ? [
        ...popularSearches.filter(s => s.toLowerCase().includes(query.toLowerCase())).map(s => ({ type: 'service', label: s })),
        ...categories.filter(c => c.slug && c.label.toLowerCase().includes(query.toLowerCase())).map(c => ({ type: 'category', label: c.label, slug: c.slug })),
      ].slice(0, 5)
    : []

  const [selectedCity, setSelectedCity] = useState('')
  const allCities = [...new Set(providers.map(p => p.city))].sort()

  const filtered = providers.filter(p => {
    const q = query.toLowerCase()
    if (q) {
      const matchName = p.name.toLowerCase().includes(q)
      const matchService = p.service.toLowerCase().includes(q)
      const matchCat = p.category?.toLowerCase().includes(q)
      const matchCity = p.city?.toLowerCase().includes(q)
      if (!matchName && !matchService && !matchCat && !matchCity) return false
    }
    if (activeCategory && p.category !== activeCategory) return false
    if (selectedCity && p.city !== selectedCity) return false
    const price = p.priceValue || parseInt(p.price.replace(/\D/g, '')) || 0
    if (price < priceRange[0] || price > priceRange[1]) return false
    if (p.rating < minRating) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const getPrice = (p) => p.priceValue || parseInt(p.price.replace(/\D/g, '')) || 0
    switch (sortBy) {
      case 'rating': return b.rating - a.rating
      case 'price-asc': return getPrice(a) - getPrice(b)
      case 'price-desc': return getPrice(b) - getPrice(a)
      case 'missions': return b.missions - a.missions
      default: return 0
    }
  })

  const search = (term) => {
    setQuery(term)
    setShowSuggestions(false)
    const updated = [term, ...recentSearches.filter(s => s !== term)]
    setRecentSearches(updated)
    saveRecent(updated)
  }

  const clearSearch = () => {
    setQuery('')
    setActiveCategory(null)
    setPriceRange([0, 5000])
    setMinRating(0)
    setSelectedCity('')
    inputRef.current?.focus()
  }

  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_KEY)
  }

  const activeFiltersCount = (activeCategory ? 1 : 0) + (priceRange[1] < 5000 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (selectedCity ? 1 : 0)

  return (
    <div className="py-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Rechercher</h1>
          <p className="text-sm text-zyvo-muted mt-1">{sorted.length} prestataire{sorted.length !== 1 ? 's' : ''} trouvé{sorted.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative" ref={inputRef}>
        <div className="glass-premium rounded-2xl px-5 h-14 flex items-center gap-3 border border-white/5 focus-within:border-zyvo-gold/30 transition-all">
          <Search className="w-4 h-4 text-zyvo-gold shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Plombier, coiffeuse, cours..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-zyvo-muted"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded-lg text-zyvo-muted hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative p-2 rounded-lg transition-colors ${showFilters ? 'bg-white/10 text-zyvo-gold' : 'text-zyvo-muted hover:text-white'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zyvo-gold text-[9px] font-bold text-zyvo-dark flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* SUGGESTIONS DROPDOWN */}
        {showSuggestions && (query.trim() ? suggestions.length > 0 : recentSearches.length > 0) && (
          <div ref={suggestionRef} className="absolute top-full left-0 right-0 mt-2 glass-premium rounded-2xl p-2 shadow-2xl z-30 border border-white/5">
            {query.trim() ? (
              <>
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (s.type === 'category') {
                        setActiveCategory(s.slug)
                        setQuery('')
                      } else {
                        search(s.label)
                      }
                      setShowSuggestions(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zyvo-muted hover:text-white hover:bg-white/5 transition-all text-left"
                  >
                    {s.type === 'category' ? <span>📂</span> : <Search className="w-3.5 h-3.5" />}
                    <span>{s.label}</span>
                    {s.type === 'category' && <span className="text-[10px] text-zyvo-gold ml-auto">Catégorie</span>}
                  </button>
                ))}
                {query.trim().length >= 2 && (
                  <button
                    onClick={() => search(query)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zyvo-gold hover:bg-white/5 transition-all text-left mt-1 border-t border-white/5 pt-3"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Rechercher "<span className="font-bold">{query}</span>"
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-bold text-zyvo-muted flex items-center gap-1.5"><Clock className="w-3 h-3" /> Récent</span>
                  <button onClick={clearRecent} className="text-[10px] text-zyvo-muted hover:text-white transition-colors">Effacer</button>
                </div>
                {recentSearches.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => search(s)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-zyvo-muted hover:text-white hover:bg-white/5 transition-all text-left"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {s}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* POPULAR TAGS */}
      {!query && !activeCategory && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs font-bold text-zyvo-muted flex items-center gap-1 mr-1">
            <TrendingUp className="w-3 h-3" /> Populaires :
          </span>
          {popularSearches.map((s) => (
            <button
              key={s}
              onClick={() => search(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-zyvo-muted hover:bg-white/10 hover:text-white transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ACTIVE FILTERS CHIPS */}
      {(activeCategory || priceRange[1] < 5000 || minRating > 0 || selectedCity) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zyvo-gold/10 text-zyvo-gold text-xs font-semibold border border-zyvo-gold/20">
              {categories.find(c => c.slug === activeCategory)?.icon} {categories.find(c => c.slug === activeCategory)?.label}
              <button onClick={() => setActiveCategory(null)}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}
          {priceRange[1] < 5000 && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 text-zyvo-muted text-xs font-semibold">
              Max {priceRange[1]} DA
              <button onClick={() => setPriceRange([0, 5000])}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold">
              <Star className="w-3 h-3 fill-amber-400" /> {minRating}+
              <button onClick={() => setMinRating(0)}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}
          {selectedCity && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              <MapPin className="w-3 h-3" /> {selectedCity}
              <button onClick={() => setSelectedCity('')}><X className="w-3 h-3 ml-1" /></button>
            </span>
          )}
          <button onClick={clearSearch} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zyvo-muted hover:text-white transition-all flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Réinitialiser
          </button>
        </div>
      )}

      {/* CATEGORY CHIPS */}
      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat.slug
                ? 'gradient-brand text-white shadow-lg scale-105'
                : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* SORT & FILTERS BAR */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zyvo-muted font-semibold">{sorted.length} résultat{sorted.length !== 1 ? 's' : ''}</span>
          {query && (
            <span className="text-zyvo-muted">
              pour "<span className="text-white font-bold">{query}</span>"
            </span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-1.5 text-xs font-bold text-zyvo-muted hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortOptions.find(o => o.value === sortBy)?.label}
          </button>
          {showSort && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
              <div className="absolute right-0 top-full mt-2 glass-premium rounded-xl p-1.5 shadow-xl z-20 min-w-[170px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      sortBy === opt.value ? 'bg-white/10 text-white' : 'text-zyvo-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {sortBy === opt.value && <span className="mr-2 text-zyvo-gold">✓</span>}
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ADVANCED FILTERS PANEL */}
      {showFilters && (
        <div className="glass-premium rounded-2xl p-6 mt-4 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-zyvo-gold" /> Filtres avancés
            </h4>
            <button onClick={() => setShowFilters(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zyvo-muted hover:text-white hover:bg-white/10 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* PRICE RANGE */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted block mb-3">
              Budget maximal : <span className="text-white text-sm">{priceRange[1]} DA</span>
            </label>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full accent-zyvo-gold"
            />
            <div className="flex justify-between text-[10px] text-zyvo-muted mt-1">
              <span>Gratuit</span>
              <span>5 000+ DA</span>
            </div>
          </div>

          {/* MIN RATING */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted block mb-3">
              Note minimum : <span className="text-amber-400">{minRating > 0 ? `${minRating} ★` : 'Aucune'}</span>
            </label>
            <div className="flex gap-2">
              {[0, 3, 3.5, 4, 4.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    minRating === rating
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-lg'
                      : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10'
                  }`}
                >
                  {rating > 0 ? `${rating}+` : 'Tous'}
                </button>
              ))}
            </div>
          </div>

          {/* CITY FILTER */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted block mb-3">
              <MapPin className="w-3 h-3 inline mr-1" /> Ville
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCity('')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  !selectedCity ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white' : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white hover:bg-white/10'
                }`}
              >
                Toutes
              </button>
              {allCities.map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(selectedCity === city ? '' : city)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    selectedCity === city ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white' : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white hover:bg-white/10'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setPriceRange([0, 5000]); setMinRating(0); setSelectedCity('') }}
            className="text-xs text-zyvo-gold font-semibold hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* RESULTS */}
      {sorted.length === 0 ? (
        <div className="mt-8 glass-premium rounded-3xl p-10 text-center">
          <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Search className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">Aucun résultat</h3>
          <p className="text-sm text-zyvo-muted max-w-sm mx-auto mb-6">
            Aucun prestataire ne correspond à votre recherche. Essayez de modifier vos filtres ou d'élargir vos critères.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => search(s)}
                className="px-4 py-2 rounded-xl bg-white/5 text-zyvo-muted text-xs font-semibold hover:bg-white/10 hover:text-white transition-all"
              >
                {s}
              </button>
            ))}
          </div>
          <button onClick={clearSearch} className="mt-6 text-sm font-bold text-zyvo-gold hover:underline flex items-center gap-1 justify-center mx-auto">
            <RotateCcw className="w-4 h-4" /> Réinitialiser la recherche
          </button>
        </div>
      ) : (
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      )}

      {/* BOTTOM CTA */}
      {sorted.length > 0 && (
        <div className="mt-8 glass-premium rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-sm">Vous êtes prestataire ?</h3>
            <p className="text-xs text-zyvo-muted mt-1">Rejoignez Zyvo et développez votre activité.</p>
          </div>
          <Link to="/auth" className="gradient-brand text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg hover:scale-105 transition-all glow-worm whitespace-nowrap">
            <Sparkles className="w-4 h-4 inline mr-1" /> Devenir prestataire
          </Link>
        </div>
      )}
    </div>
  )
}
