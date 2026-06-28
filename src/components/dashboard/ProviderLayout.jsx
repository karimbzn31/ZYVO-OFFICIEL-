import { useState, useMemo, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FileText, Briefcase, Calendar, MessageCircle, DollarSign,
  Star, User, LogOut, Menu, X, Bell, ChevronDown, ArrowLeft, BarChart3
} from 'lucide-react'
import { useAuth } from '../../context/auth'
import { useNotifications } from '../../context/notifications'
import { getProviders } from '../../lib/supabase'
import { chatMessages } from '../../data/dashboardData'
import Logo from '../Logo'

const navItems = [
  { to: '/dashboard/prestataire', icon: LayoutDashboard, label: 'Accueil', end: true, badgeKey: null },
  { to: '/dashboard/prestataire/demandes', icon: FileText, label: 'Demandes', badgeKey: null },
  { to: '/dashboard/prestataire/services', icon: Briefcase, label: 'Mes services', badgeKey: null },
  { to: '/dashboard/prestataire/calendrier', icon: Calendar, label: 'Calendrier', badgeKey: null },
  { to: '/dashboard/prestataire/messages', icon: MessageCircle, label: 'Messages', badgeKey: 'messages' },
  { to: '/dashboard/prestataire/revenus', icon: DollarSign, label: 'Revenus', badgeKey: null },
  { to: '/dashboard/prestataire/statistiques', icon: BarChart3, label: 'Statistiques', badgeKey: null },
  { to: '/dashboard/prestataire/avis', icon: Star, label: 'Avis', badgeKey: null },
  { to: '/dashboard/prestataire/profil', icon: User, label: 'Profil', badgeKey: null },
]

const bottomNavItems = [
  { to: '/dashboard/prestataire', icon: LayoutDashboard, label: 'Accueil', end: true, badgeKey: null },
  { to: '/dashboard/prestataire/demandes', icon: FileText, label: 'Demandes', badgeKey: null },
  { to: '/dashboard/prestataire/messages', icon: MessageCircle, label: 'Messages', badgeKey: 'messages' },
  { to: '/dashboard/prestataire/statistiques', icon: BarChart3, label: 'Stats', badgeKey: null },
  { to: '/dashboard/prestataire/profil', icon: User, label: 'Profil', badgeKey: null },
]

function Sidebar({ open, onClose, badgeCounts, provider }) {
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

        {provider && (
          <div className="mx-3 mt-3 p-3 rounded-xl bg-white/5 flex items-center gap-3">
            <div className={"w-9 h-9 rounded-xl bg-gradient-to-br ".concat(provider.coverGradient || 'from-blue-500 to-cyan-400', " flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0")}>
              {provider.name?.charAt(0) || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate">{provider.name}</p>
              <p className="text-[10px] text-zyvo-muted truncate">{provider.service}</p>
            </div>
          </div>
        )}

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
          <Link
            to="/dashboard/client"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            Mode client
          </Link>
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

export default function ProviderLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [supabaseProvider, setSupabaseProvider] = useState(null)
  const { user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!user) return
    getProviders({ search: user.name })
      .then(data => {
        if (data?.length > 0) setSupabaseProvider(data[0])
        else setSupabaseProvider(null)
      })
      .catch(() => setSupabaseProvider(null))
  }, [user])

  const provider = useMemo(() => {
    // Try Supabase provider first
    if (supabaseProvider) {
      try {
        const raw = localStorage.getItem('zyvo_provider_edits')
        if (raw) {
          const edits = JSON.parse(raw)
          if (edits[supabaseProvider.id]) {
            return { ...supabaseProvider, ...edits[supabaseProvider.id] }
          }
        }
      } catch {}
      return supabaseProvider
    }
    // Fallback: create minimal provider from user data (newly registered)
    if (user && user.role === 'prestataire') {
      return {
        id: user.id || 'new',
        name: user.name || 'Prestataire',
        service: 'Mon service',
        city: user.city || '',
        category: '',
        description: '',
        rating: 0,
        missions: 0,
        likes: 0,
        responseRate: '-',
        responseTime: '-',
        coverGradient: 'from-blue-600 via-blue-500 to-cyan-400',
        price: '-',
        priceValue: 0,
        badges: [],
        gallery: [],
        verifiedDocuments: [],
        languages: [],
        availabilityDays: [],
        availabilityFrom: '08:00',
        availabilityTo: '17:00',
        zones: [],
      }
    }
    return null
  }, [supabaseProvider, user])

  const badgeCounts = useMemo(() => ({
    messages: chatMessages.filter(c => c.unread > 0).length,
  }), [])

  return (
    <div className="min-h-screen bg-zyvo-dark">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} badgeCounts={badgeCounts} provider={provider} />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 glass-premium border-b border-white/5">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/dashboard/prestataire">
            <Logo />
          </Link>
          <div className="w-9" />
        </div>
      </div>

      {/* Main */}
      <div className="lg:pl-64 pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen overflow-x-hidden">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet context={{ provider }} />
          </motion.div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-premium border-t border-white/5 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex items-center justify-around h-14 px-1">
          {bottomNavItems.map(({ to, icon: Icon, label, end, badgeKey }) => {
            const count = badgeCounts[badgeKey] || 0
            return (
              <NavLink key={to} to={to} end={end} className="flex items-center justify-center flex-1">
                {({ isActive }) => (
                  <div className={`flex flex-col items-center gap-0.5 ${isActive ? 'text-zyvo-gold' : 'text-zyvo-muted'}`}>
                    <div className="relative flex items-center justify-center w-6 h-6">
                      <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
                      {count > 0 && (
                        <span className="absolute -top-1 right-0 w-3.5 h-3.5 rounded-full bg-zyvo-gold text-[7px] font-bold text-zyvo-dark flex items-center justify-center ring-2 ring-zyvo-dark">
                          {count > 9 ? '9+' : count}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-semibold">{label}</span>
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
