import { Sparkles, ShieldCheck, FileText, Scale, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const sections = [
  {
    icon: FileText,
    title: '1. Objet',
    content: 'Les présentes Conditions Générales d\'Utilisation (CGU) régissent l\'accès et l\'utilisation de la plateforme Zyvo (ci-après "la Plateforme"), accessible via l\'application web et mobile. En utilisant Zyvo, vous acceptez pleinement et sans réserve les présentes CGU.',
  },
  {
    icon: Scale,
    title: '2. Définitions',
    content: '"Client" : toute personne physique utilisant la Plateforme pour rechercher et réserver des services. "Prestataire" : tout professionnel proposant ses services via la Plateforme. "Mission" : toute prestation de service réservée via Zyvo.',
  },
  {
    icon: ShieldCheck,
    title: '3. Inscription & Compte',
    content: 'L\'inscription est gratuite et nécessite un nom valide et un numéro de téléphone algérien. Le compte est personnel et non cessible. L\'utilisateur s\'engage à fournir des informations exactes et à les maintenir à jour. Tout compte suspecté d\'activité frauduleuse peut être suspendu sans préavis.',
  },
  {
    icon: Scale,
    title: '4. Vérification des prestataires',
    content: 'Zyvo vérifie manuellement l\'identité de chaque prestataire via une pièce d\'identité valide (CNI ou passeport). Cette vérification est une mesure de confiance mais ne constitue pas une garantie absolue sur la qualité des services fournis.',
  },
  {
    icon: FileText,
    title: '5. Réservations & Annulations',
    content: 'Les réservations sont confirmées après acceptation du prestataire. Le client peut annuler sans frais jusqu\'à 2h avant le rendez-vous. Passé ce délai, des frais de 500 DA peuvent être facturés. Zyvo se réserve le droit de modifier ces conditions à tout moment.',
  },
  {
    icon: Eye,
    title: '6. Paiement',
    content: 'Zyvo ne gère pas les paiements directement. Les transactions s\'effectuent entre le client et le prestataire. Zyvo recommande le paiement après réalisation complète de la mission. Les prix affichés sont en Dinar Algérien (DA), toutes taxes comprises.',
  },
  {
    icon: ShieldCheck,
    title: '7. Commission',
    content: 'Zyvo prélève une commission de 10% sur le montant de chaque mission pour les prestataires. Aucun frais n\'est facturé aux clients. Les commissions peuvent être révisées avec un préavis de 30 jours.',
  },
  {
    icon: Scale,
    title: '8. Responsabilité',
    content: 'Zyvo agit comme intermédiaire technique et ne peut être tenu responsable de la qualité des services fournis par les prestataires. En cas de litige, Zyvo s\'engage à faciliter la médiation entre les parties mais ne peut garantir un résultat spécifique.',
  },
  {
    icon: Eye,
    title: '9. Propriété intellectuelle',
    content: 'Tous les contenus présents sur Zyvo (logo, marque, design, textes) sont la propriété exclusive de Zyvo. Toute reproduction ou utilisation sans autorisation est interdite.',
  },
  {
    icon: FileText,
    title: '10. Modification des CGU',
    content: 'Zyvo se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par notification. L\'utilisation continue de la Plateforme après modification vaut acceptation.',
  },
  {
    icon: Scale,
    title: '11. Droit applicable',
    content: 'Les présentes CGU sont soumises au droit algérien. Tout litige relève de la compétence exclusive des tribunaux d\'Alger.',
  },
  {
    icon: ShieldCheck,
    title: '12. Contact',
    content: 'Pour toute question relative aux CGU, contactez-nous via la page Contact ou par email à contact@zyvo.dz.',
  },
]

export default function Legal() {
  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Légal
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Conditions Générales <span className="gradient-text">d'Utilisation</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Dernière mise à jour : janvier 2026
        </p>
      </div>

      <div className="glass-premium rounded-3xl p-6 sm:p-8 mb-8">
        <p className="text-sm text-zyvo-muted leading-relaxed">
          Bienvenue sur Zyvo. En accédant à notre plateforme, vous vous engagez à respecter les présentes 
          conditions. Nous vous invitons à les lire attentivement avant toute utilisation.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.title} className="glass-premium rounded-2xl p-6 card-hover">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0 shadow-lg mt-0.5">
                <s.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg mb-2">{s.title}</h2>
                <p className="text-sm text-zyvo-muted leading-relaxed">{s.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-premium rounded-2xl p-6 mt-8">
        <p className="text-sm text-zyvo-muted">
          En utilisant Zyvo, vous acceptez ces conditions.
        </p>
        <div className="flex gap-3">
          <Link to="/privacy" className="text-sm font-bold text-zyvo-gold hover:underline">
            Politique de confidentialité
          </Link>
          <Link to="/contact" className="text-sm font-bold text-zyvo-gold hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
