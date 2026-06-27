import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Calendar, Clock, MapPin, Camera, CheckCircle,
  ChevronLeft, ChevronRight, Star
} from 'lucide-react'
import { useBookings } from '../../context/booking'
import { useAuth } from '../../context/auth'
import { useToast } from '../../context/toast'

const timeSlots = [
  { label: 'Matin', times: ['08:00', '09:00', '10:00', '11:00'] },
  { label: 'Après-midi', times: ['13:00', '14:00', '15:00', '16:00'] },
  { label: 'Soirée', times: ['17:00', '18:00', '19:00'] },
]

export default function BookingModal({ provider, open, onClose }) {
  const { addBooking } = useBookings()
  const { user } = useAuth()
  const addToast = useToast()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const minDate = new Date().toISOString().split('T')[0]

  const handleConfirm = () => {
    if (!date || !time || !address.trim()) return
    addBooking({
      provider,
      date: new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      time,
      address,
      notes,
      userPhone: user?.phone || '',
    })
    addToast('Réservation confirmée ! 🎉', { message: `${provider.name} · ${new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long'})} à ${time}`, type: 'success' })
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setStep(1)
      setDate('')
      setTime('')
      setAddress('')
      setNotes('')
      onClose()
    }, 2000)
  }

  const canGoNext = step === 1 ? date : step === 2 ? time : address.trim()

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full sm:max-w-lg max-h-[90vh] bg-zyvo-dark border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5">
                <button onClick={onClose} className="p-1.5 rounded-xl text-zyvo-muted hover:text-white hover:bg-white/5 transition-all">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1.5">
                  {[1,2,3].map(s => (
                    <div key={s} className={`w-2 h-2 rounded-full transition-all ${s <= step ? 'bg-zyvo-gold' : 'bg-white/10'}`} />
                  ))}
                </div>
                <span className="text-xs font-semibold text-zyvo-muted">Étape {step}/3</span>
              </div>

              {confirmed ? (
                <div className="text-center py-16 px-6">
                  <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-extrabold text-xl text-white">Réservation confirmée !</p>
                  <p className="text-sm text-zyvo-muted mt-1">Vous recevrez une confirmation par email.</p>
                </div>
              ) : (
                <>
                  {/* Provider info */}
                  <div className="flex items-center gap-3 px-4 sm:px-5 py-3 bg-white/[0.02]">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${provider.coverGradient || 'from-blue-500 to-cyan-400'} flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0`}>
                      {provider.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-white truncate">{provider.name}</p>
                      <p className="text-xs text-zyvo-muted">{provider.service} · {provider.price}</p>
                    </div>
                  </div>

                  <div className="overflow-y-auto p-4 sm:p-5 space-y-5 max-h-[50vh]">
                    {/* Step 1: Date */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-zyvo-gold text-zyvo-dark' : 'bg-white/5 text-zyvo-muted'}`}>1</div>
                        <span className="text-sm font-bold text-white">Choisir une date</span>
                      </div>
                      <input
                        type="date"
                        value={date}
                        onChange={e => { setDate(e.target.value); if (e.target.value) setStep(2) }}
                        min={minDate}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors [color-scheme:dark]"
                      />
                    </div>

                    {/* Step 2: Time */}
                    {step >= 2 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-zyvo-gold text-zyvo-dark' : 'bg-white/5 text-zyvo-muted'}`}>2</div>
                          <span className="text-sm font-bold text-white">Choisir un créneau</span>
                        </div>
                        <div className="space-y-3">
                          {timeSlots.map(slot => (
                            <div key={slot.label}>
                              <p className="text-xs font-semibold text-zyvo-muted mb-2">{slot.label}</p>
                              <div className="grid grid-cols-4 gap-2">
                                {slot.times.map(t => (
                                  <button
                                    key={t}
                                    onClick={() => { setTime(t); setStep(3) }}
                                    className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                                      time === t
                                        ? 'bg-zyvo-gold/20 text-zyvo-gold border border-zyvo-gold/30'
                                        : 'bg-white/5 text-zyvo-muted hover:text-white hover:bg-white/10 border border-transparent'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Address + Notes */}
                    {step >= 3 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-zyvo-gold flex items-center justify-center text-xs font-bold text-zyvo-dark">3</div>
                          <span className="text-sm font-bold text-white">Où et quoi ?</span>
                        </div>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-zyvo-muted" />
                          <input
                            type="text"
                            placeholder="Adresse de l'intervention"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
                          />
                        </div>
                        <textarea
                          placeholder="Notes supplémentaires (optionnel)"
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors resize-none"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-4 sm:p-5 border-t border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-zyvo-muted">Total estimé</span>
                      <span className="font-extrabold text-base text-white">{provider.price}</span>
                    </div>
                    <button
                      onClick={handleConfirm}
                      disabled={!canGoNext}
                      className="w-full gradient-brand text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-[1.02] glow-worm"
                    >
                      Confirmer la réservation
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
