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
    'title': 'Human Biology Explorer',
    'subtitle': 'Interactive Anatomy Learning',
    'language': 'العربية',
    
    // Navigation
    'home': 'Home',
    'systems': 'Body Systems',
    'cells': 'Cell Biology',
    
    // Hero
    'hero_title': 'Explore Human Anatomy',
    'hero_subtitle': 'Interactive 3D visualizations with real anatomical images and animations',
    'start_exploring': 'Start Exploring',
    
    // Systems
    'skeleton': 'Skeletal System',
    'skeleton_short': 'Skeleton',
    'skeleton_desc': 'The skeletal system consists of 206 bones forming the structural framework of the human body. It provides support, protection for vital organs, enables movement through joints, produces blood cells in bone marrow, and stores essential minerals.',
    'skeleton_facts': '206 bones • 300+ joints • Produces 200 billion red blood cells daily',
    
    'nervous': 'Nervous System',
    'nervous_short': 'Brain & Nerves',
    'nervous_desc': 'The nervous system is the body\'s master control network, consisting of the brain, spinal cord, and billions of neurons. It processes sensory information, coordinates voluntary and involuntary actions, and enables consciousness, memory, and emotion.',
    'nervous_facts': '86 billion neurons • 100 trillion synapses • Signals travel up to 120 m/s',
    
    'heart': 'Cardiovascular System',
    'heart_short': 'Heart',
    'heart_desc': 'The cardiovascular system pumps blood throughout the body, delivering oxygen and nutrients while removing waste. The heart beats approximately 100,000 times daily, circulating about 7,500 liters of blood.',
    'heart_facts': '100,000 beats/day • 96,000 km of blood vessels • 7,500 liters pumped daily',
    
    'digestive': 'Digestive System',
    'digestive_short': 'Digestion',
    'digestive_desc': 'The digestive system breaks down food into nutrients through mechanical and chemical processes. The 9-meter gastrointestinal tract processes food over 24-72 hours, extracting essential nutrients for cellular function.',
    'digestive_facts': '9 meters long • 24-72 hours to digest • 1.7 liters of saliva daily',
    
    'respiratory': 'Respiratory System',
    'respiratory_short': 'Lungs',
    'respiratory_desc': 'The respiratory system facilitates gas exchange, bringing oxygen into the body and expelling carbon dioxide. The lungs contain about 600 million alveoli, providing a surface area roughly the size of a tennis court.',
    'respiratory_facts': '600 million alveoli • 70m² surface area • 20,000 breaths/day',
    
    'cell': 'Cell Biology',
    'cell_short': 'Cells',
    'cell_desc': 'Cells are the fundamental units of life. The human body contains approximately 37 trillion cells, each containing organelles that perform specific functions essential for life.',
    'cell_facts': '37 trillion cells • 200+ cell types • Mitochondria produce 90% of energy',
    
    // Cell types
    'cell_types': 'Cell Types',
    'osteocytes': 'Osteocytes',
    'osteocytes_desc': 'Mature bone cells embedded in the bone matrix. They maintain bone tissue, sense mechanical stress, and communicate with other bone cells to regulate bone remodeling.',
    'osteoblasts': 'Osteoblasts',
    'osteoblasts_desc': 'Bone-forming cells that synthesize and secrete the organic components of bone matrix, including collagen and proteoglycans. They eventually become trapped in the matrix and transform into osteocytes.',
    'osteoclasts': 'Osteoclasts',
    'osteoclasts_desc': 'Large multinucleated cells responsible for bone resorption. They break down bone tissue by secreting acids and enzymes, playing a crucial role in bone remodeling and calcium homeostasis.',
    
    'neurons': 'Neurons',
    'neurons_desc': 'Specialized cells that transmit electrical and chemical signals. Each neuron can form thousands of connections with other neurons, creating the vast neural networks that underlie all brain functions.',
    'glial': 'Glial Cells',
    'glial_desc': 'Support cells that maintain homeostasis, form myelin, and provide support and protection for neurons. They outnumber neurons 10:1 and are essential for proper nervous system function.',
    
    'cardiac_muscle': 'Cardiomyocytes',
    'cardiac_muscle_desc': 'Specialized muscle cells that make up the heart wall. They are connected by intercalated discs, allowing synchronized contraction. Unlike other muscle cells, they can generate their own electrical impulses.',
    'pacemaker_cells': 'Pacemaker Cells',
    'pacemaker_cells_desc': 'Specialized cardiac cells in the SA node that spontaneously generate electrical impulses, setting the rhythm of the heartbeat at approximately 60-100 beats per minute.',
    
    'epithelial': 'Epithelial Cells',
    'epithelial_desc': 'Cells that line the digestive tract, forming a protective barrier. They are constantly renewed, with the entire gut lining replaced every 3-5 days.',
    'goblet': 'Goblet Cells',
    'goblet_desc': 'Specialized cells that secrete mucus to protect the digestive lining and facilitate the movement of food through the tract.',
    'enterocytes': 'Enterocytes',
    'enterocytes_desc': 'Absorptive cells with microvilli that dramatically increase surface area for nutrient absorption. They contain numerous transporters for different nutrients.',
    
    // Neuron structure
    'neuron_structure': 'Neuron Structure',
    'dendrites': 'Dendrites',
    'dendrites_desc': 'Branch-like extensions that receive signals from other neurons. A single neuron can have thousands of dendrites, each covered with synaptic receptors.',
    'soma': 'Cell Body (Soma)',
    'soma_desc': 'The main body of the neuron containing the nucleus and most organelles. It integrates incoming signals and determines whether to generate an action potential.',
    'axon': 'Axon',
    'axon_desc': 'A long fiber that transmits electrical signals away from the cell body. Axons can be over 1 meter long and are often covered in myelin sheath for faster transmission.',
    'synapse': 'Synapse',
    'synapse_desc': 'The junction between neurons where neurotransmitters are released to transmit signals. Each neuron can have up to 10,000 synapses.',
    
    // Action potential
    'action_potential': 'Action Potential',
    'action_potential_title': 'How Neurons Fire',
    'action_potential_desc': 'An action potential is a rapid change in membrane voltage that travels along the neuron. It follows an all-or-nothing principle.',
    'ap_step1': 'Resting State',
    'ap_step1_desc': 'The neuron maintains a resting potential of -70mV, with more negative charge inside than outside.',
    'ap_step2': 'Depolarization',
    'ap_step2_desc': 'When stimulated above threshold, sodium channels open rapidly, causing positive ions to rush in.',
    'ap_step3': 'Repolarization',
    'ap_step3_desc': 'Potassium channels open and sodium channels close, restoring the negative internal charge.',
    'ap_step4': 'Refractory Period',
    'ap_step4_desc': 'A brief period where the neuron cannot fire again, ensuring signals travel in one direction.',
    
    // Heart electrical
    'heart_electrical': 'Heart\'s Electrical System',
    'sa_node': 'SA Node (Pacemaker)',
    'sa_node_desc': 'The sinoatrial node generates electrical impulses that initiate each heartbeat. It fires 60-100 times per minute, setting the heart\'s natural rhythm.',
    'av_node': 'AV Node',
    'av_node_desc': 'The atrioventricular node receives signals from the SA node and delays them briefly, allowing the atria to fully contract before the ventricles.',
    'bundle_his': 'Bundle of His',
    'bundle_his_desc': 'Specialized fibers that carry electrical impulses from the AV node to the ventricles.',
    'purkinje': 'Purkinje Fibers',
    'purkinje_desc': 'A network of fibers that rapidly distribute the electrical signal throughout the ventricles, causing coordinated contraction.',
    
    // Organelles
    'organelles': 'Cell Organelles',
    'nucleus': 'Nucleus',
    'nucleus_desc': 'The control center containing DNA. It regulates gene expression and cell division.',
    'mitochondria': 'Mitochondria',
    'mitochondria_desc': 'The powerhouse of the cell, producing ATP through cellular respiration. Each cell contains hundreds to thousands.',
    'er': 'Endoplasmic Reticulum',
    'er_desc': 'A network of membranes involved in protein synthesis (rough ER) and lipid synthesis (smooth ER).',
    'golgi': 'Golgi Apparatus',
    'golgi_desc': 'Processes, packages, and ships proteins to their destinations within or outside the cell.',
    'ribosome': 'Ribosomes',
    'ribosome_desc': 'Molecular machines that synthesize proteins by translating mRNA instructions.',
    'lysosome': 'Lysosomes',
    'lysosome_desc': 'Contain digestive enzymes to break down waste materials and cellular debris.',
    
    // Digestive organs
    'digestive_organs': 'Digestive Organs',
    'mouth': 'Mouth',
    'mouth_desc': 'Mechanical digestion through chewing and chemical digestion begins with salivary amylase breaking down starches.',
    'esophagus': 'Esophagus',
    'esophagus_desc': 'A 25cm muscular tube that uses peristalsis to move food from the mouth to the stomach in about 8 seconds.',
    'stomach': 'Stomach',
    'stomach_desc': 'Produces hydrochloric acid (pH 1.5-3.5) and pepsin to break down proteins. Food stays here 2-6 hours.',
    'small_intestine': 'Small Intestine',
    'small_intestine_desc': 'The primary site of digestion and absorption. Its 6m length and villi create a surface area of 250m².',
    'large_intestine': 'Large Intestine',
    'large_intestine_desc': 'Absorbs water and electrolytes, houses trillions of beneficial bacteria, and forms feces.',
    'liver': 'Liver',
    'liver_desc': 'Produces bile for fat digestion, detoxifies blood, stores glycogen, and performs 500+ vital functions.',
    'pancreas': 'Pancreas',
    'pancreas_desc': 'Produces digestive enzymes and bicarbonate to neutralize stomach acid. Also produces insulin and glucagon.',
    
    // Breathing
    'breathing_cycle': 'Breathing Cycle',
    'inhalation': 'Inhalation',
    'inhalation_desc': 'The diaphragm contracts and moves downward, the ribcage expands, creating negative pressure that draws air into the lungs.',
    'exhalation': 'Exhalation',
    'exhalation_desc': 'The diaphragm relaxes and moves upward, the ribcage contracts, pushing air out of the lungs.',
    'gas_exchange': 'Gas Exchange',
    'gas_exchange_desc': 'In the alveoli, oxygen diffuses into blood capillaries while carbon dioxide diffuses out. This occurs across a membrane only 0.5 micrometers thick.',
    
    // UI
    'close': 'Close',
    'learn_more': 'Learn More',
    'view_animation': 'View Animation',
    'click_to_explore': 'Click any system to explore',
    'back': 'Back',
  },
  ar: {
    // Header
    'title': 'مستكشف الأحياء البشرية',
    'subtitle': 'تعلم التشريح التفاعلي',
    'language': 'English',
    
    // Navigation
    'home': 'الرئيسية',
    'systems': 'أجهزة الجسم',
    'cells': 'علم الخلية',
    
    // Hero
    'hero_title': 'استكشف التشريح البشري',
    'hero_subtitle': 'تصورات ثلاثية الأبعاد تفاعلية مع صور تشريحية حقيقية ورسوم متحركة',
    'start_exploring': 'ابدأ الاستكشاف',
    
    // Systems
    'skeleton': 'الجهاز الهيكلي',
    'skeleton_short': 'الهيكل العظمي',
    'skeleton_desc': 'يتكون الجهاز الهيكلي من 206 عظمة تشكل الإطار الهيكلي لجسم الإنسان. يوفر الدعم، والحماية للأعضاء الحيوية، ويتيح الحركة من خلال المفاصل، وينتج خلايا الدم في نخاع العظام، ويخزن المعادن الأساسية.',
    'skeleton_facts': '206 عظمة • أكثر من 300 مفصل • ينتج 200 مليار خلية دم حمراء يومياً',
    
    'nervous': 'الجهاز العصبي',
    'nervous_short': 'الدماغ والأعصاب',
    'nervous_desc': 'الجهاز العصبي هو شبكة التحكم الرئيسية في الجسم، يتكون من الدماغ والحبل الشوكي ومليارات الخلايا العصبية. يعالج المعلومات الحسية، وينسق الأفعال الإرادية واللاإرادية، ويمكّن الوعي والذاكرة والعاطفة.',
    'nervous_facts': '86 مليار خلية عصبية • 100 تريليون تشابك عصبي • سرعة تصل إلى 120 م/ث',
    
    'heart': 'الجهاز القلبي الوعائي',
    'heart_short': 'القلب',
    'heart_desc': 'يضخ الجهاز القلبي الوعائي الدم في جميع أنحاء الجسم، ويوصل الأكسجين والمغذيات بينما يزيل الفضلات. ينبض القلب حوالي 100,000 مرة يومياً، يدور حوالي 7,500 لتر من الدم.',
    'heart_facts': '100,000 نبضة/يوم • 96,000 كم من الأوعية الدموية • 7,500 لتر يومياً',
    
    'digestive': 'الجهاز الهضمي',
    'digestive_short': 'الهضم',
    'digestive_desc': 'يفكك الجهاز الهضمي الطعام إلى مغذيات من خلال عمليات ميكانيكية وكيميائية. يعالج الجهاز الهضمي البالغ طوله 9 أمتار الطعام خلال 24-72 ساعة، مستخلصاً المغذيات الأساسية للوظائف الخلوية.',
    'digestive_facts': '9 أمتار طولاً • 24-72 ساعة للهضم • 1.7 لتر من اللعاب يومياً',
    
    'respiratory': 'الجهاز التنفسي',
    'respiratory_short': 'الرئتان',
    'respiratory_desc': 'يسهل الجهاز التنفسي تبادل الغازات، جالباً الأكسجين إلى الجسم وطارداً ثاني أكسيد الكربون. تحتوي الرئتان على حوالي 600 مليون حويصلة هوائية، توفر مساحة سطح بحجم ملعب تنس تقريباً.',
    'respiratory_facts': '600 مليون حويصلة • 70 م² مساحة سطح • 20,000 نفس/يوم',
    
    'cell': 'علم الخلية',
    'cell_short': 'الخلايا',
    'cell_desc': 'الخلايا هي الوحدات الأساسية للحياة. يحتوي جسم الإنسان على حوالي 37 تريليون خلية، تحتوي كل منها على عضيات تؤدي وظائف محددة ضرورية للحياة.',
    'cell_facts': '37 تريليون خلية • أكثر من 200 نوع خلية • الميتوكوندريا تنتج 90% من الطاقة',
    
    // Cell types
    'cell_types': 'أنواع الخلايا',
    'osteocytes': 'الخلايا العظمية',
    'osteocytes_desc': 'خلايا عظمية ناضجة مدمجة في مصفوفة العظام. تحافظ على أنسجة العظام، وتستشعر الإجهاد الميكانيكي، وتتواصل مع خلايا العظام الأخرى لتنظيم إعادة تشكيل العظام.',
    'osteoblasts': 'بانيات العظم',
    'osteoblasts_desc': 'خلايا بناء العظام التي تصنع وتفرز المكونات العضوية لمصفوفة العظام، بما في ذلك الكولاجين والبروتيوغليكان. تتحول في النهاية إلى خلايا عظمية.',
    'osteoclasts': 'ناقضات العظم',
    'osteoclasts_desc': 'خلايا كبيرة متعددة النوى مسؤولة عن ارتشاف العظام. تفكك أنسجة العظام بإفراز الأحماض والإنزيمات، وتلعب دوراً حاسماً في إعادة تشكيل العظام والتوازن الكالسيومي.',
    
    'neurons': 'الخلايا العصبية',
    'neurons_desc': 'خلايا متخصصة تنقل الإشارات الكهربائية والكيميائية. يمكن لكل خلية عصبية تكوين آلاف الاتصالات مع خلايا عصبية أخرى، مما يخلق شبكات عصبية واسعة.',
    'glial': 'الخلايا الدبقية',
    'glial_desc': 'خلايا دعم تحافظ على التوازن، وتشكل الميالين، وتوفر الدعم والحماية للخلايا العصبية. تفوق عدد الخلايا العصبية بنسبة 10:1.',
    
    'cardiac_muscle': 'خلايا عضلة القلب',
    'cardiac_muscle_desc': 'خلايا عضلية متخصصة تشكل جدار القلب. ترتبط بأقراص مقحمة، مما يسمح بالانقباض المتزامن. على عكس الخلايا العضلية الأخرى، يمكنها توليد نبضاتها الكهربائية.',
    'pacemaker_cells': 'خلايا منظم ضربات القلب',
    'pacemaker_cells_desc': 'خلايا قلبية متخصصة في العقدة الجيبية الأذينية تولد نبضات كهربائية تلقائياً، تحدد إيقاع ضربات القلب بحوالي 60-100 نبضة في الدقيقة.',
    
    'epithelial': 'الخلايا الظهارية',
    'epithelial_desc': 'خلايا تبطن الجهاز الهضمي، تشكل حاجزاً واقياً. تتجدد باستمرار، حيث يتم استبدال بطانة الأمعاء بالكامل كل 3-5 أيام.',
    'goblet': 'الخلايا الكأسية',
    'goblet_desc': 'خلايا متخصصة تفرز المخاط لحماية بطانة الجهاز الهضمي وتسهيل حركة الطعام.',
    'enterocytes': 'الخلايا المعوية',
    'enterocytes_desc': 'خلايا امتصاصية ذات زغابات دقيقة تزيد بشكل كبير مساحة السطح لامتصاص المغذيات.',
    
    // Neuron structure
    'neuron_structure': 'بنية الخلية العصبية',
    'dendrites': 'التشعبات',
    'dendrites_desc': 'امتدادات تشبه الفروع تستقبل الإشارات من الخلايا العصبية الأخرى. يمكن أن تحتوي الخلية العصبية الواحدة على آلاف التشعبات.',
    'soma': 'جسم الخلية',
    'soma_desc': 'الجسم الرئيسي للخلية العصبية الذي يحتوي على النواة ومعظم العضيات. يدمج الإشارات الواردة ويحدد ما إذا كان سيتم توليد جهد فعل.',
    'axon': 'المحور العصبي',
    'axon_desc': 'ألياف طويلة تنقل الإشارات الكهربائية بعيداً عن جسم الخلية. يمكن أن يزيد طولها عن متر واحد وغالباً ما تكون مغطاة بغلاف الميالين.',
    'synapse': 'التشابك العصبي',
    'synapse_desc': 'التقاطع بين الخلايا العصبية حيث يتم إطلاق الناقلات العصبية لنقل الإشارات. يمكن أن يحتوي كل خلية عصبية على ما يصل إلى 10,000 تشابك.',
    
    // Action potential
    'action_potential': 'جهد الفعل',
    'action_potential_title': 'كيف تعمل الخلايا العصبية',
    'action_potential_desc': 'جهد الفعل هو تغير سريع في جهد الغشاء ينتقل على طول الخلية العصبية. يتبع مبدأ الكل أو لا شيء.',
    'ap_step1': 'حالة الراحة',
    'ap_step1_desc': 'تحافظ الخلية العصبية على جهد راحة يبلغ -70 ملي فولت، مع شحنة سالبة أكثر في الداخل.',
    'ap_step2': 'إزالة الاستقطاب',
    'ap_step2_desc': 'عند التحفيز فوق العتبة، تفتح قنوات الصوديوم بسرعة، مما يتسبب في اندفاع الأيونات الموجبة للداخل.',
    'ap_step3': 'إعادة الاستقطاب',
    'ap_step3_desc': 'تفتح قنوات البوتاسيوم وتغلق قنوات الصوديوم، مستعيدة الشحنة السالبة الداخلية.',
    'ap_step4': 'فترة الجموح',
    'ap_step4_desc': 'فترة قصيرة لا يمكن فيها للخلية العصبية إطلاق النار مرة أخرى، مما يضمن انتقال الإشارات في اتجاه واحد.',
    
    // Heart electrical
    'heart_electrical': 'النظام الكهربائي للقلب',
    'sa_node': 'العقدة الجيبية الأذينية',
    'sa_node_desc': 'تولد العقدة الجيبية الأذينية نبضات كهربائية تبدأ كل ضربة قلب. تنبض 60-100 مرة في الدقيقة، محددة إيقاع القلب الطبيعي.',
    'av_node': 'العقدة الأذينية البطينية',
    'av_node_desc': 'تستقبل العقدة الأذينية البطينية الإشارات من العقدة الجيبية وتؤخرها قليلاً، مما يسمح للأذينين بالانقباض الكامل قبل البطينين.',
    'bundle_his': 'حزمة هيس',
    'bundle_his_desc': 'ألياف متخصصة تحمل النبضات الكهربائية من العقدة الأذينية البطينية إلى البطينين.',
    'purkinje': 'ألياف بوركنجي',
    'purkinje_desc': 'شبكة من الألياف توزع الإشارة الكهربائية بسرعة في جميع أنحاء البطينين، مما يسبب انقباضاً منسقاً.',
    
    // Organelles
    'organelles': 'عضيات الخلية',
    'nucleus': 'النواة',
    'nucleus_desc': 'مركز التحكم الذي يحتوي على الحمض النووي. تنظم التعبير الجيني وانقسام الخلية.',
    'mitochondria': 'الميتوكوندريا',
    'mitochondria_desc': 'محطة طاقة الخلية، تنتج ATP من خلال التنفس الخلوي. تحتوي كل خلية على مئات إلى آلاف منها.',
    'er': 'الشبكة الإندوبلازمية',
    'er_desc': 'شبكة من الأغشية تشارك في تصنيع البروتين (الخشنة) وتصنيع الدهون (الملساء).',
    'golgi': 'جهاز غولجي',
    'golgi_desc': 'يعالج ويعبئ ويشحن البروتينات إلى وجهاتها داخل الخلية أو خارجها.',
    'ribosome': 'الريبوسومات',
    'ribosome_desc': 'آلات جزيئية تصنع البروتينات من خلال ترجمة تعليمات mRNA.',
    'lysosome': 'الليسوسومات',
    'lysosome_desc': 'تحتوي على إنزيمات هضمية لتفكيك المواد النفايات والحطام الخلوي.',
    
    // Digestive organs
    'digestive_organs': 'أعضاء الجهاز الهضمي',
    'mouth': 'الفم',
    'mouth_desc': 'يبدأ الهضم الميكانيكي من خلال المضغ والهضم الكيميائي مع أميليز اللعاب الذي يفكك النشويات.',
    'esophagus': 'المريء',
    'esophagus_desc': 'أنبوب عضلي بطول 25 سم يستخدم الحركة الدودية لنقل الطعام من الفم إلى المعدة في حوالي 8 ثوانٍ.',
    'stomach': 'المعدة',
    'stomach_desc': 'تنتج حمض الهيدروكلوريك (pH 1.5-3.5) والبيبسين لتفكيك البروتينات. يبقى الطعام هنا 2-6 ساعات.',
    'small_intestine': 'الأمعاء الدقيقة',
    'small_intestine_desc': 'الموقع الرئيسي للهضم والامتصاص. طولها 6 أمتار وزغاباتها تخلق مساحة سطح 250 م².',
    'large_intestine': 'الأمعاء الغليظة',
    'large_intestine_desc': 'تمتص الماء والكهارل، وتستضيف تريليونات من البكتيريا المفيدة، وتشكل البراز.',
    'liver': 'الكبد',
    'liver_desc': 'ينتج الصفراء لهضم الدهون، ويزيل السموم من الدم، ويخزن الغليكوجين، ويؤدي أكثر من 500 وظيفة حيوية.',
    'pancreas': 'البنكرياس',
    'pancreas_desc': 'ينتج الإنزيمات الهضمية والبيكربونات لمعادلة حمض المعدة. ينتج أيضاً الأنسولين والغلوكاجون.',
    
    // Breathing
    'breathing_cycle': 'دورة التنفس',
    'inhalation': 'الشهيق',
    'inhalation_desc': 'ينقبض الحجاب الحاجز ويتحرك للأسفل، يتمدد القفص الصدري، مما يخلق ضغطاً سلبياً يسحب الهواء إلى الرئتين.',
    'exhalation': 'الزفير',
    'exhalation_desc': 'يسترخي الحجاب الحاجز ويتحرك للأعلى، ينقبض القفص الصدري، يدفع الهواء خارج الرئتين.',
    'gas_exchange': 'تبادل الغازات',
    'gas_exchange_desc': 'في الحويصلات الهوائية، ينتشر الأكسجين إلى الشعيرات الدموية بينما ينتشر ثاني أكسيد الكربون للخارج. يحدث هذا عبر غشاء بسمك 0.5 ميكرومتر فقط.',
    
    // UI
    'close': 'إغلاق',
    'learn_more': 'اعرف المزيد',
    'view_animation': 'شاهد الرسوم المتحركة',
    'click_to_explore': 'انقر على أي نظام للاستكشاف',
    'back': 'رجوع',
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
