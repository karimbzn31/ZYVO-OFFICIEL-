import { Sparkles, ShieldCheck, Eye, Lock, Database, Mail, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    icon: ShieldCheck,
    title: '1. Responsable du traitement',
    content: 'Zyvo est le responsable du traitement des données personnelles collectées sur la plateforme. Pour toute question concernant vos données, contactez-nous à privacy@zyvo.dz.',
  },
  {
    icon: Database,
    title: '2. Données collectées',
    content: 'Nous collectons les données suivantes : nom et prénom, numéro de téléphone, adresse email (optionnelle), ville, photos de profil, et pièces d\'identité pour les prestataires. Nous collectons également des données de navigation (pages visitées, durée de session) via des cookies analytics.',
  },
  {
    icon: Eye,
    title: '3. Finalités du traitement',
    content: 'Vos données sont utilisées pour : créer et gérer votre compte, vous mettre en relation avec des prestataires, vérifier l\'identité des prestataires, améliorer nos services, et vous envoyer des notifications liées à vos réservations.',
  },
  {
    icon: Lock,
    title: '4. Base légale',
    content: 'Le traitement de vos données repose sur votre consentement (article 7 de la loi 18-07) et sur l\'exécution du contrat de service que vous acceptez en utilisant Zyvo.',
  },
  {
    icon: Database,
    title: '5. Durée de conservation',
    content: 'Vos données sont conservées pendant toute la durée de votre compte actif. En cas de suppression de compte, vos données sont définitivement effacées sous 30 jours, sauf obligation légale de conservation.',
  },
  {
    icon: Lock,
    title: '6. Sécurité des données',
    content: 'Zyvo met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données : chiffrement SSL/TLS, accès restreint aux bases de données, audits de sécurité réguliers, et pseudonymisation des données sensibles.',
  },
  {
    icon: Eye,
    title: '7. Partage des données',
    content: 'Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec les prestataires dans le cadre d\'une réservation (nom, téléphone). Nous utilisons des sous-traitants techniques (hébergement, SMS) qui respectent la loi 18-07.',
  },
  {
    icon: Mail,
    title: '8. Vos droits',
    content: 'Conformément à la loi 18-07, vous disposez des droits suivants : droit d\'accès, de rectification, d\'effacement, à la portabilité, d\'opposition, et de limitation du traitement. Pour les exercer, contactez-nous à privacy@zyvo.dz.',
  },
  {
    icon: Trash2,
    title: '9. Suppression de compte',
    content: 'Vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil. La suppression est définitive et entraîne l\'effacement de toutes vos données personnelles sous 30 jours.',
  },
  {
    icon: Mail,
    title: '10. Cookies',
    content: 'Zyvo utilise des cookies essentiels au fonctionnement de la plateforme et des cookies analytics pour améliorer votre expérience. Vous pouvez gérer vos préférences à tout moment. Aucun cookie publicitaire n\'est utilisé.',
  },
  {
    icon: ShieldCheck,
    title: '11. Contact DPO',
    content: 'Notre Délégué à la Protection des Données est joignable à dpo@zyvo.dz pour toute question relative à vos données personnelles.',
  },
  {
    icon: Eye,
    title: '12. Modifications',
    content: 'Cette politique peut être mise à jour pour refléter des changements légaux ou fonctionnels. Vous serez informé·e de toute modification importante par notification sur la plateforme.',
  },
]

export default function Privacy() {
  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Confidentialité
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Politique de <span className="gradient-text">Confidentialité</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Conforme à la loi 18-07 relative à la protection des données personnelles
        </p>
        <p className="text-sm text-zyvo-muted mt-2">Dernière mise à jour : janvier 2026</p>
      </div>

      <div className="glass-premium rounded-3xl p-6 sm:p-8 mb-8">
        <p className="text-sm text-zyvo-muted leading-relaxed">
          Chez Zyvo, la protection de vos données personnelles est une priorité. 
          Cette politique explique quelles données nous collectons, pourquoi nous les collectons, 
          et comment nous les protégeons, conformément à la loi algérienne 18-07.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map(({ icon: SecIcon, title, content }) => (
          <div key={title} className="glass-premium rounded-2xl p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0 shadow-lg mt-0.5">
                <SecIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg mb-2">{title}</h2>
                <p className="text-sm text-zyvo-muted leading-relaxed">{content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-premium rounded-2xl p-6 mt-8">
        <p className="text-sm text-zyvo-muted">
          Des questions ? Contactez notre DPO.
        </p>
        <div className="flex gap-3">
          <Link to="/legal" className="text-sm font-bold text-zyvo-gold hover:underline">
            CGU
          </Link>
          <Link to="/contact" className="text-sm font-bold text-zyvo-gold hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
