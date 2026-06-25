import { Sparkles } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-2xl font-bold text-white shadow-lg mx-auto mb-4 animate-pulse-soft">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="flex gap-1 justify-center">
          <div className="w-2 h-2 rounded-full bg-zyvo-gold animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-zyvo-gold animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-zyvo-gold animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-sm text-zyvo-muted mt-4">Chargement...</p>
      </div>
    </div>
  )
}
