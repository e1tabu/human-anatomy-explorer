import { X, Bone, Brain, Heart, Apple, Wind, Microscope } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeartbeatAnimation } from './animations/HeartbeatAnimation';
import { ActionPotentialAnimation } from './animations/ActionPotentialAnimation';
import { BreathingAnimation } from './animations/BreathingAnimation';

// Import realistic images
import skeletonImage from '@/assets/realistic-skeleton.png';
import brainImage from '@/assets/realistic-brain.png';
import heartImage from '@/assets/realistic-heart.png';
import digestiveImage from '@/assets/realistic-digestive.png';
import lungsImage from '@/assets/realistic-lungs.png';
import cellImage from '@/assets/realistic-cell.png';
import neuronImage from '@/assets/realistic-neuron.png';

interface InfoPanelProps {
  region: string | null;
  onClose: () => void;
}

interface CellType {
  nameKey: string;
  descKey: string;
}

interface SystemInfo {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  factsKey: string;
  image: string;
  secondaryImage?: string;
  cellTypes: CellType[];
  extraSections?: {
    titleKey: string;
    items: { nameKey: string; descKey: string }[];
  }[];
  animation?: React.ReactNode;
  colorClass: string;
  gradientClass: string;
}

const systemData: Record<string, SystemInfo> = {
  skeleton: {
    icon: <Bone className="w-6 h-6" />,
    titleKey: 'skeleton',
    descKey: 'skeleton_desc',
    factsKey: 'skeleton_facts',
    image: skeletonImage,
    cellTypes: [
      { nameKey: 'osteocytes', descKey: 'osteocytes_desc' },
      { nameKey: 'osteoblasts', descKey: 'osteoblasts_desc' },
      { nameKey: 'osteoclasts', descKey: 'osteoclasts_desc' },
    ],
    colorClass: 'bg-skeleton',
    gradientClass: 'from-skeleton to-skeleton/80',
  },
  nervous: {
    icon: <Brain className="w-6 h-6" />,
    titleKey: 'nervous',
    descKey: 'nervous_desc',
    factsKey: 'nervous_facts',
    image: brainImage,
    secondaryImage: neuronImage,
    cellTypes: [
      { nameKey: 'neurons', descKey: 'neurons_desc' },
      { nameKey: 'glial', descKey: 'glial_desc' },
    ],
    extraSections: [
      {
        titleKey: 'neuron_structure',
        items: [
          { nameKey: 'dendrites', descKey: 'dendrites_desc' },
          { nameKey: 'soma', descKey: 'soma_desc' },
          { nameKey: 'axon', descKey: 'axon_desc' },
          { nameKey: 'synapse', descKey: 'synapse_desc' },
        ],
      },
    ],
    animation: <ActionPotentialAnimation />,
    colorClass: 'bg-nervous',
    gradientClass: 'from-nervous to-nervous/80',
  },
  heart: {
    icon: <Heart className="w-6 h-6" />,
    titleKey: 'heart',
    descKey: 'heart_desc',
    factsKey: 'heart_facts',
    image: heartImage,
    cellTypes: [
      { nameKey: 'cardiac_muscle', descKey: 'cardiac_muscle_desc' },
      { nameKey: 'pacemaker_cells', descKey: 'pacemaker_cells_desc' },
    ],
    extraSections: [
      {
        titleKey: 'heart_electrical',
        items: [
          { nameKey: 'sa_node', descKey: 'sa_node_desc' },
          { nameKey: 'av_node', descKey: 'av_node_desc' },
          { nameKey: 'purkinje', descKey: 'purkinje_desc' },
        ],
      },
    ],
    animation: <HeartbeatAnimation />,
    colorClass: 'bg-heart',
    gradientClass: 'from-heart to-heart/80',
  },
  digestive: {
    icon: <Apple className="w-6 h-6" />,
    titleKey: 'digestive',
    descKey: 'digestive_desc',
    factsKey: 'digestive_facts',
    image: digestiveImage,
    cellTypes: [
      { nameKey: 'epithelial', descKey: 'epithelial_desc' },
      { nameKey: 'goblet', descKey: 'goblet_desc' },
      { nameKey: 'enterocytes', descKey: 'enterocytes_desc' },
    ],
    extraSections: [
      {
        titleKey: 'digestive_organs',
        items: [
          { nameKey: 'mouth', descKey: 'mouth_desc' },
          { nameKey: 'stomach', descKey: 'stomach_desc' },
          { nameKey: 'small_intestine', descKey: 'small_intestine_desc' },
          { nameKey: 'liver', descKey: 'liver_desc' },
          { nameKey: 'pancreas', descKey: 'pancreas_desc' },
        ],
      },
    ],
    colorClass: 'bg-digestive',
    gradientClass: 'from-digestive to-digestive/80',
  },
  respiratory: {
    icon: <Wind className="w-6 h-6" />,
    titleKey: 'respiratory',
    descKey: 'respiratory_desc',
    factsKey: 'respiratory_facts',
    image: lungsImage,
    cellTypes: [
      { nameKey: 'epithelial', descKey: 'epithelial_desc' },
    ],
    extraSections: [
      {
        titleKey: 'breathing_cycle',
        items: [
          { nameKey: 'inhalation', descKey: 'inhalation_desc' },
          { nameKey: 'exhalation', descKey: 'exhalation_desc' },
          { nameKey: 'gas_exchange', descKey: 'gas_exchange_desc' },
        ],
      },
    ],
    animation: <BreathingAnimation />,
    colorClass: 'bg-respiratory',
    gradientClass: 'from-respiratory to-respiratory/80',
  },
  cell: {
    icon: <Microscope className="w-6 h-6" />,
    titleKey: 'cell',
    descKey: 'cell_desc',
    factsKey: 'cell_facts',
    image: cellImage,
    cellTypes: [],
    extraSections: [
      {
        titleKey: 'organelles',
        items: [
          { nameKey: 'nucleus', descKey: 'nucleus_desc' },
          { nameKey: 'mitochondria', descKey: 'mitochondria_desc' },
          { nameKey: 'er', descKey: 'er_desc' },
          { nameKey: 'golgi', descKey: 'golgi_desc' },
          { nameKey: 'ribosome', descKey: 'ribosome_desc' },
          { nameKey: 'lysosome', descKey: 'lysosome_desc' },
        ],
      },
    ],
    colorClass: 'bg-cell',
    gradientClass: 'from-cell to-cell/80',
  },
};

