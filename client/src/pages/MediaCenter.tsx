import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library, FileText, Search, Download, ExternalLink,
  MessageCircleQuestion, ChevronDown, Folder,
  Building2, HeartPulse
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const mediaItems = [
  {
    id: 1,
    titleAr: 'شعار الصحة القابضة',
    titleEn: 'Health Holding Logo',
    subAr: 'أفقي - ملون',
    subEn: 'Horizontal - Color',
    count: 1,
    emoji: '🏥',
    href: 'https://www.health.sa/knowledge-center/resources/media/albums/health_holding_company_logo',
    thumb: 'https://cmsapi.health.sa/HHC01-gv62l.png',
  },
  {
    id: 2,
    titleAr: 'شعار الصحة القابضة',
    titleEn: 'Health Holding Logo',
    subAr: 'عمودي - ملون',
    subEn: 'Vertical - Color',
    count: 1,
    emoji: '🏥',
    href: 'https://www.health.sa/knowledge-center/resources/media/albums/health_holding_company_logo',
    thumb: 'https://cmsapi.health.sa/HHC02-gv62l.png',
  },
  {
    id: 3,
    titleAr: 'شعار الصحة القابضة',
    titleEn: 'Health Holding Logo',
    subAr: 'أفقي - أبيض',
    subEn: 'Horizontal - White',
    count: 1,
    emoji: '🏥',
    href: 'https://www.health.sa/knowledge-center/resources/media/albums/health_holding_company_logo',
    thumb: 'https://cmsapi.health.sa/HHC03-gv62l.png',
  },
  {
    id: 4,
    titleAr: 'شعار الصحة القابضة',
    titleEn: 'Health Holding Logo',
    subAr: 'عمودي - أبيض',
    subEn: 'Vertical - White',
    count: 1,
    emoji: '🏥',
    href: 'https://www.health.sa/knowledge-center/resources/media/albums/health_holding_company_logo',
    thumb: 'https://cmsapi.health.sa/HHC04-gv62l.png',
  },
];

const guidelineItems = [
  {
    id: 1,
    titleAr: 'الهوية البصرية',
    titleEn: 'Visual Identity',
    descAr: 'دليل الهوية البصرية',
    descEn: 'Visual Identity Guide',
    categoryAr: 'هوية الصحة القابضة',
    categoryEn: 'HHC Identity',
    date: '2026-05-04',
    fileSize: '57.92MB',
    fileIcon: '📄',
    downloadUrl: 'https://cmsapi.health.sa/-OUR-FULL-BRANDING-2025-GUIDE-BOOK-nm85ra.pdf',
  },
  {
    id: 2,
    titleAr: 'الزي الرسمي',
    titleEn: 'Official Uniform',
    descAr: 'دليل الزي الرسمي الطبي لمنسوبي الصحة القابضة',
    descEn: 'Official Medical Dress Code Guide for HHC Staff',
    categoryAr: 'هوية الصحة القابضة',
    categoryEn: 'HHC Identity',
    date: '2026-05-04',
    fileSize: 'PDF',
    fileIcon: '📄',
    downloadUrl: 'https://cmsapi.health.sa/DRESS-COLOR-CODE-12-March-2026-gy1bp6.pdf',
  },
  {
    id: 3,
    titleAr: 'الهوية الصوتية - الرئيسية',
    titleEn: 'Audio Identity - Main',
    descAr: 'يتضمن الملف المقاطع الصوتية الرسمية الخاصة بالهوية الصوتية',
    descEn: 'Contains the official audio clips for the audio identity',
    categoryAr: 'هوية الصحة القابضة',
    categoryEn: 'HHC Identity',
    date: '2026-05-24',
    fileSize: 'ZIP',
    fileIcon: '🎵',
    downloadUrl: 'https://cmsapi.health.sa/Voice-Identity---Main-4ckkw.zip',
  },
  {
    id: 4,
    titleAr: 'الهوية الصوتية - مناسبات (اليوم الوطني، يوم التأسيس، يوم العلم)',
    titleEn: 'Audio Identity - Occasions (National Day, Founding Day, Flag Day)',
    descAr: 'المقاطع الصوتية لمناسبات اليوم الوطني ويوم التأسيس ويوم العلم',
    descEn: 'Audio clips for National Day, Founding Day and Flag Day',
    categoryAr: 'هوية الصحة القابضة',
    categoryEn: 'HHC Identity',
    date: '2026-05-24',
    fileSize: 'ZIP',
    fileIcon: '🎵',
    downloadUrl: 'https://cmsapi.health.sa/Voice-Identity---Occasions-(National-Day,Founding-Day,-Flag-Day)-3zh8fq.zip',
  },
  {
    id: 5,
    titleAr: 'الهوية الصوتية - مناسبات (الحج، رمضان)',
    titleEn: 'Audio Identity - Occasions (Hajj, Ramadan)',
    descAr: 'المقاطع الصوتية الرسمية لمناسبات الحج ورمضان',
    descEn: 'Official audio clips for Hajj and Ramadan occasions',
    categoryAr: 'هوية الصحة القابضة',
    categoryEn: 'HHC Identity',
    date: '2026-05-24',
    fileSize: 'ZIP',
    fileIcon: '🎵',
    downloadUrl: 'https://cmsapi.health.sa/Voice-Identity---Occasions-(Hajj,-Ramadan)-esuet.zip',
  },
  {
    id: 6,
    titleAr: 'الهوية الصوتية - مناسبات (العيد)',
    titleEn: 'Audio Identity - Occasions (Eid)',
    descAr: 'المقاطع الصوتية الرسمية الخاصة بالهوية الصوتية لمناسبة العيد',
    descEn: 'Official audio clips for the Eid occasion audio identity',
    categoryAr: 'هوية الصحة القابضة',
    categoryEn: 'HHC Identity',
    date: '2026-05-24',
    fileSize: 'ZIP',
    fileIcon: '🎵',
    downloadUrl: 'https://cmsapi.health.sa/Voice-Identity---Occasions-(EID)-vprqii.zip',
  },
];

