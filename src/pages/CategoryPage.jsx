import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, Calendar, Sparkles } from 'lucide-react'
import { providers } from '../data/mockData'
import { useState } from 'react'

const categories = {
  plomberie: { name: 'Plomberie', emoji: '🔧', slug: 'plomberie' },
  menage: { name: 'Ménage', emoji: '🧹', slug: 'menage' },
  electricite: { name: 'Électricité', emoji: '⚡', slug: 'electricite' },
  coiffure: { name: 'Coiffure', emoji: '💇', slug: 'coiffure' },
  cours: { name: 'Cours particuliers', emoji: '📚', slug: 'cours' },
  jardinage: { name: 'Jardinage', emoji: '🌿', slug: 'jardinage' },
  tous: { name: 'Tous les services', emoji: '✨', slug: 'tous' },
}

export default function CategoryPage() {
  const { slug } = useParams()
  const [cityFilter, setCityFilter] = useState('')
  const cat = categories[slug] || categories.tous

  const filtered = slug === 'tous'
    ? providers
    : providers.filter(p => p.category?.toLowerCase() === slug)

  const cityFiltered = cityFilter
    ? filtered.filter(p => (p.city || 'Alger').toLowerCase().includes(cityFilter.toLowerCase()))
    : filtered

  const cities = [...new Set(providers.map(p => p.city || 'Alger'))]

  return (
    <div className="py-8">
      <Link to="/search" className="inline-flex items-center gap-1 text-sm text-zyvo-muted hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Retour aux services
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-3">
            <Sparkles className="w-4 h-4 text-zyvo-gold" /> {cat.emoji} Catégorie
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {cat.name} à <span className="gradient-text">Alger</span>
          </h1>
          <p className="text-zyvo-muted mt-2">{cityFiltered.length} prestataires disponibles</p>
        </div>

        {/* CITY FILTER */}
        {cities.length > 0 && (
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors"
          >
            <option value="">Toutes les villes</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
      </div>

      {/* PROVIDER GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cityFiltered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-16">
            <p className="text-zyvo-muted text-lg">Aucun prestataire trouvé pour cette catégorie.</p>
            <Link to="/search" className="text-zyvo-gold underline mt-2 inline-block">Voir tous les services</Link>
          </div>
        )}
        {cityFiltered.map((p) => (
          <Link
            key={p.id}
            to={`/provider/${p.id}`}
            className="glass-premium rounded-2xl p-5 card-hover group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zyvo-gold/30 to-zyvo-gold/10 flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-lg">
                {p.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white group-hover:text-zyvo-gold transition-colors truncate">{p.name}</h3>
                <div className="flex items-center gap-2 text-xs text-zyvo-muted mt-1">
                  <MapPin className="w-3 h-3" /> {p.city || 'Alger'}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="flex items-center gap-1 text-zyvo-gold"><Star className="w-3 h-3" /> {p.rating || 4.5}</span>
                  <span className="text-zyvo-muted flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.missions}+ missions</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-zyvo-muted mt-3 line-clamp-2">{p.description || `${p.name} est disponible pour vos travaux de ${cat.name.toLowerCase()} à Alger et ses environs.`}</p>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-zyvo-muted">À partir de</span>
              <span className="font-bold text-white">{p.price || 2500} DA</span>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO TEXT */}
      <div className="mt-12 glass-premium rounded-3xl p-8">
        <h2 className="text-xl font-extrabold mb-3">
          Meilleur {cat.name.toLowerCase()} à Alger : trouvez le bon pro
        </h2>
        <p className="text-sm text-zyvo-muted leading-relaxed">
          Vous cherchez un {cat.name.toLowerCase()} de confiance à Alger ? Zyvo vous met en relation 
          avec les meilleurs prestataires vérifiés de votre quartier. Comparez les notes, lisez les avis 
          et réservez en ligne en quelques clics. Plus besoin de demander à vos voisins ou de chercher 
          sur les réseaux sociaux — le bon pro est sur Zyvo.
        </p>
      </div>
    </div>
  )
}
