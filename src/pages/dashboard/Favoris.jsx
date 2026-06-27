import { Link } from 'react-router-dom'
import { Heart, Star, MapPin, Trash2 } from 'lucide-react'
import { useFavorites } from '../../context/favorites'
import { useLoading } from '../../hooks/useLoading'
import { GridSkeleton } from '../../components/dashboard/Skeleton'

export default function Favoris() {
  const loading = useLoading(300)
  const { favorites, removeFavorite } = useFavorites()

  if (loading) return <div className="space-y-4"><GridSkeleton count={3} /></div>

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
        <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">favoris</span></h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-zyvo-muted/20 mx-auto mb-4" strokeWidth={1} />
          <p className="font-bold text-white text-lg">Aucun favori</p>
          <p className="text-sm text-zyvo-muted mt-1">Explorez le marché et ajoutez vos prestataires préférés</p>
          <Link to="/dashboard/client/explorer" className="inline-block mt-4 gradient-brand text-white font-bold px-6 py-3 rounded-xl text-sm">
            Explorer le marché
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {favorites.map((p) => (
            <div key={p.id} className="glass-premium rounded-2xl overflow-hidden card-hover group relative">
              <div className={`h-16 sm:h-24 bg-gradient-to-br ${p.coverGradient || 'from-blue-500 to-cyan-400'} relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <button
                  onClick={() => removeFavorite(p.id)}
                  className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
              <Link to={`/dashboard/client/prestataire/${p.id}`} className="block p-3 sm:p-4">
                <div className="flex items-center gap-3 -mt-8 sm:-mt-12 mb-3">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${p.coverGradient || 'from-blue-500 to-cyan-400'} flex items-center justify-center text-sm sm:text-lg font-bold text-white shadow-lg border-2 border-zyvo-dark shrink-0`}>
                    {p.name?.charAt(0) || '?'}
                  </div>
                  <div className="pt-4 sm:pt-7 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-white truncate group-hover:text-zyvo-gold transition-colors">{p.name}</h3>
                    <p className="text-xs sm:text-sm text-zyvo-muted truncate">{p.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" /> {p.rating || '-'}
                  </span>
                  <span className="flex items-center gap-1 text-zyvo-muted">
                    <MapPin className="w-3 h-3" /> {p.city || '-'}
                  </span>
                  <span className="ml-auto font-bold text-white text-xs sm:text-sm">{p.price || '-'}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
