import { Home, Wrench, Monitor, Truck, GraduationCap, HeartPulse } from 'lucide-react'

export const categories = [
  { id: 1, icon: Home, label: 'Maison', color: 'bg-blue-500/10 text-blue-400' },
  { id: 2, icon: Wrench, label: 'Réparation', color: 'bg-purple-500/10 text-purple-400' },
  { id: 3, icon: Monitor, label: 'Numérique', color: 'bg-cyan-500/10 text-cyan-400' },
  { id: 4, icon: Truck, label: 'Déménagement', color: 'bg-amber-500/10 text-amber-400' },
  { id: 5, icon: GraduationCap, label: 'Cours', color: 'bg-emerald-500/10 text-emerald-400' },
  { id: 6, icon: HeartPulse, label: 'Santé', color: 'bg-rose-500/10 text-rose-400' },
]

export const providers = [
  {
    id: 1,
    name: 'Karim B.',
    service: 'Plombier Certifié',
    rating: 4.9,
    missions: 120,
    badges: ['Vérifié', 'Top'],
    price: '1 500 DA/h',
  },
  {
    id: 2,
    name: 'Amina K.',
    service: 'Aide à domicile',
    rating: 5.0,
    missions: 85,
    badges: ['Vérifié', 'Recommandé'],
    price: '1 200 DA/h',
  },
  {
    id: 3,
    name: 'Mohamed L.',
    service: 'Électricien',
    rating: 4.8,
    missions: 64,
    badges: ['Vérifié'],
    price: '1 800 DA/h',
  },
  {
    id: 4,
    name: 'Sara B.',
    service: 'Coiffeuse à domicile',
    rating: 4.9,
    missions: 42,
    badges: ['Vérifié', 'Top'],
    price: '2 000 DA/séance',
  },
  {
    id: 5,
    name: 'Yacine M.',
    service: 'Développeur Web',
    rating: 4.7,
    missions: 38,
    badges: ['Vérifié'],
    price: '3 000 DA/h',
  },
  {
    id: 6,
    name: 'Fatima Z.',
    service: 'Cours de Maths',
    rating: 4.9,
    missions: 56,
    badges: ['Vérifié', 'Top'],
    price: '1 800 DA/h',
  },
]

export const bookings = [
  {
    id: 1,
    provider: providers[0],
    date: '25 juin 2026',
    time: '14:00',
    status: 'Confirmée',
    statusColor: 'text-zyvo-success',
  },
  {
    id: 2,
    provider: providers[1],
    date: '28 juin 2026',
    time: '09:00',
    status: 'En attente',
    statusColor: 'text-zyvo-warning',
  },
]
