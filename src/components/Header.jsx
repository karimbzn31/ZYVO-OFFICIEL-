import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Home, Search, Calendar, Heart, User } from 'lucide-react'
import { useAuth } from '../context/auth'
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
              {user ? (
                <Link
                  to={user.role === 'prestataire' ? '/dashboard/prestataire' : '/dashboard/client'}
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
