'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Importe os arquivos de tradução diretamente
import translationPT from '../public/locales/pt/common.json'
import translationEN from '../public/locales/en/common.json'
import translationPTIac from '../public/locales/pt/iac.json'
import translationENIac from '../public/locales/en/iac.json'
import translationPTDashboard from '../public/locales/pt/dashboard.json'
import translationENDashboard from '../public/locales/en/dashboard.json'

const resources = {
  pt: {
    common: translationPT,
    iac: translationPTIac,
    dashboard: translationPTDashboard
  },
  en: {
    common: translationEN,
    iac: translationENIac,
    dashboard: translationENDashboard
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // idioma padrão
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'iac', 'dashboard'],
    defaultNS: 'common'
  })

export default i18n 