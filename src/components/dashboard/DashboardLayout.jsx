import { useState, useMemo } from 'react'
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Search, Heart, Calendar, Star, MessageCircle, User, LogOut, Menu, X
} from 'lucide-react'
import { useAuth } from '../../context/auth'
import { useFavorites } from '../../context/favorites'
import { useBookings } from '../../context/booking'
import { chatMessages } from '../../data/dashboardData'
import Logo from '../Logo'

const navItems = [
  { to: '/dashboard/client', icon: LayoutDashboard, label: 'Accueil', end: true, badgeKey: null },
  { to: '/dashboard/client/explorer', icon: Search, label: 'Explorer', badgeKey: null },
  { to: '/dashboard/client/favoris', icon: Heart, label: 'Favoris', badgeKey: 'favorites' },
  { to: '/dashboard/client/reservations', icon: Calendar, label: 'Réservations', badgeKey: 'bookings' },
  { to: '/dashboard/client/avis', icon: Star, label: 'Mes Avis', badgeKey: null },
  { to: '/dashboard/client/messages', icon: MessageCircle, label: 'Messages', badgeKey: 'messages' },
  { to: '/dashboard/client/profil', icon: User, label: 'Profil', badgeKey: null },
]

const bottomNavItems = [
  { to: '/dashboard/client', icon: LayoutDashboard, label: 'Accueil', end: true, badgeKey: null },
  { to: '/dashboard/client/explorer', icon: Search, label: 'Explorer', badgeKey: null },
  { to: '/dashboard/client/favoris', icon: Heart, label: 'Favoris', badgeKey: 'favorites' },
  { to: '/dashboard/client/messages', icon: MessageCircle, label: 'Messages', badgeKey: 'messages' },
  { to: '/dashboard/client/profil', icon: User, label: 'Profil', badgeKey: null },
]

function Sidebar({ open, onClose, badgeCounts }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 glass-premium border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <Logo />
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end, badgeKey }) => {
            const count = badgeCounts[badgeKey] || 0
            return (
              <NavLink key={to} to={to} end={end} onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-zyvo-gold/20 to-transparent text-zyvo-gold border-l-2 border-zyvo-gold'
                      : 'text-zyvo-muted hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="flex-1">{label}</span>
                {count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-zyvo-gold text-[9px] font-bold text-zyvo-dark flex items-center justify-center shadow-lg">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-zyvo-muted">Client</p>
              </div>
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/') }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  )
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const { bookings } = useBookings()
  const location = useLocation()

  const badgeCounts = useMemo(() => ({
    favorites: favorites.length,
    bookings: bookings.filter(b => b.status === 'En attente' || b.status === 'Confirmée').length,
    messages: chatMessages.filter(c => c.unread > 0).length,
  }), [favorites, bookings])

  return (
    <div className="min-h-screen bg-zyvo-dark">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} badgeCounts={badgeCounts} />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 glass-premium border-b border-white/5">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/dashboard/client" className="flex items-center gap-2">
            <span className="text-sm font-bold gradient-text-brand">Zyvo</span>
          </Link>
          <NavLink
            to="/dashboard/client/profil"
            className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center text-xs font-bold text-white shadow-lg"
          >
            {user?.name?.charAt(0) || 'U'}
          </NavLink>
        </div>
      </div>

      {/* Main */}
      <div className="lg:pl-64 pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-premium border-t border-white/5 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex justify-around items-center h-16 px-2">
          {bottomNavItems.map(({ to, icon: Icon, label, end, badgeKey }) => {
            const count = badgeCounts[badgeKey] || 0
            return (
              <NavLink key={to} to={to} end={end} className="relative">
                {({ isActive }) => (
                  <div className={`flex flex-col items-center gap-0.5 transition-all px-2 ${isActive ? 'text-zyvo-gold' : 'text-zyvo-muted'}`}>
                    <div className="relative">
                      <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
                      {count > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-zyvo-gold text-[8px] font-bold text-zyvo-dark flex items-center justify-center shadow-lg">
                          {count > 9 ? '9+' : count}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-semibold whitespace-nowrap">{label}</span>
                  </div>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
