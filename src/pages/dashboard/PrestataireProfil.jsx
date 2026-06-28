import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Star, Heart, MapPin, ChevronLeft, MessageCircle, 
  Calendar, Share2, ThumbsUp, Clock, Award, Users, 
  CheckCircle, BadgeCheck, Camera, Check
} from 'lucide-react'
import { useFavorites } from '../../context/favorites'
import { useToast } from '../../context/toast'
import { getProvider, getReviews } from '../../lib/supabase'
import BookingModal from '../../components/dashboard/BookingModal'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { useLoading } from '../../hooks/useLoading'
import { ProfileCardSkeleton } from '../../components/dashboard/Skeleton'

export default function PrestataireProfil() {
  const { id } = useParams()
  const [provider, setProvider] = useState(null)
  const [providerReviews, setProviderReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const { isFavorite, toggleFavorite } = useFavorites()
  const addToast = useToast()
  const { addView } = useRecentlyViewed()
  const skeletonLoading = useLoading(400)
  const [showBooking, setShowBooking] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return
    getProvider(Number(id)).then(p => {
      setProvider(p)
      if (p) addView(p)
    }).finally(() => setLoading(false))
    getReviews(Number(id)).then(r => setProviderReviews(r || [])).catch(() => {})
  }, [id])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      addToast('Lien copié !', { message: 'Profil partagé', type: 'success' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      addToast('Erreur', { message: 'Impossible de copier le lien', type: 'error' })
    }
  }

  const handleToggleFav = () => {
    toggleFavorite(provider)
    if (!isFavorite(provider.id)) {
      addToast('Ajouté aux favoris ❤️', { message: provider.name, type: 'success' })
    }
  }
  const [showReviewForm, setShowReviewForm] = useState(false)

  if (loading || skeletonLoading) return <ProfileCardSkeleton />
  if (!provider) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-bold text-white">Prestataire introuvable</p>
        <Link to="/dashboard/client/explorer" className="text-zyvo-gold text-sm mt-2 inline-block">Retour à l'explorateur</Link>
      </div>
    )
  }

  const stats = [
    { icon: Star, label: 'Note', value: provider.rating.toString(), color: 'text-amber-400' },
    { icon: Award, label: 'Missions', value: provider.missions.toString(), color: 'text-blue-400' },
    { icon: Clock, label: 'Réponse', value: provider.responseTime, color: 'text-emerald-400' },
    { icon: Users, label: 'Likes', value: provider.likes.toString(), color: 'text-pink-400' },
  ]

  const fav = isFavorite(provider.id)

  const handleSubmitReview = () => {
    if (newRating === 0 || !newComment.trim()) return
    addToast('Avis publié ! ⭐', { message: 'Merci pour votre retour', type: 'success' })
    setNewRating(0)
    setNewComment('')
    setShowReviewForm(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Back */}
      <Link
        to="/dashboard/client/explorer"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zyvo-muted hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Retour aux résultats
      </Link>

      {/* Cover + Avatar */}
      <div className={`h-28 sm:h-48 rounded-2xl bg-gradient-to-br ${provider.coverGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-end gap-4">
          <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${provider.coverGradient} flex items-center justify-center text-lg sm:text-2xl font-bold text-white shadow-lg border-2 sm:border-4 border-zyvo-dark shrink-0`}>
            {provider.name.charAt(0)}
          </div>
          <div className="pb-1">
            <h1 className="text-lg sm:text-2xl font-extrabold text-white">{provider.name}</h1>
            <p className="text-xs sm:text-sm text-white/80">{provider.service} · {provider.city}</p>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={handleToggleFav}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            fav
              ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
              : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${fav ? 'fill-pink-400' : ''}`} strokeWidth={1.5} />
          {fav ? 'Favori' : 'Ajouter aux favoris'}
        </button>
        <button onClick={() => setShowBooking(true)} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30 text-xs sm:text-sm font-bold hover:bg-zyvo-gold/30 transition-all">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Réserver
        </button>
        <Link to={`/dashboard/client/messages`} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-bold transition-all">
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Contacter
        </Link>
        <button onClick={handleShare} className="ml-auto p-2 sm:p-2.5 rounded-xl bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 transition-all">
          {copied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass-premium rounded-2xl p-3 sm:p-4 text-center card-hover">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color} mx-auto mb-1`} strokeWidth={1.5} />
            <p className="text-lg sm:text-xl font-extrabold text-white">{value}</p>
            <p className="text-[10px] sm:text-xs text-zyvo-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="glass-premium rounded-2xl p-4 sm:p-6">
        <h2 className="font-extrabold text-sm sm:text-base mb-2">À propos</h2>
        <p className="text-xs sm:text-sm text-zyvo-muted leading-relaxed">{provider.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {provider.badges.map(b => (
            <span key={b} className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg bg-white/5 text-[10px] sm:text-xs font-semibold text-emerald-400">
              <BadgeCheck className="w-3 h-3" /> {b}
            </span>
          ))}
        </div>
        {provider.verifiedDocuments?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-[10px] sm:text-xs font-semibold text-zyvo-muted uppercase tracking-wider mb-2">Documents vérifiés</p>
            <div className="flex flex-wrap gap-2">
              {provider.verifiedDocuments.map(d => (
                <span key={d} className="flex items-center gap-1 text-[10px] sm:text-xs text-zyvo-muted">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="glass-premium rounded-2xl p-4 sm:p-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-zyvo-muted">Tarif</p>
          <p className="text-lg sm:text-xl font-extrabold text-white">{provider.price}</p>
        </div>
        <span className={`text-xs font-bold ${provider.responseRate === '100%' ? 'text-emerald-400' : 'text-zyvo-muted'}`}>
          Réponse {provider.responseRate}
        </span>
      </div>

      {/* Gallery */}
      <div className="glass-premium rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Camera className="w-4 h-4 text-zyvo-gold" />
          <h2 className="font-extrabold text-sm sm:text-base">Galerie</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {provider.gallery.map((g, i) => (
            <div key={i} className={`${g} h-16 sm:h-24 rounded-xl flex items-center justify-center`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="glass-premium rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h2 className="font-extrabold text-sm sm:text-base">
              Avis ({providerReviews.length})
            </h2>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-xs font-semibold text-zyvo-gold hover:underline"
          >
            {showReviewForm ? 'Annuler' : 'Donner mon avis'}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-4 p-3 sm:p-4 rounded-xl bg-white/5 space-y-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-all"
                >
                  <Star
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      star <= (hoverRating || newRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zyvo-muted'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Partagez votre expérience..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors resize-none"
            />
            <button
              onClick={handleSubmitReview}
              disabled={newRating === 0 || !newComment.trim()}
              className="w-full gradient-brand text-white font-bold py-2 rounded-xl text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Publier mon avis
            </button>
          </div>
        )}

        {/* Reviews list */}
        <div className="space-y-3 sm:space-y-4">
          {providerReviews.map((review) => (
            <div key={review.id} className="p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-zyvo-gold/20 to-zyvo-gold/10 flex items-center justify-center text-[9px] sm:text-xs font-bold text-zyvo-gold shrink-0">
                  {review.client?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs sm:text-sm text-white truncate">{review.client?.name || 'Utilisateur'}</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-zyvo-muted/30'}`} strokeWidth={1.5} />
                    ))}
                  </div>
                </div>
                <span className="text-[9px] sm:text-xs text-zyvo-muted shrink-0">
                  {review.created_at ? new Date(review.created_at).toLocaleDateString('fr-FR') : ''}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zyvo-muted leading-relaxed">{review.comment}</p>
              <div className="flex items-center gap-3 mt-2">
                <button className="flex items-center gap-1 text-[10px] sm:text-xs text-zyvo-muted hover:text-white transition-colors">
                  <ThumbsUp className="w-3 h-3" /> {review.likes || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingModal provider={provider} open={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  )
}
