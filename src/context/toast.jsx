import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colors = {
  success: 'border-emerald-500/30 text-emerald-400',
  error: 'border-red-500/30 text-red-400',
  warning: 'border-amber-500/30 text-amber-400',
  info: 'border-blue-500/30 text-blue-400',
}

function ToastItem({ toast, onDismiss }) {
  const Icon = icons[toast.type] || icons.info

  return (
    <div
      className={`glass-premium rounded-xl px-4 py-3 border-l-2 ${colors[toast.type] || colors.info} flex items-center gap-3 shadow-xl animate-slide-in-left min-w-[300px] max-w-[400px]`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-zyvo-muted mt-0.5">{toast.message}</p>
        )}
      </div>
      <button onClick={() => onDismiss(toast.id)} className="text-zyvo-muted hover:text-white transition-colors shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((title, { message, type = 'info', duration = 4000 } = {}) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, title, message, type }])
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* TOAST CONTAINER */}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
