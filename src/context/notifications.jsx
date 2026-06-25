import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const NotificationContext = createContext(null)

const STORAGE_KEY = 'zyvo_notifications'

const initialNotifications = [
  { id: 1, type: 'booking', title: 'Réservation confirmée', message: 'Votre rendez-vous avec Karim B. est confirmé pour demain 14:00', time: 'Il y a 2h', read: false, icon: '📅' },
  { id: 2, type: 'message', title: 'Nouveau message', message: 'Amina K. vous a envoyé un message', time: 'Il y a 5h', read: false, icon: '💬' },
  { id: 3, type: 'reminder', title: 'Rappel de rendez-vous', message: 'Votre prestation avec Mohamed L. commence dans 2h', time: 'Il y a 1j', read: true, icon: '⏰' },
  { id: 4, type: 'promo', title: 'Promo spéciale', message: '-20% sur votre prochaine réservation avec le code ZYVO20', time: 'Il y a 3j', read: true, icon: '🎉' },
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setNotifications(JSON.parse(stored))
      } else {
        setNotifications(initialNotifications)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotifications))
      }
    } catch {
      setNotifications(initialNotifications)
    }
  }, [])

  const sync = useCallback((n) => {
    setNotifications(n)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(n))
  }, [])

  const markAsRead = useCallback((id) => {
    sync(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }, [notifications, sync])

  const markAllAsRead = useCallback(() => {
    sync(notifications.map(n => ({ ...n, read: true })))
  }, [notifications, sync])

  const addNotification = useCallback((notification) => {
    const n = {
      id: Date.now(),
      time: "À l'instant",
      read: false,
      ...notification,
    }
    sync([n, ...notifications])
  }, [notifications, sync])

  const clearAll = useCallback(() => {
    sync([])
  }, [sync])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications, unreadCount, showPanel,
      setShowPanel, markAsRead, markAllAsRead, addNotification, clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)
