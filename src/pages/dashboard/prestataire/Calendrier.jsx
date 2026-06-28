import { useState, useMemo, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight,
  AlertCircle, CheckCircle, X, Settings, Moon, Sun, ToggleLeft, ToggleRight,
  Lock, Unlock, MessageCircle, Check, ThumbsUp, Ban, MoreHorizontal,
  Edit3, Save
} from 'lucide-react'
import { useBookings } from '../../../context/booking'
import { useLoading } from '../../../hooks/useLoading'
import { useToast } from '../../../context/toast'

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const dayKeys = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim']
const dayLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const statusConfig = {
  'Confirmée': { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle },
  'En attente': { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: Clock },
  'Terminée': { color: 'text-zyvo-muted', bg: 'bg-white/5', border: 'border-white/10', icon: Check },
  'Annulée': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: X },
  'No-show': { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: Ban },
}

const AVAIL_KEY = 'zyvo_provider_avail'

function loadAvail(id) {
  try {
    const raw = localStorage.getItem(AVAIL_KEY)
    if (!raw) return null
    const all = JSON.parse(raw)
    return all[id] || null
  } catch { return null }
}

function saveAvail(id, data) {
  try {
    const raw = localStorage.getItem(AVAIL_KEY)
    const all = raw ? JSON.parse(raw) : {}
    all[id] = data
    localStorage.setItem(AVAIL_KEY, JSON.stringify(all))
  } catch {}
}

const defaultTimeSlots = Object.fromEntries(
  dayKeys.map((k, i) => [k, { active: i < 6, from: '08:00', to: '17:00' }])
)

