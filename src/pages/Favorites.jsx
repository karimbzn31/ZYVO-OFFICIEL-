import { Heart, Search, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProviderCard from '../components/ProviderCard'
import { useFavorites } from '../context/favorites'
import EmptyState from '../components/EmptyState'

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
        <EmptyState
          icon="heart"
          title="Aucun favori"
          description="Ajoutez des prestataires à vos favoris en cliquant sur le cœur. Retrouvez-les ici rapidement."
          actionLabel="Découvrir des pros"
          actionTo="/search"
        />
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
