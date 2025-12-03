import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function BreathingAnimation() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-body-bg rounded-xl p-6 overflow-hidden">
      <h4 className="text-sm font-semibold text-foreground mb-4">{t('breathing_cycle')}</h4>
      
      {/* Lungs visualization */}
      <div className="relative flex justify-center mb-4">
        <svg viewBox="0 0 200 150" className="w-full max-w-xs">
          {/* Trachea */}
          <path
            d="M 100 10 L 100 50"
            stroke="hsl(180 60% 50%)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Left lung */}
          <ellipse
            cx="60"
            cy="90"
            rx={phase === 'inhale' ? 45 : 38}
            ry={phase === 'inhale' ? 55 : 48}
            fill="hsl(355 60% 55% / 0.4)"
            stroke="hsl(355 60% 55%)"
            strokeWidth="2"
            className="transition-all duration-[2000ms] ease-in-out"
          />
          
          {/* Right lung */}
          <ellipse
            cx="140"
            cy="90"
            rx={phase === 'inhale' ? 45 : 38}
            ry={phase === 'inhale' ? 55 : 48}
            fill="hsl(355 60% 55% / 0.4)"
            stroke="hsl(355 60% 55%)"
            strokeWidth="2"
            className="transition-all duration-[2000ms] ease-in-out"
          />
          
          {/* Bronchi */}
          <path
            d="M 100 50 Q 80 60 60 75"
            stroke="hsl(180 60% 50%)"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 100 50 Q 120 60 140 75"
            stroke="hsl(180 60% 50%)"
            strokeWidth="4"
            fill="none"
          />
          
          {/* Air particles */}
          {phase === 'inhale' && (
            <>
              <circle cx="100" cy="5" r="3" fill="hsl(200 80% 60%)">
                <animate attributeName="cy" values="5;45" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="95" cy="10" r="2" fill="hsl(200 80% 60%)">
                <animate attributeName="cy" values="10;50" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="105" cy="8" r="2" fill="hsl(200 80% 60%)">
                <animate attributeName="cy" values="8;48" dur="1.1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1.1s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          
          {phase === 'exhale' && (
            <>
              <circle cx="100" cy="45" r="3" fill="hsl(0 0% 60%)">
                <animate attributeName="cy" values="45;5" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          
          {/* Diaphragm */}
          <path
            d={phase === 'inhale' 
              ? "M 10 140 Q 100 155 190 140" 
              : "M 10 130 Q 100 120 190 130"
            }
            stroke="hsl(35 70% 55%)"
            strokeWidth="4"
            fill="none"
            className="transition-all duration-[2000ms] ease-in-out"
          />
        </svg>
      </div>

      {/* Phase indicator */}
      <div className="flex justify-center gap-4 mb-4">
        <div
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'inhale'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {t('inhalation')}
        </div>
        <div
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'exhale'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {t('exhalation')}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground text-center">
        {phase === 'inhale' ? t('inhalation_desc') : t('exhalation_desc')}
      </p>
    </div>
  );
}
