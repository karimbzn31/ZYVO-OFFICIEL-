import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'zyvo_recently_viewed'

export function useRecentlyViewed() {
  const [recent, setRecent] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setRecent(JSON.parse(stored))
    } catch {}
  }, [])

  const addView = useCallback((provider) => {
    setRecent(prev => {
      const filtered = prev.filter(p => p.id !== provider.id)
      const updated = [{ ...provider, viewedAt: Date.now() }, ...filtered].slice(0, 4)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  return { recent, addView }
}
