import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, Star, Heart, MapPin, SlidersHorizontal, X, 
  Wrench, Home, Monitor, Truck, GraduationCap, HeartPulse, Navigation
} from 'lucide-react'
import { useFavorites } from '../../context/favorites'
import { useAuth } from '../../context/auth'
import { extendedProviders, cities as allCities } from '../../data/dashboardData'
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

const digitalCategories = ['cours', 'developpement', 'design', 'marketing', 'redaction', 'sante']

const algeriaCitiesCoords = {
  'Alger': { lat: 36.75, lng: 3.04 },
  'Oran': { lat: 35.69, lng: -0.64 },
  'Constantine': { lat: 36.37, lng: 6.61 },
  'Blida': { lat: 36.47, lng: 2.83 },
  'Annaba': { lat: 36.90, lng: 7.77 },
  'Tizi Ouzou': { lat: 36.72, lng: 4.04 },
  'Sétif': { lat: 36.19, lng: 5.41 },
  'Batna': { lat: 35.56, lng: 6.18 },
  'Djelfa': { lat: 34.67, lng: 3.25 },
  'Sidi Bel Abbès': { lat: 35.19, lng: -0.64 },
  'Biskra': { lat: 34.85, lng: 5.73 },
  'Tlemcen': { lat: 34.88, lng: -1.31 },
  'Béjaïa': { lat: 36.75, lng: 5.07 },
  'Bordj Bou Arreridj': { lat: 36.07, lng: 4.76 },
  'Chlef': { lat: 36.16, lng: 1.33 },
  'Médéa': { lat: 36.27, lng: 2.76 },
  'Mostaganem': { lat: 35.93, lng: 0.09 },
  'Ain Oulmene': { lat: 35.92, lng: 5.30 },
}

function findNearestCity(lat, lng) {
  let nearest = null
  let minDist = Infinity
  for (const [city, coords] of Object.entries(algeriaCitiesCoords)) {
    const d = Math.sqrt((lat - coords.lat) ** 2 + (lng - coords.lng) ** 2)
    if (d < minDist) { minDist = d; nearest = city }
  }
  return minDist < 0.5 ? nearest : null
}

function ProviderCard({ provider, detectedCity }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(provider.id)
  const isDigital = digitalCategories.includes(provider.category)
  const isNearby = detectedCity && provider.city === detectedCity && !isDigital

  return (
    <Link to={`/dashboard/client/prestataire/${provider.id}`} className="glass-premium rounded-2xl overflow-hidden card-hover group block">
      {/* Cover */}
      <div className={`h-20 sm:h-28 bg-gradient-to-br ${provider.coverGradient} relative`}>
        <div className="absolute inset-0 bg-black/20" />
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
          {isNearby && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/30 text-emerald-300 text-[9px] sm:text-[10px] font-bold backdrop-blur">
              <Navigation className="w-2.5 h-2.5" /> À proximité
            </span>
          )}
          {isDigital && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/30 text-blue-300 text-[9px] sm:text-[10px] font-bold backdrop-blur">
              🌍 En ligne
            </span>
          )}
        </div>
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
            {isDigital && <span className="text-blue-400 text-[9px] ml-0.5">· En ligne</span>}
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
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [detectedCity, setDetectedCity] = useState(user?.city || '')
  const [geoStatus, setGeoStatus] = useState(user?.city ? 'detected' : 'idle')

  useEffect(() => {
    if (detectedCity) return
    if (!navigator.geolocation) { setGeoStatus('unavailable'); return }
    setGeoStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const city = findNearestCity(pos.coords.latitude, pos.coords.longitude)
        if (city) { setDetectedCity(city); setGeoStatus('detected') }
        else setGeoStatus('unavailable')
      },
      () => setGeoStatus('unavailable'),
      { timeout: 5000, enableHighAccuracy: false }
    )
  }, [detectedCity])

  const cities = useMemo(() => {
    const c = [...allCities]
    if (detectedCity && !c.includes(detectedCity)) c.unshift(detectedCity)
    return c.sort()
  }, [detectedCity])

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
        <div className="flex items-center gap-2">
          {geoStatus === 'detected' && detectedCity && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <Navigation className="w-3 h-3" /> {detectedCity}
            </span>
          )}
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
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Toutes les villes</option>
                  {detectedCity && (
                    <option value={detectedCity}>📍 {detectedCity} (ma position)</option>
                  )}
                  {cities.filter(c => c !== detectedCity).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
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
              <ProviderCard key={p.id} provider={p} detectedCity={detectedCity} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
