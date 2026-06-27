import { useState, useMemo } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Calendar, Clock, Star, DollarSign, Users, MessageCircle,
  ChevronRight, Bell, TrendingUp, CheckCircle, AlertCircle, FileText
} from 'lucide-react'
import { useBookings } from '../../../context/booking'
import { useNotifications } from '../../../context/notifications'
import { useLoading } from '../../../hooks/useLoading'
import { ListSkeleton } from '../../../components/dashboard/Skeleton'

const statusConfig = {
  'Confirmée': { class: 'text-emerald-400 bg-emerald-500/10' },
  'En attente': { class: 'text-amber-400 bg-amber-500/10' },
  'Terminée': { class: 'text-zyvo-muted bg-white/5' },
  'Annulée': { class: 'text-red-400 bg-red-500/10' },
}

function StatCard({ icon: Icon, label, value, sub, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="glass-premium rounded-2xl p-4 card-hover"
    >
      <div className="flex items-center gap-3">
        <div className={"w-10 h-10 rounded-xl bg-gradient-to-br ".concat(gradient, " flex items-center justify-center shadow-lg shrink-0")}>
          <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-white">{value}</p>
          <p className="text-[11px] text-zyvo-muted">{label}</p>
          {sub && <p className="text-[10px] text-zyvo-muted/60 mt-0.5">{sub}</p>}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProviderAccueil() {
  const { provider } = useOutletContext()
  const { allBookings } = useBookings()
  const { unreadCount } = useNotifications()
  const loading = useLoading(400)

  const myBookings = useMemo(() => {
    if (!provider) return []
    return allBookings.filter(b => b.name === provider.name)
  }, [allBookings, provider])

  const upcoming = myBookings.filter(b => b.status === 'Confirmée' || b.status === 'En attente')
  const completed = myBookings.filter(b => b.status === 'Terminée')
  const totalEarnings = myBookings.reduce((sum, b) => {
    const price = parseInt((b.priceValue || '0').toString().replace(/\D/g, ''))
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  const monthlyEarnings = completed.reduce((sum, b) => {
    const price = parseInt((b.priceValue || '0').toString().replace(/\D/g, ''))
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-44 rounded bg-white/5 animate-pulse" />
            <div className="h-4 w-32 rounded bg-white/5 animate-pulse" />
          </div>
          <div className="h-10 w-10 rounded-xl bg-white/5 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-20 rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
        <ListSkeleton count={3} />
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
        <p className="font-bold text-white">Profil prestataire introuvable</p>
        <p className="text-xs text-zyvo-muted mt-1">Connectez-vous avec un compte prestataire</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold">
            Bonjour <span className="gradient-text-brand">{provider.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zyvo-muted mt-0.5">{provider.service} · {provider.city}</p>
        </div>
        <Link
          to="/dashboard/prestataire/profil"
          className="relative w-10 h-10 rounded-xl glass-premium-light flex items-center justify-center shrink-0"
        >
          <Bell className="w-5 h-5 text-zyvo-muted" strokeWidth={1.5} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-zyvo-gold text-[8px] font-bold text-zyvo-dark flex items-center justify-center ring-2 ring-zyvo-dark">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Calendar} label="À venir" value={upcoming.length.toString()} sub="réservations" gradient="from-blue-600 to-cyan-500" delay={0} />
        <StatCard icon={CheckCircle} label="Terminées" value={completed.length.toString()} sub="missions" gradient="from-emerald-600 to-teal-500" delay={0.05} />
        <StatCard icon={DollarSign} label="Ce mois" value={`${monthlyEarnings.toLocaleString()} DA`} sub="gagnés" gradient="from-amber-600 to-orange-500" delay={0.1} />
        <StatCard icon={Star} label="Note" value={provider.rating.toString()} sub={`${provider.missions} missions`} gradient="from-purple-600 to-pink-500" delay={0.15} />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/dashboard/prestataire/demandes" className="glass-premium rounded-2xl p-4 card-hover flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shrink-0">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-white">Demandes</p>
            <p className="text-[10px] text-zyvo-muted">Devis reçus</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-zyvo-muted shrink-0" />
        </Link>
        <Link to="/dashboard/prestataire/revenus" className="glass-premium rounded-2xl p-4 card-hover flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm text-white">Revenus</p>
            <p className="text-[10px] text-zyvo-muted">{totalEarnings.toLocaleString()} DA total</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-zyvo-muted shrink-0" />
        </Link>
      </div>

      {/* Upcoming bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zyvo-gold" />
            Prochaines missions
          </h3>
          <Link to="/dashboard/prestataire/calendrier" className="text-[10px] font-semibold text-zyvo-gold hover:underline">Voir tout</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="glass-premium rounded-2xl p-6 text-center">
            <Calendar className="w-8 h-8 text-zyvo-muted/20 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zyvo-muted">Aucune mission à venir</p>
            <p className="text-xs text-zyvo-muted/60 mt-1">Les réservations apparaîtront ici</p>
          </div>
        ) : (
          <div className="space-y-2">
            {upcoming.slice(0, 5).map(b => (
              <div key={b.id} className="glass-premium rounded-2xl p-3.5 card-hover flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-zyvo-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{b.name}</p>
                  <div className="flex items-center gap-2 text-[10px] text-zyvo-muted mt-0.5">
                    <span>{b.date}</span>
                    <span className="text-white/20">·</span>
                    <Clock className="w-3 h-3" />
                    <span>{b.time}</span>
                    <span className="text-white/20">·</span>
                    <span>{b.city}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${(statusConfig[b.status] || statusConfig['En attente']).class}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile summary */}
      <div className="glass-premium rounded-2xl p-4 card-hover">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-zyvo-gold" />
            Popularité
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-white">{provider.likes}</p>
            <p className="text-[10px] text-zyvo-muted">Favoris</p>
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-400">{provider.response_rate}</p>
            <p className="text-[10px] text-zyvo-muted">Réponse</p>
          </div>
          <div>
            <p className="text-lg font-bold text-amber-400">{provider.response_time}</p>
            <p className="text-[10px] text-zyvo-muted">Délai</p>
          </div>
        </div>
      </div>

      <div className="h-2" />
    </div>
  )
}
