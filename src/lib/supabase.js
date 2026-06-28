import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signUp({ email, password, name, phone, city, role }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, phone, city, role } },
  })
  if (authError) throw authError

  if (authData.user) {
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      name,
      phone,
      email: email || '',
      city: city || '',
      role: role || 'client',
    })
    if (profileError) throw profileError
  }
  return authData
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getProviders(filters = {}) {
  let query = supabase.from('providers').select('*')
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.city) query = query.eq('city', filters.city)
  if (filters.search) query = query.or(`name.ilike.%${filters.search}%,service.ilike.%${filters.search}%`)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getProvider(id) {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function updateProvider(id, updates) {
  const { data, error } = await supabase
    .from('providers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getServices(providerId) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('provider_id', providerId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addService(providerId, service) {
  const { data, error } = await supabase
    .from('services')
    .insert({ provider_id: providerId, ...service })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateService(id, updates) {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteService(id) {
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
}

export async function getQuotes(filters = {}) {
  let query = supabase.from('quotes').select('*, responses:quote_responses(*)')
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.city) query = query.eq('city', filters.city)
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.clientId) query = query.eq('client_id', filters.clientId)
  query = query.order('created_at', { ascending: false })
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function addQuote(quote) {
  const { data, error } = await supabase
    .from('quotes')
    .insert(quote)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function respondToQuote(quoteId, providerId, price, message) {
  const { data, error } = await supabase
    .from('quote_responses')
    .insert({ quote_id: quoteId, provider_id: providerId, price, message })
    .select()
    .single()
  if (error) throw error
  await supabase.from('quotes').update({ status: 'Répondu' }).eq('id', quoteId)
  return data
}

export async function getBookings(filters = {}) {
  let query = supabase.from('bookings').select('*, provider:providers(*)')
  if (filters.clientId) query = query.eq('client_id', filters.clientId)
  if (filters.providerId) query = query.eq('provider_id', filters.providerId)
  if (filters.status) query = query.eq('status', filters.status)
  query = query.order('date', { ascending: false })
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function addBooking(booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateBooking(id, changes) {
  const { data, error } = await supabase
    .from('bookings')
    .update(changes)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getReviews(providerId, filters = {}) {
  let query = supabase
    .from('reviews')
    .select('*, client:users(name, avatar_url)')
    .eq('provider_id', providerId)
  if (filters.sort === 'best') query = query.order('rating', { ascending: false })
  else if (filters.sort === 'worst') query = query.order('rating', { ascending: true })
  else query = query.order('created_at', { ascending: false })
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function addReview(review) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getNotifications(userId) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function markNotificationRead(id) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id)
  if (error) throw error
}

export async function markAllNotificationsRead(userId) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false)
  if (error) throw error
}

export async function deleteNotifications(userId) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('user_id', userId)
  if (error) throw error
}

export async function getConversations(userId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, sender:sender_id(name), receiver:receiver_id(name)')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function sendMessage(message) {
  const { data, error } = await supabase
    .from('messages')
    .insert(message)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}