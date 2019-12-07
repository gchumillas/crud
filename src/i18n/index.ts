import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resources from './translations'

// TODO: (low) use Locize service.
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    // TODO: use .env file and declare a DEFAULT_LNG variable
    fallbackLng: 'en',
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