export function InfoPanel({ region, onClose }: InfoPanelProps) {
  const { t, isRTL } = useLanguage();

  if (!region) return null;

  const data = systemData[region];
  if (!data) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full sm:w-[480px] lg:w-[520px] bg-card z-50 overflow-y-auto custom-scrollbar panel-enter shadow-2xl`}
      >
        {/* Header with image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={data.image}
            alt={t(data.titleKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
            aria-label={t('close')}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${data.gradientClass} text-primary-foreground text-sm font-medium mb-2`}>
              {data.icon}
              <span>{t(data.titleKey)}</span>
            </div>
            <p className="text-xs text-primary font-medium">{t(data.factsKey)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="animate-fade-up">
            <p className="text-foreground leading-relaxed">{t(data.descKey)}</p>
          </div>

          {/* Animation */}
          {data.animation && (
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {data.animation}
            </div>
          )}

          {/* Secondary Image (Neuron for nervous system) */}
          {data.secondaryImage && (
            <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <h3 className="text-lg font-semibold text-foreground mb-3">{t('neuron_structure')}</h3>
              <div className="rounded-xl overflow-hidden border border-border">
                <img
                  src={data.secondaryImage}
                  alt={t('neuron_structure')}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Cell Types */}
          {data.cellTypes.length > 0 && (
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${data.colorClass}`} />
                {t('cell_types')}
              </h3>
              <div className="space-y-3">
                {data.cellTypes.map((cell, index) => (
                  <div
                    key={cell.nameKey}
                    className="bg-secondary rounded-xl p-4 border-l-4"
                    style={{ borderColor: `hsl(var(--${region}))`, animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <h4 className="font-semibold text-foreground">{t(cell.nameKey)}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{t(cell.descKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra Sections */}
          {data.extraSections?.map((section, sectionIndex) => (
            <div
              key={section.titleKey}
              className="animate-fade-up"
              style={{ animationDelay: `${0.4 + sectionIndex * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${data.colorClass}`} />
                {t(section.titleKey)}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.nameKey}
                    className="bg-muted rounded-xl p-4"
                  >
                    <h4 className="font-medium text-foreground">{t(item.nameKey)}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{t(item.descKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
