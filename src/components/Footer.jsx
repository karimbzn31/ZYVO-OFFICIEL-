import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle } from 'lucide-react'

export default function Footer() {
  const footerLinks = [
    {
      title: 'Services',
      links: [
        { label: 'Ménage & Nettoyage', to: '/search' },
        { label: 'Plomberie', to: '/search' },
        { label: 'Services Numériques', to: '/search' },
        { label: 'Déménagement', to: '/search' },
        { label: 'Cours & Formations', to: '/search' },
        { label: 'Santé & Bien-être', to: '/search' },
      ],
    },
    {
      title: 'Zyvo',
      links: [
        { label: 'À propos', to: '/about' },
        { label: 'Comment ça marche', to: '/how-it-works' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Avis clients', to: '/reviews' },
        { label: 'Devenir prestataire', to: '/become-provider' },
        { label: 'Contact & Support', to: '/contact' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: "Conditions d'utilisation", to: '/legal' },
        { label: 'Politique de confidentialité', to: '/privacy' },
        { label: 'Protection des données', to: '/privacy' },
      ],
    },
  ]

  return (
    <footer className="border-t border-white/5 mt-16 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center font-bold text-white text-sm shadow-lg">
                  Z
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-zyvo-gold rounded-full animate-pulse-soft" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold gradient-text-brand leading-tight">Zyvo</span>
                <span className="text-[8px] font-semibold text-zyvo-gold tracking-widest uppercase leading-tight">Le bon pro, près de chez vous</span>
              </div>
            </div>
            <p className="text-xs text-zyvo-muted leading-relaxed">
              Le premier marketplace de services de confiance en Algérie. Des prestataires vérifiés, notés et disponibles près de chez vous.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-4">
              <a href="https://facebook.com/zyvo" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-400 transition-all text-xs font-bold text-zyvo-muted hover:text-blue-400">
                f
              </a>
              <a href="https://instagram.com/zyvo" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-400 transition-all text-xs font-bold text-zyvo-muted hover:text-pink-400">
                ig
              </a>
              <a href="https://linkedin.com/company/zyvo" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:text-blue-400 transition-all">
                <MessageCircle className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
              </a>
              <a href="mailto:contact@zyvo.dz" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-all">
                <Mail className="w-4 h-4 text-zyvo-muted" strokeWidth={1.5} />
              </a>
            </div>

            {/* EMAIL */}
            <a href="mailto:contact@zyvo.dz" className="inline-flex items-center gap-1.5 text-xs text-zyvo-muted hover:text-zyvo-gold transition-colors mt-3">
              <Mail className="w-3 h-3" /> contact@zyvo.dz
            </a>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-sm mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-xs text-zyvo-muted hover:text-zyvo-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zyvo-muted">
            &copy; 2025 Zyvo Algeria. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-zyvo-muted">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Alger, Algérie
            </span>
            <span className="hidden sm:inline">·</span>
            <a href="https://wa.me/213560123456" target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-zyvo-gold hover:underline">
              <MessageCircle className="w-3 h-3" /> Support WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
