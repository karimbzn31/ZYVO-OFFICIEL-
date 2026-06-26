import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Tag, User, Share2, Heart, Sparkles } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'Comment choisir un bon plombier à Alger ?',
    excerpt: 'Les critères essentiels pour trouver un plombier fiable et compétent dans la capitale.',
    content: `Trouver un bon plombier à Alger peut rapidement tourner au casse-tête. Entre les recommandations du voisinage, les annonces sur Facebook et les numéros griffonnés sur les murs, difficile de savoir à qui faire confiance.

Voici les critères essentiels pour faire le bon choix :

1. La vérification des diplômes et certifications
Un bon plombier doit pouvoir justifier d'une formation professionnelle. En Algérie, le diplôme de formation professionnelle en plomberie est un gage de sérieux.

2. L'expérience et les références
Un professionnel avec plusieurs années d'expérience et des avis clients positifs est toujours plus fiable. Sur Zyvo, chaque prestataire est noté par ses clients précédents.

3. La transparence des tarifs
Méfiez-vous des devis trop vagues. Un bon plombier vous donne un prix clair avant d'intervenir, avec le détail de la main-d'œuvre et des pièces.

4. La réactivité
Les urgences sanitaires ne préviennent pas. Un bon professionnel répond rapidement et peut intervenir dans la journée.

5. L'assurance et les garanties
Vérifiez que votre plombier est assuré. En cas de dégât des eaux ou d'erreur de manipulation, vous serez couvert.

Sur Zyvo, tous nos plombiers sont vérifiés, notés par leurs clients et assurés. Plus besoin de chercher plus loin.`,
    category: 'Conseils',
    date: '15 Juin 2025',
    readTime: '4 min',
    author: 'Karim B.',
    gradient: 'from-blue-600 to-cyan-400',
  },
  {
    id: 2,
    title: 'Tarifs des services à domicile en Algérie',
    excerpt: 'Guide des prix pour le ménage, la plomberie, l\'électricité et plus encore.',
    content: `Quels sont les vrais tarifs des services à domicile en Algérie en 2025 ? Voici un guide complet pour vous aider à y voir plus clair.

Ménage & Repassage : entre 800 et 1 500 DA/heure selon la ville et le type de prestation.

Plomberie : comptez entre 1 500 et 3 000 DA/heure pour un plombier qualifié. Les interventions d'urgence sont généralement plus chères.

Électricité : un électricien facture entre 1 500 et 2 500 DA/heure. L'installation complète d'un tableau électrique peut aller de 15 000 à 30 000 DA.

Cours particuliers : les prix varient de 1 500 à 3 000 DA/heure selon le niveau (primaire, collège, lycée, université) et la matière.

Déménagement : comptez entre 6 000 et 12 000 DA pour un appartement F3 selon le volume et la distance.

Jardinage : entre 1 000 et 1 500 DA/heure pour l'entretien courant (tonte, taille, arrosage).

Sur Zyvo, les prix sont affichés clairement sur chaque profil de prestataire. Vous comparez, vous choisissez, vous réservez.`,
    category: 'Guide',
    date: '10 Juin 2025',
    readTime: '6 min',
    author: 'Amina K.',
    gradient: 'from-purple-600 to-pink-400',
  },
  {
    id: 3,
    title: 'Devenir prestataire sur Zyvo : le guide complet',
    excerpt: 'Comment créer votre profil, attirer vos premiers clients et développer votre activité.',
    content: `Vous êtes artisan, professionnel ou indépendant ? Zyvo vous permet de développer votre activité en ligne facilement.

Étape 1 : Créez votre profil
Inscrivez-vous en quelques minutes. Ajoutez vos photos, décrivez vos services, fixez vos tarifs. Plus votre profil est complet, plus vous inspirez confiance.

Étape 2 : Faites vérifier votre identité
Nous vérifions chaque prestataire manuellement. Pièce d'identité, casier judiciaire, références — tout est contrôlé pour garantir la confiance.

Étape 3 : Recevez des demandes
Dès que votre profil est actif, les clients peuvent vous trouver et vous réserver. Vous recevez une notification à chaque nouvelle demande.

Étape 4 : Gérez votre agenda
Acceptez ou refusez les réservations, définissez vos disponibilités, communiquez avec vos clients via notre messagerie intégrée.

Étape 5 : Développez votre activité
Les avis positifs font monter votre score. Plus vous êtes bien noté, plus vous apparaissez en haut des résultats de recherche.

Rejoignez Zyvo dès aujourd'hui et faites décoller votre activité !`,
    category: 'Prestataires',
    date: '5 Juin 2025',
    readTime: '8 min',
    author: 'Karim B.',
    gradient: 'from-amber-600 to-orange-400',
  },
  {
    id: 4,
    title: 'Les 5 erreurs à éviter quand on cherche un service',
    excerpt: 'Ne tombez plus dans ces pièges courants qui vous font perdre du temps et de l\'argent.',
    content: `Chercher un prestataire de confiance peut être semé d'embûches. Voici les 5 erreurs les plus fréquentes :

1. Ne pas vérifier les avis
Les recommandations verbales ne suffisent pas. Consultez les notes et les commentaires des clients précédents.

2. Choisir uniquement sur le prix
Le moins cher n'est pas toujours le meilleur. Parfois, payer un peu plus vous garantit un travail de qualité et des matériaux fiables.

3. Ne pas demander de devis
Un professionnel sérieux vous fournit toujours un devis détaillé avant de commencer les travaux.

4. Ignorer les certifications
Un plombier sans diplôme, un électricien sans agrément — prenez le temps de vérifier les qualifications.

5. Payer d'avance sans garantie
Évitez de verser la totalité du montant avant la fin de la prestation. Sur Zyvo, le paiement est sécurisé et protégé.

Évitez ces pièges et réservez en toute sérénité sur Zyvo.`,
    category: 'Conseils',
    date: '1 Juin 2025',
    readTime: '3 min',
    author: 'Amina K.',
    gradient: 'from-emerald-600 to-teal-400',
  },
  {
    id: 5,
    title: 'Pourquoi choisir un prestataire vérifié ?',
    excerpt: 'La vérification manuelle de nos prestataires : gage de confiance et de qualité.',
    content: `Chez Zyvo, nous prenons la confiance très au sérieux. Chaque prestataire inscrit sur notre plateforme passe par un processus de vérification rigoureux.

Notre processus de vérification :
- Contrôle de la pièce d'identité
- Vérification du casier judiciaire
- Validation des diplômes et certifications
- Entretien téléphonique individuel
- Vérification des références clients

Pourquoi c'est important ?
Parce que lorsque vous ouvrez votre porte à un inconnu, vous devez avoir l'esprit tranquille. Nos prestataires vérifiés vous offrent cette tranquillité.

Les avantages pour vous :
- Zéro risque d'arnaque
- Des professionnels qualifiés et expérimentés
- Un suivi en cas de problème
- Une assurance incluse sur chaque prestation

Sur Zyvo, la mention "Vérifié" est plus qu'un badge — c'est notre engagement.`,
    category: 'Sécurité',
    date: '25 Mai 2025',
    readTime: '5 min',
    author: 'Yacine M.',
    gradient: 'from-red-600 to-rose-400',
  },
  {
    id: 6,
    title: 'Services à domicile : les tendances 2025',
    excerpt: 'Comment le marché des services à la personne évolue en Algérie cette année.',
    content: `Le marché des services à domicile en Algérie connaît une transformation profonde en 2025. Voici les grandes tendances :

1. La digitalisation massive
De plus en plus d'Algériens cherchent leurs prestataires en ligne. Les plateformes comme Zyvo remplacent progressivement le bouche-à-oreille.

2. L'essor des services à la personne
Avec le rythme de vie qui s'accélère, la demande pour le ménage, la garde d'enfants et l'aide aux seniors explose dans les grandes villes.

3. La vérification comme standard
Les clients ne veulent plus prendre de risques. La vérification d'identité et des antécédents devient un prérequis.

4. Le paiement mobile
CIB, Edahabia, cartes bancaires — les solutions de paiement digital se multiplient et simplifient les transactions.

5. La flexibilité des horaires
Les prestataires proposent des créneaux de plus en plus flexibles, y compris le soir et le week-end.

Zyvo est au cœur de ces tendances, avec une plateforme moderne, sécurisée et 100% adaptée au marché algérien.`,
    category: 'Analyse',
    date: '20 Mai 2025',
    readTime: '7 min',
    author: 'Karim B.',
    gradient: 'from-violet-600 to-indigo-400',
  },
]

export default function BlogPost() {
  const { slug } = useParams()
  const article = articles.find(a => a.id === Number(slug))

  if (!article) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-extrabold mb-2">Article introuvable</h2>
        <p className="text-zyvo-muted mb-6">Cet article n'existe pas ou a été supprimé.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Retour au blog
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zyvo-muted hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Retour au blog
      </Link>

      <div className="glass-premium rounded-2xl overflow-hidden">
        <div className={`h-48 sm:h-64 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative`}>
          <Tag className="w-16 h-16 text-white/20" strokeWidth={1} />
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-white">
            {article.category}
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-zyvo-muted mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {article.author}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">{article.title}</h1>

          <div className="text-sm text-zyvo-muted leading-relaxed space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          {/* SHARE */}
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-zyvo-muted" />
              <span className="text-xs text-zyvo-muted">Partager :</span>
              <button className="text-xs font-semibold text-white bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">Facebook</button>
              <button className="text-xs font-semibold text-white bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">LinkedIn</button>
              <button className="text-xs font-semibold text-white bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">WhatsApp</button>
            </div>
            <button className="flex items-center gap-1 text-xs text-zyvo-muted hover:text-zyvo-error transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
