import { MapPin, Phone, ExternalLink } from "lucide-react";
import { SiX, SiLinkedin, SiYoutube, SiInstagram, SiSnapchat, SiTiktok } from "react-icons/si";
import { useI18n } from "@/lib/i18n";
import clusterLogo from "@assets/cluster-logo-colored.png";
import nupcoLogo from "@assets/IMG_8790_1767048634247.png";
import exproLogo from "@assets/IMG_8793_1767048634247.png";
import nafisLogo from "@assets/nphies_logo.9ce3f8cc7a760666c970_1767220354051.png";
import insuranceCenterLogo from "@assets/IMG_8795_1767048634247.png";
import visionOfficeLogo from "@assets/4_1767222559258.webp";
import dhamanLogo from "@assets/IMG_8797_1767048634247.png";
import healthHoldingLogo from "@assets/logo-124b0a0_1767082390314.png";
import nhicLogo from "@assets/IMG_8798_1767048800725.png";
import healthTransformLogo from "@assets/logo_1767222621475.png";

const partnerLogos = [
  { src: healthHoldingLogo, alt: 'Health Holding', href: 'https://www.health.sa/ar' },
  { src: nupcoLogo, alt: 'NUPCO', href: 'https://nupco.com/' },
  { src: exproLogo, alt: 'Expro', href: 'https://expro.gov.sa/' },
  { src: nafisLogo, alt: 'Nafis', href: 'https://nphies.sa/' },
  { src: insuranceCenterLogo, alt: 'Insurance Center', href: 'https://www.cnhi.gov.sa/ar/Pages/Home.aspx' },
  { src: visionOfficeLogo, alt: 'Vision Office', href: 'https://www.vision2030.gov.sa/ar/' },
  { src: dhamanLogo, alt: 'Dhaman', href: 'https://www.chi.gov.sa/pages/Home.aspx' },
  { src: nhicLogo, alt: 'NHIC', href: 'https://nhic.gov.sa/' },
  { src: healthTransformLogo, alt: 'Health Transform', href: 'https://www.vision2030.gov.sa/ar/explore/programs/health-sector-transformation-program' },
];

