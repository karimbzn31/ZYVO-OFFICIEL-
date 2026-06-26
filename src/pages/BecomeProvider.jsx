import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, TrendingUp, Users, Star, Zap, DollarSign, CheckCircle, ArrowRight, Award, Smartphone, Clock } from 'lucide-react'

const benefits = [
  { icon: TrendingUp, title: 'Développez votre activité', desc: 'Rejoignez des milliers de clients actifs chaque jour sur Zyvo. Augmentez votre chiffre d\'affaires sans effort.' },
  { icon: ShieldCheck, title: 'Vérification manuelle', desc: 'Notre équipe vérifie votre identité et vos références. Vos clients vous font confiance dès le premier clic.' },
  { icon: Star, title: 'Visibilité maximale', desc: 'Apparaissez dans les premières recherches. Les prestataires les mieux notés gagnent jusqu\'à 3x plus de missions.' },
  { icon: Zap, title: 'Gestion simplifiée', desc: 'Gérez votre agenda, vos réservations et vos messages depuis un tableau de bord intuitif.' },
  { icon: DollarSign, title: 'Commission juste', desc: 'Seulement 10% de commission par mission. Pas d\'abonnement, pas de frais cachés. Vous gardez le contrôle.' },
  { icon: Smartphone, title: 'Application mobile', desc: 'Recevez les demandes en temps réel, même quand vous êtes en déplacement. Ne ratez jamais une opportunité.' },
]

const steps = [
  { icon: User, num: '1', title: 'Créez votre profil', desc: 'Inscrivez-vous en 2 minutes. Ajoutez vos informations, votre photo et décrivez vos services.' },
  { icon: ShieldCheck, num: '2', title: 'Vérifiez votre identité', desc: 'Envoyez une photo de votre pièce d\'identité. Notre équipe vérifie votre dossier sous 24h.' },
  { icon: Star, num: '3', title: 'Recevez vos premières missions', desc: 'Activez votre profil, fixez vos tarifs et commencez à recevoir des réservations.' },
]

const stats = [
  { value: '500+', label: 'Prestataires actifs' },
  { value: '5000+', label: 'Missions réalisées' },
  { value: '4.7', label: 'Note moyenne' },
  { value: '24h', label: 'Vérification express' },
]

export default function BecomeProvider() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* HERO */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Prestataire
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Devenez prestataire
          <br />
          <span className="gradient-text-brand">sur Zyvo</span>
        </h1>
        <p className="text-lg sm:text-xl text-zyvo-muted mt-4 max-w-2xl mx-auto">
          Rejoignez la première plateforme algérienne de services à domicile. 
          Des milliers de clients vous attendent.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all glow-worm text-lg"
          >
            Créer mon compte <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 glass-premium-light text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all text-lg"
          >
            En savoir plus
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((s) => (
          <div key={s.label} className="glass-premium rounded-2xl p-5 text-center card-hover">
            <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
            <div className="text-xs text-zyvo-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* BENEFITS */}
      <h2 className="text-3xl font-extrabold text-center mb-10">
        Pourquoi rejoindre <span className="gradient-text">Zyvo</span> ?
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {benefits.map((b) => (
          <div key={b.title} className="glass-premium rounded-2xl p-6 card-hover">
            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mb-4 shadow-lg">
              <b.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{b.title}</h3>
            <p className="text-sm text-zyvo-muted leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <h2 className="text-3xl font-extrabold text-center mb-10">
        Comment <span className="gradient-text">ça marche</span>
      </h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-16">
        {steps.map((s) => (
          <div key={s.num} className="glass-premium rounded-2xl p-6 text-center card-hover">
            <div className="w-14 h-14 rounded-xl gradient-warm flex items-center justify-center mx-auto mb-4 shadow-lg">
              <s.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-zyvo-gold/20 text-zyvo-gold text-xs font-bold mb-3">
              {s.num}
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-zyvo-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* TESTIMONIAL */}
      <div className="gradient-warm rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <Award className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <blockquote className="text-xl sm:text-2xl font-bold text-white leading-relaxed mb-6">
            "Grâce à Zyvo, j'ai triplé mon nombre de clients en seulement 3 mois. 
            La plateforme est simple et les clients sont sérieux."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-sm font-bold text-white">AM</div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">Amina K.</div>
              <div className="text-xs text-white/70">Coiffeuse professionnelle — Alger</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ TEASER */}
      <div className="glass-premium rounded-3xl p-6 sm:p-8 text-center mb-8">
        <h3 className="text-xl font-extrabold mb-2">Des questions ?</h3>
        <p className="text-sm text-zyvo-muted mb-6">Consultez notre FAQ ou contactez notre équipe.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/faq" className="text-sm font-bold text-zyvo-gold hover:underline">
            FAQ prestataires
          </Link>
          <span className="text-zyvo-muted">·</span>
          <Link to="/contact" className="text-sm font-bold text-zyvo-gold hover:underline">
            Nous contacter
          </Link>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="gradient-brand rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-8">
            Rejoignez gratuitement Zyvo et commencez à recevoir des missions dès demain.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg"
          >
            <Zap className="w-5 h-5" /> Commencer maintenant
          </Link>
        </div>
      </div>
    </div>
  )
}
