import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, TrendingDown, Calendar, Download,
  ArrowUp, ArrowDown, AlertCircle, CheckCircle, Clock
} from 'lucide-react'
import { useBookings } from '../../../context/booking'
import { useLoading } from '../../../hooks/useLoading'

export default function ProviderRevenus() {
  const { provider } = useOutletContext()
  const { allBookings } = useBookings()
  const loading = useLoading(350)
  const [period, setPeriod] = useState('all')

  const myBookings = useMemo(() => {
    if (!provider) return []
    return allBookings.filter(b => b.name === provider.name)
  }, [allBookings, provider])

  const completed = myBookings.filter(b => b.status === 'Terminée')
  const upcoming = myBookings.filter(b => b.status === 'Confirmée')

  const totalEarnings = completed.reduce((sum, b) => {
    const price = parseInt((b.priceValue || '0').toString().replace(/\D/g, ''))
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  const pendingEarnings = upcoming.reduce((sum, b) => {
    const price = parseInt((b.priceValue || '0').toString().replace(/\D/g, ''))
    return sum + (isNaN(price) ? 0 : price)
  }, 0)

  const avgPerMission = completed.length > 0 ? Math.round(totalEarnings / completed.length) : 0

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-32 rounded bg-white/5 animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-20 rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
        <div className="h-48 rounded-2xl bg-white/5 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">revenus</span></h1>
        <p className="text-xs text-zyvo-muted mt-0.5">{completed.length} mission{completed.length !== 1 ? 's' : ''} terminée{completed.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-premium rounded-2xl p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shrink-0">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-white">{totalEarnings.toLocaleString()} DA</p>
              <p className="text-[11px] text-zyvo-muted">Gagnés</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-premium rounded-2xl p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center shadow-lg shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-amber-400">{pendingEarnings.toLocaleString()} DA</p>
              <p className="text-[11px] text-zyvo-muted">En attente</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-premium rounded-2xl p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-white">{completed.length}</p>
              <p className="text-[11px] text-zyvo-muted">Missions</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-premium rounded-2xl p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shrink-0">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-white">{avgPerMission.toLocaleString()} DA</p>
              <p className="text-[11px] text-zyvo-muted">Moyen/mission</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent earnings list */}
      <div className="glass-premium rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-zyvo-gold" />
            Historique des missions
          </h3>
        </div>
        {myBookings.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="w-8 h-8 text-zyvo-muted/20 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zyvo-muted">Aucune mission</p>
          </div>
        ) : (
          <div className="space-y-2">
            {myBookings.map((b, i) => {
              const price = parseInt((b.priceValue || '0').toString().replace(/\D/g, '')) || 0
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    b.status === 'Terminée' ? 'bg-emerald-500/15 text-emerald-400' :
                    b.status === 'Confirmée' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-white/5 text-zyvo-muted'
                  }`}>
                    {b.status === 'Terminée' ? <CheckCircle className="w-4 h-4" /> :
                     b.status === 'Confirmée' ? <Clock className="w-4 h-4" /> :
                     <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{b.name}</p>
                    <p className="text-[10px] text-zyvo-muted">{b.date} · {b.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${b.status === 'Terminée' ? 'text-emerald-400' : 'text-zyvo-muted'}`}>
                      {price > 0 ? `${price.toLocaleString()} DA` : '—'}
                    </p>
                    <p className={`text-[9px] ${b.status === 'Terminée' ? 'text-emerald-500/70' : 'text-zyvo-muted/60'}`}>{b.status}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      <div className="h-2" />
    </div>
  )
}
