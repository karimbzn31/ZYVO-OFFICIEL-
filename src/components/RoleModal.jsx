import { Link } from 'react-router-dom'
import { X, User, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react'

export default function RoleModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass-premium rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-zyvo-muted hover:text-white hover:bg-white/10 transition-all">
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-extrabold">Que voulez-vous faire ?</h2>
        </div>

        <div className="space-y-3">
          <Link
            to="/auth"
            onClick={onClose}
            className="flex items-center gap-4 w-full glass-premium-light rounded-2xl p-5 text-left group hover:bg-white/10 transition-all border border-transparent hover:border-zyvo-gold/20"
          >
            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0 shadow-lg">
              <User className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white text-base">Client</div>
              <div className="text-xs text-zyvo-muted mt-0.5">Je cherche un service près de chez moi</div>
            </div>
            <ArrowRight className="w-5 h-5 text-zyvo-muted group-hover:text-zyvo-gold transition-colors" />
          </Link>

          <Link
            to="/become-provider"
            onClick={onClose}
            className="flex items-center gap-4 w-full glass-premium-light rounded-2xl p-5 text-left group hover:bg-white/10 transition-all border border-transparent hover:border-zyvo-gold/20"
          >
            <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center shrink-0 shadow-lg">
              <Briefcase className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white text-base">Prestataire</div>
              <div className="text-xs text-zyvo-muted mt-0.5">Je propose mes services aux clients</div>
            </div>
            <ArrowRight className="w-5 h-5 text-zyvo-muted group-hover:text-zyvo-gold transition-colors" />
          </Link>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-[10px] text-zyvo-muted leading-relaxed text-center">
            En créant un compte ou en continuant à utiliser l'application Zyvo, vous reconnaissez et acceptez nos{' '}
            <Link to="/legal" onClick={onClose} className="text-zyvo-gold font-bold hover:underline">Conditions d'utilisation</Link>
            {' '}et notre{' '}
            <Link to="/privacy" onClick={onClose} className="text-zyvo-gold font-bold hover:underline">Politique de confidentialité</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
