import { useParams, Link } from 'react-router-dom'
import { Search, Star, Users, ShieldCheck, ArrowRight, Sparkles, MapPin, CheckCircle, Clock } from 'lucide-react'
import { categories, providers } from '../data/mockData'

const serviceDetails = {
  menage: {
    title: 'Ménage & Nettoyage',
    desc: 'Un intérieur impeccable, du sol au plafond. Nos agents de nettoyage sont formés, équipés et vérifiés pour vous offrir un service de qualité.',
    longDesc: 'Que ce soit pour un nettoyage hebdomadaire, un grand ménage de printemps ou une intervention ponctuelle, nos professionnels s\'adaptent à vos besoins. Produits fournis, matériel inclus, résultat garanti.',
    icon: Search,
    features: ['Nettoyage complet', 'Repassage', 'Vitres & surfaces', 'Produits fournis'],
    gradient: 'from-blue-600 to-cyan-400',
    stats: { pros: 45, missions: 1200, note: 4.8 },
  },
  plomberie: {
    title: 'Plomberie',
    desc: 'Des plombiers certifiés pour vos installations et dépannages. Intervention rapide, tarifs transparents, travail garanti.',
    longDesc: 'Fuite d\'eau, robinet qui goutte, chasse d\'eau bloquée, chauffe-eau en panne ? Nos plombiers interviennent chez vous avec leur propre matériel et vous fournissent un devis détaillé avant toute intervention.',
    icon: Search,
    features: ['Dépannage urgence', 'Installation complète', 'Chauffe-eau', 'Devis gratuit'],
    gradient: 'from-purple-600 to-pink-400',
    stats: { pros: 32, missions: 890, note: 4.7 },
  },
  electricite: {
    title: 'Électricité',
    desc: 'Des électriciens qualifiés pour tous vos travaux. Installation, rénovation, dépannage. Sécurité et conformité garanties.',
    longDesc: 'De la simple prise à remplacer à l\'installation complète d\'un tableau électrique, nos électriciens agréés interviennent dans le respect des normes de sécurité. Diagnostic gratuit, devis transparent.',
    icon: Search,
    features: ['Installation électrique', 'Dépannage', 'Mise aux normes', 'Tableau électrique'],
    gradient: 'from-amber-600 to-orange-400',
    stats: { pros: 28, missions: 650, note: 4.6 },
  },
  demenagement: {
    title: 'Déménagement',
    desc: 'Un déménagement sans stress avec nos professionnels. Devis gratuit, équipe complète, matériel de protection inclus.',
    longDesc: 'Appartement ou villa, petit ou gros volume, sur Alger ou en inter-wilaya — nos déménageurs s\'occupent de tout. Emballage, chargement, transport, déchargement, installation. Vous ne levez pas le petit doigt.',
    icon: Search,
    features: ['Emballage fourni', 'Camion + équipe', 'Assurance incluse', 'Devis gratuit'],
    gradient: 'from-emerald-600 to-teal-400',
    stats: { pros: 18, missions: 520, note: 4.5 },
  },
  cours: {
    title: 'Cours & Formations',
    desc: 'Des professeurs passionnés pour vous accompagner. Maths, langues, musique, informatique — tous niveaux.',
    longDesc: 'Du soutien scolaire à la préparation aux examens, en passant par l\'apprentissage des langues ou de la musique, trouvez le professeur qui vous correspond. Cours à domicile ou en ligne selon vos préférences.',
    icon: Search,
    features: ['Tous niveaux', 'Préparation exams', 'À domicile ou en ligne', 'Méthode adaptée'],
    gradient: 'from-violet-600 to-indigo-400',
    stats: { pros: 38, missions: 780, note: 4.9 },
  },
  sante: {
    title: 'Santé & Bien-être',
    desc: 'Des professionnels de santé à votre domicile pour des soins de qualité. Infirmiers, kinésithérapeutes, aides-soignants.',
    longDesc: 'Soins infirmiers, rééducation, accompagnement des personnes âgées — nos professionnels de santé interviennent à votre domicile avec tout le matériel nécessaire. Prescription médicale acceptée.',
    icon: Search,
    features: ['Soins à domicile', 'Matériel inclus', '7j/7', 'Prescription acceptée'],
    gradient: 'from-rose-600 to-red-400',
    stats: { pros: 22, missions: 450, note: 4.9 },
  },
  jardinage: {
    title: 'Jardinage & Espaces verts',
    desc: 'Des jardiniers paysagistes pour entretenir votre extérieur. Tonte, taille, plantation, nettoyage.',
    longDesc: 'Votre jardin mérite toute l\'attention d\'un professionnel. Tonte de pelouse, taille de haies, élagage, plantation, nettoyage de terrain — nos jardiniers transforment votre extérieur.',
    icon: Search,
    features: ['Tonte pelouse', 'Taille haies', 'Nettoyage terrain', 'Plantation'],
    gradient: 'from-green-600 to-emerald-400',
    stats: { pros: 15, missions: 320, note: 4.6 },
  },
  coiffure: {
    title: 'Coiffure & Esthétique',
    desc: 'Coiffeurs et esthéticiennes à domicile. Brushing, coupe, coloration, soins beauté. À votre convenance.',
    longDesc: 'Plus besoin de vous déplacer. Coiffure, manucure, maquillage, épilation — nos professionnels viennent directement chez vous avec tout leur matériel. Hygiène irréprochable, résultat professionnel.',
    icon: Search,
    features: ['Coiffure à domicile', 'Soins esthétiques', 'Matériel fourni', 'Produits professionnels'],
    gradient: 'from-pink-600 to-rose-400',
    stats: { pros: 25, missions: 510, note: 4.8 },
  },
}

