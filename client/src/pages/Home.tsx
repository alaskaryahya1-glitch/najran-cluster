import { useState, useRef, useEffect, memo, Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { NajranCrenellation, NajranBackground, NajranSectionDivider, NajranSectionDividerSubtle } from "@/components/NajranPatterns";
import { OptimizedImage } from "@/components/OptimizedImage";
import heroImage1 from "@assets/0B4A4B84-6228-4A64-9958-EB4C285CB04D_1767273959627.png";
import heroImage2 from "@assets/2B883A14-BC32-41DF-906B-7A5ACD6EB41E_1767273959627.png";
import heroImage3 from "@assets/BDB09527-ABFD-4A6A-8628-483C5204F311_1767273959627.png";
import heroImage4 from "@assets/E1CAF13F-A529-4321-90B2-EDEA91B5D2D9_1767273959627.png";
import heroImage5 from "@assets/Emarah_palace_stairs_in_Aba_Alsaud_historical…_1768895221719.jpg";
import heroImage6 from "@assets/Najran_fort,_Saudi_Arabia___Traditional_Mud_Najran…_1768895239595.jpg";
import heroImage7 from "@assets/Najran_Al-Ukhdud_site_-_Saudi_Arabia___Flickr…_(1)_1768895349908.jpg";
import heroImage8 from "@assets/Najran,_Saudi_Arabia_(1)_(1)_1768894401231.jpeg";
import heroImage9 from "@assets/493A91A0-64CA-44FC-873C-FF8E3057DFE7_1767273959627.png";
import heroImage10 from "@assets/__The_Megalithic_Portal_and_Megalith_Map__1768893256731.jpeg";
import heroImage11 from "@assets/385783211_781aa10eed_b_1768893295395.jpg";
import whiteLogo from "@assets/logo4_1767233326721.PNG";
import sehaLogo from "@assets/IMG_8800_1767052201461.png";
import sehhatyLogo from "@assets/IMG_8801_1767052201461.png";
import anatLogo from "@assets/IMG_8802_1767052201461.png";
import nupcoLogo from "@assets/IMG_8790_1767048634247.png";
import exproLogo from "@assets/IMG_8793_1767048634247.png";
import nphiesLogo from "@assets/IMG_8796_1767048634247.jpeg";
import nafisLogo from "@assets/nphies_logo.9ce3f8cc7a760666c970_1767220354051.png";
import insuranceCenterLogo from "@assets/IMG_8795_1767048634247.png";
import visionOfficeLogo from "@assets/4_1767222559258.webp";
import dhamanLogo from "@assets/IMG_8797_1767048634247.png";
import healthHoldingLogo from "@assets/logo-124b0a0_1767082390314.png";
import nhicLogo from "@assets/IMG_8798_1767048800725.png";
import healthTransformLogo from "@assets/logo_1767222621475.png";
import beforeTransformImg from "@assets/IMG_8810_1767053697941.png";
import afterTransformImg from "@assets/IMG_8811_1767053697941.png";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Eye, Target, Heart, Star, Users, Lightbulb, Building2, Stethoscope, Shield, TrendingUp, Monitor, Settings, CheckCircle2, ChevronDown, Compass, Award, X, Landmark, HeartHandshake, Network, RefreshCw, Route, Layers, ShieldCheck, Globe2, Scan, UserSearch, BadgeCheck, ClipboardList, FileSignature, Pill, ExternalLink, HeartPulse, ArrowLeft, Info, Activity, Calendar, Baby, Ambulance, Brain, UsersRound, Dumbbell, Home as HomeIcon, ShieldCheck as ShieldCheckIcon, HeartHandshake as HeartHandshakeIcon } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BrandIcon, CardStar } from "@/components/BrandIcon";

const StrategicGoalCard = memo(({ goal, index, t, fontClass }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative p-6 rounded-2xl bg-card border hover:border-primary/50 transition-all duration-300"
  >
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <goal.icon className="w-6 h-6" />
    </div>
    <h3 className={`text-xl font-bold mb-2 ${fontClass}`}>{t(goal.titleKey)}</h3>
    <p className={`text-muted-foreground ${fontClass}`}>{t(goal.descKey)}</p>
  </motion.div>
));

