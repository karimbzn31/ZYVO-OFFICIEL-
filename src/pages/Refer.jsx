import { useState } from 'react'
import { Gift, Users, Copy, Check, Share2, Sparkles, ArrowRight, Smartphone, Wallet, Star } from 'lucide-react'

export default function Refer() {
  const [copied, setCopied] = useState(false)
  const code = 'ZYVO25'
  const link = 'https://zyvo.dz/ref/ZYVO25'

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const steps = [
    { icon: Share2, title: 'Partage ton code', desc: 'Envoie ton code de parrainage à tes amis et ta famille.' },
    { icon: Users, title: 'Ils s\'inscrivent', desc: 'Ton filleul utilise ton code lors de son inscription sur Zyvo.' },
    { icon: Wallet, title: 'Tu gagnes 500 DA', desc: 'Une fois sa première mission réalisée, tu reçois 500 DA de crédit.' },
    { icon: Star, title: 'Eux aussi !', desc: 'Ton filleul reçoit aussi 200 DA de réduction sur sa première réservation.' },
  ]

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zyvo-gold/10 border border-zyvo-gold/20 text-sm text-zyvo-gold mb-6">
          <Gift className="w-4 h-4" /> Parrainage
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Parraine & <span className="gradient-text">gagne</span>
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Invite tes proches à rejoindre Zyvo et gagnez tous les deux !
        </p>
      </div>

      {/* REWARD CARD */}
      <div className="gradient-warm rounded-3xl p-8 sm:p-10 text-center mb-12 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="text-5xl font-extrabold text-white mb-2">500 DA</div>
          <p className="text-white/80">de crédit pour chaque filleul qui effectue sa première mission</p>
        </div>
      </div>

      {/* CODE */}
      <div className="glass-premium rounded-2xl p-6 sm:p-8 mb-12 text-center">
        <p className="text-sm text-zyvo-muted mb-4">Ton code de parrainage personnel</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em] gradient-text">{code}</div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={copyCode} className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all">
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copié !' : 'Copier le code'}
          </button>
          <button onClick={() => navigator.share?.({ title: 'Zyvo', text: `Utilise mon code ${code} sur Zyvo et gagne 200 DA !`, url: link })}
            className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
            <Share2 className="w-5 h-5" /> Partager
          </button>
        </div>
      </div>

      {/* STEPS */}
      <h2 className="text-2xl font-extrabold mb-6">Comment ça marche</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {steps.map((s, i) => (
          <div key={s.title} className="glass-premium rounded-2xl p-5 card-hover flex gap-4">
            <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0 shadow-lg">
              <s.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-zyvo-gold">Étape {i + 1}</span>
              </div>
              <h3 className="font-bold text-white">{s.title}</h3>
              <p className="text-sm text-zyvo-muted mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SOCIAL SHARE */}
      <div className="glass-premium rounded-2xl p-6 sm:p-8">
        <h3 className="font-bold text-lg text-white mb-4">Partage sur les réseaux</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'WhatsApp', color: 'hover:bg-emerald-500/20 hover:text-emerald-400' },
            { name: 'Facebook', color: 'hover:bg-blue-500/20 hover:text-blue-400' },
            { name: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:text-blue-400' },
            { name: 'Twitter', color: 'hover:bg-sky-500/20 hover:text-sky-400' },
          ].map((s) => (
            <button key={s.name} className={`px-5 py-3 rounded-xl bg-white/5 text-sm font-semibold text-zyvo-muted ${s.color} transition-all`}>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