export function Footer() {
  const { t, language } = useI18n();
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';

  const socialLinks = [
    { icon: SiX, href: "https://x.com/Najrancluster", label: "X" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/company/najran-cluster/", label: "LinkedIn" },
    { icon: SiYoutube, href: "https://youtube.com/@Najrancluster", label: "YouTube" },
    { icon: SiInstagram, href: "https://instagram.com/Nj.cluster", label: "Instagram" },
    { icon: SiSnapchat, href: "https://snapchat.com/add/Nj.cluster", label: "Snapchat" },
    { icon: SiTiktok, href: "https://tiktok.com/@Nj.cluster", label: "TikTok" },
  ];

  const quickLinks = [
    { label: t("footer.about"), href: "/about" },
    { label: t("footer.news"), href: "/news" },
    { label: t("nav.employeeServices"), href: "/employee-services" },
    { label: t("nav.eServices"), href: "/e-services" },
    { label: t("nav.transformation"), href: "/transformation" },
  ];

  const otherLinks = [
    { label: t("nav.careModel"), href: "/care-model" },
    { label: language === 'ar' ? 'البوابة الرئيسية' : 'Main Portal', href: "https://njhc.moh.gov.sa", external: true },
    { label: language === 'ar' ? 'مستشفى الولادة' : 'Maternity Hospital', href: "https://mch.nhc.moh.gov.sa/services", external: true },
    { label: language === 'ar' ? 'رحلة البوابات' : 'Gates Journey', href: "https://nhcgate3.info/", external: true },
  ];

  return (
    <div className="bg-[#f7f8f9] dark:bg-[#000e22] relative z-10">
    <footer className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
      {/* Geometric pattern */}
      <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
      {/* Moving pattern video */}
      <video autoPlay loop muted playsInline aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
        <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
      </video>

      {/* Partners Logos Row */}
      <div className="border-b border-gray-200 dark:border-gray-800 relative z-10">
        <div className="container-custom py-5">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 sm:flex-nowrap sm:justify-between">
            {partnerLogos.map((logo) => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 sm:h-10 flex items-center justify-center flex-shrink-0 opacity-40 hover:opacity-80 transition-opacity"
                data-testid={`link-partner-${logo.alt.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 sm:h-9 w-auto object-contain filter brightness-0 dark:brightness-0 dark:invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="inline-flex flex-col items-center mb-6">
              <img
                src={clusterLogo}
                alt={t("header.clusterName")}
                className="h-16 sm:h-20 w-auto object-contain mb-1"
              />
              <p className={`text-[#2BAAE2] dark:text-white text-[10px] ${fontClass} translate-x-1 sm:-translate-x-2`} style={{ marginTop: '-16px' }}>
                {language === 'ar' ? 'شركة الصحة القابضة' : 'Health Holding Co.'}
              </p>
            </div>

            <p className={`text-gray-600 dark:text-white text-sm leading-relaxed mb-6 ${fontClass}`}>
              {language === 'ar'
                ? 'يقدم تجمع نجران الصحي خدمات الرعاية الصحية لأكثر من 495 ألف مستفيد في منطقة نجران.'
                : 'Najran Health Cluster provides healthcare services to over 495,000 beneficiaries in the Najran region.'}
            </p>

            {/* Social Icons */}
            <div>
              <p className={`text-gray-700 dark:text-white text-sm font-semibold mb-3 ${fontClass}`}>{t("footer.followUs")}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-[#2BAAE2]/10 dark:bg-[#2BAAE2]/20 hover:bg-[#2BAAE2] border border-[#2BAAE2]/20 rounded-full flex items-center justify-center transition-all duration-200 group"
                    title={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-4 h-4 text-[#2BAAE2] group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className={`text-[#2BAAE2] font-bold text-lg mb-6 border-r-4 border-[#2BAAE2]/30 pr-4 ${fontClass}`}>
              {t("footer.quickLinks")}
            </h4>
            <ul className={`space-y-2.5 ${fontClass}`}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-link text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-[#2BAAE2] transition-all text-sm block mb-3"
                    data-testid={`link-footer-${link.href.replace('/', '')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div className="col-span-1">
            <h4 className={`text-[#2BAAE2] font-bold text-lg mb-6 border-r-4 border-[#2BAAE2]/30 pr-4 ${fontClass}`}>
              {language === 'ar' ? 'روابط أخرى' : 'Other Links'}
            </h4>
            <ul className={`space-y-2.5 ${fontClass}`}>
              {otherLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="footer-link text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-[#2BAAE2] transition-all text-sm block mb-3"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className={`text-[#2BAAE2] font-bold text-lg mb-6 border-r-4 border-[#2BAAE2]/30 pr-4 ${fontClass}`}>
              {t("footer.contactUs")}
            </h4>
            <div className={`space-y-4 ${fontClass}`}>
              <a
                href="https://www.google.com/maps/place/Branch+of+the+Ministry+of+Health,+Najran+Region/@17.5484375,44.2350625,1083m/data=!3m2!1e3!4b1!4m6!3m5!1s0x15fec332340cba09:0x3bddf8648aa63f9c!8m2!3d17.5484375!4d44.2350625!16s%2Fg%2F11f61pg7j4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-[#2BAAE2] transition-colors group"
                data-testid="link-map-location"
              >
                <div className="w-8 h-8 bg-[#2BAAE2]/10 dark:bg-[#2BAAE2]/20 border border-[#2BAAE2]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#2BAAE2]/20 transition-colors">
                  <MapPin className="w-4 h-4 text-[#2BAAE2]" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-white text-sm font-medium">{t("footer.region")}</p>
                  <p className="text-gray-400 dark:text-white/70 text-xs mt-0.5">{t("footer.country")}</p>
                </div>
              </a>

              <a
                href="tel:920011140"
                className="flex items-center gap-3 text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-[#2BAAE2] transition-colors group"
                data-testid="link-phone-footer"
              >
                <div className="w-8 h-8 bg-[#2BAAE2]/10 dark:bg-[#2BAAE2]/20 border border-[#2BAAE2]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2BAAE2]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#2BAAE2]" />
                </div>
                <span className="font-sans text-sm text-gray-700 dark:text-white" dir="ltr">920011140</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 dark:bg-[#000e22] relative z-10">
        <div className="container-custom py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-center">
          <p className={`text-xs text-gray-400 dark:text-white/70 ${fontClass}`}>
            © {new Date().getFullYear()} {t("header.clusterName")}. {t("footer.rights")}.
          </p>
          <span className="font-sans text-xs text-gray-400 dark:text-white/70" dir="ltr">Made by : Yahya Alhareth</span>
          <div className={`flex items-center gap-4 text-xs ${fontClass} text-gray-400 dark:text-white/70`}>
            <a href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors" data-testid="link-privacy">{t("footer.privacy")}</a>
            <span className="text-gray-300 dark:text-white/40">|</span>
            <a href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors" data-testid="link-terms">{t("footer.terms")}</a>
            <span className="text-gray-300 dark:text-white/40">|</span>
            <a href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors" data-testid="link-accessibility">{t("footer.accessibility")}</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
