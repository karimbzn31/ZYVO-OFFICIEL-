import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="py-8 max-w-lg mx-auto text-center min-h-[70vh] flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div className="text-[120px] sm:text-[160px] font-extrabold gradient-text leading-none">
          404
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-zyvo-gold animate-pulse-soft" />
        <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-zyvo-primary animate-pulse-soft" />
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zyvo-muted mb-6">
        <Sparkles className="w-4 h-4 text-zyvo-gold" /> Oups !
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
        Page introuvable
      </h1>
      <p className="text-zyvo-muted mb-8 max-w-sm mx-auto leading-relaxed">
        La page que vous cherchez n'existe pas ou a été déplacée.
        Vérifiez l'URL ou retournez à l'accueil.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all glow-worm"
        >
          <Home className="w-4 h-4" /> Accueil
        </Link>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 glass-premium-light text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
        >
          <Search className="w-4 h-4" /> Explorer
        </Link>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-zyvo-muted hover:text-white transition-colors mt-8"
      >
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>
    </div>
  )
}
