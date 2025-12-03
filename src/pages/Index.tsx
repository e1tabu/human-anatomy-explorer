import { useState } from 'react';
import { Header } from '@/components/Header';
import { SystemCard } from '@/components/SystemCard';
import { InfoPanel } from '@/components/InfoPanel';
import { useLanguage } from '@/contexts/LanguageContext';

// Import images
import bodyImage from '@/assets/realistic-body.png';
import skeletonImage from '@/assets/realistic-skeleton.png';
import brainImage from '@/assets/realistic-brain.png';
import heartImage from '@/assets/realistic-heart.png';
import digestiveImage from '@/assets/realistic-digestive.png';
import lungsImage from '@/assets/realistic-lungs.png';
import cellImage from '@/assets/realistic-cell.png';

const systems = [
  { id: 'nervous', titleKey: 'nervous', descKey: 'nervous_desc', factsKey: 'nervous_facts', image: brainImage, colorClass: 'bg-nervous' },
  { id: 'heart', titleKey: 'heart', descKey: 'heart_desc', factsKey: 'heart_facts', image: heartImage, colorClass: 'bg-heart' },
  { id: 'respiratory', titleKey: 'respiratory', descKey: 'respiratory_desc', factsKey: 'respiratory_facts', image: lungsImage, colorClass: 'bg-respiratory' },
  { id: 'digestive', titleKey: 'digestive', descKey: 'digestive_desc', factsKey: 'digestive_facts', image: digestiveImage, colorClass: 'bg-digestive' },
  { id: 'skeleton', titleKey: 'skeleton', descKey: 'skeleton_desc', factsKey: 'skeleton_facts', image: skeletonImage, colorClass: 'bg-skeleton' },
  { id: 'cell', titleKey: 'cell', descKey: 'cell_desc', factsKey: 'cell_facts', image: cellImage, colorClass: 'bg-cell' },
];

const Index = () => {
  const { t } = useLanguage();
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-body-bg">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Text content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-4">
                  {t('hero_title')}
                </h1>
                <p className="text-lg text-primary-foreground/70 mb-6 max-w-lg mx-auto lg:mx-0">
                  {t('hero_subtitle')}
                </p>
                <a
                  href="#systems"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                >
                  {t('start_exploring')}
                </a>
              </div>

              {/* Body image */}
              <div className="relative order-1 lg:order-2 flex justify-center">
                <div className="relative w-full max-w-sm">
                  <img
                    src={bodyImage}
                    alt="Human anatomy"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-body-glow/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Systems Grid */}
        <section id="systems" className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {t('systems')}
              </h2>
              <p className="text-muted-foreground">{t('click_to_explore')}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {systems.map((system, index) => (
                <div
                  key={system.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SystemCard
                    {...system}
                    onClick={() => setActiveRegion(system.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {t('title')} • Interactive Anatomy Learning
          </p>
        </div>
      </footer>

      {/* Info Panel */}
      <InfoPanel region={activeRegion} onClose={() => setActiveRegion(null)} />
    </div>
  );
};

export default Index;
