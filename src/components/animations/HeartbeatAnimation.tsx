import { useLanguage } from '@/contexts/LanguageContext';

export function HeartbeatAnimation() {
  const { t } = useLanguage();

  return (
    <div className="bg-body-bg rounded-xl p-6 overflow-hidden">
      <h4 className="text-sm font-semibold text-foreground mb-4">{t('heart_electrical')}</h4>
      
      <div className="relative">
        {/* Heart SVG with animation */}
        <svg viewBox="0 0 200 180" className="w-full max-w-xs mx-auto">
          {/* Heart shape */}
          <path
            d="M 100 160 C 40 120 10 80 10 50 C 10 20 40 10 60 10 C 80 10 100 30 100 50 C 100 30 120 10 140 10 C 160 10 190 20 190 50 C 190 80 160 120 100 160"
            fill="hsl(355 80% 55% / 0.3)"
            stroke="hsl(355 80% 55%)"
            strokeWidth="2"
            className="animate-heartbeat origin-center"
          />
          
          {/* SA Node */}
          <circle cx="140" cy="35" r="8" fill="hsl(45 90% 55%)" className="animate-pulse">
            <animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="155" y="40" fill="hsl(var(--foreground))" fontSize="8" className="font-medium">SA</text>
          
          {/* AV Node */}
          <circle cx="100" cy="70" r="6" fill="hsl(200 80% 55%)">
            <animate attributeName="r" values="4;8;4" dur="1.2s" repeatCount="indefinite" begin="0.2s" />
          </circle>
          <text x="112" y="75" fill="hsl(var(--foreground))" fontSize="8" className="font-medium">AV</text>
          
          {/* Bundle of His */}
          <line x1="100" y1="76" x2="100" y2="100" stroke="hsl(150 60% 50%)" strokeWidth="3">
            <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0.3s" />
          </line>
          
          {/* Purkinje fibers */}
          <path d="M 100 100 Q 60 130 50 150" stroke="hsl(270 60% 60%)" strokeWidth="2" fill="none">
            <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0.4s" />
          </path>
          <path d="M 100 100 Q 140 130 150 150" stroke="hsl(270 60% 60%)" strokeWidth="2" fill="none">
            <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" begin="0.4s" />
          </path>
        </svg>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(45_90%_55%)]" />
            <span className="text-muted-foreground">{t('sa_node')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(200_80%_55%)]" />
            <span className="text-muted-foreground">{t('av_node')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(150_60%_50%)]" />
            <span className="text-muted-foreground">{t('bundle_his')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(270_60%_60%)]" />
            <span className="text-muted-foreground">{t('purkinje')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
