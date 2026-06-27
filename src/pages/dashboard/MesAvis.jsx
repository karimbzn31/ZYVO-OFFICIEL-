import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, Edit3, Trash2, MessageCircle } from 'lucide-react'
import { userReviews } from '../../data/dashboardData'

export default function MesAvis() {
  const [reviews, setReviews] = useState(userReviews)

  const handleDelete = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
        <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">avis</span></h1>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-16">
          <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-zyvo-muted/20 mx-auto mb-4" strokeWidth={1} />
          <p className="font-bold text-white text-lg">Aucun avis pour le moment</p>
          <p className="text-sm text-zyvo-muted mt-1">Après une réservation, donnez votre avis sur le prestataire</p>
      </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="glass-premium rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Link to={`/dashboard/client/prestataire/${review.providerId}`}>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${
                      ['from-blue-500 to-cyan-400','from-purple-500 to-pink-400','from-amber-500 to-orange-400','from-emerald-500 to-teal-400','from-indigo-500 to-purple-400','from-rose-500 to-pink-400','from-lime-500 to-emerald-400','from-pink-500 to-fuchsia-400','from-orange-500 to-amber-400','from-indigo-500 to-violet-400','from-cyan-500 to-teal-400','from-rose-500 to-fuchsia-400'][review.providerId - 1] || 'from-blue-500 to-cyan-400'
                    } flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-lg shrink-0`}>
                      {review.providerName.charAt(0)}
                    </div>
                  </Link>
                  <div>
                    <Link to={`/dashboard/client/prestataire/${review.providerId}`} className="font-bold text-sm sm:text-base text-white hover:text-zyvo-gold transition-colors">
                      {review.providerName}
                    </Link>
                    <p className="text-[10px] sm:text-xs text-zyvo-muted">{review.service}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-zyvo-muted/30'}`} strokeWidth={1.5} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button className="p-1.5 sm:p-2 rounded-lg bg-white/5 text-zyvo-muted hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                    <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/5 text-zyvo-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zyvo-muted leading-relaxed">{review.comment}</p>

              <div className="flex items-center gap-3 mt-3 text-[10px] sm:text-xs text-zyvo-muted">
                <span>{review.date}</span>
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {review.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
