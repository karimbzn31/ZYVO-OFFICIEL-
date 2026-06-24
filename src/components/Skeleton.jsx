export function CardSkeleton() {
  return (
    <div className="glass-premium rounded-2xl p-4 shimmer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-white/5 rounded" />
          <div className="h-2.5 w-32 bg-white/5 rounded" />
          <div className="h-2 w-20 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  )
}

export function ProviderGridSkeleton({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center shimmer">
      <div className="w-full max-w-2xl space-y-6">
        <div className="h-4 w-48 bg-white/5 rounded-full" />
        <div className="h-16 w-3/4 bg-white/5 rounded-2xl" />
        <div className="h-16 w-1/2 bg-white/5 rounded-2xl" />
        <div className="h-5 w-96 bg-white/5 rounded" />
        <div className="flex gap-4">
          <div className="h-14 w-48 bg-white/5 rounded-2xl" />
          <div className="h-14 w-48 bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
