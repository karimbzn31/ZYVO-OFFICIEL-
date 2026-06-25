import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { providers } from '../data/mockData'

const cityCoords = {
  'Alger': [36.7538, 3.0588],
  'Oran': [35.6994, -0.6351],
  'Constantine': [36.365, 6.6147],
  'Blida': [36.47, 2.83],
  'Tizi Ouzou': [36.7118, 4.0456],
  'Annaba': [36.9, 7.7667],
  'Sétif': [36.19, 5.41],
  'Béjaïa': [36.75, 5.0667],
  'Tlemcen': [34.8828, -1.3167],
  'Biskra': [34.85, 5.7333],
}

export default function ProviderMap() {
  const [activeProvider, setActiveProvider] = useState(null)

  const uniqueCities = [...new Set(providers.map(p => p.city))].filter(c => cityCoords[c])

  return (
    <div className="glass-premium rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-5 h-5 text-zyvo-gold" />
        <h3 className="font-bold text-white">Prestataires près de chez vous</h3>
      </div>

      <div className="relative bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-zyvo-deeper rounded-xl overflow-hidden border border-white/5" style={{ minHeight: '320px' }}>
        {/* ALGERIA MAP ABSTRACT */}
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-30 absolute inset-0">
          <path d="M50,200 Q100,50 200,100 Q300,50 350,150 Q380,200 350,300 Q300,350 200,300 Q100,350 50,200Z" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
          <path d="M100,180 Q150,120 200,140 Q250,120 300,160" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
          <path d="M80,220 Q130,260 200,240 Q270,260 320,220" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
        </svg>

        {/* CITY MARKERS */}
        <div className="relative z-10 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {uniqueCities.map((city) => {
              const count = providers.filter(p => p.city === city).length
              return (
                <button
                  key={city}
                  onClick={() => setActiveProvider(activeProvider === city ? null : city)}
                  className={`glass-premium-light rounded-xl p-3 text-left transition-all ${
                    activeProvider === city ? 'bg-zyvo-gold/10 border border-zyvo-gold/30' : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${activeProvider === city ? 'text-zyvo-gold' : 'text-zyvo-muted'}`} />
                    <div>
                      <div className="text-sm font-bold text-white">{city}</div>
                      <div className="text-[10px] text-zyvo-muted">{count} prestataire{count > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* PROVIDERS IN SELECTED CITY */}
          {activeProvider && (
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold text-zyvo-gold">À {activeProvider}</h4>
              {providers.filter(p => p.city === activeProvider).map(p => (
                <div key={p.id} className="flex items-center gap-3 glass-premium-light rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold text-white">
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{p.name}</div>
                    <div className="text-xs text-zyvo-muted truncate">{p.service}</div>
                  </div>
                  <span className="text-xs font-bold text-white">{p.price}</span>
                </div>
              ))}
            </div>
          )}

          <p className="text-[10px] text-zyvo-muted mt-4 text-center">
            Carte interactive bientôt disponible avec Leaflet 🗺️
          </p>
        </div>
      </div>
    </div>
  )
}
