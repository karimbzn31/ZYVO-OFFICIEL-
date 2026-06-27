import { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, ShieldCheck, MapPin, Star, Clock, DollarSign, Upload,
  ChevronRight, LogOut, Camera, CheckCircle, AlertCircle, Edit3, Save
} from 'lucide-react'
import { useAuth } from '../../../context/auth'
import { useLoading } from '../../../hooks/useLoading'
import { ProfileCardSkeleton } from '../../../components/dashboard/Skeleton'

export default function ProviderProfil() {
  const { provider } = useOutletContext()
  const { user, logout } = useAuth()
  const loading = useLoading(350)
  const [editing, setEditing] = useState(false)

  if (loading) {
    return <ProfileCardSkeleton />
  }

  if (!provider) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
        <p className="font-bold text-white">Profil introuvable</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-extrabold">Mon <span className="gradient-text-brand">profil</span></h1>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold"
        >
          {editing ? <Save className="w-3.5 h-3.5 text-zyvo-gold" /> : <Edit3 className="w-3.5 h-3.5 text-zyvo-muted" />}
          {editing ? 'Enregistrer' : 'Modifier'}
        </button>
      </div>

      {/* Cover + Avatar */}
      <div className="glass-premium rounded-2xl overflow-hidden">
        <div className={"h-20 sm:h-28 bg-gradient-to-r ".concat(provider.coverGradient)} />
        <div className="p-4">
          <div className="flex items-end -mt-10 sm:-mt-14 mb-4">
            <div className={"w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ".concat(provider.coverGradient, " flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg border-4 border-zyvo-dark shrink-0")}>
              {provider.name.charAt(0)}
            </div>
            <div className="ml-3 pb-1">
              <h2 className="text-lg sm:text-xl font-extrabold text-white">{provider.name}</h2>
              <p className="text-xs sm:text-sm text-zyvo-muted">{provider.service} · {provider.city}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { icon: Star, value: provider.rating, label: 'Note', color: 'text-amber-400' },
              { icon: Clock, value: provider.missions, label: 'Missions', color: 'text-blue-400' },
              { icon: ShieldCheck, value: provider.response_rate, label: 'Réponse', color: 'text-emerald-400' },
              { icon: DollarSign, value: provider.price, label: 'Tarif', color: 'text-zyvo-gold' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} strokeWidth={1.5} />
                <p className={`text-xs font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[9px] text-zyvo-muted">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-xs text-zyvo-muted">{provider.description}</p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {provider.badges.map(b => (
              <span key={b} className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {b}
              </span>
            ))}
          </div>

          {/* Verified documents */}
          {provider.verified_documents && (
            <div className="border-t border-white/5 pt-3">
              <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider mb-2">Documents vérifiés</p>
              <div className="flex flex-wrap gap-2">
                {provider.verified_documents.map(doc => (
                  <span key={doc} className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {doc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account info */}
      <div className="glass-premium rounded-2xl p-4">
        <h3 className="font-bold text-sm text-white mb-3">Informations du compte</h3>
        <div className="space-y-3">
          {[
            { label: 'Nom', value: user?.name },
            { label: 'Email', value: user?.email || 'Non renseigné' },
            { label: 'Téléphone', value: user?.phone || 'Non renseigné' },
            { label: 'Ville', value: provider.city },
          ].map(info => (
            <div key={info.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <span className="text-xs text-zyvo-muted">{info.label}</span>
              <span className="text-xs font-semibold text-white">{info.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Link
          to="/dashboard/client"
          className="flex items-center justify-between w-full glass-premium rounded-2xl p-4 card-hover"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
              <User className="w-4 h-4 text-zyvo-gold" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-white">Mode client</p>
              <p className="text-[10px] text-zyvo-muted">Voir le dashboard client</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-zyvo-muted" />
        </Link>
        <button
          onClick={() => { logout() }}
          className="flex items-center justify-between w-full glass-premium rounded-2xl p-4 card-hover"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-white">Déconnexion</p>
              <p className="text-[10px] text-zyvo-muted">Se déconnecter de Zyvo</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </button>
      </div>

      <div className="h-2" />
    </div>
  )
}