StrategicGoalCard.displayName = "StrategicGoalCard";

const strategicGoalsData = [
  { icon: Users, titleKey: "home.goal1.title", descKey: "home.goal1.desc", color: "from-[#1691D0] to-[#1691D0]" },
  { icon: TrendingUp, titleKey: "home.goal2.title", descKey: "home.goal2.desc", color: "from-[#1691D0] to-[#15508A]" },
  { icon: Shield, titleKey: "home.goal3.title", descKey: "home.goal3.desc", color: "from-[#2FAAE0] to-[#1691D0]" },
  { icon: Heart, titleKey: "home.goal4.title", descKey: "home.goal4.desc", color: "from-[#1691D0] to-[#2FAAE0]" },
  { icon: Monitor, titleKey: "home.goal5.title", descKey: "home.goal5.desc", color: "from-[#15508A] to-[#1691D0]" },
  { icon: Settings, titleKey: "home.goal6.title", descKey: "home.goal6.desc", color: "from-[#1691D0] to-[#2FAAE0]" },
];

const valuesData = [
  { icon: Heart, labelKey: "home.value.first.label", subtitleKey: "home.value.first", color: "from-[#1691D0] to-[#1691D0]" },
  { icon: Star, labelKey: "home.value.wellness.label", subtitleKey: "home.value.wellness", color: "from-[#1691D0] to-[#15508A]" },
  { icon: Lightbulb, labelKey: "home.value.commitment.label", subtitleKey: "home.value.commitment", color: "from-[#2FAAE0] to-[#1691D0]" },
  { icon: Users, labelKey: "home.value.respect.label", subtitleKey: "home.value.respect", color: "from-[#1691D0] to-[#2FAAE0]" },
  { icon: Target, labelKey: "home.value.collaboration.label", subtitleKey: "home.value.collaboration", color: "from-[#15508A] to-[#1691D0]" },
];

const promisesData = [
  { icon: Heart, titleKey: "home.promise.accessible.title", subtitleKey: "home.promise.accessible.subtitle", descKey: "home.promise.accessible.desc", color: "from-[#1691D0] to-[#1691D0]" },
  { icon: Building2, titleKey: "home.promise.quality.title", subtitleKey: "home.promise.quality.subtitle", descKey: "home.promise.quality.desc", color: "from-[#1691D0] to-[#15508A]" },
  { icon: Users, titleKey: "home.promise.personalized.title", subtitleKey: "home.promise.personalized.subtitle", descKey: "home.promise.personalized.desc", color: "from-[#2FAAE0] to-[#1691D0]" },
  { icon: Star, titleKey: "home.promise.empowering.title", subtitleKey: "home.promise.empowering.subtitle", descKey: "home.promise.empowering.desc", color: "from-[#1691D0] to-[#2FAAE0]" },
];

type ActiveSection = 'goals' | 'values' | 'promises' | null;

// Transformation Journey Data
const transformationPillars = [
  { title: "حوكمة وتنظيم قطاع الصحة", icon: Building2 },
  { title: "مشاركة القطاع الخاص", icon: Users },
  { title: "تقديم الرعاية المتكاملة", icon: Heart },
  { title: "البيانات والرقمنة", icon: Monitor },
  { title: "قيمة وتكلفة قطاع الصحة", icon: TrendingUp },
  { title: "القوى العاملة والتعليم", icon: Users },
  { title: "المساهمة الاقتصادية", icon: TrendingUp },
  { title: "الصحة العامة والأمن الصحي", icon: Shield },
];

const transformationGoals = [
  { title: "تحسين جودة وكفاءة الخدمات الصحية", icon: Target },
  { title: "تسهيل الحصول على الخدمات الصحية", icon: Stethoscope },
  { title: "تعزيز الوقاية ضد المخاطر الصحية", icon: Shield },
  { title: "تعزيز السلامة المرورية", icon: Heart },
];

