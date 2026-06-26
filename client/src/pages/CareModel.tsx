import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroImage from "@assets/BDB09527-ABFD-4A6A-8628-483C5204F311_1767273959627.png";
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
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          data-nosnippet="true"
          className="w-full h-full object-cover dark-bg-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/45" />
      </div>

      <Header />

      <main className="relative z-10">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container-custom relative">
            <motion.div
              
              
              className="text-center mb-8"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#2BAAE2]" />
              </div>
              <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {language === 'ar' ? 'نموذج الرعاية الصحية السعودي' : 'Saudi Healthcare Model'}
              </h1>
              <p className={`text-white ${fontClass} max-w-3xl mx-auto text-lg`}>
                {t("home.healthModel.desc")}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative py-10 sm:py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container-custom relative">
            <motion.div
              
              
              
              className="text-center mb-8 sm:mb-10 md:mb-12"
            >
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${fontClass} text-white mb-4`}>
                {t("home.healthModel.title")}
              </h2>
              <p className={`text-white mx-auto ${fontClass} whitespace-nowrap`}>
                {t("home.healthModel.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
              {[
                { id: 'mental', icon: Brain, color: 'from-purple-500 to-purple-700' },
                { id: 'social', icon: UsersRound, color: 'from-[#2BAAE2] to-[#1691D0]' },
                { id: 'physical', icon: Dumbbell, color: 'from-[#1691D0] to-[#15508A]' },
              ].map((pillar, idx) => (
                <motion.div
                  key={pillar.id}
                  
                  
                  
                  
                  className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 relative"
                >
                  <CardStar size="md" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-6 relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-8 h-8 text-[#2BAAE2]" />
                  </div>
                  <h3 className={`text-xl font-bold text-center text-white mb-4 ${fontClass}`}>
                    {t(`home.healthModel.${pillar.id}.title`)}
                  </h3>
                  <ul className={`space-y-2 ${fontClass}`}>
                    {[1, 2, 3].map((num) => (
                      <li key={num} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#2BAAE2] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white text-sm">
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
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${fontClass} text-white mb-4`}>
                {t("home.careSystems.title")}
              </h2>
              <p className={`text-white max-w-2xl mx-auto ${fontClass}`}>
                {t("home.careSystems.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {careSystemsData.map((system, idx) => (
                <motion.button
                  key={system.id}
                  
                  
                  
                  
                  onClick={() => setSelectedCareSystem(selectedCareSystem === system.id ? null : system.id)}
                  className={`flex flex-col items-center rounded-xl overflow-hidden transition-all ${
                    selectedCareSystem === system.id
                      ? 'bg-black/30 dark:bg-black/55 backdrop-blur-md text-white shadow-lg scale-105 border border-white/40'
                      : 'bg-black/20 dark:bg-black/50 backdrop-blur-md text-white/90 hover:bg-white/15 border border-white/20'
                  }`}
                  data-testid={`button-care-system-${system.id}`}
                >
                  <div className="h-1.5 w-full bg-[#2BAAE2]"></div>
                  <div className="flex flex-col items-center gap-2 px-6 py-4">
                  <system.icon className="w-8 h-8 text-[#2BAAE2]" />
                  <span className={`text-sm font-medium text-center ${fontClass}`}>
                    {t(`home.careSystems.${system.id}.title`)}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 text-[#2BAAE2] transition-transform duration-300 ${
                      selectedCareSystem === system.id ? 'rotate-180' : ''
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
                  className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 relative"
                >
                  <CardStar size="lg" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className={`text-2xl font-bold text-white ${fontClass} mb-2`}>
                        {t(`home.careSystems.${selectedCareSystem}.title`)}
                      </h3>
                      <p className={`text-white ${fontClass}`}>
                        {t(`home.careSystems.${selectedCareSystem}.desc`)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCareSystem(null)}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                      data-testid="button-close-care-system"
                    >
                      <X className="w-5 h-5 text-white/90" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: careSystemsData.find(s => s.id === selectedCareSystem)?.initCount || 3 }).map((_, idx) => (
                      <div key={idx} className="bg-white/10 rounded-xl p-4 border border-white/10">
                        <p className={`text-white/90 text-sm ${fontClass}`}>
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
