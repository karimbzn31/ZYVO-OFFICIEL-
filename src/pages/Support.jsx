import { useState } from 'react'
import { MessageCircle, Mail, Phone, Search, ChevronDown, Sparkles, ArrowRight, HelpCircle, ShieldCheck, CreditCard, User, FileText, Smartphone } from 'lucide-react'

const faqs = [
  {
    q: 'Comment réserver un prestataire ?',
    r: 'Rendez-vous sur la page de recherche, choisissez le service qui vous intéresse, comparez les prestataires, sélectionnez votre créneau et confirmez la réservation.',
    icon: Search,
  },
  {
    q: 'Comment devenir prestataire sur Zyvo ?',
    r: 'Cliquez sur "Devenir prestataire" dans le menu, remplissez le formulaire en 5 étapes, vérifiez votre identité et commencez à recevoir des demandes.',
    icon: User,
  },
  {
    q: 'Le paiement est-il sécurisé ?',
    r: 'Oui, toutes les transactions sont sécurisées. Vous pouvez payer par carte (CIB/Edahabia) ou en cash directement au prestataire.',
    icon: CreditCard,
  },
  {
    q: 'Puis-je annuler une réservation ?',
    r: 'Oui, jusqu\'à 24h avant le début de la mission sans frais. Passé ce délai, des frais d\'annulation peuvent s\'appliquer.',
    icon: FileText,
  },
  {
    q: 'Comment sont vérifiés les prestataires ?',
    r: 'Chaque prestataire est vérifié manuellement : pièce d\'identité, casier judiciaire, références clients et entretien téléphonique.',
    icon: ShieldCheck,
  },
  {
    q: 'L\'application mobile est-elle disponible ?',
    r: 'Oui, Zyvo est disponible sur Android et iOS. Téléchargez-la depuis le Play Store ou l\'App Store.',
    icon: Smartphone,
  },
]

const categories = [
  { icon: HelpCircle, label: 'Questions fréquentes' },
  { icon: User, label: 'Compte & Profil' },
  { icon: CreditCard, label: 'Paiement & Facturation' },
  { icon: ShieldCheck, label: 'Vérification & Sécurité' },
  { icon: FileText, label: 'Réservations & Annulations' },
]

export default function Support() {
  const [search, setSearch] = useState('')
  const [openIndex, setOpenIndex] = useState(null)

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <HelpCircle className="w-4 h-4 text-zyvo-gold" /> Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Comment peut-on <span className="gradient-text">t'aider</span> ?
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Trouve rapidement une réponse à tes questions.
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative mb-10 max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zyvo-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher dans l'aide..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-zyvo-muted outline-none focus:border-zyvo-gold/40 transition-all"
        />
      </div>

      {/* CATEGORIES */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {categories.map((c) => (
          <button key={c.label} className="glass-premium rounded-2xl p-4 text-center card-hover">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-2 shadow-lg">
              <c.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-zyvo-muted">{c.label}</span>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-extrabold mb-6">Questions fréquentes</h2>
      <div className="space-y-3 mb-12">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zyvo-muted">Aucun résultat pour "{search}"</p>
          </div>
        )}
        {filtered.map((faq, i) => (
          <div key={i} className="glass-premium rounded-2xl overflow-hidden card-hover">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center gap-4 p-5 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <faq.icon className="w-5 h-5 text-zyvo-gold" strokeWidth={1.5} />
              </div>
              <span className="flex-1 font-semibold text-white">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-zyvo-muted transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 pl-16">
                <p className="text-sm text-zyvo-muted leading-relaxed">{faq.r}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CONTACT */}
      <div className="gradient-brand rounded-3xl p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold text-white mb-2">Pas de réponse ?</h2>
          <p className="text-white/70 mb-6">Notre équipe est disponible 7j/7 pour t'aider.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/213560123456" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a href="mailto:support@zyvo.dz"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <Mail className="w-5 h-5" /> Email
            </a>
            <a href="tel:+213560123456"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <Phone className="w-5 h-5" /> Appel
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
