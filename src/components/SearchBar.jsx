import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute inset-0 gradient-primary rounded-2xl blur-xl opacity-20" />
      <div className="relative glass-premium rounded-2xl p-4">
        <input
          type="text"
          placeholder="Quel service recherchez-vous ?"
          className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-zyvo-muted"
        />
        <div className="h-px bg-white/5 my-3" />
        <button className="w-full gradient-primary text-white font-bold py-2.5 rounded-xl gradient-glow hover:scale-[1.02] transition-all duration-300">
          Rechercher
        </button>
      </div>
    </div>
  )
}
