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
import translationENAnalyzer from '../public/locales/en/analyzer.json'
import translationPTAnalyzer from '../public/locales/pt/analyzer.json'
import translationENCodeFlow from '../public/locales/en/codeflow.json'
import translationPTCodeFlow from '../public/locales/pt/codeflow.json'
import translationENArticles from '../public/locales/en/articles.json'
import translationPTArticles from '../public/locales/pt/articles.json'

const resources = {
  pt: {
    common: translationPT,
    iac: translationPTIac,
    dashboard: translationPTDashboard,
    analyzer: translationPTAnalyzer,
    codeflow: translationPTCodeFlow,
    articles: translationPTArticles
  },
  en: {
    common: translationEN,
    iac: translationENIac,
    dashboard: translationENDashboard,
    analyzer: translationENAnalyzer,
    codeflow: translationENCodeFlow,
    articles: translationENArticles
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'iac', 'dashboard', 'analyzer', 'codeflow', 'articles'],
    defaultNS: 'common'
  })

export default i18n 