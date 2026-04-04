import { Heart, MapPin, ExternalLink } from "lucide-react";
import { SiX, SiLinkedin, SiYoutube, SiInstagram, SiSnapchat, SiTiktok } from "react-icons/si";
import { useI18n } from "@/lib/i18n";
import whiteLogo from "@assets/logo2_1767055332336.png";
import nupcoLogo from "@assets/IMG_8790_1767048634247.png";
import exproLogo from "@assets/IMG_8793_1767048634247.png";
import nafisLogo from "@assets/nphies_logo.9ce3f8cc7a760666c970_1767220354051.png";
import insuranceCenterLogo from "@assets/IMG_8795_1767048634247.png";
import visionOfficeLogo from "@assets/4_1767222559258.webp";
import dhamanLogo from "@assets/IMG_8797_1767048634247.png";
import healthHoldingLogo from "@assets/logo-124b0a0_1767082390314.png";
import nhicLogo from "@assets/IMG_8798_1767048800725.png";
import healthTransformLogo from "@assets/logo_1767222621475.png";

export function Footer() {
  const { t, language } = useI18n();
  
  const socialLinks = [
    { icon: SiX, href: "https://x.com/Najrancluster", label: "X", username: "Najrancluster" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/company/najran-cluster/", label: "LinkedIn", username: "najran-cluster" },
    { icon: SiYoutube, href: "https://youtube.com/@Najrancluster", label: "YouTube", username: "Najrancluster" },
    { icon: SiInstagram, href: "https://instagram.com/Nj.cluster", label: "Instagram", username: "Nj.cluster" },
    { icon: SiSnapchat, href: "https://snapchat.com/add/Nj.cluster", label: "Snapchat", username: "Nj.cluster" },
    { icon: SiTiktok, href: "https://tiktok.com/@Nj.cluster", label: "TikTok", username: "Nj.cluster" },
  ];

  return (
    <footer className="text-slate-300 relative overflow-hidden">
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      {/* Najran Geometric Background Pattern */}
      <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>
      
      {/* Partners Logos Row - Full Width */}
      <div className="relative py-4 sm:py-6 border-b border-white/20">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-3 sm:px-8 sm:flex-nowrap sm:justify-between">
          {[
            { src: healthHoldingLogo, alt: 'Health Holding', href: 'https://www.health.sa/ar' },
            { src: nupcoLogo, alt: 'NUPCO', href: 'https://nupco.com/' },
            { src: exproLogo, alt: 'Expro', href: 'https://expro.gov.sa/' },
            { src: nafisLogo, alt: 'Nafis', href: 'https://nphies.sa/' },
            { src: insuranceCenterLogo, alt: 'Insurance Center', href: 'https://www.cnhi.gov.sa/ar/Pages/Home.aspx' },
            { src: visionOfficeLogo, alt: 'Vision Office', href: 'https://www.vision2030.gov.sa/ar/' },
            { src: dhamanLogo, alt: 'Dhaman', href: 'https://www.chi.gov.sa/pages/Home.aspx' },
            { src: nhicLogo, alt: 'NHIC', href: 'https://nhic.gov.sa/' },
            { src: healthTransformLogo, alt: 'Health Transform', href: 'https://www.vision2030.gov.sa/ar/explore/programs/health-sector-transformation-program' },
          ].map((logo) => (
            <a
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 sm:h-12 flex items-center justify-center flex-shrink-0"
              data-testid={`link-partner-${logo.alt.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="h-6 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="container-custom relative">
        <div className="py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
          <div className="md:col-span-5 md:order-1 -mt-4 text-center md:text-start">
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col items-center md:items-start pt-4">
                <div className="relative">
                  <img 
                    src={whiteLogo} 
                    alt={t("header.clusterName")}
                    className="h-[60px] sm:h-[80px] w-auto object-contain"
                  />
                  <p className={`text-blue-200/80 text-[8px] sm:text-xs ${language === 'ar' ? 'font-arabic' : 'font-sans'} tracking-wide absolute -bottom-0.5 left-[3.2rem] sm:left-[4.5rem]`}>
                    {language === 'ar' ? 'شركة الصحة القابضة' : 'Health Holding Co'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className={`text-white ${language === 'ar' ? 'font-arabic' : 'font-sans'} font-semibold text-sm mb-3`}>
                {t("footer.followUs")}
              </h5>
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                    title={`${social.label}: @${social.username}`}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-5 h-5 text-[#2FAAE0]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm text-blue-200/50">
              <Heart className="w-4 h-4 text-rose-400 brand-icon" />
              <span className={language === 'ar' ? 'font-arabic' : 'font-sans'}>{t("home.priority")}</span>
            </div>
          </div>
          
          <div className="md:col-span-3 md:order-2 text-center md:text-start">
            <h4 className={`text-white ${language === 'ar' ? 'font-arabic' : 'font-sans'} font-bold text-base sm:text-lg mb-4 sm:mb-6 flex items-center justify-center md:justify-start gap-2`}>
              <div className="w-8 h-1 bg-blue-400 rounded-full"></div>
              {t("footer.quickLinks")}
            </h4>
            <ul className={`space-y-2 sm:space-y-3 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
              <li>
                <a href="/about" className="flex items-center justify-center md:justify-start gap-2 text-white hover:text-blue-200 transition-colors group" data-testid="link-about-footer">
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity brand-icon" />
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="/news" className="flex items-center justify-center md:justify-start gap-2 text-white hover:text-blue-200 transition-colors group" data-testid="link-news-footer">
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity brand-icon" />
                  {t("footer.news")}
                </a>
              </li>
              <li>
                <a href="/employee-services" className="flex items-center justify-center md:justify-start gap-2 text-white hover:text-blue-200 transition-colors group" data-testid="link-employee-services-footer">
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity brand-icon" />
                  {t("nav.employeeServices")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 md:order-3 flex flex-col items-center md:items-end text-center md:text-start">
            <h4 className={`text-white ${language === 'ar' ? 'font-arabic' : 'font-sans'} font-bold text-base sm:text-lg mb-4 flex items-center gap-2 ml-4 sm:ml-0 md:ml-16`}>
              <div className="w-8 h-1 bg-blue-400 rounded-full"></div>
              {t("footer.contactUs")}
            </h4>
            <a 
              href="https://www.google.com/maps/place/Branch+of+the+Ministry+of+Health,+Najran+Region/@17.5484375,44.2350625,1083m/data=!3m2!1e3!4b1!4m6!3m5!1s0x15fec332340cba09:0x3bddf8648aa63f9c!8m2!3d17.5484375!4d44.2350625!16s%2Fg%2F11f61pg7j4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors flex items-center md:items-start gap-3 mr-12 sm:mr-0 md:mr-4"
              data-testid="link-map-location"
            >
              <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                <MapPin className="w-5 h-5 text-[#2FAAE0] brand-icon" />
              </div>
              <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <p className={`${language === 'ar' ? 'font-arabic' : 'font-sans'} text-white`}>
                  {t("footer.region")}
                </p>
                <p className={`${language === 'ar' ? 'font-arabic' : 'font-sans'} text-white/80 text-sm`}>
                  {t("footer.country")}
                </p>
              </div>
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/20 py-4 sm:py-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center">
          <p className={`${language === 'ar' ? 'font-arabic' : 'font-sans'} text-xs sm:text-sm text-white`}>
            © {new Date().getFullYear()} {t("header.clusterName")}. {t("footer.rights")}.
          </p>
          <span className="font-sans text-xs sm:text-sm text-white/80" dir="ltr">Made by : Yahya Alhareth</span>
          <div className={`flex items-center gap-3 sm:gap-6 text-[10px] sm:text-xs ${language === 'ar' ? 'font-arabic' : 'font-sans'} text-white`}>
            <a href="#" className="hover:text-blue-200 transition-colors" data-testid="link-privacy">{t("footer.privacy")}</a>
            <span className="text-white/50">|</span>
            <a href="#" className="hover:text-blue-200 transition-colors" data-testid="link-terms">{t("footer.terms")}</a>
            <span className="text-white/50">|</span>
            <a href="#" className="hover:text-blue-200 transition-colors" data-testid="link-accessibility">{t("footer.accessibility")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
