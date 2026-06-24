import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, Sparkles, ShieldCheck, Star,
  Wrench, Home as HomeIcon, Monitor, Zap,
  ChevronRight, MapPin, ChevronUp, Search,
  CheckCircle, MessageCircle, ChevronDown, Truck, User, Heart,
  Phone, Award, Users, Clock
} from 'lucide-react'

const services = [
  { icon: HomeIcon, title: 'Ménage & Nettoyage', desc: 'Nettoyage complet de votre maison par des professionnels vérifiés', 
    gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10' },
  { icon: Wrench, title: 'Plomberie & Dépannage', desc: 'Plombiers certifiés pour tous vos travaux d\'urgence ou rénovation',
    gradient: 'from-purple-500 to-violet-400', bg: 'bg-purple-500/10' },
  { icon: Monitor, title: 'Services Numériques', desc: 'Développement web, design graphique, support technique à domicile',
    gradient: 'from-cyan-500 to-teal-400', bg: 'bg-cyan-500/10' },
  { icon: Zap, title: 'Déménagement', desc: 'Déménageurs professionnels avec camion. Devis gratuit sous 24h',
    gradient: 'from-amber-500 to-orange-400', bg: 'bg-amber-500/10' },
  { icon: Heart, title: 'Santé & Bien-être', desc: 'Infirmiers, kinésithérapeutes et aides-soignants à votre domicile',
    gradient: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-500/10' },
  { icon: Star, title: 'Cours Particuliers', desc: 'Professeurs qualifiés pour tous niveaux : langues, maths, musique et plus',
    gradient: 'from-pink-500 to-rose-400', bg: 'bg-pink-500/10' },
  { icon: CheckCircle, title: 'Coiffure & Esthétique', desc: 'Coiffeurs, maquilleurs et esthéticiennes à domicile',
    gradient: 'from-rose-500 to-red-400', bg: 'bg-rose-500/10' },
  { icon: Truck, title: 'Transport & Logistique', desc: 'Livraison de colis, transport de meubles et courses',
    gradient: 'from-orange-500 to-yellow-400', bg: 'bg-orange-500/10' },
]

const cities = ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Sétif', 'Tizi Ouzou', 'Béjaïa', 'Tlemcen', 'Biskra', 'Chlef', 'Boumerdès']

const topProviders = [
  { name: 'Karim B.', service: 'Plombier certifié', rating: 4.9, reviews: 120, price: '1 500 DA/h', verified: true,
    gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Amina K.', service: 'Aide à domicile', rating: 5.0, reviews: 85, price: '1 200 DA/h', verified: true,
    gradient: 'from-purple-500 to-pink-400' },
  { name: 'Mohamed L.', service: 'Électricien', rating: 4.8, reviews: 64, price: '1 800 DA/h', verified: true,
    gradient: 'from-amber-500 to-orange-400' },
  { name: 'Sara B.', service: 'Coiffeuse à domicile', rating: 4.9, reviews: 42, price: '2 000 DA/séance', verified: true,
    gradient: 'from-emerald-500 to-teal-400' },
]

const testimonials = [
  { name: 'Sarah K.', role: 'Cliente', text: 'J\'ai trouvé une femme de ménage en 24h. Service impeccable, ponctuelle et très professionnelle. Je recommande les yeux fermés !', rating: 5,
    gradient: 'from-pink-500 to-rose-400' },
  { name: 'Mohamed L.', role: 'Client', text: 'Le plombier est arrivé dans l\'heure, a diagnostiqué le problème rapidement et le prix était très correct. Rare de nos jours.', rating: 5,
    gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Amina R.', role: 'Cliente', text: 'Plateforme sérieuse avec des prestataires vérifiés. Je peux enfin laisser quelqu\'un entrer chez moi en toute confiance.', rating: 5,
    gradient: 'from-purple-500 to-violet-400' },
  { name: 'Youcef K.', role: 'Client', text: 'J\'ai pris un cours de maths pour mon fils. Le professeur était excellent et mon fils a beaucoup progressé. Merci Zyvo !', rating: 5,
    gradient: 'from-emerald-500 to-teal-400' },
]

const faqs = [
  { q: 'Comment sont vérifiés les prestataires ?', a: 'Chaque prestataire passe un processus de vérification rigoureux : pièce d\'identité, références vérifiées, entretien téléphonique et validation manuelle par notre équipe.' },
  { q: 'Comment se passe le paiement ?', a: 'Vous pouvez payer en cash directement au prestataire après la prestation, ou en ligne via carte bancaire/CPT. Zyvo ne prélève aucune commission sur le paiement cash.' },
  { q: 'Puis-je annuler une réservation ?', a: 'Oui, l\'annulation est gratuite jusqu\'à 2 heures avant le début de la prestation. Passé ce délai, des frais peuvent s\'appliquer.' },
  { q: 'Que faire si je ne suis pas satisfait ?', a: 'Votre satisfaction est notre priorité. Contactez notre support WhatsApp au +213 XXX XX XX XX et nous trouverons une solution ensemble.' },
  { q: 'Les prestataires sont-ils assurés ?', a: 'Oui, tous nos prestataires partenaires bénéficient d\'une assurance responsabilité civile professionnelle pour votre tranquillité.' },
  { q: 'Dans quelles villes Zyvo est-il disponible ?', a: 'Zyvo est disponible à Alger, Oran, Constantine, Annaba, Blida, Sétif, Tizi Ouzou, Béjaïa, Tlemcen et plus de 20 villes en Algérie.' },
]

function AnimatedCounter({ target, suffix, label, visible, delay, icon: Icon }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (visible && !started.current) {
      started.current = true
      const duration = 2000
      const steps = 60
      const increment = parseInt(target) / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= parseInt(target)) {
          setCount(parseInt(target))
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [visible, target])

  return (
    <div className="glass-premium rounded-2xl p-6 card-hover text-center"
      style={{ animationDelay: `${delay}s` }}>
      {Icon && <Icon className="w-6 h-6 text-zyvo-gold mx-auto mb-2" strokeWidth={1.5} />}
      <div className="text-3xl sm:text-4xl font-extrabold gradient-text">
        {count}{suffix}
      </div>
      <div className="text-sm text-zyvo-muted mt-1">{label}</div>
    </div>
  )
}

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="glass-premium rounded-2xl overflow-hidden card-hover">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-bold text-sm text-white">{q}</span>
        <ChevronDown className={`w-4 h-4 text-zyvo-muted transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 pb-5 text-sm text-zyvo-muted leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

function RippleButton({ children, className, ...props }) {
  const ref = useRef(null)

  const handleClick = useCallback((e) => {
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px'
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px'
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }, [])

  return (
    <button ref={ref} onClick={handleClick} className={`relative overflow-hidden ${className || ''}`} {...props}>
      {children}
    </button>
  )
}

function TiltCard({ children, className }) {
  const ref = useRef(null)

  const handleMove = useCallback((e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    card.style.setProperty('--rot-y', `${(x - 0.5) * 6}deg`)
    card.style.setProperty('--rot-x', `${-(y - 0.5) * 6}deg`)
  }, [])

  const handleLeave = useCallback(() => {
    const card = ref.current
    if (!card) return
    card.style.setProperty('--rot-y', '0deg')
    card.style.setProperty('--rot-x', '0deg')
  }, [])

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`tilt-card ${className || ''}`}>
      <div className="tilt-card-inner">
        {children}
      </div>
    </div>
  )
}

export default function Home() {
  const [visible, setVisible] = useState({})
  const [openFaq, setOpenFaq] = useState(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(v => ({ ...v, [entry.target.dataset.section]: true }))
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setShowBackToTop(scrollTop > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleHeroMouse = (e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
  }

  return (
    <div className="relative">
      {/* SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-white/5">
        <div className="h-full gradient-brand transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* BACK TO TOP */}
      <RippleButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 md:bottom-8 right-4 sm:right-8 z-50 w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-lg transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </RippleButton>

      {/* PARALLAX ORBS */}
      <div
        className="orb w-[700px] h-[700px] bg-blue-500/10 top-[-250px] right-[-200px]"
        style={{ transform: `translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -20}px)` }}
      />
      <div
        className="orb w-[500px] h-[500px] bg-purple-500/8 bottom-[300px] left-[-200px]"
        style={{ transform: `translate(${(mousePos.x - 0.5) * 15}px, ${(mousePos.y - 0.5) * 15}px)` }}
      />
      <div
        className="orb w-[400px] h-[400px] bg-amber-500/8 top-[40%] right-[-100px]"
        style={{ transform: `translate(${(mousePos.x - 0.5) * -10}px, ${(mousePos.y - 0.5) * -10}px)` }}
      />

      {/* ===== HERO — FULL IMPACT, NO MOCKUP ===== */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouse}
        className="relative min-h-[85vh] flex items-center pt-16 pb-8"
      >
        <div className="w-full" data-section="hero">
          <div className="max-w-4xl">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-8 ${visible.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Sparkles className="w-4 h-4 text-zyvo-gold" />
              Le marketplace de services en Algérie
            </div>

            <h1 className={`text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[0.92] sm:leading-[0.95] tracking-tight ${visible.hero ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
              Trouvez <span className="hero-shimmer">le bon pro</span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              qu'il vous faut.
            </h1>

            <p className={`text-lg sm:text-xl text-zyvo-muted mt-6 max-w-2xl leading-relaxed ${visible.hero ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
              Le premier marketplace algérien de services à domicile.
              Des prestataires vérifiés et notés, près de chez vous.
              Ménage, plomberie, cours, santé : trouvez le bon pro en un clic.
            </p>

            <div className={`flex flex-wrap gap-4 mt-10 ${visible.hero ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
              <RippleButton className="group relative inline-flex items-center gap-2 gradient-brand text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 glow-worm overflow-hidden">
                <Link to="/search" className="relative z-10 flex items-center gap-2">
                  Trouver un service
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </RippleButton>
              <RippleButton className="inline-flex items-center gap-2 glass-premium-light text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 hover:scale-105 transition-all duration-300 overflow-hidden">
                <Link to="/auth" className="relative z-10 flex items-center gap-2">
                  Devenir prestataire
                </Link>
              </RippleButton>
            </div>

            {/* SOCIAL PROOF */}
            <div className={`flex flex-wrap items-center gap-6 mt-12 text-sm text-zyvo-muted ${visible.hero ? 'animate-fade-in-up animate-delay-400' : 'opacity-0'}`}>
              <div className="flex -space-x-2">
                {['S','K','M','A'].map((letter, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${['from-blue-500 to-cyan-400','from-purple-500 to-pink-400','from-amber-500 to-orange-400','from-emerald-500 to-teal-400'][i]} flex items-center justify-center text-xs font-bold text-white border-2 border-zyvo-dark`}>
                    {letter}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-zyvo-muted border-2 border-zyvo-dark">
                  +
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-zyvo-gold text-zyvo-gold" />
                  ))}
                </div>
                <span>Rejoint par <strong className="text-white">5 000+</strong> clients satisfaits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CITIES — INFINITE MARQUEE ===== */}
      <section className="py-6 overflow-hidden" data-section="cities">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-4 h-4 text-zyvo-gold shrink-0" />
          <span className="text-sm font-semibold text-zyvo-muted shrink-0">Disponible à :</span>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...cities, ...cities].map((city, i) => (
              <button
                key={`${city}-${i}`}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-semibold glass-premium-light text-zyvo-muted hover:bg-white/10 hover:text-white hover:border-zyvo-gold/30 transition-all border border-transparent"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP PROVIDERS ===== */}
      <section data-section="providers" className="py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.providers ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Meilleurs <span className="gradient-text">pros</span>
            </h2>
            <p className={`text-zyvo-muted mt-2 ${visible.providers ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
              Les prestataires les mieux notés près de chez vous
            </p>
          </div>
          <Link to="/search" className="hidden sm:flex items-center gap-1 text-sm text-zyvo-gold hover:underline">
            Voir tout <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-fade">
          {topProviders.map((p, i) => (
              <TiltCard>
              <Link
                to={`/provider/${p.name.toLowerCase().replace(/[\s.]+/g, '-')}`}
                className="group glass-premium rounded-2xl p-5 card-hover block"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-lg font-bold text-white relative overflow-hidden`}>
                    {p.name.charAt(0)}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-white truncate">{p.name}</h3>
                    <p className="text-xs text-zyvo-muted truncate">{p.service}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />{p.rating}
                  </span>
                  <span className="text-zyvo-muted">({p.reviews} avis)</span>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zyvo-muted">À partir de</span>
                  <span className="text-sm font-bold text-white">{p.price}</span>
                </div>

                {p.verified && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <ShieldCheck className="w-3 h-3" /> Vérifié
                  </div>
                )}
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ===== STATS + TRUST FUSION ===== */}
      <section data-section="trust" className="py-16">
        <div className="glass-premium rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-amber-500/5" />
          <div className="relative z-10">
            <div className={`text-center mb-10 ${visible.trust ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                La confiance <span className="gradient-text-brand">en chiffres</span>
              </h2>
              <p className="text-zyvo-muted mt-2">La tranquillité d'esprit avant tout</p>
            </div>

            <div className={`grid sm:grid-cols-4 gap-4 mb-10 ${visible.trust ? 'stagger-fade' : 'opacity-0'}`}>
              <AnimatedCounter target="500" suffix="+" label="Prestataires vérifiés" visible={visible.trust} delay={0} icon={ShieldCheck} />
              <AnimatedCounter target="5000" suffix="+" label="Missions réalisées" visible={visible.trust} delay={0.1} icon={Award} />
              <AnimatedCounter target="49" suffix="" label="Note moyenne /5" visible={visible.trust} delay={0.2} icon={Star} />
              <AnimatedCounter target="24" suffix="/7" label="Support disponible" visible={visible.trust} delay={0.3} icon={Clock} />
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: 'Identité vérifiée', desc: 'Chaque prestataire passe une vérification rigoureuse par notre équipe avant de pouvoir proposer ses services' },
                { icon: Star, title: 'Avis authentiques', desc: 'Tous les avis sont vérifiés. Seuls les clients ayant réellement réservé peuvent laisser un avis' },
                { icon: MessageCircle, title: 'Support WhatsApp 7j/7', desc: 'Notre équipe est disponible 7 jours sur 7 par WhatsApp pour vous assister et répondre à vos questions' },
              ].map((item, i) => (
                <div key={item.title} className="text-center p-6 card-hover" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-zyvo-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section data-section="services" className="py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.services ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Services <span className="gradient-text">premium</span>
            </h2>
            <p className={`text-zyvo-muted mt-2 ${visible.services ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
              Des professionnels vérifiés pour chaque besoin
            </p>
          </div>
          <Link to="/search" className="hidden sm:flex items-center gap-1 text-sm text-zyvo-gold hover:underline">
            Voir tout <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-fade">
          {services.map((s, i) => (
            <TiltCard key={s.title}>
              <Link
                to="/search"
                className="group relative overflow-hidden glass-premium rounded-2xl p-6 card-hover block"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${s.gradient} rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <s.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-base mb-1.5 text-white">{s.title}</h3>
                  <p className="text-sm text-zyvo-muted leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-zyvo-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    Découvrir <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section data-section="testimonials" className="py-16">
        <div className="text-center mb-10">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.testimonials ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Ce qu'ils <span className="gradient-text-brand">disent</span>
          </h2>
          <p className={`text-zyvo-muted mt-2 ${visible.testimonials ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
            Rejoignez des milliers de clients satisfaits
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-fade">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-premium rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-zyvo-gold text-zyvo-gold" />
                ))}
              </div>
              <p className="text-sm text-zyvo-muted leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-bold text-white`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-zyvo-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section data-section="faq" className="py-16">
        <div className="text-center mb-10">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.faq ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <p className={`text-zyvo-muted mt-2 ${visible.faq ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
            Tout ce que vous devez savoir sur Zyvo
          </p>
        </div>

        <div className={`max-w-2xl mx-auto space-y-3 ${visible.faq ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openFaq === i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-16">
        <div className="relative overflow-hidden gradient-brand rounded-3xl p-8 sm:p-16 text-center shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Prêt à trouver le bon pro ?
            </h2>
            <p className="text-white/80 text-lg max-w-lg mx-auto mb-8">
              Rejoignez des milliers de clients satisfaits à Alger et dans toute l'Algérie.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <RippleButton className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-8 py-4 rounded-2xl hover:bg-white/90 hover:scale-105 transition-all duration-300 overflow-hidden">
                <Link to="/search" className="relative z-10 flex items-center gap-2">
                  Commencer <ArrowRight className="w-5 h-5" />
                </Link>
              </RippleButton>
              <RippleButton className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <Link to="/auth" className="relative z-10 flex items-center gap-2">
                  Devenir prestataire
                </Link>
              </RippleButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
