import { useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev?.()
    if (e.key === 'ArrowRight') onNext?.()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  if (!images?.length) return null

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-lg flex items-center justify-center animate-fade-in-up"
      onClick={onClose}
    >
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* COUNTER */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-bold text-white/80">
        {currentIndex + 1} / {images.length}
      </div>

      {/* PREV */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev?.() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {/* IMAGE */}
      <div className="max-w-4xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-2xl shadow-2xl"
          style={{ maxHeight: '80vh' }}
        />
      </div>

      {/* NEXT */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext?.() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}
