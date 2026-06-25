import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import fr from './fr'
import ar from './ar'

const languages = {
  fr: { label: 'Français', native: 'Français', dir: 'ltr', data: fr },
  ar: { label: 'Arabe', native: 'العربية', dir: 'rtl', data: ar },
}

const I18nContext = createContext(null)
const STORAGE_KEY = 'zyvo_lang'

function t(lang, path, params = {}) {
  const keys = path.split('.')
  let value = lang
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) return path
  }
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`)
  }
  return value
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'fr'
    } catch { return 'fr' }
  })

  const current = languages[lang] || languages.fr

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.dir = current.dir
    document.documentElement.lang = lang
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang, current.dir])

  const _ = useCallback((path, params) => t(current.data, path, params), [current.data])

  const switchLang = useCallback((l) => {
    if (languages[l]) setLang(l)
  }, [])

  return (
    <I18nContext.Provider value={{ lang, _t: _, switchLang, dir: current.dir, languages, currentLang: current }}>
      <div dir={current.dir} className={`lang-${lang}`}>
        {children}
      </div>
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
export { languages }
