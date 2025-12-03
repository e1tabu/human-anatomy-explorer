import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Activity } from 'lucide-react';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                {t('title')}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Language Toggle */}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
