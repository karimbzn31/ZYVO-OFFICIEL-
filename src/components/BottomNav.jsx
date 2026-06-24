import { NavLink } from 'react-router-dom'
import { Home, Search, Calendar, Heart, User } from 'lucide-react'

const items = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/search', icon: Search, label: 'Recherche' },
  { to: '/bookings', icon: Calendar, label: 'Réservations' },
  { to: '/favorites', icon: Heart, label: 'Favoris' },
  { to: '/profile', icon: User, label: 'Profil' },
]

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} end={to === '/'}>
      {({ isActive }) => (
        <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-zyvo-gold' : 'text-zyvo-muted'}`}>
          <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
          <span className="text-[10px] font-semibold">{label}</span>
        </div>
      )}
    </NavLink>
  )
}

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-premium z-50 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex justify-around items-center h-16 px-4">
        {items.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </div>
    </nav>
  )
}
