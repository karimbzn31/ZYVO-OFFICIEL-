import { useState } from 'react'
import { Gift, CreditCard, Send, Check, Sparkles, ArrowRight, Heart, ShieldCheck, Smartphone } from 'lucide-react'

const amounts = [500, 1000, 2000, 5000, 10000]
const designs = [
  { name: 'Classique', gradient: 'from-blue-600 to-cyan-400' },
  { name: 'Premium', gradient: 'from-purple-600 to-pink-400' },
  { name: 'Gold', gradient: 'from-amber-500 to-orange-400' },
  { name: 'Nature', gradient: 'from-emerald-600 to-teal-400' },
]

export default function Voucher() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(2000)
  const [design, setDesign] = useState(designs[0])
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSend = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold mb-3">Bon cadeau envoyé !</h1>
        <p className="text-zyvo-muted mb-2">Ton bon cadeau de <span className="font-bold text-white">{amount} DA</span> a été envoyé à <span className="font-bold text-white">{form.email}</span>.</p>
        <p className="text-sm text-zyvo-muted mb-8">Ils n'ont plus qu'à l'utiliser sur Zyvo !</p>
        <button onClick={() => { setSent(false); setStep(1); setForm({ name: '', email: '', message: '' }) }}
          className="gradient-brand text-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all">
          Offrir un autre bon cadeau
        </button>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
          <Gift className="w-4 h-4 text-zyvo-gold" /> Bon cadeau
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold">
          Offre un <span className="gradient-text">cadeau</span> utile
        </h1>
        <p className="text-lg text-zyvo-muted mt-4 max-w-xl mx-auto">
          Offre un crédit Zyvo à tes proches. Ils choisissent le service qu'ils veulent.
        </p>
      </div>

      {/* PREVIEW */}
      <div className={`rounded-3xl p-8 bg-gradient-to-br ${design.gradient} mb-8 text-center shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-xs font-bold text-white mb-4">
            <Gift className="w-3.5 h-3.5" /> Bon cadeau Zyvo
          </div>
          <div className="text-5xl font-extrabold text-white mb-2">{amount} DA</div>
          <p className="text-white/70 text-sm">Valable sur tous les services Zyvo</p>
          {form.name && <p className="text-white/50 text-xs mt-4">De la part de {form.name}</p>}
        </div>
      </div>

      {/* STEPS */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === s ? 'gradient-brand text-white' : step > s ? 'bg-zyvo-success/20 text-zyvo-success' : 'bg-white/10 text-zyvo-muted'}`}>
            {step > s ? <Check className="w-4 h-4" /> : s}
          </div>
        ))}
        <div className="flex gap-1 ml-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-2 h-2 rounded-full transition-all ${s <= step ? 'bg-zyvo-gold' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="glass-premium rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-extrabold mb-6">Choisis le montant</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {amounts.map((a) => (
              <button key={a} onClick={() => setAmount(a)}
                className={`rounded-2xl p-5 text-center font-bold transition-all ${amount === a ? 'gradient-brand text-white shadow-lg scale-105' : 'bg-white/5 text-zyvo-muted hover:bg-white/10'}`}>
                <div className="text-xl">{a.toLocaleString()} DA</div>
              </button>
            ))}
          </div>
          <div className="text-xs text-zyvo-muted mb-8">
            <p>Le bon cadeau est valable 12 mois et utilisable sur tous les services Zyvo.</p>
          </div>
          <button onClick={() => setStep(2)} className="w-full gradient-brand text-white font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all">
            Continuer
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="glass-premium rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-extrabold mb-6">Choisis le design</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {designs.map((d) => (
              <button key={d.name} onClick={() => setDesign(d)}
                className={`rounded-2xl p-6 text-center font-bold transition-all ${design.name === d.name ? 'ring-2 ring-zyvo-gold scale-105' : 'hover:scale-105'}`}>
                <div className={`h-20 rounded-xl bg-gradient-to-br ${d.gradient} mb-2`} />
                <div className="text-sm text-white">{d.name}</div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-all">Retour</button>
            <button onClick={() => setStep(3)} className="flex-1 gradient-brand text-white font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all">Continuer</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="glass-premium rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-extrabold mb-6">Qui va recevoir ce cadeau ?</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="text-xs text-zyvo-muted mb-1.5 block">Ton nom</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors" placeholder="Ex : Karim" />
            </div>
            <div>
              <label className="text-xs text-zyvo-muted mb-1.5 block">Email du destinataire</label>
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors" placeholder="exemple@email.com" />
            </div>
            <div>
              <label className="text-xs text-zyvo-muted mb-1.5 block">Message personnel (optionnel)</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors resize-none h-24" placeholder="Joyeux anniversaire ! Profite de ce bon cadeau pour te faire chouchouter..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(2)} className="flex-1 bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-all">Retour</button>
              <button type="submit" className="flex-1 gradient-brand text-white font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Envoyer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* INFO */}
      <div className="grid sm:grid-cols-3 gap-3 mt-8">
        {[
          { icon: Heart, title: 'Un cadeau utile', desc: 'Tes proches choisissent ce dont ils ont vraiment besoin.' },
          { icon: ShieldCheck, title: 'Valable 12 mois', desc: 'Ils peuvent l\'utiliser quand ils veulent.' },
          { icon: Smartphone, title: 'Reçu par email', desc: 'Le bon cadeau est envoyé instantanément.' },
        ].map(({ icon: VIcon, title, desc }) => (
          <div key={title} className="glass-premium rounded-2xl p-4 text-center card-hover">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-2 shadow-lg">
              <VIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-sm text-white">{title}</h3>
            <p className="text-xs text-zyvo-muted mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
