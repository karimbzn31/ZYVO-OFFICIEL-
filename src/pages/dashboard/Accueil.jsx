import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, MapPin, Star, Heart, Clock, ArrowRight, TrendingUp, 
  Users, Sparkles, ChevronRight, Calendar, History
} from 'lucide-react'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { extendedProviders, activityFeed, myBookings, recentSearches } from '../../data/dashboardData'

function StatCard({ icon: Icon, label, value, gradient }) {
  return (
    <div className="glass-premium rounded-2xl p-4 flex items-center gap-4 card-hover">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shrink-0`}>
        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-xs text-zyvo-muted">{label}</p>
        <p className="text-lg font-extrabold text-white">{value}</p>
      </div>
    </div>
  )
}

function ProviderCardSmall({ provider }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(provider.id)

  return (
    <Link to={`/dashboard/client/prestataire/${provider.id}`} className="glass-premium rounded-2xl p-4 card-hover group block">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${provider.coverGradient} flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0`}>
            {provider.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-sm text-white group-hover:text-zyvo-gold transition-colors">{provider.name}</h4>
            <p className="text-xs text-zyvo-muted">{provider.service}</p>
          </div>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(provider) }}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
            fav ? 'bg-pink-500/20 text-pink-400' : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-pink-400' : ''}`} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1 text-amber-400 font-bold">
          <Star className="w-3 h-3 fill-amber-400" />{provider.rating}
        </span>
        <span className="text-zyvo-muted">{provider.city}</span>
        <span className="ml-auto font-bold text-white">{provider.price}</span>
      </div>
    </Link>
  )
}

export default function Accueil() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const { recent } = useRecentlyViewed()
  const [searchQuery, setSearchQuery] = useState('')

  const topProviders = useMemo(() => 
    [...extendedProviders].sort((a, b) => b.rating - a.rating).slice(0, 4),
  [])
  const newProviders = useMemo(() => 
    [...extendedProviders].sort((a, b) => a.missions - b.missions).slice(0, 4),
  [])

  const nextBooking = myBookings.find(b => b.status === 'Confirmée' || b.status === 'En attente')

  const filteredRecent = recentSearches.filter(s =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome + Search */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold">
              Bonjour, <span className="gradient-text-brand">{user?.name || 'Utilisateur'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zyvo-muted mt-0.5">Prêt à trouver le bon pro ?</p>
          </div>
          <Link to="/dashboard/client/profil" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-brand flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </Link>
        </div>

        <Link
          to="/dashboard/client/explorer"
          className="relative block group"
        >
          <div className="glass-premium rounded-2xl p-4 sm:p-5 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-zyvo-gold/20 to-zyvo-gold/5 flex items-center justify-center">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-zyvo-muted group-hover:text-white transition-colors">Que cherchez-vous ?</p>
                {searchQuery && filteredRecent.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {filteredRecent.slice(0, 3).map((s, i) => (
                      <p key={i} className="text-[10px] sm:text-xs text-zyvo-muted/60">{s}</p>
                    ))}
                  </div>
                )}
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-muted group-hover:text-zyvo-gold group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Search} label="Services disponibles" value={extendedProviders.length + '+'} gradient="from-blue-500 to-cyan-400" />
        <StatCard icon={Star} label="Note moyenne" value="4.7" gradient="from-amber-500 to-orange-400" />
        <StatCard icon={Heart} label="Mes favoris" value={favorites.length} gradient="from-pink-500 to-rose-400" />
        <StatCard icon={Calendar} label="Réservations" value={myBookings.length} gradient="from-emerald-500 to-teal-400" />
      </div>

      {/* Next Booking */}
      {nextBooking && (
        <div className="glass-premium rounded-2xl p-4 sm:p-5 border border-zyvo-gold/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-zyvo-gold/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zyvo-gold uppercase tracking-wider">Prochaine réservation</span>
              <span className={`text-xs font-bold ${nextBooking.statusColor}`}>{nextBooking.status}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${nextBooking.provider.coverGradient} flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0`}>
                {nextBooking.provider.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white truncate">{nextBooking.provider.name}</p>
                <p className="text-xs text-zyvo-muted truncate">{nextBooking.provider.service}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-white">{nextBooking.date}</p>
                <p className="text-[10px] text-zyvo-muted">{nextBooking.time}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Rated Providers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-gold" />
            <h2 className="font-extrabold text-base sm:text-lg">Les mieux notés</h2>
          </div>
          <Link to="/dashboard/client/explorer" className="text-xs font-semibold text-zyvo-gold hover:underline flex items-center gap-1">
            Voir tout <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {topProviders.map(p => (
            <ProviderCardSmall key={p.id} provider={p} />
          ))}
        </div>
      </div>

      {/* New on Zyvo */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-gold" />
            <h2 className="font-extrabold text-base sm:text-lg">Nouveaux sur Zyvo</h2>
          </div>
          <Link to="/dashboard/client/explorer" className="text-xs font-semibold text-zyvo-gold hover:underline flex items-center gap-1">
            Voir tout <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {newProviders.map(p => (
            <ProviderCardSmall key={p.id} provider={p} />
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      {recent.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-gold" />
            <h2 className="font-extrabold text-base sm:text-lg">Récemment consultés</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {recent.map(p => (
              <Link key={p.id} to={`/dashboard/client/prestataire/${p.id}`} className="shrink-0 w-44 sm:w-48 glass-premium rounded-2xl p-3 card-hover group block">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.coverGradient || 'from-blue-500 to-cyan-400'} flex items-center justify-center text-xs font-bold text-white shadow-lg shrink-0`}>
                    {p.name?.charAt(0) || '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-white truncate group-hover:text-zyvo-gold transition-colors">{p.name}</p>
                    <p className="text-[9px] text-zyvo-muted truncate">{p.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[9px]">
                  <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />{p.rating || '-'}
                  </span>
                  <span className="text-zyvo-muted ml-auto font-bold">{p.price || ''}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Activity Feed */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-gold" />
          <h2 className="font-extrabold text-base sm:text-lg">Activité récente</h2>
        </div>
        <div className="glass-premium rounded-2xl divide-y divide-white/5">
          {activityFeed.map((a) => (
            <div key={a.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-white/5 transition-colors">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                a.type === 'reservation' ? 'bg-blue-500/20 text-blue-400' :
                a.type === 'review' ? 'bg-amber-500/20 text-amber-400' :
                a.type === 'like' ? 'bg-pink-500/20 text-pink-400' :
                'bg-emerald-500/20 text-emerald-400'
              }`}>
                {a.type === 'reservation' ? <Calendar className="w-4 h-4" /> :
                 a.type === 'review' ? <Star className="w-4 h-4" /> :
                 a.type === 'like' ? <Heart className="w-4 h-4" /> :
                 <Users className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-white">
                  <span className="font-bold">{a.userName}</span>
                  {' '}{a.action}{' '}
                  <span className="text-zyvo-gold">{a.target}</span>
                </p>
                <p className="text-[10px] sm:text-xs text-zyvo-muted mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
