import { useState } from 'react'
import { Mail, MapPin, Phone, Clock, Send, Sparkles, MessageCircle, CheckCircle } from 'lucide-react'

const contactMethods = [
  { icon: Mail, title: 'Email', value: 'contact@zyvo.dz', href: 'mailto:contact@zyvo.dz' },
  { icon: Phone, title: 'Téléphone', value: '0560 12 34 56', href: 'tel:+213560123456' },
  { icon: MapPin, title: 'Adresse', value: 'Alger, Algérie' },
  { icon: Clock, title: 'Horaires', value: 'Dim–Jeu 9h–18h' },
]

const faqItems = [
  { q: 'Comment devenir prestataire sur Zyvo ?', a: 'Créez un compte, sélectionnez "Prestataire" et complétez votre profil. Notre équipe vérifie votre identité sous 24h.' },
  { q: 'Combien coûte une réservation ?', a: 'La réservation est gratuite. Zyvo prélève une commission de 10% sur chaque mission.' },
  { q: 'Comment sont vérifiés les prestataires ?', a: 'Chaque prestataire est vérifié manuellement : pièce d\'identité, numéro de téléphone et références.' },
  { q: 'Puis-je annuler une réservation ?', a: 'Oui, jusqu\'à 2h avant le rendez-vous sans frais. Après, des frais de 500 DA s\'appliquent.' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Contact & <span className="gradient-text">Support</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Une question ? Un problème ? On est là pour vous, 7j/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* FORM */}
        <div className="glass-premium rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-zyvo-gold" />
            Envoyez-nous un message
          </h2>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-white text-lg">Message envoyé !</p>
              <p className="text-sm text-zyvo-muted">Nous vous répondons sous 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Votre nom"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Votre email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
                />
              </div>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors">
                <option value="">Sujet</option>
                <option>Question sur un service</option>
                <option>Devenir prestataire</option>
                <option>Problème de réservation</option>
                <option>Réclamation</option>
                <option>Autre</option>
              </select>
              <textarea
                required
                rows={4}
                placeholder="Votre message..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors resize-none"
              />
              <button type="submit" className="gradient-brand text-white font-bold px-6 py-3 rounded-xl w-full flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg glow-worm">
                <Send className="w-4 h-4" /> Envoyer
              </button>
            </form>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-4">
          {contactMethods.map(({ icon: ContactIcon, title, value, href }) => (
            <div key={title} className="glass-premium rounded-2xl p-5 card-hover flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0 shadow-lg">
                <ContactIcon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xs text-zyvo-muted">{title}</div>
                {href ? (
                  <a href={href} className="font-bold text-white hover:text-zyvo-gold transition-colors">{value}</a>
                ) : (
                  <div className="font-bold text-white">{value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-extrabold mb-6 text-center">Questions fréquentes</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {faqItems.map((item) => (
          <div key={item.q} className="glass-premium rounded-2xl p-5 card-hover">
            <h3 className="font-bold text-white text-sm mb-2">{item.q}</h3>
            <p className="text-sm text-zyvo-muted leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
