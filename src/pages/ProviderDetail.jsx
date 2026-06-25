import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, ShieldCheck, MapPin, Calendar, Award, ChevronRight, CheckCircle, Clock, Heart, MessageCircle, Phone, Users, Briefcase, Image as ImageIcon, ThumbsUp } from 'lucide-react'
import { providers } from '../data/mockData'
import { useAuth } from '../context/auth'
import { useBookings } from '../context/booking'
import { useToast } from '../context/toast'
import { useFavorites } from '../context/favorites'

const serviceGradients = {
  'Plombier': 'from-blue-500 to-cyan-400',
  'Aide': 'from-purple-500 to-pink-400',
  'Électricien': 'from-amber-500 to-orange-400',
  'Coiffeuse': 'from-emerald-500 to-teal-400',
}

function getGradient(service) {
  const key = Object.keys(serviceGradients).find(k => service.includes(k))
  return serviceGradients[key] || 'from-zyvo-primary to-zyvo-accent'
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00',
]

function getNextDays(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })
}

function formatDate(d) {
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  const months = ['janv', 'fév', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc']
  return { day: days[d.getDay()], date: d.getDate(), month: months[d.getMonth()], full: `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}` }
}

const galleryImages = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
]

const existingReviews = [
  { id: 1, name: 'Sarah K.', initial: 'S', gradient: 'from-blue-500 to-cyan-400', rating: 5, text: 'Excellent service ! Professionnel, ponctuel et très compétent. Je recommande vivement.', time: 'Il y a 2 semaines' },
  { id: 2, name: 'Mohamed L.', initial: 'M', gradient: 'from-purple-500 to-pink-400', rating: 5, text: 'Très satisfait du travail. Prix correct et travail bien fait. Je ferai appel à nouveau.', time: 'Il y a 1 mois' },
  { id: 3, name: 'Amina R.', initial: 'A', gradient: 'from-amber-500 to-orange-400', rating: 4, text: 'Bon travail dans l\'ensemble. Un peu de retard mais le résultat était au rendez-vous.', time: 'Il y a 3 semaines' },
]

