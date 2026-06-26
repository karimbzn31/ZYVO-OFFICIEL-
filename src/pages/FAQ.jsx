import { useState } from 'react'
import { Sparkles, ChevronDown, Search, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    category: 'Général',
    items: [
      { q: 'Qu\'est-ce que Zyvo ?', a: 'Zyvo est une plateforme algérienne qui met en relation des clients avec des prestataires de services vérifiés : plomberie, électricité, ménage, coiffure, cours particuliers, etc.' },
      { q: 'Zyvo est-il disponible dans toute l\'Algérie ?', a: 'Oui, Zyvo couvre actuellement plus de 12 villes algériennes et continue de s\'étendre. Consultez notre page Villes pour voir si votre ville est desservie.' },
      { q: 'L\'utilisation de Zyvo est-elle gratuite ?', a: 'Pour les clients, la recherche et la réservation sont entièrement gratuites. Zyvo prélève une commission de 10% aux prestataires sur chaque mission.' },
    ],
  },
  {
    category: 'Inscription & Compte',
    items: [
      { q: 'Comment créer un compte ?', a: 'Cliquez sur "Connexion" en haut à droite, puis "S\'inscrire". Renseignez votre nom et numéro de téléphone, et vous recevrez un code de vérification par SMS.' },
      { q: 'Puis-je être à la fois client et prestataire ?', a: 'Oui, vous pouvez passer d\'un rôle à l\'autre depuis votre profil. Un même numéro peut être utilisé pour les deux.' },
      { q: 'Comment supprimer mon compte ?', a: 'Rendez-vous dans Paramètres depuis votre profil, puis cliquez sur "Supprimer mon compte". La suppression est définitive.' },
    ],
  },
  {
    category: 'Réservations',
    items: [
      { q: 'Comment réserver un service ?', a: 'Trouvez le prestataire qui vous correspond, cliquez sur "Réserver maintenant", choisissez votre créneau et confirmez. Vous recevrez une notification.' },
      { q: 'Puis-je annuler une réservation ?', a: 'Oui, jusqu\'à 2h avant le rendez-vous sans frais. Passé ce délai, des frais de 500 DA peuvent s\'appliquer.' },
      { q: 'Comment payer le prestataire ?', a: 'Le paiement se fait directement entre vous et le prestataire. Zyvo recommande le paiement après service rendu. Le cash et le virement bancaire sont acceptés.' },
    ],
  },
  {
    category: 'Prestataires',
    items: [
      { q: 'Comment devenir prestataire sur Zyvo ?', a: 'Créez un compte, sélectionnez "Professionnel" lors de l\'inscription, remplissez vos informations et soumettez votre pièce d\'identité pour vérification.' },
      { q: 'Combien de temps prend la vérification ?', a: 'Notre équipe vérifie manuellement chaque profil sous 24 à 48 heures maximum. Vous recevrez une notification dès que votre compte est approuvé.' },
      { q: 'Quelle commission Zyvo prélève-t-elle ?', a: 'Zyvo prélève une commission de 10% sur chaque mission effectuée via la plateforme. Pas de frais cachés, pas d\'abonnement mensuel.' },
      { q: 'Comment être visible sur Zyvo ?', a: 'Complétez votre profil avec des photos de qualité, des descriptions détaillées et des tarifs clairs. Les prestataires les mieux notés sont mis en avant.' },
    ],
  },
  {
    category: 'Paiement & Sécurité',
    items: [
      { q: 'Mes données sont-elles protégées ?', a: 'Absolument. Zyvo respecte la loi 18-07 sur la protection des données personnelles. Vos informations ne sont jamais partagées sans votre consentement.' },
      { q: 'Comment sont vérifiés les prestataires ?', a: 'Chaque prestataire fournit une pièce d\'identité valide (CNI ou passeport), un numéro de téléphone actif et des références vérifiables.' },
      { q: 'Que faire en cas de litige ?', a: 'Contactez notre support via la page Contact ou par WhatsApp. Notre équipe mediation intervient sous 24h pour trouver une solution.' },
    ],
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = faqs.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0)

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Aide
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Foire Aux <span className="gradient-text">Questions</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Tout ce que vous devez savoir sur Zyvo
        </p>
      </div>

      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zyvo-muted" />
        <input
          type="text"
          placeholder="Rechercher une question..."
          value={search}
          onChange={e => { setSearch(e.target.value); setOpenIndex(null) }}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
        />
      </div>

      <div className="space-y-8">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-xl font-extrabold mb-4 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full gradient-brand" />
              {cat.category}
            </h2>
            <div className="space-y-2">
              {cat.items.map((item, idx) => {
                const globalIdx = `${cat.category}-${idx}`
                const isOpen = openIndex === globalIdx
                return (
                  <div key={globalIdx} className="glass-premium rounded-2xl overflow-hidden card-hover">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-bold text-white pr-4">{item.q}</span>
                      <ChevronDown className={`w-5 h-5 text-zyvo-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-5 pb-4 text-sm text-zyvo-muted leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <MessageCircle className="w-12 h-12 text-zyvo-muted/30 mx-auto mb-4" />
          <p className="text-zyvo-muted font-semibold">Aucun résultat pour votre recherche</p>
          <button onClick={() => setSearch('')} className="text-zyvo-gold text-sm font-bold hover:underline mt-2">
            Réinitialiser
          </button>
        </div>
      )}

      <div className="gradient-brand rounded-3xl p-8 text-center mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h3 className="text-xl font-extrabold text-white mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
          <p className="text-white/70 text-sm mb-6">Notre équipe est là pour vous aider 7j/7</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all">
              <MessageCircle className="w-4 h-4" /> Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
