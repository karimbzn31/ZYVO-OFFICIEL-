import { Link, Navigate } from 'react-router-dom'
import { Calendar, Star, Clock, MapPin, DollarSign, Users, ShieldCheck, ChevronRight, Settings } from 'lucide-react'
import { useAuth } from '../context/auth'
import { useBookings } from '../context/booking'

export default function ProviderDashboard() {
  const { user, switchRole } = useAuth()
  const { allBookings } = useBookings()

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  const myBookings = allBookings.filter(b => b.providerName && b.userRole === 'prestataire')
  const upcoming = myBookings.filter(b => b.status === 'Confirmée')
  const completed = myBookings.filter(b => b.status === 'Terminée')
  const totalEarnings = myBookings.reduce((sum, b) => {
    const price = parseInt((b.price || '0').replace(/\D/g, ''))
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  const stats = [
    { icon: Calendar, label: 'Réservations à venir', value: upcoming.length.toString(), color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Star, label: 'Note moyenne', value: '4.9', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: DollarSign, label: 'Gains totaux', value: `${totalEarnings.toLocaleString()} DA`, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Users, label: 'Clients satisfaits', value: completed.length.toString(), color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ]

  const quickActions = [
    { label: 'Mes services', desc: 'Gérer vos services proposés', to: '#' },
    { label: 'Mes disponibilités', desc: 'Définir vos horaires', to: '#' },
    { label: 'Messages', desc: 'Voir vos conversations', to: '#' },
    { label: 'Paramètres', desc: 'Modifier votre profil', to: '#' },
  ]

  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-xl font-bold text-white shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Tableau de bord</h1>
            <p className="text-sm text-zyvo-muted">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zyvo-muted">Mode :</span>
          <button
            onClick={() => switchRole('client')}
            className="px-3 py-1.5 rounded-lg bg-zyvo-gold/10 text-zyvo-gold font-bold border border-zyvo-gold/20"
          >
            Prestataire
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ icon: StatIcon, label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-5 card-hover border border-white/5`}>
            <StatIcon className={`w-6 h-6 ${color} mb-3`} strokeWidth={1.5} />
            <div className="text-2xl font-extrabold text-white">{value}</div>
            <div className="text-xs text-zyvo-muted mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* UPCOMING BOOKINGS */}
      <div className="glass-premium rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Réservations à venir</h3>
          <Link to="/bookings" className="text-xs text-zyvo-gold font-semibold hover:underline">Voir tout</Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="text-center py-6 text-sm text-zyvo-muted">
            Aucune réservation pour le moment.
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.slice(0, 3).map((b) => (
              <div key={b.id} className="flex items-center gap-3 glass-premium-light rounded-xl p-3">
                <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold text-white">
                  {b.providerName?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{b.providerName}</div>
                  <div className="flex items-center gap-2 text-xs text-zyvo-muted mt-0.5">
                    <Calendar className="w-3 h-3" /> {b.date}
                    <Clock className="w-3 h-3" /> {b.time}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-zyvo-success">{b.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid sm:grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className="glass-premium rounded-2xl p-4 card-hover text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{action.label}</h4>
                <p className="text-xs text-zyvo-muted mt-0.5">{action.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-zyvo-muted shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