export default function ProviderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addBooking } = useBookings()
  const toast = useToast()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookingStep, setBookingStep] = useState('idle')
  const [activeTab, setActiveTab] = useState('about')
  const [showGallery, setShowGallery] = useState(false)

  // review form
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewHover, setReviewHover] = useState(0)
  const [reviews, setReviews] = useState(existingReviews)

  const provider = providers.find(p => p.name.toLowerCase().replace(/[\s.]+/g, '-') === id)

  if (!provider) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-zyvo-muted" />
        </div>
        <h2 className="text-xl font-extrabold">Prestataire introuvable</h2>
        <p className="text-sm text-zyvo-muted mt-1">Ce prestataire n'existe pas ou a été retiré.</p>
        <Link to="/search" className="inline-flex items-center gap-2 mt-6 text-zyvo-gold font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Retour à la recherche
        </Link>
      </div>
    )
  }

  const gradient = getGradient(provider.service)
  const days = getNextDays(7)
  const fav = isFavorite(provider.id)

  const handleBook = () => {
    if (!user) {
      navigate('/auth')
      return
    }
    setBookingStep('date')
  }

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) return

    const dateObj = days[selectedDate]
    const formatted = formatDate(dateObj)

    addBooking({
      userPhone: user.phone,
      userRole: user.role,
      providerId: provider.id,
      providerName: provider.name,
      providerService: provider.service,
      providerInitial: provider.name.charAt(0),
      date: formatted.full,
      time: timeSlots[selectedTime],
      price: provider.price,
    })

    if (toast) toast('Réservation confirmée !', { message: `Avec ${provider.name} le ${formatted.full} à ${timeSlots[selectedTime]}`, type: 'success' })
    setBookingStep('confirmed')
  }

  const submitReview = () => {
    if (reviewRating === 0 || reviewText.trim().length < 5) {
      if (toast) toast('Avis incomplet', { message: 'Donnez une note et écrivez un commentaire (min 5 caractères)', type: 'warning' })
      return
    }

    const newReview = {
      id: Date.now(),
      name: user?.name || 'Anonyme',
      initial: (user?.name || 'A').charAt(0),
      gradient: 'from-zyvo-primary to-zyvo-accent',
      rating: reviewRating,
      text: reviewText,
      time: 'À l\'instant',
    }

    setReviews(prev => [newReview, ...prev])
    setShowReviewForm(false)
    setReviewRating(0)
    setReviewText('')

    if (toast) toast('Avis publié !', { message: 'Merci pour votre retour sur ' + provider.name, type: 'success' })
  }

  const tabs = [
    { key: 'about', label: 'À propos' },
    { key: 'reviews', label: `Avis (${reviews.length})` },
    { key: 'photos', label: 'Photos' },
  ]

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <Link to="/search" className="inline-flex items-center gap-1 text-sm text-zyvo-muted hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Retour
      </Link>

      {/* PROFILE HEADER */}
      <div className="glass-premium rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-10`} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0`}>
            {provider.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold">{provider.name}</h1>
                <p className="text-zyvo-muted mt-1">{provider.service}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zyvo-muted">À partir de</span>
                <p className="text-xl font-extrabold gradient-text">{provider.price}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" /> {provider.rating}
              </span>
              <span className="text-zyvo-muted">({provider.missions} missions)</span>
              {provider.badges.includes('Vérifié') && (
                <span className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> Vérifié
                </span>
              )}
              {provider.badges.includes('Top') && (
                <span className="flex items-center gap-1 text-zyvo-gold font-bold text-xs bg-zyvo-gold/10 px-3 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5" /> Top prestataire
                </span>
              )}
              {provider.badges.includes('Recommandé') && (
                <span className="flex items-center gap-1 text-blue-400 font-bold text-xs bg-blue-500/10 px-3 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Recommandé
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zyvo-muted mt-3">
              <MapPin className="w-3.5 h-3.5 text-zyvo-gold" /> {provider.city}, Algérie
            </div>

            {/* QUICK STATS */}
            <div className="flex flex-wrap gap-4 mt-4 text-xs">
              <span className="flex items-center gap-1.5 text-zyvo-muted">
                <Users className="w-3.5 h-3.5" /> {provider.missions}+ clients
              </span>
              <span className="flex items-center gap-1.5 text-zyvo-muted">
                <Briefcase className="w-3.5 h-3.5" /> Membre depuis 2025
              </span>
              <span className="flex items-center gap-1.5 text-zyvo-muted">
                <Clock className="w-3.5 h-3.5" /> Réponse {'<'} 30 min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 glass-premium rounded-xl p-1 mt-6 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.key ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: ABOUT */}
      {activeTab === 'about' && (
        <>
          <div className="glass-premium rounded-2xl p-6 mt-6">
            <h3 className="font-bold text-lg mb-3">À propos</h3>
            <p className="text-sm text-zyvo-muted leading-relaxed">
              {provider.description} Avec <strong className="text-white">{provider.missions} missions</strong> réalisées
              avec succès, {provider.name} s'engage à fournir un service de qualité supérieure
              avec ponctualité et professionnalisme. Noté <strong className="text-amber-400">{provider.rating}/5</strong> par ses clients.
            </p>
            <p className="text-sm text-zyvo-muted leading-relaxed mt-3">
              Spécialisé dans {provider.service.toLowerCase()}, {provider.name} intervient dans toute la région de {provider.city} et ses alentours. Devis gratuit, déplacement inclus.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { label: 'Missions', value: `${provider.missions}+`, icon: Briefcase },
                { label: 'Note', value: `${provider.rating}/5`, icon: Star },
                { label: 'Membre depuis', value: '2025', icon: Calendar },
                { label: 'Taux de réponse', value: '< 30 min', icon: Clock },
              ].map((stat) => (
                <div key={stat.label} className="glass-premium-light rounded-xl p-3 text-center">
                  <stat.icon className="w-4 h-4 text-zyvo-gold mx-auto mb-1" strokeWidth={1.5} />
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-zyvo-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BOOKING FLOW */}
          {bookingStep === 'idle' && (
            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              <button
                onClick={handleBook}
                className="gradient-brand text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 glow-worm sm:col-span-2"
              >
                <Calendar className="w-5 h-5" /> Réserver maintenant
              </button>
              <button
                onClick={() => toggleFavorite(provider)}
                className={`glass-premium text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  fav ? 'bg-pink-500/10 border-pink-500/30' : 'hover:bg-white/10'
                }`}
              >
                <Heart className={`w-5 h-5 ${fav ? 'fill-pink-400 text-pink-400' : ''}`} />
                {fav ? 'Favori' : 'Favoris'}
              </button>
            </div>
          )}

          {bookingStep === 'date' && (
            <div className="glass-premium rounded-2xl p-6 mt-6">
              <h3 className="font-bold text-lg mb-4">Choisissez une date</h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {days.map((d, i) => {
                  const f = formatDate(d)
                  const selected = selectedDate === i
                  return (
                    <button
                      key={i}
                      onClick={() => { setSelectedDate(i); setSelectedTime(null) }}
                      className={`flex-shrink-0 w-16 p-3 rounded-xl text-center transition-all border ${
                        selected
                          ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white'
                          : 'glass-premium-light border-transparent text-zyvo-muted hover:text-white'
                      }`}
                    >
                      <div className="text-[10px] font-semibold">{f.day}</div>
                      <div className="text-lg font-extrabold mt-0.5">{f.date}</div>
                      <div className="text-[10px] mt-0.5">{f.month}</div>
                    </button>
                  )
                })}
              </div>

              {selectedDate !== null && (
                <>
                  <h4 className="font-bold text-sm mt-5 mb-3">Créneau horaire</h4>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((t, i) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(i)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedTime === i
                            ? 'bg-zyvo-gold/10 border-zyvo-gold/30 text-white'
                            : 'glass-premium-light border-transparent text-zyvo-muted hover:text-white'
                        }`}
                      >
                        <Clock className="w-3 h-3" /> {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={confirmBooking}
                      disabled={selectedTime === null}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        selectedTime !== null
                          ? 'gradient-brand text-white shadow-lg hover:scale-[1.02] glow-worm'
                          : 'bg-white/5 text-zyvo-muted cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" /> Confirmer la réservation
                    </button>
                    <button
                      onClick={() => setBookingStep('idle')}
                      className="px-4 py-3 rounded-xl text-sm font-semibold text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
                    >
                      Annuler
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {bookingStep === 'confirmed' && (
            <div className="glass-premium rounded-2xl p-8 mt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-extrabold">Réservation confirmée !</h3>
              <p className="text-sm text-zyvo-muted mt-2">
                Rendez-vous avec <strong className="text-white">{provider.name}</strong> le{' '}
                <strong className="text-white">{selectedDate !== null ? formatDate(days[selectedDate]).full : ''}</strong> à{' '}
                <strong className="text-white">{selectedTime !== null ? timeSlots[selectedTime] : ''}</strong>
              </p>
              <p className="text-xs text-zyvo-muted mt-1">
                Prix : <strong className="text-white">{provider.price}</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Link
                  to="/bookings"
                  className="gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Voir mes réservations
                </Link>
                <button
                  onClick={() => setBookingStep('idle')}
                  className="text-sm font-semibold text-zyvo-muted hover:text-white transition-colors px-4 py-3"
                >
                  Retour au profil
                </button>
              </div>
            </div>
          )}

          {/* CONTACT OPTIONS */}
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <button className="glass-premium rounded-2xl p-4 card-hover flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-white">Appeler</div>
                <div className="text-xs text-zyvo-muted">+213 5XX XX XX XX</div>
              </div>
            </button>
            <button className="glass-premium rounded-2xl p-4 card-hover flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-white">WhatsApp</div>
                <div className="text-xs text-zyvo-muted">Réponse sous 30 min</div>
              </div>
            </button>
          </div>
        </>
      )}

      {/* TAB: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="glass-premium rounded-2xl p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Avis clients</h3>
            <span className="text-xs text-zyvo-muted">{reviews.length} avis</span>
          </div>

          {/* RATING SUMMARY */}
          <div className="flex items-center gap-4 mb-6 p-4 glass-premium-light rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-extrabold gradient-text">{provider.rating}</div>
              <div className="flex items-center gap-0.5 mt-1 justify-center">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-3 h-3 ${i <= Math.round(provider.rating) ? 'fill-zyvo-gold text-zyvo-gold' : 'text-zyvo-muted/30'}`} />
                ))}
              </div>
              <div className="text-[10px] text-zyvo-muted mt-1">{reviews.length} avis</div>
            </div>
            <div className="flex-1 space-y-1">
              {[5,4,3,2,1].map(star => {
                const count = reviews.filter(r => r.rating === star).length
                const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
                return (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="text-zyvo-muted w-3">{star}</span>
                    <Star className="w-3 h-3 fill-zyvo-gold text-zyvo-gold" />
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-zyvo-gold transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-zyvo-muted w-6 text-right">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ADD REVIEW BUTTON */}
          {user && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="w-full glass-premium-light rounded-xl p-4 text-sm font-semibold text-zyvo-muted hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 mb-4"
            >
              <Star className="w-4 h-4" /> Donner mon avis
            </button>
          )}

          {/* REVIEW FORM */}
          {showReviewForm && (
            <div className="glass-premium-light rounded-xl p-4 mb-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-zyvo-muted block mb-2">Votre note</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setReviewHover(star)}
                      onMouseLeave={() => setReviewHover(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star className={`w-7 h-7 transition-all ${
                        star <= (reviewHover || reviewRating)
                          ? 'fill-zyvo-gold text-zyvo-gold'
                          : 'text-zyvo-muted/30'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-zyvo-muted block mb-2">Votre commentaire</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Partagez votre expérience avec ce prestataire..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-zyvo-gold/40 transition-colors resize-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={submitReview}
                  className="flex-1 gradient-brand text-white font-bold py-2.5 rounded-xl text-sm shadow-lg hover:scale-[1.02] transition-all"
                >
                  <ThumbsUp className="w-4 h-4 inline mr-1" /> Publier mon avis
                </button>
                <button
                  onClick={() => { setShowReviewForm(false); setReviewRating(0); setReviewText('') }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-zyvo-muted hover:text-white hover:bg-white/5 transition-all"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* REVIEWS LIST */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-t border-white/5 pt-4 first:border-0 first:pt-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${review.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                    {review.initial}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{review.name}</div>
                    <div className="flex items-center gap-1 text-xs text-zyvo-muted">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-zyvo-gold text-zyvo-gold' : 'text-zyvo-muted/30'}`} />
                      ))}
                      <span className="ml-1">{review.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zyvo-muted mt-2 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: PHOTOS */}
      {activeTab === 'photos' && (
        <div className="glass-premium rounded-2xl p-6 mt-6">
          <h3 className="font-bold text-lg mb-4">Galerie photos</h3>
          {showGallery ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {galleryImages.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[3/2] glass-premium-light">
                  <img
                    src={img}
                    alt={`Réalisation ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-zyvo-muted text-xs"><ImageIcon class="w-6 h-6" /></div>' }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {galleryImages.slice(0, 3).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[3/2] glass-premium-light">
                  <img
                    src={img}
                    alt={`Réalisation ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-zyvo-muted text-xs"><ImageIcon class="w-6 h-6" /></div>' }}
                  />
                </div>
              ))}
              <button
                onClick={() => setShowGallery(true)}
                className="rounded-xl aspect-[3/2] glass-premium-light flex flex-col items-center justify-center gap-1 text-zyvo-muted hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <ImageIcon className="w-6 h-6" />
                <span className="text-xs font-bold">+{galleryImages.length - 3} photos</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* SIMILAR PROVIDERS */}
      <div className="mt-10">
        <h3 className="font-bold text-lg mb-4">Autres prestataires similaires</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {providers.filter(p => p.id !== provider.id).slice(0, 2).map(p => (
            <Link
              key={p.id}
              to={`/provider/${p.name.toLowerCase().replace(/[\s.]+/g, '-')}`}
              className="glass-premium rounded-2xl p-4 card-hover flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradient(p.service)} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-white truncate">{p.name}</div>
                <div className="text-xs text-zyvo-muted truncate">{p.service}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zyvo-muted shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
