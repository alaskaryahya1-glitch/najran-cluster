import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import healthTransformLogo from "@assets/logo_1767222621475.png";
import beforeTransformImg from "@assets/IMG_8810_1767053697941.png";
import afterTransformImg from "@assets/IMG_8811_1767053697941.png";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Target, Heart, Star, Users, Lightbulb, Building2, Stethoscope, Shield, TrendingUp, Monitor, Settings, CheckCircle2, ChevronDown, Compass, Award, X, Landmark, HeartHandshake, Network, RefreshCw, Route, Layers, ShieldCheck, Globe2, Scan, UserSearch, BadgeCheck, ClipboardList, FileSignature, Pill, ExternalLink, HeartPulse, ArrowLeft, Info, Activity, Calendar, Baby, Ambulance, Brain, UsersRound, Dumbbell } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CardStar } from "@/components/BrandIcon";

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

const patientJourneyChanges = [
  { before: "لا تتوفر خدمات الرعاية التلطيفية", after: "تتوفر خدمات الرعاية التلطيفية بالتجمع" },
  { before: "لا يوجد مسار واضح لرحلة المريض", after: "يتم تحويل المريض إلى منشأة محددة حيث يتم توفير الخدمة المطلوبة في وقت محدد وإرسال التغذية الراجعة بعد إتمام الخدمة" },
  { before: "الحالات الباردة ذات التصنيف CTAS4,5 يتم خدمتهم في طوارئ المستشفيات مما يسبب الضغط العالي وارتفاع قوائم الانتظار", after: "يتم خدمة الحالات الباردة ذات التصنيف CTAS4,5 في مراكز الرعاية الأولية والعاجلة مما يخفف الضغط على أقسام الطوارئ بالمستشفيات" },
  { before: "يتم التحويل ورقي بين المنشآت", after: "سهولة وصول للخدمة عن طريق نظام إلكتروني معتمد" },
  { before: "ارتفاع قوائم الانتظار على أقسام التنويم", after: "ربط منشآت التجمع والاستفادة من جميع المصادر المتاحة مما انعكس على تقليل أوقات وأعداد الانتظار للمرضى" },
  { before: "يتم متابعة مرضى الأمراض المزمنة المستقرة بالمستشفى", after: "يتم تحويل مرضى الأمراض المزمنة المستقرة إلى المراكز الصحية للمتابعة" },
];

const careSystemsData = [
  { id: 'chronic', icon: Activity, initCount: 3 },
  { id: 'elective', icon: Calendar, initCount: 4 },
  { id: 'maternal', icon: Baby, initCount: 7 },
  { id: 'palliative', icon: HeartHandshake, initCount: 3 },
  { id: 'preventive', icon: ShieldCheck, initCount: 7 },
  { id: 'urgent', icon: Ambulance, initCount: 3 },
];

