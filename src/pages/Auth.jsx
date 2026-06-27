import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, MapPin, Mail, ChevronLeft, Sparkles, ArrowRight, ChevronDown, ShieldCheck, RefreshCw, Briefcase } from 'lucide-react'
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
  const [mode, setMode] = useState('register')
  const [selectedRole, setSelectedRole] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [loginName, setLoginName] = useState('')
  const [loginPhone, setLoginPhone] = useState('')
  const [loginStep, setLoginStep] = useState('form')
  const [loginCode, setLoginCode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const { login, register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const getRedirect = () => selectedRole === 'prestataire' ? '/dashboard/prestataire' : '/dashboard/client'

  const handleRegister = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    if (selectedRole !== 'prestataire' && !city) return
    register({ name: name.trim(), phone, email, city: city || '', role: selectedRole || 'client' })
    navigate(getRedirect())
  }

  const handleSendCode = (e) => {
    e.preventDefault()
    if (!loginName.trim() || !loginPhone.trim()) return
    const code = String(Math.floor(100000 + Math.random() * 900000))
    setSentCode(code)
    setLoginStep('code')
    addToast('Code envoyé', {
      message: `Un code à 6 chiffres a été envoyé au ${loginPhone}`,
      type: 'success'
    })
  }

  const handleVerifyCode = (e) => {
    e.preventDefault()
    if (loginCode !== sentCode) {
      setCodeError('Code incorrect. Vérifiez le code reçu.')
      return
    }
    login(loginPhone, loginName.trim(), selectedRole || 'client')
    navigate(getRedirect())
  }

  const codeInputs = useRef([])

  const handleCodeChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const code = loginCode.split('')
    code[i] = val
    const joined = code.join('').slice(0, 6)
    setLoginCode(joined)
    if (val && i < 5) codeInputs.current[i + 1]?.focus()
  }

  const handleCodeKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !loginCode[i] && i > 0) codeInputs.current[i - 1]?.focus()
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
            ? (loginStep === 'code' ? 'Entrez le code reçu par SMS' : `Connectez-vous en tant que ${selectedRole === 'prestataire' ? 'prestataire' : 'client'}`)
            : `Rejoignez Zyvo en tant que ${selectedRole === 'prestataire' ? 'prestataire' : 'client'}`}
        </p>
        <button
          type="button"
          onClick={() => { setSelectedRole(null); setLoginStep('form'); setLoginCode(''); setCodeError('') }}
          className="text-xs text-zyvo-muted hover:text-white transition-colors mt-2 flex items-center justify-center gap-1 mx-auto"
        >
          <ChevronLeft className="w-3 h-3" /> Changer de rôle
        </button>
      </div>

      {mode === 'login' ? (
        loginStep === 'code' ? (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-zyvo-muted mb-4">
                Code envoyé au <span className="font-bold text-white">{loginPhone}</span>
              </p>
              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <input
                    key={i}
                    ref={el => codeInputs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={loginCode[i] || ''}
                    onChange={e => handleCodeChange(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                    className="w-11 h-12 sm:w-12 sm:h-14 rounded-xl bg-white/10 border border-white/10 text-center text-lg font-extrabold text-white outline-none focus:border-zyvo-gold/60 focus:bg-white/[0.15] transition-all"
                  />
                ))}
              </div>
              {codeError && (
                <p className="text-xs text-red-400 mt-3">{codeError}</p>
              )}
              <button
                type="button"
                onClick={() => { setLoginStep('form'); setLoginCode(''); setCodeError('') }}
                className="text-xs text-zyvo-muted hover:text-white transition-colors mt-4 flex items-center justify-center gap-1 mx-auto"
              >
                <ChevronLeft className="w-3 h-3" /> Modifier le numéro
              </button>
            </div>

            <button
              type="submit"
              disabled={loginCode.length < 6}
              className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300 glow-worm flex items-center justify-center gap-2"
            >
              Se connecter <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-zyvo-muted">
              Code de test : <span className="font-mono font-bold text-zyvo-gold">{sentCode}</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Nom complet</label>
              <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
                <User className="w-4 h-4 text-zyvo-muted shrink-0" />
                <input
                  type="text"
                  placeholder="Votre nom et prénom"
                  value={loginName}
                  onChange={e => setLoginName(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                  required
                />
              </div>
            </div>
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
              Envoyer le code <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )
      ) : selectedRole === 'prestataire' ? (
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
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Numéro de téléphone</label>
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
          <p className="text-xs text-zyvo-muted/60 text-center">
            Vous pourrez compléter votre profil après l'inscription
          </p>
          <button type="submit" className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 glow-worm flex items-center justify-center gap-2">
            S'inscrire <ArrowRight className="w-4 h-4" />
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
              <button type="button" onClick={() => { setMode('register'); setLoginStep('form'); setLoginCode(''); setCodeError('') }} className="text-zyvo-gold font-bold hover:underline">
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
