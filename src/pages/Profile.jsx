import { useState } from 'react'
import { User, Settings, Star, LogOut, ChevronRight, ShieldCheck, MessageCircle, LogIn, Award, Briefcase, SwitchCamera, Mail, Phone, Save, X, Calendar, Clock, Heart, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { useBookings } from '../context/booking'
import { useFavorites } from '../context/favorites'
import { useTheme } from '../context/theme'

export default function Profile() {
  const { user, logout, switchRole } = useAuth()
  const { bookings } = useBookings()
  const { favorites } = useFavorites()
  const { theme, toggleTheme } = useTheme()

  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  const startEdit = () => {
    setEditName(user?.name || '')
    setEditPhone(user?.phone || '')
    setEditing(true)
  }

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

  const activeBookings = bookings.filter(b => b.status !== 'Annulée')
  const completedBookings = bookings.filter(b => b.status === 'Annulée')

  return (
    <div className="py-8 max-w-xl mx-auto">
      {/* PROFILE HEADER */}
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

      {/* STATS ROW */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass-premium-light rounded-xl p-3 text-center card-hover">
          <Calendar className="w-4 h-4 text-zyvo-gold mx-auto mb-1" />
          <div className="text-lg font-extrabold gradient-text">{activeBookings.length}</div>
          <div className="text-[10px] text-zyvo-muted">Réservations</div>
        </div>
        <div className="glass-premium-light rounded-xl p-3 text-center card-hover">
          <Heart className="w-4 h-4 text-pink-400 mx-auto mb-1" />
          <div className="text-lg font-extrabold gradient-text">{favorites.length}</div>
          <div className="text-[10px] text-zyvo-muted">Favoris</div>
        </div>
        <div className="glass-premium-light rounded-xl p-3 text-center card-hover">
          <Star className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <div className="text-lg font-extrabold gradient-text">{completedBookings.length}</div>
          <div className="text-[10px] text-zyvo-muted">Terminées</div>
        </div>
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

      {/* EDIT PROFILE */}
      {editing ? (
        <div className="glass-premium rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Modifier mes informations</h3>
            <button onClick={() => setEditing(false)} className="text-zyvo-muted hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Nom complet</label>
              <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-white/5">
                <User className="w-4 h-4 text-zyvo-muted shrink-0" />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-white"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Téléphone</label>
              <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-white/5">
                <Phone className="w-4 h-4 text-zyvo-muted shrink-0" />
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-white"
                />
              </div>
            </div>
            <button className="w-full gradient-brand text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all glow-worm">
              <Save className="w-4 h-4" /> Enregistrer
            </button>
          </div>
        </div>
      ) : null}

      {/* MENU */}
      <div className="glass-premium rounded-2xl divide-y divide-white/5 overflow-hidden">
        <button onClick={startEdit} className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <User className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
          </div>
          <span className="flex-1 text-sm font-semibold text-white">Mes informations</span>
          <ChevronRight className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Star className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
          </div>
          <span className="flex-1 text-sm font-semibold text-white">Mes avis</span>
          <ChevronRight className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
        </button>
        <Link to="/favorites" className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Heart className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
          </div>
          <span className="flex-1 text-sm font-semibold text-white">Mes favoris</span>
          <span className="text-xs font-bold text-zyvo-gold">{favorites.length}</span>
          <ChevronRight className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
        </Link>
        <Link to="/bookings" className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
          </div>
          <span className="flex-1 text-sm font-semibold text-white">Mes réservations</span>
          <span className="text-xs font-bold text-zyvo-gold">{activeBookings.length}</span>
          <ChevronRight className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
        </Link>
        <button onClick={() => setShowSettings(!showSettings)} className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Settings className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
          </div>
          <span className="flex-1 text-sm font-semibold text-white">Paramètres</span>
          <ChevronRight className={`w-4 h-4 text-zyvo-muted transition-transform ${showSettings ? 'rotate-90' : ''}`} strokeWidth={1.5} />
        </button>
      </div>

      {/* SETTINGS PANEL */}
      {showSettings && (
        <div className="glass-premium rounded-2xl p-4 mt-4 space-y-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-semibold text-white flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-zyvo-gold" /> : <Sun className="w-4 h-4 text-zyvo-gold" />}
              Mode {theme === 'dark' ? 'sombre' : 'clair'}
            </span>
            <div className={`w-10 h-5 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-zyvo-gold/30' : 'bg-zyvo-gold'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'left-0.5' : 'left-[22px]'}`} />
            </div>
          </button>
          <button className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <span className="text-sm font-semibold text-white flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-zyvo-muted" /> Notifications
            </span>
            <div className="w-10 h-5 rounded-full bg-emerald-500/30 relative">
              <div className="absolute top-0.5 left-[22px] w-4 h-4 rounded-full bg-emerald-400 shadow" />
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <MessageCircle className="w-4 h-4 text-zyvo-muted" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Support WhatsApp</div>
              <div className="text-[10px] text-zyvo-muted">Disponible 7j/7</div>
            </div>
          </button>
        </div>
      )}

      {/* RECENT BOOKINGS */}
      {activeBookings.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Réservations récentes</h3>
            <Link to="/bookings" className="text-xs text-zyvo-gold font-semibold hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-2">
            {activeBookings.slice(0, 3).map((b) => (
              <div key={b.id} className="glass-premium rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold text-white">
                  {b.providerInitial || b.providerName?.charAt(0) || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{b.providerName}</div>
                  <div className="text-xs text-zyvo-muted flex items-center gap-2 mt-0.5">
                    <Calendar className="w-3 h-3" /> {b.date}
                    <Clock className="w-3 h-3" /> {b.time}
                  </div>
                </div>
                <span className={`text-[10px] font-bold ${b.statusColor || 'text-zyvo-success'}`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACCOUNT INFO */}
      <div className="glass-premium rounded-2xl p-4 mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zyvo-muted">Membre depuis</span>
          <span className="font-semibold text-white">2026</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-zyvo-muted">Rôle</span>
          <span className="font-semibold text-white capitalize">{user.role === 'prestataire' ? 'Prestataire' : 'Client'}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-zyvo-muted">Version</span>
          <span className="font-semibold text-white">1.0.0</span>
        </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 mt-6 text-sm font-bold text-red-400 py-3 hover:bg-red-500/10 rounded-xl transition-colors"
      >
        <LogOut className="w-4 h-4" /> Déconnexion
      </button>
    </div>
  )
}
