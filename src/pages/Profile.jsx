import { User, Settings, Star, LogOut, ChevronRight, ShieldCheck, MessageCircle, LogIn, Award, Briefcase, SwitchCamera } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'

const menuItems = [
  { icon: User, label: 'Mes informations' },
  { icon: Star, label: 'Mes avis' },
  { icon: Award, label: 'Mes missions' },
  { icon: Settings, label: 'Paramètres' },
  { icon: MessageCircle, label: 'Support WhatsApp' },
]

export default function Profile() {
  const { user, logout, switchRole } = useAuth()

  if (!user) {
    return (
      <div className="py-8 lg:py-12 max-w-md mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-zyvo-muted/40" strokeWidth={1} />
        </div>
        <h2 className="text-xl font-extrabold">Connectez-vous</h2>
        <p className="text-sm text-zyvo-muted mt-2 max-w-xs mx-auto">
          Créez un compte ou connectez-vous pour gérer vos réservations, favoris et bien plus.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 gradient-brand text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 mt-6 glow-worm"
        >
          <LogIn className="w-4 h-4" />
          Se connecter
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-xl mx-auto">
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {user.name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-zyvo-dark flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-extrabold mt-4">{user.name}</h2>
        <p className="text-sm text-zyvo-muted">{user.phone}</p>
        <span className="mt-2 text-xs font-bold bg-white/5 px-3 py-1 rounded-full capitalize text-zyvo-muted">
          {user.role === 'prestataire' ? 'Prestataire' : 'Client'}
        </span>
      </div>

      {/* ROLE SWITCHER */}
      {user.role === 'prestataire' ? (
        <Link
          to="/provider/dashboard"
          className="flex items-center gap-3 glass-premium rounded-2xl p-4 mb-4 card-hover"
        >
          <div className="w-10 h-10 rounded-xl bg-zyvo-gold/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-zyvo-gold" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-white">Tableau de bord prestataire</div>
            <div className="text-xs text-zyvo-muted">Gérez vos services et réservations</div>
          </div>
          <ChevronRight className="w-4 h-4 text-zyvo-muted" />
        </Link>
      ) : (
        <button
          onClick={() => switchRole('prestataire')}
          className="flex items-center gap-3 glass-premium rounded-2xl p-4 mb-4 card-hover w-full text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-zyvo-gold/10 flex items-center justify-center">
            <SwitchCamera className="w-5 h-5 text-zyvo-gold" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-white">Devenir prestataire</div>
            <div className="text-xs text-zyvo-muted">Proposez vos services sur Zyvo</div>
          </div>
          <ChevronRight className="w-4 h-4 text-zyvo-muted" />
        </button>
      )}

      <div className="glass-premium rounded-2xl divide-y divide-white/5 overflow-hidden">
        {menuItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Icon className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
            </div>
            <span className="flex-1 text-sm font-semibold text-white">{label}</span>
            <ChevronRight className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
          </button>
        ))}
      </div>

      <div className="glass-premium rounded-2xl p-4 mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zyvo-muted">Membre depuis</span>
          <span className="font-semibold text-white">2026</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-zyvo-muted">Rôle</span>
          <span className="font-semibold text-white capitalize">{user.role === 'prestataire' ? 'Prestataire' : 'Client'}</span>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 mt-6 text-sm font-bold text-red-400 py-3 hover:bg-red-500/10 rounded-xl transition-colors"
      >
        <LogOut className="w-4 h-4" /> Déconnexion
      </button>
    </div>
  )
}
