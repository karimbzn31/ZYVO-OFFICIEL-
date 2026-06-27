import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, Plus, Clock, AlertTriangle, CheckCircle, XCircle,
  MessageCircle, Eye, MapPin, Users, ChevronRight
} from 'lucide-react'
import { quotes } from '../../data/quotesData'
import { useLoading } from '../../hooks/useLoading'
import { ListSkeleton } from '../../components/dashboard/Skeleton'

const statusConfig = {
  pending: { icon: Clock, label: 'En attente', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  answered: { icon: CheckCircle, label: 'Répondu', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  expired: { icon: XCircle, label: 'Expiré', color: 'text-red-400', bg: 'bg-red-500/10' },
}

const urgencyColors = {
  urgent: 'text-red-400 bg-red-500/10',
  cette_semaine: 'text-amber-400 bg-amber-500/10',
  ce_mois: 'text-blue-400 bg-blue-500/10',
  pas_presse: 'text-emerald-400 bg-emerald-500/10',
}

const urgencyLabels = {
  urgent: 'Urgent',
  cette_semaine: 'Cette semaine',
  ce_mois: 'Ce mois-ci',
  pas_presse: 'Pas pressé',
}

export default function MesDevis() {
  const loading = useLoading(300)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter)

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-36 rounded bg-white/5 animate-pulse" />
        <div className="flex gap-2">
          {[1,2,3,4].map(i => <div key={i} className="h-8 w-20 rounded-xl bg-white/5 animate-pulse" />)}
        </div>
        <ListSkeleton count={4} />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold">
            Mes <span className="gradient-text-brand">devis</span>
          </h1>
          <p className="text-xs sm:text-sm text-zyvo-muted mt-0.5">
            {quotes.length} demande{quotes.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link
          to="/dashboard/client/demander-devis"
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg hover:scale-[1.02] transition-all duration-300 glow-worm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nouveau</span>
        </Link>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'pending', label: 'En attente' },
          { key: 'answered', label: 'Répondu' },
          { key: 'expired', label: 'Expiré' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              filter === f.key
                ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Quotes list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-zyvo-muted/40" />
          </div>
          <p className="font-bold text-white text-lg">Aucune demande</p>
          <p className="text-sm text-zyvo-muted mt-1">
            {filter === 'all'
              ? 'Vous n\'avez pas encore fait de demande de devis'
              : `Aucune demande ${filter === 'pending' ? 'en attente' : filter === 'answered' ? 'répondue' : 'expirée'}`}
          </p>
          {filter === 'all' && (
            <Link
              to="/dashboard/client/demander-devis"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg hover:scale-[1.02] transition-all duration-300 glow-worm"
            >
              <Plus className="w-3.5 h-3.5" />
              Demander un devis
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(q => {
            const StatusIcon = statusConfig[q.status].icon
            const isExpired = q.status === 'expired'
            return (
              <div key={q.id} className={`glass-premium rounded-2xl overflow-hidden card-hover group ${
                isExpired ? 'opacity-60' : ''
              }`}>
                <Link to={`/dashboard/client/mes-devis/${q.id}`} className="block p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg capitalize ${urgencyColors[q.urgency]}`}>
                          {urgencyLabels[q.urgency]}
                        </span>
                        <span className="text-[10px] text-zyvo-muted/60">{q.date}</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-zyvo-gold transition-colors truncate">
                        {q.title}
                      </h3>
                      <p className="text-xs text-zyvo-muted truncate mt-0.5 capitalize">{q.category}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${statusConfig[q.status].bg} ${statusConfig[q.status].color} shrink-0`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[q.status].label}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-zyvo-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {q.city}
                    </span>
                    {q.responsesCount > 0 && (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <Users className="w-3 h-3" /> {q.responsesCount} réponse{q.responsesCount > 1 ? 's' : ''}
                      </span>
                    )}
                    {q.budgetRange && (
                      <span className="font-semibold text-white ml-auto">{q.budgetRange}</span>
                    )}
                  </div>

                  {/* Responses preview */}
                  {q.responses?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                      {q.responses.slice(0, 2).map((r, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-zyvo-gold/20 to-zyvo-gold/5 flex items-center justify-center text-[8px] font-bold text-zyvo-gold shrink-0">
                            {r.providerAvatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold text-white truncate">{r.providerName}</span>
                              <span className="text-[9px] text-zyvo-muted/60">{r.date}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-zyvo-gold">{r.price}</span>
                        </div>
                      ))}
                      {q.responses.length > 2 && (
                        <p className="text-[10px] text-zyvo-muted/60 text-center">
                          +{q.responses.length - 2} autre{q.responses.length - 2 > 1 ? 's' : ''} réponse{q.responses.length - 2 > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {/* FAB for mobile */}
      <Link
        to="/dashboard/client/demander-devis"
        className="lg:hidden fixed bottom-24 right-4 z-20 w-14 h-14 rounded-2xl gradient-brand text-white shadow-xl flex items-center justify-center hover:scale-105 transition-all duration-300 glow-worm"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  )
}
