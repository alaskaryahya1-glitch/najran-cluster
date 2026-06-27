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
import heroImage from "@assets/E1CAF13F-A529-4321-90B2-EDEA91B5D2D9_1767273959627.png";


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
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 w-full h-full -z-10">
        <img
          src={heroImage}
          alt=""
          data-nosnippet="true"
          className="w-full h-full object-cover dark-bg-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
      </div>

      <Header />

      <main className="flex-1">
        <section className="relative pt-24 pb-16 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/25 dark:bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
          
          <div className="container-custom relative">
            <motion.div
              
              
              className="text-center mb-12"
            >
              <h1 className={`text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {t("home.eHealth")}
              </h1>
              <p className={`text-white text-lg ${fontClass} max-w-2xl mx-auto`}>
                {language === 'ar' 
                  ? 'منصات رقمية متكاملة لخدمات صحية أفضل' 
                  : 'Integrated digital platforms for better healthcare services'}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {platforms.map((platform, idx) => (
                <motion.div
                  key={platform.titleKey}
                  className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-2 hover:border-[#004d3a] hover:shadow-xl transition-all relative text-center"
                  data-testid={`eservice-card-${idx}`}
                >
                  <div className="h-1.5 bg-[#004d3a]" style={{ borderRadius: '40px 40px 0 0' }}></div>
                  <div className="p-8">
                    <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center bg-[#004d3a]/10 rounded-2xl p-3">
                      <img
                        src={platform.src}
                        alt={t(platform.titleKey)}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h4 className={`text-xl font-extrabold text-[#004d3a] ${fontClass} mb-3`}>
                      {t(platform.titleKey)}
                    </h4>
                    <p className={`text-gray-500 ${fontClass} text-sm leading-relaxed mb-6`}>
                      {t(platform.descKey)}
                    </p>
                    <div className="flex flex-col items-center gap-3">
                      {platform.websiteUrl && (
                        <a
                          href={platform.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#004d3a] text-white rounded-full px-8 py-3 font-bold flex items-center gap-2 hover:bg-[#003d2e] transition-colors"
                          data-testid={`link-website-${idx}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{language === 'ar' ? 'زيارة الموقع' : 'Visit Website'}</span>
                        </a>
                      )}
                      {platform.hasApp && (
                        <div className="flex items-center gap-3">
                          <a
                            href={platform.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-100 text-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-[#004d3a] hover:text-white transition-colors"
                            data-testid={`link-appstore-${idx}`}
                          >
                            <SiApple className="w-4 h-4" />
                            <span>App Store</span>
                          </a>
                          <a
                            href={platform.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-gray-100 text-gray-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-[#004d3a] hover:text-white transition-colors"
                            data-testid={`link-playstore-${idx}`}
                          >
                            <SiGoogleplay className="w-4 h-4" />
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
