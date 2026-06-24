export default function CategoryCard({ icon: Icon, label, color }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-4 glass-premium-light rounded-xl card-hover">
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <span className="text-xs font-semibold text-zyvo-muted">{label}</span>
    </button>
  )
}
