const EVENTS_KEY = 'zyvo_analytics_events'

let queue = []

function sendBatch() {
  if (queue.length === 0) return
  try {
    const stored = JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]')
    localStorage.setItem(EVENTS_KEY, JSON.stringify([...stored, ...queue]))
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify(queue))
    }
  } catch {}
  queue = []
}

export function track(event, data = {}) {
  queue.push({
    event,
    data,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  })
  if (queue.length >= 10) sendBatch()
}

export function trackPageView() {
  track('page_view', { path: window.location.pathname })
}

export function trackAction(action, label) {
  track('action', { action, label })
}

window.addEventListener('beforeunload', () => sendBatch())
setInterval(sendBatch, 30000)

export default { track, trackPageView, trackAction }
