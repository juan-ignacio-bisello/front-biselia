import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en';

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="inline-flex items-center rounded-lg bg-surface p-1 border border-white/10 text-xs font-medium">
      <button
        type="button"
        onClick={() => changeLanguage('es')}
        className={`px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
          currentLang === 'es'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
          currentLang === 'en'
            ? 'bg-brand-primary text-white shadow-sm'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
