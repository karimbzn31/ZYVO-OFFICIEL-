import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, Star, Heart, MapPin, SlidersHorizontal, X,
  Wrench, Home, Monitor, Truck, GraduationCap, HeartPulse, Navigation, ShieldCheck,
  Zap, Reply
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
  { key: 'price_asc', label: 'Prix +' },
  { key: 'price_desc', label: 'Prix -' },
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
  'Setif': { lat: 36.19, lng: 5.41 },
  'Batna': { lat: 35.56, lng: 6.18 },
  'Djelfa': { lat: 34.67, lng: 3.25 },
  'Sidi Bel Abbes': { lat: 35.19, lng: -0.64 },
  'Biskra': { lat: 34.85, lng: 5.73 },
  'Tlemcen': { lat: 34.88, lng: -1.31 },
  'Bejaia': { lat: 36.75, lng: 5.07 },
  'Bordj Bou Arreridj': { lat: 36.07, lng: 4.76 },
  'Chlef': { lat: 36.16, lng: 1.33 },
  'Medea': { lat: 36.27, lng: 2.76 },
  'Mostaganem': { lat: 35.93, lng: 0.09 },
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
    <Link to={"/dashboard/client/prestataire/".concat(provider.id)} className="group block">
      <div className="glass-premium rounded-2xl p-3.5 card-hover relative overflow-hidden flex flex-col">
        {/* Color accent bar */}
        <div className={"absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ".concat(provider.coverGradient)} />

        {/* Heart */}
        <button onClick={(e) => { e.preventDefault(); toggleFavorite(provider) }}
          className={"absolute top-3 right-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all ".concat(
            fav ? 'bg-pink-500/20 text-pink-400 scale-110' : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10'
          )}
        >
          <Heart className={"w-3.5 h-3.5".concat(fav ? ' fill-pink-400' : '')} strokeWidth={1.5} />
        </button>

        {/* Avatar */}
        <div className="flex justify-center pt-1.5">
          <div className={"w-12 h-12 rounded-2xl bg-gradient-to-br ".concat(provider.coverGradient, " flex items-center justify-center text-lg font-bold text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform")}>
            {provider.name.charAt(0)}
          </div>
        </div>

        {/* Name + Service */}
        <div className="text-center mt-2.5">
          <h3 className="font-bold text-sm text-white truncate group-hover:text-zyvo-gold transition-colors leading-tight">
            {provider.name}
          </h3>
          <p className="text-[11px] text-zyvo-muted truncate mt-0.5">{provider.service}</p>
        </div>

        {/* Missions + Response Rate */}
        <div className="flex items-center justify-center gap-2.5 mt-2 text-[10px]">
          <span className="text-zyvo-muted flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5 text-white/40" />
            <span className="font-semibold text-white/80">{provider.missions}</span>
            <span>missions</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-zyvo-muted flex items-center gap-0.5">
            <Reply className="w-2.5 h-2.5 text-emerald-400/70" />
            <span className="font-semibold text-emerald-400">{provider.response_rate}</span>
            <span>réponse</span>
          </span>
        </div>

        {/* Rating + City */}
        <div className="flex items-center justify-center gap-1 mt-1.5 text-[10px]">
          <span className="flex items-center gap-0.5 text-amber-400 font-bold">
            <Star className="w-2.5 h-2.5 fill-amber-400" strokeWidth={0} />
            {provider.rating}
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-0.5 text-zyvo-muted">
            <MapPin className="w-2.5 h-2.5" />
            {provider.city}
          </span>
        </div>

        {/* Price */}
        <div className="text-center mt-1.5">
          <span className="text-xs font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg">
            {provider.price}
          </span>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-center gap-1.5 mt-2 flex-wrap min-h-[18px]">
          {isNearby && (
            <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-md">
              <Navigation className="w-2 h-2" /> Proche
            </span>
          )}
          {provider.badges.includes('Vérifié') && (
            <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-blue-400 bg-blue-500/15 px-1.5 py-0.5 rounded-md">
              <ShieldCheck className="w-2 h-2" /> Vérifié
            </span>
          )}
          {isDigital && (
            <span className="text-[9px] font-semibold text-purple-400 bg-purple-500/15 px-1.5 py-0.5 rounded-md">
              En ligne
            </span>
          )}
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
      <div className="space-y-4 overflow-x-hidden">
        <div className="flex items-center justify-between">
          <div className="h-6 w-40 rounded bg-white/5 animate-pulse" />
          <div className="h-8 w-20 rounded-xl bg-white/5 animate-pulse" />
        </div>
        <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[1,2,3,4,5].map(i => <div key={i} className="h-8 w-20 rounded-xl bg-white/5 animate-pulse shrink-0" />)}
        </div>
        <GridSkeleton count={6} />
      </div>
    )
  }

  return (
    <div className="space-y-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Explorer <span className="gradient-text-brand">le marché</span></h1>
          <p className="text-xs text-zyvo-muted mt-0.5">{filtered.length} pro{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          {geoStatus === 'detected' && detectedCity && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <Navigation className="w-3 h-3" /> {detectedCity}
            </span>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
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
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zyvo-muted" />
        <input
          type="text"
          placeholder="Rechercher un service, un pro, une ville..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-10 py-3 text-xs text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zyvo-muted hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={"flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold transition-all whitespace-nowrap shrink-0 ".concat(
              selectedCategory === key
                ? 'bg-zyvo-gold/15 text-zyvo-gold border border-zyvo-gold/25 shadow-sm shadow-zyvo-gold/5'
                : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
            )}
          >
            <Icon className="w-3 h-3" />
            {label}
          </button>
        ))}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass-premium rounded-2xl p-4 space-y-4 animate-fadeIn">
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-zyvo-muted mb-1.5 uppercase tracking-wider">Ville</p>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Toutes les villes</option>
                {detectedCity && (
                  <option value={detectedCity}>Ma position ({detectedCity})</option>
                )}
                {cities.filter(c => c !== detectedCity).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-zyvo-muted mb-1.5 uppercase tracking-wider">Trier par</p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
          <p className="font-bold text-white text-base">Aucun résultat</p>
          <p className="text-xs text-zyvo-muted mt-1">Essayez de modifier vos filtres</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(p => (
            <ProviderCard key={p.id} provider={p} detectedCity={detectedCity} />
          ))}
        </div>
      )}

      {/* Bottom spacer for mobile nav */}
      <div className="h-2" />
    </div>
  )
}
