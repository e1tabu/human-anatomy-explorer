import { useLanguage } from '@/contexts/LanguageContext';

interface HumanBodyProps {
  onRegionClick: (region: string) => void;
  activeRegion: string | null;
}

export function HumanBody({ onRegionClick, activeRegion }: HumanBodyProps) {
  const { t } = useLanguage();

  const regions = [
    { id: 'nervous', label: t('nervous'), y: 45, height: 70 },
    { id: 'heart', label: t('heart'), y: 140, height: 80 },
    { id: 'digestive', label: t('digestive'), y: 230, height: 120 },
    { id: 'skeleton', label: t('skeleton'), y: 360, height: 200 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* X-ray style background container */}
      <div className="relative bg-xray-bg rounded-2xl p-6 shadow-glow overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-xray-glow/5 via-transparent to-xray-glow/5 pointer-events-none" />
        
        {/* SVG Human Body */}
        <svg
          viewBox="0 0 200 600"
          className="w-full h-auto"
          style={{ maxHeight: '70vh' }}
        >
          {/* Definitions for gradients and filters */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <linearGradient id="boneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(195, 20%, 90%)" />
              <stop offset="100%" stopColor="hsl(195, 20%, 75%)" />
            </linearGradient>
            
            <linearGradient id="nervousGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(270, 70%, 70%)" />
              <stop offset="100%" stopColor="hsl(270, 60%, 55%)" />
            </linearGradient>
            
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(0, 80%, 65%)" />
              <stop offset="100%" stopColor="hsl(0, 70%, 50%)" />
            </linearGradient>
            
            <linearGradient id="digestiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(150, 60%, 55%)" />
              <stop offset="100%" stopColor="hsl(150, 50%, 40%)" />
            </linearGradient>
          </defs>

          {/* Body outline - subtle */}
          <ellipse cx="100" cy="50" rx="35" ry="45" fill="none" stroke="hsl(195, 20%, 30%)" strokeWidth="1" opacity="0.3" />
          <path d="M 65 90 Q 50 150 55 250 Q 50 350 60 450 L 75 580 M 135 90 Q 150 150 145 250 Q 150 350 140 450 L 125 580" fill="none" stroke="hsl(195, 20%, 30%)" strokeWidth="1" opacity="0.3" />
          <path d="M 65 100 Q 20 120 10 200 L 15 280 M 135 100 Q 180 120 190 200 L 185 280" fill="none" stroke="hsl(195, 20%, 30%)" strokeWidth="1" opacity="0.3" />

          {/* Skeleton - always visible as base layer */}
          <g opacity="0.4">
            {/* Skull */}
            <ellipse cx="100" cy="45" rx="28" ry="35" fill="none" stroke="url(#boneGradient)" strokeWidth="2" />
            {/* Spine */}
            <line x1="100" y1="80" x2="100" y2="350" stroke="url(#boneGradient)" strokeWidth="3" />
            {/* Ribs */}
            {[120, 145, 170, 195].map((y, i) => (
              <g key={i}>
                <path d={`M 100 ${y} Q 70 ${y + 10} 65 ${y + 5}`} fill="none" stroke="url(#boneGradient)" strokeWidth="2" />
                <path d={`M 100 ${y} Q 130 ${y + 10} 135 ${y + 5}`} fill="none" stroke="url(#boneGradient)" strokeWidth="2" />
              </g>
            ))}
            {/* Pelvis */}
            <path d="M 70 340 Q 100 380 130 340" fill="none" stroke="url(#boneGradient)" strokeWidth="3" />
            {/* Legs */}
            <line x1="80" y1="360" x2="75" y2="560" stroke="url(#boneGradient)" strokeWidth="3" />
            <line x1="120" y1="360" x2="125" y2="560" stroke="url(#boneGradient)" strokeWidth="3" />
            {/* Arms */}
            <line x1="65" y1="100" x2="25" y2="280" stroke="url(#boneGradient)" strokeWidth="2" />
            <line x1="135" y1="100" x2="175" y2="280" stroke="url(#boneGradient)" strokeWidth="2" />
          </g>

          {/* Interactive Brain/Nervous System */}
          <g
            className={`body-region cursor-pointer transition-all duration-300 ${activeRegion === 'nervous' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => onRegionClick('nervous')}
            filter={activeRegion === 'nervous' ? 'url(#glow)' : undefined}
          >
            <ellipse cx="100" cy="45" rx="22" ry="28" fill="url(#nervousGradient)" opacity="0.8" />
            {/* Neural paths */}
            <path d="M 100 73 L 100 120" stroke="url(#nervousGradient)" strokeWidth="4" opacity="0.6" />
            <path d="M 100 90 Q 80 95 70 110" stroke="url(#nervousGradient)" strokeWidth="2" opacity="0.4" />
            <path d="M 100 90 Q 120 95 130 110" stroke="url(#nervousGradient)" strokeWidth="2" opacity="0.4" />
          </g>

          {/* Interactive Heart */}
          <g
            className={`body-region cursor-pointer transition-all duration-300 ${activeRegion === 'heart' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => onRegionClick('heart')}
            filter={activeRegion === 'heart' ? 'url(#glow)' : undefined}
          >
            <path
              d="M 100 145 C 85 130 65 135 65 155 C 65 175 85 195 100 210 C 115 195 135 175 135 155 C 135 135 115 130 100 145"
              fill="url(#heartGradient)"
              opacity="0.85"
            />
            {/* Heartbeat pulse effect */}
            <circle cx="100" cy="170" r="8" fill="hsl(0, 90%, 70%)" opacity="0.6" className="pulse-glow" />
          </g>

          {/* Interactive Digestive System */}
          <g
            className={`body-region cursor-pointer transition-all duration-300 ${activeRegion === 'digestive' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            onClick={() => onRegionClick('digestive')}
            filter={activeRegion === 'digestive' ? 'url(#glow)' : undefined}
          >
            {/* Stomach */}
            <ellipse cx="90" cy="250" rx="20" ry="25" fill="url(#digestiveGradient)" opacity="0.8" />
            {/* Small intestine */}
            <path
              d="M 90 275 Q 110 290 90 305 Q 70 320 90 335 Q 110 350 90 365"
              fill="none"
              stroke="url(#digestiveGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Large intestine */}
            <path
              d="M 60 280 L 60 350 Q 60 370 80 370 L 120 370 Q 140 370 140 350 L 140 280"
              fill="none"
              stroke="url(#digestiveGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>

          {/* Skeleton clickable overlay */}
          <g
            className={`body-region cursor-pointer transition-all duration-300 ${activeRegion === 'skeleton' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
            onClick={() => onRegionClick('skeleton')}
            filter={activeRegion === 'skeleton' ? 'url(#glow)' : undefined}
          >
            {/* Leg bones highlight */}
            <line x1="80" y1="380" x2="75" y2="550" stroke="hsl(45, 70%, 60%)" strokeWidth="6" strokeLinecap="round" />
            <line x1="120" y1="380" x2="125" y2="550" stroke="hsl(45, 70%, 60%)" strokeWidth="6" strokeLinecap="round" />
            {/* Knee joints */}
            <circle cx="78" cy="460" r="8" fill="hsl(45, 80%, 65%)" />
            <circle cx="122" cy="460" r="8" fill="hsl(45, 80%, 65%)" />
            {/* Feet */}
            <ellipse cx="70" cy="565" rx="15" ry="8" fill="hsl(45, 70%, 55%)" />
            <ellipse cx="130" cy="565" rx="15" ry="8" fill="hsl(45, 70%, 55%)" />
          </g>
        </svg>

        {/* Region labels */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`absolute text-xs font-medium px-2 py-1 rounded transition-all duration-300 ${
                activeRegion === region.id
                  ? 'bg-primary text-primary-foreground scale-110'
                  : 'bg-card/80 text-foreground'
              }`}
              style={{
                top: `${(region.y / 600) * 100}%`,
                right: '8px',
                transform: 'translateY(-50%)',
              }}
            >
              {region.label}
            </div>
          ))}
        </div>
      </div>

      {/* Instruction text */}
      <p className="text-center text-muted-foreground text-sm mt-4 animate-fade-in">
        {t('instruction')}
      </p>
    </div>
  );
}
