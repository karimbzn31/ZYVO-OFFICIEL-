import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function BottomSheet({ open, onClose, title, children, className = '' }) {
  const sheetRef = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* SHEET */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-[70] bg-zyvo-surface border-t border-white/10 rounded-t-3xl shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'translate-y-0' : 'translate-y-full'
        } ${className}`}
      >
        {/* HANDLE */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* HEADER */}
        {title && (
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
            <h3 className="font-bold text-white text-lg">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-zyvo-muted" />
            </button>
          </div>
        )}

        {/* CONTENT */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </>
  )
}
