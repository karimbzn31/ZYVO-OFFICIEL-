import { useState } from 'react'
import { Star } from 'lucide-react'

const criteriaLabels = {
  qualite: 'Qualité du service',
  ponctualite: 'Ponctualité',
  prix: 'Rapport qualité/prix',
  communication: 'Communication',
  professionnalisme: 'Professionnalisme',
}

const defaultCriteria = [
  { key: 'qualite', label: 'Qualité du service', color: 'text-blue-400' },
  { key: 'ponctualite', label: 'Ponctualité', color: 'text-emerald-400' },
  { key: 'prix', label: 'Rapport qualité/prix', color: 'text-amber-400' },
  { key: 'communication', label: 'Communication', color: 'text-purple-400' },
  { key: 'professionnalisme', label: 'Professionnalisme', color: 'text-cyan-400' },
]

export default function RatingDetailed({ ratings = {}, onRate, readOnly = false, size = 'sm' }) {
  const [hovered, setHovered] = useState({})

  const starSize = size === 'lg' ? 'w-5 h-5' : size === 'xs' ? 'w-3 h-3' : 'w-4 h-4'

  const handleRate = (key, val) => {
    if (!readOnly && onRate) {
      onRate(key, val)
    }
  }

  return (
    <div className="space-y-3">
      {defaultCriteria.map(({ key, label, color }) => {
        const val = ratings[key] || 0
        const hoverVal = hovered[key] || 0
        const display = hoverVal || val

        return (
          <div key={key} className="flex items-center justify-between gap-3">
            <span className={`text-xs font-semibold ${readOnly ? 'text-zyvo-muted' : 'text-white'} min-w-[120px]`}>
              {label}
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={readOnly}
                  onClick={() => handleRate(key, star)}
                  onMouseEnter={() => !readOnly && setHovered(prev => ({ ...prev, [key]: star }))}
                  onMouseLeave={() => !readOnly && setHovered(prev => ({ ...prev, [key]: 0 }))}
                  className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} transition-transform ${!readOnly && 'hover:scale-125'}`}
                >
                  <Star
                    className={`${starSize} ${
                      star <= display
                        ? `fill-${color.replace('text-', '')} ${color}`
                        : 'text-white/10'
                    } transition-all`}
                    strokeWidth={star <= display ? 0 : 1}
                  />
                </button>
              ))}
            </div>
            <span className={`text-xs font-bold ${color} min-w-[20px] text-right`}>{display}</span>
          </div>
        )
      })}
    </div>
  )
}
