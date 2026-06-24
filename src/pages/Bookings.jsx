import { Calendar, Clock, MapPin, Search, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBookings } from '../context/booking'

export default function Bookings() {
  const { bookings, cancelBooking } = useBookings()

  return (
    <div className="py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold">Mes réservations</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-2xl glass-premium flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-zyvo-muted/40" strokeWidth={1} />
          </div>
          <h3 className="text-lg font-bold text-white">Aucune réservation</h3>
          <p className="text-sm text-zyvo-muted mt-2 max-w-xs mx-auto">
            Vous n'avez encore rien réservé. Parcourez les services disponibles et trouvez le pro qu'il vous faut.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 mt-6 glow-worm"
          >
            <Search className="w-4 h-4" /> Trouver un service
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="glass-premium rounded-2xl p-4 card-hover">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-sm font-bold text-white">
                  {b.providerInitial || b.providerName?.charAt(0) || '?'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">{b.providerName}</h4>
                    <span className={`text-[10px] font-bold ${b.status === 'Annulée' ? 'text-red-400' : b.statusColor || 'text-zyvo-success'}`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-zyvo-muted mt-0.5">{b.providerService}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-xs text-zyvo-muted">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{b.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Alger</span>
              </div>
              {b.price && (
                <div className="mt-2 text-xs">
                  <span className="text-zyvo-muted">Prix : </span>
                  <span className="font-bold text-white">{b.price}</span>
                </div>
              )}
              {b.status !== 'Annulée' && (
                <button
                  onClick={() => cancelBooking(b.id)}
                  className="mt-3 flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" /> Annuler
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
