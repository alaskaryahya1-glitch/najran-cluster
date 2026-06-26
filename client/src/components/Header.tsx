import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight, Search, Globe, Home, Building2, Users, Newspaper, Phone, RefreshCw, Heart, ExternalLink, Moon, Sun } from "lucide-react";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Link, useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme-provider";
import { SiX } from "react-icons/si";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { prefetchPage } from "@/hooks/use-prefetch";
import whiteLogo from "@assets/logo4_1767233326721.PNG";

const NavItem = memo(({ href, icon: Icon, children, active, onClick }: any) => {
  useEffect(() => {
    prefetchPage(href);
  }, [href]);

  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          active
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted text-foreground"
        }`}
      >
        <Icon className="w-4 h-4" />
        <span>{children}</span>
      </a>
    </Link>
  );
});

NavItem.displayName = "NavItem";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const searchableItems = [
    { title: t("nav.home"), titleAr: "الرئيسية", titleEn: "Home", href: "/" },
    { title: t("nav.about"), titleAr: "عن التجمع", titleEn: "About", href: "/about" },
    { title: t("nav.employeeServices"), titleAr: "خدمات الموظفين", titleEn: "Employee Services", href: "/employee-services" },
    { title: t("nav.eServices"), titleAr: "الخدمات الإلكترونية", titleEn: "E-Services", href: "/#electronic-health" },
    { title: t("nav.news"), titleAr: "الأخبار", titleEn: "News", href: "/news" },
    { title: t("nav.contact"), titleAr: "تواصل معنا", titleEn: "Contact", href: "#contact" },
    { title: language === "ar" ? "المستشفيات" : "Hospitals", titleAr: "المستشفيات", titleEn: "Hospitals", href: "/#hospitals" },
    { title: language === "ar" ? "مراكز الرعاية الصحية" : "Health Centers", titleAr: "مراكز الرعاية الصحية", titleEn: "Health Centers", href: "/#health-centers" },
    { title: language === "ar" ? "أنظمة الرعاية" : "Care Systems", titleAr: "أنظمة الرعاية", titleEn: "Care Systems", href: "/#care-systems" },
    { title: language === "ar" ? "رحلة التحول" : "Transformation Journey", titleAr: "رحلة التحول", titleEn: "Transformation Journey", href: "/transformation" },
    { title: language === "ar" ? "نموذج الرعاية الصحية السعودي" : "Saudi Healthcare Model", titleAr: "نموذج الرعاية الصحية السعودي", titleEn: "Saudi Healthcare Model", href: "/care-model" },
  ];

  const filteredResults = searchQuery.length > 0
    ? searchableItems.filter(item =>
        item.titleAr.includes(searchQuery) ||
        item.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchResultClick = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetPath = path || '/';
      if (window.location.pathname === targetPath || targetPath === '/') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setLocation(targetPath);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      setLocation(href);
    }
  };

  const desktopNavItems = [
    { label: t("nav.home"), href: "/", external: false },
    { label: t("nav.about"), href: "/about", external: false },
    { label: t("nav.employeeServices"), href: "/employee-services", external: false },
    { label: t("nav.eServices"), href: "/e-services", external: false },
    { label: t("nav.news"), href: "/news", external: false },
    { label: t("nav.contact"), href: "#contact", external: false },
  ];

  const sidebarNavItems = [
    { label: t("nav.home"), href: "/", icon: Home },
    { label: t("nav.about"), href: "/about", icon: Building2 },
    { label: t("nav.transformation"), href: "/transformation", icon: RefreshCw },
    { label: t("nav.gatesJourney"), href: "https://nhcgate3.info/", icon: ExternalLink, external: true },
    { label: t("nav.careModel"), href: "/care-model", icon: Heart },
    { label: t("nav.employeeServices"), href: "/employee-services", icon: Users },
    { label: t("nav.eServices"), href: "/e-services", icon: Globe },
    { label: t("nav.MaternityHospital"), href: "https://mch.nhc.moh.gov.sa/services", icon: ExternalLink, external: true },
    { label: t("nav.news"), href: "/news", icon: Newspaper },
    { label: t("nav.contact"), href: "#contact", icon: Phone, isContactDialog: true },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const ChevronIcon = language === "ar" ? ChevronLeft : ChevronRight;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetPath = path || '/';
      if (window.location.pathname === targetPath || targetPath === '/') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (targetPath !== window.location.pathname) {
          setLocation(targetPath);
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        setLocation(targetPath);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      setLocation(href);
    }
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${scrolled ? 'bg-[#1B3784]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      {/* Top accent bar */}
      <div className={`h-1 bg-gradient-to-l from-[#2BAAE2] via-[#1B4784] to-[#2BAAE2] transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="container-custom">
        <div className="flex items-center justify-between h-[58px] lg:h-[66px] text-white gap-4">

          {/* Hamburger - RIGHT side (RTL start) */}
          <div className={`flex items-center transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 bg-[#2BAAE2] hover:bg-[#1691D0] rounded-lg transition-colors"
                  data-testid="button-menu-open"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#000e22]/95 backdrop-blur-xl border-l border-white/10 w-80 z-[12000]">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-white text-xl font-bold">
                    <img
                      src={whiteLogo}
                      alt={language === 'ar' ? 'تجمع نجران الصحي' : 'Najran Health Cluster'}
                      className="h-12 w-auto object-contain"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1.5">
                  {sidebarNavItems.map((item, index) => {
                    const Icon = item.icon;
                    const isExternal = 'external' in item && item.external;
                    const isContactDialog = 'isContactDialog' in item && item.isContactDialog;

                    if (isContactDialog) {
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            setIsPhoneDialogOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}
                          data-testid={`link-sidebar-nav-${index}`}
                        >
                          <Icon className="w-5 h-5 text-[#2BAAE2] flex-shrink-0" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </button>
                      );
                    }

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        onMouseEnter={() => !item.href.includes('#') && !isExternal && prefetchPage(item.href)}
                        onClick={(e) => {
                          if (!isExternal) {
                            handleNavClick(e, item.href);
                          }
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}
                        data-testid={`link-sidebar-nav-${index}`}
                      >
                        {Icon && <Icon className="w-5 h-5 text-[#2BAAE2] flex-shrink-0" />}
                        <span className="font-medium text-sm">{item.label}</span>
                      </a>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <a
                    href="https://njhc.moh.gov.sa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 bg-[#2BAAE2] hover:bg-[#1691D0] text-white px-5 py-3 rounded-xl ${language === 'ar' ? 'font-arabic' : 'font-sans'} font-bold transition-colors`}
                    data-testid="link-main-portal-sidebar"
                  >
                    {t("nav.mainPortal")}
                    <ChevronIcon className="w-4 h-4" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Nav Links - CENTER — hidden until scrolled */}
          <nav className={`hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
            {desktopNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={item.external ? undefined : (e) => handleNavClick(e, item.href)}
                onMouseEnter={() => !item.external && !item.href.includes('#') && prefetchPage(item.href)}
                className={`px-2 xl:px-3 py-2 text-[13px] xl:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap
                  ${isActive(item.href) && !item.href.includes('#') && !item.external
                    ? 'text-[#2BAAE2] bg-white/10'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search + Dark mode + Language - LEFT side (RTL end) — hidden until scrolled */}
          <div className={`flex items-center gap-2 transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              data-testid="button-search"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              data-testid="button-theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/20"
              data-testid="button-language-toggle"
            >
              {language === "ar" ? "EN" : "ع"}
            </button>
          </div>

        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl bg-white dark:bg-card rounded-xl shadow-2xl z-[10001] overflow-hidden"
            >
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === "ar" ? "ابحث في الموقع..." : "Search the site..."}
                    className={`w-full pr-10 pl-4 py-3 text-base ${language === 'ar' ? 'font-arabic text-right' : 'font-sans text-left'}`}
                    data-testid="input-search"
                  />
                </div>
              </div>
              {searchQuery.length > 0 && (
                <div className="border-t border-border max-h-80 overflow-y-auto">
                  {filteredResults.length > 0 ? (
                    <div className="p-2">
                      {filteredResults.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchResultClick(item.href)}
                          className={`w-full text-right px-4 py-3 rounded-lg hover:bg-muted transition-colors ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}
                          data-testid={`search-result-${index}`}
                        >
                          <div className="flex items-center gap-3">
                            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-foreground">{item.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={`p-6 text-center text-muted-foreground ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                      {language === "ar" ? "لا توجد نتائج" : "No results found"}
                    </div>
                  )}
                </div>
              )}
              <div className={`border-t border-border px-4 py-2 text-xs text-muted-foreground ${language === 'ar' ? 'font-arabic text-right' : 'font-sans text-left'}`}>
                {language === "ar" ? "اضغط ESC للإغلاق" : "Press ESC to close"}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Phone dialog */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className={`text-center text-xl ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
              {language === 'ar' ? 'رقم التجمع' : 'NHC Phone Number'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-full bg-[#2BAAE2]/10 flex items-center justify-center">
              <Phone className="w-8 h-8 text-[#2BAAE2]" />
            </div>
            <a
              href="tel:920011140"
              className={`text-3xl font-bold text-[#2BAAE2] hover:text-[#1691D0] transition-colors ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}
              dir="ltr"
              data-testid="link-phone-number"
            >
              920011140
            </a>
            <p className={`text-muted-foreground text-center ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
              {language === 'ar' ? 'اضغط على الرقم للاتصال' : 'Click to call'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
