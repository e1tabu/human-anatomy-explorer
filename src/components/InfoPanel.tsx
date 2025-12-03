import { X, Bone, Brain, Heart, Apple } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import anatomical images
import skeletonImage from '@/assets/skeleton-system.png';
import neuronImage from '@/assets/neuron-system.png';
import heartImage from '@/assets/heart-system.png';
import digestiveImage from '@/assets/digestive-system.png';

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
  functionKey: string;
  image: string;
  imageAlt: string;
  cellTypes: CellType[];
  extraSections?: {
    titleKey: string;
    items: { nameKey: string; descKey: string }[];
  }[];
  colorClass: string;
  accentColor: string;
}

const systemData: Record<string, SystemInfo> = {
  skeleton: {
    icon: <Bone className="w-6 h-6" />,
    titleKey: 'skeleton',
    descKey: 'skeleton_desc',
    functionKey: 'skeleton_function',
    image: skeletonImage,
    imageAlt: 'Human skeletal system anatomy',
    cellTypes: [
      { nameKey: 'osteocytes', descKey: 'osteocytes_desc' },
      { nameKey: 'osteoblasts', descKey: 'osteoblasts_desc' },
      { nameKey: 'osteoclasts', descKey: 'osteoclasts_desc' },
    ],
    colorClass: 'bg-skeleton text-foreground',
    accentColor: 'border-skeleton',
  },
  nervous: {
    icon: <Brain className="w-6 h-6" />,
    titleKey: 'nervous',
    descKey: 'nervous_desc',
    functionKey: 'nervous_function',
    image: neuronImage,
    imageAlt: 'Neuron cell structure',
    cellTypes: [
      { nameKey: 'neurons', descKey: 'neurons_desc' },
      { nameKey: 'glial', descKey: 'glial_desc' },
      { nameKey: 'schwann', descKey: 'schwann_desc' },
    ],
    extraSections: [
      {
        titleKey: 'neuron_structure',
        items: [
          { nameKey: 'axon', descKey: 'axon_desc' },
          { nameKey: 'dendrites', descKey: 'dendrites_desc' },
          { nameKey: 'soma', descKey: 'soma_desc' },
        ],
      },
      {
        titleKey: 'action_potential',
        items: [{ nameKey: 'action_potential', descKey: 'action_potential_desc' }],
      },
    ],
    colorClass: 'bg-nervous text-primary-foreground',
    accentColor: 'border-nervous',
  },
  heart: {
    icon: <Heart className="w-6 h-6" />,
    titleKey: 'heart',
    descKey: 'heart_desc',
    functionKey: 'heart_function',
    image: heartImage,
    imageAlt: 'Human heart anatomy diagram',
    cellTypes: [
      { nameKey: 'cardiac_muscle', descKey: 'cardiac_muscle_desc' },
      { nameKey: 'pacemaker', descKey: 'pacemaker_desc' },
      { nameKey: 'purkinje', descKey: 'purkinje_desc' },
    ],
    extraSections: [
      {
        titleKey: 'heart_electrical',
        items: [
          { nameKey: 'sa_node', descKey: 'sa_node_desc' },
          { nameKey: 'av_node', descKey: 'av_node_desc' },
        ],
      },
    ],
    colorClass: 'bg-heart text-primary-foreground',
    accentColor: 'border-heart',
  },
  digestive: {
    icon: <Apple className="w-6 h-6" />,
    titleKey: 'digestive',
    descKey: 'digestive_desc',
    functionKey: 'digestive_function',
    image: digestiveImage,
    imageAlt: 'Human digestive system anatomy',
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
          { nameKey: 'esophagus', descKey: 'esophagus_desc' },
          { nameKey: 'stomach', descKey: 'stomach_desc' },
          { nameKey: 'small_intestine', descKey: 'small_intestine_desc' },
          { nameKey: 'large_intestine', descKey: 'large_intestine_desc' },
        ],
      },
    ],
    colorClass: 'bg-digestive text-primary-foreground',
    accentColor: 'border-digestive',
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
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full sm:w-96 lg:w-[420px] bg-panel-bg border-${isRTL ? 'r' : 'l'} border-panel-border shadow-panel z-50 overflow-y-auto panel-enter`}
      >
        {/* Header */}
        <div className={`sticky top-0 ${data.colorClass} px-6 py-4 flex items-center justify-between z-10`}>
          <div className="flex items-center gap-3">
            {data.icon}
            <h2 className="text-xl font-semibold">{t(data.titleKey)}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            aria-label={t('close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Image */}
          <div className="animate-fade-in rounded-xl overflow-hidden border-2 border-border shadow-md">
            <img
              src={data.image}
              alt={data.imageAlt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* Description */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="text-foreground leading-relaxed">{t(data.descKey)}</p>
          </div>

          {/* Function */}
          <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className={`bg-secondary rounded-xl p-4 border-l-4 ${data.accentColor}`}>
              <p className="text-secondary-foreground text-sm leading-relaxed">{t(data.functionKey)}</p>
            </div>
          </div>

          {/* Cell Types */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${data.colorClass}`} />
              {t('cell_types')}
            </h3>
            <div className="space-y-3">
              {data.cellTypes.map((cell, index) => (
                <div
                  key={cell.nameKey}
                  className={`bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-l-4 hover:${data.accentColor}`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <h4 className="font-medium text-foreground">{t(cell.nameKey)}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{t(cell.descKey)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Sections */}
          {data.extraSections?.map((section, sectionIndex) => (
            <div
              key={section.titleKey}
              className="animate-fade-in"
              style={{ animationDelay: `${0.5 + sectionIndex * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${data.colorClass}`} />
                {t(section.titleKey)}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.nameKey}
                    className="bg-muted rounded-lg p-4"
                  >
                    {section.items.length > 1 && (
                      <h4 className="font-medium text-foreground">{t(item.nameKey)}</h4>
                    )}
                    <p className={`text-sm text-muted-foreground ${section.items.length > 1 ? 'mt-1' : ''}`}>
                      {t(item.descKey)}
                    </p>
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