const faqCategories = [
  { id: 'all',      labelAr: 'الكل',           labelEn: 'All',             Icon: Library },
  { id: 'general',  labelAr: 'عام',             labelEn: 'General',         Icon: Building2 },
  { id: 'services', labelAr: 'الخدمات الصحية', labelEn: 'Health Services', Icon: HeartPulse },
];

const faqItems = [
  {
    id: 1, catId: 'general',
    questionAr: 'ما هي شركة الصحة القابضة وما هو عملها؟',
    questionEn: 'What is Health Holding Company and what does it do?',
    answerAr: 'شركة الصحة القابضة هي شركة تتمتع بالشخصية الاعتبارية والذمة المالية المستقلة مملوكة بالكامل للدولة، تتولى تقديم الرعاية الصحية من خلال تجمعات صحية تحت مظلتها تقدم رعاية صحية شاملة ومتكاملة في مناطقها الجغرافية المحددة، تم إنشاؤها بموجب قرار مجلس الوزراء رقم (469) وتاريخ 19/08/1443هـ.',
    answerEn: 'Health Holding Company is a company with legal personality and independent financial liability, fully owned by the state. It provides healthcare through health clusters under its umbrella that offer comprehensive healthcare in their designated geographic areas, established by Cabinet Decision No. (469) dated 19/08/1443H.',
  },
  {
    id: 2, catId: 'general',
    questionAr: 'هل ستحل شركة الصحة القابضة محل وزارة الصحة؟',
    questionEn: 'Will Health Holding Company replace the Ministry of Health?',
    answerAr: 'لا، ستتولى شركة الصحة القابضة الجانب التشغيلي الذي كانت تمارسه الوزارة سابقاً، بينما ستبقى الوزارة مسؤولة عن الجانب التنظيمي والرقابي.',
    answerEn: 'No. Health Holding Company will take over the operational aspect previously handled by the Ministry, while the Ministry will remain responsible for the regulatory and supervisory aspect.',
  },
  {
    id: 3, catId: 'general',
    questionAr: 'ما هي التجمعات الصحية؟',
    questionEn: 'What are health clusters?',
    answerAr: 'التجمع الصحي منظومة مؤسسية موحدة، تتبع لها شبكة متكاملة ومترابطة من مرافق تقديم خدمات الرعاية الصحية. سيكون التجمع الصحي الجهة المسؤولة عن كل ما يؤثر في صحة المجتمع والأفراد في منطقته المحددة.',
    answerEn: 'A health cluster is a unified institutional system with an integrated network of healthcare facilities. It will be responsible for everything affecting community and individual health in its designated area.',
  },
  {
    id: 4, catId: 'general',
    questionAr: 'هل سيتم زيادة عدد التجمعات الصحية في المستقبل؟',
    questionEn: 'Will the number of health clusters increase in the future?',
    answerAr: 'تم تحديد عدد التجمعات الصحية بعشرة تجمعات موزعة في مناطق المملكة، وأي تغيير مستقبلي سيكون بقرار من الجهات المختصة وفق الاحتياجات والمستجدات.',
    answerEn: 'The number of health clusters has been set at ten, distributed across Saudi Arabia. Any future change will be decided by the competent authorities based on needs and developments.',
  },
  {
    id: 5, catId: 'services',
    questionAr: 'من المسؤول عن انتقال المرضى إلى المستشفيات؟',
    questionEn: 'Who is responsible for patient transfers to hospitals?',
    answerAr: 'يتحمل التجمع الصحي المسؤولية الكاملة عن تنسيق وإدارة انتقال المرضى بين مرافق الرعاية الصحية داخل نطاقه الجغرافي، بما يضمن استمرارية الرعاية وسلامة المريض.',
    answerEn: 'The health cluster bears full responsibility for coordinating and managing patient transfers between healthcare facilities within its geographic scope, ensuring continuity of care and patient safety.',
  },
  {
    id: 6, catId: 'general',
    questionAr: 'ما هو نطاق العمل الإشرافي لمديريات الشؤون الصحية؟',
    questionEn: 'What is the supervisory scope of Health Affairs Directorates?',
    answerAr: 'مديريات الشؤون الصحية ستتولى الدور التنظيمي والإشرافي لضمان جودة الخدمات الصحية المقدمة في نطاقها الجغرافي، ومتابعة الالتزام بالأنظمة واللوائح الصحية الصادرة عن وزارة الصحة.',
    answerEn: 'Health Affairs Directorates will take on the regulatory and supervisory role to ensure the quality of health services in their geographic scope, and follow up on compliance with health regulations issued by the Ministry of Health.',
  },
  {
    id: 7, catId: 'general',
    questionAr: 'هل يوجد تاريخ معين بالنسبة إلى تحول المديريات أو تغيير مسماها؟',
    questionEn: 'Is there a specific date for the transformation or renaming of directorates?',
    answerAr: 'تحول مديريات الشؤون الصحية يبدأ بتاريخ اعتماد قرار التحول الذي اعتُمد بجميع المديريات (20 مديرية). أما تغيير المسمى فهو مقترح يتم دراسته الآن.',
    answerEn: 'The transformation of Health Affairs Directorates begins from the date the transformation decision was approved for all 20 directorates. As for renaming, it is a proposal currently under study.',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string, language: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'media',      labelKey: 'mediaCenter.tab.media',      Icon: Library },
  { id: 'guidelines', labelKey: 'mediaCenter.tab.guidelines',  Icon: FileText },
  { id: 'faqs',       labelKey: 'mediaCenter.tab.faqs',        Icon: MessageCircleQuestion },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MediaCenter() {
  const [activeTab, setActiveTab]     = useState('media');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId]     = useState<number | null>(null);
  const [activeCat, setActiveCat]     = useState('all');
  const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({});
  const { t, language }               = useI18n();
  const fontClass                     = language === 'ar' ? 'font-arabic' : 'font-sans';
  const videoRef                      = useVideoAutoplay();

  useSEO({
    path: '/media-center',
    titleAr: 'مكتبة الوسائط | تجمع نجران الصحي',
    titleEn: 'Media Library | Najran Health Cluster',
    descriptionAr: 'مكتبة متكاملة من الوسائط والأدلة الإرشادية والأسئلة الشائعة لتجمع نجران الصحي.',
    descriptionEn: 'An integrated library of media, guidelines, and FAQs from Najran Health Cluster.',
  }, language);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSearchQuery('');
    setActiveCat('all');
    setOpenFaqId(null);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setOpenFaqId(null);
  };

  const q = searchQuery.toLowerCase();

  const filteredMedia = useMemo(() =>
    mediaItems.filter(i => !q || i.titleAr.includes(q) || i.titleEn.toLowerCase().includes(q)),
    [q]);

  const filteredGuidelines = useMemo(() =>
    guidelineItems.filter(i => !q ||
      i.titleAr.includes(q) || i.titleEn.toLowerCase().includes(q) ||
      i.descAr.includes(q)  || i.descEn.toLowerCase().includes(q)),
    [q]);

  const filteredFaqs = useMemo(() =>
    faqItems.filter(i => {
      const matchesCat = activeCat === 'all' || i.catId === activeCat;
      const matchesSearch = !q ||
        i.questionAr.includes(q) || i.questionEn.toLowerCase().includes(q) ||
        i.answerAr.includes(q)   || i.answerEn.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    }),
    [q, activeCat]);

  return (
    <div className="min-h-screen overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="hero-section relative py-32 overflow-hidden" style={{ backgroundColor: '#004070', minHeight: '65vh' }}>
          <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="https://cmsapi.health.sa/background.mp4-n92g3n.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 dark:bg-black/50 pointer-events-none z-[2] transition-colors duration-300" />

          <div className="container-custom relative z-20">
            <motion.div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Library className="w-10 h-10 text-[#2BAAE2]" />
              </div>
              <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {t('mediaCenter.title')}
              </h1>
              <p className={`text-white/80 ${fontClass} max-w-3xl mx-auto text-lg`}>
                {t('mediaCenter.desc')}
              </p>
            </motion.div>
          </div>

          {/* White panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[100]">
            <div className="bg-white rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] px-3 pt-4 md:px-8 md:pt-8 pb-0">
              <div className="container-custom">
                <div className="grid grid-cols-3 gap-2 md:gap-6 -translate-y-6">
                  {[
                    { titleAr: 'عن التجمع',           titleEn: 'About Us',          subtitleAr: 'تعرف على تجمع نجران الصحي', subtitleEn: 'Learn about Najran Health Cluster', href: '/about' },
                    { titleAr: 'خدمات الموظفين',      titleEn: 'Employee Services', subtitleAr: 'خدمات إدارية للموظفين',     subtitleEn: 'Services for employees',            href: '/employee-services' },
                    { titleAr: 'الأخبار والمستجدات',  titleEn: 'News',              subtitleAr: 'آخر أخبار التجمع',          subtitleEn: 'Latest cluster news',               href: '/news' },
                  ].map((card, idx) => (
                    <a key={idx} href={card.href} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-2.5 md:p-5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden relative">
                      <div className="h-1 bg-[#2BAAE2] absolute top-0 left-0 right-0 rounded-t-2xl" />
                      <div className="flex items-center justify-between gap-1 md:gap-4 pt-2">
                        <div className={`flex-1 min-w-0 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          <h3 className={`text-xs md:text-base font-bold text-gray-900 ${fontClass} group-hover:text-[#2BAAE2] transition-colors leading-tight`}>{language === 'ar' ? card.titleAr : card.titleEn}</h3>
                          <p className={`text-gray-500 text-xs ${fontClass} mt-0.5 hidden sm:block`}>{language === 'ar' ? card.subtitleAr : card.subtitleEn}</p>
                        </div>
                        <div className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-[#2BAAE2]/10 flex items-center justify-center group-hover:bg-[#2BAAE2] transition-colors flex-shrink-0">
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-[#2BAAE2] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: language === 'ar' ? 'none' : 'rotate(180deg)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="relative pt-20 md:pt-24 pb-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none" />

          <div className="container-custom relative z-10">

            {/* ── Tabs ── */}
            <div className="flex gap-2 flex-wrap justify-center mb-8">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${fontClass} ${
                    activeTab === tab.id
                      ? 'bg-[#004070] text-white border-[#004070] shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
                  }`}
                >
                  <tab.Icon className="w-4 h-4" />
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>

            {/* ── Search ── */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${language === 'ar' ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder={t('mediaCenter.search.placeholder')}
                className={`w-full bg-white border border-gray-200 rounded-full py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#2BAAE2] focus:ring-2 focus:ring-[#2BAAE2]/20 transition-all ${fontClass} ${language === 'ar' ? 'pr-11 pl-5' : 'pl-11 pr-5'}`}
              />
            </div>

            {/* ── Panels ── */}
            <AnimatePresence mode="wait">

              {/* ── Media ── */}
              {activeTab === 'media' && (
                <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {filteredMedia.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMedia.map((item, idx) => (
                        <motion.a
                          key={item.id}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="group block rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                          style={{ backgroundColor: '#1d3578' }}
                        >
                          <div className="relative aspect-square overflow-hidden">
                            {!thumbErrors[item.id] ? (
                              <img
                                src={item.thumb}
                                alt={language === 'ar' ? item.titleAr : item.titleEn}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={() => setThumbErrors(prev => ({ ...prev, [item.id]: true }))}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-5xl" style={{ backgroundColor: '#1d3578' }}>
                                {item.emoji}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-3" style={{ backgroundColor: '#1d3578' }}>
                            <p className={`text-white text-xs font-bold leading-snug ${fontClass}`}>
                              {language === 'ar' ? item.titleAr : item.titleEn}
                            </p>
                            <p className={`text-[#2BAAE2] text-xs mt-0.5 ${fontClass}`}>
                              {language === 'ar' ? (item as any).subAr : (item as any).subEn}
                            </p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Guidelines ── */}
              {activeTab === 'guidelines' && (
                <motion.div key="guidelines" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {filteredGuidelines.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <table className="w-full text-sm" style={{ backgroundColor: '#1a2e6e' }}>
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className={`px-5 py-4 text-white/70 font-medium text-xs text-start ${fontClass}`}>{language === 'ar' ? 'الملف' : 'File'}</th>
                            <th className={`px-5 py-4 text-white/70 font-medium text-xs text-start hidden md:table-cell ${fontClass}`}>{language === 'ar' ? 'التصنيف' : 'Category'}</th>
                            <th className={`px-5 py-4 text-white/70 font-medium text-xs text-start hidden sm:table-cell ${fontClass}`}>{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                            <th className={`px-5 py-4 text-white/70 font-medium text-xs text-start ${fontClass}`}>{language === 'ar' ? 'الحجم' : 'Size'}</th>
                            <th className="px-5 py-4 text-white/70 font-medium text-xs text-center">{language === 'ar' ? 'تحميل' : 'Download'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredGuidelines.map((item, idx) => (
                            <motion.tr
                              key={item.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.04 }}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-start gap-3">
                                  <span className="text-xl flex-shrink-0 mt-0.5">{item.fileIcon}</span>
                                  <div>
                                    <p className={`text-white font-semibold text-sm leading-snug ${fontClass}`}>
                                      {language === 'ar' ? item.titleAr : item.titleEn}
                                    </p>
                                    <p className={`text-white/50 text-xs mt-0.5 ${fontClass}`}>
                                      {language === 'ar' ? item.descAr : item.descEn}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4 hidden md:table-cell">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300">
                                  {language === 'ar' ? item.categoryAr : item.categoryEn}
                                </span>
                              </td>
                              <td className={`px-5 py-4 text-white/60 text-xs hidden sm:table-cell ${fontClass}`}>
                                {formatDate(item.date, language)}
                              </td>
                              <td className={`px-5 py-4 text-white/60 text-xs ${fontClass}`}>{item.fileSize}</td>
                              <td className="px-5 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <a
                                    href={item.downloadUrl}
                                    download
                                    className="w-8 h-8 rounded-full bg-[#2BAAE2]/20 hover:bg-[#2BAAE2] flex items-center justify-center text-[#2BAAE2] hover:text-white transition-all duration-200"
                                    title={language === 'ar' ? 'تحميل' : 'Download'}
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </a>
                                  <a
                                    href={item.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                                    title={language === 'ar' ? 'فتح' : 'Open'}
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── FAQs ── */}
              {activeTab === 'faqs' && (
                <motion.div key="faqs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {/* Category filter */}
                  <div className="flex gap-2 flex-wrap justify-center mb-8">
                    {faqCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCat(cat.id); setOpenFaqId(null); }}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${fontClass} ${
                          activeCat === cat.id
                            ? 'bg-[#2BAAE2] text-white border-[#2BAAE2]'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
                        }`}
                      >
                        <cat.Icon className="w-3.5 h-3.5" />
                        {language === 'ar' ? cat.labelAr : cat.labelEn}
                      </button>
                    ))}
                  </div>

                  {filteredFaqs.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="max-w-3xl mx-auto space-y-3">
                      {filteredFaqs.map((item, idx) => {
                        const isOpen = openFaqId === item.id;
                        const catLabel = faqCategories.find(c => c.id === item.catId);
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: idx * 0.04 }}
                            className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
                              isOpen ? 'border-[#2BAAE2] shadow-[0_8px_24px_rgba(43,170,226,0.15)]' : 'border-gray-100 shadow-sm hover:border-[#2BAAE2]/40'
                            }`}
                          >
                            <button
                              onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                              className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-start ${fontClass}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isOpen ? 'bg-[#2BAAE2] text-white' : 'bg-[#2BAAE2]/10 text-[#2BAAE2]'
                                }`}>
                                  {idx + 1}
                                </div>
                                <div>
                                  <p className={`font-semibold text-gray-800 text-sm leading-snug ${isOpen ? 'text-[#2BAAE2]' : ''}`}>
                                    {language === 'ar' ? item.questionAr : item.questionEn}
                                  </p>
                                  {catLabel && (
                                    <span className="text-xs text-gray-400 mt-0.5 block">
                                      {language === 'ar' ? catLabel.labelAr : catLabel.labelEn}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ChevronDown className={`w-4 h-4 flex-shrink-0 text-[#2BAAE2] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  key="answer"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className={`px-5 pb-5 pt-0 ${fontClass}`}>
                                    <div className="border-t border-gray-100 pt-4">
                                      <p className="text-gray-600 text-sm leading-relaxed">
                                        {language === 'ar' ? item.answerAr : item.answerEn}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
