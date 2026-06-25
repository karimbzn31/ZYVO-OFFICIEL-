import { Heart, Search, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProviderCard from '../components/ProviderCard'
import { useFavorites } from '../context/favorites'

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Mes favoris</h2>
        {favorites.length > 0 && (
          <span className="text-xs text-zyvo-muted font-semibold">{favorites.length} prestataire{favorites.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-zyvo-muted/40" strokeWidth={1} />
          </div>
          <h3 className="text-lg font-bold text-white">Aucun favori</h3>
          <p className="text-sm text-zyvo-muted mt-2 max-w-xs mx-auto">
            Ajoutez des prestataires à vos favoris en cliquant sur le cœur. Retrouvez-les ici rapidement.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 mt-6 glow-worm"
          >
            <Search className="w-4 h-4" /> Découvrir des pros
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {favorites.map((p) => (
            <div key={p.id} className="relative group">
              <button
                onClick={() => removeFavorite(p.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <ProviderCard provider={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
