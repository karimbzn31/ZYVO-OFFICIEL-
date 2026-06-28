import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Phone, MapPin, Mail, ChevronLeft, Sparkles, ArrowRight, ChevronDown, Briefcase, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/auth'
import { useToast } from '../context/toast'

const algerianCities = [
  'Alger', 'Oran', 'Constantine', 'Blida', 'Annaba', 'Tizi Ouzou',
  'Sétif', 'Batna', 'Djelfa', 'Sidi Bel Abbès', 'Biskra', 'Tlemcen',
  'Béjaïa', 'Bordj Bou Arreridj', 'Chlef', 'Médéa', 'Mostaganem', 'Ain Oulmene'
]

function CitySelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-transparent outline-none text-sm font-semibold"
      >
        <span className={value ? 'text-white' : 'text-zyvo-muted'}>
          {value || 'Sélectionnez votre ville'}
        </span>
        <ChevronDown className={`w-4 h-4 text-zyvo-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 glass-premium rounded-xl border border-white/10 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
          {algerianCities.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => { onChange(c); setOpen(false) }}
              className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 ${
                value === c ? 'text-zyvo-gold bg-zyvo-gold/10' : 'text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Auth() {
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState('register')
  const [selectedRole, setSelectedRole] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { login, register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  function pickRole(role) {
    setSelectedRole(role)
    if (role === 'prestataire') setMode('login')
    else setMode('register')
    setError('')
    setStep(1)
  }

  function backToRoles() {
    setSelectedRole(null)
    setStep(0)
    setError('')
  }

  const getRedirect = () => selectedRole === 'prestataire' ? '/dashboard/prestataire' : '/dashboard/client'

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }
    if (selectedRole !== 'prestataire' && !city) {
      setError('Veuillez sélectionner votre ville')
      return
    }
    setSubmitting(true)
    try {
      await register({ name: name.trim(), phone, email: email.trim(), city: city || '', role: selectedRole || 'client', password })
      addToast('Compte créé avec succès', { message: 'Bienvenue sur Zyvo !', type: 'success' })
      navigate(getRedirect())
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError('Veuillez remplir votre email et mot de passe')
      return
    }
    setSubmitting(true)
    try {
      await login(loginEmail.trim(), loginPassword.trim(), selectedRole || 'client')
      addToast('Connexion réussie', { message: 'Bon retour sur Zyvo !', type: 'success' })
      navigate(getRedirect())
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 0) {
    return (
      <div className="py-8 max-w-sm mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold">Bienvenue sur Zyvo</h1>
          <p className="text-sm text-zyvo-muted mt-1">Choisissez comment vous souhaitez utiliser Zyvo</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => pickRole('client')}
            className="flex items-center gap-4 w-full glass-premium rounded-2xl p-5 text-left group hover:bg-white/10 transition-all border border-transparent hover:border-zyvo-gold/20 card-hover"
          >
            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0 shadow-lg">
              <User className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white text-base">Client</div>
              <div className="text-xs text-zyvo-muted mt-0.5">Je cherche un service près de chez moi</div>
            </div>
            <ArrowRight className="w-5 h-5 text-zyvo-muted group-hover:text-zyvo-gold transition-colors" />
          </button>

          <button
            onClick={() => pickRole('prestataire')}
            className="flex items-center gap-4 w-full glass-premium rounded-2xl p-5 text-left group hover:bg-white/10 transition-all border border-transparent hover:border-zyvo-gold/20 card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
              <Briefcase className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white text-base">Prestataire</div>
              <div className="text-xs text-zyvo-muted mt-0.5">Je propose mes services aux clients</div>
            </div>
            <ArrowRight className="w-5 h-5 text-zyvo-muted group-hover:text-zyvo-gold transition-colors" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-sm mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
          <Sparkles className="w-7 h-7 text-white relative z-10" />
        </div>
        <h1 className="text-2xl font-extrabold">
          {mode === 'login' ? 'Bon retour' : 'Créer un compte'}
        </h1>
        <p className="text-sm text-zyvo-muted mt-1">
          {mode === 'login'
            ? `Connectez-vous en tant que ${selectedRole === 'prestataire' ? 'prestataire' : 'client'}`
            : `Rejoignez Zyvo en tant que ${selectedRole === 'prestataire' ? 'prestataire' : 'client'}`}
        </p>
        <button
          type="button"
          onClick={backToRoles}
          className="text-xs text-zyvo-muted hover:text-white transition-colors mt-2 flex items-center justify-center gap-1 mx-auto"
        >
          <ChevronLeft className="w-3 h-3" /> Changer de rôle
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}

      {mode === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Email</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <Mail className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="email"
                placeholder="exemple@email.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                required
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Mot de passe</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <Lock className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-zyvo-muted hover:text-white transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition-all duration-300 glow-worm flex items-center justify-center gap-2"
          >
            {submitting ? 'Connexion...' : 'Se connecter'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Nom complet</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <User className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="text"
                placeholder="Votre nom et prénom"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                required
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Email</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <Mail className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Mot de passe</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <Lock className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                required
                minLength={6}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-zyvo-muted hover:text-white transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Téléphone</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <Phone className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="tel"
                placeholder="05 55 XX XX XX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Ville</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <MapPin className="w-4 h-4 text-zyvo-muted shrink-0" />
              <CitySelect value={city} onChange={setCity} />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition-all duration-300 glow-worm flex items-center justify-center gap-2"
          >
            {submitting ? 'Inscription...' : 'S\'inscrire'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="text-center mt-6">
        <p className="text-sm text-zyvo-muted">
          {selectedRole === 'prestataire' ? (
            <>Pas encore de compte prestataire ?{' '}
              <Link to="/become-provider" className="text-zyvo-gold font-bold hover:underline">
                Créer un compte
              </Link>
            </>
          ) : mode === 'login' ? (
            <>Pas encore de compte ?{' '}
              <button type="button" onClick={() => { setMode('register'); setError('') }} className="text-zyvo-gold font-bold hover:underline">
                Créer un compte
              </button>
            </>
          ) : (
            <>Déjà inscrit ?{' '}
              <button type="button" onClick={() => setMode('login')} className="text-zyvo-gold font-bold hover:underline">
                Se connecter
              </button>
            </>
          )}
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center gap-1 text-xs text-zyvo-muted hover:text-white transition-colors mt-6 mx-auto"
      >
        <ChevronLeft className="w-3 h-3" /> Retour
      </button>
    </div>
  )
}
