import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, TrendingUp, Users, Star, Zap, DollarSign, CheckCircle, ArrowRight, Award, Smartphone, Clock, ChevronLeft, Upload, Camera, MapPin, Briefcase, Scissors, Wrench, Home, Monitor, GraduationCap, Truck, Palette, Dumbbell, Camera as CameraIcon, ChevronDown, X } from 'lucide-react'

const benefits = [
  { icon: TrendingUp, title: 'Développez votre activité', desc: 'Rejoignez des milliers de clients actifs chaque jour sur Zyvo. Augmentez votre chiffre d\'affaires sans effort.' },
  { icon: ShieldCheck, title: 'Vérification manuelle', desc: 'Notre équipe vérifie votre identité et vos références. Vos clients vous font confiance dès le premier clic.' },
  { icon: Star, title: 'Visibilité maximale', desc: 'Apparaissez dans les premières recherches. Les prestataires les mieux notés gagnent jusqu\'à 3x plus de missions.' },
  { icon: Zap, title: 'Gestion simplifiée', desc: 'Gérez votre agenda, vos réservations et vos messages depuis un tableau de bord intuitif.' },
  { icon: DollarSign, title: 'Commission juste', desc: 'Seulement 10% de commission par mission. Pas d\'abonnement, pas de frais cachés. Vous gardez le contrôle.' },
  { icon: Smartphone, title: 'Application mobile', desc: 'Recevez les demandes en temps réel, même quand vous êtes en déplacement. Ne ratez jamais une opportunité.' },
]

const steps = [
  { num: 1, title: 'Profil', subtitle: 'Informations personnelles' },
  { num: 2, title: 'Services', subtitle: 'Ce que vous proposez' },
  { num: 3, title: 'Disponibilités', subtitle: 'Vos créneaux' },
  { num: 4, title: 'Vérification', subtitle: 'Pièce d\'identité' },
  { num: 5, title: 'Confirmation', subtitle: 'Récapitulatif' },
]

const serviceOptions = [
  { value: 'plomberie', label: 'Plomberie & Dépannage', icon: Wrench },
  { value: 'menage', label: 'Ménage & Nettoyage', icon: Home },
  { value: 'numerique', label: 'Services Numériques', icon: Monitor },
  { value: 'cours', label: 'Cours & Formations', icon: GraduationCap },
  { value: 'coiffure', label: 'Coiffure & Beauté', icon: Scissors },
  { value: 'demenagement', label: 'Déménagement', icon: Truck },
  { value: 'bricolage', label: 'Bricolage & Jardinage', icon: Palette },
  { value: 'sport', label: 'Sport & Bien-être', icon: Dumbbell },
]

const dayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const timeOptions = ['Matin (8h-12h)', 'Après-midi (14h-18h)', 'Soirée (18h-21h)']

