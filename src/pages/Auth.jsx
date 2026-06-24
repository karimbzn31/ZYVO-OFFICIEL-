import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, User, ArrowRight, ShieldCheck, Sparkles, ChevronLeft, Check, Briefcase } from 'lucide-react'
import { useAuth } from '../context/auth'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('client')
  const [step, setStep] = useState(1)
  const [code, setCode] = useState(['', '', '', ''])
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    }
  }

  const handleVerify = () => {
    login(phone, name, role)
    navigate(role === 'prestataire' ? '/provider/dashboard' : '/profile')
  }

  const handleCodeChange = (i, value) => {
    const newCode = [...code]
    newCode[i] = value
    setCode(newCode)
    if (value && i < 3) {
      const next = document.getElementById(`code-${i + 1}`)
      if (next) next.focus()
    }
  }

  return (
    <div className="py-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-2xl font-bold text-white shadow-lg mx-auto mb-4">
          <Sparkles className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold">
          {step === 2 ? 'Vérification' : mode === 'register' ? 'Créer un compte' : 'Connexion'}
        </h1>
        <p className="text-sm text-zyvo-muted mt-1">
          {step === 2
            ? `Un code SMS a été envoyé au +213 ${phone}`
            : mode === 'register'
              ? 'Rejoignez la communauté Zyvo'
              : 'Retrouvez votre compte Zyvo'}
        </p>
      </div>

      {step === 1 && (
        <div className="flex glass-premium rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode('login'); setStep(1) }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'login' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted'
            }`}
          >
            Se connecter
          </button>
          <button
            onClick={() => { setMode('register'); setStep(1) }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'register' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted'
            }`}
          >
            S'inscrire
          </button>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ROLE SELECTION — only on register */}
          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-2 block">Je suis</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${
                    role === 'client'
                      ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white'
                      : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4" /> Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole('prestataire')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${
                    role === 'prestataire'
                      ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white'
                      : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" /> Prestataire
                </button>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Nom complet</label>
              <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/30 focus-within:bg-white/[0.06] transition-all border border-transparent">
                <User className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-zyvo-muted text-white"
                  required
                />
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Numéro de téléphone</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/30 focus-within:bg-white/[0.06] transition-all border border-transparent">
              <Phone className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
              <span className="text-sm font-bold text-zyvo-muted">+213</span>
              <input
                type="tel"
                placeholder="5XX XX XX XX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm font-semibold placeholder:text-zyvo-muted text-white"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full gradient-brand text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 glow-worm"
          >
            {mode === 'register' ? 'Créer mon compte' : 'Se connecter'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
          </div>
          <p className="text-sm text-zyvo-muted mb-6">
            Code de vérification envoyé au <strong className="text-white">+213 {phone}</strong>
          </p>
          <div className="flex gap-3 justify-center">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(i, e.target.value.replace(/\D/g, ''))}
                className="w-12 h-14 text-center text-lg font-bold glass-premium rounded-xl outline-none focus:border-zyvo-gold/50 focus:bg-white/10 text-white transition-all border border-transparent"
              />
            ))}
          </div>
          <button
            onClick={handleVerify}
            className="w-full gradient-brand text-white font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 mt-6 flex items-center justify-center gap-2 glow-worm"
          >
            <Check className="w-4 h-4" /> Vérifier mon compte
          </button>
          <p className="text-xs text-zyvo-muted mt-4">
            Vous n'avez pas reçu le code ?{' '}
            <button type="button" className="text-zyvo-gold font-bold hover:underline">Renvoyer</button>
          </p>
          <button
            onClick={() => setStep(1)}
            className="flex items-center justify-center gap-1 text-xs text-zyvo-muted hover:text-white transition-colors mt-4 mx-auto"
          >
            <ChevronLeft className="w-3 h-3" /> Modifier le numéro
          </button>
        </div>
      )}

      <p className="text-center text-xs text-zyvo-muted mt-6">
        En continuant, vous acceptez les{' '}
        <a href="#" className="text-zyvo-gold font-bold hover:underline">Conditions d'utilisation</a>
      </p>
    </div>
  )
}
