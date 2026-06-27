import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, MapPin, Mail, ChevronLeft, Sparkles, ArrowRight, ChevronDown } from 'lucide-react'
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
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [loginPhone, setLoginPhone] = useState('')
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !city) return
    register({ name: name.trim(), phone, email, city })
    navigate('/dashboard/client')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!loginPhone.trim()) return
    login(loginPhone, 'Utilisateur')
    navigate('/dashboard/client')
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
            ? 'Connectez-vous à votre compte Zyvo'
            : 'Rejoignez le marché Zyvo'}
        </p>
      </div>

      {mode === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Numéro de téléphone</label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <Phone className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="tel"
                placeholder="05 55 XX XX XX"
                value={loginPhone}
                onChange={e => setLoginPhone(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 glow-worm flex items-center justify-center gap-2">
            Se connecter <ArrowRight className="w-4 h-4" />
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

          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Email <span className="font-normal text-zyvo-muted/60">(facultatif)</span></label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
              <Mail className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="email"
                placeholder="exemple@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
              />
            </div>
          </div>

          <button type="submit" className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 glow-worm flex items-center justify-center gap-2">
            S'inscrire <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="text-center mt-6">
        <p className="text-sm text-zyvo-muted">
          {mode === 'login' ? (
            <>Pas encore de compte ?{' '}
              <button type="button" onClick={() => setMode('register')} className="text-zyvo-gold font-bold hover:underline">
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
