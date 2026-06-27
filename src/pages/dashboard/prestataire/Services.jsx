import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Briefcase, Plus, Pencil, Trash2, Star, DollarSign, MapPin, Clock,
  Eye, ToggleLeft, ToggleRight, AlertCircle, Check
} from 'lucide-react'
import { useLoading } from '../../../hooks/useLoading'

const categories = [
  'Plomberie', 'Électricité', 'Ménage', 'Coiffure', 'Cours',
  'Santé', 'Déménagement', 'Jardinage', 'Développement', 'Design',
]

export default function ProviderServices() {
  const { provider } = useOutletContext()
  const loading = useLoading(300)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [services, setServices] = useState(() => {
    const initial = provider ? [{
      id: provider.id,
      name: provider.service,
      category: provider.category,
      price: provider.price,
      description: provider.description,
      city: provider.city,
      active: true,
    }] : []
    return initial
  })

  const toggleService = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
  }

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 rounded bg-white/5 animate-pulse" />
          <div className="h-8 w-28 rounded-xl bg-white/5 animate-pulse" />
        </div>
        {[1,2].map(i => <div key={i} className="h-28 rounded-2xl bg-white/5 animate-pulse" />)}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">services</span></h1>
          <p className="text-xs text-zyvo-muted mt-0.5">{services.length} service{services.length !== 1 ? 's' : ''} proposé{services.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zyvo-gold/15 text-zyvo-gold text-xs font-bold hover:bg-zyvo-gold/25 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Ajouter
        </button>
      </div>

      {/* Service list */}
      {services.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="w-10 h-10 text-zyvo-muted/20 mx-auto mb-3" />
          <p className="font-bold text-white">Aucun service</p>
          <p className="text-xs text-zyvo-muted mt-1">Ajoutez votre premier service</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={`glass-premium rounded-2xl p-4 card-hover ${!s.active ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white truncate">{s.name}</h3>
                    <span className="shrink-0 text-[9px] font-semibold text-zyvo-muted bg-white/5 px-1.5 py-0.5 rounded-md">{s.category}</span>
                  </div>
                  <p className="text-xs text-zyvo-muted line-clamp-2 mt-1">{s.description}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-zyvo-muted">
                    <span className="flex items-center gap-0.5"><DollarSign className="w-3 h-3" /> {s.price}</span>
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {s.city}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleService(s.id)}
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-all"
                    title={s.active ? 'Désactiver' : 'Activer'}
                  >
                    {s.active ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-zyvo-muted" />}
                  </button>
                  <button onClick={() => deleteService(s.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all" title="Supprimer">
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowForm(false)}>
          <div className="glass-premium rounded-2xl p-5 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-white text-lg mb-4">Nouveau service</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Nom du service" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors" />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer">
                <option value="">Catégorie</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="text" placeholder="Prix (ex: 2000 DA/h)" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors" />
              <textarea placeholder="Description de votre service..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors resize-none" />
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2.5 rounded-xl bg-zyvo-gold/15 text-zyvo-gold text-xs font-bold hover:bg-zyvo-gold/25 transition-all">
                  <Check className="w-3.5 h-3.5 inline mr-1" /> Ajouter
                </button>
                <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-white/5 text-zyvo-muted text-xs font-bold hover:bg-white/10 transition-all">Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}
