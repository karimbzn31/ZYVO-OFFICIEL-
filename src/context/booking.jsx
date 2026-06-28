import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './auth'

const BookingContext = createContext(null)

const STORAGE_KEY = 'zyvo_bookings'

export function BookingProvider({ children }) {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setBookings(JSON.parse(stored))
    } catch {}
  }, [])

  const sync = useCallback((b) => {
    setBookings(b)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(b))
  }, [])

  const addBooking = useCallback((booking) => {
    const b = {
      id: Date.now(),
      ...booking,
      createdAt: new Date().toISOString(),
      status: 'Confirmée',
      statusColor: 'text-zyvo-success',
    }
    const updated = [b, ...bookings]
    sync(updated)
    return b
  }, [bookings, sync])

  const cancelBooking = useCallback((id) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: 'Annulée', statusColor: 'text-red-400' } : b
    )
    sync(updated)
  }, [bookings, sync])

  const updateBooking = useCallback((id, changes) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, ...changes } : b
    )
    sync(updated)
  }, [bookings, sync])

  const userBookings = user
    ? bookings.filter(b => b.userPhone === user.phone)
    : []

  return (
    <BookingContext.Provider value={{ bookings: userBookings, allBookings: bookings, addBooking, cancelBooking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBookings = () => useContext(BookingContext)
