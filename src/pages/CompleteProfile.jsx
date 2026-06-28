import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Sparkles, ArrowRight, ChevronDown, Briefcase } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/auth'
import { useToast } from '../context/toast'

const algerianCities = [
  'Alger', 'Oran', 'Constantine', 'Blida', 'Annaba', 'Tizi Ouzou',
  'Sétif', 'Batna', 'Djelfa', 'Sidi Bel Abbès', 'Biskra', 'Tlemcen',
  'Béjaïa', 'Bordj Bou Arreridj', 'Chlef', 'Médéa', 'Mostaganem', 'Ain Oulmene'
]

export default function CompleteProfile() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [role, setRole] = useState('client')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !phone.trim() || !city) {
      setError('Veuillez remplir tous les champs')
      return
    }
    if (!user) {
      setError('Session expirée, reconnectez-vous')
      return
    }
    setSubmitting(true)
    try {
      const { error: uErr } = await supabase.from('users').insert({
        id: user.id,
        name: name.trim(),
        phone,
        email: user.email || '',
        city,
        role,
      }).select().single()
      if (uErr) throw uErr

      if (role === 'prestataire') {
        const { error: pErr } = await supabase.from('providers').insert({
          user_id: user.id,
          name: name.trim(),
          city,
          service: 'Mon service',
          category: '',
          cover_gradient: 'from-blue-600 via-blue-500 to-cyan-400',
        }).select().single()
        if (pErr) throw pErr
      }

      addToast('Profil complété', { message: 'Bienvenue sur Zyvo !', type: 'success' })
      navigate('/dashboard/' + (role === 'prestataire' ? 'prestataire' : 'client'))
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="py-8 max-w-sm mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold">Finaliser mon profil</h1>
        <p className="text-sm text-zyvo-muted mt-1">Encore quelques informations</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Email</label>
          <div className="flex items-center gap-2 glass-premium rounded-xl px-4 h-12 border border-white/10">
            <Mail className="w-4 h-4 text-zyvo-muted shrink-0" />
            <span className="text-sm font-semibold text-white/60">{user?.email || 'Non disponible'}</span>
          </div>
        </div>

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
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full bg-transparent outline-none text-sm font-semibold text-white"
              required
            >
              <option value="" disabled>Sélectionnez votre ville</option>
              {algerianCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zyvo-muted mb-1.5 block">Je veux</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('client')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                role === 'client'
                  ? 'bg-zyvo-gold/15 border-zyvo-gold/30 text-zyvo-gold'
                  : 'bg-white/5 border-white/10 text-zyvo-muted hover:text-white'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-bold">Client</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('prestataire')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                role === 'prestataire'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-white/5 border-white/10 text-zyvo-muted hover:text-white'
              }`}
            >
              <Briefcase className="w-6 h-6" />
              <span className="text-xs font-bold">Prestataire</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {submitting ? 'Enregistrement...' : 'Terminer'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}