const howToTransform = [
  { num: "1", title: "أن تكون صحة الفرد هي جوهر الرعاية الصحية" },
  { num: "2", title: "أن يحصل الفرد على رعاية صحية شاملة ومجانية وبجودة عالية" },
  { num: "3", title: "تطوير منسوبي القطاع الصحي يشكل حجر الأساس في نجاح رحلة التحول" },
  { num: "4", title: "توضيح الأدوار والمسؤوليات لكل فرد ومنظومة بالقطاع الصحي" },
  { num: "5", title: "الاستفادة ومشاركة المعرفة والخبرات العالمية" },
  { num: "6", title: "يساهم الفرد بشكل فعال في ارتقاء الصحة العامة للمجتمع" },
];

const responsibleCareGoals = [
  { title: "تحسين صحة السكان", icon: Heart },
  { title: "تطوير تجربة المستفيد من الرعاية الصحية", icon: Award },
  { title: "تقليل التكاليف الإجمالية للرعاية الصحية", icon: TrendingUp },
  { title: "رفع معدل الرضا الوظيفي", icon: Award },
];

const careModelSystems = [
  { title: "رعاية الأمراض المزمنة", desc: "إدارة حالات الأمراض المزمنة (السكري مثال)" },
  { title: "الرعاية الوقائية", desc: "تعزيز الصحة والوقاية من الأمراض" },
  { title: "الرعاية التلطيفية", desc: "تقديم الرعاية للمستفيدين في المراحل النهائية وأسرهم" },
  { title: "رعاية الطفل والأمومة", desc: "تقديم الرعاية للحوامل وحديثي الولادة" },
  { title: "الرعاية العاجلة", desc: "معالجة حالات الطوارئ والحالات الحرجة" },
  { title: "الرعاية المجدولة", desc: "تقديم رعاية اختيارية للحالات غير الحرجة" },
];

const patientJourneyChanges = [
  { before: "لا تتوفر خدمات الرعاية التلطيفية", after: "تتوفر خدمات الرعاية التلطيفية بالتجمع" },
  { before: "لا يوجد مسار واضح لرحلة المريض", after: "يتم تحويل المريض إلى منشأة محددة حيث يتم توفير الخدمة المطلوبة في وقت محدد" },
  { before: "الحالات الباردة يتم خدمتهم في طوارئ المستشفيات", after: "يتم خدمة الحالات الباردة في مراكز الرعاية الأولية والعاجلة" },
  { before: "يتم التحويل ورقي بين المنشآت", after: "سهولة وصول للخدمة عن طريق نظام إلكتروني معتمد" },
  { before: "ارتفاع قوائم الانتظار على أقسام التنويم", after: "ربط منشآت التجمع وتقليل أوقات الانتظار للمرضى" },
];

