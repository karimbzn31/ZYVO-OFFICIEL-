import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Phone, MessageCircle, AlertCircle, CheckCircle, XCircle, ChevronLeft, Star } from 'lucide-react'
import { bookings } from '../data/mockData'

const statusConfig = {
  Confirmée: { icon: CheckCircle, color: 'text-zyvo-success', bg: 'bg-zyvo-success/10' },
  'En attente': { icon: AlertCircle, color: 'text-zyvo-warning', bg: 'bg-zyvo-warning/10' },
  Annulée: { icon: XCircle, color: 'text-zyvo-error', bg: 'bg-zyvo-error/10' },
}

export default function BookingDetail() {
  const { id } = useParams()
  const booking = bookings.find(b => b.id === Number(id))

  if (!booking) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 text-zyvo-muted mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold mb-2">Réservation introuvable</h2>
        <p className="text-zyvo-muted mb-6">Cette réservation n'existe pas ou a été supprimée.</p>
        <Link to="/bookings" className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl">
          <ChevronLeft className="w-4 h-4" /> Mes réservations
        </Link>
      </div>
    )
  }

  const status = statusConfig[booking.status] || statusConfig['En attente']

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <Link to="/bookings" className="inline-flex items-center gap-2 text-sm text-zyvo-muted hover:text-white transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" /> Retour aux réservations
      </Link>

      {/* HEADER */}
      <div className="glass-premium rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-extrabold">Réservation #{booking.id}</h1>
            <p className="text-sm text-zyvo-muted mt-1">Mission de {booking.provider.service}</p>
          </div>
          <div className={`${status.bg} ${status.color} px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2`}>
            <status.icon className="w-4 h-4" /> {booking.status}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: 'Date', value: booking.date },
            { icon: Clock, label: 'Heure', value: booking.time },
            { icon: MapPin, label: 'Adresse', value: booking.provider.city },
            { icon: Phone, label: 'Contact', value: booking.provider.name },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-zyvo-muted mb-1">
                <item.icon className="w-3 h-3" /> {item.label}
              </div>
              <div className="text-sm font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROVIDER */}
      <div className="glass-premium rounded-2xl p-6 sm:p-8 mb-6">
        <h2 className="font-bold text-lg mb-4">Prestataire</h2>
        <Link to={`/provider/${booking.provider.id}`} className="flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-xl font-bold text-white shadow-lg">
            {booking.provider.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white group-hover:text-zyvo-gold transition-colors">{booking.provider.name}</h3>
            <p className="text-sm text-zyvo-muted">{booking.provider.service}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-zyvo-gold fill-current" />
              <span className="text-sm font-semibold text-white">{booking.provider.rating}</span>
              <span className="text-xs text-zyvo-muted ml-1">({booking.provider.missions} missions)</span>
            </div>
          </div>
        </Link>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all">
          <MessageCircle className="w-4 h-4" /> Contacter le prestataire
        </button>
        {booking.status === 'Confirmée' && (
          <button className="inline-flex items-center gap-2 bg-zyvo-error/10 text-zyvo-error font-bold px-6 py-3 rounded-xl hover:bg-zyvo-error/20 transition-all">
            <XCircle className="w-4 h-4" /> Annuler la réservation
          </button>
        )}
      </div>
    </div>
  )
}
