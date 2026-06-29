import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

function clearMockData() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('zyvo_'))
  keys.forEach(k => localStorage.removeItem(k))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(formatUser(session.user))
        }
      } catch (e) {
        console.error('Auth init error:', e)
      }
      setLoading(false)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(formatUser(session.user))
      } else {
        setUser(null)
      }
    })
    return () => subscription?.unsubscribe()
  }, [])

  function formatUser(supabaseUser) {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'Utilisateur',
      phone: supabaseUser.user_metadata?.phone || '',
      city: supabaseUser.user_metadata?.city || '',
      role: supabaseUser.user_metadata?.role || 'client',
    }
  }

  const login = async (email, password, role = 'client') => {
    clearMockData()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const formatted = formatUser(data.user)
    setUser({ ...formatted, role })
    return data
  }

  const register = async ({ name, phone, email, city, role = 'client', password }) => {
    clearMockData()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone, city, role } },
    })
    if (error) throw error
    if (data.user) {
      // public.users is auto-created by DB trigger on auth.users insert

      if (role === 'prestataire') {
        const { error: pErr } = await supabase.from('providers').insert({
          user_id: data.user.id,
          name,
          city: city || '',
          service: 'Mon service',
          category: '',
          cover_gradient: 'from-blue-600 via-blue-500 to-cyan-400',
        }).select().single()
        if (pErr) throw pErr
      }

      setUser({ id: data.user.id, name, phone, email, city, role })
    }
    return data
  }

  const logout = async () => {
    clearMockData()
    setUser(null)
    await supabase.auth.signOut()
  }

  const switchRole = (role) => {
    if (!user) return
    setUser({ ...user, role })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
