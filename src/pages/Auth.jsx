import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Phone, User, ArrowRight, ShieldCheck, Sparkles, ChevronLeft, Check, Briefcase,
  MapPin, Clock, Star, Award, FileText, GraduationCap, Wrench, Home as HomeIcon,
  Monitor, Zap, Heart, ChevronRight, Mail, Building, Globe, CheckCircle, AlertCircle,
  Upload, Camera, Calendar, DollarSign, Info, X, ChevronDown
} from 'lucide-react'
import { useAuth } from '../context/auth'

const metiers = [
  { value: 'plomberie', label: 'Plombier', icon: Wrench },
  { value: 'electricite', label: 'Électricien', icon: Zap },
  { value: 'menage', label: 'Aide à domicile / Ménage', icon: HomeIcon },
  { value: 'coiffure', label: 'Coiffeur / Esthéticienne', icon: Star },
  { value: 'cours', label: 'Professeur / Coach', icon: GraduationCap },
  { value: 'jardinage', label: 'Jardinier', icon: Heart },
  { value: 'numerique', label: 'Service numérique', icon: Monitor },
  { value: 'transport', label: 'Transport / Logistique', icon: Zap },
]

const villes = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran',
  'El Bayadh', 'Illizi', 'Bordj Bou Arreridj', 'Boumerdès', 'El Tarf', 'Tindouf',
  'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla',
  'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane'
]

const xpLevels = [
  { value: 'debutant', label: 'Moins d\'1 an' },
  { value: 'junior', label: '1 à 3 ans' },
  { value: 'intermediaire', label: '3 à 5 ans' },
  { value: 'confirme', label: '5 à 10 ans' },
  { value: 'expert', label: 'Plus de 10 ans' },
]

const dispoOptions = [
  { value: 'fulltime', label: 'Temps plein', desc: 'Lun–Ven 8h–18h' },
  { value: 'morning', label: 'Matin', desc: '8h–12h' },
  { value: 'afternoon', label: 'Après-midi', desc: '13h–17h' },
  { value: 'evening', label: 'Soir', desc: '17h–21h' },
  { value: 'weekend', label: 'Weekends', desc: 'Sam–Dim' },
]

const serviceOptions = {
  plomberie: ['Installation sanitaire', 'Dépannage urgence', 'Rénovation salle de bains', 'Débouchage', 'Chauffage & chaudière'],
  electricite: ['Installation électrique', 'Dépannage', 'Mise aux normes', 'Tableau électrique', 'Domotique'],
  menage: ['Nettoyage complet', 'Repassage', 'Vitres & fenêtres', 'Grand ménage', 'Garde d\'enfants'],
  coiffure: ['Coupe femme', 'Coupe homme', 'Coloration', 'Brushing', 'Coiffure événementielle'],
  cours: ['Mathématiques', 'Français', 'Anglais', 'Musique', 'Informatique'],
  jardinage: ['Tonte pelouse', 'Taille haies', 'Arrosage automatique', 'Plantation', 'Nettoyage jardin'],
  numerique: ['Développement web', 'Design graphique', 'Support technique', 'Réseaux sociaux', 'Montage vidéo'],
  transport: ['Déménagement', 'Livraison colis', 'Transport meubles', 'Course rapide', 'Location utilitaire'],
}

const diplomes = [
  'Sans diplôme formel',
  'CAP / BEP',
  'BAC / BAC Pro',
  'BTS / DUT',
  'Licence / Master',
  'Ingénieur / Doctorat',
]

