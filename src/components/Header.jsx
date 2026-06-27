import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Home, Search, Calendar, Heart, User, Moon, Sun, Bell, MessageCircle } from 'lucide-react'
import { useAuth } from '../context/auth'
import { useTheme } from '../context/theme'
import { useNotifications } from '../context/notifications'
import { useI18n } from '../i18n'
import Logo from './Logo'
import RoleModal from './RoleModal'

const navLinks = [
  { to: '/', icon: Home, label: 'nav.home' },
  { to: '/search', icon: Search, label: 'nav.search' },
  { to: '/bookings', icon: Calendar, label: 'nav.bookings' },
  { to: '/favorites', icon: Heart, label: 'nav.favorites' },
  { to: '/profile', icon: User, label: 'nav.profile' },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
      title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
    >
      {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-zyvo-gold" />}
    </button>
  )
}

function NotificationBell() {
  const { unreadCount, setShowPanel } = useNotifications()
  return (
    <button
      onClick={() => setShowPanel(true)}
      className="relative p-1.5 sm:p-2 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
    >
      <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-zyvo-gold text-[7px] sm:text-[9px] font-bold text-zyvo-dark flex items-center justify-center shadow-lg">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

export default function Header() {
  const { user } = useAuth()
  const { _t } = useI18n()
  const [showRoleModal, setShowRoleModal] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-premium border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="group shrink-0">
              <Logo />
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-6">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-zyvo-muted hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {_t(label)}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-0.5 sm:gap-2">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <Link
                to="/messages"
                className="hidden sm:flex p-1.5 sm:p-2 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <NotificationBell />
              {user ? (
                <Link
                  to="/profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl gradient-primary flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shadow-lg"
                >
                  {user.name.charAt(0)}
                </Link>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link
                    to="/auth"
                    className="text-[11px] sm:text-sm font-semibold text-zyvo-muted hover:text-white transition-colors px-1.5 sm:px-3 py-1.5 sm:py-2"
                  >
                    Connexion
                  </Link>
                  <button
                    onClick={() => setShowRoleModal(true)}
                    className="gradient-brand text-white text-[11px] sm:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl gradient-glow-warm hover:scale-105 transition-all duration-300 glow-worm whitespace-nowrap"
                  >
                    S'inscrire
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <RoleModal open={showRoleModal} onClose={() => setShowRoleModal(false)} />
    </>
  )
}
