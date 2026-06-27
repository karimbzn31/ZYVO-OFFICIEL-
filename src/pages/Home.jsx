import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { 
  ArrowRight, Sparkles, ShieldCheck, Star,
  Wrench, Home as HomeIcon, Monitor, Zap,
  ChevronRight, MapPin, ChevronUp, Search,
  CheckCircle, MessageCircle, ChevronDown, Truck, User, Heart,
  Phone, Award, Users, Clock, Mail, Smartphone,
  GraduationCap, Scissors, Package, Store,
   UserCheck, BadgeCheck, ThumbsUp, Layers,
   Play, Download, Globe, Calendar
} from 'lucide-react'

const services = [
  { icon: Wrench, title: 'Plomberie & Dépannage', desc: 'Plombiers certifiés pour tous vos travaux d\'urgence ou rénovation',
    gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10' },
  { icon: Zap, title: 'Électricité & Réseaux', desc: 'Électriciens professionnels pour installations et réparations',
    gradient: 'from-yellow-500 to-orange-400', bg: 'bg-yellow-500/10' },
  { icon: HomeIcon, title: 'Ménage & Nettoyage', desc: 'Nettoyage complet de votre maison par des professionnels vérifiés', 
    gradient: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-500/10' },
  { icon: GraduationCap, title: 'Cours Particuliers', desc: 'Professeurs qualifiés pour tous niveaux : langues, maths, musique',
    gradient: 'from-purple-500 to-violet-400', bg: 'bg-purple-500/10' },
  { icon: Scissors, title: 'Coiffure & Esthétique', desc: 'Coiffeurs, maquilleurs et esthéticiennes à votre domicile',
    gradient: 'from-pink-500 to-rose-400', bg: 'bg-pink-500/10' },
  { icon: Heart, title: 'Santé & Bien-être', desc: 'Infirmiers et aides-soignants pour des soins à domicile',
    gradient: 'from-red-500 to-rose-400', bg: 'bg-red-500/10' },
  { icon: Package, title: 'Déménagement & Logistique', desc: 'Déménageurs professionnels avec camion. Devis gratuit',
    gradient: 'from-amber-500 to-orange-400', bg: 'bg-amber-500/10' },
  { icon: Monitor, title: 'Services Numériques', desc: 'Développement web, design graphique, support technique',
    gradient: 'from-cyan-500 to-teal-400', bg: 'bg-cyan-500/10' },
]

const cities = ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Sétif', 'Tizi Ouzou', 'Béjaïa', 'Tlemcen', 'Biskra', 'Chlef', 'Boumerdès']

const testimonials = [
  { name: 'Sarah K.', city: 'Alger', text: 'J\'ai trouvé une femme de ménage en 24h. Service impeccable, ponctuelle et très professionnelle. Je recommande les yeux fermés !', rating: 5,
    gradient: 'from-pink-500 to-rose-400' },
  { name: 'Mohamed L.', city: 'Oran', text: 'Le plombier est arrivé dans l\'heure, a diagnostiqué le problème rapidement et le prix était très correct.', rating: 5,
    gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Amina R.', city: 'Constantine', text: 'Plateforme sérieuse avec des prestataires vérifiés. Je peux enfin laisser quelqu\'un entrer chez moi en toute confiance.', rating: 5,
    gradient: 'from-purple-500 to-violet-400' },
  { name: 'Youcef K.', city: 'Alger', text: 'J\'ai pris un cours de maths pour mon fils. Le professeur était excellent et mon fils a beaucoup progressé.', rating: 5,
    gradient: 'from-emerald-500 to-teal-400' },
]

const faqs = [
  { q: 'Comment réserver un service sur Zyvo ?', a: 'Trouvez le prestataire qui vous correspond, comparez les profils et réservez en un clic. Vous recevez une confirmation immédiate.', side: 'client' },
  { q: 'C\'est payant d\'utiliser Zyvo ?', a: 'Pour les clients, Zyvo est 100% gratuit. Vous ne payez que le prestataire après la prestation. Aucune commission cachée.', side: 'client' },
  { q: 'Que faire si je ne suis pas satisfait ?', a: 'Contactez notre support WhatsApp sous 24h. Notre équipe mediation intervient rapidement pour trouver une solution.', side: 'client' },
  { q: 'Comment devenir prestataire sur Zyvo ?', a: 'Créez votre profil, vérifiez votre identité et commencez à recevoir des missions. Notre équipe vous accompagne à chaque étape.', side: 'prestataire' },
  { q: 'Quand et comment suis-je payé ?', a: 'Le paiement est effectué directement par le client après chaque mission. Vous fixez vos tarifs librement.', side: 'prestataire' },
  { q: 'Zyvo prend-il une commission ?', a: 'Zyvo prélève une commission de 10% par mission. Pas d\'abonnement, pas de frais fixes.', side: 'prestataire' },
]

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
      <div className="tilt-card-inner">{children}</div>
    </div>
  )
}

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
    <div className="glass-premium rounded-2xl p-6 card-hover text-center" style={{ animationDelay: `${delay}s` }}>
      {Icon && <Icon className="w-6 h-6 text-zyvo-gold mx-auto mb-2" strokeWidth={1.5} />}
      <div className="text-3xl sm:text-4xl font-extrabold gradient-text">{count}{suffix}</div>
      <div className="text-sm text-zyvo-muted mt-1">{label}</div>
    </div>
  )
}

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="glass-premium rounded-2xl overflow-hidden card-hover">
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-bold text-sm text-white pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-zyvo-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 pb-5 text-sm text-zyvo-muted leading-relaxed">{a}</p>
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
  const [faqTab, setFaqTab] = useState('client')
  const [howTab, setHowTab] = useState('client')
  const carouselRef = useRef(null)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [activeServiceIdx, setActiveServiceIdx] = useState(0)
  const activeIdxRef = useRef(0)

  const [wlName, setWlName] = useState('')
  const [wlEmail, setWlEmail] = useState('')
  const [wlType, setWlType] = useState('client')
  const [wlSent, setWlSent] = useState(false)
  const [wlCount] = useState(243)

  // Scroll progress & back to top
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

  // Intersection observer
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
    activeIdxRef.current = activeServiceIdx
  }, [activeServiceIdx])

  useEffect(() => {
    if (carouselPaused) return
    const timer = setInterval(() => {
      const el = carouselRef.current
      if (!el) return
      const cards = el.querySelectorAll('[data-svc-card]')
      if (!cards.length) return
      const w = cards[0].offsetWidth + 12
      const next = (activeIdxRef.current + 1) % services.length
      el.scrollTo({ left: next * w, behavior: 'smooth' })
      setActiveServiceIdx(next)
    }, 4000)
    return () => clearInterval(timer)
  }, [carouselPaused])

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector('[data-svc-card]')
    if (!card) return
    const idx = Math.round(el.scrollLeft / (card.offsetWidth + 12))
    setActiveServiceIdx(Math.min(idx, services.length - 1))
  }, [])

  const scrollToService = useCallback((i) => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector('[data-svc-card]')
    if (!card) return
    el.scrollTo({ left: i * (card.offsetWidth + 12), behavior: 'smooth' })
    setActiveServiceIdx(i)
  }, [])

  const handleWlSubmit = (e) => {
    e.preventDefault()
    if (wlName && wlEmail) {
      setWlSent(true)
    }
  }

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
      <div className="orb w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-blue-500/10 top-[-150px] sm:top-[-250px] right-[-150px] sm:right-[-200px]"
        style={{ transform: `translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -20}px)` }} />
      <div className="orb w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/8 bottom-[200px] sm:bottom-[300px] left-[-120px] sm:left-[-200px]"
        style={{ transform: `translate(${(mousePos.x - 0.5) * 15}px, ${(mousePos.y - 0.5) * 15}px)` }} />
      <div className="orb w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-amber-500/8 top-[40%] right-[-80px] sm:right-[-100px]"
        style={{ transform: `translate(${(mousePos.x - 0.5) * -10}px, ${(mousePos.y - 0.5) * -10}px)` }} />

      {/* ===== HERO ===== */}
      <section ref={heroRef} onMouseMove={handleHeroMouse} className="relative pt-14 sm:pt-20 pb-2 sm:pb-8 overflow-hidden" data-section="hero">
        <div className="w-full">
          <div className={`text-center sm:text-left ${visible.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-sm text-zyvo-muted mb-2 sm:mb-6">
              <Sparkles className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-zyvo-gold" />
              Des pros vérifiés en Algérie
            </div>

            <h1 className="text-[2.6rem] sm:text-5xl lg:text-6xl font-extrabold leading-[0.92] tracking-tight">
              Le <span className="hero-shimmer">bon pro</span>
              <br />
              <span className="gradient-text-brand">près de chez vous</span>
            </h1>

            <p className="text-xs sm:text-lg text-zyvo-muted mt-2 sm:mt-4 max-w-xl mx-auto sm:mx-0 leading-relaxed">
              Services locaux & digitaux — trouvez le prestataire vérifié qu'il vous faut.
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-3 mt-5 sm:mt-6">
              <Link to="/search"
                className="group gradient-brand text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:scale-105 transition-all glow-worm inline-flex items-center gap-2 text-sm sm:text-base"
              >
                Trouver un service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/become-provider"
                className="glass-premium-light text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-white/10 hover:scale-105 transition-all text-sm sm:text-base"
              >
                Devenir prestataire
              </Link>
            </div>

            {/* SOCIAL PROOF */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 mt-3 sm:mt-8 text-[10px] sm:text-sm text-zyvo-muted">
              <div className="flex -space-x-1.5 sm:-space-x-2">
                {['S','K','M','A'].map((letter, i) => (
                  <div key={i} className={`w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br ${['from-blue-500 to-cyan-400','from-purple-500 to-pink-400','from-amber-500 to-orange-400','from-emerald-500 to-teal-400'][i]} flex items-center justify-center text-[8px] sm:text-xs font-bold text-white border-2 border-zyvo-dark`}>
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 justify-center sm:justify-start">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-zyvo-gold text-zyvo-gold" />)}
                </div>
                <span>Rejoint par <strong className="text-white">5 000+</strong> clients satisfaits</span>
              </div>
            </div>
          </div>

          {/* SERVICE CARDS — Auto-scroll Carousel */}
          <div data-section="services" className={`mt-6 sm:mt-10 ${visible.hero ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-4"
              onScroll={handleCarouselScroll}
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              onTouchStart={() => setCarouselPaused(true)}
              onTouchEnd={() => setTimeout(() => setCarouselPaused(false), 4000)}
            >
              {services.map((s) => (
                <div key={s.title} className="snap-start shrink-0 w-44 h-[235px] sm:h-auto sm:w-auto" data-svc-card>
                  <TiltCard className="h-full">
                    <Link
                      to="/search"
                      className="group relative overflow-hidden glass-premium rounded-2xl p-4 sm:p-5 card-hover block h-full flex flex-col"
                    >
                      <div className={`absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br ${s.gradient} rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity`} />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${s.bg} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0`}>
                          <s.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-white leading-tight min-h-[2.5rem]">{s.title}</h3>
                        <p className="text-xs text-zyvo-muted leading-relaxed mt-1 line-clamp-2 flex-1">{s.desc}</p>
                      </div>
                    </Link>
                  </TiltCard>
                </div>
              ))}
            </div>

            {/* Dots indicator (mobile only) */}
            <div className="flex items-center justify-center gap-2 mt-5 sm:hidden">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToService(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeServiceIdx
                      ? 'w-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 shadow-lg shadow-purple-500/25'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Service ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOUBLE PARCOURS ===== */}
      <section data-section="parcours" className="py-16">
        <div className="text-center mb-10">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.parcours ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Vous êtes <span className="gradient-text">client</span> ou <span className="gradient-text">prestataire</span> ?
          </h2>
          <p className={`text-zyvo-muted mt-2 ${visible.parcours ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
            Zyvo s'adapte à vos besoins
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/search" className="group glass-premium rounded-3xl p-8 card-hover border border-blue-500/20 hover:border-blue-500/40 relative overflow-hidden block">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Je cherche un pro</h3>
              <p className="text-sm text-zyvo-muted mb-6 leading-relaxed">
                Trouvez le prestataire idéal près de chez vous. Comparez les notes, lisez les avis et réservez en toute confiance.
              </p>
              <span className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm group-hover:gap-3 transition-all">
                Trouver un service <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link to="/become-provider" className="group glass-premium rounded-3xl p-8 card-hover border border-amber-500/20 hover:border-amber-500/40 relative overflow-hidden block">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Store className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Je suis un professionnel</h3>
              <p className="text-sm text-zyvo-muted mb-6 leading-relaxed">
                Proposez vos services et développez votre activité. Rejoignez des milliers de clients près de chez vous.
              </p>
              <span className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm group-hover:gap-3 transition-all">
                Devenir prestataire <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== POURQUOI ZYVO ===== */}
      <section data-section="pourquoi" className="py-16">
        <div className="text-center mb-10">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.pourquoi ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Pourquoi <span className="gradient-text-brand">Zyvo</span> ?
          </h2>
          <p className={`text-zyvo-muted mt-2 ${visible.pourquoi ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
            La confiance est au cœur de notre plateforme
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: '100% Vérifié', desc: 'Chaque prestataire est vérifié manuellement par notre équipe. Identité, compétences et avis — rien n\'est laissé au hasard.', gradient: 'from-emerald-500 to-teal-400', stat: '500+', statLabel: 'Pros vérifiés' },
            { icon: Star, title: 'Avis Authentiques', desc: 'Seuls les clients ayant réellement réservé peuvent laisser un avis. Pas de faux avis, pas de notes truquées.', gradient: 'from-amber-500 to-orange-400', stat: '4.7/5', statLabel: 'Note moyenne' },
            { icon: MessageCircle, title: 'Support 7j/7', desc: 'Notre équipe est disponible tous les jours par WhatsApp. Un problème ? On répond en moins de 30 minutes.', gradient: 'from-blue-500 to-cyan-400', stat: '< 30 min', statLabel: 'Temps de réponse' },
          ].map((item) => (
            <div key={item.title} className={`glass-premium rounded-3xl p-6 card-hover relative overflow-hidden ${visible.pourquoi ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-10`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zyvo-muted leading-relaxed mb-4">{item.desc}</p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-2xl font-extrabold gradient-text">{item.stat}</span>
                  <span className="text-xs text-zyvo-muted">{item.statLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WAITLIST ===== */}
      <section data-section="waitlist" className="py-12 sm:py-16">
        <div className="max-w-lg mx-auto">
          <div className={`glass-premium rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-zyvo-gold/20 ${visible.waitlist ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-zyvo-gold/10 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BadgeCheck className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-bold text-zyvo-gold">Lancement imminent</span>
              <h3 className="text-xl sm:text-2xl font-extrabold mt-1 mb-1">Soyez le premier informé</h3>
              <p className="text-sm text-zyvo-muted mb-6">
                Inscrivez-vous pour être notifié dès le lancement officiel et bénéficier d'avantages exclusifs.
              </p>

              {wlSent ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-bold text-white text-lg">Vous êtes inscrit !</p>
                  <p className="text-sm text-zyvo-muted mt-1">Nous vous tiendrons informé du lancement.</p>
                </div>
              ) : (
                <form onSubmit={handleWlSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    value={wlName}
                    onChange={e => setWlName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={wlEmail}
                    onChange={e => setWlEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-zyvo-gold/40 transition-colors"
                  />
                  <div className="relative">
                    <select
                      value={wlType}
                      onChange={e => setWlType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-zyvo-gold/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="client">Je cherche un service</option>
                      <option value="prestataire">Je propose mes services</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zyvo-muted pointer-events-none" />
                  </div>
                  <button type="submit" className="w-full gradient-brand text-white font-bold py-3 rounded-xl hover:scale-[1.02] transition-all shadow-lg glow-worm flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> Rejoindre la liste d'attente
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zyvo-muted">
                <Users className="w-3.5 h-3.5 text-zyvo-gold" />
                <span>Déjà <strong className="text-white">{wlCount}</strong> personnes inscrites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMMENT ÇA MARCHE ===== */}
      <section data-section="how" className="py-16">
        <div className="text-center mb-10">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.how ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Comment <span className="gradient-text-brand">ça marche</span>
          </h2>
          <p className={`text-zyvo-muted mt-2 ${visible.how ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
            Deux parcours, une plateforme
          </p>
        </div>

        <div className={`max-w-xl mx-auto flex glass-premium rounded-xl p-1 mb-8 ${visible.how ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <button
            onClick={() => setHowTab('client')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${howTab === 'client' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'}`}
          >
            Client
          </button>
          <button
            onClick={() => setHowTab('prestataire')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${howTab === 'prestataire' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'}`}
          >
            Prestataire
          </button>
        </div>

        {howTab === 'client' ? (
          <div className="grid sm:grid-cols-4 gap-4 stagger-fade">
            {[
              { icon: Search, step: '1', title: 'Je recherche', desc: 'Trouvez le service qu\'il vous faut parmi des centaines de pros vérifiés' },
              { icon: Star, step: '2', title: 'Je compare', desc: 'Consultez les notes, les avis et choisissez le meilleur profil' },
              { icon: Calendar, step: '3', title: 'Je réserve', desc: 'Choisissez votre créneau et confirmez en un clic' },
              { icon: ThumbsUp, step: '4', title: 'Le pro arrive', desc: 'Votre prestataire arrive à l\'heure. Profitez du service !' },
            ].map((s) => (
              <div key={s.step} className="glass-premium rounded-2xl p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <s.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-zyvo-gold">Étape {s.step}</span>
                <h3 className="font-bold text-white text-lg mt-1">{s.title}</h3>
                <p className="text-sm text-zyvo-muted mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-4 gap-4 stagger-fade">
            {[
              { icon: UserCheck, step: '1', title: 'Je m\'inscris', desc: 'Créez votre profil gratuitement en 2 minutes chrono' },
              { icon: Layers, step: '2', title: 'Je crée mon profil', desc: 'Ajoutez vos services, photos et tarifs pour séduire les clients' },
              { icon: MessageCircle, step: '3', title: 'Je reçois des demandes', desc: 'Les clients vous contactent et réservent directement' },
              { icon: Award, step: '4', title: 'Je suis payé', desc: 'Vous gardez 90% du montant. Paiement direct par le client' },
            ].map((s) => (
              <div key={s.step} className="glass-premium rounded-2xl p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <s.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-bold text-zyvo-gold">Étape {s.step}</span>
                <h3 className="font-bold text-white text-lg mt-1">{s.title}</h3>
                <p className="text-sm text-zyvo-muted mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== PRESTATAIRES VÉRIFIÉS ===== */}
      <section data-section="verified" className="py-16">
        <div className="glass-premium rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-emerald-500/10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 mb-4">
                <BadgeCheck className="w-4 h-4" /> Prestataires vérifiés
              </div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.verified ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Notre <span className="gradient-text">engagement</span>
              </h2>
              <p className={`text-zyvo-muted mt-2 ${visible.verified ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
                Chaque prestataire est rigoureusement vérifié avant de pouvoir proposer ses services
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: ShieldCheck, title: 'Identité vérifiée', desc: 'CNI ou passeport valide + numéro de téléphone actif. Aucun anonymat.', color: 'from-blue-500 to-cyan-400' },
                { icon: Award, title: 'Compétences validées', desc: 'Portfolio, test pratique ou recommandations clients. Nous ne laissons rien au hasard.', color: 'from-purple-500 to-violet-400' },
                { icon: Star, title: 'Avis après chaque mission', desc: 'Seuls les clients ayant réellement réservé peuvent laisser un avis. 100% authentique.', color: 'from-amber-500 to-orange-400' },
              ].map((item) => (
                <div key={item.title} className="text-center p-6 card-hover">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-zyvo-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">Pro Zyvo Vérifié</span>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                <Users className="w-5 h-5 text-zyvo-muted" />
                <span className="text-sm text-zyvo-muted">+500 prestataires approuvés</span>
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-zyvo-muted" />
                <span className="text-sm text-zyvo-muted">Vérification manuelle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CITIES — INFINITE MARQUEE ===== */}
      <section data-section="cities" className="py-10 overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-4 h-4 text-zyvo-gold shrink-0" />
          <span className="text-sm font-semibold text-zyvo-muted shrink-0">Disponible à :</span>
          <span className="text-[10px] font-bold text-zyvo-gold bg-zyvo-gold/10 px-2 py-0.5 rounded-full shrink-0">Nouveau</span>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...cities, ...cities].map((city, i) => (
              <button key={`${city}-${i}`}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-semibold glass-premium-light text-zyvo-muted hover:bg-white/10 hover:text-white hover:border-zyvo-gold/30 transition-all border border-transparent"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-zyvo-muted mt-3 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> D'autres villes arrivent bientôt
        </p>
      </section>

      {/* ===== STATS ===== */}
      <section data-section="trust" className="py-16">
        <div className="glass-premium rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-amber-500/5" />
          <div className="relative z-10">
            <div className={`text-center mb-10 ${visible.trust ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-extrabold">La confiance <span className="gradient-text-brand">en chiffres</span></h2>
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
                { icon: ShieldCheck, title: 'Vérification manuelle', desc: 'Chaque prestataire est vérifié par notre équipe avant de pouvoir proposer ses services' },
                { icon: Star, title: 'Avis authentiques', desc: 'Seuls les clients ayant réellement réservé peuvent laisser un avis. Zéro faux avis.' },
                { icon: MessageCircle, title: 'Support WhatsApp 7j/7', desc: 'Notre équipe est disponible tous les jours par WhatsApp pour vous assister' },
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
                  <div className="text-xs text-zyvo-muted">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== APP MOBILE TEASER ===== */}
      <section data-section="app" className="py-16">
        <div className="glass-premium rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-4">
                <Smartphone className="w-4 h-4 text-zyvo-gold" /> Application mobile
              </div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold ${visible.app ? 'animate-fade-in-up' : 'opacity-0'}`}>
                Bientôt sur <span className="gradient-text-brand">iOS & Android</span>
              </h2>
              <p className={`text-zyvo-muted mt-4 leading-relaxed ${visible.app ? 'animate-fade-in-up animate-delay-100' : 'opacity-0'}`}>
                Retrouvez Zyvo partout avec vous. Réservez, discutez et suivez vos prestations directement depuis votre téléphone.
              </p>
              <ul className={`space-y-3 mt-6 ${visible.app ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
                {[
                  'Recevez des notifications en temps réel',
                  'Chat intégré avec vos prestataires',
                  'Paiement sécurisé depuis l\'application',
                  'Gérez vos réservations en un geste',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zyvo-muted">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={`flex flex-wrap gap-3 mt-8 ${visible.app ? 'animate-fade-in-up animate-delay-300' : 'opacity-0'}`}>
                <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 opacity-60">
                  <Download className="w-4 h-4 text-zyvo-muted" />
                  <span className="text-sm text-zyvo-muted font-semibold">App Store — Bientôt</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 opacity-60">
                  <Play className="w-4 h-4 text-zyvo-muted" />
                  <span className="text-sm text-zyvo-muted font-semibold">Google Play — Bientôt</span>
                </div>
              </div>
            </div>
            <div className={`relative flex justify-center ${visible.app ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="relative w-56 h-[400px] rounded-3xl border-4 border-white/10 bg-gradient-to-b from-zyvo-surface to-zyvo-dark overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-6 bg-zyvo-dark flex items-center justify-center">
                  <div className="w-16 h-1.5 rounded-full bg-white/20" />
                </div>
                <div className="pt-8 px-4">
                  <div className="mb-4 flex justify-center">
                    <Logo logoSize="sm" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                    <div className="mt-4 space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400" />
                          <div className="flex-1">
                            <div className="h-2 bg-white/10 rounded w-3/4" />
                            <div className="h-2 bg-white/5 rounded w-1/2 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="h-10 gradient-brand rounded-xl mt-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

        <div className={`flex justify-center mb-6 ${visible.faq ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex glass-premium rounded-xl p-1">
            <button
              onClick={() => setFaqTab('client')}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${faqTab === 'client' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'}`}
            >
              Client
            </button>
            <button
              onClick={() => setFaqTab('prestataire')}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${faqTab === 'prestataire' ? 'bg-white/10 text-white shadow-sm' : 'text-zyvo-muted hover:text-white'}`}
            >
              Prestataire
            </button>
          </div>
        </div>

        <div className={`max-w-2xl mx-auto space-y-3 ${visible.faq ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {faqs.filter(f => f.side === faqTab).map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/faq" className="text-sm font-bold text-zyvo-gold hover:underline">
            Voir toutes les questions →
          </Link>
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
              <RippleButton className="inline-flex items-center gap-2 bg-white text-zyvo-dark font-bold px-8 py-4 rounded-2xl hover:bg-white/90 hover:scale-105 transition-all overflow-hidden">
                <Link to="/search" className="relative z-10 flex items-center gap-2">
                  Commencer <ArrowRight className="w-5 h-5" />
                </Link>
              </RippleButton>
              <RippleButton className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all overflow-hidden">
                <Link to="/become-provider" className="relative z-10 flex items-center gap-2">
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
