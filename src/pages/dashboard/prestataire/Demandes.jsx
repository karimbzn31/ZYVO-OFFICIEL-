import { useState, useMemo, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText, MapPin, Clock, ChevronDown, Check, X, MessageCircle,
  AlertCircle, Search, Filter, DollarSign
} from 'lucide-react'
import { getQuotes, respondToQuote } from '../../../lib/supabase'
import { useLoading } from '../../../hooks/useLoading'
import { ListSkeleton } from '../../../components/dashboard/Skeleton'

const urgencyConfig = {
  urgent: { label: 'Urgent', class: 'bg-red-500/20 text-red-300' },
  cette_semaine: { label: 'Cette semaine', class: 'bg-amber-500/20 text-amber-300' },
  ce_mois: { label: 'Ce mois', class: 'bg-blue-500/20 text-blue-300' },
  normal: { label: 'Normal', class: 'bg-emerald-500/20 text-emerald-300' },
}

export default function ProviderDemandes() {
  const { provider } = useOutletContext()
  const loading = useLoading(350)
  const [filter, setFilter] = useState('all')
  const [responding, setResponding] = useState(null)
  const [responsePrice, setResponsePrice] = useState('')
  const [responseMsg, setResponseMsg] = useState('')
  const [allQuotes, setAllQuotes] = useState([])
  const [fetching, setFetching] = useState(true)
  const [respondError, setRespondError] = useState('')

  useEffect(() => {
    if (!provider) return
    setFetching(true)
    getQuotes({ category: provider.category })
      .then(data => setAllQuotes(data || []))
      .catch(() => setAllQuotes([]))
      .finally(() => setFetching(false))
  }, [provider])

  const myQuotes = useMemo(() => {
    if (!provider) return []
    return allQuotes
  }, [allQuotes, provider])

  const filtered = useMemo(() => {
    if (filter === 'pending') return myQuotes.filter(q => q.status === 'Ouvert')
    if (filter === 'answered') return myQuotes.filter(q => q.status === 'Répondu')
    return myQuotes
  }, [myQuotes, filter])

  const handleRespond = async (quoteId) => {
    if (!responsePrice.trim()) return
    setRespondError('')
    try {
      await respondToQuote(quoteId, provider.id, responsePrice.trim(), responseMsg.trim())
      setAllQuotes(prev => prev.map(q =>
        q.id === quoteId ? { ...q, status: 'Répondu' } : q
      ))
      setResponding(null)
      setResponsePrice('')
      setResponseMsg('')
    } catch (err) {
      setRespondError(err.message || 'Erreur lors de l\'envoi')
    }
  }

  if (loading || fetching) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-32 rounded bg-white/5 animate-pulse" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="h-8 w-20 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
        <ListSkeleton count={4} />
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
        <p className="font-bold text-white">Profil introuvable</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold">Demandes <span className="gradient-text-brand">de devis</span></h1>
        <p className="text-xs text-zyvo-muted mt-0.5">{filtered.length} demande{filtered.length !== 1 ? 's' : ''} correspondante{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {respondError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-xs text-red-300">{respondError}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'pending', label: 'Ouvertes' },
          { key: 'answered', label: 'Répondues' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === f.key
                ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-10 h-10 text-zyvo-muted/20 mx-auto mb-3" />
          <p className="font-bold text-white">Aucune demande</p>
          <p className="text-xs text-zyvo-muted mt-1">Aucune demande de devis pour le moment</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="glass-premium rounded-2xl p-4 card-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm text-white truncate">{q.description?.split('.')[0] || 'Demande de devis'}</h3>
                    {q.urgency && q.urgency !== 'normal' && (
                      <span className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${(urgencyConfig[q.urgency] || urgencyConfig.normal).class}`}>
                        {(urgencyConfig[q.urgency] || urgencyConfig.normal).label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zyvo-muted line-clamp-2 mb-2">{q.description}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-zyvo-muted">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {q.city}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <DollarSign className="w-3 h-3" /> {q.budget}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" /> {new Date(q.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    q.status === 'Ouvert' ? 'text-amber-400 bg-amber-500/10' :
                    q.status === 'Répondu' ? 'text-emerald-400 bg-emerald-500/10' :
                    'text-red-400 bg-red-500/10'
                  }`}>
                    {q.status}
                  </span>
                </div>
              </div>

              {/* Responses preview */}
              {q.responses && q.responses.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-[10px] font-semibold text-zyvo-muted mb-2">
                    {q.responses.length} réponse{q.responses.length > 1 ? 's' : ''}
                  </p>
                  {q.responses.map(r => (
                    <div key={r.id} className="flex items-center gap-2 text-xs text-zyvo-muted mb-1">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-zyvo-gold to-amber-400 flex items-center justify-center text-[9px] font-bold text-white">
                        P
                      </div>
                      <span className="font-semibold text-white">Prestataire #{r.provider_id}</span>
                      <span className="text-white/20">·</span>
                      <span className="font-semibold text-emerald-400">{r.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Respond button */}
              {q.status === 'Ouvert' && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  {responding === q.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Votre prix (ex: 3500 DA)"
                        value={responsePrice}
                        onChange={e => setResponsePrice(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors"
                      />
                      <textarea
                        placeholder="Votre message au client..."
                        value={responseMsg}
                        onChange={e => setResponseMsg(e.target.value)}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-zyvo-gold/40 transition-colors resize-none"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleRespond(q.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/30 transition-all">
                          <Check className="w-3.5 h-3.5" /> Envoyer
                        </button>
                        <button onClick={() => setResponding(null)} className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 text-zyvo-muted text-xs font-bold hover:bg-white/10 transition-all px-4">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setResponding(q.id); setResponsePrice(''); setResponseMsg('') }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zyvo-gold/10 text-zyvo-gold text-xs font-bold hover:bg-zyvo-gold/20 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Répondre à cette demande
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}
