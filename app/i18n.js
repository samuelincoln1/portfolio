'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Importe os arquivos de tradução diretamente
import translationPT from '../public/locales/pt/common.json'
import translationEN from '../public/locales/en/common.json'
import translationPTIac from '../public/locales/pt/iac.json'
import translationENIac from '../public/locales/en/iac.json'

const resources = {
  pt: {
    common: translationPT,
    iac: translationPTIac
  },
  en: {
    common: translationEN,
    iac: translationENIac
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
    ns: ['common'],
    defaultNS: 'common'
  })

export default i18n 