export default function Transformation() {
  const [beforeAfterActive, setBeforeAfterActive] = useState<'before' | 'after' | null>(null);
  const [selectedCareSystem, setSelectedCareSystem] = useState<string | null>(null);
  const { t, language } = useI18n();
    const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';

  useSEO({
    path: '/transformation',
    titleAr: 'التحول الصحي | تجمع نجران الصحي',
    titleEn: 'Health Transformation | Najran Health Cluster',
    descriptionAr: 'رحلة التحول الصحي في تجمع نجران الصحي ضمن رؤية السعودية 2030.',
    descriptionEn: 'Health transformation journey at Najran Health Cluster under Saudi Vision 2030.',
  }, language);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="transformation-page-content">
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#004070', minHeight: '65vh' }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="https://cmsapi.health.sa/video.mp4-jyzcdp.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 pointer-events-none z-[1]" style={{ backgroundColor: '#000000', opacity: 0.30 }}></div>
          <div className="absolute inset-0 najran-geometric-bg opacity-20 pointer-events-none z-[2]"></div>
          
          <div className="container-custom relative z-[10]">
            <motion.div


              className="text-center mb-8"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={healthTransformLogo}
                  alt="برنامج التحول الصحي"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {language === 'ar' ? 'رحلة التحول الصحي' : 'Health Transformation Journey'}
              </h1>
              <p className={`text-white/80 ${fontClass} max-w-3xl mx-auto text-lg`}>
                {language === 'ar'
                  ? <>رحلة التحول في القطاع الصحي نحو تحقيق رؤية المملكة <span className="text-[#2BAAE2]">2030</span></>
                  : <>Health Sector Transformation Journey towards Saudi Vision <span className="text-[#2BAAE2]">2030</span></>}
              </p>
            </motion.div>
          </div>

          {/* White panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[100] hidden md:block">
            <div className="bg-white rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] px-8 pt-8 pb-0">
              <div className="container-custom">
                <div className="grid grid-cols-3 gap-6 -translate-y-6">
                  {[
                    { titleAr: 'عن التجمع', titleEn: 'About Us', subtitleAr: 'تعرف على تجمع نجران الصحي', subtitleEn: 'Learn about Najran Health Cluster', href: '/about' },
                    { titleAr: 'خدمات الموظفين', titleEn: 'Employee Services', subtitleAr: 'خدمات إدارية للموظفين', subtitleEn: 'Services for employees', href: '/employee-services' },
                    { titleAr: 'الأخبار والمستجدات', titleEn: 'News', subtitleAr: 'آخر أخبار التجمع', subtitleEn: 'Latest cluster news', href: '/news' },
                  ].map((card, idx) => (
                    <a key={idx} href={card.href} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden relative">
                      <div className="h-1 bg-[#2BAAE2] absolute top-0 left-0 right-0 rounded-t-2xl"></div>
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`text-base font-bold text-gray-900 ${fontClass} group-hover:text-[#2BAAE2] transition-colors`}>{language === 'ar' ? card.titleAr : card.titleEn}</h3>
                          <p className={`text-gray-500 text-sm ${fontClass} mt-0.5`}>{language === 'ar' ? card.subtitleAr : card.subtitleEn}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#2BAAE2]/10 flex items-center justify-center group-hover:bg-[#2BAAE2] transition-colors flex-shrink-0">
                          <svg className="w-4 h-4 text-[#2BAAE2] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: language === 'ar' ? 'none' : 'rotate(180deg)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. محاور رؤية 2030 */}
        <section className="relative pt-36 md:pt-44 pb-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? <>محاور رؤية <span className="text-[#2BAAE2]">2030</span></> : <>Vision <span className="text-[#2BAAE2]">2030</span> Axes</>}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Heart, title: language === 'ar' ? 'مجتمع حيوي' : 'Vibrant Society', desc: language === 'ar' ? 'الوصول إلى مجتمع حيوي من خلال توفير حياة كريمة وسعيدة للجميع' : 'Reaching a vibrant society through a dignified and happy life for all' },
                { icon: Building2, title: language === 'ar' ? 'وطن طموح' : 'Ambitious Nation', desc: language === 'ar' ? 'تهدف رؤية المملكة للتحول إلى حكومة عالية الأداء تتسم بالفعالية والشفافية' : 'Vision aims for a high-performing government characterized by effectiveness and transparency' },
                { icon: TrendingUp, title: language === 'ar' ? 'اقتصاد مزدهر' : 'Thriving Economy', desc: language === 'ar' ? 'توفير بيئة داعمة وممكنة قادرة على إطلاق العنان للابتكار في قطاع الأعمال' : 'Creating an environment that enables innovation in business' },
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  
                  
                  
                  
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(43,170,226,0.2)] hover:border-[#2BAAE2] transition-all duration-[400ms] relative group"
                  data-testid={`card-vision-axis-${idx}`}
                >
                  <CardStar size="md" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-6 relative z-10">
                  <div className="w-14 h-14 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                    <pillar.icon className="w-7 h-7 text-[#2BAAE2] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 ${fontClass} mb-3`}>{pillar.title}</h3>
                  <p className={`text-gray-600 text-sm ${fontClass} leading-relaxed`}>{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. برنامج تحول القطاع الصحي */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-4`}>
                {language === 'ar' ? 'ماهو برنامج تحول القطاع الصحي؟' : 'What is the Health Sector Transformation Program?'}
              </h2>
              <p className={`text-gray-600 ${fontClass} max-w-3xl mx-auto`}>
                {language === 'ar' 
                  ? 'يهدف البرنامج إلى إعادة هيكلة القطاع الصحي في المملكة بما يساهم في تعزيز مكانته وتفعيل مقوماته كنظام صحي فعال ومتكامل'
                  : 'The program aims to restructure the health sector to enhance its position as an effective and integrated health system'}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {transformationGoals.map((goal, idx) => (
                <motion.div
                  key={idx}
                  
                  
                  
                  
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(43,170,226,0.2)] hover:border-[#2BAAE2] transition-all duration-[400ms] relative group"
                  data-testid={`card-goal-${idx}`}
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 relative z-10">
                  <div className="w-12 h-12 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-3 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                    <goal.icon className="w-6 h-6 text-[#2BAAE2] group-hover:text-white transition-colors" />
                  </div>
                  <p className={`text-sm ${fontClass} text-gray-600 font-medium`}>{goal.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ركائز برنامج التحول الصحي */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'ركائز برنامج التحول الصحي' : 'Health Transformation Pillars'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {transformationPillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  
                  
                  
                  
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(43,170,226,0.2)] hover:border-[#2BAAE2] transition-all duration-[400ms] relative group"
                  data-testid={`card-pillar-${idx}`}
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 relative z-10">
                  <div className="w-12 h-12 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-3 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                    <pillar.icon className="w-6 h-6 text-[#2BAAE2] group-hover:text-white transition-colors" />
                  </div>
                  <p className={`text-sm ${fontClass} text-gray-600 font-medium`}>{pillar.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. كيف نحقق التحول الصحي */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Route className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'كيف نحقق التحول الصحي؟' : 'How do we achieve health transformation?'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {howToTransform.map((item, idx) => (
                <motion.div
                  key={idx}
                  
                  
                  
                  
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(43,170,226,0.2)] hover:border-[#2BAAE2] transition-all duration-[400ms] relative group"
                  data-testid={`card-how-${idx}`}
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#2BAAE2] font-bold">{item.num}</span>
                  </div>
                  <p className={`text-sm ${fontClass} text-gray-600`}>{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. الأبعاد الاستراتيجية للتحول الصحي */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'الأبعاد الاستراتيجية للتحول الصحي' : 'Strategic Dimensions for Health Transformation'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: language === 'ar' ? 'صحة أفضل' : 'Better Health', desc: language === 'ar' ? 'تحسين المؤشرات الصحية للسكان' : 'Improving population health indicators' },
                { icon: Stethoscope, title: language === 'ar' ? 'رعاية أفضل' : 'Better Care', desc: language === 'ar' ? 'تقديم رعاية صحية عالية الجودة' : 'Delivering high-quality healthcare' },
                { icon: TrendingUp, title: language === 'ar' ? 'استدامة أفضل' : 'Better Sustainability', desc: language === 'ar' ? 'ضمان استدامة النظام الصحي' : 'Ensuring healthcare system sustainability' },
                { icon: Users, title: language === 'ar' ? 'قوى عاملة أفضل' : 'Better Workforce', desc: language === 'ar' ? 'تطوير الكوادر الصحية' : 'Developing healthcare workforce' },
              ].map((dimension, idx) => (
                <motion.div
                  key={idx}
                  
                  
                  
                  
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(43,170,226,0.2)] hover:border-[#2BAAE2] transition-all duration-[400ms] relative group"
                  data-testid={`card-dimension-${idx}`}
                >
                  <CardStar size="md" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-6 relative z-10">
                  <div className="w-14 h-14 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                    <dimension.icon className="w-7 h-7 text-[#2BAAE2] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 ${fontClass} mb-2`}>{dimension.title}</h3>
                  <p className={`text-gray-600 text-sm ${fontClass}`}>{dimension.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. وضع القطاع الصحي */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'وضع القطاع الصحي' : 'Health Sector Status'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                
                
                
                className="flex flex-col"
              >
                <button
                  onClick={() => setBeforeAfterActive(beforeAfterActive === 'before' ? null : 'before')}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all text-center ${
                    beforeAfterActive === 'before' ? 'border-[#2BAAE2]/40 shadow-md' : 'border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1'
                  }`}
                  data-testid="button-before-transform"
                >
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-6">
                  <img src={beforeTransformImg} alt="Before" className="w-full h-48 object-contain mb-4 rounded-lg" />
                  <h3 className={`text-xl font-bold text-gray-900 ${fontClass} mb-2`}>
                    {t("home.healthStatus.before.title")}
                  </h3>
                  <p className={`text-gray-600 font-semibold ${fontClass}`}>
                    {t("home.healthStatus.before.subtitle")}
                  </p>
                  <ChevronDown className={`w-6 h-6 text-[#2BAAE2] mx-auto mt-3 transition-transform ${beforeAfterActive === 'before' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {beforeAfterActive === 'before' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-xl flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-[#2BAAE2] group-hover:text-white transition-colors" />
                            </div>
                            <div>
                              <h4 className={`text-lg font-bold text-gray-900 ${fontClass}`}>
                                {t("home.healthStatus.before.title")}
                              </h4>
                              <p className={`text-gray-600 text-sm ${fontClass}`}>
                                {t("home.healthStatus.before.subtitle")}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setBeforeAfterActive(null)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            data-testid="button-close-before"
                          >
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>

                        <p className={`text-gray-600 mb-4 ${fontClass}`}>
                          {t("home.healthStatus.before.desc")}
                        </p>

                        <ul className={`space-y-3 ${fontClass}`}>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{t("home.healthStatus.before.item1")}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{t("home.healthStatus.before.item2")}</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                
                
                
                className="flex flex-col"
              >
                <button
                  onClick={() => setBeforeAfterActive(beforeAfterActive === 'after' ? null : 'after')}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all text-center ${
                    beforeAfterActive === 'after' ? 'border-[#2BAAE2]/40 shadow-md' : 'border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1'
                  }`}
                  data-testid="button-after-transform"
                >
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-6">
                  <img src={afterTransformImg} alt="After" className="w-full h-48 object-contain mb-4 rounded-lg" />
                  <h3 className={`text-xl font-bold text-gray-900 ${fontClass} mb-2`}>
                    {t("home.healthStatus.after.title")}
                  </h3>
                  <p className={`text-gray-600 font-semibold ${fontClass}`}>
                    {t("home.healthStatus.after.subtitle")}
                  </p>
                  <ChevronDown className={`w-6 h-6 text-[#2BAAE2] mx-auto mt-3 transition-transform ${beforeAfterActive === 'after' ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {beforeAfterActive === 'after' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2 rtl:space-x-reverse">
                              <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-xl flex items-center justify-center border-2 border-gray-200">
                                <Building2 className="w-5 h-5 text-[#2BAAE2]" />
                              </div>
                              <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-xl flex items-center justify-center border-2 border-gray-200">
                                <Shield className="w-5 h-5 text-[#2BAAE2]" />
                              </div>
                              <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-xl flex items-center justify-center border-2 border-gray-200">
                                <Heart className="w-5 h-5 text-[#2BAAE2]" />
                              </div>
                            </div>
                            <div>
                              <h4 className={`text-lg font-bold text-gray-900 ${fontClass}`}>
                                {t("home.healthStatus.after.title")}
                              </h4>
                              <p className={`text-gray-600 text-sm ${fontClass}`}>
                                {t("home.healthStatus.after.subtitle")}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setBeforeAfterActive(null)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            data-testid="button-close-after"
                          >
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>

                        <p className={`text-gray-600 mb-4 ${fontClass}`}>
                          {t("home.healthStatus.after.desc")}
                        </p>

                        <ul className={`space-y-3 ${fontClass}`}>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{t("home.healthStatus.after.item1")}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{t("home.healthStatus.after.item2")}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{t("home.healthStatus.after.item3")}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{t("home.healthStatus.after.item4")}</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. شركة الصحة القابضة */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
              data-testid="card-holding-company"
            >
              <CardStar size="lg" />
              <div className="h-1.5 bg-[#2BAAE2]"></div>
              <div className="p-8 relative z-10">
              <div className="w-20 h-20 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                <Building2 className="w-10 h-10 text-[#2BAAE2] group-hover:text-white transition-colors" />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 ${fontClass} text-center mb-4`}>
                {language === 'ar' ? 'ماهي شركة الصحة القابضة؟' : 'What is the Health Holding Company?'}
              </h2>
              <p className={`text-gray-600 ${fontClass} text-center leading-relaxed max-w-4xl mx-auto`}>
                {language === 'ar' 
                  ? 'شركة وطنية مملوكة للدولة تتولى تقديم الرعاية الصحية الشاملة والمتكاملة من خلال التجمعات الصحية العشرين والتي تخدم جميع مناطق المملكة'
                  : 'A state-owned national company that provides comprehensive healthcare through 20 health clusters serving all regions of the Kingdom'}
              </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 8. التجمع الصحي */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
              data-testid="card-cluster-definition"
            >
              <CardStar size="lg" />
              <div className="h-1.5 bg-[#2BAAE2]"></div>
              <div className="p-8 relative z-10">
              <div className="w-20 h-20 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                <Network className="w-10 h-10 text-[#2BAAE2] group-hover:text-white transition-colors" />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 ${fontClass} text-center mb-4`}>
                {language === 'ar' ? 'ماهو التجمع الصحي؟' : 'What is a Health Cluster?'}
              </h2>
              <p className={`text-gray-600 ${fontClass} text-center leading-relaxed max-w-4xl mx-auto`}>
                {language === 'ar' 
                  ? 'التجمع الصحي هو منظومة مؤسسية تتبع له جميع المرافق الصحية يغطي منطقته الجغرافية المحددة، وهو مسؤول عن صحة وسلامة سكان هذه المنطقة وهذا لا يقتصر على العلاج، بل يمتد إلى الوقاية والتوعية من الأمراض.'
                  : 'A health cluster is an institutional system that includes all health facilities covering a specific geographic area, responsible for the health and safety of its population, extending beyond treatment to prevention and awareness.'}
              </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 9. منظومة الرعاية المسؤولة */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'ماهي منظومة الرعاية المسؤولة؟' : 'What is Accountable Care Organization?'}
              </h2>
              <p className={`text-gray-600 ${fontClass} max-w-4xl mx-auto`}>
                {language === 'ar' 
                  ? 'هي مجموعة من مقدمي خدمات الرعاية الصحية (مراكز رعاية أولية، ثانوية أو متخصصة) يجتمعون لتقديم رعاية صحية متكاملة لعدد معين من السكان في منطقة جغرافية محددة'
                  : 'A group of healthcare providers (primary, secondary, or specialized care centers) who come together to provide integrated healthcare for a specific population in a defined geographic area'}
              </p>
            </motion.div>

            <motion.div
              
              
              
              className="text-center mb-6"
            >
              <h3 className={`text-xl font-bold text-gray-900 ${fontClass}`}>
                {language === 'ar' ? 'أهدافها' : 'Objectives'}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                
                
                
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
                data-testid="card-aco-1"
              >
                <CardStar size="md" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-6 relative z-10">
                <div className="w-14 h-14 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <Star className="w-7 h-7 text-[#2BAAE2] group-hover:text-white transition-colors" />
                </div>
                <h3 className={`text-lg font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'تطوير تجربة المستفيد' : 'Enhance Patient Experience'}
                </h3>
                <p className={`text-gray-600 text-sm ${fontClass}`}>
                  {language === 'ar' ? 'تطوير تجربة المستفيد من الرعاية الصحية' : 'Improving the beneficiary experience in healthcare'}
                </p>
                </div>
              </motion.div>

              <motion.div
                
                
                
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
                data-testid="card-aco-2"
              >
                <CardStar size="md" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-6 relative z-10">
                <div className="w-14 h-14 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <HeartPulse className="w-7 h-7 text-[#2BAAE2] group-hover:text-white transition-colors" />
                </div>
                <h3 className={`text-lg font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'تحسين صحة السكان' : 'Improve Population Health'}
                </h3>
                <p className={`text-gray-600 text-sm ${fontClass}`}>
                  {language === 'ar' ? 'تحسين الصحة العامة لسكان المنطقة' : 'Improving the overall health of the population'}
                </p>
                </div>
              </motion.div>

              <motion.div
                
                
                
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
                data-testid="card-aco-3"
              >
                <CardStar size="md" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-6 relative z-10">
                <div className="w-14 h-14 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <Users className="w-7 h-7 text-[#2BAAE2] group-hover:text-white transition-colors" />
                </div>
                <h3 className={`text-lg font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'رفع الرضا الوظيفي' : 'Increase Job Satisfaction'}
                </h3>
                <p className={`text-gray-600 text-sm ${fontClass}`}>
                  {language === 'ar' ? 'رفع معدل الرضا الوظيفي للعاملين' : 'Increasing employee job satisfaction rates'}
                </p>
                </div>
              </motion.div>

              <motion.div
                
                
                
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
                data-testid="card-aco-4"
              >
                <CardStar size="md" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-6 relative z-10">
                <div className="w-14 h-14 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <TrendingUp className="w-7 h-7 text-[#2BAAE2] group-hover:text-white transition-colors" />
                </div>
                <h3 className={`text-lg font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'تقليل التكاليف' : 'Reduce Costs'}
                </h3>
                <p className={`text-gray-600 text-sm ${fontClass}`}>
                  {language === 'ar' ? 'تقليل التكاليف الإجمالية للرعاية الصحية' : 'Reducing total healthcare costs'}
                </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 10. إدارة التغيير والتواصل المؤسسي */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'ماهي إدارة التغيير والتواصل المؤسسي؟' : 'What is Change Management & Institutional Communication?'}
              </h2>
              <p className={`text-gray-600 ${fontClass} max-w-4xl mx-auto`}>
                {language === 'ar' 
                  ? 'تهدف إدارة التغيير والتواصل المؤسسي في التجمع الصحي إلى تحقيق مجموعة من الأهداف المترابطة التي تساهم بشكل كبير في تحسين أداء المنظمة والتواصل الفعال بين الأقسام وبناء ثقافة تنظيمية داعمة للتغيير'
                  : 'Change management and institutional communication in the health cluster aims to achieve interconnected goals that significantly contribute to improving organizational performance, effective inter-departmental communication, and building a supportive organizational culture for change'}
              </p>
            </motion.div>

            <motion.div
              
              
              
              className="text-center mb-6"
            >
              <h3 className={`text-xl font-bold text-gray-900 ${fontClass}`}>
                {language === 'ar' ? 'مهام إدارة التغيير والتواصل في التجمع الصحي' : 'Change Management Tasks in Health Cluster'}
              </h3>
            </motion.div>

            <div data-testid="card-change-management">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <motion.div
                  
                  
                  
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <RefreshCw className="w-5 h-5 text-[#2BAAE2]" />
                    <h4 className={`text-sm font-bold text-gray-900 ${fontClass}`}>
                      {language === 'ar' ? 'تحفيز التغيير' : 'Drive Change'}
                    </h4>
                  </div>
                  <p className={`text-gray-600 text-xs ${fontClass}`}>
                    {language === 'ar' ? 'تحفيز التغيير في الثقافة التنظيمية لتصبح أكثر مرونة وابتكاراً وتوجهاً نحو المريض' : 'Drive cultural change to become more flexible, innovative, and patient-oriented'}
                  </p>
                  </div>
                </motion.div>

                <motion.div
                  
                  
                  
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-[#2BAAE2]" />
                    <h4 className={`text-sm font-bold text-gray-900 ${fontClass}`}>
                      {language === 'ar' ? 'تعزيز التعاون' : 'Enhance Collaboration'}
                    </h4>
                  </div>
                  <p className={`text-gray-600 text-xs ${fontClass}`}>
                    {language === 'ar' ? 'تعزيز التعاون والتنسيق بين مختلف أقسام التجمع الصحي' : 'Enhance collaboration and coordination between health cluster departments'}
                  </p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <motion.div
                  
                  
                  
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Monitor className="w-5 h-5 text-[#2BAAE2]" />
                    <h4 className={`text-sm font-bold text-gray-900 ${fontClass}`}>
                      {language === 'ar' ? 'قنوات التواصل' : 'Communication Channels'}
                    </h4>
                  </div>
                  <p className={`text-gray-600 text-xs ${fontClass}`}>
                    {language === 'ar' ? 'توفير قنوات تواصل فعالة مع الموظفين لبناء الثقة وتبادل المعلومات' : 'Provide effective communication channels with employees to build trust'}
                  </p>
                  </div>
                </motion.div>

                <motion.div
                  
                  
                  
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Info className="w-5 h-5 text-[#2BAAE2]" />
                    <h4 className={`text-sm font-bold text-gray-900 ${fontClass}`}>
                      {language === 'ar' ? 'معلومات واضحة' : 'Clear Information'}
                    </h4>
                  </div>
                  <p className={`text-gray-600 text-xs ${fontClass}`}>
                    {language === 'ar' ? 'توفير معلومات واضحة وشاملة للمرضى وأسرهم حول الخدمات المقدمة' : 'Provide clear and comprehensive information to patients and families'}
                  </p>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center">
                <motion.div
                  
                  
                  
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm w-full md:w-1/2 relative"
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-5 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <HeartHandshake className="w-5 h-5 text-[#2BAAE2]" />
                    <h4 className={`text-sm font-bold text-gray-900 ${fontClass}`}>
                      {language === 'ar' ? 'العلاقات المجتمعية' : 'Community Relations'}
                    </h4>
                  </div>
                  <p className={`text-gray-600 text-xs ${fontClass}`}>
                    {language === 'ar' ? 'بناء علاقات قوية مع المجتمع المحلي وتعزيز الشراكات' : 'Build strong relationships with local community and enhance partnerships'}
                  </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. إدارة الصحة السكانية */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeartPulse className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'ماهي إدارة الصحة السكانية؟' : 'What is Population Health Management?'}
              </h2>
              <p className={`text-gray-600 ${fontClass} max-w-4xl mx-auto`}>
                {language === 'ar' 
                  ? 'نهج شامل يعالج الاحتياجات الصحية للسكان والأفراد عبر جميع مراحل الرعاية الصحية، من خلال تطوير إجراءات استباقية مبنية على البيانات، فعالة من حيث التكلفة، وتركز على الوقاية وتحسين جودة الحياة'
                  : 'A comprehensive approach addressing population health needs across all healthcare stages through proactive, data-driven, cost-effective interventions focused on prevention and quality of life improvement'}
              </p>
            </motion.div>

            <motion.div
              
              
              
              className="text-center mb-6"
            >
              <h3 className={`text-xl font-bold text-gray-900 ${fontClass}`}>
                {language === 'ar' ? 'دورة إدارة الصحة السكانية' : 'Population Health Management Cycle'}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4" data-testid="card-population-health">
              <motion.div
                
                
                
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
              >
                <CardStar size="sm" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-5 relative z-10">
                <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-3 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <span className="text-[#2BAAE2] font-bold">1</span>
                </div>
                <h4 className={`text-sm font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'إشراك السكان' : 'Engage Population'}
                </h4>
                <p className={`text-gray-600 text-xs ${fontClass}`}>
                  {language === 'ar' ? 'تعزيز التوعية الصحية والوقاية من الأمراض بشكل مستمر' : 'Continuous health awareness and disease prevention'}
                </p>
                </div>
              </motion.div>

              <motion.div
                
                
                
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
              >
                <CardStar size="sm" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-5 relative z-10">
                <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-3 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <span className="text-[#2BAAE2] font-bold">2</span>
                </div>
                <h4 className={`text-sm font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'تحديد وفهم السكان' : 'Identify & Understand'}
                </h4>
                <p className={`text-gray-600 text-xs ${fontClass}`}>
                  {language === 'ar' ? 'تحديد الفئات المستهدفة وتقسيمهم حسب المخاطر' : 'Identify target groups and stratify by risk'}
                </p>
                </div>
              </motion.div>

              <motion.div
                
                
                
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
              >
                <CardStar size="sm" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-5 relative z-10">
                <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-3 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <span className="text-[#2BAAE2] font-bold">3</span>
                </div>
                <h4 className={`text-sm font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'تصميم التدخلات' : 'Design Interventions'}
                </h4>
                <p className={`text-gray-600 text-xs ${fontClass}`}>
                  {language === 'ar' ? 'اختيار التدخلات ووضع أولويات التنفيذ' : 'Select interventions and prioritize implementation'}
                </p>
                </div>
              </motion.div>

              <motion.div
                
                
                
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
              >
                <CardStar size="sm" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-5 relative z-10">
                <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-3 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <span className="text-[#2BAAE2] font-bold">4</span>
                </div>
                <h4 className={`text-sm font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'تنفيذ التدخلات' : 'Execute Interventions'}
                </h4>
                <p className={`text-gray-600 text-xs ${fontClass}`}>
                  {language === 'ar' ? 'وضع حوكمة للتنفيذ وتخصيص الموارد' : 'Establish governance and allocate resources'}
                </p>
                </div>
              </motion.div>

              <motion.div
                
                
                
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm text-center relative"
              >
                <CardStar size="sm" />
                <div className="h-1.5 bg-[#2BAAE2]"></div>
                <div className="p-5 relative z-10">
                <div className="w-10 h-10 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-3 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                  <span className="text-[#2BAAE2] font-bold">5</span>
                </div>
                <h4 className={`text-sm font-bold text-gray-900 ${fontClass} mb-2`}>
                  {language === 'ar' ? 'قياس وتقييم' : 'Measure & Evaluate'}
                </h4>
                <p className={`text-gray-600 text-xs ${fontClass}`}>
                  {language === 'ar' ? 'تطوير مؤشرات التقييم وتطبيق التحسين المستمر' : 'Develop metrics and apply continuous improvement'}
                </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 12. ما الذي تغير في رحلة المريض */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>
          
          <div className="container-custom relative z-10">
            <motion.div
              
              
              
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-2`}>
                {language === 'ar' ? 'ما الذي تغير في رحلة المريض؟' : 'What Changed in the Patient Journey?'}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {patientJourneyChanges.map((change, idx) => (
                <motion.div
                  key={idx}
                  
                  
                  
                  
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative">
                    <CardStar size="sm" />
                    <div className="h-1.5 bg-[#2BAAE2]"></div>
                    <div className="p-5 relative z-10">
                    <p className={`text-sm text-gray-600 ${fontClass}`}>
                      <span className="font-bold text-gray-400 block mb-1">{language === 'ar' ? 'قبل التحول' : 'Before Transformation'}</span>
                      {change.before}
                    </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative">
                    <CardStar size="sm" />
                    <div className="h-1.5 bg-[#2BAAE2]"></div>
                    <div className="p-5 relative z-10">
                    <p className={`text-sm text-gray-600 ${fontClass}`}>
                      <span className="font-bold text-gray-900 block mb-1">{language === 'ar' ? 'بعد التحول' : 'After Transformation'}</span>
                      {change.after}
                    </p>
                    </div>
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
