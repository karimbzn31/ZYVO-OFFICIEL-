import { Link } from 'react-router-dom'

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
        { label: 'Blog', to: '/blog' },
        { label: 'Villes couvertes', to: '/cities' },
        { label: 'Contact & Support', to: '/contact' },
        { label: 'Devenir prestataire', to: '/auth' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: "Conditions d'utilisation", to: '#' },
        { label: 'Politique de confidentialité', to: '#' },
        { label: 'Protection des données', to: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-white/5 mt-16">
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
            <div className="flex items-center gap-3 mt-4">
              {['Facebook', 'Instagram', 'X'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-zyvo-gold transition-all">
                  <span className="text-xs font-bold text-zyvo-muted">{s.charAt(0)}</span>
                </a>
              ))}
            </div>
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
            &copy; 2026 Zyvo Algeria. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-zyvo-muted">
            <span className="flex items-center gap-1">🇩🇿 Alger, Algérie</span>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-zyvo-gold transition-colors hidden sm:inline">Support WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
