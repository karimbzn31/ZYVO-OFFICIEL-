import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, Mail, Phone, MapPin, ShieldCheck, LogOut, 
  ChevronRight, Bell, CreditCard, Globe,
  HelpCircle, FileText, Camera
} from 'lucide-react'
import { useAuth } from '../../context/auth'

const settingsItems = [
  { icon: Bell, label: 'Notifications', desc: 'Gérer vos alertes' },
  { icon: CreditCard, label: 'Moyens de paiement', desc: 'Ajouter une carte' },
  { icon: Globe, label: 'Langue', desc: 'Français' },
  { icon: FileText, label: 'CGU & confidentialité', desc: 'Lire les conditions' },
  { icon: HelpCircle, label: 'Aide & support', desc: 'Centre d\'aide' },
]

export default function Profil() {
  const { user, logout } = useAuth()

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-extrabold">Mon <span className="gradient-text-brand">profil</span></h1>

      {/* Profile Card */}
      <div className="glass-premium rounded-2xl p-4 sm:p-6 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-brand flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg mx-auto mb-3 sm:mb-4 relative">
          {user?.name?.charAt(0) || 'U'}
          <button className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zyvo-gold text-zyvo-dark flex items-center justify-center shadow-lg hover:bg-zyvo-gold/80 transition-all">
            <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2} />
          </button>
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-white">{user?.name || 'Utilisateur'}</h2>
        <p className="text-xs sm:text-sm text-zyvo-muted">Client Zyvo</p>

        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-400">
            <ShieldCheck className="w-3 h-3" /> Compte vérifié
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="glass-premium rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-zyvo-muted">Email</p>
            <p className="text-xs sm:text-sm font-semibold text-white">{user?.email || 'Non renseigné'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-zyvo-muted">Téléphone</p>
            <p className="text-xs sm:text-sm font-semibold text-white">{user?.phone || '+213 555 XX XX XX'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs text-zyvo-muted">Ville</p>
            <p className="text-xs sm:text-sm font-semibold text-white">{user?.city || 'Non renseignée'}</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="glass-premium rounded-2xl divide-y divide-white/5 overflow-hidden">
        {settingsItems.map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left hover:bg-white/5 transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-zyvo-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-white">{item.label}</p>
              <p className="text-[10px] sm:text-xs text-zyvo-muted">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-zyvo-muted shrink-0" />
          </button>
        ))}
      </div>

      {/* Referral */}
      <Link to="/refer" className="glass-premium rounded-2xl p-4 sm:p-5 card-hover flex items-center gap-3 sm:gap-4 block">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-zyvo-gold/20 to-zyvo-gold/5 flex items-center justify-center shrink-0">
          <span className="text-lg sm:text-xl font-extrabold text-zyvo-gold">💰</span>
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm sm:text-base text-white">Parrainer un ami</p>
          <p className="text-[10px] sm:text-xs text-zyvo-muted">Gagnez 500 DA par filleul</p>
        </div>
        <ChevronRight className="w-4 h-4 text-zyvo-gold shrink-0" />
      </Link>

      {/* Logout */}
      <button
        onClick={() => { logout(); window.location.href = '/' }}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-4 rounded-2xl bg-red-500/10 text-red-400 font-bold text-xs sm:text-sm hover:bg-red-500/20 transition-all"
      >
        <LogOut className="w-4 h-4" />
        Déconnexion
      </button>
    </div>
  )
}
