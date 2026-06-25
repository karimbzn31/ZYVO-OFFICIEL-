import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Users, Briefcase, Calendar, DollarSign, ShieldCheck, X, Check, Search, TrendingUp, Star, Clock } from 'lucide-react'
import { useAuth } from '../../context/auth'
import { providers } from '../../data/mockData'

const mockUsers = [
  { id: 1, name: 'Ahmed K.', phone: '+213 555 12 34 56', role: 'client', joined: '2026-01-15', bookings: 3 },
  { id: 2, name: 'Sarah M.', phone: '+213 666 78 90 12', role: 'client', joined: '2026-02-20', bookings: 7 },
  { id: 3, name: 'Mohamed L.', phone: '+213 777 34 56 78', role: 'prestataire', joined: '2026-03-10', bookings: 12, verified: true },
  { id: 4, name: 'Karim B.', phone: '+213 555 98 76 54', role: 'prestataire', joined: '2026-01-05', bookings: 45, verified: true },
  { id: 5, name: 'Amina K.', phone: '+213 666 12 34 56', role: 'prestataire', joined: '2026-02-14', bookings: 28, verified: false },
  { id: 6, name: 'Youcef A.', phone: '+213 777 98 76 54', role: 'client', joined: '2026-04-01', bookings: 1 },
]

const pendingProviders = providers.filter(p => !p.badges.includes('Vérifié')).slice(0, 3).map(p => ({
  id: p.id, name: p.name, service: p.service, city: p.city,
}))

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  if (!user || user.role !== 'admin') {
    return <Navigate to="/profile" replace />
  }

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone.includes(searchQuery)
  )

  const totalRevenue = 456000
  const stats = [
    { icon: Users, label: 'Utilisateurs totaux', value: mockUsers.length.toString(), color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Briefcase, label: 'Prestataires', value: providers.length.toString(), color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Calendar, label: 'Réservations', value: '142', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: DollarSign, label: 'Revenus', value: `${totalRevenue.toLocaleString()} DA`, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ]

  const tabs = [
    { key: 'overview', label: 'Vue d\'ensemble' },
    { key: 'users', label: 'Utilisateurs' },
    { key: 'providers', label: 'Prestataires' },
  ]

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-zyvo-gold" /> Administration
          </h1>
          <p className="text-sm text-zyvo-muted mt-1">Gérez votre plateforme Zyvo</p>
        </div>
        <div className="text-xs text-zyvo-muted bg-white/5 px-3 py-1.5 rounded-lg">
          {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 glass-premium rounded-xl p-1 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.key ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === 'overview' && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-5 card-hover border border-white/5`}>
                <s.icon className={`w-6 h-6 ${s.color} mb-3`} strokeWidth={1.5} />
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-zyvo-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* PENDING PROVIDERS */}
            <div className="glass-premium rounded-2xl p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-zyvo-gold" /> En attente de validation
              </h3>
              {pendingProviders.length === 0 ? (
                <p className="text-sm text-zyvo-muted text-center py-6">Tout est à jour ✓</p>
              ) : (
                <div className="space-y-3">
                  {pendingProviders.map((p) => (
                    <div key={p.id} className="flex items-center justify-between glass-premium-light rounded-xl p-3">
                      <div>
                        <div className="text-sm font-bold text-white">{p.name}</div>
                        <div className="text-xs text-zyvo-muted">{p.service} • {p.city}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/20 transition-all">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-all">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RECENT ACTIVITY */}
            <div className="glass-premium rounded-2xl p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-zyvo-gold" /> Activité récente
              </h3>
              <div className="space-y-3">
                {[
                  { text: 'Nouvelle inscription : Ahmed K.', time: 'Il y a 10 min', type: 'user' },
                  { text: 'Réservation confirmée : Plomberie', time: 'Il y a 30 min', type: 'booking' },
                  { text: 'Candidature prestataire : Nadia T.', time: 'Il y a 2h', type: 'provider' },
                  { text: 'Avis signalé : Cours de maths', time: 'Il y a 5h', type: 'review' },
                  { text: 'Paiement reçu : 1 500 DA', time: 'Il y a 6h', type: 'payment' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'user' ? 'bg-blue-400' :
                      item.type === 'booking' ? 'bg-emerald-400' :
                      item.type === 'provider' ? 'bg-purple-400' :
                      item.type === 'payment' ? 'bg-zyvo-gold' : 'bg-amber-400'
                    }`} />
                    <span className="flex-1 text-zyvo-muted">{item.text}</span>
                    <span className="text-[10px] text-zyvo-muted">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* USERS TABLE */}
      {activeTab === 'users' && (
        <div className="glass-premium rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-2 glass-premium-light rounded-xl px-4 h-11 max-w-sm">
              <Search className="w-4 h-4 text-zyvo-muted shrink-0" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-white placeholder:text-zyvo-muted"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-zyvo-muted text-xs font-bold uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Nom</th>
                  <th className="text-left px-4 py-3">Téléphone</th>
                  <th className="text-left px-4 py-3">Rôle</th>
                  <th className="text-left px-4 py-3">Inscrit le</th>
                  <th className="text-center px-4 py-3">Réservations</th>
                  <th className="text-center px-4 py-3">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold text-white">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zyvo-muted">{u.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        u.role === 'prestataire' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {u.role === 'prestataire' ? 'Prestataire' : 'Client'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zyvo-muted">{u.joined}</td>
                    <td className="px-4 py-3 text-center text-white font-semibold">{u.bookings}</td>
                    <td className="px-4 py-3 text-center">
                      {u.verified !== false ? (
                        <span className="text-emerald-400 text-xs flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Vérifié
                        </span>
                      ) : u.role === 'prestataire' ? (
                        <span className="text-amber-400 text-xs flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" /> En attente
                        </span>
                      ) : (
                        <span className="text-zyvo-muted text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PROVIDERS TAB */}
      {activeTab === 'providers' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p) => (
            <div key={p.id} className="glass-premium rounded-2xl p-4 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-sm font-bold text-white">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{p.name}</div>
                    <div className="text-xs text-zyvo-muted">{p.service}</div>
                  </div>
                </div>
                {p.badges.includes('Vérifié') ? (
                  <span className="text-emerald-400"><ShieldCheck className="w-4 h-4" /></span>
                ) : (
                  <span className="text-amber-400"><Clock className="w-4 h-4" /></span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-zyvo-muted border-t border-white/5 pt-3">
                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {p.rating}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {p.missions}</span>
                <span>{p.city}</span>
                <span className="font-bold text-white">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
