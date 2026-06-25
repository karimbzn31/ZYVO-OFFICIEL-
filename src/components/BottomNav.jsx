import { NavLink } from 'react-router-dom'
import { Home, Search, Calendar, Heart, User } from 'lucide-react'
import { useFavorites } from '../context/favorites'

const items = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/search', icon: Search, label: 'Recherche' },
  { to: '/bookings', icon: Calendar, label: 'Réservations' },
  { to: '/favorites', icon: Heart, label: 'Favoris' },
  { to: '/profile', icon: User, label: 'Profil' },
]

function NavItem({ to, icon: Icon, label, badge }) {
  return (
    <NavLink to={to} end={to === '/'} className="relative">
      {({ isActive }) => (
        <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-zyvo-gold' : 'text-zyvo-muted'}`}>
          <div className="relative">
            <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
            {badge > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pink-500 text-[9px] font-bold text-white flex items-center justify-center shadow-lg">
                {badge > 9 ? '9+' : badge}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">{label}</span>
        </div>
      )}
    </NavLink>
  )
}

export default function BottomNav() {
  const { favorites } = useFavorites()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-premium z-50 border-t border-white/5 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-7xl mx-auto flex justify-around items-center h-16 px-4">
        {items.map((item) => (
          <NavItem key={item.to} {...item} badge={item.to === '/favorites' ? favorites.length : 0} />
        ))}
      </div>
    </nav>
  )
}
