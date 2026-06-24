import { Link } from 'react-router-dom'
import { Search, Calendar, Star, UserPlus, ShieldCheck, MessageCircle, ArrowRight, Sparkles } from 'lucide-react'

const clientSteps = [
  { icon: Search, title: 'Recherchez', desc: 'Trouvez le service qu\'il vous faut parmi des centaines de prestataires vérifiés près de chez vous.' },
  { icon: UserPlus, title: 'Choisissez', desc: 'Comparez les notes, lisez les avis et sélectionnez le pro qui vous correspond.' },
  { icon: Calendar, title: 'Réservez', desc: 'Choisissez votre créneau, confirmez en un clic et recevez une notification de confirmation.' },
  { icon: Star, title: 'Profitez', desc: 'Le prestataire arrive à l\'heure, fait le travail, et vous notez votre expérience.' },
]

const providerSteps = [
  { icon: ShieldCheck, title: 'Inscrivez-vous', desc: 'Créez votre profil, vérifiez votre identité et présentez vos services.' },
  { icon: MessageCircle, title: 'Recevez des demandes', desc: 'Les clients vous contactent et réservent directement depuis votre profil.' },
  { icon: Calendar, title: 'Gérez votre agenda', desc: 'Acceptez ou refusez les réservations, gérez vos disponibilités en temps réel.' },
  { icon: Star, title: 'Développez votre activité', desc: 'Accumulez les avis positifs et devenez un Top prestataire Zyvo.' },
]

export default function HowItWorks() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Sparkles className="w-4 h-4 text-zyvo-gold" /> Guide
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Comment ça <span className="gradient-text">marche</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Que vous soyez client ou prestataire, Zyvo rend tout simple.
        </p>
      </div>

      {/* FOR CLIENTS */}
      <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-xs font-bold text-white">1</span>
        Pour les clients
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        {clientSteps.map((s, i) => (
          <div key={s.title} className="glass-premium rounded-2xl p-6 card-hover flex gap-4">
            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0 shadow-lg">
              <s.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-zyvo-gold">Étape {i + 1}</span>
              </div>
              <h3 className="font-bold text-white text-lg">{s.title}</h3>
              <p className="text-sm text-zyvo-muted mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FOR PROVIDERS */}
      <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-xs font-bold text-white">2</span>
        Pour les prestataires
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        {providerSteps.map((s, i) => (
          <div key={s.title} className="glass-premium rounded-2xl p-6 card-hover flex gap-4">
            <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center shrink-0 shadow-lg">
              <s.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-zyvo-gold">Étape {i + 1}</span>
              </div>
              <h3 className="font-bold text-white text-lg">{s.title}</h3>
              <p className="text-sm text-zyvo-muted mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* QUESTIONS */}
      <div className="glass-premium rounded-3xl p-8 text-center">
        <h3 className="text-xl font-extrabold mb-2">Vous avez des questions ?</h3>
        <p className="text-sm text-zyvo-muted mb-6">Notre équipe est là pour vous aider 7j/7.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all glow-worm">
            Nous contacter
          </Link>
          <Link to="/faq" className="glass-premium-light text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  )
}
