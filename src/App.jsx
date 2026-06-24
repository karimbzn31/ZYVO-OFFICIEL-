import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { AuthProvider } from './context/auth'
import { BookingProvider } from './context/booking'
import { ToastProvider } from './context/toast'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchPage from './pages/Search'
import Bookings from './pages/Bookings'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import ProviderDetail from './pages/ProviderDetail'
import ProviderDashboard from './pages/ProviderDashboard'
import CommandPalette from './components/CommandPalette'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Cities from './pages/Cities'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import CategoryPage from './pages/CategoryPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageTransition({ children }) {
  const ref = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const el = ref.current
    if (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(8px)'
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    }
  }, [pathname])

  return (
    <div ref={ref} style={{ opacity: 1, transform: 'translateY(0)' }}>
      {children}
    </div>
  )
}

function NoiseOverlay() {
  return <div className="noise-overlay" />
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
      <ToastProvider>
        <div className="min-h-screen bg-zyvo-dark font-sans text-white">
          <div className="mesh-bg">
            <div className="mesh-dot" />
          </div>
          <NoiseOverlay />
          <CommandPalette />
          <ScrollToTop />
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/provider/:id" element={<ProviderDetail />} />
                <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
          <BottomNav />
        </div>
      </ToastProvider>
      </BookingProvider>
    </AuthProvider>
  )
}
