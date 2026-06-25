import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const FavoritesContext = createContext(null)

const STORAGE_KEY = 'zyvo_favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setFavorites(JSON.parse(stored))
    } catch {}
  }, [])

  const sync = useCallback((f) => {
    setFavorites(f)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(f))
  }, [])

  const toggleFavorite = useCallback((provider) => {
    const exists = favorites.some(f => f.id === provider.id)
    if (exists) {
      sync(favorites.filter(f => f.id !== provider.id))
    } else {
      sync([...favorites, provider])
    }
  }, [favorites, sync])

  const isFavorite = useCallback((id) => {
    return favorites.some(f => f.id === id)
  }, [favorites])

  const removeFavorite = useCallback((id) => {
    sync(favorites.filter(f => f.id !== id))
  }, [favorites, sync])

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
