import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight } from 'lucide-react';

interface SystemCardProps {
  id: string;
  titleKey: string;
  descKey: string;
  factsKey: string;
  image: string;
  colorClass: string;
  onClick: () => void;
}

export function SystemCard({
  id,
  titleKey,
  descKey,
  factsKey,
  image,
  colorClass,
  onClick,
}: SystemCardProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-body-bg">
        <img
          src={image}
          alt={t(titleKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Color accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${colorClass}`} />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {t(titleKey)}
          </h3>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
        </div>
        
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {t(descKey)}
        </p>

        {/* Facts */}
        <p className="text-xs text-primary font-medium mt-3 line-clamp-1">
          {t(factsKey)}
        </p>
      </div>
    </button>
  );
}