export default function ServicePage() {
  const { slug } = useParams()
  const service = serviceDetails[slug]
  const category = categories.find(c => c.label.toLowerCase().includes(slug === 'menage' ? 'maison' : ''))

  if (!service) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-extrabold mb-2">Service introuvable</h2>
        <p className="text-zyvo-muted mb-6">Ce service n'existe pas.</p>
        <Link to="/search" className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl">
          Voir tous les services
        </Link>
      </div>
    )
  }

  const filteredProviders = providers.filter(p => p.category === slug).slice(0, 3)

  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* HERO */}
      <div className={`rounded-3xl p-8 sm:p-10 mb-8 bg-gradient-to-br ${service.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-sm font-bold text-white mb-4">
            <Sparkles className="w-4 h-4" /> Service
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">{service.title}</h1>
          <p className="text-white/80 max-w-xl mb-6">{service.desc}</p>
          <Link to="/search" className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all">
            Trouver un prestataire <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Users, label: 'Prestataires', value: service.stats.pros },
          { icon: CheckCircle, label: 'Missions réalisées', value: service.stats.missions },
          { icon: Star, label: 'Note moyenne', value: service.stats.note },
        ].map(({ icon: SrvIcon, label, value }) => (
          <div key={label} className="glass-premium rounded-2xl p-4 text-center card-hover">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-2 shadow-lg">
              <SrvIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div className="text-lg font-extrabold gradient-text">{value}</div>
            <div className="text-xs text-zyvo-muted">{label}</div>
          </div>
        ))}
      </div>

      {/* DESCRIPTION */}
      <div className="glass-premium rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-lg mb-3">À propos de ce service</h2>
        <p className="text-sm text-zyvo-muted leading-relaxed">{service.longDesc}</p>
      </div>

      {/* FEATURES */}
      <h2 className="text-xl font-extrabold mb-4">Ce qui est inclus</h2>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {service.features.map((f) => (
          <div key={f} className="glass-premium rounded-2xl p-4 flex items-center gap-3 card-hover">
            <CheckCircle className="w-5 h-5 text-zyvo-success" />
            <span className="text-sm font-semibold text-white">{f}</span>
          </div>
        ))}
      </div>

      {/* TOP PROVIDERS */}
      {filteredProviders.length > 0 && (
        <>
          <h2 className="text-xl font-extrabold mb-4">Meilleurs prestataires</h2>
          <div className="space-y-3 mb-8">
            {filteredProviders.map((p) => (
              <Link key={p.id} to={`/provider/${p.id}`} className="glass-premium rounded-2xl p-4 card-hover flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-sm font-bold text-white">{p.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="flex items-center gap-2 text-xs text-zyvo-muted">
                      <Star className="w-3 h-3 text-zyvo-gold fill-current" /> {p.rating}
                      <MapPin className="w-3 h-3" /> {p.city}
                      <span className="text-zyvo-gold font-semibold">{p.price}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zyvo-muted group-hover:text-zyvo-gold transition-colors" />
              </Link>
            ))}
          </div>
        </>
      )}

      {/* CTA */}
      <div className="gradient-brand rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold text-white mb-2">Besoin de ce service ?</h2>
          <p className="text-white/70 mb-6">Trouvez le meilleur prestataire près de chez vous.</p>
          <Link to="/search" className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all">
            Rechercher maintenant <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
