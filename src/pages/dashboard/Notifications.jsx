import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Bell, CheckCheck, Trash2, Calendar, MessageCircle, Star, 
  Clock, Tag, ChevronRight, Megaphone, FileText,
  AlertCircle
} from 'lucide-react'
import { useNotifications } from '../../context/notifications'
import { useLoading } from '../../hooks/useLoading'
import { ListSkeleton } from '../../components/dashboard/Skeleton'

const iconMap = {
  booking: Calendar,
  message: MessageCircle,
  reminder: Clock,
  review: Star,
  promo: Tag,
  quote: FileText,
  alert: AlertCircle,
  info: Megaphone,
}

const colorMap = {
  booking: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400',
  message: 'from-blue-500/20 to-blue-500/5 text-blue-400',
  reminder: 'from-amber-500/20 to-amber-500/5 text-amber-400',
  review: 'from-purple-500/20 to-purple-500/5 text-purple-400',
  promo: 'from-pink-500/20 to-pink-500/5 text-pink-400',
  quote: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400',
  alert: 'from-red-500/20 to-red-500/5 text-red-400',
  info: 'from-zyvo-gold/20 to-zyvo-gold/5 text-zyvo-gold',
}

export default function Notifications() {
  const loading = useLoading(250)
  const { notifications, markAsRead, markAllAsRead, clearAll, unreadCount } = useNotifications()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications

  const groupByDate = () => {
    const groups = {}
    const now = new Date()
    
    filtered.forEach(n => {
      let group
      const t = n.time
      if (t.includes('min') || t.includes('instant')) group = "Aujourd'hui"
      else if (t.includes('h') && !t.includes('j')) group = "Aujourd'hui"
      else if (t.includes('j') && parseInt(t) <= 2) group = "Cette semaine"
      else group = 'Antérieur'
      if (!groups[group]) groups[group] = []
      groups[group].push(n)
    })
    return groups
  }

  const groups = groupByDate()

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-36 rounded bg-white/5 animate-pulse" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="h-8 w-24 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
        <ListSkeleton count={6} />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-zyvo-muted mt-0.5">
            {unreadCount > 0
              ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}`
              : 'Tout est à jour'}
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-zyvo-gold"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tout lire</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2">
        {['all', 'unread'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === f
                ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            {f === 'all' ? 'Toutes' : 'Non lues'}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 w-4 h-4 rounded-full bg-zyvo-gold text-[8px] font-bold text-zyvo-dark inline-flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-zyvo-muted/40" />
          </div>
          <p className="font-bold text-white text-lg">Aucune notification</p>
          <p className="text-sm text-zyvo-muted mt-1">
            {filter === 'unread' ? 'Toutes vos notifications sont lues' : 'Vous n\'avez pas encore de notifications'}
          </p>
          {filter === 'unread' && (
            <button
              onClick={() => setFilter('all')}
              className="mt-4 text-sm font-semibold text-zyvo-gold hover:underline"
            >
              Voir toutes les notifications
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groups).map(([groupName, items]) => (
            <div key={groupName}>
              <p className="text-xs font-bold text-zyvo-muted uppercase tracking-wider mb-3 px-1">{groupName}</p>
              <div className="space-y-2">
                {items.map(n => {
                  const Icon = iconMap[n.type] || Bell
                  const colorClass = colorMap[n.type] || colorMap.info
                  return (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`glass-premium rounded-2xl p-4 card-hover transition-all ${
                        !n.read
                          ? 'border-l-2 border-zyvo-gold/60 bg-gradient-to-r from-zyvo-gold/[0.03] to-transparent'
                          : 'opacity-70'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shrink-0 shadow-lg`}>
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-bold text-sm text-white">{n.title}</p>
                              <p className="text-xs text-zyvo-muted mt-0.5 line-clamp-2">{n.message}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-zyvo-muted/60">{n.time}</span>
                            {!n.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clear all */}
      {notifications.length > 0 && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-zyvo-muted hover:text-red-400"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Tout effacer
        </button>
      )}
    </div>
  )
}
