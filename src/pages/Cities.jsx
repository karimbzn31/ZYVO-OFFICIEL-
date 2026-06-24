import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, Sparkles, Users, Star } from 'lucide-react'

const allCities = [
  { name: 'Alger', population: '3.5M', providers: 120, slug: 'alger' },
  { name: 'Oran', population: '1.2M', providers: 65, slug: 'oran' },
  { name: 'Constantine', population: '950K', providers: 48, slug: 'constantine' },
  { name: 'Annaba', population: '600K', providers: 32, slug: 'annaba' },
  { name: 'Blida', population: '550K', providers: 28, slug: 'blida' },
  { name: 'Sétif', population: '500K', providers: 25, slug: 'setif' },
  { name: 'Tizi Ouzou', population: '450K', providers: 30, slug: 'tizi-ouzou' },
  { name: 'Béjaïa', population: '400K', providers: 22, slug: 'bejaia' },
  { name: 'Tlemcen', population: '380K', providers: 20, slug: 'tlemcen' },
  { name: 'Biskra', population: '350K', providers: 15, slug: 'biskra' },
  { name: 'Chlef', population: '300K', providers: 12, slug: 'chlef' },
  { name: 'Boumerdès', population: '280K', providers: 18, slug: 'boumerdes' },
]

export default function Cities() {
  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <MapPin className="w-4 h-4 text-zyvo-gold" /> Présence nationale
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Disponible dans <span className="gradient-text-brand">toute l'Algérie</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Des prestataires vérifiés près de chez vous, dans les plus grandes villes du pays.
        </p>
      </div>

      {/* REGION HIGHLIGHTS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { region: 'Centre', cities: 'Alger, Blida, Boumerdès', count: '150+' },
          { region: 'Ouest', cities: 'Oran, Tlemcen, Chlef', count: '90+' },
          { region: 'Est', cities: 'Constantine, Annaba, Sétif', count: '100+' },
          { region: 'Kabylie', cities: 'Tizi Ouzou, Béjaïa', count: '50+' },
        ].map((r) => (
          <div key={r.region} className="glass-premium rounded-2xl p-5 card-hover">
            <div className="text-xs font-bold text-zyvo-gold uppercase tracking-wider">{r.region}</div>
            <div className="text-xl font-extrabold text-white mt-1">{r.count}</div>
            <div className="text-sm text-zyvo-muted mt-1">{r.cities}</div>
          </div>
        ))}
      </div>

      {/* CITY GRID */}
      <h2 className="text-2xl font-extrabold mb-6">Toutes les villes</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCities.map((city) => (
          <Link
            key={city.slug}
            to={`/category/tous?city=${city.slug}`}
            className="glass-premium rounded-2xl p-5 card-hover flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold">
                {city.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-white">{city.name}</h3>
                <div className="flex items-center gap-2 text-xs text-zyvo-muted mt-0.5">
                  <Users className="w-3 h-3" /> {city.providers} prestataires
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zyvo-muted group-hover:text-zyvo-gold transition-colors" />
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="gradient-brand rounded-3xl p-8 sm:p-12 text-center mt-12 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-4">Votre ville n'est pas listée ?</h2>
          <p className="text-white/80 max-w-md mx-auto mb-8">
            Nous nous développons chaque mois. Inscrivez-vous pour être notifié quand Zyvo arrive dans votre ville.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all">
            Nous suggérer une ville <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