const navigationCards = [
  { 
    titleKey: "home.nav.about", 
    subtitleKey: "home.nav.about.subtitle",
    href: "/about",
    icon: Info
  },
  { 
    titleKey: "home.nav.services", 
    subtitleKey: "home.nav.services.subtitle",
    href: "/employee-services",
    icon: Stethoscope
  },
  { 
    titleKey: "home.nav.news", 
    subtitleKey: "home.nav.news.subtitle",
    href: "/news",
    icon: HeartPulse
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
    const [beforeAfterActive, setBeforeAfterActive] = useState<'before' | 'after' | null>(null);
  const [selectedCareSystem, setSelectedCareSystem] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language } = useI18n();
  
  const careSystemsData = [
    { id: 'chronic', icon: Activity, initCount: 3 },
    { id: 'elective', icon: Calendar, initCount: 4 },
    { id: 'maternal', icon: Baby, initCount: 7 },
    { id: 'palliative', icon: HeartHandshakeIcon, initCount: 3 },
    { id: 'preventive', icon: ShieldCheckIcon, initCount: 7 },
    { id: 'urgent', icon: Ambulance, initCount: 3 },
  ];
  
  const heroImages = [
    heroImage1, heroImage2, heroImage3, heroImage4,
    heroImage5, heroImage7, heroImage8, heroImage9,
    heroImage10, heroImage11
  ];
  
  const heroSlideContent = [
    {
      titleAr: 'نسعى لتقديم رعاية صحية متميزة ومتكاملة لمنطقة نجران',
      titleEn: 'Delivering Excellence in Healthcare for Najran Region',
      subtitleAr: 'خدمات صحية شاملة تغطي جميع المنشآت الصحية في المنطقة',
      subtitleEn: 'Comprehensive healthcare services across all facilities in the region',
      stats: [
        { valueAr: '11', valueEn: '11', labelAr: 'مستشفى', labelEn: 'Hospitals', icon: Building2, link: '/about' },
        { valueAr: '69', valueEn: '69', labelAr: 'مركز صحي', labelEn: 'Health Centers', icon: Stethoscope, link: '/about' },
        { valueAr: '+495K', valueEn: '495K+', labelAr: 'مستفيد', labelEn: 'Beneficiaries', icon: Users, link: '/about' },
      ]
    },
    {
      titleAr: 'خدمات الرعاية العاجلة والطوارئ',
      titleEn: 'Emergency & Urgent Care Services',
      subtitleAr: 'خدمات طوارئ متاحة على مدار الساعة في جميع مستشفياتنا',
      subtitleEn: 'Round-the-clock emergency services across all our hospitals',
      stats: [
        { valueAr: '24/7', valueEn: '24/7', labelAr: 'خدمة طوارئ', labelEn: 'Emergency', icon: Ambulance, link: '/about' },
        { valueAr: '1,300', valueEn: '1,300', labelAr: 'سرير', labelEn: 'Beds', icon: Heart, link: '/about' },
        { valueAr: '1', valueEn: '1', labelAr: 'مركز تخصصي', labelEn: 'Specialized Center', icon: Shield, link: '/about' },
      ]
    },
    {
      titleAr: 'أنظمة الرعاية الصحية المتكاملة',
      titleEn: 'Integrated Healthcare Systems',
      subtitleAr: 'ستة أنظمة رعاية متخصصة لتغطية جميع احتياجاتك الصحية',
      subtitleEn: 'Six specialized care systems covering all your healthcare needs',
      stats: [
        { valueAr: 'المزمنة', valueEn: 'Chronic', labelAr: 'رعاية الأمراض', labelEn: 'Disease Care', icon: Activity, link: '#care-systems' },
        { valueAr: 'الأمومة', valueEn: 'Maternal', labelAr: 'رعاية', labelEn: 'Care', icon: Baby, link: '#care-systems' },
        { valueAr: 'الوقائية', valueEn: 'Preventive', labelAr: 'الرعاية', labelEn: 'Care', icon: ShieldCheck, link: '#care-systems' },
        { valueAr: 'التلطيفية', valueEn: 'Palliative', labelAr: 'الرعاية', labelEn: 'Care', icon: HeartHandshake, link: '#care-systems' },
        { valueAr: 'العاجلة', valueEn: 'Urgent', labelAr: 'الرعاية', labelEn: 'Care', icon: Ambulance, link: '#care-systems' },
        { valueAr: 'المجدولة', valueEn: 'Scheduled', labelAr: 'الرعاية', labelEn: 'Care', icon: Calendar, link: '#care-systems' },
      ]
    },
    {
      titleAr: 'الخدمات الإلكترونية والتحول الرقمي',
      titleEn: 'E-Services & Digital Transformation',
      subtitleAr: 'خدمات رقمية متطورة لتسهيل الوصول للرعاية الصحية',
      subtitleEn: 'Advanced digital services for easier healthcare access',
      stats: [
        { valueAr: 'صحة', valueEn: 'Seha', labelAr: 'منصة', labelEn: 'Platform', icon: Stethoscope, link: 'https://www.seha.sa/' },
        { valueAr: 'صحتي', valueEn: 'Sehhaty', labelAr: 'تطبيق', labelEn: 'App', icon: Monitor, link: 'https://apps.apple.com/sa/app/%D8%B5%D8%AD%D8%AA%D9%8A-sehhaty/id1459266578' },
        { valueAr: 'أناة', valueEn: 'Anat', labelAr: 'خدمة', labelEn: 'Service', icon: HeartHandshake, link: 'https://anat.sa/' },
        { valueAr: 'السجل الصحي', valueEn: 'Health Record', labelAr: 'خدمة', labelEn: 'Service', icon: ClipboardList, link: 'https://www.moh.gov.sa/eServices/cards/Pages/health-record-know-your-numbers.aspx' },
      ]
    },
    {
      titleAr: 'وجهتك للسياحة العلاجية',
      titleEn: 'Your Medical Tourism Destination',
      subtitleAr: 'نجران وجهتك المثالية للرعاية الصحية المتميزة',
      subtitleEn: 'Najran - Your ideal destination for exceptional healthcare',
      stats: [
        { valueAr: '11', valueEn: '11', labelAr: 'مستشفى', labelEn: 'Hospitals', icon: Building2, link: '/about' },
        { valueAr: '69', valueEn: '69', labelAr: 'مركز صحي', labelEn: 'Health Centers', icon: Stethoscope, link: '/about' },
        { valueAr: '+495K', valueEn: '495K+', labelAr: 'مستفيد', labelEn: 'Beneficiaries', icon: Users, link: '/about' },
      ]
    },
    {
      titleAr: 'رؤيتنا لمستقبل صحي أفضل',
      titleEn: 'Our Vision for a Healthier Future',
      subtitleAr: 'نعمل على تحقيق التميز في الرعاية الصحية وفق رؤية 2030',
      subtitleEn: 'Working towards healthcare excellence aligned with Vision 2030',
      stats: [
        { valueAr: '6', valueEn: '6', labelAr: 'أنظمة رعاية', labelEn: 'Care Systems', icon: Heart, link: '#care-systems' },
        { valueAr: '2030', valueEn: '2030', labelAr: 'رؤية', labelEn: 'Vision', icon: Target, link: '/transformation' },
        { valueAr: '+8K', valueEn: '8K+', labelAr: 'موظف', labelEn: 'Employees', icon: Users, link: '/about' },
      ]
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useSEO({
    path: '/',
    titleAr: 'تجمع نجران الصحي | Najran Health Cluster',
    titleEn: 'Najran Health Cluster | تجمع نجران الصحي',
    descriptionAr: 'يقدم تجمع نجران الصحي خدمات الرعاية الصحية لأكثر من 495 ألف مستفيد، من خلال 69 مركزًا للرعاية الأولية، و 12 مستشفى عام ومتخصص بسعة سريرية إجمالية تصل إلى 1300 سريرًا.',
    descriptionEn: 'Najran Health Cluster provides healthcare services to over 495,000 beneficiaries through 69 primary care centers and 12 general and specialized hospitals with a total bed capacity of 1,300.',
  }, language);
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroContentY = useTransform(heroScrollProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0.3]);
  
  const fontClass = language === 'ar' ? 'font-janna' : 'font-sans';
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      <h1 className="sr-only">
        {language === 'ar' ? 'تجمع نجران الصحي' : 'Najran Health Cluster'}
      </h1>
      {/* Fixed Background Image Slideshow for Entire Site */}
      <div className="fixed inset-0 z-0">
        {heroImages.map((img, idx) => (
          <motion.img 
            key={idx}
            src={img}
            alt=""
            data-nosnippet="true"
            className="absolute inset-0 w-full h-full object-cover dark-bg-image"
            style={{ 
              objectPosition: 'center center', 
              willChange: 'opacity, transform',
              backfaceVisibility: 'hidden',
            }}
            initial={false}
            animate={{ 
              opacity: currentSlide === idx ? 1 : 0,
              scale: currentSlide === idx ? 1 : 1.02,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            loading="eager"
            decoding="async"
          />
        ))}
        {/* Permanent Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/45" />
      </div>

      <Header />
      
      <main className="flex-1 relative z-10">
        {/* Full-Screen Hero Section - Health Holding Style */}
        <section ref={heroRef} className="relative h-[100svh] min-h-[500px] sm:min-h-[600px] overflow-hidden">
          {/* Additional Hero Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
          
          {/* Vertical Navigation Dots - Left Side */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                onClick={() => setCurrentSlide(idx)}
                data-testid={`slide-dot-${idx}`}
              />
            ))}
          </div>
          
          {/* Cluster Logo - Top Center */}
          <motion.div
            
            
            transition={{ delay: 0.2 }}
            className="absolute top-16 md:top-6 left-0 right-0 z-30 flex justify-center"
          >
            <div className="flex flex-col items-center">
              <img 
                src={whiteLogo}
                alt={language === 'ar' ? 'تجمع نجران الصحي' : 'Najran Health Cluster'}
                className="h-32 xs:h-36 sm:h-44 md:h-44 lg:h-52 w-auto object-contain"
              />
              <p className={`text-white/90 text-[10px] md:text-xs ${fontClass} -mr-[85px] md:-mr-32`} style={{ marginTop: '-2px' }}>
                {language === 'ar' ? 'شركة الصحة القابضة' : 'Health Holding Co'}
              </p>
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            className="container-custom relative h-full flex flex-col justify-center items-center text-center px-4 pt-52 md:pt-60 lg:pt-72 pb-8 md:pb-32 z-10"
            style={{ y: heroContentY, opacity: heroOpacity }}
          >

            {/* Dynamic Headline based on slide */}
            <AnimatePresence mode="wait">
              {(() => {
                const contentIndex = currentSlide % heroSlideContent.length;
                return (
              <motion.div
                key={`content-${currentSlide}`}
                
                
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mt-auto md:mt-0"
              >
                <h2 className={`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight ${fontClass}`}>
                  {language === 'ar' 
                    ? heroSlideContent[contentIndex].titleAr
                    : heroSlideContent[contentIndex].titleEn}
                </h2>
                <p className={`text-white text-sm xs:text-base md:text-lg ${fontClass}`}>
                  {language === 'ar'
                    ? heroSlideContent[contentIndex].subtitleAr
                    : heroSlideContent[contentIndex].subtitleEn}
                </p>
                
                {/* Stats Cards */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-6">
                  {heroSlideContent[contentIndex].stats.map((stat, idx) => {
                    const StatIcon = stat.icon;
                    const isExternal = stat.link?.startsWith('http');
                    const isAnchor = stat.link?.startsWith('#');
                    
                    const handleClick = () => {
                      if (isAnchor && stat.link) {
                        const element = document.getElementById(stat.link.substring(1));
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }
                    };
                    
                    if (isAnchor) {
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                          <button
                            onClick={handleClick}
                            className="block bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/20 rounded-lg md:rounded-xl px-2 md:px-4 py-2 md:py-3 min-w-[70px] md:min-w-[100px] hover:bg-white/20 transition-all cursor-pointer hover:scale-105"
                            data-testid={`stat-card-${idx}`}
                          >
                            <StatIcon className="w-4 h-4 md:w-5 md:h-5 text-[#2FAAE0] mx-auto mb-1" />
                            <div className={`text-base md:text-2xl font-bold text-white ${fontClass}`}>
                              {language === 'ar' ? stat.valueAr : stat.valueEn}
                            </div>
                            <div className={`text-white/90 text-[9px] md:text-xs ${fontClass}`}>
                              {language === 'ar' ? stat.labelAr : stat.labelEn}
                            </div>
                          </button>
                        </motion.div>
                      );
                    }
                    
                    const CardWrapper = isExternal ? 'a' : Link;
                    const cardProps = isExternal 
                      ? { href: stat.link, target: '_blank', rel: 'noopener noreferrer' }
                      : { href: stat.link || '/' };
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                      >
                        <CardWrapper
                          {...cardProps}
                          className="block bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/20 rounded-lg md:rounded-xl px-2 md:px-4 py-2 md:py-3 min-w-[70px] md:min-w-[100px] hover:bg-white/20 transition-all cursor-pointer hover:scale-105"
                          data-testid={`stat-card-${idx}`}
                        >
                          <StatIcon className="w-4 h-4 md:w-5 md:h-5 text-[#2FAAE0] mx-auto mb-1" />
                          <div className={`text-base md:text-2xl font-bold text-white ${fontClass}`}>
                            {language === 'ar' ? stat.valueAr : stat.valueEn}
                          </div>
                          <div className={`text-white/90 text-[9px] md:text-xs ${fontClass}`}>
                            {language === 'ar' ? stat.labelAr : stat.labelEn}
                          </div>
                        </CardWrapper>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* CTA Button */}
            <motion.div
              
              
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Button 
                size="lg" 
                className="bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 px-8 py-6 text-lg rounded-full"
                data-testid="button-explore"
                onClick={() => window.location.href = '/e-services'}
              >
                <span className={fontClass}>{language === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}</span>
                <ExternalLink className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 text-[#2FAAE0] brand-icon" />
              </Button>
            </motion.div>

            {/* E-Services Platform Icons */}
            <motion.div
              
              
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <div className="flex flex-wrap justify-center items-center gap-4">
                {[
                  { src: sehaLogo, name: language === 'ar' ? 'سها' : 'Seha', url: 'https://www.seha.sa/' },
                  { src: sehhatyLogo, name: language === 'ar' ? 'صحتي' : 'Sehhaty', url: 'https://apps.apple.com/sa/app/%D8%B5%D8%AD%D8%AA%D9%8A-sehhaty/id1459266578' },
                  { src: anatLogo, name: language === 'ar' ? 'أناة' : 'Anat', url: 'https://anat.sa/' },
                  { src: sehhatyLogo, name: language === 'ar' ? 'السجل الصحي' : 'Health Record', url: 'https://www.moh.gov.sa/eServices/cards/Pages/health-record-know-your-numbers.aspx' },
                ].map((platform, idx) => (
                  <Tooltip key={platform.name}>
                    <TooltipTrigger asChild>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-xl overflow-hidden flex flex-col items-center border border-white/30 hover:bg-white/30 transition-all hover:scale-110"
                        data-testid={`hero-platform-${idx}`}
                      >
                        <div className="h-1 w-full bg-[#2FAAE0]"></div>
                        <div className="w-12 h-11 flex items-center justify-center">
                        <img 
                          src={platform.src} 
                          alt={platform.name}
                          className="w-8 h-8 object-contain brightness-0 invert"
                        />
                        </div>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span className={fontClass}>{platform.name}</span>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation Cards at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:block">
            <div className="container-custom pb-8">
              <div className="grid grid-cols-3 gap-4">
                {navigationCards.map((card, idx) => (
                  <motion.div
                    key={card.titleKey}
                    
                    
                    transition={{ delay: 0.8 + idx * 0.1 }}
                  >
                    <Link 
                      href={card.href}
                      className="block bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 transition-all hover:-translate-y-1 group"
                      data-testid={`nav-card-${idx}`}
                    >
                      <div className="h-1.5 bg-[#2FAAE0]"></div>
                      <div className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`text-lg font-bold text-white ${fontClass}`}>
                            {t(card.titleKey)}
                          </h3>
                          <p className={`text-white/90 text-sm ${fontClass}`}>
                            {t(card.subtitleKey)}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <ArrowLeft className={`w-5 h-5 text-[#2FAAE0] transition-colors brand-icon ${language === 'ar' ? '' : 'rotate-180'}`} />
                        </div>
                      </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="relative text-white overflow-hidden">
          {/* Semi-transparent overlay for readability */}
          <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"></div>
          {/* Najran Geometric Background Pattern */}
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container-custom relative py-16 md:py-20">
            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision */}
              <motion.div
                
                
                
                className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 flex flex-col relative"
              >
                <CardStar size="md" />
                <div className="h-1.5 bg-[#2FAAE0]"></div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Eye className="w-7 h-7 text-[#2FAAE0] brand-icon" />
                  </div>
                  <h3 className={`text-2xl font-bold text-white ${fontClass}`}>{t("home.vision")}</h3>
                </div>
                <p className={`text-white/90 ${fontClass} text-lg leading-relaxed flex-1`}>
                  {t("home.vision.text")}
                </p>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div
                
                
                
                transition={{ delay: 0.1 }}
                className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 flex flex-col relative"
              >
                <CardStar size="md" />
                <div className="h-1.5 bg-[#2FAAE0]"></div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-[#2FAAE0] brand-icon" />
                  </div>
                  <h3 className={`text-2xl font-bold text-white ${fontClass}`}>{t("home.mission")}</h3>
                </div>
                <p className={`text-white/90 ${fontClass} text-lg leading-relaxed flex-1`}>
                  {t("home.mission.text")}
                </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Strategic Goals Section - Full Width Boxes */}
        <section className="relative py-12 z-10 overflow-hidden">
          {/* Semi-transparent overlay for readability */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-[2px]"></div>
          {/* Najran Geometric Background Pattern */}
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container-custom relative">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-white ${fontClass} mb-2`}>{t("home.strategicGoals")}</h2>
              <p className={`text-white/90 ${fontClass}`}>{t("home.strategicGoals.subtitle")}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
              {strategicGoalsData.map((goal, idx) => (
                <motion.div
                  key={goal.titleKey}
                  
                  
                  
                  
                  className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 relative"
                  data-testid={`goal-card-${idx}`}
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2FAAE0]"></div>
                  <div className="p-6">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <goal.icon className="w-7 h-7 text-[#2FAAE0] brand-icon" />
                  </div>
                  <h3 className={`text-lg font-bold text-white ${fontClass} mb-2`}>{t(goal.titleKey)}</h3>
                  <p className={`text-white/90 ${fontClass} text-sm`}>{t(goal.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section - Full Width Boxes */}
        <section className="relative py-12 z-10 overflow-hidden">
          {/* Semi-transparent overlay for readability */}
          <div className="absolute inset-0 bg-black/35 dark:bg-black/65 backdrop-blur-[2px]"></div>
          {/* Najran Geometric Background Pattern */}
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container-custom relative">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-white ${fontClass} mb-2`}>{t("home.values")}</h2>
              <p className={`text-white/90 ${fontClass}`}>{t("home.values.subtitle")}</p>
            </motion.div>
            
            <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-3 xs:gap-4 sm:gap-6">
              {valuesData.map((value, idx) => (
                <motion.div
                  key={value.labelKey}
                  
                  
                  
                  
                  className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 text-center relative"
                  data-testid={`value-card-${idx}`}
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2FAAE0]"></div>
                  <div className="p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[#2FAAE0] brand-icon" />
                  </div>
                  <p className={`text-white/60 ${fontClass} text-xs mb-1`}>{t(value.subtitleKey)}</p>
                  <p className={`${fontClass} font-bold text-white`}>{t(value.labelKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promises Section - Full Width Boxes */}
        <section className="relative py-12 z-10 overflow-hidden">
          {/* Semi-transparent overlay for readability */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-[2px]"></div>
          {/* Najran Geometric Background Pattern */}
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container-custom relative">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-white ${fontClass} mb-2`}>{t("home.promises")}</h2>
              <p className={`text-white/90 ${fontClass}`}>{t("home.promises.subtitle")}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
              {promisesData.map((promise, idx) => (
                <motion.div
                  key={promise.titleKey}
                  
                  
                  
                  
                  className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 text-center relative"
                  data-testid={`promise-card-${idx}`}
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2FAAE0]"></div>
                  <div className="p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <promise.icon className="w-8 h-8 text-[#2FAAE0] brand-icon" />
                  </div>
                  <h3 className={`text-lg font-bold text-white ${fontClass} mb-2`}>{t(promise.titleKey)}</h3>
                  <p className={`text-white/60 ${fontClass} text-xs mb-2`}>{t(promise.subtitleKey)}</p>
                  <p className={`text-white ${fontClass} text-sm`}>{t(promise.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
