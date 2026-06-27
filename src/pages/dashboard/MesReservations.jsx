import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, MapPin, Clock, ChevronRight, XCircle, 
  CheckCircle, AlertCircle
} from 'lucide-react'
import { useLoading } from '../../hooks/useLoading'
import { ListSkeleton } from '../../components/dashboard/Skeleton'
import { myBookings } from '../../data/dashboardData'

const statusIcons = {
  'Confirmée': CheckCircle,
  'En attente': AlertCircle,
  'Terminée': CheckCircle,
  'Annulée': XCircle,
}

const statusColors = {
  'Confirmée': 'text-emerald-400 bg-emerald-500/10',
  'En attente': 'text-amber-400 bg-amber-500/10',
  'Terminée': 'text-zyvo-muted bg-white/5',
  'Annulée': 'text-red-400 bg-red-500/10',
}

export default function MesReservations() {
  const loading = useLoading(300)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? myBookings
    : myBookings.filter(b => {
        if (filter === 'upcoming') return b.status === 'Confirmée' || b.status === 'En attente'
        if (filter === 'past') return b.status === 'Terminée' || b.status === 'Annulée'
        return true
      })

  if (loading) return <div className="space-y-4"><ListSkeleton count={3} /></div>

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-zyvo-gold" />
        <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">réservations</span></h1>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'upcoming', label: 'À venir' },
          { key: 'past', label: 'Passées' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-semibold transition-all ${
              filter === f.key
                ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                : 'bg-white/5 text-zyvo-muted hover:text-white border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-zyvo-muted/20 mx-auto mb-4" strokeWidth={1} />
          <p className="font-bold text-white text-lg">Aucune réservation</p>
          <p className="text-sm text-zyvo-muted mt-1">Explorez le marché et réservez votre premier service</p>
          <Link to="/dashboard/client/explorer" className="inline-block mt-4 gradient-brand text-white font-bold px-6 py-3 rounded-xl text-sm">
            Explorer le marché
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {filtered.map((booking) => {
            const StatusIcon = statusIcons[booking.status] || Calendar
            const statusClass = statusColors[booking.status] || 'text-zyvo-muted bg-white/5'

            return (
              <div key={booking.id} className="glass-premium rounded-2xl p-4 sm:p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Link to={`/dashboard/client/prestataire/${booking.provider.id}`}>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${booking.provider.coverGradient} flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-lg shrink-0`}>
                        {booking.provider.name.charAt(0)}
                      </div>
                    </Link>
                    <div>
                      <Link to={`/dashboard/client/prestataire/${booking.provider.id}`} className="font-bold text-sm sm:text-base text-white hover:text-zyvo-gold transition-colors">
                        {booking.provider.name}
                      </Link>
                      <p className="text-[10px] sm:text-xs text-zyvo-muted">{booking.provider.service}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-[9px] sm:text-xs font-bold ${statusClass}`}>
                    <StatusIcon className="w-3 h-3" />
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-zyvo-muted mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {booking.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {booking.address}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  {booking.status !== 'Annulée' && booking.status !== 'Terminée' && (
                    <>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-bold hover:bg-emerald-500/20 transition-all">
                        <MessageCircle className="w-3 h-3" /> Contacter
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[10px] sm:text-xs font-bold hover:bg-red-500/20 transition-all">
                        <XCircle className="w-3 h-3" /> Annuler
                      </button>
                    </>
                  )}
                  {booking.status === 'Terminée' && (
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-[10px] sm:text-xs font-bold hover:bg-amber-500/20 transition-all">
                      <Star className="w-3 h-3" /> Donner mon avis
                    </button>
                  )}
                  <Link to={`/booking/${booking.id}`} className="ml-auto text-zyvo-gold text-[10px] sm:text-xs font-semibold hover:underline">
                    Détails <ChevronRight className="w-3 h-3 inline" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
