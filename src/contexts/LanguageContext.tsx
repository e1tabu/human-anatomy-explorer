import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'title': 'Human Interactive Biology Explorer',
    'subtitle': 'Click on any body part to explore',
    'language': 'العربية',
    
    // Instructions
    'instruction': 'Click on highlighted areas to learn more',
    
    // Systems
    'skeleton': 'Skeletal System',
    'skeleton_desc': 'The skeletal system provides structural support, protects vital organs, enables movement through joints, produces blood cells in bone marrow, and stores minerals like calcium and phosphorus.',
    'skeleton_function': 'The human skeleton consists of 206 bones that form the framework of the body. It supports body weight, facilitates movement, and protects internal organs.',
    
    'nervous': 'Nervous System',
    'nervous_desc': 'The nervous system is the body\'s control center. It processes sensory information, coordinates movements, and enables thinking, memory, and emotions.',
    'nervous_function': 'Neurons transmit electrical signals called action potentials. When a neuron is stimulated, sodium ions rush in, creating a wave of depolarization that travels along the axon.',
    
    'heart': 'Cardiovascular System',
    'heart_desc': 'The heart is a muscular organ that pumps blood throughout the body. It beats about 100,000 times per day, circulating approximately 5 liters of blood per minute.',
    'heart_function': 'The heart generates its own electrical impulses through the SA node (pacemaker), which triggers the AV node, causing coordinated contractions of the atria and ventricles.',
    
    'digestive': 'Digestive System',
    'digestive_desc': 'The digestive system breaks down food into nutrients that the body can absorb and use for energy, growth, and cell repair.',
    'digestive_function': 'Digestion begins in the mouth and continues through the esophagus, stomach, and intestines. Each organ plays a specific role in breaking down and absorbing nutrients.',
    
    // Cell types
    'cell_types': 'Cell Types',
    'osteocytes': 'Osteocytes',
    'osteocytes_desc': 'Mature bone cells that maintain bone tissue',
    'osteoblasts': 'Osteoblasts',
    'osteoblasts_desc': 'Cells that form new bone tissue',
    'osteoclasts': 'Osteoclasts',
    'osteoclasts_desc': 'Cells that break down bone tissue',
    
    'neurons': 'Neurons',
    'neurons_desc': 'Nerve cells that transmit electrical signals',
    'glial': 'Glial Cells',
    'glial_desc': 'Support and protect neurons',
    'schwann': 'Schwann Cells',
    'schwann_desc': 'Form myelin sheath around axons',
    
    'cardiac_muscle': 'Cardiac Muscle Cells',
    'cardiac_muscle_desc': 'Specialized cells for heart contraction',
    'pacemaker': 'Pacemaker Cells',
    'pacemaker_desc': 'Generate electrical impulses',
    'purkinje': 'Purkinje Fibers',
    'purkinje_desc': 'Conduct electrical signals rapidly',
    
    'epithelial': 'Epithelial Cells',
    'epithelial_desc': 'Line the digestive tract',
    'goblet': 'Goblet Cells',
    'goblet_desc': 'Secrete protective mucus',
    'enterocytes': 'Enterocytes',
    'enterocytes_desc': 'Absorb nutrients from food',
    
    // Neuron structure
    'neuron_structure': 'Neuron Structure',
    'axon': 'Axon',
    'axon_desc': 'Long fiber that transmits signals away from the cell body',
    'dendrites': 'Dendrites',
    'dendrites_desc': 'Branch-like structures that receive signals',
    'soma': 'Soma (Cell Body)',
    'soma_desc': 'Contains the nucleus and organelles',
    
    // Action potential
    'action_potential': 'Action Potential',
    'action_potential_desc': 'When a neuron is stimulated above threshold, voltage-gated sodium channels open, causing rapid depolarization. This triggers a cascade along the axon, enabling signal transmission at speeds up to 120 m/s.',
    
    // Heart nodes
    'heart_electrical': 'Electrical System',
    'sa_node': 'SA Node (Sinoatrial)',
    'sa_node_desc': 'The natural pacemaker, initiates heartbeat',
    'av_node': 'AV Node (Atrioventricular)',
    'av_node_desc': 'Delays signal, coordinates atria and ventricles',
    
    // Digestive organs
    'digestive_organs': 'Digestive Organs',
    'mouth': 'Mouth',
    'mouth_desc': 'Mechanical and chemical digestion begins',
    'esophagus': 'Esophagus',
    'esophagus_desc': 'Transports food to stomach',
    'stomach': 'Stomach',
    'stomach_desc': 'Breaks down food with acid and enzymes',
    'small_intestine': 'Small Intestine',
    'small_intestine_desc': 'Primary site of nutrient absorption',
    'large_intestine': 'Large Intestine',
    'large_intestine_desc': 'Absorbs water, forms waste',
    
    // UI
    'close': 'Close',
    'learn_more': 'Learn More',
  },
  ar: {
    // Header
    'title': 'مستكشف الأحياء البشرية التفاعلي',
    'subtitle': 'انقر على أي جزء من الجسم للاستكشاف',
    'language': 'English',
    
    // Instructions
    'instruction': 'انقر على المناطق المضيئة لمعرفة المزيد',
    
    // Systems
    'skeleton': 'الجهاز الهيكلي',
    'skeleton_desc': 'يوفر الجهاز الهيكلي الدعم الهيكلي، ويحمي الأعضاء الحيوية، ويتيح الحركة من خلال المفاصل، وينتج خلايا الدم في نخاع العظام، ويخزن المعادن مثل الكالسيوم والفوسفور.',
    'skeleton_function': 'يتكون الهيكل العظمي البشري من 206 عظمة تشكل إطار الجسم. يدعم وزن الجسم، ويسهل الحركة، ويحمي الأعضاء الداخلية.',
    
    'nervous': 'الجهاز العصبي',
    'nervous_desc': 'الجهاز العصبي هو مركز التحكم في الجسم. يعالج المعلومات الحسية، وينسق الحركات، ويتيح التفكير والذاكرة والعواطف.',
    'nervous_function': 'تنقل الخلايا العصبية إشارات كهربائية تسمى جهد الفعل. عندما يتم تحفيز الخلية العصبية، تندفع أيونات الصوديوم للداخل، مما يخلق موجة من إزالة الاستقطاب تنتقل على طول المحور العصبي.',
    
    'heart': 'الجهاز القلبي الوعائي',
    'heart_desc': 'القلب عضو عضلي يضخ الدم في جميع أنحاء الجسم. ينبض حوالي 100,000 مرة في اليوم، ويدور حوالي 5 لترات من الدم في الدقيقة.',
    'heart_function': 'يولد القلب نبضاته الكهربائية من خلال العقدة الجيبية الأذينية (منظم ضربات القلب)، التي تحفز العقدة الأذينية البطينية، مما يسبب انقباضات منسقة للأذينين والبطينين.',
    
    'digestive': 'الجهاز الهضمي',
    'digestive_desc': 'يقوم الجهاز الهضمي بتفكيك الطعام إلى مغذيات يمكن للجسم امتصاصها واستخدامها للطاقة والنمو وإصلاح الخلايا.',
    'digestive_function': 'يبدأ الهضم في الفم ويستمر عبر المريء والمعدة والأمعاء. يلعب كل عضو دوراً محدداً في تفكيك وامتصاص المغذيات.',
    
    // Cell types
    'cell_types': 'أنواع الخلايا',
    'osteocytes': 'الخلايا العظمية',
    'osteocytes_desc': 'خلايا عظمية ناضجة تحافظ على الأنسجة العظمية',
    'osteoblasts': 'بانيات العظم',
    'osteoblasts_desc': 'خلايا تشكل أنسجة عظمية جديدة',
    'osteoclasts': 'ناقضات العظم',
    'osteoclasts_desc': 'خلايا تفكك الأنسجة العظمية',
    
    'neurons': 'الخلايا العصبية',
    'neurons_desc': 'خلايا عصبية تنقل الإشارات الكهربائية',
    'glial': 'الخلايا الدبقية',
    'glial_desc': 'تدعم وتحمي الخلايا العصبية',
    'schwann': 'خلايا شوان',
    'schwann_desc': 'تشكل غلاف الميالين حول المحاور',
    
    'cardiac_muscle': 'خلايا العضلة القلبية',
    'cardiac_muscle_desc': 'خلايا متخصصة لانقباض القلب',
    'pacemaker': 'خلايا منظم ضربات القلب',
    'pacemaker_desc': 'تولد النبضات الكهربائية',
    'purkinje': 'ألياف بوركنجي',
    'purkinje_desc': 'تنقل الإشارات الكهربائية بسرعة',
    
    'epithelial': 'الخلايا الظهارية',
    'epithelial_desc': 'تبطن الجهاز الهضمي',
    'goblet': 'الخلايا الكأسية',
    'goblet_desc': 'تفرز المخاط الواقي',
    'enterocytes': 'الخلايا المعوية',
    'enterocytes_desc': 'تمتص المغذيات من الطعام',
    
    // Neuron structure
    'neuron_structure': 'بنية الخلية العصبية',
    'axon': 'المحور العصبي',
    'axon_desc': 'ألياف طويلة تنقل الإشارات بعيداً عن جسم الخلية',
    'dendrites': 'التشعبات',
    'dendrites_desc': 'هياكل تشبه الفروع تستقبل الإشارات',
    'soma': 'الجسم الخلوي',
    'soma_desc': 'يحتوي على النواة والعضيات',
    
    // Action potential
    'action_potential': 'جهد الفعل',
    'action_potential_desc': 'عندما يتم تحفيز الخلية العصبية فوق العتبة، تفتح قنوات الصوديوم ذات البوابات الجهدية، مما يسبب إزالة الاستقطاب السريع. هذا يؤدي إلى سلسلة على طول المحور، مما يمكّن نقل الإشارة بسرعات تصل إلى 120 م/ث.',
    
    // Heart nodes
    'heart_electrical': 'النظام الكهربائي',
    'sa_node': 'العقدة الجيبية الأذينية',
    'sa_node_desc': 'منظم ضربات القلب الطبيعي، يبدأ ضربات القلب',
    'av_node': 'العقدة الأذينية البطينية',
    'av_node_desc': 'تؤخر الإشارة، تنسق بين الأذينين والبطينين',
    
    // Digestive organs
    'digestive_organs': 'أعضاء الجهاز الهضمي',
    'mouth': 'الفم',
    'mouth_desc': 'يبدأ الهضم الميكانيكي والكيميائي',
    'esophagus': 'المريء',
    'esophagus_desc': 'ينقل الطعام إلى المعدة',
    'stomach': 'المعدة',
    'stomach_desc': 'تفكك الطعام بالحمض والإنزيمات',
    'small_intestine': 'الأمعاء الدقيقة',
    'small_intestine_desc': 'الموقع الرئيسي لامتصاص المغذيات',
    'large_intestine': 'الأمعاء الغليظة',
    'large_intestine_desc': 'تمتص الماء، تشكل الفضلات',
    
    // UI
    'close': 'إغلاق',
    'learn_more': 'اعرف المزيد',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
