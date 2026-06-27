import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, FileText, Calendar, Star, Heart,
  Users, ArrowRight, ChevronRight,
  MessageCircle, Sparkles, Bell
} from 'lucide-react'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { useBookings } from '../../context/booking'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { useLoading } from '../../hooks/useLoading'
import { useNotifications } from '../../context/notifications'
import { extendedProviders, activityFeed, myBookings } from '../../data/dashboardData'
import { quotes } from '../../data/quotesData'

const statusConfig = {
  pending: { label: 'En attente', class: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  answered: { label: 'Répondu', class: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  expired: { label: 'Expiré', class: 'text-red-400 bg-red-500/10 border-red-500/20' },
}

const urgencyConfig = {
  urgent: { label: 'Urgent', class: 'bg-red-500/20 text-red-300' },
  cette_semaine: { label: 'Cette semaine', class: 'bg-amber-500/20 text-amber-300' },
  ce_mois: { label: 'Ce mois', class: 'bg-blue-500/20 text-blue-300' },
  normal: { label: 'Normal', class: 'bg-emerald-500/20 text-emerald-300' },
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bonjour'
  if (h < 17) return 'Bon après-midi'
  if (h < 21) return 'Bonsoir'
  return 'Bonne soirée'
}

function StatCard({ icon: Icon, label, value, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className="glass-premium rounded-2xl p-3 sm:p-4 card-hover"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={"w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ".concat(gradient, " flex items-center justify-center shadow-lg shrink-0")}>
          <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs text-zyvo-muted truncate">{label}</p>
          <p className="text-lg sm:text-xl font-extrabold text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}

function QuoteCard({ quote }) {
  const st = statusConfig[quote.status] || statusConfig.pending
  const urg = urgencyConfig[quote.urgency] || null
  return (
    <Link
      to={"/dashboard/client/mes-devis/".concat(quote.id)}
      className="glass-premium rounded-2xl p-4 card-hover group block min-w-[240px] sm:min-w-0"
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <span className={"text-[10px] font-bold px-2 py-0.5 rounded-full border ".concat(st.class)}>
          {st.label}
        </span>
        {urg && (
          <span className={"text-[9px] font-semibold px-1.5 py-0.5 rounded-md ".concat(urg.class)}>
            {urg.label}
          </span>
        )}
      </div>
      <h4 className="font-bold text-sm text-white group-hover:text-zyvo-gold transition-colors leading-snug mb-1">
        {quote.title}
      </h4>
      <p className="text-xs text-zyvo-muted flex items-center gap-1.5">
        <span>{quote.city}</span>
        <span className="w-1 h-1 rounded-full bg-white/10" />
        <span>{quote.budgetRange}</span>
      </p>
      {quote.status === 'answered' && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-400">
              {quote.responsesCount} réponse{quote.responsesCount > 1 ? 's' : ''}
            </span>
          </div>
          <ArrowRight className="w-3 h-3 text-zyvo-muted group-hover:text-zyvo-gold group-hover:translate-x-0.5 transition-all" />
        </div>
      )}
    </Link>
  )
}

function BookingCard({ booking }) {
  return (
    <Link
      to="/dashboard/client/reservations"
      className="glass-premium rounded-2xl p-4 card-hover group relative overflow-hidden block min-w-[240px] sm:min-w-0"
    >
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-zyvo-gold/8 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-bold text-zyvo-gold uppercase tracking-wider">
            Prochaine réservation
          </span>
          <span className={"text-[10px] font-bold ".concat(booking.statusColor)}>{booking.status}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={"w-10 h-10 rounded-xl bg-gradient-to-br ".concat(booking.provider.coverGradient, " flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0")}>
            {booking.provider.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white truncate group-hover:text-zyvo-gold transition-colors">
              {booking.provider.name}
            </p>
            <p className="text-[11px] text-zyvo-muted truncate">{booking.provider.service}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold text-white">{booking.date}</p>
            <p className="text-[10px] text-zyvo-muted">{booking.time}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ProviderCardMini({ provider }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(provider.id)
  return (
    <Link
      to={"/dashboard/client/prestataire/".concat(provider.id)}
      className="glass-premium rounded-2xl p-3 card-hover group block min-w-[160px] sm:min-w-0"
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className={"w-8 h-8 rounded-lg bg-gradient-to-br ".concat(provider.coverGradient, " flex items-center justify-center text-[10px] font-bold text-white shadow-lg shrink-0")}>
          {provider.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-xs text-white truncate group-hover:text-zyvo-gold transition-colors">
            {provider.name}
          </p>
          <p className="text-[9px] text-zyvo-muted truncate">{provider.service}</p>
        </div>
        <button onClick={(e) => { e.preventDefault(); toggleFavorite(provider) }}
          className={"w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ".concat(
            fav ? 'bg-pink-500/20 text-pink-400' : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10'
          )}
        >
          <Heart className={"w-3 h-3".concat(fav ? ' fill-pink-400' : '')} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex items-center gap-2 text-[9px]">
        <span className="flex items-center gap-0.5 text-amber-400 font-bold">
          <Star className="w-2.5 h-2.5 fill-amber-400" strokeWidth={0} />{provider.rating}
        </span>
        <span className="text-zyvo-muted">{provider.city}</span>
        <span className="ml-auto font-bold text-white text-[10px]">{provider.price}</span>
      </div>
    </Link>
  )
}

function SectionHeader({ icon: Icon, title, linkTo, linkLabel }) {
  return (
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-gold" strokeWidth={1.5} />}
        <h2 className="font-extrabold text-sm sm:text-base text-white">{title}</h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="text-[10px] sm:text-xs font-semibold text-zyvo-gold hover:underline flex items-center gap-0.5">
          {linkLabel || 'Voir tout'} <ChevronRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  )
}

function SkeletonState() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/5 rounded w-1/3" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="glass-premium rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 bg-white/5 rounded w-1/2" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="glass-premium rounded-2xl p-4">
        <div className="h-4 bg-white/5 rounded w-1/4 mb-4" />
        <div className="flex gap-3">
          <div className="h-28 bg-white/5 rounded-2xl w-56" />
          <div className="h-28 bg-white/5 rounded-2xl w-56" />
        </div>
      </div>
    </div>
  )
}

export default function Accueil() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const { bookings } = useBookings()
  const { recent } = useRecentlyViewed()
  const { unreadCount } = useNotifications()
  const loading = useLoading(200)
  const [greeting, setGreeting] = useState(getGreeting)

  useEffect(() => { setGreeting(getGreeting()) }, [])

  const stats = useMemo(() => [
    { icon: FileText, label: 'Devis en cours', value: quotes.filter(q => q.status === 'pending' || q.status === 'answered').length, gradient: 'from-blue-500 to-cyan-400', delay: 0.05 },
    { icon: Calendar, label: 'R\xe0 venir', value: bookings.filter(b => b.status === 'Confirmée' || b.status === 'En attente').length, gradient: 'from-emerald-500 to-teal-400', delay: 0.1 },
    { icon: Heart, label: 'Favoris', value: favorites.length, gradient: 'from-pink-500 to-rose-400', delay: 0.15 },
    { icon: Star, label: 'Note moyenne', value: '4.7', gradient: 'from-amber-500 to-orange-400', delay: 0.2 },
  ], [favorites.length, bookings])

  const nextBooking = useMemo(
    () => myBookings.find(b => b.status === 'Confirmée' || b.status === 'En attente'),
    []
  )

  const recentQuotes = useMemo(() => quotes.slice(0, 3), [])

  const topProviders = useMemo(
    () => [...extendedProviders].sort((a, b) => b.rating - a.rating).slice(0, 6),
    []
  )

  if (loading) return <SkeletonState />

  return (
    <div className="space-y-5 sm:space-y-7">
      {/* ===== GREETING ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-extrabold truncate">
              {greeting}, <span className="gradient-text-brand">{user?.name?.split(' ')[0] || 'Utilisateur'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zyvo-muted mt-0.5">
              {unreadCount > 0 ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold animate-pulse" />
                  {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
                </span>
              ) : (
                'Pr\xeat \xe0 trouver le bon pro ?'
              )}
            </p>
          </div>
          <Link
            to="/dashboard/client/notifications"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-premium-light flex items-center justify-center shrink-0 ml-3"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-muted" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zyvo-gold text-[8px] font-bold text-zyvo-dark flex items-center justify-center shadow-lg">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
        </div>
      </motion.div>

      {/* ===== SEARCH BAR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <Link
          to="/dashboard/client/explorer"
          className="block group"
        >
          <div className="glass-premium rounded-2xl p-3.5 sm:p-4 card-hover">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-zyvo-gold/20 to-zyvo-gold/5 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-zyvo-muted group-hover:text-white transition-colors">
                  Que cherchez-vous ?
                </p>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zyvo-muted group-hover:text-zyvo-gold group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        {stats.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ===== PROCHAINE RESERVATION / DEVIS ===== */}
      {(nextBooking || recentQuotes.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <SectionHeader
            icon={Calendar}
            title={nextBooking ? 'Prochaine réservation' : 'Mes derniers devis'}
            linkTo="/dashboard/client/reservations"
          />
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
            {nextBooking && <BookingCard booking={nextBooking} />}
            {recentQuotes.map(q => (
              <QuoteCard key={q.id} quote={q} />
            ))}
          </div>
        </motion.div>
      )}

      {/* ===== PRESTATAIRES RECOMMANDES ===== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
      >
        <SectionHeader
          icon={Sparkles}
          title="Prestataires recommandés"
          linkTo="/dashboard/client/explorer"
        />
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          {topProviders.map(p => (
            <ProviderCardMini key={p.id} provider={p} />
          ))}
        </div>
      </motion.div>

      {/* ===== RECENTLY VIEWED ===== */}
      {recent.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          <SectionHeader
            icon={Heart}
            title="Récemment consultés"
          />
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
            {recent.map(p => (
              <ProviderCardMini key={p.id} provider={p} />
            ))}
          </div>
        </motion.div>
      )}

      {/* ===== ACTIVITE ===== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
      >
        <SectionHeader
          icon={Users}
          title="Activité récente"
          linkTo="/dashboard/client/explorer"
          linkLabel="Explorer"
        />
        <div className="glass-premium rounded-2xl divide-y divide-white/5">
          {activityFeed.slice(0, 4).map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors rounded-xl">
              <div className={"w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ".concat(
                a.type === 'reservation' ? 'bg-blue-500/20 text-blue-400' :
                a.type === 'review' ? 'bg-amber-500/20 text-amber-400' :
                a.type === 'like' ? 'bg-pink-500/20 text-pink-400' :
                'bg-emerald-500/20 text-emerald-400'
              )}>
                {a.type === 'reservation' ? <Calendar className="w-4 h-4" /> :
                 a.type === 'review' ? <Star className="w-4 h-4" /> :
                 a.type === 'like' ? <Heart className="w-4 h-4" /> :
                 <Users className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white">
                  <span className="font-bold">{a.userName}</span>
                  {' '}{a.action}{' '}
                  <span className="text-zyvo-gold">{a.target}</span>
                </p>
                <p className="text-[10px] text-zyvo-muted mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== BOTTOM SPACER ===== */}
      <div className="h-4" />
    </div>
  )
}
