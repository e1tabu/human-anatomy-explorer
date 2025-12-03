import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-200 text-foreground font-medium text-sm shadow-sm"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-primary" />
      <span>{t('language')}</span>
    </button>
  );
}