const cities = ['Alger', 'Oran', 'Constantine', 'Blida', 'Sétif', 'Annaba', 'Tizi Ouzou', 'Batna', 'Djelfa', 'Sidi Bel Abbès', 'Biskra', 'Tlemcen', 'Béjaïa', 'Tiaret', 'Bouira']

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, i) => {
        const stepNum = i + 1
        const isActive = current === stepNum
        const isDone = current > stepNum
        return (
          <div key={s.num} className="flex items-center gap-1 sm:gap-2">
            <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${
              isDone ? 'bg-emerald-500/20 text-emerald-400' :
              isActive ? 'gradient-brand text-white shadow-lg' :
              'bg-white/5 text-zyvo-muted'
            }`}>
              {isDone ? <CheckCircle className="w-2.5 sm:w-3 h-2.5 sm:h-3" /> : <span>{s.num}</span>}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-3 sm:w-6 lg:w-10 rounded-full transition-all ${
                isDone ? 'bg-emerald-500/40' : 'bg-white/5'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ProgressBar({ current }) {
  const pct = ((current - 1) / (steps.length - 1)) * 100
  return (
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8">
      <div className="h-full gradient-brand rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
    </div>
  )
}

function StepContent({ step, form, setForm, errors }) {
  switch (step) {
    case 1: return <StepProfil form={form} setForm={setForm} errors={errors} />
    case 2: return <StepServices form={form} setForm={setForm} errors={errors} />
    case 3: return <StepDispo form={form} setForm={setForm} errors={errors} />
    case 4: return <StepVerification form={form} setForm={setForm} errors={errors} />
    case 5: return <StepConfirmation form={form} />
    default: return null
  }
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-xs font-bold text-zyvo-muted block mb-1.5">{label}</label>
      {children}
      {error && <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1"><X className="w-3 h-3" />{error}</p>}
    </div>
  )
}

function StepProfil({ form, setForm, errors }) {
  const update = (field, val) => setForm(prev => ({ ...prev, [field]: val }))

  return (
    <div className="space-y-5 stagger-fade">
      <div className="text-center mb-2">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-extrabold">Qui êtes-vous ?</h3>
        <p className="text-sm text-zyvo-muted mt-1">Ces informations seront visibles sur votre profil public.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Prénom *" error={errors.prenom}>
          <input type="text" value={form.prenom} onChange={e => update('prenom', e.target.value)}
            placeholder="Votre prénom"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-zyvo-gold/40 transition-colors" />
        </Field>
        <Field label="Nom *" error={errors.nom}>
          <input type="text" value={form.nom} onChange={e => update('nom', e.target.value)}
            placeholder="Votre nom"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-zyvo-gold/40 transition-colors" />
        </Field>
      </div>

      <Field label="Numéro de téléphone *" error={errors.phone}>
        <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
          placeholder="05XX XX XX XX"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-zyvo-gold/40 transition-colors" />
      </Field>

      <Field label="Email">
        <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
          placeholder="email@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-zyvo-gold/40 transition-colors" />
      </Field>

      <Field label="Ville *" error={errors.city}>
        <div className="relative">
          <select value={form.city} onChange={e => update('city', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer">
            <option value="" className="bg-zyvo-surface">Sélectionnez votre ville</option>
            {cities.map(c => <option key={c} value={c} className="bg-zyvo-surface">{c}</option>)}
          </select>
          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zyvo-muted pointer-events-none" />
        </div>
      </Field>

      <Field label="Bio (optionnelle)">
        <textarea value={form.bio} onChange={e => update('bio', e.target.value)}
          placeholder="Décrivez votre expérience et vos compétences en quelques lignes..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-zyvo-gold/40 transition-colors resize-none" />
      </Field>
    </div>
  )
}

function StepServices({ form, setForm, errors }) {
  const update = (field, val) => setForm(prev => ({ ...prev, [field]: val }))
  const toggleService = (val) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(val)
        ? prev.services.filter(s => s !== val)
        : [...prev.services, val],
    }))
  }

  return (
    <div className="space-y-5 stagger-fade">
      <div className="text-center mb-2">
        <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-extrabold">Que proposez-vous ?</h3>
        <p className="text-sm text-zyvo-muted mt-1">Sélectionnez un ou plusieurs services.</p>
      </div>

      <Field label="Services proposés *" error={errors.services}>
        <div className="grid sm:grid-cols-2 gap-2">
          {serviceOptions.map(s => {
            const selected = form.services.includes(s.value)
            return (
              <button key={s.value} type="button" onClick={() => toggleService(s.value)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  selected
                    ? 'bg-zyvo-gold/10 border-zyvo-gold/30'
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selected ? 'gradient-brand' : 'bg-white/5'
                }`}>
                  <s.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">{s.label}</span>
                {selected && <CheckCircle className="w-4 h-4 text-zyvo-gold ml-auto shrink-0" />}
              </button>
            )
          })}
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Tarif horaire * (DA)" error={errors.tarif}>
          <input type="number" value={form.tarif} onChange={e => update('tarif', e.target.value)}
            placeholder="2000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-zyvo-gold/40 transition-colors" />
        </Field>
        <Field label="Années d'expérience">
          <input type="number" value={form.experience} onChange={e => update('experience', e.target.value)}
            placeholder="5"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-zyvo-gold/40 transition-colors" />
        </Field>
      </div>
    </div>
  )
}

