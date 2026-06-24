import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onHover = (e) => {
      const target = e.target.closest('a, button, input, select, textarea, [data-cursor]')
      if (target) {
        ring.classList.add('scale-150', 'opacity-50', 'border-zyvo-gold')
        ring.classList.remove('scale-100', 'opacity-100', 'border-white/30')
      } else {
        ring.classList.remove('scale-150', 'opacity-50', 'border-zyvo-gold')
        ring.classList.add('scale-100', 'opacity-100', 'border-white/30')
      }
    }

    const animate = () => {
      const target = mouseRef.current
      posRef.current.x += (target.x - posRef.current.x) * 0.12
      posRef.current.y += (target.y - posRef.current.y) * 0.12
      ring.style.left = posRef.current.x + 'px'
      ring.style.top = posRef.current.y + 'px'
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onHover)

    // Start lagging ring animation
    const frame = requestAnimationFrame(animate)

    // Hide cursor on touch devices
    const isTouch = 'ontouchstart' in window
    if (isTouch) {
      dot.style.display = 'none'
      ring.style.display = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onHover)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[99999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* RING */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[99999] transition-all duration-300 hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
