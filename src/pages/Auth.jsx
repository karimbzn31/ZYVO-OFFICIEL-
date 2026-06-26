import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Sparkles } from 'lucide-react'
import { useAuth } from '../context/auth'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [emailError, setEmailError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateEmail = (v) => {
    if (!v) return ''
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Email invalide'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validateEmail(email)
    setEmailError(err)
    if (err) return
    login(email, email.split('@')[0], 'client')
    navigate('/profile')
  }

  return (
    <div className="py-8 max-w-sm mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
          <Sparkles className="w-7 h-7 text-white relative z-10" />
        </div>
        <h1 className="text-2xl font-extrabold">
          {mode === 'login' ? 'Connexion' : 'Créer un compte'}
        </h1>
        <p className="text-sm text-zyvo-muted mt-1">
          {mode === 'login'
            ? 'Connectez-vous avec vos identifiants'
            : 'Créez votre compte Zyvo'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Email</label>
          <div className={`flex items-center gap-2 glass-premium rounded-xl px-4 h-12 transition-all border ${emailError ? 'border-zyvo-error/50' : 'border-transparent focus-within:border-zyvo-gold/40'}`}>
            <Mail className="w-4 h-4 text-zyvo-muted shrink-0" />
            <input
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailError('') }}
              className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
              required
            />
          </div>
          {emailError && <p className="text-xs text-zyvo-error mt-1.5">{emailError}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Mot de passe</label>
          <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border border-transparent">
            <Lock className="w-4 h-4 text-zyvo-muted shrink-0" />
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Votre mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
              required
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-zyvo-muted hover:text-white transition-colors">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {mode === 'login' && (
            <button type="button" className="text-xs text-zyvo-gold font-bold hover:underline mt-1.5">
              Mot de passe oublié ?
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 glow-worm"
        >
          {mode === 'login' ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-zyvo-muted">
          {mode === 'login' ? (
            <>Vous n'avez pas de compte ?{' '}
              <button type="button" onClick={() => setMode('register')} className="text-zyvo-gold font-bold hover:underline">
                S'inscrire
              </button>
            </>
          ) : (
            <>Déjà un compte ?{' '}
              <button type="button" onClick={() => setMode('login')} className="text-zyvo-gold font-bold hover:underline">
                Se connecter
              </button>
            </>
          )}
        </p>
      </div>

      <p className="text-center text-xs text-zyvo-muted mt-6">
        En continuant, vous acceptez les{' '}
        <a href="#" className="text-zyvo-gold font-bold hover:underline">Conditions d'utilisation</a>
      </p>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center gap-1 text-xs text-zyvo-muted hover:text-white transition-colors mt-6 mx-auto"
      >
        <ChevronLeft className="w-3 h-3" /> Retour
      </button>
    </div>
  )
}
