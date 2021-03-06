import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { DEFAULT_LANGUAGE } from '../lib/env'
import resources from './translations'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'default',
    resources,
    interpolation: {
      // react already safes from xss
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  }
)

export default i18n
