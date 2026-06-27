import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight,
  Circle, AlertCircle, CheckCircle, X
} from 'lucide-react'
import { useBookings } from '../../../context/booking'
import { useLoading } from '../../../hooks/useLoading'

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const statusColors = {
  'Confirmée': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  'En attente': 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  'Terminée': 'text-zyvo-muted border-white/10 bg-white/5',
  'Annulée': 'text-red-400 border-red-500/30 bg-red-500/10',
}

export default function ProviderCalendrier() {
  const { provider } = useOutletContext()
  const { allBookings } = useBookings()
  const loading = useLoading(350)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)

  const myBookings = useMemo(() => {
    if (!provider) return []
    return allBookings.filter(b => b.name === provider.name)
  }, [allBookings, provider])

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
    else setCurrentMonth(currentMonth - 1)
    setSelectedDate(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
    else setCurrentMonth(currentMonth + 1)
    setSelectedDate(null)
  }

  const dayBookings = useMemo(() => {
    if (!selectedDate) return []
    const dateStr = `${selectedDate} ${monthNames[currentMonth]} ${currentYear}`
    return myBookings.filter(b => b.date === dateStr || b.date?.includes(selectedDate.toString()))
  }, [selectedDate, currentMonth, currentYear, myBookings])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-32 rounded bg-white/5 animate-pulse" />
        <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold">Mon <span className="gradient-text-brand">calendrier</span></h1>
        <p className="text-xs text-zyvo-muted mt-0.5">{myBookings.length} mission{myBookings.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Calendar */}
      <div className="glass-premium rounded-2xl p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/5 transition-all text-zyvo-muted hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-bold text-sm text-white">{monthNames[currentMonth]} {currentYear}</h3>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/5 transition-all text-zyvo-muted hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(d => (
            <div key={d} className="text-center text-[10px] font-semibold text-zyvo-muted py-1">{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
            const isSelected = selectedDate === day
            const hasBooking = myBookings.some(b => b.date?.includes(day.toString()))
            return (
              <button
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : day)}
                className={`relative h-8 rounded-lg text-xs font-semibold transition-all ${
                  isSelected ? 'bg-zyvo-gold/20 text-zyvo-gold ring-1 ring-zyvo-gold/40' :
                  isToday ? 'bg-white/10 text-white' :
                  'text-zyvo-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                {day}
                {hasBooking && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zyvo-gold" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected date bookings */}
      {selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CalendarIcon className="w-4 h-4 text-zyvo-gold" />
            <h3 className="font-bold text-sm text-white">{selectedDate} {monthNames[currentMonth]} {currentYear}</h3>
          </div>
          {dayBookings.length === 0 ? (
            <div className="glass-premium rounded-2xl p-6 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-400/30 mx-auto mb-2" />
              <p className="text-sm font-semibold text-zyvo-muted">Aucune mission ce jour</p>
            </div>
          ) : (
            <div className="space-y-2">
              {dayBookings.map(b => (
                <div key={b.id} className="glass-premium rounded-2xl p-3.5 card-hover flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-zyvo-gold shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{b.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-zyvo-muted mt-0.5">
                      <Clock className="w-3 h-3" /> {b.time}
                      <span className="text-white/20">·</span>
                      <MapPin className="w-3 h-3" /> {b.address || b.city || 'Non spécifié'}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${statusColors[b.status] || statusColors['En attente']}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="h-2" />
    </div>
  )
}
