import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library, Video, Images, FileText, BarChart3, Search,
  Download, Play, Eye, BookOpen, ClipboardList, ChevronLeft, ChevronRight,
  MessageCircleQuestion, ChevronDown, Building2, HeartPulse, CalendarDays, ShieldCheck, Users
} from "lucide-react";
import { CardStar } from "@/components/BrandIcon";

// ── Data ──────────────────────────────────────────────────────────────────────

const mediaItems: { id: number; type: string; gradient: string; titleAr: string; titleEn: string; date: string }[] = [];

const publicationItems: { id: number; pages?: number; titleAr: string; titleEn: string; descAr: string; descEn: string; date: string }[] = [];

const reportItems: { id: number; typeKey?: string; titleAr: string; titleEn: string; descAr: string; descEn: string; date: string }[] = [];

const guidelineItems: { id: number; catKey?: string; titleAr: string; titleEn: string; descAr: string; descEn: string; date: string }[] = [];

const faqCategories = [
  { id: 'all',       labelAr: 'الكل',               labelEn: 'All',               Icon: Library },
  { id: 'general',   labelAr: 'عام',                 labelEn: 'General',           Icon: Building2 },
  { id: 'services',  labelAr: 'الخدمات الصحية',      labelEn: 'Health Services',   Icon: HeartPulse },
  { id: 'appts',     labelAr: 'المواعيد',             labelEn: 'Appointments',      Icon: CalendarDays },
  { id: 'insurance', labelAr: 'التأمين الصحي',       labelEn: 'Health Insurance',  Icon: ShieldCheck },
  { id: 'hr',        labelAr: 'الموارد البشرية',     labelEn: 'Human Resources',   Icon: Users },
];

const faqItems: { id: number; catId: string; questionAr: string; questionEn: string; answerAr: string; answerEn: string }[] = [];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string, language: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MediaCard({ item, language, fontClass, t }: any) {
  const isVideo = item.type === 'video';
  const isInfographic = item.type === 'infographic';

  const badgeLabel = t(`mediaCenter.badge.${item.type}`);
  const Icon = isVideo ? Video : isInfographic ? BarChart3 : Images;
  const actionLabel = isVideo ? t('mediaCenter.action.watch') : t('mediaCenter.action.view');
  const ActionIcon = isVideo ? Play : Eye;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(43,170,226,0.18)] hover:border-[#2BAAE2] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
        <Icon className="w-14 h-14 text-white/30" />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-white ms-1" />
            </div>
          </div>
        )}
        <span className="absolute top-3 end-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
          {badgeLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1.5">{formatDate(item.date, language)}</p>
        <h3 className={`font-bold text-gray-800 text-sm leading-snug mb-4 line-clamp-2 ${fontClass} group-hover:text-[#2BAAE2] transition-colors`}>
          {language === 'ar' ? item.titleAr : item.titleEn}
        </h3>
        <button className={`flex items-center gap-1.5 text-xs font-semibold text-[#2BAAE2] hover:gap-2.5 transition-all ${fontClass}`}>
          <ActionIcon className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      </div>
    </motion.div>
  );
}

