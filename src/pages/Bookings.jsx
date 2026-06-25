import { useState } from 'react'
import { Calendar, Clock, MapPin, Search, XCircle, Star, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBookings } from '../context/booking'
import { useToast } from '../context/toast'

export default function Bookings() {
  const { bookings, cancelBooking } = useBookings()
  const [selectedTab, setSelectedTab] = useState('active')
  const [reviewingId, setReviewingId] = useState(null)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const toast = useToast()

  const activeBookings = bookings.filter(b => b.status !== 'Annulée')
  const completedBookings = bookings.filter(b => b.status === 'Annulée')

  const submitReview = (booking) => {
    if (reviewRating === 0 || reviewText.trim().length < 5) {
      if (toast) toast('Avis incomplet', { message: 'Donnez une note et écrivez un commentaire', type: 'warning' })
      return
    }
    if (toast) toast('Avis publié !', { message: `Merci pour votre retour sur ${booking.providerName}`, type: 'success' })
    setReviewingId(null)
    setReviewRating(0)
    setReviewText('')
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold">Mes réservations</h2>

      {/* TABS */}
      <div className="flex gap-1 glass-premium rounded-xl p-1 mt-4">
        <button
          onClick={() => setSelectedTab('active')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            selectedTab === 'active' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'
          }`}
        >
          Actives ({activeBookings.length})
        </button>
        <button
          onClick={() => setSelectedTab('completed')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            selectedTab === 'completed' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'
          }`}
        >
          Terminées ({completedBookings.length})
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-zyvo-muted/40" strokeWidth={1} />
          </div>
          <h3 className="text-lg font-bold text-white">Aucune réservation</h3>
          <p className="text-sm text-zyvo-muted mt-2 max-w-xs mx-auto">
            Vous n'avez encore rien réservé. Parcourez les services disponibles et trouvez le pro qu'il vous faut.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 mt-6 glow-worm"
          >
            <Search className="w-4 h-4" /> Trouver un service
          </Link>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {(selectedTab === 'active' ? activeBookings : completedBookings).map((b) => (
            <div key={b.id} className="glass-premium rounded-2xl p-4 card-hover">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-sm font-bold text-white">
                  {b.providerInitial || b.providerName?.charAt(0) || '?'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">{b.providerName}</h4>
                    <span className={`text-[10px] font-bold ${b.status === 'Annulée' ? 'text-red-400' : b.statusColor || 'text-zyvo-success'}`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-zyvo-muted mt-0.5">{b.providerService}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-xs text-zyvo-muted">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{b.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Alger</span>
              </div>
              {b.price && (
                <div className="mt-2 text-xs">
                  <span className="text-zyvo-muted">Prix : </span>
                  <span className="font-bold text-white">{b.price}</span>
                </div>
              )}

              {/* REVIEW BUTTON FOR COMPLETED */}
              {b.status === 'Annulée' && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  {reviewingId === b.id ? (
                    <div className="space-y-3">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => setReviewRating(star)}>
                            <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-zyvo-gold text-zyvo-gold' : 'text-zyvo-muted/30'}`} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Partagez votre expérience..."
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none focus:border-zyvo-gold/40 resize-none"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => submitReview(b)} className="gradient-brand text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> Publier
                        </button>
                        <button onClick={() => { setReviewingId(null); setReviewRating(0); setReviewText('') }} className="text-xs text-zyvo-muted hover:text-white px-3">Annuler</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReviewingId(b.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-zyvo-gold hover:text-zyvo-gold/80 transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" /> Donner mon avis
                    </button>
                  )}
                </div>
              )}

              {/* CANCEL BUTTON */}
              {b.status !== 'Annulée' && (
                <button
                  onClick={() => cancelBooking(b.id)}
                  className="mt-3 flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" /> Annuler
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
