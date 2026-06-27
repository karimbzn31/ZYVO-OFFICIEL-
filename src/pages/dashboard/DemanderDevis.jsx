import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, MapPin, ChevronDown, Send, Clock, AlertTriangle,
  DollarSign, Image, CheckCircle, Calendar
} from 'lucide-react'
import { useAuth } from '../../context/auth'
import { useToast } from '../../context/toast'
import { categories } from '../../data/quotesData'
import { cities } from '../../data/dashboardData'

const urgencyOptions = [
  { value: 'urgent', label: 'Urgent (24h)', icon: AlertTriangle },
  { value: 'cette_semaine', label: 'Cette semaine', icon: Clock },
  { value: 'ce_mois', label: 'Ce mois-ci', icon: Calendar },
  { value: 'pas_presse', label: 'Pas pressé', icon: CheckCircle },
]

function Select({ value, onChange, placeholder, options, icon: Icon }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 h-12 px-4 glass-premium rounded-xl text-sm font-semibold outline-none border border-transparent focus-within:border-zyvo-gold/40 transition-all"
      >
        {Icon && <Icon className="w-4 h-4 text-zyvo-muted shrink-0" />}
        <span className={`flex-1 text-left ${value ? 'text-white' : 'text-zyvo-muted'}`}>
          {value ? options.find(o => o.value === value)?.label || value : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-zyvo-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 glass-premium rounded-xl border border-white/10 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
          {options.map(o => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false) }}
              className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 ${
                value === o.value ? 'text-zyvo-gold bg-zyvo-gold/10' : 'text-white'
              }`}
            >
              {o.icon && <o.icon className="w-4 h-4 shrink-0" />}
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DemanderDevis() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState(user?.city || '')
  const [budget, setBudget] = useState('')
  const [urgency, setUrgency] = useState('')
  const [photos, setPhotos] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const budgetOptions = [
    { value: '-5000', label: 'Moins de 5 000 DA' },
    { value: '5000-10000', label: '5 000 - 10 000 DA' },
    { value: '10000-20000', label: '10 000 - 20 000 DA' },
    { value: '20000-50000', label: '20 000 - 50 000 DA' },
    { value: '50000+', label: 'Plus de 50 000 DA' },
    { value: 'negocier', label: 'À négocier' },
  ]

  const canProceed = title.trim() && description.trim() && city && category

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canProceed || submitting) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1000))
    addToast('Devis envoyé !', {
      message: 'Des prestataires vont vous contacter sous peu.',
      type: 'success'
    })
    navigate('/dashboard/client/mes-devis')
  }

  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - photos.length)
    setPhotos(prev => [...prev, ...files].slice(0, 5))
  }

  const stepLabels = ['Service', 'Détails', 'Publication']

  return (
    <div className="max-w-lg mx-auto space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold">
          Demander <span className="gradient-text-brand">un devis</span>
        </h1>
        <p className="text-xs sm:text-sm text-zyvo-muted mt-0.5">
          Décrivez votre besoin, les pros vous répondent
        </p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
              step >= s ? 'bg-zyvo-gold text-zyvo-dark' : 'bg-white/10 text-zyvo-muted'
            }`}>
              {step > s ? <CheckCircle className="w-3.5 h-3.5" /> : s}
            </div>
            <span className={`text-[10px] font-semibold hidden sm:block ${step >= s ? 'text-white' : 'text-zyvo-muted'}`}>
              {stepLabels[s - 1]}
            </span>
            {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-zyvo-gold/50' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Category + Title */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Catégorie</label>
              <Select
                value={category}
                onChange={setCategory}
                placeholder="Choisissez une catégorie"
                options={categories.map(c => ({ value: c.toLowerCase(), label: c }))}
                icon={null}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Titre de votre demande</label>
              <div className="glass-premium rounded-xl px-4 h-12 flex items-center border border-transparent focus-within:border-zyvo-gold/40 transition-all">
                <input
                  type="text"
                  placeholder="Ex: Réparation fuite d'eau"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Description + City + Budget + Urgency */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Description détaillée</label>
              <div className="glass-premium rounded-xl p-4 border border-transparent focus-within:border-zyvo-gold/40 transition-all">
                <textarea
                  placeholder="Décrivez votre besoin en détail (surface, urgence, contraintes...)"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted resize-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Ville</label>
                <Select
                  value={city}
                  onChange={setCity}
                  placeholder="Ville"
                  options={cities.map(c => ({ value: c, label: c }))}
                  icon={MapPin}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Budget</label>
                <Select
                  value={budget}
                  onChange={setBudget}
                  placeholder="Budget"
                  options={budgetOptions}
                  icon={DollarSign}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Urgence</label>
              <div className="flex flex-wrap gap-2">
                {urgencyOptions.map(o => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setUrgency(o.value)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      urgency === o.value
                        ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                        : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <o.icon className="w-3.5 h-3.5" />
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">
                Photos <span className="font-normal text-zyvo-muted/60">(facultatif, max 5)</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {photos.map((p, i) => (
                  <div key={i} className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-[18px] font-bold text-zyvo-muted border border-white/10">
                    📷
                  </div>
                ))}
                {photos.length < 5 && (
                  <label className="w-16 h-16 rounded-xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                    <Image className="w-5 h-5 text-zyvo-muted" />
                    <input type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review + Submit */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="glass-premium rounded-2xl p-5 space-y-4">
              <p className="font-bold text-sm text-white">Récapitulatif</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zyvo-muted">Catégorie</span>
                  <span className="font-semibold text-white capitalize">{category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zyvo-muted">Titre</span>
                  <span className="font-semibold text-white">{title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zyvo-muted">Ville</span>
                  <span className="font-semibold text-white">{city}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zyvo-muted">Budget</span>
                  <span className="font-semibold text-white">{budget ? budgetOptions.find(o => o.value === budget)?.label : 'Non spécifié'}</span>
                </div>
                {urgency && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zyvo-muted">Urgence</span>
                    <span className="font-semibold text-white">{urgencyOptions.find(o => o.value === urgency)?.label}</span>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-white/5">
                <p className="text-xs text-zyvo-muted mb-2">Description</p>
                <p className="text-sm text-white/80 leading-relaxed">{description}</p>
              </div>
            </div>

            <p className="text-xs text-zyvo-muted text-center">
              En publiant, vous acceptez que des prestataires vous contactent
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-semibold text-zyvo-muted"
            >
              Retour
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !category || !title.trim() : !description.trim() || !city}
              className="flex-1 gradient-brand text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-40 disabled:hover:scale-100 hover:scale-[1.02] transition-all duration-300 glow-worm text-sm"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 gradient-brand text-white font-bold py-3 rounded-xl shadow-lg disabled:opacity-40 disabled:hover:scale-100 hover:scale-[1.02] transition-all duration-300 glow-worm text-sm flex items-center justify-center gap-2"
            >
              {submitting ? 'Publication...' : <>
                Publier la demande <Send className="w-4 h-4" />
              </>}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}


