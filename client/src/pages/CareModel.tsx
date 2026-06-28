import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Activity, Calendar, Baby, Ambulance, Brain, UsersRound, Dumbbell, HeartHandshake, ShieldCheck, ChevronDown } from "lucide-react";
import { CardStar } from "@/components/BrandIcon";

const careSystemsData = [
  { id: 'chronic', icon: Activity, initCount: 3 },
  { id: 'elective', icon: Calendar, initCount: 4 },
  { id: 'maternal', icon: Baby, initCount: 7 },
  { id: 'palliative', icon: HeartHandshake, initCount: 3 },
  { id: 'preventive', icon: ShieldCheck, initCount: 7 },
  { id: 'urgent', icon: Ambulance, initCount: 3 },
];

export default function CareModel() {
  const [selectedCareSystem, setSelectedCareSystem] = useState<string | null>(null);
  const { t, language } = useI18n();
    const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';

  useSEO({
    path: '/care-model',
    titleAr: 'أنظمة الرعاية الصحية | تجمع نجران الصحي',
    titleEn: 'Healthcare Systems | Najran Health Cluster',
    descriptionAr: 'تعرف على أنظمة الرعاية الصحية المتكاملة في تجمع نجران الصحي.',
    descriptionEn: 'Learn about integrated healthcare systems at Najran Health Cluster.',
  }, language);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="care-model-content">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#004070', minHeight: '40vh' }}>
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="https://cmsapi.health.sa/background.mp4-n92g3n.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 najran-geometric-bg opacity-20 pointer-events-none"></div>

          <div className="container-custom relative z-20">
            <motion.div
              className="text-center mb-8"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#2BAAE2]" />
              </div>
              <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {language === 'ar' ? 'نموذج الرعاية الصحية السعودي' : 'Saudi Healthcare Model'}
              </h1>
              <p className={`text-white/80 ${fontClass} max-w-3xl mx-auto text-lg`}>
                {t("home.healthModel.desc")}
              </p>
            </motion.div>
          </div>

          {/* White panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[100]">
            <div className="bg-white rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] px-3 pt-4 md:px-8 md:pt-8 pb-0">
              <div className="container-custom">
                <div className="grid grid-cols-3 gap-2 md:gap-6 -translate-y-6">
                  {[
                    { titleAr: 'عن التجمع', titleEn: 'About Us', subtitleAr: 'تعرف على تجمع نجران الصحي', subtitleEn: 'Learn about Najran Health Cluster', href: '/about' },
                    { titleAr: 'خدمات الموظفين', titleEn: 'Employee Services', subtitleAr: 'خدمات إدارية للموظفين', subtitleEn: 'Services for employees', href: '/employee-services' },
                    { titleAr: 'الأخبار والمستجدات', titleEn: 'News', subtitleAr: 'آخر أخبار التجمع', subtitleEn: 'Latest cluster news', href: '/news' },
                  ].map((card, idx) => (
                    <a key={idx} href={card.href} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-2.5 md:p-5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden relative">
                      <div className="h-1 bg-[#2BAAE2] absolute top-0 left-0 right-0 rounded-t-2xl"></div>
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

        {/* أبعاد الصحة */}
        <section className="relative pt-28 md:pt-36 pb-10 sm:pb-12 md:pb-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>

          <div className="container-custom relative z-10">
            <motion.div
              className="text-center mb-8 sm:mb-10 md:mb-12"
            >
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${fontClass} text-gray-900 mb-4`}>
                {t("home.healthModel.title")}
              </h2>
              <p className={`text-gray-600 mx-auto ${fontClass} whitespace-nowrap`}>
                {t("home.healthModel.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
              {[
                { id: 'mental', icon: Brain },
                { id: 'social', icon: UsersRound },
                { id: 'physical', icon: Dumbbell },
              ].map((pillar, idx) => (
                <motion.div
                  key={pillar.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(43,170,226,0.2)] hover:border-[#2BAAE2] transition-all duration-[400ms] relative"
                  style={{ borderRadius: '40px' }}
                >
                  <CardStar size="md" />
                  <div className="h-1.5 bg-[#2BAAE2]" style={{ borderRadius: '40px 40px 0 0' }}></div>
                  <div className="p-6 relative z-10">
                    <div className="w-16 h-16 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mx-auto mb-4 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110">
                      <pillar.icon className="w-8 h-8 text-[#2BAAE2] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className={`text-xl font-bold text-center text-gray-900 mb-4 ${fontClass}`}>
                      {t(`home.healthModel.${pillar.id}.title`)}
                    </h3>
                    <ul className={`space-y-2 ${fontClass}`}>
                      {[1, 2, 3].map((num) => (
                        <li key={num} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">
                            {t(`home.healthModel.${pillar.id}.item${num}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mb-12"
            >
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${fontClass} text-gray-900 mb-4`}>
                {t("home.careSystems.title")}
              </h2>
              <p className={`text-gray-600 max-w-2xl mx-auto ${fontClass}`}>
                {t("home.careSystems.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {careSystemsData.map((system, idx) => (
                <motion.button
                  key={system.id}
                  onClick={() => setSelectedCareSystem(selectedCareSystem === system.id ? null : system.id)}
                  className={`flex flex-col items-center rounded-2xl overflow-hidden transition-all border ${
                    selectedCareSystem === system.id
                      ? 'bg-[#2BAAE2] text-white shadow-lg scale-105 border-[#2BAAE2]'
                      : 'bg-white text-gray-900 hover:-translate-y-1 hover:border-[#2BAAE2] border-gray-100 shadow-sm'
                  }`}
                  data-testid={`button-care-system-${system.id}`}
                >
                  <div className="h-1.5 w-full bg-[#2BAAE2]"></div>
                  <div className="flex flex-col items-center gap-2 px-6 py-4">
                    <system.icon className={`w-8 h-8 ${selectedCareSystem === system.id ? 'text-white' : 'text-[#2BAAE2]'}`} />
                    <span className={`text-sm font-medium text-center ${fontClass} ${selectedCareSystem === system.id ? 'text-white' : 'text-gray-600'}`}>
                      {t(`home.careSystems.${system.id}.title`)}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        selectedCareSystem === system.id ? 'rotate-180 text-white' : 'text-[#2BAAE2]'
                      }`}
                    />
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedCareSystem && (
                <motion.div
                  key={selectedCareSystem}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative"
                  style={{ borderRadius: '40px' }}
                >
                  <CardStar size="lg" />
                  <div className="h-1.5 bg-[#2BAAE2]" style={{ borderRadius: '40px 40px 0 0' }}></div>
                  <div className="p-8 relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className={`text-2xl font-bold text-gray-900 ${fontClass} mb-2`}>
                          {t(`home.careSystems.${selectedCareSystem}.title`)}
                        </h3>
                        <p className={`text-gray-600 ${fontClass}`}>
                          {t(`home.careSystems.${selectedCareSystem}.desc`)}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedCareSystem(null)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        data-testid="button-close-care-system"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Array.from({ length: careSystemsData.find(s => s.id === selectedCareSystem)?.initCount || 3 }).map((_, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <p className={`text-gray-600 text-sm ${fontClass}`}>
                            {t(`home.careSystems.${selectedCareSystem}.init${idx + 1}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
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