export default function Auth() {
  const [mode, setMode] = useState('register')
  const [role, setRole] = useState('client')
  const [step, setStep] = useState(1)
  const { login } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', ''])

  const [metier, setMetier] = useState('')
  const [ville, setVille] = useState('')
  const [experience, setExperience] = useState('')
  const [diplome, setDiplome] = useState('')
  const [bio, setBio] = useState('')
  const [selectedServices, setSelectedServices] = useState([])
  const [tarif, setTarif] = useState('')
  const [dispo, setDispo] = useState('')
  const [hasId, setHasId] = useState(false)
  const [hasCertif, setHasCertif] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [prestaStep, setPrestaStep] = useState(1)
  const [errors, setErrors] = useState({})

  const resetPresta = () => {
    setMetier('')
    setVille('')
    setExperience('')
    setDiplome('')
    setBio('')
    setSelectedServices([])
    setTarif('')
    setDispo('')
    setHasId(false)
    setHasCertif(false)
    setAcceptTerms(false)
    setPrestaStep(1)
    setErrors({})
  }

  const switchRole = (r) => {
    setRole(r)
    resetPresta()
  }

  const switchMode = (m) => {
    setMode(m)
    setStep(1)
    if (m === 'login') setRole('client')
    else setRole('client')
    resetPresta()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) setStep(2)
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
      document.getElementById(`code-${i + 1}`)?.focus()
    }
  }

  const toggleService = (s) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const validateStep1 = () => {
    const errs = {}
    if (name.trim().length < 2) errs.name = 'Nom requis (min 2 caractères)'
    if (phone.replace(/\s/g, '').length < 8) errs.phone = 'Numéro de téléphone invalide'
    if (!metier) errs.metier = 'Sélectionnez un métier'
    if (!ville) errs.ville = 'Sélectionnez votre ville'
    if (!experience) errs.experience = 'Sélectionnez votre niveau d\'expérience'
    if (bio.trim().length < 20) errs.bio = 'Bio trop courte (min 20 caractères)'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs = {}
    if (selectedServices.length === 0) errs.services = 'Sélectionnez au moins une prestation'
    if (!tarif) errs.tarif = 'Indiquez votre tarif horaire'
    if (!dispo) errs.dispo = 'Sélectionnez votre disponibilité'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep3 = () => {
    const errs = {}
    if (!hasId) errs.hasId = 'Ajoutez votre pièce d\'identité'
    if (!acceptTerms) errs.acceptTerms = 'Vous devez accepter les conditions'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePrestaNext = () => {
    let valid = false
    if (prestaStep === 1) valid = validateStep1()
    else if (prestaStep === 2) valid = validateStep2()
    else if (prestaStep === 3) valid = validateStep3()
    if (valid) {
      if (prestaStep < 3) setPrestaStep(p => p + 1)
      else setStep(2)
    }
  }

  const handlePrestaPrev = () => {
    if (prestaStep > 1) setPrestaStep(p => p - 1)
    setErrors({})
  }

  const prestaSteps = [
    { num: 1, label: 'Identité & Métier' },
    { num: 2, label: 'Services & Tarifs' },
    { num: 3, label: 'Vérification' },
  ]

  const renderPrestaForm = () => (
    <div className="animate-fade-in-up">
      {/* PROGRESS */}
      <div className="flex items-center gap-2 mb-8">
        {prestaSteps.map((s, i) => (
          <div key={s.num} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
              prestaStep === s.num
                ? 'gradient-brand text-white shadow-lg scale-110'
                : prestaStep > s.num
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-white/5 text-zyvo-muted'
            }`}>
              {prestaStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
            </div>
            <span className={`text-[10px] font-semibold hidden sm:block ${prestaStep === s.num ? 'text-white' : 'text-zyvo-muted'}`}>
              {s.label}
            </span>
            {i < 2 && <div className={`flex-1 h-0.5 rounded-full ${prestaStep > i + 1 ? 'bg-emerald-500/50' : 'bg-white/5'}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1 — IDENTITÉ & MÉTIER */}
      {prestaStep === 1 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-zyvo-gold" /> Identité & Métier
            </h3>
            <p className="text-xs text-zyvo-muted mt-1">Commençons par faire connaissance</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
              <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Nom complet *</label>
              <div className={`flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border ${errors.name ? 'border-red-500/40' : 'border-transparent'}`}>
                <User className="w-4 h-4 text-zyvo-muted shrink-0" />
                <input
                  type="text"
                  placeholder="Votre nom et prénom"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(prev => ({...prev, name: ''})) }}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Numéro de téléphone *</label>
              <div className={`flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border ${errors.phone ? 'border-red-500/40' : 'border-transparent'}`}>
                <Phone className="w-4 h-4 text-zyvo-muted shrink-0" />
                <span className="text-sm font-bold text-zyvo-muted">+213</span>
                <input
                  type="tel"
                  placeholder="5XX XX XX XX"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setErrors(prev => ({...prev, phone: ''})) }}
                  className="flex-1 bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Email (optionnel)</label>
              <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border border-transparent">
                <Mail className="w-4 h-4 text-zyvo-muted shrink-0" />
                <input
                  type="email"
                  placeholder="email@exemple.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Ville d'exercice *</label>
              <div className="relative">
                <select
                  value={ville}
                  onChange={e => { setVille(e.target.value); setErrors(prev => ({...prev, ville: ''})) }}
                  className={`w-full border rounded-xl px-4 h-12 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors cursor-pointer ${errors.ville ? 'border-red-500/40 bg-red-500/5' : 'bg-white/5 border-white/10'}`}
                >
                  <option value="" className="bg-zyvo-dark">Sélectionnez votre ville</option>
                  {villes.map(v => <option key={v} value={v} className="bg-zyvo-dark">{v}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-zyvo-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.ville && <p className="text-[10px] text-red-400 mt-1">{errors.ville}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-2 block">Métier *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {metiers.map(m => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMetier(m.value)}
                  className={`flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl text-xs font-bold transition-all border ${
                    metier === m.value
                      ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white shadow-lg'
                      : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white hover:bg-white/10'
                  }`}
                >
                  <m.icon className={`w-5 h-5 ${metier === m.value ? 'text-zyvo-gold' : ''}`} />
                  <span className="text-center leading-tight">{m.label}</span>
                </button>
              ))}
            </div>
            {errors.metier && <p className="text-[10px] text-red-400 mt-1">{errors.metier}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Expérience *</label>
              <div className="relative">
                <select
                  value={experience}
                  onChange={e => { setExperience(e.target.value); setErrors(prev => ({...prev, experience: ''})) }}
                  className={`w-full border rounded-xl px-4 h-12 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors cursor-pointer ${errors.experience ? 'border-red-500/40 bg-red-500/5' : 'bg-white/5 border-white/10'}`}
                >
                  <option value="" className="bg-zyvo-dark">Sélectionnez</option>
                  {xpLevels.map(x => <option key={x.value} value={x.value} className="bg-zyvo-dark">{x.label}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-zyvo-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.experience && <p className="text-[10px] text-red-400 mt-1">{errors.experience}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Niveau d'études</label>
              <div className="relative">
                <select
                  value={diplome}
                  onChange={e => setDiplome(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Sélectionnez</option>
                  {diplomes.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-zyvo-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Bio / Présentation *</label>
            <textarea
              value={bio}
              onChange={e => { setBio(e.target.value); setErrors(prev => ({...prev, bio: ''})) }}
              placeholder="Décrivez votre parcours, vos compétences, vos réalisations..."
              rows={3}
              className={`w-full border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-zyvo-gold/40 transition-colors resize-none ${errors.bio ? 'border-red-500/40 bg-red-500/5' : 'bg-white/5 border-white/10'}`}
            />
            <div className="flex justify-between mt-1">
              {errors.bio ? (
                <p className="text-[10px] text-red-400">{errors.bio}</p>
              ) : (
                <p className="text-[10px] text-zyvo-muted">Minimum 20 caractères</p>
              )}
              <p className={`text-[10px] ${bio.length >= 20 ? 'text-emerald-400' : 'text-zyvo-muted'}`}>{bio.length} / 20</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 — SERVICES & TARIFS */}
      {prestaStep === 2 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-zyvo-gold" /> Services & Tarifs
            </h3>
            <p className="text-xs text-zyvo-muted mt-1">Définissez vos prestations</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zyvo-muted">Prestations proposées *</label>
              <span className="text-[10px] text-zyvo-muted">{selectedServices.length} sélectionné{selectedServices.length > 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(serviceOptions[metier] || serviceOptions.plomberie).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleService(s)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-semibold transition-all border ${
                    selectedServices.includes(s)
                      ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white'
                      : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    selectedServices.includes(s) ? 'bg-zyvo-gold border-zyvo-gold' : 'border-white/20'
                  }`}>
                    {selectedServices.includes(s) && <Check className="w-3 h-3 text-zyvo-dark" />}
                  </div>
                  {s}
                </button>
              ))}
            </div>
            {errors.services && <p className="text-[10px] text-red-400 mt-1">{errors.services}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Tarif horaire (DA) *</label>
              <div className={`flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border ${errors.tarif ? 'border-red-500/40' : 'border-transparent'}`}>
                <DollarSign className="w-4 h-4 text-zyvo-gold shrink-0" />
                <input
                  type="number"
                  placeholder="1500"
                  value={tarif}
                  onChange={e => { setTarif(e.target.value); setErrors(prev => ({...prev, tarif: ''})) }}
                  className="w-full bg-transparent outline-none text-sm font-bold text-white placeholder:text-zyvo-muted"
                  min={0}
                />
                <span className="text-xs text-zyvo-muted font-semibold">DA / heure</span>
              </div>
              {errors.tarif && <p className="text-[10px] text-red-400 mt-1">{errors.tarif}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Disponibilité *</label>
              <div className="relative">
                <select
                  value={dispo}
                  onChange={e => { setDispo(e.target.value); setErrors(prev => ({...prev, dispo: ''})) }}
                  className={`w-full border rounded-xl px-4 h-12 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors cursor-pointer ${errors.dispo ? 'border-red-500/40 bg-red-500/5' : 'bg-white/5 border-white/10'}`}
                >
                  <option value="" className="bg-zyvo-dark">Quand êtes-vous disponible ?</option>
                  {dispoOptions.map(d => <option key={d.value} value={d.value} className="bg-zyvo-dark">{d.label} — {d.desc}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-zyvo-muted absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.dispo && <p className="text-[10px] text-red-400 mt-1">{errors.dispo}</p>}
            </div>
          </div>

          {/* RÉSUMÉ */}
          <div className="glass-premium rounded-xl p-4">
            <h4 className="text-xs font-bold text-zyvo-muted flex items-center gap-1.5 mb-3">
              <Info className="w-3 h-3" /> Résumé de votre offre
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="text-zyvo-muted">Métier</div>
              <div className="text-white font-semibold text-right">{metiers.find(m => m.value === metier)?.label || '-'}</div>
              <div className="text-zyvo-muted">Ville</div>
              <div className="text-white font-semibold text-right">{ville || '-'}</div>
              <div className="text-zyvo-muted">Expérience</div>
              <div className="text-white font-semibold text-right">{xpLevels.find(x => x.value === experience)?.label || '-'}</div>
              <div className="text-zyvo-muted">Prestations</div>
              <div className="text-white font-semibold text-right">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}</div>
              <div className="text-zyvo-muted">Tarif</div>
              <div className="text-white font-semibold text-right">{tarif ? `${tarif} DA/h` : '-'}</div>
              <div className="text-zyvo-muted">Disponibilité</div>
              <div className="text-white font-semibold text-right">{dispoOptions.find(d => d.value === dispo)?.label || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — VÉRIFICATION */}
      {prestaStep === 3 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-zyvo-gold" /> Vérification finale
            </h3>
            <p className="text-xs text-zyvo-muted mt-1">Dernière étape pour devenir prestataire Zyvo</p>
          </div>

          <div className="gradient-brand rounded-2xl p-5 text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <ShieldCheck className="w-10 h-10 text-white mx-auto mb-2" />
              <p className="text-base font-extrabold text-white">Sécurité & Confiance</p>
              <p className="text-xs text-white/70 mt-1">Vos données sont protégées conformément à la loi 18-07</p>
            </div>
          </div>

          {/* PIÈCE D'IDENTITÉ */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-2 block flex items-center gap-1.5">
              <FileText className="w-3 h-3" /> Pièce d'identité (CNI ou Passeport) *
            </label>
            <button
              type="button"
              onClick={() => { setHasId(!hasId); setErrors(prev => ({...prev, hasId: ''})) }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all border ${
                hasId
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : errors.hasId
                    ? 'border-red-500/40 bg-red-500/5 text-red-400'
                    : 'bg-white/5 border-white/10 text-zyvo-muted hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                {hasId
                  ? <><CheckCircle className="w-5 h-5 text-emerald-400" /> Document vérifié ✓</>
                  : <><Camera className="w-5 h-5" /> Ajouter une photo de votre pièce d'identité</>}
              </span>
              {!hasId && <Upload className="w-4 h-4" />}
            </button>
            {errors.hasId && <p className="text-[10px] text-red-400 mt-1">{errors.hasId}</p>}
            <p className="text-[10px] text-zyvo-muted mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3" /> Simulation : aucune donnée réelle n'est stockée
            </p>
          </div>

          {/* CERTIFICATIONS */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-2 block flex items-center gap-1.5">
              <Award className="w-3 h-3" /> Diplômes / Certifications (optionnel)
            </label>
            <button
              type="button"
              onClick={() => setHasCertif(!hasCertif)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all border ${
                hasCertif
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/5 border-white/10 text-zyvo-muted hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2.5">
                {hasCertif
                  ? <><CheckCircle className="w-5 h-5 text-emerald-400" /> Diplôme ajouté ✓</>
                  : <><GraduationCap className="w-5 h-5" /> Ajouter un diplôme ou certificat</>}
              </span>
              {!hasCertif && <Upload className="w-4 h-4" />}
            </button>
          </div>

          {/* NUMÉRO FIXE */}
          <div>
            <label className="text-xs font-bold text-zyvo-muted mb-1.5 block flex items-center gap-1.5">
              <Building className="w-3 h-3" /> Numéro de fixe (optionnel)
            </label>
            <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border border-transparent">
              <Phone className="w-4 h-4 text-zyvo-muted shrink-0" />
              <span className="text-sm font-bold text-zyvo-muted">+213</span>
              <input
                type="tel"
                placeholder="0XX XX XX XX"
                className="flex-1 bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
              />
            </div>
          </div>

          {/* CONFIRMATION */}
          <div className={`rounded-xl p-4 ${errors.acceptTerms ? 'border border-red-500/40 bg-red-500/5' : 'glass-premium'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={e => { setAcceptTerms(e.target.checked); setErrors(prev => ({...prev, acceptTerms: ''})) }}
                className="mt-0.5 accent-zyvo-gold"
              />
              <span className="text-xs text-zyvo-muted leading-relaxed">
                Je certifie sur l'honneur que toutes les informations fournies sont exactes et complètes.
                Je m'engage à respecter la charte de qualité Zyvo et à fournir des services professionnels
                à chaque client.{' '}
                <button type="button" className="text-zyvo-gold font-bold hover:underline">
                  Voir la charte
                </button>
              </span>
            </label>
            {errors.acceptTerms && <p className="text-[10px] text-red-400 mt-2">{errors.acceptTerms}</p>}
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <div className="flex gap-3 mt-8">
        {prestaStep > 1 ? (
          <button
            type="button"
            onClick={handlePrestaPrev}
            className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-white/5 text-zyvo-muted font-bold text-sm hover:text-white hover:bg-white/10 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>
        ) : <div className="flex-1" />}

        <button
          type="button"
          onClick={handlePrestaNext}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-lg gradient-brand text-white hover:scale-[1.02] glow-worm cursor-pointer"
        >
          {prestaStep < 3 ? (
            <>Suivant <ChevronRight className="w-4 h-4" /></>
          ) : (
            <><ShieldCheck className="w-4 h-4" /> Envoyer ma candidature</>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-2xl font-bold text-white shadow-lg mx-auto mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
            <Sparkles className="w-7 h-7 relative z-10" />
          </div>
          <h1 className="text-2xl font-extrabold">
            {step === 2
              ? 'Vérification'
              : mode === 'register'
                ? role === 'prestataire' ? 'Devenir prestataire Zyvo' : 'Créer un compte'
                : 'Connexion'}
          </h1>
          <p className="text-sm text-zyvo-muted mt-1">
            {step === 2
              ? `Un code SMS a été envoyé au +213 ${phone}`
              : mode === 'register'
                ? role === 'prestataire' ? '3 étapes pour rejoindre nos professionnels vérifiés' : 'Rejoignez la communauté Zyvo'
                : 'Retrouvez votre compte Zyvo'}
          </p>
        </div>

        {/* TABS */}
        {step === 1 && (
          <div className="flex glass-premium rounded-xl p-1 mb-6">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === 'login' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'
              }`}
            >
              Se connecter
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === 'register' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'
              }`}
            >
              S'inscrire
            </button>
          </div>
        )}

        {/* ROLE SELECTION */}
        {step === 1 && mode === 'register' && (
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              type="button"
              onClick={() => switchRole('client')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${
                role === 'client'
                  ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white shadow-lg'
                  : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white hover:bg-white/10'
              }`}
            >
              <User className={`w-4 h-4 ${role === 'client' ? 'text-zyvo-gold' : ''}`} />
              <div className="text-left">
                <div>Particulier</div>
                <div className="text-[9px] font-normal text-zyvo-muted">Je cherche un service</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => switchRole('prestataire')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border ${
                role === 'prestataire'
                  ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white shadow-lg'
                  : 'bg-white/5 border-transparent text-zyvo-muted hover:text-white hover:bg-white/10'
              }`}
            >
              <Briefcase className={`w-4 h-4 ${role === 'prestataire' ? 'text-zyvo-gold' : ''}`} />
              <div className="text-left">
                <div>Professionnel</div>
                <div className="text-[9px] font-normal text-zyvo-muted">Je propose mes services</div>
              </div>
            </button>
          </div>
        )}

        {/* PRESTATAIRE FORM */}
        {step === 1 && mode === 'register' && role === 'prestataire' && renderPrestaForm()}

        {/* CLIENT / LOGIN FORM */}
        {step === 1 && !(mode === 'register' && role === 'prestataire') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Nom complet</label>
                <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border border-transparent">
                  <User className="w-4 h-4 text-zyvo-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Numéro de téléphone</label>
              <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 focus-within:border-zyvo-gold/40 transition-all border border-transparent">
                <Phone className="w-4 h-4 text-zyvo-muted shrink-0" />
                <span className="text-sm font-bold text-zyvo-muted">+213</span>
                <input
                  type="tel"
                  placeholder="5XX XX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm font-semibold text-white placeholder:text-zyvo-muted"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 glow-worm"
            >
              {mode === 'register' ? 'Créer mon compte' : 'Se connecter'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* OTP */}
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
              className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 mt-6 flex items-center justify-center gap-2 glow-worm"
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
    </div>
  )
}
