import { Heart, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { providers } from '../data/mockData'
import ProviderCard from '../components/ProviderCard'

export default function Favorites() {
  const favorites = providers.slice(0, 2)

  return (
    <div className="py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold">Mes favoris</h2>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-zyvo-muted/40" strokeWidth={1} />
          </div>
          <h3 className="text-lg font-bold text-white">Aucun favori</h3>
          <p className="text-sm text-zyvo-muted mt-2 max-w-xs mx-auto">
            Ajoutez des prestataires à vos favoris pour les retrouver rapidement et ne jamais les perdre de vue.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 mt-6 glow-worm"
          >
            <Search className="w-4 h-4" /> Découvrir des pros
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      )}
    </div>
  )
}
