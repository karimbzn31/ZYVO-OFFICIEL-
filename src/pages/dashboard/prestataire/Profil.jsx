import { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, Star, Clock, DollarSign,
  ChevronRight, LogOut, Camera, CheckCircle, AlertCircle, Edit3, Save,
  X, Plus, Image, Hash, MapPin, Palette, FileText, Briefcase, Phone, Mail, User
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
  { label: 'Lime', value: 'from-lime-600 via-green-500 to-emerald-400' },
  { label: 'Fuchsia', value: 'from-pink-600 via-fuchsia-500 to-purple-400' },
  { label: 'Soleil', value: 'from-orange-600 via-amber-500 to-yellow-400' },
  { label: 'Violet', value: 'from-indigo-600 via-violet-500 to-purple-400' },
  { label: 'Teal', value: 'from-cyan-600 via-teal-500 to-emerald-400' },
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

export default function ProviderProfil() {
  const { provider: baseProvider } = useOutletContext()
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const loading = useLoading(350)
  const [editing, setEditing] = useState(false)

  const [form, setForm] = useState({
    name: '', service: '', category: '', city: '', price: '', priceValue: 0,
    description: '', coverGradient: '', avatarGradient: '',
    gallery: [], badges: [], verified_documents: [],
  })

  const [newBadge, setNewBadge] = useState('')
  const [newDoc, setNewDoc] = useState('')
  const [showCoverPicker, setShowCoverPicker] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  useEffect(() => {
    if (!baseProvider) return
    const edits = loadEdits(baseProvider.id)
    setForm({
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
    })
  }, [baseProvider, editing])

  const provider = {
    ...baseProvider,
    ...loadEdits(baseProvider?.id) || {},
    ...(editing ? form : {}),
  }

  if (loading) return <ProfileCardSkeleton />

  if (!baseProvider) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
        <p className="font-bold text-white">Profil introuvable</p>
      </div>
    )
  }

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    saveEdits(baseProvider.id, form)
    setEditing(false)
    addToast('Profil mis à jour', { message: 'Vos modifications ont été enregistrées', type: 'success' })
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-zyvo-muted"
            >
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

      {/* Cover + Avatar */}
      <div className="glass-premium rounded-2xl overflow-hidden relative">
        <div className="relative">
          <div className={"h-20 sm:h-28 bg-gradient-to-r ".concat(form.coverGradient, " relative")}>
            {editing && (
              <button
                onClick={() => setShowCoverPicker(!showCoverPicker)}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all"
              >
                <Palette className="w-3.5 h-3.5 text-white" />
              </button>
            )}
          </div>
          <AnimatePresence>
            {showCoverPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-zyvo-dark border-t border-white/5">
                  <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider mb-2">Couleur de couverture</p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {coverPresets.map(p => (
                      <button
                        key={p.value}
                        onClick={() => { update('coverGradient', p.value); setShowCoverPicker(false) }}
                        className={"h-6 rounded-lg bg-gradient-to-r ".concat(p.value, " ", form.coverGradient === p.value ? 'ring-2 ring-white scale-110' : '')}
                        title={p.label}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4">
          <div className="flex items-end -mt-10 sm:-mt-14 mb-4">
            <div className="relative">
              <div className={"w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ".concat(form.avatarGradient, " flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg border-4 border-zyvo-dark shrink-0")}>
                {form.name?.charAt(0) || '?'}
              </div>
              {editing && (
                <button
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-zyvo-gold flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                >
                  <Camera className="w-3 h-3 text-zyvo-dark" />
                </button>
              )}
            </div>
            <div className="ml-3 pb-1 flex-1 min-w-0">
              {editing ? (
                <input
                  type="text"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  className="text-lg sm:text-xl font-extrabold text-white bg-transparent border-b border-white/10 focus:border-zyvo-gold/40 outline-none w-full pb-0.5"
                  placeholder="Votre nom"
                />
              ) : (
                <h2 className="text-lg sm:text-xl font-extrabold text-white truncate">{provider.name}</h2>
              )}
              {editing ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={form.service}
                    onChange={e => update('service', e.target.value)}
                    className="text-xs text-zyvo-muted bg-transparent border-b border-white/10 focus:border-zyvo-gold/40 outline-none flex-1 pb-0.5"
                    placeholder="Titre du service"
                  />
                  <span className="text-xs text-zyvo-muted/40">·</span>
                  <select
                    value={form.city}
                    onChange={e => update('city', e.target.value)}
                    className="text-xs text-zyvo-muted bg-transparent border-b border-white/10 focus:border-zyvo-gold/40 outline-none pb-0.5 appearance-none cursor-pointer"
                  >
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-zyvo-muted truncate">{provider.service} · {provider.city}</p>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showAvatarPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider mb-2">Couleur de l'avatar</p>
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

          {/* Description / Bio */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-3.5 h-3.5 text-zyvo-muted" />
              <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Bio</p>
            </div>
            {editing ? (
              <textarea
                value={form.description}
                onChange={e => update('description', e.target.value)}
                rows={4}
                className="w-full bg-white/5 rounded-xl p-3 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all resize-none"
                placeholder="Parlez de votre activité, votre expérience, vos spécialités..."
              />
            ) : (
              <p className="text-xs text-zyvo-muted leading-relaxed">{provider.description}</p>
            )}
          </div>

          {/* Category & Price (edit mode) */}
          {editing && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider mb-1.5 block">Catégorie</label>
                <select
                  value={form.category}
                  onChange={e => update('category', e.target.value)}
                  className="w-full bg-white/5 rounded-xl px-3 h-10 text-xs text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all appearance-none cursor-pointer"
                >
                  {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider mb-1.5 block">Prix</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={e => update('price', e.target.value)}
                  className="w-full bg-white/5 rounded-xl px-3 h-10 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all"
                  placeholder="ex: 1 500 DA/h"
                />
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-3.5 h-3.5 text-zyvo-muted" />
              <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Badges</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.badges.map(b => (
                <span key={b} className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20 flex items-center gap-1 group">
                  <ShieldCheck className="w-3 h-3" /> {b}
                  {editing && (
                    <button onClick={() => removeBadge(b)} className="ml-0.5 text-blue-400/50 hover:text-red-400 transition-colors">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {editing && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newBadge}
                  onChange={e => setNewBadge(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addBadge() } }}
                  className="flex-1 bg-white/5 rounded-xl px-3 h-9 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all"
                  placeholder="Ajouter un badge..."
                />
                <button
                  onClick={addBadge}
                  disabled={!newBadge.trim()}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-zyvo-muted" />
                </button>
              </div>
            )}
          </div>

          {/* Gallery */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Image className="w-3.5 h-3.5 text-zyvo-muted" />
              <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Galerie</p>
              {editing && <span className="text-[9px] text-zyvo-muted/50">{form.gallery.length}/6</span>}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {form.gallery.map((g, i) => (
                <div key={i} className={"h-16 rounded-xl bg-gradient-to-br ".concat(g, " relative")}>
                  {editing && (
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center hover:bg-red-500/70 transition-all"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  )}
                </div>
              ))}
              {editing && form.gallery.length < 6 && (
                <div className="relative group">
                  <div className="h-16 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-zyvo-gold/30 transition-all">
                    <Plus className="w-4 h-4 text-zyvo-muted/40 group-hover:text-zyvo-gold/60 transition-all" />
                  </div>
                  <div className="absolute top-full left-0 right-0 mt-1 z-10 hidden group-hover:block">
                    <div className="bg-zyvo-dark border border-white/10 rounded-xl p-2 shadow-xl">
                      <div className="grid grid-cols-4 gap-1">
                        {coverPresets.slice(0, 8).map(p => (
                          <button
                            key={p.value}
                            onClick={() => addGalleryImage(p.value)}
                            className={"h-5 rounded bg-gradient-to-r ".concat(p.value)}
                            title={p.label}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Verified documents */}
          <div className="border-t border-white/5 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-zyvo-muted" />
              <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Documents vérifiés</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.verified_documents.map(doc => (
                <span key={doc} className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1 group">
                  <CheckCircle className="w-3 h-3" /> {doc}
                  {editing && (
                    <button onClick={() => removeDoc(doc)} className="ml-0.5 text-emerald-400/50 hover:text-red-400 transition-colors">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {editing && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newDoc}
                  onChange={e => setNewDoc(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDoc() } }}
                  className="flex-1 bg-white/5 rounded-xl px-3 h-9 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all"
                  placeholder="Ajouter un document..."
                />
                <button
                  onClick={addDoc}
                  disabled={!newDoc.trim()}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-zyvo-muted" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account info */}
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
          onClick={() => { logout() }}
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
    </div>
  )
}