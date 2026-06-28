import { useState, useMemo, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star, ThumbsUp, MessageCircle, Calendar, ChevronDown, Filter,
  AlertCircle, TrendingUp, BarChart3
} from 'lucide-react'
import { getReviews } from '../../../lib/supabase'
import { useLoading } from '../../../hooks/useLoading'
import { ListSkeleton } from '../../../components/dashboard/Skeleton'

export default function ProviderAvis() {
  const { provider } = useOutletContext()
  const loading = useLoading(350)
  const [sortBy, setSortBy] = useState('recent')
  const [myReviews, setMyReviews] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!provider) return
    setFetching(true)
    getReviews(provider.id, { sort: sortBy })
      .then(data => setMyReviews(data || []))
      .catch(() => setMyReviews([]))
      .finally(() => setFetching(false))
  }, [provider, sortBy])

  const avgRating = myReviews.length > 0
    ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
    : provider?.rating?.toFixed(1) || '0.0'

  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    myReviews.forEach(r => { if (dist[r.rating] !== undefined) dist[r.rating]++ })
    return dist
  }, [myReviews])

  const totalLikes = myReviews.reduce((sum, r) => sum + (r.likes || 0), 0)

  if (loading || fetching) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-32 rounded bg-white/5 animate-pulse" />
        <div className="h-32 rounded-2xl bg-white/5 animate-pulse" />
        <ListSkeleton count={3} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">avis</span></h1>
        <p className="text-xs text-zyvo-muted mt-0.5">{myReviews.length} avis reçus</p>
      </div>

      {/* Rating summary */}
      <div className="glass-premium rounded-2xl p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-amber-400">{avgRating}</p>
            <div className="flex items-center gap-0.5 mt-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-3 h-3 ${i <= Math.round(parseFloat(avgRating)) ? 'text-amber-400 fill-amber-400' : 'text-zyvo-muted/30'}`} strokeWidth={0} />
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-1">
            {[5,4,3,2,1].map(star => {
              const count = ratingDistribution[star] || 0
              const pct = myReviews.length > 0 ? (count / myReviews.length) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-2 text-[10px]">
                  <span className="w-3 text-zyvo-muted font-semibold">{star}</span>
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" strokeWidth={0} />
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-zyvo-gold transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-4 text-right text-zyvo-muted">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
          <div className="text-center">
            <p className="text-lg font-bold text-white">{totalLikes}</p>
            <p className="text-[10px] text-zyvo-muted">J'aime reçus</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{myReviews.length}</p>
            <p className="text-[10px] text-zyvo-muted">Avis clients</p>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-zyvo-muted" />
        {[
          { key: 'recent', label: 'Récents' },
          { key: 'best', label: 'Meilleurs' },
          { key: 'worst', label: 'Moins bons' },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
              sortBy === s.key ? 'bg-zyvo-gold/20 text-zyvo-gold' : 'bg-white/5 text-zyvo-muted hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      {myReviews.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-10 h-10 text-zyvo-muted/20 mx-auto mb-3" />
          <p className="font-bold text-white">Aucun avis pour le moment</p>
          <p className="text-xs text-zyvo-muted mt-1">Les avis clients apparaîtront ici</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myReviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="glass-premium rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {r.client?.name?.[0] || r.client_id?.[0] || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-sm text-white">{r.client?.name || 'Client'}</p>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-2.5 h-2.5 ${i <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-zyvo-muted/30'}`} strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zyvo-muted mt-1">{r.comment}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-zyvo-muted/60">
                    <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" /> {new Date(r.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="flex items-center gap-0.5"><ThumbsUp className="w-3 h-3" /> {r.likes || 0}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}
