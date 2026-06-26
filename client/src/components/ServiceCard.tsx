import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Lock, 
  User, 
  LayoutGrid, 
  Monitor, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Stethoscope,
  Globe,
  Database,
  Building2,
  HelpCircle,
  Clock,
  CheckCircle2,
  GraduationCap,
  Cloud,
  Activity,
  Link2,
  ExternalLink,
  ChevronLeft,
  Calendar,
  Heart,
  ArrowRight,
  FilePlus,
  Baby,
  MessageCircle,
  Box,
  TrendingUp,
  Award,
  Users,
  Search,
  type LucideIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";
import type { Service } from "@shared/schema";

const iconMap: Record<string, LucideIcon> = {
  'phone': Phone,
  'mail': Mail,
  'lock': Lock,
  'user': User,
  'app': LayoutGrid,
  'monitor': Monitor,
  'file': FileText,
  'file-text': FileText,
  'chart': BarChart3,
  'shield': ShieldCheck,
  'medical': Stethoscope,
  'globe': Globe,
  'data': Database,
  'building': Building2,
  'help': HelpCircle,
  'clock': Clock,
  'check-circle': CheckCircle2,
  'graduation-cap': GraduationCap,
  'cloud': Cloud,
  'activity': Activity,
  'link': Link2,
  'calendar': Calendar,
  'heart': Heart,
  'arrow-right': ArrowRight,
  'file-plus': FilePlus,
  'baby': Baby,
  'message-circle': MessageCircle,
  'box': Box,
  'trending-up': TrendingUp,
  'award': Award,
  'users': Users,
};

interface EmailEntry {
  email: string;
  department: string;
  displayName: string;
}

