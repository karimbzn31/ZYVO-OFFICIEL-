import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Sparkles, Tag } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'Comment choisir un bon plombier à Alger ?',
    excerpt: 'Les critères essentiels pour trouver un plombier fiable et compétent dans la capitale.',
    category: 'Conseils',
    date: '15 Juin 2025',
    readTime: '4 min',
    gradient: 'from-blue-600 to-cyan-400',
  },
  {
    id: 2,
    title: 'Tarifs des services à domicile en Algérie',
    excerpt: 'Guide des prix pour le ménage, la plomberie, l\'électricité et plus encore.',
    category: 'Guide',
    date: '10 Juin 2025',
    readTime: '6 min',
    gradient: 'from-purple-600 to-pink-400',
  },
  {
    id: 3,
    title: 'Devenir prestataire sur Zyvo : le guide complet',
    excerpt: 'Comment créer votre profil, attirer vos premiers clients et développer votre activité.',
    category: 'Prestataires',
    date: '5 Juin 2025',
    readTime: '8 min',
    gradient: 'from-amber-600 to-orange-400',
  },
  {
    id: 4,
    title: 'Les 5 erreurs à éviter quand on cherche un service',
    excerpt: 'Ne tombez plus dans ces pièges courants qui vous font perdre du temps et de l\'argent.',
    category: 'Conseils',
    date: '1 Juin 2025',
    readTime: '3 min',
    gradient: 'from-emerald-600 to-teal-400',
  },
  {
    id: 5,
    title: 'Pourquoi choisir un prestataire vérifié ?',
    excerpt: 'La vérification manuelle de nos prestataires : gage de confiance et de qualité.',
    category: 'Sécurité',
    date: '25 Mai 2025',
    readTime: '5 min',
    gradient: 'from-red-600 to-rose-400',
  },
  {
    id: 6,
    title: 'Services à domicile : les tendances 2025',
    excerpt: 'Comment le marché des services à la personne évolue en Algérie cette année.',
    category: 'Analyse',
    date: '20 Mai 2025',
    readTime: '7 min',
    gradient: 'from-violet-600 to-indigo-400',
  },
]

const categories = ['Tous', 'Conseils', 'Guide', 'Prestataires', 'Sécurité', 'Analyse']

export default function Blog() {
  const [activeCat, setActiveCat] = useState('Tous')
  const filtered = activeCat === 'Tous' ? articles : articles.filter(a => a.category === activeCat)

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Blog
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Actualités & <span className="gradient-text">Conseils</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Tout ce qu'il faut savoir sur les services à domicile en Algérie.
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCat === cat
                ? 'bg-white text-zyvo-dark'
                : 'bg-white/5 text-zyvo-muted hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-16">
            <p className="text-zyvo-muted">Aucun article pour cette catégorie.</p>
          </div>
        )}
        {filtered.map((a) => (
          <Link
            key={a.id}
            to={`/blog/${a.id}`}
            className="glass-premium rounded-2xl overflow-hidden card-hover group"
          >
            <div className={`h-36 bg-gradient-to-br ${a.gradient} flex items-center justify-center relative`}>
              <Tag className="w-10 h-10 text-white/30" strokeWidth={1} />
              <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
                {a.category}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-zyvo-muted mb-2">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {a.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readTime}</span>
              </div>
              <h3 className="font-bold text-white group-hover:text-zyvo-gold transition-colors mb-2 line-clamp-2">{a.title}</h3>
              <p className="text-sm text-zyvo-muted line-clamp-2">{a.excerpt}</p>
              <div className="flex items-center gap-1 text-sm text-zyvo-gold font-semibold mt-3">
                Lire plus <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* NEWSLETTER */}
      <div className="gradient-brand rounded-3xl p-8 sm:p-10 text-center mt-12 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold text-white mb-2">Restez informé</h2>
          <p className="text-white/70 mb-6">Recevez nos derniers articles et conseils chaque semaine.</p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors"
            />
            <button type="submit" className="bg-white text-zyvo-dark font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all">
              S'abonner
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
