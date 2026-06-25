import { Link, NavLink } from 'react-router-dom'
import { Home, Search, Calendar, Heart, User, Moon, Sun, Bell, MessageCircle } from 'lucide-react'
import { useAuth } from '../context/auth'
import { useTheme } from '../context/theme'
import { useNotifications } from '../context/notifications'
import { useI18n } from '../i18n'

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
      className="p-1.5 sm:p-2 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
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
      <Bell className="w-4 h-4" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-zyvo-gold text-[9px] font-bold text-zyvo-dark flex items-center justify-center shadow-lg">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

export default function Header() {
  const { user } = useAuth()
  const { _t } = useI18n()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center font-bold text-white text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="relative z-10">Z</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-zyvo-gold rounded-full animate-pulse-soft" />
            </div>
            <span className="text-lg font-extrabold gradient-text-brand leading-tight">Zyvo</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
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

          <div className="flex items-center gap-0.5 sm:gap-1">
            <ThemeToggle />
            <Link
              to="/messages"
              className="hidden sm:flex p-1.5 sm:p-2 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </Link>
            <NotificationBell />
            {user ? (
              <Link
                to="/profile"
                className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-xs font-bold text-white"
              >
                {user.name.charAt(0)}
              </Link>
            ) : (
              <Link
                to="/auth"
                className="gradient-brand text-white text-sm font-bold px-3 sm:px-5 py-2 rounded-xl gradient-glow-warm hover:scale-105 transition-all duration-300 glow-worm"
              >
                {_t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
