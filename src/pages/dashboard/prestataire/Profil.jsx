import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, Star, Clock, DollarSign,
  ChevronRight, LogOut, Camera, CheckCircle, AlertCircle, Edit3, Save,
  X, Plus, Image, Hash, MapPin, Palette, Phone, Mail, User,
  Globe, Calendar, Briefcase, FileText,
  Clock as ClockIcon
} from 'lucide-react'
import { useAuth } from '../../../context/auth'
import { useLoading } from '../../../hooks/useLoading'
import { ProfileCardSkeleton } from '../../../components/dashboard/Skeleton'
import { useToast } from '../../../context/toast'

const coverPresets = [
  { label: 'Océan', value: 'from-blue-600 via-blue-500 to-cyan-400' },
  { label: 'Fushia', value: 'from-purple-600 via-purple-500 to-pink-400' },
  { label: 'Ambre', value: 'from-amber-600 via-yellow-500 to-orange-400' },
  { label: 'Émeraude', value: 'from-emerald-600 via-emerald-500 to-teal-400' },
  { label: 'Ciel', value: 'from-sky-600 via-blue-500 to-indigo-400' },
  { label: 'Rose', value: 'from-red-600 via-rose-500 to-pink-400' },
  { label: 'Soleil', value: 'from-orange-600 via-amber-500 to-yellow-400' },
  { label: 'Violet', value: 'from-indigo-600 via-violet-500 to-purple-400' },
  { label: 'Cerise', value: 'from-rose-600 via-pink-500 to-fuchsia-400' },
]

const avatarPresets = [
  { label: 'Bleu', value: 'from-blue-500 to-cyan-400' },
  { label: 'Violet', value: 'from-purple-500 to-pink-400' },
  { label: 'Orange', value: 'from-amber-500 to-orange-400' },
  { label: 'Vert', value: 'from-emerald-500 to-teal-400' },
  { label: 'Indigo', value: 'from-indigo-500 to-purple-400' },
  { label: 'Rose', value: 'from-pink-500 to-rose-400' },
  { label: 'Rouge', value: 'from-red-500 to-rose-400' },
  { label: 'Cyan', value: 'from-cyan-500 to-blue-400' },
]

const cities = ['Alger', 'Oran', 'Constantine', 'Blida', 'Annaba', 'Tizi Ouzou', 'Sétif', 'Batna', 'Djelfa', 'Sidi Bel Abbès', 'Biskra', 'Tlemcen']

const categories = [
  'plomberie', 'electricite', 'menage', 'coiffure', 'cours',
  'jardinage', 'demenagement', 'sante', 'informatique', 'bricolage',
  'photographie', 'evenementiel', 'transport', 'animaux',
]

const daysOfWeek = [
  { key: 'lun', label: 'Lun' },
  { key: 'mar', label: 'Mar' },
  { key: 'mer', label: 'Mer' },
  { key: 'jeu', label: 'Jeu' },
  { key: 'ven', label: 'Ven' },
  { key: 'sam', label: 'Sam' },
  { key: 'dim', label: 'Dim' },
]

const languageOptions = ['Français', 'Arabe', 'Anglais', 'Tamazight', 'Espagnol']

const STORAGE_KEY = 'zyvo_provider_edits'

function loadEdits(id) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const all = JSON.parse(raw)
    return all[id] || null
  } catch { return null }
}

function saveEdits(id, data) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const all = raw ? JSON.parse(raw) : {}
    all[id] = data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {}
}

const defaultForm = {
  name: '', service: '', category: '', city: '', price: '', priceValue: 0,
  description: '', coverGradient: '', avatarGradient: '',
  gallery: [], badges: [], verified_documents: [],
  experience: '', languages: [], availabilityDays: [], availabilityFrom: '08:00', availabilityTo: '17:00',
  whatsapp: '', instagram: '', facebook: '',
  zones: [],
}

function SectionHeader({ icon: Icon, label, count, editing }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3.5 h-3.5 text-zyvo-muted" />
      <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">{label}</p>
      {count !== undefined && editing && (
        <span className="text-[9px] text-zyvo-muted/50 ml-auto">{count}</span>
      )}
    </div>
  )
}

