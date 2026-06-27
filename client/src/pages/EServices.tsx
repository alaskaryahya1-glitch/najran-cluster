import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";

import sehaLogo from "@assets/IMG_8800_1767052201461.png";
import sehhatyLogo from "@assets/IMG_8801_1767052201461.png";
import anatLogo from "@assets/IMG_8802_1767052201461.png";


export default function EServices() {
  const { t, language } = useI18n();
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';

  useSEO({
    path: '/e-services',
    titleAr: 'الخدمات الإلكترونية | تجمع نجران الصحي',
    titleEn: 'E-Services | Najran Health Cluster',
    descriptionAr: 'المنصات والخدمات الإلكترونية الصحية المتاحة للمستفيدين.',
    descriptionEn: 'Electronic health platforms and services available for beneficiaries.',
  }, language);

  const platforms = [
    {
      src: sehaLogo,
      titleKey: "home.eHealth.seha",
      subtitleKey: "home.eHealth.seha.subtitle",
      descKey: "home.eHealth.seha.desc",
      hasApp: false,
      websiteUrl: "https://www.seha.sa/"
    },
    {
      src: sehhatyLogo,
      titleKey: "home.eHealth.sehhaty",
      subtitleKey: "home.eHealth.sehhaty.subtitle",
      descKey: "home.eHealth.sehhaty.desc",
      hasApp: true,
      appStoreUrl: "https://apps.apple.com/sa/app/%D8%B5%D8%AD%D8%AA%D9%8A-sehhaty/id1459266578",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.lean.sehhaty"
    },
    {
      src: anatLogo,
      titleKey: "home.eHealth.anat",
      subtitleKey: "home.eHealth.anat.subtitle",
      descKey: "home.eHealth.anat.desc",
      hasApp: true,
      websiteUrl: "https://anat.sa/",
      appStoreUrl: "https://apps.apple.com/sa/app/anat-%D8%A3%D9%86%D8%A7%D8%A9/id1472911277",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.lean.practitioner&hl=en_US&gl=US"
    },
    {
      src: sehhatyLogo,
      titleKey: "home.eHealth.healthRecord",
      subtitleKey: "home.eHealth.healthRecord.subtitle",
      descKey: "home.eHealth.healthRecord.desc",
      hasApp: true,
      websiteUrl: "https://www.moh.gov.sa/eServices/cards/Pages/health-record-know-your-numbers.aspx",
      appStoreUrl: "https://apps.apple.com/sa/app/%D8%B5%D8%AD%D8%AA%D9%8A-sehhaty/id1459266578",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.lean.sehhaty"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden" style={{ backgroundColor: '#005d47', minHeight: '40vh' }}>
          <video
            src="https://cmsapi.health.sa/HHC1-7tba9j.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
          <div className="absolute inset-0 najran-geometric-bg opacity-20 pointer-events-none"></div>

          <div className="container-custom relative z-10">
            <motion.div
              className="text-center mb-4"
            >
              <h1 className={`text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {t("home.eHealth")}
              </h1>
              <p className={`text-white/80 text-lg ${fontClass} max-w-2xl mx-auto`}>
                {language === 'ar'
                  ? 'منصات رقمية متكاملة لخدمات صحية أفضل'
                  : 'Integrated digital platforms for better healthcare services'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {platforms.map((platform, idx) => (
                <motion.div
                  key={platform.titleKey}
                  className="group bg-white rounded-[40px] border border-gray-100 shadow-sm p-10 transition-all duration-[400ms] hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(43,170,226,0.2)] hover:border-[#2BAAE2] flex flex-col items-center text-center"
                  data-testid={`eservice-card-${idx}`}
                >
                  <div
                    className="w-20 h-20 bg-[#2BAAE2]/10 border border-[#2BAAE2]/20 rounded-3xl flex items-center justify-center mb-6 flex-shrink-0 transition-all duration-[400ms] group-hover:bg-[#2BAAE2] group-hover:-rotate-[5deg] group-hover:scale-110"
                  >
                    <img
                      src={platform.src}
                      alt={t(platform.titleKey)}
                      className="w-12 h-12 object-contain brightness-0 transition-all duration-[400ms] group-hover:invert"
                    />
                  </div>
                  <h4 className={`text-xl font-extrabold text-gray-900 ${fontClass} mb-3`}>
                    {t(platform.titleKey)}
                  </h4>
                  <p className={`text-gray-600 ${fontClass} text-sm leading-relaxed mb-6 flex-1`}>
                    {t(platform.descKey)}
                  </p>
                  <div className="flex flex-col gap-2 mt-auto w-full">
                    <div className="w-full h-[42px]">
                      {platform.websiteUrl && (
                        <a
                          href={platform.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full bg-[#2BAAE2] text-white rounded-full px-6 font-bold flex items-center justify-center gap-2 hover:bg-[#1A9FD8] transition-colors"
                          data-testid={`link-website-${idx}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{language === 'ar' ? 'زيارة الموقع' : 'Visit Website'}</span>
                        </a>
                      )}
                    </div>
                    <div className="w-full h-[34px]">
                      {platform.hasApp && (
                        <div className="flex items-center gap-2 w-full h-full">
                          <a
                            href={platform.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-full flex items-center justify-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-600 rounded-full px-3 text-xs font-medium hover:bg-[#2BAAE2] hover:text-white hover:border-[#2BAAE2] transition-colors"
                            data-testid={`link-appstore-${idx}`}
                          >
                            <SiApple className="w-3.5 h-3.5" />
                            <span>App Store</span>
                          </a>
                          <a
                            href={platform.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-full flex items-center justify-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-600 rounded-full px-3 text-xs font-medium hover:bg-[#2BAAE2] hover:text-white hover:border-[#2BAAE2] transition-colors"
                            data-testid={`link-playstore-${idx}`}
                          >
                            <SiGoogleplay className="w-3.5 h-3.5" />
                            <span>Google Play</span>
                          </a>
                        </div>
                      )}
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
