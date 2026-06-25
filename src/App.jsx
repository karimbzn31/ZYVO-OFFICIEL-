import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, lazy, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/auth'
import { BookingProvider } from './context/booking'
import { ToastProvider } from './context/toast'
import { FavoritesProvider } from './context/favorites'
import { ThemeProvider } from './context/theme'
import { NotificationProvider } from './context/notifications'
import { I18nProvider } from './i18n'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import NotificationPanel from './components/NotificationPanel'
import LoadingScreen from './components/LoadingScreen'
import SEO from './components/SEO'

const Home = lazy(() => import('./pages/Home'))
const SearchPage = lazy(() => import('./pages/Search'))
const Bookings = lazy(() => import('./pages/Bookings'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Profile = lazy(() => import('./pages/Profile'))
const Auth = lazy(() => import('./pages/Auth'))
const ProviderDetail = lazy(() => import('./pages/ProviderDetail'))
const ProviderDashboard = lazy(() => import('./pages/ProviderDashboard'))
const About = lazy(() => import('./pages/About'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const Cities = lazy(() => import('./pages/Cities'))
const Contact = lazy(() => import('./pages/Contact'))
const Blog = lazy(() => import('./pages/Blog'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const AdminDashboard = lazy(() => import('./pages/Admin'))
const Messages = lazy(() => import('./pages/Messages'))

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
    <HelmetProvider>
    <AuthProvider>
      <ThemeProvider>
      <I18nProvider>
      <FavoritesProvider>
      <NotificationProvider>
      <BookingProvider>
      <ToastProvider>
        <SEO />
        <div className="min-h-screen bg-zyvo-dark font-sans text-white">
          <div className="mesh-bg">
            <div className="mesh-dot" />
          </div>
          <NoiseOverlay />
          <CommandPalette />
          <NotificationPanel />
          <ScrollToTop />
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pb-8 relative">
            <PageTransition>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/provider/:id" element={<ProviderDetail />} />
                  <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/cities" element={<Cities />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </main>
          <Footer />
          <BottomNav />
        </div>
      </ToastProvider>
      </BookingProvider>
      </NotificationProvider>
      </FavoritesProvider>
      </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
    </HelmetProvider>
  )
}