function Tag({ children, onRemove, editing, color = 'blue' }) {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  }
  return (
    <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg border flex items-center gap-1 ${colorMap[color] || colorMap.blue}`}>
      {children}
      {editing && onRemove && (
        <button onClick={onRemove} className="ml-0.5 hover:text-red-400 transition-colors">
          <X className="w-2.5 h-2.5" />
        </button>
      )}
    </span>
  )
}

function InlineInput({ value, onChange, placeholder, className = '', type = 'text', ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full bg-white/5 rounded-xl px-3 h-10 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all ${className}`}
      placeholder={placeholder}
      {...props}
    />
  )
}

function GradientPicker({ presets, selected, onSelect, columns = 6, size = 'h-6' }) {
  return (
    <div className={`grid grid-cols-${columns} gap-1.5`}>
      {presets.map(p => (
        <button
          key={p.value}
          onClick={() => onSelect(p.value)}
          className={`${size} rounded-lg bg-gradient-to-r ${p.value} ${selected === p.value ? 'ring-2 ring-white scale-110' : ''} transition-all`}
          title={p.label}
        />
      ))}
    </div>
  )
}

export default function ProviderProfil() {
  const { provider: baseProvider } = useOutletContext()
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const loading = useLoading(300)
  const [editing, setEditing] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [showCoverPicker, setShowCoverPicker] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [showGalleryPicker, setShowGalleryPicker] = useState(false)
  const [newBadge, setNewBadge] = useState('')
  const [newDoc, setNewDoc] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [newZone, setNewZone] = useState('')

  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (!baseProvider) return
    const edits = loadEdits(baseProvider.id)
    setForm({
      ...defaultForm,
      name: edits?.name ?? baseProvider.name ?? '',
      service: edits?.service ?? baseProvider.service ?? '',
      category: edits?.category ?? baseProvider.category ?? '',
      city: edits?.city ?? baseProvider.city ?? '',
      price: edits?.price ?? baseProvider.price ?? '',
      priceValue: edits?.priceValue ?? baseProvider.priceValue ?? 0,
      description: edits?.description ?? baseProvider.description ?? '',
      coverGradient: edits?.coverGradient ?? baseProvider.coverGradient ?? coverPresets[0].value,
      avatarGradient: edits?.avatarGradient ?? baseProvider.coverGradient ?? avatarPresets[0].value,
      gallery: edits?.gallery ?? baseProvider.gallery ?? [],
      badges: edits?.badges ?? baseProvider.badges ?? [],
      verified_documents: edits?.verified_documents ?? baseProvider.verified_documents ?? [],
      experience: edits?.experience ?? '',
      languages: edits?.languages ?? [],
      availabilityDays: edits?.availabilityDays ?? [],
      availabilityFrom: edits?.availabilityFrom ?? '08:00',
      availabilityTo: edits?.availabilityTo ?? '17:00',
      whatsapp: edits?.whatsapp ?? '',
      instagram: edits?.instagram ?? '',
      facebook: edits?.facebook ?? '',
      zones: edits?.zones ?? [],
    })
    setDirty(false)
    setPhotoPreview(null)
  }, [baseProvider, editing])

  const provider = {
    ...baseProvider,
    ...loadEdits(baseProvider?.id) || {},
    ...(editing ? form : {}),
  }

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setDirty(true)
  }

  function handleSave() {
    saveEdits(baseProvider.id, form)
    setEditing(false)
    setDirty(false)
    addToast('Profil mis à jour', { message: 'Vos modifications ont été enregistrées', type: 'success' })
  }

  function handleCancel() {
    if (dirty) {
      const ok = confirm('Vous avez des modifications non enregistrées. Annuler ?')
      if (!ok) return
    }
    setEditing(false)
    setDirty(false)
    setShowCoverPicker(false)
    setShowAvatarPicker(false)
    setShowGalleryPicker(false)
    setPhotoPreview(null)
  }

  function handlePhotoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target?.result)
    reader.readAsDataURL(file)
    setDirty(true)
  }

  function addBadge() {
    const tag = newBadge.trim()
    if (!tag || form.badges.includes(tag)) return
    update('badges', [...form.badges, tag])
    setNewBadge('')
  }

  function removeBadge(tag) {
    update('badges', form.badges.filter(b => b !== tag))
  }

  function addDoc() {
    const doc = newDoc.trim()
    if (!doc || form.verified_documents.includes(doc)) return
    update('verified_documents', [...form.verified_documents, doc])
    setNewDoc('')
  }

  function removeDoc(doc) {
    update('verified_documents', form.verified_documents.filter(d => d !== doc))
  }

  function addGalleryImage(gradient) {
    if (form.gallery.length >= 6) return
    update('gallery', [...form.gallery, gradient])
  }

  function removeGalleryImage(index) {
    update('gallery', form.gallery.filter((_, i) => i !== index))
  }

  function toggleDay(day) {
    const exists = form.availabilityDays.includes(day)
    update('availabilityDays', exists ? form.availabilityDays.filter(d => d !== day) : [...form.availabilityDays, day])
  }

  function toggleLanguage(lang) {
    const exists = form.languages.includes(lang)
    update('languages', exists ? form.languages.filter(l => l !== lang) : [...form.languages, lang])
  }

  function addZone() {
    const z = newZone.trim()
    if (!z || form.zones.includes(z)) return
    update('zones', [...form.zones, z])
    setNewZone('')
  }

  function removeZone(z) {
    update('zones', form.zones.filter(x => x !== z))
  }

  useEffect(() => {
    function handleKey(e) {
      if (!editing) return
      if (e.key === 'Escape') handleCancel()
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); handleSave() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [editing, dirty, form])

  if (loading) return <ProfileCardSkeleton />

  if (!baseProvider) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
        <p className="font-bold text-white">Profil introuvable</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold">Mon <span className="gradient-text-brand">profil</span></h1>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-all text-xs font-semibold text-zyvo-muted"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Modifier
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleCancel} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-zyvo-muted">
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-brand text-white text-xs font-bold shadow-lg hover:scale-[1.02] transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      {/* Cover + Avatar Header */}
      <motion.div layout className="glass-premium rounded-2xl overflow-hidden">
        <div className="relative">
          <div className={"h-20 sm:h-28 bg-gradient-to-r relative ".concat(form.coverGradient)}>
            {editing && (
              <button
                onClick={() => setShowCoverPicker(!showCoverPicker)}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 active:scale-90 transition-all"
              >
                <Palette className="w-3.5 h-3.5 text-white" />
              </button>
            )}
          </div>
          <AnimatePresence>
            {showCoverPicker && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="p-3 bg-zyvo-dark border-t border-white/5">
                  <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider mb-2">Couverture</p>
                  <GradientPicker presets={coverPresets} selected={form.coverGradient} onSelect={(v) => { update('coverGradient', v); setShowCoverPicker(false) }} columns={6} size="h-6" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4">
          <div className="flex items-end -mt-10 sm:-mt-14 mb-4">
            <div className="relative">
              <div className={"w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg border-4 border-zyvo-dark shrink-0 overflow-hidden ".concat(form.avatarGradient)}>
                {photoPreview ? (
                  <img src={photoPreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  form.name?.charAt(0) || '?'
                )}
              </div>
              {editing && (
                <label className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-zyvo-gold flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-90 transition-all">
                  <Camera className="w-3 h-3 text-zyvo-dark" />
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              )}
            </div>
            <div className="ml-3 pb-1 flex-1 min-w-0">
              {editing ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    className="text-lg sm:text-xl font-extrabold text-white bg-transparent border-b border-white/10 focus:border-zyvo-gold/40 outline-none w-full pb-0.5"
                    placeholder="Votre nom"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.service}
                      onChange={e => update('service', e.target.value)}
                      className="text-xs text-zyvo-muted bg-transparent border-b border-white/10 focus:border-zyvo-gold/40 outline-none flex-1 pb-0.5"
                      placeholder="Titre du service"
                    />
                    <select
                      value={form.city}
                      onChange={e => update('city', e.target.value)}
                      className="text-xs text-zyvo-muted bg-transparent border-b border-white/10 focus:border-zyvo-gold/40 outline-none pb-0.5 appearance-none cursor-pointer"
                    >
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white truncate">{provider.name}</h2>
                  <p className="text-xs sm:text-sm text-zyvo-muted truncate">{provider.service} · {provider.city}</p>
                </>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showAvatarPicker && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Couleur avatar</p>
                    <label className="text-[10px] text-zyvo-gold font-semibold cursor-pointer flex items-center gap-1 hover:underline">
                      <Camera className="w-3 h-3" /> Photo
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {avatarPresets.map(p => (
                      <button
                        key={p.value}
                        onClick={() => { update('avatarGradient', p.value); setShowAvatarPicker(false) }}
                        className={"h-8 rounded-xl bg-gradient-to-br ".concat(p.value, " ", form.avatarGradient === p.value ? 'ring-2 ring-white scale-110' : '')}
                        title={p.label}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { icon: Star, value: provider.rating, label: 'Note', color: 'text-amber-400' },
              { icon: Clock, value: provider.missions, label: 'Missions', color: 'text-blue-400' },
              { icon: ShieldCheck, value: provider.response_rate, label: 'Réponse', color: 'text-emerald-400' },
              { icon: DollarSign, value: editing ? form.price : provider.price, label: 'Tarif', color: 'text-zyvo-gold' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} strokeWidth={1.5} />
                <p className={`text-xs font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[9px] text-zyvo-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* === EDITABLE SECTIONS (visible only in edit mode) === */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            {/* Bio */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={FileText} label="Bio" />
              <div className="relative">
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  maxLength={300}
                  rows={4}
                  className="w-full bg-white/5 rounded-xl p-3 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all resize-none"
                  placeholder="Parlez de votre activité, votre expérience, vos spécialités..."
                />
                <span className="absolute bottom-2 right-2 text-[9px] text-zyvo-muted/40">{form.description.length}/300</span>
              </div>
            </div>

            {/* Activité */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={Briefcase} label="Activité" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-zyvo-muted/60 mb-1.5 block">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={e => update('category', e.target.value)}
                    className="w-full bg-white/5 rounded-xl px-3 h-10 text-xs text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all appearance-none cursor-pointer"
                  >
                    {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-zyvo-muted/60 mb-1.5 block">Prix</label>
                  <InlineInput value={form.price} onChange={e => update('price', e.target.value)} placeholder="ex: 1 500 DA/h" />
                </div>
                <div>
                  <label className="text-[10px] text-zyvo-muted/60 mb-1.5 block">Expérience</label>
                  <select
                    value={form.experience}
                    onChange={e => update('experience', e.target.value)}
                    className="w-full bg-white/5 rounded-xl px-3 h-10 text-xs text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Non spécifié</option>
                    {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(y => (
                      <option key={y} value={`${y} ans`}>{y} an{y > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-zyvo-muted/60 mb-1.5 block">Langues parlées</label>
                  <div className="flex flex-wrap gap-1.5">
                    {languageOptions.map(l => (
                      <button
                        key={l}
                        onClick={() => toggleLanguage(l)}
                        className={`text-[9px] font-semibold px-2 py-1 rounded-lg border transition-all ${form.languages.includes(l) ? 'bg-zyvo-gold/20 text-zyvo-gold border-zyvo-gold/30' : 'bg-white/5 text-zyvo-muted border-white/10'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Disponibilités */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={Calendar} label="Disponibilités" />
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {daysOfWeek.map(d => (
                    <button
                      key={d.key}
                      onClick={() => toggleDay(d.key)}
                      className={`text-[10px] font-bold w-10 h-10 rounded-xl border transition-all ${form.availabilityDays.includes(d.key) ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-zyvo-muted border-white/10'}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-3 h-3 text-zyvo-muted" />
                    <input
                      type="time"
                      value={form.availabilityFrom}
                      onChange={e => update('availabilityFrom', e.target.value)}
                      className="bg-white/5 rounded-lg px-2 h-8 text-[11px] text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all"
                    />
                  </div>
                  <span className="text-zyvo-muted/40 text-[10px]">à</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={form.availabilityTo}
                      onChange={e => update('availabilityTo', e.target.value)}
                      className="bg-white/5 rounded-lg px-2 h-8 text-[11px] text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Zones d'intervention */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={MapPin} label="Zones d'intervention" />
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.zones.map(z => (
                  <Tag key={z} onRemove={() => removeZone(z)} editing color="purple">{z}</Tag>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <select
                  value={newZone}
                  onChange={e => setNewZone(e.target.value)}
                  onFocus={e => { if (e.target.value) { addZone(); e.target.value = ''; setNewZone('') } }}
                  className="flex-1 bg-white/5 rounded-xl px-3 h-9 text-xs text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Ajouter une ville...</option>
                  {cities.filter(c => !form.zones.includes(c)).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Galerie */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={Image} label="Galerie" count={`${form.gallery.length}/6`} editing />
              <div className="grid grid-cols-3 gap-2">
                {form.gallery.map((g, i) => (
                  <div key={i} className={"h-16 rounded-xl bg-gradient-to-br relative ".concat(g)}>
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center hover:bg-red-500/70 transition-all"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>
                ))}
                {form.gallery.length < 6 && (
                  <button
                    onClick={() => setShowGalleryPicker(!showGalleryPicker)}
                    className="h-16 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center hover:border-zyvo-gold/30 transition-all"
                  >
                    <Plus className="w-4 h-4 text-zyvo-muted/40" />
                  </button>
                )}
              </div>
              <AnimatePresence>
                {showGalleryPicker && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="mt-2 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                      <GradientPicker presets={coverPresets} selected="" onSelect={(v) => { addGalleryImage(v); setShowGalleryPicker(false) }} columns={6} size="h-6" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Badges */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={Hash} label="Badges" />
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.badges.map(b => (
                  <Tag key={b} onRemove={() => removeBadge(b)} editing color="blue"><ShieldCheck className="w-3 h-3" /> {b}</Tag>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={newBadge}
                  onChange={e => setNewBadge(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addBadge() } }}
                  className="flex-1 bg-white/5 rounded-xl px-3 h-9 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all"
                  placeholder="Ajouter un badge..."
                />
                <button onClick={addBadge} disabled={!newBadge.trim()} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center transition-all">
                  <Plus className="w-3.5 h-3.5 text-zyvo-muted" />
                </button>
              </div>
            </div>

            {/* Documents */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={ShieldCheck} label="Documents vérifiés" />
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.verified_documents.map(doc => (
                  <Tag key={doc} onRemove={() => removeDoc(doc)} editing color="emerald"><CheckCircle className="w-3 h-3" /> {doc}</Tag>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={newDoc}
                  onChange={e => setNewDoc(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDoc() } }}
                  className="flex-1 bg-white/5 rounded-xl px-3 h-9 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all"
                  placeholder="Ajouter un document..."
                />
                <button onClick={addDoc} disabled={!newDoc.trim()} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center transition-all">
                  <Plus className="w-3.5 h-3.5 text-zyvo-muted" />
                </button>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="glass-premium rounded-2xl p-4">
              <SectionHeader icon={Globe} label="Réseaux" />
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <InlineInput value={form.whatsapp} onChange={e => update('whatsapp', e.target.value)} placeholder="WhatsApp (ex: +213 6XX XX XX XX)" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  </div>
                  <InlineInput value={form.instagram} onChange={e => update('instagram', e.target.value)} placeholder="Instagram (ex: @votre_compte)" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <InlineInput value={form.facebook} onChange={e => update('facebook', e.target.value)} placeholder="Facebook (URL ou nom)" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account info (visible in both modes) */}
      <div className="glass-premium rounded-2xl p-4">
        <h3 className="font-bold text-sm text-white mb-3">Informations du compte</h3>
        <div className="space-y-3">
          {[
            { icon: User, label: 'Nom', value: user?.name },
            { icon: Mail, label: 'Email', value: user?.email || 'Non renseigné' },
            { icon: Phone, label: 'Téléphone', value: user?.phone || 'Non renseigné' },
            { icon: MapPin, label: 'Ville', value: provider.city },
          ].map(info => (
            <div key={info.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-2">
                <info.icon className="w-3 h-3 text-zyvo-muted" />
                <span className="text-xs text-zyvo-muted">{info.label}</span>
              </div>
              <span className="text-xs font-semibold text-white">{info.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => logout()}
          className="flex items-center justify-between w-full glass-premium rounded-2xl p-4 card-hover"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-white">Déconnexion</p>
              <p className="text-[10px] text-zyvo-muted">Se déconnecter de Zyvo</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </button>
      </div>

      <div className="h-2" />
    </>
  )
}