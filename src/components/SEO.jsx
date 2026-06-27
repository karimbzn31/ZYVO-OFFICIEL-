import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const meta = {
  '/': { title: 'Zyvo — Le bon pro, près de chez vous', description: 'Services locaux & digitaux — trouvez le prestataire vérifié qu\'il vous faut. Plomberie, ménage, cours, coiffure, développement web et plus.' },
  '/search': { title: 'Rechercher un service — Zyvo', description: 'Trouvez le prestataire idéal près de chez vous. Filtrez par ville, prix, note et catégorie.' },
  '/bookings': { title: 'Mes réservations — Zyvo', description: 'Consultez et gérez toutes vos réservations de services.' },
  '/favorites': { title: 'Mes favoris — Zyvo', description: 'Retrouvez vos prestataires favoris en un clin d\'oeil.' },
  '/profile': { title: 'Mon profil — Zyvo', description: 'Gérez votre compte, vos informations et vos préférences.' },
  '/auth': { title: 'Connexion — Zyvo', description: 'Créez un compte ou connectez-vous pour profiter de tous les services Zyvo.' },
  '/about': { title: 'À propos — Zyvo', description: 'Découvrez l\'histoire de Zyvo, notre mission et notre équipe.' },
  '/how-it-works': { title: 'Comment ça marche — Zyvo', description: 'Trouver un prestataire n\'a jamais été aussi simple. Découvrez comment Zyvo fonctionne.' },
  '/cities': { title: 'Villes couvertes — Zyvo', description: 'Zyvo est disponible dans toute l\'Algérie. Découvrez les villes couvertes.' },
  '/contact': { title: 'Contact — Zyvo', description: 'Contactez l\'équipe Zyvo. Support disponible 7j/7.' },
  '/blog': { title: 'Blog & Conseils — Zyvo', description: 'Conseils, astuces et guides pour trouver le bon professionnel près de chez vous.' },
  '/messages': { title: 'Messages — Zyvo', description: 'Discutez avec vos prestataires en temps réel.' },
  '/admin': { title: 'Administration — Zyvo', description: 'Gérez votre plateforme Zyvo.' },
}

export default function SEO({ title, description }) {
  const { pathname } = useLocation()
  const pageMeta = meta[pathname] || {}
  const finalTitle = title || pageMeta.title || meta['/'].title
  const finalDesc = description || pageMeta.description || meta['/'].description

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={`https://zyvo.dz${pathname}`} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
    </Helmet>
  )
}
