export function CardSkeleton() {
  return (
    <div className="glass-premium rounded-2xl p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/5" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded bg-white/5" />
          <div className="h-2.5 w-32 rounded bg-white/5" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-2.5 w-12 rounded bg-white/5" />
        <div className="h-2.5 w-16 rounded bg-white/5" />
        <div className="h-2.5 w-14 rounded bg-white/5 ml-auto" />
      </div>
    </div>
  )
}

export function ProfileCardSkeleton() {
  return (
    <div className="glass-premium rounded-2xl overflow-hidden animate-pulse">
      <div className="h-28 sm:h-48 bg-white/5" />
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-4 -mt-10 sm:-mt-14 mb-4">
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-4 border-zyvo-dark" />
          <div className="space-y-2 pt-4 sm:pt-8">
            <div className="h-4 w-32 rounded bg-white/5" />
            <div className="h-3 w-40 rounded bg-white/5" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-16 rounded-xl bg-white/5" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-3/4 rounded bg-white/5" />
        </div>
      </div>
    </div>
  )
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-premium rounded-2xl p-4 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 rounded bg-white/5" />
              <div className="h-2.5 w-20 rounded bg-white/5" />
            </div>
            <div className="h-3 w-16 rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function GridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-premium rounded-2xl overflow-hidden animate-pulse" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="h-20 sm:h-28 bg-white/5" />
          <div className="p-3 sm:p-4 space-y-3">
            <div className="flex items-center gap-3 -mt-8 sm:-mt-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border-2 border-zyvo-dark" />
              <div className="space-y-1.5 pt-4 sm:pt-6">
                <div className="h-3 w-20 rounded bg-white/5" />
                <div className="h-2.5 w-28 rounded bg-white/5" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-2.5 w-10 rounded bg-white/5" />
              <div className="h-2.5 w-14 rounded bg-white/5" />
              <div className="h-2.5 w-12 rounded bg-white/5 ml-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
