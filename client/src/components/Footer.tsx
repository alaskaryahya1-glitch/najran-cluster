import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiX, SiLinkedin, SiYoutube, SiInstagram, SiSnapchat, SiTiktok } from "react-icons/si";
import { useI18n } from "@/lib/i18n";
import whiteLogo from "@assets/logo4_1767233326721.PNG";
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
  const [email, setEmail] = useState('');

  const socialLinks = [
    { icon: SiX, href: "https://x.com/Najrancluster", label: "X" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/company/najran-cluster/", label: "LinkedIn" },
    { icon: SiYoutube, href: "https://youtube.com/@Najrancluster", label: "YouTube" },
    { icon: SiInstagram, href: "https://instagram.com/Nj.cluster", label: "Instagram" },
    { icon: SiSnapchat, href: "https://snapchat.com/add/Nj.cluster", label: "Snapchat" },
    { icon: SiTiktok, href: "https://tiktok.com/@Nj.cluster", label: "TikTok" },
  ];

  const quickLinks = [
    { label: language === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { label: t("footer.about"), href: '/about' },
    { label: language === 'ar' ? 'المركز الإعلامي' : 'Media Center', href: '/news' },
    { label: t("nav.eServices"), href: '/e-services' },
    { label: t("nav.transformation"), href: '/transformation' },
    { label: t("nav.careModel"), href: '/care-model' },
  ];

  return (
    <footer className="text-slate-300 relative bg-[#0a1916]">

      {/* Partners Logos Row */}
      <div className="border-b border-white/10">
        <div className="container-custom py-5">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 sm:flex-nowrap sm:justify-between">
            {partnerLogos.map((logo) => (
              <a
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 sm:h-10 flex items-center justify-center flex-shrink-0 opacity-50 hover:opacity-90 transition-opacity"
                data-testid={`link-partner-${logo.alt.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 sm:h-9 w-auto object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 lg:grid-cols-4">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-14 w-14 rounded-full bg-white p-1 flex-shrink-0">
                <img src={whiteLogo} alt={t("header.clusterName")} className="h-full w-full object-contain" />
              </div>
              <span className={`text-lg font-bold text-white leading-snug ${fontClass}`}>
                {language === 'ar' ? 'تجمع نجران الصحي' : 'Najran Health Cluster'}
              </span>
            </div>
            <p className={`text-sm leading-relaxed text-gray-400 mb-6 ${fontClass}`}>
              {language === 'ar'
                ? 'نسعى لتقديم خدمات صحية متكاملة ومستدامة لسكان منطقة نجران، وفقاً لأعلى معايير الجودة العالمية ورؤية المملكة 2030.'
                : 'Delivering integrated and sustainable healthcare services for Najran residents, aligned with Vision 2030.'}
            </p>
            <div>
              <p className={`text-white text-sm font-semibold mb-3 ${fontClass}`}>{t("footer.followUs")}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/5 hover:bg-[#005d47] border border-white/10 hover:border-[#005d47] rounded-lg flex items-center justify-center transition-all duration-200"
                    title={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-4 h-4 text-slate-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className={`mb-6 text-lg font-bold text-white flex items-center gap-2 ${fontClass}`}>
              <span className="w-5 h-0.5 bg-[#005d47] inline-block rounded-full"></span>
              {t("footer.quickLinks")}
            </h4>
            <ul className={`space-y-4 text-sm text-gray-400 ${fontClass}`}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 hover:text-[#005d47] transition-colors group"
                    data-testid={`link-footer-${link.href.replace('/', '') || 'home'}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#005d47]/40 group-hover:bg-[#005d47] transition-colors flex-shrink-0"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className={`mb-6 text-lg font-bold text-white flex items-center gap-2 ${fontClass}`}>
              <span className="w-5 h-0.5 bg-[#005d47] inline-block rounded-full"></span>
              {t("footer.contactUs")}
            </h4>
            <ul className={`space-y-4 text-sm text-gray-400 ${fontClass}`}>
              <li>
                <a
                  href="https://www.google.com/maps/place/Branch+of+the+Ministry+of+Health,+Najran+Region/@17.5484375,44.2350625,1083m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-[#005d47] transition-colors group"
                  data-testid="link-map-location"
                >
                  <MapPin className="h-5 w-5 text-[#005d47] flex-shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'منطقة نجران، المملكة العربية السعودية' : 'Najran Region, Saudi Arabia'}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:937"
                  className="flex items-center gap-3 hover:text-[#005d47] transition-colors"
                  data-testid="link-phone-937"
                >
                  <Phone className="h-5 w-5 text-[#005d47] flex-shrink-0" />
                  <span dir="ltr">937 {language === 'ar' ? '(مركز الاتصال)' : '(Call Center)'}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:920011140"
                  className="flex items-center gap-3 hover:text-[#005d47] transition-colors"
                  data-testid="link-phone-footer"
                >
                  <Phone className="h-5 w-5 text-[#005d47] flex-shrink-0" />
                  <span dir="ltr">920011140</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@najrancluster.com"
                  className="flex items-center gap-3 hover:text-[#005d47] transition-colors"
                  data-testid="link-email-footer"
                >
                  <Mail className="h-5 w-5 text-[#005d47] flex-shrink-0" />
                  <span dir="ltr">info@najrancluster.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className={`mb-6 text-lg font-bold text-white flex items-center gap-2 ${fontClass}`}>
              <span className="w-5 h-0.5 bg-[#005d47] inline-block rounded-full"></span>
              {language === 'ar' ? 'اشترك في النشرة البريدية' : 'Subscribe to Newsletter'}
            </h4>
            <p className={`text-sm text-gray-400 mb-4 ${fontClass}`}>
              {language === 'ar'
                ? 'احصل على آخر أخبار ومستجدات التجمع مباشرة في بريدك.'
                : 'Get the latest cluster news delivered to your inbox.'}
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                className={`rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#005d47] focus:outline-none transition-colors ${fontClass}`}
              />
              <button
                className={`rounded-lg bg-[#005d47] py-2.5 text-sm font-bold text-white transition hover:bg-[#003b2d] ${fontClass}`}
                onClick={() => setEmail('')}
              >
                {language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className={`text-xs text-gray-500 ${fontClass}`}>
            © {new Date().getFullYear()} {language === 'ar' ? 'تجمع نجران الصحي' : 'Najran Health Cluster'}. {t("footer.rights")}.
          </p>
          <span className="font-sans text-xs text-gray-600" dir="ltr">Made by : Yahya Alhareth</span>
          <div className={`flex items-center gap-4 text-xs text-gray-500 ${fontClass}`}>
            <a href="#" className="hover:text-[#005d47] transition-colors" data-testid="link-privacy">{t("footer.privacy")}</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-[#005d47] transition-colors" data-testid="link-terms">{t("footer.terms")}</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-[#005d47] transition-colors" data-testid="link-accessibility">{t("footer.accessibility")}</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
