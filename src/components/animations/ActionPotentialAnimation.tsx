import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function ActionPotentialAnimation() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { key: 'ap_step1', descKey: 'ap_step1_desc', voltage: -70, color: 'hsl(200 80% 50%)' },
    { key: 'ap_step2', descKey: 'ap_step2_desc', voltage: 40, color: 'hsl(45 90% 55%)' },
    { key: 'ap_step3', descKey: 'ap_step3_desc', voltage: -90, color: 'hsl(150 60% 50%)' },
    { key: 'ap_step4', descKey: 'ap_step4_desc', voltage: -70, color: 'hsl(270 60% 60%)' },
  ];

  return (
    <div className="bg-body-bg rounded-xl p-6 overflow-hidden">
      <h4 className="text-sm font-semibold text-foreground mb-4">{t('action_potential_title')}</h4>
      
      {/* Neuron visualization */}
      <div className="relative h-24 mb-4">
        <svg viewBox="0 0 300 80" className="w-full h-full">
          {/* Axon */}
          <rect x="20" y="30" width="260" height="20" rx="10" fill="hsl(270 30% 25%)" />
          
          {/* Signal pulse */}
          <rect
            x="20"
            y="30"
            width="40"
            height="20"
            rx="10"
            fill={steps[step].color}
            className="transition-all duration-500"
            style={{
              transform: `translateX(${step * 60}px)`,
              opacity: step === 3 ? 0.5 : 1,
            }}
          >
            <animate
              attributeName="x"
              values="20;240"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
          
          {/* Ion channels */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${60 + i * 60}, 25)`}>
              <rect
                width="8"
                height="30"
                rx="2"
                fill={step === i ? steps[step].color : 'hsl(var(--muted))'}
                className="transition-all duration-300"
              />
              <text x="4" y="45" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                {i === 0 || i === 1 ? 'Na+' : 'K+'}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Voltage graph */}
      <div className="relative h-20 border-l-2 border-b-2 border-muted mb-4">
        <svg viewBox="0 0 200 60" className="w-full h-full">
          {/* Baseline */}
          <line x1="0" y1="40" x2="200" y2="40" stroke="hsl(var(--muted))" strokeDasharray="4" />
          
          {/* Action potential curve */}
          <path
            d="M 0 40 L 40 40 L 50 10 L 70 55 L 90 40 L 200 40"
            fill="none"
            stroke={steps[step].color}
            strokeWidth="2"
            className="transition-all duration-300"
          />
          
          {/* Current position indicator */}
          <circle
            cx={40 + step * 40}
            cy={step === 0 ? 40 : step === 1 ? 10 : step === 2 ? 55 : 40}
            r="5"
            fill={steps[step].color}
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Labels */}
        <span className="absolute -left-8 top-0 text-[10px] text-muted-foreground">+40</span>
        <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">0</span>
        <span className="absolute -left-8 bottom-0 text-[10px] text-muted-foreground">-90</span>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-3">
        {steps.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setStep(i)}
            className={`flex-1 h-1.5 rounded-full transition-all ${
              i === step ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ backgroundColor: s.color }}
          />
        ))}
      </div>

      {/* Step description */}
      <div className="min-h-[60px]">
        <h5 className="font-medium text-foreground text-sm">{t(steps[step].key)}</h5>
        <p className="text-xs text-muted-foreground mt-1">{t(steps[step].descKey)}</p>
      </div>
    </div>
  );
}
