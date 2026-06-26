import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: 'center', background: '#05080F', color: '#F8FAFC', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>Erreur de rendu</h1>
          <pre style={{ color: '#EF4444', fontSize: 14, marginBottom: 24, whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
          </pre>
          <button onClick={() => { this.setState({ error: null }); window.location.href = '/' }}
            style={{ padding: '12px 24px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Recharger
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
