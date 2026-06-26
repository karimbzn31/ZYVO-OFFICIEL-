import { useParams, Link } from 'react-router-dom'
import { MapPin, Users, Star, ArrowRight, Sparkles, Search, ShieldCheck } from 'lucide-react'
import { providers } from '../data/mockData'

const cityInfo = {
  alger: { name: 'Alger', population: '3.5M', description: 'La capitale, centre économique et culturel du pays.' },
  oran: { name: 'Oran', population: '1.2M', description: 'Perle de la Méditerranée, deuxième plus grande ville du pays.' },
  constantine: { name: 'Constantine', population: '950K', description: 'Ville des ponts suspendus, capitale de l\'Est algérien.' },
  annaba: { name: 'Annaba', population: '600K', description: 'La coquette ville méditerranéenne de l\'Est.' },
  blida: { name: 'Blida', population: '550K', description: 'Capitale de la Mitidja, ville des roses.' },
  setif: { name: 'Sétif', population: '500K', description: 'Carrefour commercial des Hauts-Plateaux.' },
  'tizi-ouzou': { name: 'Tizi Ouzou', population: '450K', description: 'Cœur de la Kabylie, ville dynamique et culturelle.' },
  bejaia: { name: 'Béjaïa', population: '400K', description: 'Perle de la Kabylie, entre mer et montagne.' },
  tlemcen: { name: 'Tlemcen', population: '380K', description: 'Capitale de l\'art andalou et de l\'histoire.' },
  biskra: { name: 'Biskra', population: '350K', description: 'Porte du Sahara, ville des Zibans.' },
  chlef: { name: 'Chlef', population: '300K', description: 'Ville de l\'Ouest, au carrefour des régions.' },
  boumerdes: { name: 'Boumerdès', population: '280K', description: 'Ville côtière à l\'Est d\'Alger.' },
}

const categoryList = [
  { name: 'Ménage & Nettoyage', slug: 'menage', count: 28 },
  { name: 'Plomberie', slug: 'plomberie', count: 18 },
  { name: 'Électricité', slug: 'electricite', count: 15 },
  { name: 'Cours & Formations', slug: 'cours', count: 22 },
  { name: 'Déménagement', slug: 'demenagement', count: 10 },
  { name: 'Santé & Bien-être', slug: 'sante', count: 12 },
]

export default function CityPage() {
  const { city } = useParams()
  const info = cityInfo[city]
  const cityProviders = providers.filter(p => {
    const citySlug = info ? p.city.toLowerCase().replace(/[\s-]/g, '') : ''
    return citySlug.includes(city)
  })

  if (!info) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <MapPin className="w-16 h-16 text-zyvo-muted mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold mb-2">Ville introuvable</h2>
        <p className="text-zyvo-muted mb-6">Nous ne sommes pas encore disponibles dans cette ville.</p>
        <Link to="/cities" className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl">
          Voir toutes les villes
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* HERO */}
      <div className="gradient-brand rounded-3xl p-8 sm:p-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-sm font-bold text-white mb-4">
            <MapPin className="w-4 h-4" /> Ville
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">{info.name}</h1>
          <p className="text-white/70 mb-2">{info.population} habitants</p>
          <p className="text-white/60 text-sm">{info.description}</p>
          <div className="flex items-center gap-2 mt-4 text-white/80 text-sm">
            <Users className="w-4 h-4" />
            <span className="font-bold">{cityProviders.length}</span> prestataires disponibles
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { icon: Users, label: 'Prestataires', value: cityProviders.length + '+' },
          { icon: Star, label: 'Note moyenne', value: '4.7' },
          { icon: ShieldCheck, label: 'Prestataires vérifiés', value: '100%' },
          { icon: Search, label: 'Services disponibles', value: categoryList.length },
        ].map((s) => (
          <div key={s.label} className="glass-premium rounded-2xl p-4 text-center card-hover">
            <div className="text-xl font-extrabold gradient-text">{s.value}</div>
            <div className="text-xs text-zyvo-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <h2 className="text-xl font-extrabold mb-4">Services disponibles à {info.name}</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {categoryList.map((cat) => (
          <Link key={cat.slug} to={`/service/${cat.slug}`} className="glass-premium rounded-2xl p-4 card-hover flex items-center justify-between group">
            <div>
              <h3 className="font-bold text-white">{cat.name}</h3>
              <p className="text-xs text-zyvo-muted mt-0.5">{cat.count} prestataires</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zyvo-muted group-hover:text-zyvo-gold transition-colors" />
          </Link>
        ))}
      </div>

      {/* TOP PROVIDERS */}
      {cityProviders.length > 0 && (
        <>
          <h2 className="text-xl font-extrabold mb-4">Meilleurs prestataires à {info.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {cityProviders.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/provider/${p.id}`} className="glass-premium rounded-2xl p-4 card-hover">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-sm font-bold text-white">{p.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-xs text-zyvo-muted">{p.service}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-zyvo-gold fill-current" /> {p.rating}</span>
                  <span className="text-zyvo-gold font-semibold">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* CTA */}
      <div className="gradient-warm rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold text-white mb-2">Tu es prestataire à {info.name} ?</h2>
          <p className="text-white/70 mb-6">Rejoins Zyvo et développe ton activité dès maintenant.</p>
          <Link to="/become-provider" className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all">
            Devenir prestataire <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
