'use client'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex gap-4">
      <button 
        onClick={() => changeLanguage('en')}
        className={`text-xl px-4 py-2 rounded-lg transition-colors ${
          i18n.language === 'en'
            ? 'bg-white text-black'
            : 'text-white hover:text-gray-200'
        }`}
      >
        EN
      </button>

      <button 
        onClick={() => changeLanguage('pt')}
        className={`text-xl px-4 py-2 rounded-lg transition-colors ${
          i18n.language === 'pt'
            ? 'bg-white text-black'
            : 'text-white hover:text-gray-200'
        }`}
      >
        PT
      </button>
    </div>
  )
} 