function StepDispo({ form, setForm, errors }) {
  const toggleDay = (day) => {
    setForm(prev => ({
      ...prev,
      dispoDays: prev.dispoDays.includes(day)
        ? prev.dispoDays.filter(d => d !== day)
        : [...prev.dispoDays, day],
    }))
  }
  const toggleTime = (t) => {
    setForm(prev => ({
      ...prev,
      dispoTimes: prev.dispoTimes.includes(t)
        ? prev.dispoTimes.filter(d => d !== t)
        : [...prev.dispoTimes, t],
    }))
  }

  return (
    <div className="space-y-5 stagger-fade">
      <div className="text-center mb-2">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
          <Clock className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-extrabold">Vos disponibilités</h3>
        <p className="text-sm text-zyvo-muted mt-1">Indiquez quand vous êtes disponible pour travailler.</p>
      </div>

      <Field label="Jours disponibles *" error={errors.dispoDays}>
        <div className="flex flex-wrap gap-2">
          {dayLabels.map(d => {
            const selected = form.dispoDays.includes(d)
            return (
              <button key={d} type="button" onClick={() => toggleDay(d)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  selected
                    ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white'
                    : 'bg-white/5 border-white/5 text-zyvo-muted hover:text-white hover:border-white/20'
                }`}>
                {d}
              </button>
            )
          })}
        </div>
      </Field>

      <Field label="Créneaux horaires *" error={errors.dispoTimes}>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map(t => {
            const selected = form.dispoTimes.includes(t)
            return (
              <button key={t} type="button" onClick={() => toggleTime(t)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  selected
                    ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white'
                    : 'bg-white/5 border-white/5 text-zyvo-muted hover:text-white hover:border-white/20'
                }`}>
                <Clock className="w-3.5 h-3.5" /> {t}
              </button>
            )
          })}
        </div>
      </Field>
    </div>
  )
}

function StepVerification({ form, setForm, errors }) {
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(prev => ({ ...prev, idFile: file, idFileName: file.name }))
    }
  }

  return (
    <div className="space-y-5 stagger-fade">
      <div className="text-center mb-2">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-extrabold">Vérification d'identité</h3>
        <p className="text-sm text-zyvo-muted mt-1">Pour garantir la confiance, nous vérifions l'identité de chaque prestataire.</p>
      </div>

      <div className="glass-premium-light rounded-2xl p-6 text-center border border-dashed border-white/10">
        <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handleFile} className="hidden" />
        {form.idFileName ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-white">{form.idFileName}</p>
            <button type="button" onClick={() => fileRef.current?.click()}
              className="text-xs text-zyvo-gold hover:underline font-semibold">
              Changer de fichier
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-zyvo-muted" />
            </div>
            <div>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="gradient-brand text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg hover:scale-105 transition-all glow-worm inline-flex items-center gap-2">
                <Camera className="w-4 h-4" /> Prendre une photo
              </button>
            </div>
            <p className="text-xs text-zyvo-muted">CNI ou passeport en cours de validité</p>
          </div>
        )}
      </div>

      {errors.idFile && <p className="text-[10px] text-red-400 text-center"><X className="w-3 h-3 inline" />{errors.idFile}</p>}

      <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
        <p className="text-xs text-zyvo-muted leading-relaxed">
          <strong className="text-amber-400">🔒 Confidentialité :</strong> Votre document est transmis de façon sécurisée.
          Il sera supprimé après vérification (max 24h). Nous ne le partageons jamais.
        </p>
      </div>
    </div>
  )
}

function StepConfirmation({ form }) {
  const selectedServices = form.services.map(s => serviceOptions.find(o => o.value === s)).filter(Boolean)

  return (
    <div className="space-y-5 stagger-fade">
      <div className="text-center mb-2">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
          <Award className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-extrabold">Presque fini !</h3>
        <p className="text-sm text-zyvo-muted mt-1">Vérifiez vos informations avant de soumettre.</p>
      </div>

      <div className="glass-premium rounded-2xl divide-y divide-white/5 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-zyvo-muted">Prénom</span>
          <span className="text-sm font-bold text-white">{form.prenom || '-'}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-zyvo-muted">Nom</span>
          <span className="text-sm font-bold text-white">{form.nom || '-'}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-zyvo-muted">Téléphone</span>
          <span className="text-sm font-bold text-white">{form.phone || '-'}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-zyvo-muted">Ville</span>
          <span className="text-sm font-bold text-white">{form.city || '-'}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-zyvo-muted">Services</span>
          <div className="flex flex-wrap gap-1">
            {selectedServices.length > 0 ? selectedServices.map(s => (
              <span key={s.value} className="text-xs bg-zyvo-gold/10 text-zyvo-gold px-2 py-0.5 rounded-full font-semibold">
                {s.label}
              </span>
            )) : <span className="text-sm text-zyvo-muted">-</span>}
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-zyvo-muted">Tarif horaire</span>
          <span className="text-sm font-bold text-white">{form.tarif ? `${form.tarif} DA` : '-'}</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-zyvo-muted">Disponibilités</span>
          <span className="text-sm font-bold text-white">
            {form.dispoDays.length > 0 ? `${form.dispoDays.length}j/sem` : '-'}
          </span>
        </div>
      </div>

      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 text-center">
        <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
        <p className="text-sm font-bold text-emerald-400">Vérification sous 24h</p>
        <p className="text-xs text-zyvo-muted mt-1">Notre équipe vérifiera votre dossier et vous recevrez une notification dès que votre profil sera actif.</p>
      </div>
    </div>
  )
}

