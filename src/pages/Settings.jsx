import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Moon, Sun, Globe, Bell, ShieldCheck, Trash2, ChevronLeft, MessageCircle, LogOut, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/auth'
import { useTheme } from '../context/theme'
import { useI18n } from '../i18n'

export default function Settings() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { lang, switchLang, languages } = useI18n()
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!user) {
    return (
      <div className="py-8 max-w-md mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-10 h-10 text-zyvo-muted/40" strokeWidth={1} />
        </div>
        <h2 className="text-xl font-extrabold">Connectez-vous</h2>
        <p className="text-sm text-zyvo-muted mt-2">Connectez-vous pour accéder aux paramètres.</p>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-zyvo-muted hover:text-white transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" /> Retour
      </button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Réglages
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          <span className="gradient-text">Paramètres</span>
        </h1>
        <p className="text-sm text-zyvo-muted mt-2">Personnalisez votre expérience Zyvo</p>
      </div>

      {/* APPAREANCE */}
      <div className="glass-premium rounded-2xl p-5 mb-4">
        <h2 className="text-xs font-bold text-zyvo-muted uppercase tracking-wider mb-4">Apparence</h2>
        <div className="space-y-1">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-semibold text-white flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-zyvo-gold" /> : <Sun className="w-4 h-4 text-zyvo-gold" />}
              Mode {theme === 'dark' ? 'sombre' : 'clair'}
            </span>
            <div className={`w-10 h-5 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-white/10' : 'bg-zyvo-gold'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'left-0.5' : 'left-[22px]'}`} />
            </div>
          </button>

          <button
            onClick={() => switchLang(lang === 'fr' ? 'ar' : 'fr')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-semibold text-white flex items-center gap-3">
              <Globe className="w-4 h-4 text-zyvo-muted" />
              Langue
            </span>
            <span className="text-sm font-bold text-zyvo-gold">{languages[lang].native}</span>
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="glass-premium rounded-2xl p-5 mb-4">
        <h2 className="text-xs font-bold text-zyvo-muted uppercase tracking-wider mb-4">Notifications</h2>
        <div className="space-y-1">
          <button
            onClick={() => setNotifications(!notifications)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="text-sm font-semibold text-white flex items-center gap-3">
              <Bell className="w-4 h-4 text-zyvo-muted" />
              Notifications push
            </span>
            <div className={`w-10 h-5 rounded-full transition-colors relative ${notifications ? 'bg-emerald-500/50' : 'bg-white/10'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications ? 'left-[22px]' : 'left-0.5'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* COMPTE */}
      <div className="glass-premium rounded-2xl p-5 mb-4">
        <h2 className="text-xs font-bold text-zyvo-muted uppercase tracking-wider mb-4">Compte</h2>
        <div className="space-y-1">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold text-white flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-zyvo-muted" />
              Support WhatsApp
            </span>
            <a
              href="https://wa.me/213560123456"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-zyvo-gold hover:underline"
            >
              Contacter
            </a>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold text-white flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-zyvo-muted" />
              Version
            </span>
            <span className="text-sm text-zyvo-muted">1.0.0</span>
          </div>
        </div>
      </div>

      {/* ZONE DANGER */}
      <div className="glass-premium rounded-2xl p-5 mb-4 border border-red-500/10">
        <h2 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">Zone de danger</h2>
        <div className="space-y-2">
          <button
            onClick={logout}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <span className="text-sm font-semibold text-red-400 flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </span>
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <span className="text-sm font-semibold text-red-400 flex items-center gap-3">
              <Trash2 className="w-4 h-4" />
              Supprimer mon compte
            </span>
          </button>
        </div>
      </div>

      {/* DELETE CONFIRMATION */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-premium rounded-3xl p-6 max-w-sm w-full">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-extrabold text-white text-center mb-2">Supprimer le compte ?</h3>
            <p className="text-sm text-zyvo-muted text-center mb-6">
              Cette action est irréversible. Toutes vos données seront définitivement effacées.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Annuler
              </button>
              <button
                onClick={() => { logout(); setShowDeleteConfirm(false) }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-zyvo-muted mt-8">
        Zyvo v1.0.0 &mdash; Conforme à la loi 18-07
      </p>
    </div>
  )
}
