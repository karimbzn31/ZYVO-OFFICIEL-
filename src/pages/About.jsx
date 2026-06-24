import { Link } from 'react-router-dom'
import { ShieldCheck, Star, Users, Award, Target, Heart, ArrowRight, Sparkles, Zap } from 'lucide-react'

const team = [
  { name: 'Karim B.', role: 'Fondateur & CEO', bio: 'Passionné par l\'économie locale algérienne et la confiance entre particuliers.', gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Amina K.', role: 'Directrice des opérations', bio: 'Experte en logistique et satisfaction client avec 10 ans d\'expérience.', gradient: 'from-purple-500 to-pink-400' },
  { name: 'Yacine M.', role: 'CTO', bio: 'Développeur full-stack, architecte de la plateforme Zyvo.', gradient: 'from-amber-500 to-orange-400' },
]

const values = [
  { icon: ShieldCheck, title: 'Confiance', desc: 'Chaque prestataire est vérifié manuellement par notre équipe. Pas d\'algorithmes, des humains.' },
  { icon: Star, title: 'Qualité', desc: 'Nous ne compromettons jamais sur la qualité. Note minimale de 4.5 pour rester sur la plateforme.' },
  { icon: Heart, title: 'Local', desc: '100% algérien. Nous connaissons les besoins et les spécificités de chaque ville.' },
  { icon: Target, title: 'Accessible', desc: 'Des prix justes, pas de commissions cachées. Le paiement cash reste disponible.' },
]

export default function About() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* HERO */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Notre histoire
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Révolutionner les services
          <br />
          <span className="gradient-text-brand">en Algérie</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-2xl mx-auto">
          Zyvo est né d'un constat simple : en Algérie, trouver un bon plombier, une femme de ménage 
          ou un professeur particulier relève trop souvent du bouche-à-oreille et de l'incertitude.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: '2025', label: 'Année de création' },
          { value: '500+', label: 'Prestataires vérifiés' },
          { value: '5000+', label: 'Missions réalisées' },
          { value: '12+', label: 'Villes couvertes' },
        ].map((s) => (
          <div key={s.label} className="glass-premium rounded-2xl p-5 text-center card-hover">
            <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
            <div className="text-xs text-zyvo-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* VALUES */}
      <h2 className="text-3xl font-extrabold text-center mb-10">
        Nos <span className="gradient-text-brand">valeurs</span>
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {values.map((v) => (
          <div key={v.title} className="glass-premium rounded-2xl p-6 card-hover">
            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mb-4 shadow-lg">
              <v.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">{v.title}</h3>
            <p className="text-sm text-zyvo-muted leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* TEAM */}
      <h2 className="text-3xl font-extrabold text-center mb-10">
        L'équipe <span className="gradient-text">Zyvo</span>
      </h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-16">
        {team.map((m) => (
          <div key={m.name} className="glass-premium rounded-2xl p-6 text-center card-hover">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-xl font-bold text-white mx-auto mb-4 shadow-lg`}>
              {m.name.charAt(0)}
            </div>
            <h3 className="font-bold text-white">{m.name}</h3>
            <p className="text-xs text-zyvo-gold font-semibold mt-1">{m.role}</p>
            <p className="text-sm text-zyvo-muted mt-3 leading-relaxed">{m.bio}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="gradient-brand rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Prêt à nous rejoindre ?</h2>
          <p className="text-white/80 max-w-md mx-auto mb-8">
            Que vous cherchiez un service ou que vous vouliez proposer le vôtre, Zyvo est là pour vous.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/search" className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all">
              Trouver un service <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/auth" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all">
              Devenir prestataire
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
