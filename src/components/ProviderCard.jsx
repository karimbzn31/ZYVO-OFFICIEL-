import { Star, ShieldCheck, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
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

export default function ProviderCard({ provider }) {
  const gradient = getGradient(provider.service)
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(provider.id)

  return (
    <div className="relative group">
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(provider) }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
          fav ? 'bg-pink-500/20 text-pink-400 scale-110' : 'bg-black/20 text-white/40 hover:text-white hover:bg-white/10'
        }`}
      >
        <Heart className={`w-4 h-4 ${fav ? 'fill-pink-400' : ''}`} strokeWidth={1.5} />
      </button>
      <Link to={`/provider/${provider.id}`} className="glass-premium rounded-2xl p-4 flex items-center gap-4 card-hover block">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-base font-bold text-white shrink-0 shadow-lg relative overflow-hidden`}>
          {provider.name.charAt(0)}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-white truncate">{provider.name}</h4>
          <p className="text-xs text-zyvo-muted mt-0.5">{provider.service}</p>
          <div className="flex items-center gap-3 mt-1.5">
            {provider.badges.includes('Vérifié') && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> Vérifié
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {provider.rating}
            </span>
            <span className="text-[10px] text-zyvo-muted">{provider.missions} missions</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-zyvo-muted">Des</span>
          <p className="text-sm font-bold text-white">{provider.price}</p>
        </div>
      </Link>
    </div>
  )
}
