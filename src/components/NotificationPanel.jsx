import { Bell, X, CheckCheck, Trash2, MessageCircle, Calendar, Tag, Clock } from 'lucide-react'
import { useNotifications } from '../context/notifications'

const iconMap = {
  booking: Calendar,
  message: MessageCircle,
  reminder: Clock,
  promo: Tag,
}

const colorMap = {
  booking: 'text-blue-400 bg-blue-500/10',
  message: 'text-purple-400 bg-purple-500/10',
  reminder: 'text-amber-400 bg-amber-500/10',
  promo: 'text-emerald-400 bg-emerald-500/10',
}

export default function NotificationPanel() {
  const {
    notifications, unreadCount, showPanel,
    setShowPanel, markAsRead, markAllAsRead, clearAll,
  } = useNotifications()

  if (!showPanel) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" onClick={() => setShowPanel(false)}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm glass-premium h-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-zyvo-gold" />
            <h2 className="font-extrabold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-zyvo-gold text-[10px] font-bold text-zyvo-dark">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-[10px] font-bold text-zyvo-gold hover:underline">
                Tout marquer lu
              </button>
            )}
            <button onClick={() => setShowPanel(false)} className="p-1.5 rounded-lg text-zyvo-muted hover:text-white hover:bg-white/5 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl glass-premium flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-zyvo-muted/40" />
              </div>
              <p className="text-sm text-zyvo-muted">Aucune notification</p>
            </div>
          ) : (
            <>
              {notifications.map((n) => {
                const Icon = iconMap[n.type] || Bell
                const colorClass = colorMap[n.type] || 'text-zyvo-muted bg-white/5'
                return (
                  <button
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`w-full text-left px-5 py-4 transition-colors hover:bg-white/5 ${
                      !n.read ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-sm ${n.read ? 'text-zyvo-muted' : 'text-white font-bold'}`}>
                            {n.title}
                          </span>
                          {!n.read && <div className="w-2 h-2 rounded-full bg-zyvo-gold shrink-0 mt-1.5" />}
                        </div>
                        <p className="text-xs text-zyvo-muted mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-zyvo-muted/60 mt-1">{n.time}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
              <div className="px-5 py-4 border-t border-white/5">
                <button
                  onClick={clearAll}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors py-2"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Tout effacer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
