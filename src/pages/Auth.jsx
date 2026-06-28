import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Phone, MapPin, Mail, ChevronLeft, Sparkles, ArrowRight, ChevronDown, Briefcase, AlertCircle, KeyRound } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useToast } from '../context/toast'
import { useAuth } from '../context/auth'

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
  const [mode, setMode] = useState('register')
  const [selectedRole, setSelectedRole] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [verifyMode, setVerifyMode] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const { addToast } = useToast()
  const navigate = useNavigate()
  const otpRef = useRef(null)

  useEffect(() => {
    if (selectedRole === 'prestataire') {
      setMode('login')
    } else if (selectedRole === 'client') {
      setMode('register')
    }
    setError('')
  }, [selectedRole])

  useEffect(() => {
    if (verifyMode && otpRef.current) otpRef.current.focus()
  }, [verifyMode])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(t)
  }, [countdown])

  const sendOtp = async (emailAddr) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: emailAddr,
      options: { shouldCreateUser: true },
    })
    if (error) throw error
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Veuillez remplir tous les champs')
      return
    }
    if (!city) {
      setError('Veuillez sélectionner votre ville')
      return
    }
    setSubmitting(true)
    try {
      await sendOtp(email.trim())
      setVerifyMode(true)
      setCountdown(60)
      setOtp('')
      setTimeout(() => otpRef.current?.focus(), 100)
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'envoi du code')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!loginEmail.trim()) {
      setError('Veuillez entrer votre email')
      return
    }
    setSubmitting(true)
    try {
      await sendOtp(loginEmail.trim())
      setVerifyMode(true)
      setEmail(loginEmail.trim())
      setCountdown(60)
      setOtp('')
      setTimeout(() => otpRef.current?.focus(), 100)
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'envoi du code')
    } finally {
      setSubmitting(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) {
      setError('Le code doit contenir 6 chiffres')
      return
    }
    setSubmitting(true)
    try {
      const targetEmail = mode === 'login' ? loginEmail.trim() : email.trim()
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: targetEmail,
        token: otp,
        type: 'email',
      })
      if (verifyError) throw verifyError

      // Check if user already has a profile
      if (data?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('id, role')
          .eq('id', data.user.id)
          .maybeSingle()

        if (profile) {
          addToast('Connecté', { message: 'Bon retour sur Zyvo !', type: 'success' })
          navigate('/dashboard/' + (profile.role === 'prestataire' ? 'prestataire' : 'client'))
          return
        }
      }

      // New user — create profile
      if (mode === 'register' && data?.user) {
        const role = selectedRole || 'client'
        const { error: uErr } = await supabase.from('users').insert({
          id: data.user.id,
          name: name.trim(),
          phone,
          email: targetEmail,
          city,
          role,
        }).select().single()
        if (uErr) throw uErr

        if (role === 'prestataire') {
          const { error: pErr } = await supabase.from('providers').insert({
            user_id: data.user.id,
            name: name.trim(),
            city,
            service: 'Mon service',
            category: '',
            cover_gradient: 'from-blue-600 via-blue-500 to-cyan-400',
          }).select().single()
          if (pErr) throw pErr
        }

        addToast('Compte créé avec succès', { message: 'Bienvenue sur Zyvo !', type: 'success' })
        navigate('/dashboard/' + (role === 'prestataire' ? 'prestataire' : 'client'))
      } else {
        setError('Impossible de trouver votre profil')
      }
    } catch (err) {
      setError(err.message || 'Code invalide ou expiré')
    } finally {
      setSubmitting(false)
    }
  }

  const resendOtp = async () => {
    setError('')
    setSubmitting(true)
    try {
      const targetEmail = mode === 'login' ? loginEmail.trim() : email.trim()
      await sendOtp(targetEmail)
      setCountdown(60)
      addToast('Nouveau code envoyé', { message: 'Vérifie ta boîte email', type: 'success' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (verifyMode) {
    return (
      <div className="py-8 max-w-sm mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-xl font-extrabold mb-1">Code de validation</h1>
          <p className="text-sm text-zyvo-muted">
            Un code à 6 chiffres a été envoyé à<br />
            <strong className="text-white">{mode === 'login' ? loginEmail : email}</strong>
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-xs text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-2 block text-center">Code de vérification</label>
            <input
              ref={otpRef}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="0 0 0 0 0 0"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-white outline-none focus:border-zyvo-gold/40 transition-colors"
              autoComplete="one-time-code"
            />
            <p className="text-[10px] text-zyvo-muted text-center mt-2">Entre le code reçu par email</p>
          </div>

          <button
            type="submit"
            disabled={submitting || otp.length !== 6}
            className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {submitting ? 'Vérification...' : 'Valider'} <KeyRound className="w-4 h-4" />
          </button>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-xs text-zyvo-muted">
                Renvoyer un code dans <span className="text-white font-bold">{countdown}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={resendOtp}
                disabled={submitting}
                className="text-xs text-zyvo-gold font-bold hover:underline"
              >
                Renvoyer le code
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => { setVerifyMode(false); setOtp(''); setError('') }}
            className="flex items-center justify-center gap-1 text-xs text-zyvo-muted hover:text-white transition-colors mx-auto"
          >
            <ChevronLeft className="w-3 h-3" /> Changer d'email
          </button>
        </form>
      </div>
    )
  }

  if (!selectedRole) {
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
            onClick={() => setSelectedRole('client')}
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
            onClick={() => setSelectedRole('prestataire')}
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
          onClick={() => { setSelectedRole(null); setError('') }}
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
          <button
            type="submit"
            disabled={submitting}
            className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition-all duration-300 glow-worm flex items-center justify-center gap-2"
          >
            {submitting ? 'Envoi...' : 'Envoyer le code'} <Mail className="w-4 h-4" />
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
            {submitting ? 'Envoi...' : "S'inscrire"} <ArrowRight className="w-4 h-4" />
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