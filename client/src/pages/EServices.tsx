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

import { CardStar } from "@/components/BrandIcon";


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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {platforms.map((platform, idx) => (
                <motion.div
                  key={platform.titleKey}
                  
                  
                  
                  className="bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 text-center hover:bg-white/15 transition-all relative"
                  data-testid={`eservice-card-${idx}`}
                >
                  <CardStar size="md" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-6 relative z-10">
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-white/20 rounded-xl p-3">
                    <img 
                      src={platform.src} 
                      alt={t(platform.titleKey)}
                      className="max-w-full max-h-full object-contain brightness-0 invert"
                    />
                  </div>
                  <h4 className={`text-xl font-bold text-white ${fontClass} mb-2`}>
                    {t(platform.titleKey)}
                  </h4>
                  <p className={`text-white/90 ${fontClass} text-sm mb-4`}>
                    {t(platform.descKey)}
                  </p>
                  <div className="flex justify-center items-center gap-4 mt-4">
                    {platform.websiteUrl && (
                      <a 
                        href={platform.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                        data-testid={`link-website-${idx}`}
                      >
                        <ExternalLink className="w-5 h-5 text-[#2BAAE2]" />
                      </a>
                    )}
                    {platform.hasApp && (
                      <>
                        <a 
                          href={platform.appStoreUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                          data-testid={`link-appstore-${idx}`}
                        >
                          <SiApple className="w-5 h-5 text-[#2BAAE2]" />
                        </a>
                        <a 
                          href={platform.playStoreUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                          data-testid={`link-playstore-${idx}`}
                        >
                          <SiGoogleplay className="w-5 h-5 text-[#2BAAE2]" />
                        </a>
                      </>
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