const emailDirectory: EmailEntry[] = [
  { email: "NJ-CEO@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الرئيس التنفيذي تجمع نجران الصحي" },
  { email: "NJ-CEO-OFF@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مكتب الرئيس التنفيذي بتجمع نجران الصحي" },
  { email: "NJ-CEOAdvisor@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مستشار الرئيس التنفيذي تجمع نجران الصحي" },
  { email: "NJ-CEOADVR-OFF@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مكتب مستشار الرئيس التنفيذي تجمع نجران الصحي" },
  { email: "NJ-GRC@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للحوكمة والالتزام والمخاطر" },
  { email: "NJ-RCC@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مركز القيادة والتحكم" },
  { email: "NJ-Revenue@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "تنمية الايرادات" },
  { email: "NJ-IAG@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "المراجعة الداخلية" },
  { email: "NJ-SPT@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "التخطيط الاستراتيجي والتحول" },
  { email: "NJ-CMIC@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للتواصل وإدارة التغيير" },
  { email: "NJ-Legal@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الشؤون القانونية والالتزام" },
  { email: "NJ-CP@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "المشاركة المجتمعية" },
  { email: "NJ-937@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مركز الاتصال التفاعلي" },
  { email: "NJ-CO@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "لجنة فحص العروض" },
  { email: "NJ-PSA@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الخدمات العامة والأصول" },
  { email: "NJ-HaajUmrah@moh.gov.sa", department: "الخدمات العامة", displayName: "إدارة الحج والعمرة" },
  { email: "NJ-Training@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "إدارة الشؤون الأكاديمية والتدريب" },
  { email: "NJ-Training-STD@moh.gov.sa", department: "الشؤون الأكاديمية والتدريب", displayName: "التدريب والتعليم الطبي المستمر" },
  { email: "NJ-Dio-SCFHS@moh.gov.sa", department: "الشؤون الأكاديمية والتدريب", displayName: "الممثل النظامي للشؤون الأكاديمية" },
  { email: "NJ-TSCSL@moh.gov.sa", department: "الشؤون الأكاديمية والتدريب", displayName: "مركز المهارات الفنية ومعمل المحاكاة" },
  { email: "NJ-Disaster@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مركز التحكم والكوارث" },
  { email: "NJ-RCCOperation@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "عمليات مركز التحكم والكوارث" },
  { email: "NJ-Disaster-MT@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "النقل الطبي" },
  { email: "NJ-Disaster-IC@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "القيادة الميدانية" },
  { email: "NJ-Disaster-KPI@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "الجودة والمؤشرات" },
  { email: "NJ-Disaster-hepps@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "التخطيط والاستعداد" },
  { email: "NJ-PSP@moh.gov.sa", department: "الاستراتيجية والتحول", displayName: "إدارة التخطيط الاستراتيجي ومشاركة القطاع الخاص" },
  { email: "NJ-SPT-QUALITY@moh.gov.sa", department: "الاستراتيجية والتحول", displayName: "وحدة الجودة للاستراتيجية والتحول" },
  { email: "NJ-SPlan@moh.gov.sa", department: "الاستراتيجية والتحول", displayName: "وحدة الخطة الاستراتيجية" },
  { email: "NJ-BPlan@moh.gov.sa", department: "الاستراتيجية والتحول", displayName: "وحدة الخطة التشغيلية" },
  { email: "NJ-GPlan@moh.gov.sa", department: "الاستراتيجية والتحول", displayName: "وحدة متطلبات البوابة" },
  { email: "NJ-HealthServices@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للخدمات الصحية" },
  { email: "NJ-HOS@moh.gov.sa", department: "الخدمات الصحية", displayName: "إدارة المستشفيات" },
  { email: "NJ-HosTec@moh.gov.sa", department: "إدارة المستشفيات", displayName: "إدارة الشؤون الفنية" },
  { email: "NJ-PublicHealth@moh.gov.sa", department: "الخدمات الصحية", displayName: "إدارة الصحة العامة" },
  { email: "NJ-Nursing@moh.gov.sa", department: "الخدمات الصحية", displayName: "التمريض" },
  { email: "NJ-NU-Edu@moh.gov.sa", department: "التمريض", displayName: "التدريب للتمريض" },
  { email: "NJ-NU-Quality@moh.gov.sa", department: "التمريض", displayName: "الجودة التمريضية" },
  { email: "NJ-NU-Adm@moh.gov.sa", department: "التمريض", displayName: "الشؤون الإدارية للتمريض" },
  { email: "NJ-NU-TA@moh.gov.sa", department: "التمريض", displayName: "الشؤون الفنية للتمريض" },
  { email: "NJ-SMServices@moh.gov.sa", department: "الخدمات الصحية", displayName: "الخدمات الطبية المساندة" },
  { email: "Nj-reglabs@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "إدارة المختبرات الإقليمي" },
  { email: "Nj-reglab-it@moh.gov.sa", department: "المختبرات الإقليمي", displayName: "الصحة الرقمية بالمختبرات" },
  { email: "NJ-BloodBank@moh.gov.sa", department: "المختبرات الإقليمي", displayName: "بنك الدم المساند" },
  { email: "NJ-MSServices@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "إدارة الخدمات النفسية والاجتماعية" },
  { email: "NJ-BFeeding@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "إدارة دعم الرضاعة الطبيعية" },
  { email: "NJ-JORAS@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "غرفة العمليات المشتركة لمشروع عينتي" },
  { email: "NJ-Rad@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "إدارة الأشعة والخدمات التطبيقية" },
  { email: "NJ-HS-Ayenati@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "فريق عينتي" },
  { email: "NJ-AdminPacs@moh.gov.sa", department: "إدارة الأشعة", displayName: "الباكس بإدارة الأشعة" },
  { email: "NJ-Rad-MedPhys@moh.gov.sa", department: "إدارة الأشعة", displayName: "الفيزياء الطبية" },
  { email: "Nj-Rad-Mawid@moh.gov.sa", department: "إدارة الأشعة", displayName: "برنامج موعد بإدارة الأشعة" },
  { email: "NJ-Rad-Equipment@moh.gov.sa", department: "إدارة الأشعة", displayName: "وحدة الأجهزة بإدارة الأشعة" },
  { email: "NJ-InfControl@moh.gov.sa", department: "الخدمات الصحية", displayName: "مكافحة العدوى" },
  { email: "NJ-COGH@moh.gov.sa", department: "الخدمات الصحية", displayName: "مركز عمليات الصحة العامة" },
  { email: "NJ-Mw@moh.gov.sa", department: "الخدمات الصحية", displayName: "برنامج النفايات الطبية" },
  { email: "NJ-MedReco@moh.gov.sa", department: "الخدمات الصحية", displayName: "المعلوماتية الصحية" },
  { email: "NJ-ServiceLine@moh.gov.sa", department: "الخدمات الصحية", displayName: "المسارات الاكلينيكية" },
  { email: "NJ-IntHealthCare@moh.gov.sa", department: "الخدمات الصحية", displayName: "الرعاية الصحية المتكاملة" },
  { email: "NJ-Diet@moh.gov.sa", department: "الخدمات الصحية", displayName: "التغذية" },
  { email: "NJ-HealthVol@moh.gov.sa", department: "الخدمات الصحية", displayName: "التطوع الصحي" },
  { email: "NJ-LTC@moh.gov.sa", department: "الخدمات الصحية", displayName: "التأهيل الطبي والرعاية المديدة" },
  { email: "NJ-Musta@moh.gov.sa", department: "الخدمات الصحية", displayName: "إدارة برنامج مستعد" },
  { email: "NJ-HS-PMO@moh.gov.sa", department: "الخدمات الصحية", displayName: "إدارة المشاريع بالخدمات الصحية" },
  { email: "NJ-PerfMgmt@moh.gov.sa", department: "الخدمات الصحية", displayName: "إدارة الأداء الاكلينيكي" },
  { email: "NJ-PM-Phcc@moh.gov.sa", department: "إدارة الأداء الكلينيكي", displayName: "وحدة أداء الرعاية الأولية" },
  { email: "NJ-HomeMed@moh.gov.sa", department: "الخدمات الصحية", displayName: "إدارة الرعاية الصحية المنزلية" },
  { email: "NJ-PhCare@moh.gov.sa", department: "الخدمات الصحية", displayName: "إدارة الرعاية الصيدلية" },
  { email: "NJ-PhCare-Wasfaty@moh.gov.sa", department: "الخدمات الصحية", displayName: "وصفتي للرعاية الصيدلية" },
  { email: "NJ-PHM@moh.gov.sa", department: "الخدمات الصحية", displayName: "الصحة السكانية" },
  { email: "NJ-PHM-DM@moh.gov.sa", department: "الصحة السكانية", displayName: "إدارة البيانات" },
  { email: "NJ-PHM-PP@moh.gov.sa", department: "الصحة السكانية", displayName: "إدارة التخطيط والأداء" },
  { email: "NJ-PHM-DA@moh.gov.sa", department: "الصحة السكانية", displayName: "إدارة تحليل البيانات" },
  { email: "NJ-PHM-Research@moh.gov.sa", department: "الصحة السكانية", displayName: "إدارة البحوث والجودة" },
  { email: "NJ-HPMPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "إدارة البرامج الصحية" },
  { email: "NJ-CEPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "التثقيف الإكلينيكي" },
  { email: "NJ-AAPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "الشؤون الأكاديمية للصحة العامة" },
];

const departments: string[] = Array.from(new Set(emailDirectory.map(e => e.department)));

interface ServiceCardProps {
  service: Service;
  variant?: 'info' | 'system';
}

export function ServiceCard({ service, variant = 'system' }: ServiceCardProps) {
  const { language } = useI18n();
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';
  const Icon = iconMap[service.iconType] || LayoutGrid;
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isEmailDirectory = service.titleAr === "عناوين البريد الإلكتروني";

  const filteredEmails = emailDirectory.filter(entry => 
    entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.displayName.includes(searchTerm) ||
    entry.department.includes(searchTerm)
  );

  const groupedEmails = departments.reduce((acc, dept) => {
    const emails = filteredEmails.filter(e => e.department === dept);
    if (emails.length > 0) {
      acc[dept] = emails;
    }
    return acc;
  }, {} as Record<string, EmailEntry[]>);

  const cardContent = (
    <>
      <div className="h-1.5 bg-[#2BAAE2]"></div>
      
      <div className="p-6 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
          <Icon className="w-8 h-8 text-[#2BAAE2] brand-icon" />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-arabic text-lg font-bold text-white group-hover:text-white/90 transition-colors leading-tight">
            {service.titleAr}
          </h3>
          <p className="font-sans text-xs text-white/70">
            {service.titleEn}
          </p>
        </div>

        <div className="flex items-center gap-1 text-white text-sm font-arabic opacity-0 group-hover:opacity-100 transition-opacity">
          <span>{language === 'ar' ? 'الدخول' : 'Enter'}</span>
          <ChevronLeft className={`w-4 h-4 brand-icon ${language === 'ar' ? '' : 'rotate-180'}`} />
        </div>
      </div>
    </>
  );

  if (isEmailDirectory && variant === 'info') {
    return (
      <>
        <motion.div
          onClick={() => setIsEmailDialogOpen(true)}
          className="group relative overflow-hidden rounded-2xl bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:-translate-y-1 transition-all block h-full cursor-pointer"
          whileTap={{ scale: 0.98 }}
          data-testid={`card-service-${service.id}`}
        >
          {cardContent}
        </motion.div>

        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 rounded-2xl bg-black/60 dark:bg-black/80 backdrop-blur-xl border border-white/20">
            <div className="bg-black/20 dark:bg-black/50 backdrop-blur-md text-white px-5 py-6 rounded-b-3xl relative border-b border-white/20">
              <DialogHeader className="pb-0">
                <DialogTitle className={`text-lg ${fontClass} flex items-center justify-center gap-2 text-white`}>
                  <Mail className="w-5 h-5 brand-icon" />
                  {language === 'ar' ? 'عناوين البريد الإلكتروني للإدارات' : 'Department Email Addresses'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4 relative">
                <Input
                  placeholder={language === 'ar' ? 'ابحث عن إداره او بريد إلكتروني...' : 'Search for department or email...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/50 rounded-full pr-4 pl-10 h-11 ${fontClass}`}
                  data-testid="input-email-search"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2BAAE2]/60 brand-icon" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-black/20">
              {Object.entries(groupedEmails).map(([dept, emails]) => (
                <div key={dept}>
                  <div className="px-4 py-3 flex items-center gap-2 bg-black/20 dark:bg-black/50 backdrop-blur-md border-b border-white/10">
                    <Building2 className="w-4 h-4 text-[#2BAAE2] brand-icon" />
                    <span className={`font-semibold text-sm ${fontClass} text-white`}>{dept}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 mr-auto"></div>
                  </div>
                  
                  <div className="px-3 py-2 space-y-1.5">
                    {emails.map((entry, idx) => (
                      <a
                        key={idx}
                        href={`mailto:${entry.email}`}
                        className="block bg-black/20 dark:bg-black/50 backdrop-blur-md rounded-xl px-4 py-3 hover:bg-white/20 transition-colors border border-white/10"
                        data-testid={`link-email-${dept}-${idx}`}
                      >
                        <p className={`text-sm ${fontClass} text-white leading-relaxed`}>
                          {entry.displayName}
                        </p>
                        <p className="text-sm text-white/70 mt-0.5" dir="ltr">
                          {entry.email}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {Object.keys(groupedEmails).length === 0 && (
                <div className="text-center py-12 text-white/60">
                  <Mail className="w-12 h-12 mx-auto mb-3 opacity-50 brand-icon" />
                  <p className={fontClass}>
                    {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (variant === 'info') {
    return (
      <motion.a
        href={service.url}
        target={service.isOpenNewTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="group relative overflow-hidden rounded-2xl bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:-translate-y-1 transition-all block h-full"
        whileTap={{ scale: 0.98 }}
        data-testid={`card-service-${service.id}`}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={service.url}
      target={service.isOpenNewTab ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl bg-black/20 dark:bg-black/50 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:-translate-y-1 transition-all block h-full min-h-[160px]"
      whileTap={{ scale: 0.97 }}
      data-testid={`card-service-${service.id}`}
    >
      <div className="h-1.5 bg-[#2BAAE2]"></div>
      <div className="absolute inset-0 top-1.5 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center p-5 gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
          <Icon className="w-6 h-6 text-[#2BAAE2] brand-icon" />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-arabic text-sm font-bold text-white group-hover:text-white/90 transition-colors leading-tight line-clamp-2">
            {service.titleAr}
          </h3>
          <p className="font-sans text-xs text-white/70 line-clamp-1">
            {service.titleEn}
          </p>
        </div>
        
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4 text-[#2BAAE2]/50 brand-icon" />
        </div>
      </div>
    </motion.a>
  );
}