function DocumentCard({ item, language, fontClass, t, accent }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden flex"
    >
      <div className={`w-1.5 flex-shrink-0 ${accent}`} />
      <div className="flex-1 p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2BAAE2]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2BAAE2] transition-colors duration-300">
            <FileText className="w-6 h-6 text-[#2BAAE2] group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-1">{formatDate(item.date, language)}</p>
            <h3 className={`font-bold text-gray-800 text-sm leading-snug mb-1.5 ${fontClass} group-hover:text-[#2BAAE2] transition-colors`}>
              {language === 'ar' ? item.titleAr : item.titleEn}
            </h3>
            <p className={`text-gray-500 text-xs leading-relaxed line-clamp-2 ${fontClass}`}>
              {language === 'ar' ? item.descAr : item.descEn}
            </p>
            {item.pages && (
              <span className="inline-block mt-2 text-xs text-[#2BAAE2] font-medium bg-[#2BAAE2]/10 px-2 py-0.5 rounded-full">
                {item.pages} {language === 'ar' ? 'صفحة' : 'pages'}
              </span>
            )}
            {item.typeKey && (
              <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {language === 'ar'
                  ? (({ quarterly: 'ربع سنوي', annual: 'سنوي', monthly: 'شهري' } as Record<string, string>)[item.typeKey] ?? item.typeKey)
                  : (({ quarterly: 'Quarterly', annual: 'Annual', monthly: 'Monthly' } as Record<string, string>)[item.typeKey] ?? item.typeKey)
                }
              </span>
            )}
            {item.catKey && (
              <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {language === 'ar'
                  ? (({ clinical: 'سريري', safety: 'سلامة', emergency: 'طوارئ', mental: 'صحة نفسية', maternal: 'أمومة وطفل', pharmacy: 'صيدلة' } as Record<string, string>)[item.catKey] ?? item.catKey)
                  : (({ clinical: 'Clinical', safety: 'Safety', emergency: 'Emergency', mental: 'Mental Health', maternal: 'Maternal & Child', pharmacy: 'Pharmacy' } as Record<string, string>)[item.catKey] ?? item.catKey)
                }
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className={`flex items-center gap-1.5 text-xs font-semibold text-[#2BAAE2] bg-[#2BAAE2]/10 hover:bg-[#2BAAE2] hover:text-white px-3 py-1.5 rounded-full transition-colors duration-200 ${fontClass}`}>
            <Download className="w-3.5 h-3.5" />
            {t('mediaCenter.action.download')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FaqPanel({ language, fontClass, searchQuery }: { language: string; fontClass: string; searchQuery: string }) {
  const [activeCat, setActiveCat] = useState('all');
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return faqItems.filter(item => {
      const matchesCat = activeCat === 'all' || item.catId === activeCat;
      const matchesSearch = !q ||
        item.questionAr.includes(q) || item.questionEn.toLowerCase().includes(q) ||
        item.answerAr.includes(q)   || item.answerEn.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCat, searchQuery]);

  return (
    <motion.div key="faqs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {faqCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCat(cat.id); setOpenId(null); }}
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

      {/* Accordion */}
      {filtered.length === 0 ? (
        <div className={`text-center py-20 text-gray-400 ${fontClass}`}>
          {language === 'ar' ? 'لا توجد نتائج مطابقة' : 'No results match your search'}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openId === item.id;
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
                  onClick={() => setOpenId(isOpen ? null : item.id)}
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
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'media',        labelKey: 'mediaCenter.tab.media',        Icon: Library },
  { id: 'publications', labelKey: 'mediaCenter.tab.publications',  Icon: BookOpen },
  { id: 'reports',      labelKey: 'mediaCenter.tab.reports',       Icon: BarChart3 },
  { id: 'guidelines',   labelKey: 'mediaCenter.tab.guidelines',    Icon: ClipboardList },
  { id: 'faqs',         labelKey: 'mediaCenter.tab.faqs',          Icon: MessageCircleQuestion },
];

const MEDIA_FILTERS = [
  { id: 'all',          labelKey: 'mediaCenter.filter.all' },
  { id: 'video',        labelKey: 'mediaCenter.filter.video' },
  { id: 'image',        labelKey: 'mediaCenter.filter.image' },
  { id: 'infographic',  labelKey: 'mediaCenter.filter.infographic' },
];

const ITEMS_PER_PAGE_MEDIA = 9;
const ITEMS_PER_PAGE_DOCS  = 6;

export default function MediaCenter() {
  const [activeTab, setActiveTab]       = useState('media');
  const [mediaFilter, setMediaFilter]   = useState('all');
  const [searchQuery, setSearchQuery]   = useState('');
  const [currentPage, setCurrentPage]   = useState(1);
  const { t, language }                 = useI18n();
  const fontClass                       = language === 'ar' ? 'font-arabic' : 'font-sans';
  const videoRef                        = useVideoAutoplay();

  useSEO({
    path: '/media-center',
    titleAr: 'مكتبة الوسائط | تجمع نجران الصحي',
    titleEn: 'Media Library | Najran Health Cluster',
    descriptionAr: 'مكتبة متكاملة من المواد الإعلامية والمطبوعات والتقارير والإرشادات الصحية لتجمع نجران الصحي.',
    descriptionEn: 'An integrated library of media materials, publications, reports, and health guidelines from Najran Health Cluster.',
  }, language);

  // Reset page when tab / filter / search changes
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setMediaFilter('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleFilterChange = (id: string) => {
    setMediaFilter(id);
    setCurrentPage(1);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  // Filtered media items
  const filteredMedia = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesFilter = mediaFilter === 'all' || item.type === mediaFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [mediaFilter, searchQuery]);

  const filteredPublications = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return publicationItems.filter(item => !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredReports = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return reportItems.filter(item => !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredGuidelines = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return guidelineItems.filter(item => !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q));
  }, [searchQuery]);

  // Pagination
  const paginatedMedia        = filteredMedia.slice((currentPage - 1) * ITEMS_PER_PAGE_MEDIA, currentPage * ITEMS_PER_PAGE_MEDIA);
  const paginatedPublications = filteredPublications.slice((currentPage - 1) * ITEMS_PER_PAGE_DOCS, currentPage * ITEMS_PER_PAGE_DOCS);
  const paginatedReports      = filteredReports.slice((currentPage - 1) * ITEMS_PER_PAGE_DOCS, currentPage * ITEMS_PER_PAGE_DOCS);
  const paginatedGuidelines   = filteredGuidelines.slice((currentPage - 1) * ITEMS_PER_PAGE_DOCS, currentPage * ITEMS_PER_PAGE_DOCS);

  const totalPages = activeTab === 'media'
    ? Math.ceil(filteredMedia.length / ITEMS_PER_PAGE_MEDIA)
    : activeTab === 'publications'
    ? Math.ceil(filteredPublications.length / ITEMS_PER_PAGE_DOCS)
    : activeTab === 'reports'
    ? Math.ceil(filteredReports.length / ITEMS_PER_PAGE_DOCS)
    : activeTab === 'guidelines'
    ? Math.ceil(filteredGuidelines.length / ITEMS_PER_PAGE_DOCS)
    : 1; // faqs — no pagination

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
                    { titleAr: 'عن التجمع',            titleEn: 'About Us',           subtitleAr: 'تعرف على تجمع نجران الصحي',  subtitleEn: 'Learn about Najran Health Cluster', href: '/about' },
                    { titleAr: 'خدمات الموظفين',       titleEn: 'Employee Services',  subtitleAr: 'خدمات إدارية للموظفين',      subtitleEn: 'Services for employees',            href: '/employee-services' },
                    { titleAr: 'الأخبار والمستجدات',   titleEn: 'News',               subtitleAr: 'آخر أخبار التجمع',           subtitleEn: 'Latest cluster news',               href: '/news' },
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
          <video autoPlay loop muted playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>

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

            {/* ── Media filters ── */}
            <AnimatePresence>
              {activeTab === 'media' && (
                <motion.div
                  key="media-filters"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex gap-2 flex-wrap justify-center mb-8"
                >
                  {MEDIA_FILTERS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => handleFilterChange(f.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${fontClass} ${
                        mediaFilter === f.id
                          ? 'bg-[#2BAAE2] text-white border-[#2BAAE2]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
                      }`}
                    >
                      {t(f.labelKey)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Content panels ── */}
            <AnimatePresence mode="wait">

              {/* Media */}
              {activeTab === 'media' && (
                <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedMedia.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <AnimatePresence>
                        {paginatedMedia.map(item => (
                          <MediaCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Publications */}
              {activeTab === 'publications' && (
                <motion.div key="publications" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedPublications.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedPublications.map(item => (
                        <DocumentCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} accent="bg-[#2BAAE2]" />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Reports */}
              {activeTab === 'reports' && (
                <motion.div key="reports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedReports.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedReports.map(item => (
                        <DocumentCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} accent="bg-[#004070]" />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Guidelines */}
              {activeTab === 'guidelines' && (
                <motion.div key="guidelines" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedGuidelines.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedGuidelines.map(item => (
                        <DocumentCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} accent="bg-emerald-500" />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* FAQs */}
              {activeTab === 'faqs' && (
                <FaqPanel language={language} fontClass={fontClass} searchQuery={searchQuery} />
              )}
            </AnimatePresence>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#2BAAE2] hover:text-[#2BAAE2] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold border transition-all ${
                      currentPage === i + 1
                        ? 'bg-[#004070] text-white border-[#004070]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#2BAAE2] hover:text-[#2BAAE2] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
