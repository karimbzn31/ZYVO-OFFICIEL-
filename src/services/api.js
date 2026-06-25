const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`
  const token = localStorage.getItem('zyvo_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  try {
    const res = await fetch(url, { ...options, headers })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }))
      throw new Error(err.message || `Erreur ${res.status}`)
    }
    return await res.json()
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Impossible de joindre le serveur. Vérifiez votre connexion.')
    }
    throw err
  }
}

export const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (path) => request(path, { method: 'DELETE' }),
  upload: (path, formData) => request(path, { method: 'POST', body: formData, headers: {} }),
}

export default api
