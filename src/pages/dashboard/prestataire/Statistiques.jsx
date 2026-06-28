import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Eye, MessageCircle, CheckCircle, Star,
  Clock, DollarSign, Users, Calendar, ArrowUp, ArrowDown, Zap, Award,
  BarChart3, Activity, ChevronRight
} from 'lucide-react'
import { useBookings } from '../../../context/booking'
import { useLoading } from '../../../hooks/useLoading'

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function Bar({ value, max, label, height = 100, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <span className="text-[9px] font-bold text-zyvo-muted">{value.toLocaleString()}</span>
      <div className="w-full flex justify-center" style={{ height }}>
        <div
          className={`w-5 sm:w-7 rounded-lg self-end transition-all duration-700 ${color || 'bg-gradient-to-t from-zyvo-gold/60 to-zyvo-gold'}`}
          style={{ height: `${Math.max(pct, 4)}%` }}
        />
      </div>
      <span className="text-[8px] text-zyvo-muted/60">{label}</span>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, change, color, delay = 0 }) {
  const isUp = change > 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.05 }}
      className="glass-premium rounded-2xl p-4 card-hover"
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center shadow-lg shrink-0`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-0.5 text-[10px] font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-[10px] text-zyvo-muted mt-0.5">{label}</p>
    </motion.div>
  )
}

const peakDaysOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function ProviderStatistiques() {
  const { provider } = useOutletContext()
  const { allBookings } = useBookings()
  const loading = useLoading(350)
  const [period, setPeriod] = useState('6m')

  const stats = useMemo(() => {
    if (!provider) return null

    const myBookings = allBookings.filter(b => {
      const name = b.name || b.provider?.name || ''
      return name === provider.name
    })
    const completed = myBookings.filter(b => b.status === 'Terminée')
    const confirmed = myBookings.filter(b => b.status === 'Confirmée')
    const pending = myBookings.filter(b => b.status === 'En attente')

    const totalEarnings = completed.reduce((sum, b) => {
      const price = parseInt((b.priceValue || b.provider?.priceValue || '0').toString().replace(/\D/g, ''))
      return sum + (isNaN(price) ? 0 : price)
    }, 0)

    // Generate mock monthly revenue for chart
    const now = new Date()
    const monthlyData = Array.from({ length: 6 }).map((_, i) => {
      const m = (now.getMonth() - 5 + i + 12) % 12
      const y = now.getMonth() - 5 + i < 0 ? now.getFullYear() - 1 : now.getFullYear()
      const isCurrentMonth = i === 5
      return {
        month: months[m],
        year: y,
        revenue: isCurrentMonth ? totalEarnings : randomBetween(8000, 60000),
        bookings: isCurrentMonth ? completed.length : randomBetween(2, 12),
      }
    })

    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue), 1)

    // Peak days data
    const peakDays = peakDaysOrder.map(d => ({
      day: d,
      count: randomBetween(3, 25),
    }))
    const maxPeak = Math.max(...peakDays.map(d => d.count), 1)

    // Mock views & conversion
    const totalViews = randomBetween(800, 2500)
    const totalQuotes = myBookings.length + randomBetween(5, 20)
    const conversionRate = totalViews > 0 ? ((totalQuotes / totalViews) * 100) : 0
    const responseTime = randomBetween(8, 45)
    const rating = provider?.rating || 4.5
    const viewsChange = randomBetween(-5, 25)
    const quotesChange = randomBetween(-8, 30)
    const responseChange = randomBetween(-12, 8)
    const ratingChange = randomBetween(-3, 8)
    const avgPerMission = completed.length > 0 ? Math.round(totalEarnings / completed.length) : 0

    // Top clients
    const topClients = [
      { name: 'Sarah M.', missions: randomBetween(3, 8), total: randomBetween(8000, 35000) },
      { name: 'Amine H.', missions: randomBetween(2, 5), total: randomBetween(5000, 20000) },
      { name: 'Lydia T.', missions: randomBetween(2, 4), total: randomBetween(4000, 15000) },
      { name: 'Rayan B.', missions: randomBetween(1, 3), total: randomBetween(2000, 12000) },
    ]

    // Performance percentile
    const topPercent = randomBetween(5, 35)

    return {
      totalViews, totalQuotes, conversionRate, responseTime, rating,
      viewsChange, quotesChange, responseChange, ratingChange,
      totalEarnings, avgPerMission, completedCount: completed.length,
      monthlyData, maxRevenue, peakDays, maxPeak, topClients, topPercent,
      totalMissions: myBookings.length,
    }
  }, [provider, allBookings])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-48 rounded bg-white/5 animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
        <div className="h-48 rounded-2xl bg-white/5 animate-pulse" />
      </div>
    )
  }

  if (!stats || !provider) {
    return (
      <div className="text-center py-16">
        <BarChart3 className="w-12 h-12 text-zyvo-muted/20 mx-auto mb-3" />
        <p className="font-bold text-white">Statistiques non disponibles</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold">Mes <span className="gradient-text-brand">statistiques</span></h1>
        <p className="text-xs text-zyvo-muted mt-0.5">Aperçu de votre performance</p>
      </div>

      {/* Top percent badge */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-premium rounded-2xl p-4 bg-gradient-to-r from-zyvo-gold/5 to-transparent border border-zyvo-gold/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shrink-0">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-white">Top {stats.topPercent}% des prestataires</p>
            <p className="text-[10px] text-zyvo-muted">Basé sur votre note, vos missions et votre réactivité</p>
          </div>
          <Zap className="w-5 h-5 text-zyvo-gold ml-auto shrink-0" />
        </div>
      </motion.div>

      {/* 4 metric cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Eye} label="Vues du profil" value={stats.totalViews.toLocaleString()} change={stats.viewsChange} color="bg-gradient-to-br from-sky-600 to-blue-500" delay={0} />
        <StatCard icon={MessageCircle} label="Demandes reçues" value={stats.totalQuotes} change={stats.quotesChange} color="bg-gradient-to-br from-purple-600 to-pink-500" delay={1} />
        <StatCard icon={Clock} label="Réponse moyenne" value={`${stats.responseTime} min`} change={stats.responseChange} color="bg-gradient-to-br from-amber-600 to-orange-500" delay={2} />
        <StatCard icon={Star} label="Note moyenne" value={stats.rating.toFixed(1)} change={stats.ratingChange} color="bg-gradient-to-br from-emerald-600 to-teal-500" delay={3} />
      </div>

      {/* Monthly Revenue Chart */}
      <div className="glass-premium rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-zyvo-gold" />
            <h3 className="font-bold text-sm text-white">Revenus</h3>
          </div>
          <div className="flex items-center gap-1">
            {['6m', '12m'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${period === p ? 'bg-zyvo-gold/20 text-zyvo-gold' : 'text-zyvo-muted hover:text-white'}`}
              >
                {p === '6m' ? '6 mois' : '12 mois'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between h-24 sm:h-28 gap-1">
          {stats.monthlyData.map((d, i) => (
            <Bar key={i} value={d.revenue} max={stats.maxRevenue} label={d.month} height={i === 5 ? 110 : 100} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div>
            <p className="text-[10px] text-zyvo-muted">Total</p>
            <p className="text-sm font-bold text-white">{stats.totalEarnings.toLocaleString()} DA</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zyvo-muted">Moyen/mission</p>
            <p className="text-sm font-bold text-zyvo-gold">{stats.avgPerMission.toLocaleString()} DA</p>
          </div>
        </div>
      </div>

      {/* Conversion funnel */}
      <div className="glass-premium rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-zyvo-muted" />
          <h3 className="font-bold text-sm text-white">Entonnoir de conversion</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Vues du profil', value: stats.totalViews, pct: 100, color: 'bg-sky-500' },
            { label: 'Demandes de devis', value: stats.totalQuotes, pct: Math.round((stats.totalQuotes / stats.totalViews) * 100), color: 'bg-purple-500' },
            { label: 'Réservations', value: stats.totalMissions, pct: Math.round((stats.totalMissions / stats.totalViews) * 100), color: 'bg-amber-500' },
            { label: 'Missions terminées', value: stats.completedCount, pct: Math.round((stats.completedCount / stats.totalViews) * 100), color: 'bg-emerald-500' },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-zyvo-muted">{item.label}</span>
                <span className="text-[11px] font-bold text-white">{item.value.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
              <p className="text-[9px] text-zyvo-muted/50 mt-0.5">{item.pct}%</p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[10px] text-center text-zyvo-muted">
            Taux de conversion global : <span className="font-bold text-zyvo-gold">{stats.conversionRate.toFixed(1)}%</span>
            <span className="text-zyvo-muted/50"> (vues → réservations)</span>
          </p>
        </div>
      </div>

      {/* Peak days */}
      <div className="glass-premium rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-zyvo-muted" />
          <h3 className="font-bold text-sm text-white">Jours les plus demandés</h3>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {stats.peakDays.map(d => {
            const pct = stats.maxPeak > 0 ? (d.count / stats.maxPeak) * 100 : 0
            return (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <div className="w-full flex justify-center" style={{ height: 60 }}>
                  <div
                    className="w-full max-w-[24px] rounded-lg self-end bg-gradient-to-t from-zyvo-gold/40 to-zyvo-gold"
                    style={{ height: `${Math.max(pct, 8)}%` }}
                  />
                </div>
                <span className="text-[8px] font-bold text-zyvo-muted">{d.day.slice(0, 3)}</span>
                <span className="text-[8px] text-zyvo-muted/50">{d.count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top clients */}
      <div className="glass-premium rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-zyvo-muted" />
          <h3 className="font-bold text-sm text-white">Meilleurs clients</h3>
        </div>
        <div className="space-y-2">
          {stats.topClients.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-zyvo-gold/30 to-zyvo-gold/10 flex items-center justify-center text-[10px] font-bold text-zyvo-gold shrink-0">
                #{i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{c.name}</p>
                <p className="text-[10px] text-zyvo-muted">{c.missions} mission{c.missions > 1 ? 's' : ''}</p>
              </div>
              <p className="text-xs font-bold text-zyvo-gold">{c.total.toLocaleString()} DA</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2" />
    </div>
  )
}