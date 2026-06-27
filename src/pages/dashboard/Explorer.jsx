import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, Star, Heart, MapPin, SlidersHorizontal, X, 
  Wrench, Home, Monitor, Truck, GraduationCap, HeartPulse
} from 'lucide-react'
import { useFavorites } from '../../context/favorites'
import { extendedProviders, cities } from '../../data/dashboardData'
import { useLoading } from '../../hooks/useLoading'
import { GridSkeleton } from '../../components/dashboard/Skeleton'

const categories = [
  { key: 'all', label: 'Tous', icon: Search },
  { key: 'plomberie', label: 'Plomberie', icon: Wrench },
  { key: 'menage', label: 'Ménage', icon: Home },
  { key: 'electricite', label: 'Électricité', icon: Monitor },
  { key: 'coiffure', label: 'Coiffure', icon: HeartPulse },
  { key: 'cours', label: 'Cours', icon: GraduationCap },
  { key: 'sante', label: 'Santé', icon: HeartPulse },
  { key: 'demenagement', label: 'Déménagement', icon: Truck },
  { key: 'jardinage', label: 'Jardinage', icon: Home },
]

const sortOptions = [
  { key: 'rating', label: 'Note' },
  { key: 'price_asc', label: 'Prix ↑' },
  { key: 'price_desc', label: 'Prix ↓' },
  { key: 'popular', label: 'Popularité' },
]

function ProviderCard({ provider }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(provider.id)

  return (
    <Link to={`/dashboard/client/prestataire/${provider.id}`} className="glass-premium rounded-2xl overflow-hidden card-hover group block">
      {/* Cover */}
      <div className={`h-20 sm:h-28 bg-gradient-to-br ${provider.coverGradient} relative`}>
        <div className="absolute inset-0 bg-black/20" />
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(provider) }}
          className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
            fav ? 'bg-pink-500/30 text-pink-400 scale-110' : 'bg-black/30 text-white/60 hover:text-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${fav ? 'fill-pink-400' : ''}`} strokeWidth={1.5} />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3 -mt-8 sm:-mt-10 mb-3">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${provider.coverGradient} flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-lg shrink-0 border-2 border-zyvo-dark`}>
            {provider.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1 pt-4 sm:pt-5">
            <h3 className="font-bold text-sm sm:text-base text-white truncate group-hover:text-zyvo-gold transition-colors">
              {provider.name}
            </h3>
            <p className="text-xs sm:text-sm text-zyvo-muted truncate">{provider.service}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs mb-3">
          <span className="flex items-center gap-0.5 sm:gap-1 text-amber-400 font-bold">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
            {provider.rating}
          </span>
          <span className="flex items-center gap-0.5 sm:gap-1 text-zyvo-muted">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {provider.city}
          </span>
          {provider.badges.includes('Vérifié') && (
            <span className="text-emerald-400 font-bold">✓ Vérifié</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/5">
          <span className="text-xs text-zyvo-muted">{provider.missions} missions</span>
          <span className="font-extrabold text-sm sm:text-base text-white">{provider.price}</span>
        </div>
      </div>
    </Link>
  )
}

export default function Explorer() {
  const loading = useLoading(350)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...extendedProviders]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }
    if (selectedCity) {
      result = result.filter(p => p.city === selectedCity)
    }
    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'price_asc': result.sort((a, b) => a.priceValue - b.priceValue); break
      case 'price_desc': result.sort((a, b) => b.priceValue - a.priceValue); break
      case 'popular': result.sort((a, b) => b.likes - a.likes); break
    }
    return result
  }, [searchQuery, selectedCategory, selectedCity, sortBy])

  const activeFilters = [selectedCategory !== 'all', selectedCity !== '', searchQuery !== ''].filter(Boolean).length

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-6 w-40 rounded bg-white/5 animate-pulse" />
          <div className="h-8 w-20 rounded-xl bg-white/5 animate-pulse" />
        </div>
        <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
        <div className="flex gap-2">
          {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-20 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
        <GridSkeleton count={6} />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-extrabold">Explorer <span className="gradient-text-brand">le marché</span></h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs sm:text-sm font-semibold"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Filtres</span>
          {activeFilters > 0 && (
            <span className="w-4 h-4 rounded-full bg-zyvo-gold text-[9px] font-bold text-zyvo-dark flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zyvo-muted" />
        <input
          type="text"
          placeholder="Rechercher un service, un pro, une ville..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 sm:pl-12 pr-10 py-3 sm:py-4 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-zyvo-muted hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass-premium rounded-2xl p-4 sm:p-5 space-y-4 animate-fadeIn">
          <div>
            <p className="text-xs font-semibold text-zyvo-muted mb-2 sm:mb-3 uppercase tracking-wider">Catégorie</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map(c => (
                <button
                  key={c.key}
                  onClick={() => setSelectedCategory(c.key)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all ${
                    selectedCategory === c.key
                      ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                      : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <c.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold text-zyvo-muted mb-2 uppercase tracking-wider">Ville</p>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Toutes les villes</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-zyvo-muted mb-2 uppercase tracking-wider">Trier par</p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Category Chips (quick filter) */}
      {!showFilters && (
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === c.key
                  ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                  : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              <c.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div>
        <p className="text-xs sm:text-sm text-zyvo-muted mb-3 sm:mb-4">
          {filtered.length} prestataire{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-zyvo-muted/30 mx-auto mb-4" />
            <p className="font-bold text-white text-lg">Aucun résultat</p>
            <p className="text-sm text-zyvo-muted mt-1">Essayez de modifier vos filtres</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map(p => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
