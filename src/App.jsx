import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import AuthCallback from './pages/AuthCallback'
import CompleteProfile from './pages/CompleteProfile'
import { motion } from 'framer-motion'
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
import ErrorBoundary from './components/ErrorBoundary'
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
const FAQ = lazy(() => import('./pages/FAQ'))
const Legal = lazy(() => import('./pages/Legal'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Reviews = lazy(() => import('./pages/Reviews'))
const BecomeProvider = lazy(() => import('./pages/BecomeProvider'))
const Refer = lazy(() => import('./pages/Refer'))
const BookingDetail = lazy(() => import('./pages/BookingDetail'))
const Support = lazy(() => import('./pages/Support'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const CityPage = lazy(() => import('./pages/CityPage'))
const Voucher = lazy(() => import('./pages/Voucher'))
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'))
const DashboardAccueil = lazy(() => import('./pages/dashboard/Accueil'))
const DashboardExplorer = lazy(() => import('./pages/dashboard/Explorer'))
const DashboardFavoris = lazy(() => import('./pages/dashboard/Favoris'))
const DashboardMesAvis = lazy(() => import('./pages/dashboard/MesAvis'))
const DashboardMesReservations = lazy(() => import('./pages/dashboard/MesReservations'))
const DashboardMessagerie = lazy(() => import('./pages/dashboard/Messagerie'))
const DashboardProfil = lazy(() => import('./pages/dashboard/Profil'))
const DashboardNotifications = lazy(() => import('./pages/dashboard/Notifications'))
const DashboardDemanderDevis = lazy(() => import('./pages/dashboard/DemanderDevis'))
const DashboardMesDevis = lazy(() => import('./pages/dashboard/MesDevis'))
const DashboardPrestataireProfil = lazy(() => import('./pages/dashboard/PrestataireProfil'))
const ProviderLayout = lazy(() => import('./components/dashboard/ProviderLayout'))
const ProviderAccueil = lazy(() => import('./pages/dashboard/prestataire/Accueil'))
const ProviderDemandes = lazy(() => import('./pages/dashboard/prestataire/Demandes'))
const ProviderServices = lazy(() => import('./pages/dashboard/prestataire/Services'))
const ProviderCalendrier = lazy(() => import('./pages/dashboard/prestataire/Calendrier'))
const ProviderRevenus = lazy(() => import('./pages/dashboard/prestataire/Revenus'))
const ProviderAvis = lazy(() => import('./pages/dashboard/prestataire/Avis'))
const ProviderStatistiques = lazy(() => import('./pages/dashboard/prestataire/Statistiques'))
const ProviderProfil = lazy(() => import('./pages/dashboard/prestataire/Profil'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function NoiseOverlay() {
  return <div className="noise-overlay" />
}

function AppContent() {
  const { pathname } = useLocation()
  const isDashboard = pathname.startsWith('/dashboard')

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-zyvo-dark font-sans text-white">
        <div className="mesh-bg">
          <div className="mesh-dot" />
        </div>
        <NoiseOverlay />
        <CommandPalette />
        <NotificationPanel />
        <ScrollToTop />
        {!isDashboard && <Header />}
        <main className={!isDashboard ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pb-8 relative" : ""}>
          <PageTransition>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/auth/complete-profile" element={<CompleteProfile />} />
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
                <Route path="/faq" element={<FAQ />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/become-provider" element={<BecomeProvider />} />
                <Route path="/refer" element={<Refer />} />
                <Route path="/booking/:id" element={<BookingDetail />} />
                <Route path="/support" element={<Support />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/service/:slug" element={<ServicePage />} />
                <Route path="/cities/:city" element={<CityPage />} />
                <Route path="/voucher" element={<Voucher />} />
                {/* Dashboard */}
                <Route path="/dashboard/client" element={<DashboardLayout />}>
                  <Route index element={<DashboardAccueil />} />
                  <Route path="explorer" element={<DashboardExplorer />} />
                  <Route path="favoris" element={<DashboardFavoris />} />
                  <Route path="reservations" element={<DashboardMesReservations />} />
                  <Route path="avis" element={<DashboardMesAvis />} />
                  <Route path="messages" element={<DashboardMessagerie />} />
                  <Route path="profil" element={<DashboardProfil />} />
                  <Route path="prestataire/:id" element={<DashboardPrestataireProfil />} />
                  <Route path="notifications" element={<DashboardNotifications />} />
                  <Route path="demander-devis" element={<DashboardDemanderDevis />} />
                  <Route path="mes-devis" element={<DashboardMesDevis />} />
                </Route>
                {/* Provider Dashboard */}
                <Route path="/dashboard/prestataire" element={<ProviderLayout />}>
                  <Route index element={<ProviderAccueil />} />
                  <Route path="demandes" element={<ProviderDemandes />} />
                  <Route path="services" element={<ProviderServices />} />
                  <Route path="calendrier" element={<ProviderCalendrier />} />
                  <Route path="messages" element={<DashboardMessagerie />} />
                  <Route path="revenus" element={<ProviderRevenus />} />
                  <Route path="statistiques" element={<ProviderStatistiques />} />
                  <Route path="avis" element={<ProviderAvis />} />
                  <Route path="profil" element={<ProviderProfil />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </main>
        {!isDashboard && <Footer />}
        {!isDashboard && <BottomNav />}
      </div>
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
    <HelmetProvider>
    <AuthProvider>
      <ThemeProvider>
      <I18nProvider>
      <FavoritesProvider>
      <NotificationProvider>
      <BookingProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
      </BookingProvider>
      </NotificationProvider>
      </FavoritesProvider>
      </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
    </HelmetProvider>
    </ErrorBoundary>
  )
}
