import { useState } from 'react'
import { Sparkles, Star, ThumbsUp, Clock, ChevronDown, Search, Filter, User } from 'lucide-react'

const allReviews = [
  { id: 1, name: 'Mohamed K.', rating: 5, date: '12 jan 2026', service: 'Plomberie', text: 'Excellent travail ! Le plombier est arrivé à l\'heure et a réparé ma fuite en moins d\'une heure. Très professionnel.' },
  { id: 2, name: 'Sarah B.', rating: 5, date: '10 jan 2026', service: 'Électricité', text: 'Je recommande vivement. Installation électrique propre et sécurisée. Prix très correct.' },
  { id: 3, name: 'Amine R.', rating: 4, date: '8 jan 2026', service: 'Ménage', text: 'Très bon service, la dame était minutieuse et rapide. Seul petit bémol : 10 min de retard.' },
  { id: 4, name: 'Lina H.', rating: 5, date: '5 jan 2026', service: 'Coiffure', text: 'Magnifique résultat ! Ma couleur est exactement comme je la voulais. Je reviendrai.' },
  { id: 5, name: 'Yacine D.', rating: 4, date: '3 jan 2026', service: 'Cours', text: 'Très bon professeur, pédagogue et patient. Mon fils a beaucoup progressé en maths.' },
  { id: 6, name: 'Nadia K.', rating: 5, date: '1 jan 2026', service: 'Jardinage', text: 'Jardin magnifique ! Le jardinier a fait un travail remarquable. Très satisfaite.' },
  { id: 7, name: 'Karim Z.', rating: 3, date: '28 déc 2025', service: 'Plomberie', text: 'Travail correct mais un peu long. Le problème a été résolu mais a pris plus de temps que prévu.' },
  { id: 8, name: 'Fatima A.', rating: 5, date: '25 déc 2025', service: 'Transport', text: 'Déménagement rapide et soigné. Les gars étaient super sympas et efficaces. 5 étoiles !' },
  { id: 9, name: 'Hicham M.', rating: 4, date: '20 déc 2025', service: 'Informatique', text: 'Bon développeur, travail sérieux. Un peu de retard sur le délai mais le résultat est là.' },
  { id: 10, name: 'Djamila S.', rating: 5, date: '18 déc 2025', service: 'Ménage', text: 'Femme de ménage formidable ! Ma maison brille comme jamais. Je prends un abonnement mensuel.' },
]

const services = ['Tous', 'Plomberie', 'Électricité', 'Ménage', 'Coiffure', 'Cours', 'Jardinage', 'Transport', 'Informatique']

export default function Reviews() {
  const [search, setSearch] = useState('')
  const [filterService, setFilterService] = useState('Tous')
  const [sort, setSort] = useState('recent')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered = allReviews
    .filter(r => {
      if (filterService !== 'Tous' && r.service !== filterService) return false
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.text.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'recent') return new Date(b.date) - new Date(a.date)
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  const display = filtered.slice(0, visibleCount)

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Avis
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Avis <span className="gradient-text">clients</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Ce que nos utilisateurs disent de leurs prestataires
        </p>

        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold gradient-text">4.7</div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'text-zyvo-gold fill-zyvo-gold' : 'text-white/20'}`} />
              ))}
            </div>
            <div className="text-xs text-zyvo-muted mt-1">{allReviews.length} avis</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-extrabold gradient-text">98%</div>
            <div className="text-xs text-zyvo-muted mt-1">Recommandent Zyvo</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-extrabold gradient-text">8+</div>
            <div className="text-xs text-zyvo-muted mt-1">Catégories</div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zyvo-muted" />
          <input
            type="text"
            placeholder="Rechercher dans les avis..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zyvo-muted pointer-events-none" />
          <select
            value={filterService}
            onChange={e => setFilterService(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-8 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer min-w-[140px]"
          >
            {services.map(s => <option key={s} value={s}>{s === 'Tous' ? 'Tous les services' : s}</option>)}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zyvo-muted pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl pl-4 pr-8 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
          >
            <option value="recent">Plus récents</option>
            <option value="rating">Mieux notés</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zyvo-muted pointer-events-none" />
        </div>
      </div>

      {/* REVIEWS LIST */}
      {display.length > 0 ? (
        <div className="space-y-3">
          {display.map((review) => (
            <div key={review.id} className="glass-premium rounded-2xl p-5 card-hover">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-xs font-bold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{review.name}</div>
                    <div className="flex items-center gap-2 text-xs text-zyvo-muted">
                      <span>{review.service}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i <= review.rating ? 'text-zyvo-gold fill-zyvo-gold' : 'text-white/20'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-zyvo-muted leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <User className="w-12 h-12 text-zyvo-muted/30 mx-auto mb-4" />
          <p className="text-zyvo-muted font-semibold">Aucun avis trouvé</p>
          <button onClick={() => { setSearch(''); setFilterService('Tous') }} className="text-zyvo-gold text-sm font-bold hover:underline mt-2">
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {visibleCount < filtered.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount(p => p + 6)}
            className="inline-flex items-center gap-2 glass-premium-light text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
          >
            Voir plus d'avis ({filtered.length - visibleCount} restants)
          </button>
        </div>
      )}
    </div>
  )
}
