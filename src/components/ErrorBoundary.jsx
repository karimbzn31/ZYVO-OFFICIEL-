import { Component } from 'react'
import { RefreshCw, AlertTriangle } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, count: 0 }
  }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: 40, textAlign: 'center',
          background: '#05080F', color: '#F8FAFC',
          minHeight: '100vh', fontFamily: 'sans-serif',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'rgba(239,68,68,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24,
          }}>
            <AlertTriangle size={32} color="#EF4444" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Une erreur est survenue</h1>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8, maxWidth: 320 }}>
            {this.state.error.message || 'Un problème inattendu est survenu.'}
          </p>
          <p style={{ color: '#64748B', fontSize: 12, marginBottom: 32 }}>
            Essayez de recharger la page pour continuer.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => { this.setState({ error: null }) }}
              style={{
                padding: '12px 24px', background: 'rgba(255,255,255,0.1)',
                color: 'white', border: 'none', borderRadius: 12,
                cursor: 'pointer', fontSize: 14, fontWeight: 600,
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RefreshCw size={16} /> Réessayer
              </div>
            </button>
            <button onClick={() => window.location.href = '/'}
              style={{
                padding: '12px 24px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                color: 'white', border: 'none', borderRadius: 12,
                cursor: 'pointer', fontSize: 14, fontWeight: 700,
              }}>
              Accueil
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