export default function BecomeProvider() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    prenom: '', nom: '', phone: '', email: '', city: '', bio: '',
    services: [], tarif: '', experience: '',
    dispoDays: [], dispoTimes: [],
    idFile: null, idFileName: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (step === 1) {
      if (!form.prenom.trim()) errs.prenom = 'Prénom requis'
      if (!form.nom.trim()) errs.nom = 'Nom requis'
      if (!form.phone.trim()) errs.phone = 'Téléphone requis'
      if (!form.city) errs.city = 'Ville requise'
    }
    if (step === 2) {
      if (form.services.length === 0) errs.services = 'Sélectionnez au moins un service'
      if (!form.tarif) errs.tarif = 'Tarif horaire requis'
    }
    if (step === 3) {
      if (form.dispoDays.length === 0) errs.dispoDays = 'Sélectionnez au moins un jour'
      if (form.dispoTimes.length === 0) errs.dispoTimes = 'Sélectionnez au moins un créneau'
    }
    if (step === 4) {
      if (!form.idFile) errs.idFile = 'Veuillez fournir une pièce d\'identité'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => {
    if (validate()) {
      setStep(s => Math.min(s + 1, 5))
      setErrors({})
    }
  }

  const prev = () => {
    setStep(s => Math.max(s - 1, 1))
    setErrors({})
  }

  const handleSubmit = () => {
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className="py-8 max-w-lg mx-auto text-center">
        <div className="glass-premium rounded-3xl p-8 sm:p-12 animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Demande envoyée !</h2>
          <p className="text-zyvo-muted text-sm leading-relaxed max-w-sm mx-auto">
            Merci <strong className="text-white">{form.prenom}</strong> ! 
            Notre équipe vérifie votre dossier. Vous recevrez une notification sous 24h 
            dès que votre profil sera actif.
          </p>
          <div className="flex flex-col items-center gap-3 mt-8">
            <div className="flex items-center gap-2 text-xs text-zyvo-muted">
              <Clock className="w-3.5 h-3.5 text-zyvo-gold" /> Vérification express
            </div>
            <Link to="/"
              className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-all glow-worm mt-4">
              Retour à l'accueil <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div className="glass-premium rounded-3xl p-6 sm:p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-4">
            <Sparkles className="w-4 h-4 text-zyvo-gold" /> Inscription prestataire
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Étape <span className="gradient-text-brand">{step}</span>
            <span className="text-zyvo-muted">/{steps.length}</span>
          </h1>
          <p className="text-sm text-zyvo-muted mt-1">{steps[step - 1].subtitle}</p>
        </div>

        {/* PROGRESS */}
        <StepIndicator current={step} />
        <ProgressBar current={step} />

        {/* STEP CONTENT */}
        <div className="min-h-[300px] animate-fade-in-up" key={step}>
          <StepContent step={step} form={form} setForm={setForm} errors={errors} />
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
          <button
            onClick={prev}
            disabled={step === 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              step === 1
                ? 'text-zyvo-muted/30 cursor-not-allowed'
                : 'text-zyvo-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>

          {step < steps.length ? (
            <button
              onClick={next}
              className="gradient-brand text-white font-bold px-8 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all glow-worm flex items-center gap-2"
            >
              Suivant <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="gradient-brand text-white font-bold px-8 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all glow-worm flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Envoyer ma demande
            </button>
          )}
        </div>
      </div>

      {/* TRUST SECTION AT BOTTOM */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[
          { icon: ShieldCheck, label: 'Vérification 24h', color: 'text-emerald-400' },
          { icon: Users, label: '500+ prestataires', color: 'text-blue-400' },
          { icon: Star, label: 'Note 4.7/5', color: 'text-amber-400' },
        ].map((item) => (
          <div key={item.label} className="glass-premium rounded-xl p-4 text-center card-hover">
            <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1.5`} />
            <div className="text-xs font-bold text-white">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