export default function ProviderCalendrier() {
  const { provider } = useOutletContext()
  const { allBookings, updateBooking } = useBookings()
  const { addToast } = useToast()
  const loading = useLoading(300)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [editing, setEditing] = useState(false)
  const [showActions, setShowActions] = useState(null)

  const [slots, setSlots] = useState(defaultTimeSlots)
  const [vacation, setVacation] = useState(false)
  const [vacationMsg, setVacationMsg] = useState('')
  const [blockedDates, setBlockedDates] = useState([])

  useEffect(() => {
    if (!provider) return
    const saved = loadAvail(provider.id)
    if (saved) {
      setSlots(saved.slots || defaultTimeSlots)
      setVacation(saved.vacation || false)
      setVacationMsg(saved.vacationMsg || '')
      setBlockedDates(saved.blockedDates || [])
    }
  }, [provider])

  function saveSettings() {
    saveAvail(provider.id, { slots, vacation, vacationMsg: vacationMsg, blockedDates })
    setEditing(false)
    addToast('Disponibilités mises à jour', { message: 'Votre planning a été enregistré', type: 'success' })
  }

  const myBookings = useMemo(() => {
    if (!provider) return []
    return allBookings.filter(b => {
      const name = b.name || b.provider?.name || ''
      return name === provider.name
    })
  }, [allBookings, provider])

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7

  function formatDateKey(day) {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const todayStr = formatDateKey(new Date().getDate())

  function isDateBlocked(day) {
    return blockedDates.includes(formatDateKey(day))
  }

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
    else setCurrentMonth(currentMonth - 1)
    setSelectedDate(null)
    setShowActions(null)
  }

  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
    else setCurrentMonth(currentMonth + 1)
    setSelectedDate(null)
    setShowActions(null)
  }

  const dayBookings = useMemo(() => {
    if (!selectedDate) return []
    const dateStr = `${selectedDate} ${monthNames[currentMonth]} ${currentYear}`
    return myBookings.filter(b => {
      const bDate = b.date || ''
      return bDate.includes(dateStr) || bDate.includes(`${selectedDate}/`) ||
        (b.dateDay === selectedDate && b.dateMonth === currentMonth)
    })
  }, [selectedDate, currentMonth, currentYear, myBookings])

  function toggleBlockDate() {
    if (!selectedDate) return
    const key = formatDateKey(selectedDate)
    const newBlocked = blockedDates.includes(key)
      ? blockedDates.filter(d => d !== key)
      : [...blockedDates, key]
    setBlockedDates(newBlocked)
    saveAvail(provider.id, { slots, vacation, vacationMsg, blockedDates: newBlocked })
    addToast(
      blockedDates.includes(key) ? 'Date débloquée' : 'Date bloquée',
      { message: `Le ${selectedDate} ${monthNames[currentMonth]} ${currentYear} est maintenant ${blockedDates.includes(key) ? 'disponible' : 'indisponible'}`, type: 'success' }
    )
  }

  function handleStatusChange(bookingId, newStatus) {
    updateBooking(bookingId, { status: newStatus })
    setShowActions(null)
    addToast('Statut mis à jour', { message: `Mission passée à "${newStatus}"`, type: 'success' })
  }

  const availableSlotsCount = Object.values(slots).filter(s => s.active).length
  const bookedDays = myBookings.filter(b => b.status !== 'Annulée').length
  const completedThisMonth = myBookings.filter(b => {
    const bDate = b.date || ''
    return bDate.includes(monthNames[currentMonth]) && b.status === 'Terminée'
  }).length

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-48 rounded bg-white/5 animate-pulse" />
        <div className="h-72 rounded-2xl bg-white/5 animate-pulse" />
      </div>
    )
  }

  if (!provider) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
        <p className="font-bold text-white">Calendrier non disponible</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Mon <span className="gradient-text-brand">planning</span></h1>
          <p className="text-xs text-zyvo-muted mt-0.5">{bookedDays} mission{bookedDays > 1 ? 's' : ''} · {completedThisMonth} terminée{completedThisMonth > 1 ? 's' : ''} ce mois</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-zyvo-muted"
          >
            <Settings className="w-3.5 h-3.5" />
            Disponibilités
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-semibold text-zyvo-muted"
            >
              Annuler
            </button>
            <button
              onClick={saveSettings}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-brand text-white text-xs font-bold shadow-lg hover:scale-[1.02] transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      {/* Vacation Banner */}
      {vacation && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="glass-premium rounded-2xl p-3 border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-[11px] text-amber-300/90 flex-1">
              Mode vacances activé — votre profil est masqué aux clients.
            </p>
            {editing && (
              <button
                onClick={() => setVacation(false)}
                className="text-[10px] font-bold text-amber-400 hover:text-white px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-all"
              >
                Désactiver
              </button>
            )}
          </div>
          {vacationMsg && (
            <p className="text-[10px] text-zyvo-muted mt-1.5 ml-6 italic">Message auto : "{vacationMsg}"</p>
          )}
        </motion.div>
      )}

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

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const key = formatDateKey(day)
            const isToday = key === todayStr
            const isSelected = selectedDate === day
            const isBlocked = isDateBlocked(day)
            const dayOfWeek = (firstDayOfWeek + i) % 7
            const dayKey = dayKeys[dayOfWeek]
            const isActiveDay = editing ? slots[dayKey]?.active : true
            const hasBooking = myBookings.some(b => {
              const bd = b.date || ''
              return (bd.includes(`${day} `) || bd.includes(`${day}/`)) && b.status !== 'Annulée'
            })

            let dayStyle = ''
            if (isSelected) dayStyle = 'bg-zyvo-gold/20 text-zyvo-gold ring-1 ring-zyvo-gold/40'
            else if (isToday) dayStyle = 'bg-white/10 text-white'
            else if (isBlocked) dayStyle = 'text-zyvo-muted/30 line-through'
            else if (!isActiveDay) dayStyle = 'text-zyvo-muted/40'
            else dayStyle = 'text-zyvo-muted hover:bg-white/5 hover:text-white'

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : day)}
                className={`relative h-8 sm:h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer ${dayStyle}`}
              >
                {day}
                {hasBooking && !isBlocked && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zyvo-gold" />
                )}
                {isBlocked && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2">
                    <X className="w-2.5 h-2.5 text-red-400/60" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected day panel */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div key={selectedDate} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-zyvo-gold" />
                <h3 className="font-bold text-sm text-white">{selectedDate} {monthNames[currentMonth]} {currentYear}</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleBlockDate}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${isDateBlocked(selectedDate) ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}
                >
                  {isDateBlocked(selectedDate) ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  {isDateBlocked(selectedDate) ? 'Débloquer' : 'Bloquer'}
                </button>
              </div>
            </div>

            {/* Day schedule info */}
            {!isDateBlocked(selectedDate) && (
              <div className="glass-premium rounded-2xl px-4 py-2.5 flex items-center gap-3">
                <Clock className="w-3.5 h-3.5 text-zyvo-muted shrink-0" />
                <p className="text-[11px] text-zyvo-muted">
                  Créneaux : {dayLabels[(firstDayOfWeek + selectedDate - 1) % 7]}
                  {editing ? (
                    <span className="text-zyvo-gold ml-1">
                      {slots[dayKeys[(firstDayOfWeek + selectedDate - 1) % 7]]?.active
                        ? `${slots[dayKeys[(firstDayOfWeek + selectedDate - 1) % 7]].from} - ${slots[dayKeys[(firstDayOfWeek + selectedDate - 1) % 7]].to}`
                        : 'Indisponible'}
                    </span>
                  ) : (
                    <span className="text-white/60 ml-1">Disponible</span>
                  )}
                </p>
                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md ${dayBookings.filter(b => b.status !== 'Annulée').length > 0 ? 'text-zyvo-gold bg-zyvo-gold/10' : 'text-emerald-400 bg-emerald-500/10'}`}>
                  {dayBookings.filter(b => b.status !== 'Annulée').length > 0
                    ? `${dayBookings.filter(b => b.status !== 'Annulée').length} mission${dayBookings.filter(b => b.status !== 'Annulée').length > 1 ? 's' : ''}`
                    : 'Libre'}
                </span>
              </div>
            )}

            {isDateBlocked(selectedDate) ? (
              <div className="glass-premium rounded-2xl p-6 text-center">
                <Lock className="w-8 h-8 text-red-400/30 mx-auto mb-2" />
                <p className="text-sm font-semibold text-zyvo-muted">Jour bloqué</p>
                <p className="text-[10px] text-zyvo-muted/50 mt-1">Vous ne recevrez pas de demandes pour cette date</p>
              </div>
            ) : dayBookings.length === 0 ? (
              <div className="glass-premium rounded-2xl p-6 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-400/30 mx-auto mb-2" />
                <p className="text-sm font-semibold text-zyvo-muted">Aucune mission ce jour</p>
              </div>
            ) : (
              <div className="space-y-2">
                {dayBookings.map(b => {
                  const cfg = statusConfig[b.status] || statusConfig['En attente']
                  const Icon = cfg.icon
                  return (
                    <div key={b.id} className="glass-premium rounded-2xl overflow-hidden">
                      <div className="p-3.5 flex items-center gap-3">
                        <div className={`w-2 h-2 shrink-0 rounded-full ${b.status === 'Confirmée' ? 'bg-emerald-400' : b.status === 'En attente' ? 'bg-amber-400' : b.status === 'Terminée' ? 'bg-zyvo-muted' : 'bg-red-400'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{b.name || b.provider?.name || 'Client'}</p>
                          <div className="flex items-center gap-2 text-[10px] text-zyvo-muted mt-0.5">
                            <Clock className="w-3 h-3" /> {b.time}
                            {b.address && (
                              <>
                                <span className="text-white/20">·</span>
                                <MapPin className="w-3 h-3" /> <span className="truncate">{b.address}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => setShowActions(showActions === b.id ? null : b.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border flex items-center gap-1 transition-all ${cfg.color} ${cfg.bg} ${cfg.border}`}
                          >
                            <Icon className="w-3 h-3" />
                            {b.status}
                          </button>
                          {showActions === b.id && b.status !== 'Terminée' && b.status !== 'Annulée' && b.status !== 'No-show' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-0 top-full mt-1 z-20 w-40 glass-premium rounded-xl p-1.5 border border-white/10 shadow-xl"
                            >
                              {b.status === 'En attente' && (
                                <>
                                  <button onClick={() => handleStatusChange(b.id, 'Confirmée')} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-all">
                                    <CheckCircle className="w-3.5 h-3.5" /> Confirmer
                                  </button>
                                  <button onClick={() => handleStatusChange(b.id, 'Annulée')} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[11px] font-semibold text-red-400 hover:bg-red-500/10 transition-all">
                                    <X className="w-3.5 h-3.5" /> Refuser
                                  </button>
                                </>
                              )}
                              {b.status === 'Confirmée' && (
                                <>
                                  <button onClick={() => handleStatusChange(b.id, 'Terminée')} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-all">
                                    <Check className="w-3.5 h-3.5" /> Marquer terminée
                                  </button>
                                  <button onClick={() => handleStatusChange(b.id, 'No-show')} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[11px] font-semibold text-orange-400 hover:bg-orange-500/10 transition-all">
                                    <Ban className="w-3.5 h-3.5" /> Client absent
                                  </button>
                                </>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Availability Settings Panel */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            {/* Vacation mode */}
            <div className="glass-premium rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-amber-400" />
                  <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Mode vacances</p>
                </div>
                <button
                  onClick={() => setVacation(!vacation)}
                  className={`relative w-11 h-6 rounded-full transition-all ${vacation ? 'bg-amber-500/50' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${vacation ? 'left-5.5 right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
              {vacation && (
                <div>
                  <label className="text-[10px] text-zyvo-muted/60 mb-1.5 block">Message d'absence</label>
                  <textarea
                    value={vacationMsg}
                    onChange={e => setVacationMsg(e.target.value)}
                    rows={2}
                    maxLength={200}
                    className="w-full bg-white/5 rounded-xl p-3 text-xs text-white placeholder:text-zyvo-muted/40 outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all resize-none"
                    placeholder="Message automatique envoyé aux clients pendant votre absence..."
                  />
                  <p className="text-[9px] text-zyvo-muted/40 mt-1 text-right">{vacationMsg.length}/200</p>
                </div>
              )}
            </div>

            {/* Time slots per day */}
            <div className="glass-premium rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-zyvo-muted" />
                <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Créneaux horaires</p>
              </div>
              <div className="space-y-2">
                {dayKeys.map((k, i) => {
                  const s = slots[k]
                  return (
                    <div key={k} className="flex items-center gap-2 py-1.5">
                      <button
                        onClick={() => setSlots(prev => ({ ...prev, [k]: { ...prev[k], active: !prev[k].active } }))}
                        className={`text-[11px] font-bold w-14 shrink-0 text-left ${s.active ? 'text-white' : 'text-zyvo-muted/40'}`}
                      >
                        {dayLabels[i].slice(0, 3)}
                      </button>
                      <button
                        onClick={() => setSlots(prev => ({ ...prev, [k]: { ...prev[k], active: !prev[k].active } }))}
                        className={`relative w-9 h-5 rounded-full transition-all shrink-0 ${s.active ? 'bg-emerald-500/50' : 'bg-white/10'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${s.active ? 'left-4.5' : 'left-0.5'}`} />
                      </button>
                      <div className={`flex items-center gap-1.5 transition-opacity ${s.active ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                        <input
                          type="time"
                          value={s.from}
                          onChange={e => setSlots(prev => ({ ...prev, [k]: { ...prev[k], from: e.target.value } }))}
                          className="bg-white/5 rounded-lg px-2 h-7 text-[10px] text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all w-16"
                        />
                        <span className="text-[10px] text-zyvo-muted/40">→</span>
                        <input
                          type="time"
                          value={s.to}
                          onChange={e => setSlots(prev => ({ ...prev, [k]: { ...prev[k], to: e.target.value } }))}
                          className="bg-white/5 rounded-lg px-2 h-7 text-[10px] text-white outline-none border border-white/10 focus:border-zyvo-gold/30 transition-all w-16"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Blocked dates summary */}
            {blockedDates.length > 0 && (
              <div className="glass-premium rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-red-400" />
                  <p className="text-[10px] font-semibold text-zyvo-muted uppercase tracking-wider">Dates bloquées ({blockedDates.length})</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {blockedDates.map(d => (
                    <span key={d} className="text-[10px] text-red-400 bg-red-500/10 px-2 py-1 rounded-lg flex items-center gap-1 border border-red-500/20">
                      {d}
                      <button onClick={() => {
                        const newBlocked = blockedDates.filter(x => x !== d)
                        setBlockedDates(newBlocked)
                        saveAvail(provider.id, { slots, vacation, vacationMsg, blockedDates: newBlocked })
                      }} className="hover:text-white transition-colors">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-2" />
    </div>
  )
}