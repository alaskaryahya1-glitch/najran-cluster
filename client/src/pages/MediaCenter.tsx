import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";
import { useSEO } from "@/hooks/useSEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library, Video, Images, FileText, BarChart3, Search,
  Download, Play, Eye, BookOpen, ClipboardList, ChevronLeft, ChevronRight,
  MessageCircleQuestion, ChevronDown, Building2, HeartPulse, CalendarDays, ShieldCheck, Users
} from "lucide-react";
import { CardStar } from "@/components/BrandIcon";

// ── Data ──────────────────────────────────────────────────────────────────────

const mediaItems = [
  { id: 1, type: 'video',       gradient: 'from-[#004070] to-[#2BAAE2]',   titleAr: 'يوم الصحة العالمي 2024',                    titleEn: 'World Health Day 2024',                      date: '2024-04-07' },
  { id: 2, type: 'infographic', gradient: 'from-[#2BAAE2] to-teal-500',     titleAr: 'إنجازات تجمع نجران الصحي 2023',             titleEn: 'Najran Health Cluster Achievements 2023',    date: '2024-03-15' },
  { id: 3, type: 'image',       gradient: 'from-emerald-600 to-teal-500',   titleAr: 'افتتاح مستشفى شرورة العام',                 titleEn: 'Inauguration of Sharurah General Hospital',  date: '2024-02-20' },
  { id: 4, type: 'video',       gradient: 'from-purple-700 to-purple-500',  titleAr: 'حملة التطعيم الوطنية ضد الإنفلونزا',       titleEn: 'National Influenza Vaccination Campaign',    date: '2024-01-10' },
  { id: 5, type: 'infographic', gradient: 'from-orange-600 to-amber-500',   titleAr: 'خدمات الرعاية الصحية الأولية في نجران',    titleEn: 'Primary Health Care Services in Najran',     date: '2023-12-05' },
  { id: 6, type: 'image',       gradient: 'from-green-700 to-green-500',    titleAr: 'فعاليات اليوم الوطني السعودي 93',           titleEn: 'Saudi National Day 93 Events',               date: '2023-09-23' },
  { id: 7, type: 'video',       gradient: 'from-rose-700 to-pink-500',      titleAr: 'برنامج تجمع نجران للتحول الصحي',            titleEn: 'Najran Cluster Health Transformation Program', date: '2023-08-15' },
  { id: 8, type: 'infographic', gradient: 'from-sky-700 to-blue-500',       titleAr: 'إحصائيات الخدمات الصحية 2023',             titleEn: 'Health Services Statistics 2023',            date: '2023-07-01' },
  { id: 9, type: 'image',       gradient: 'from-indigo-700 to-violet-500',  titleAr: 'ورشة عمل الجودة والسلامة الصحية',           titleEn: 'Health Quality and Safety Workshop',         date: '2023-06-12' },
  { id: 10, type: 'video',      gradient: 'from-cyan-700 to-cyan-500',      titleAr: 'مبادرات الصحة المنزلية للمرضى المزمنين',   titleEn: 'Home Health Initiatives for Chronic Patients', date: '2023-05-20' },
  { id: 11, type: 'infographic', gradient: 'from-fuchsia-700 to-pink-500',  titleAr: 'أرقام وإحصائيات الطوارئ الطبية',           titleEn: 'Emergency Medical Statistics',               date: '2023-04-18' },
  { id: 12, type: 'image',      gradient: 'from-teal-700 to-teal-500',      titleAr: 'زيارة وفد وزارة الصحة لمستشفى الملك خالد', titleEn: 'MOH Delegation Visit to King Khalid Hospital', date: '2023-03-10' },
];

const publicationItems = [
  { id: 1, pages: 84,  titleAr: 'التقرير السنوي لتجمع نجران الصحي 2023',        titleEn: 'Najran Health Cluster Annual Report 2023',        descAr: 'تقرير شامل عن إنجازات وأداء التجمع خلال عام 2023',            descEn: 'Comprehensive report on cluster achievements and performance in 2023', date: '2024-01-15' },
  { id: 2, pages: 32,  titleAr: 'دليل خدمات الرعاية الصحية الأولية',            titleEn: 'Primary Healthcare Services Guide',                descAr: 'دليل المستفيدين للخدمات المقدمة في مراكز الرعاية الأولية',   descEn: 'Beneficiary guide for services offered at primary care centers',      date: '2023-10-01' },
  { id: 3, pages: 48,  titleAr: 'نشرة الجودة والسلامة المؤسسية',                titleEn: 'Institutional Quality & Safety Bulletin',          descAr: 'النشرة الدورية لمؤشرات الجودة والسلامة في مرافق التجمع',    descEn: 'Periodic bulletin of quality and safety indicators in cluster facilities', date: '2023-07-20' },
  { id: 4, pages: 60,  titleAr: 'خطة الطوارئ والكوارث الصحية',                  titleEn: 'Health Emergency & Disaster Plan',                 descAr: 'خطة التجمع الشاملة للتعامل مع حالات الطوارئ والكوارث',    descEn: 'Cluster comprehensive plan for handling emergencies and disasters',    date: '2023-05-10' },
  { id: 5, pages: 56,  titleAr: 'تقرير مؤشرات الأداء الصحي الرئيسية',          titleEn: 'Key Health Performance Indicators Report',         descAr: 'مؤشرات الأداء الرئيسية لجميع الخدمات الصحية في التجمع',   descEn: 'Key performance indicators for all health services in the cluster',   date: '2023-04-01' },
  { id: 6, pages: 20,  titleAr: 'كتيب حقوق المرضى وواجباتهم',                   titleEn: 'Patient Rights & Responsibilities Booklet',        descAr: 'دليل شامل يوضح حقوق المرضى وواجباتهم في مرافق التجمع',   descEn: 'Comprehensive guide on patient rights and responsibilities',           date: '2023-03-15' },
];

const reportItems = [
  { id: 1, typeKey: 'quarterly', titleAr: 'تقرير إحصائيات الخدمات الصحية ق١ 2024', titleEn: 'Health Services Statistics Report Q1 2024',    descAr: 'إحصائيات شاملة للخدمات الصحية المقدمة في الربع الأول من 2024', descEn: 'Comprehensive health services statistics for Q1 2024', date: '2024-04-30' },
  { id: 2, typeKey: 'annual',    titleAr: 'تقرير برنامج التحول الصحي 2023',         titleEn: 'Health Transformation Program Report 2023',    descAr: 'مستجدات ومؤشرات تنفيذ برنامج التحول الصحي في نجران',         descEn: 'Updates and indicators for the health transformation program',  date: '2024-02-01' },
  { id: 3, typeKey: 'annual',    titleAr: 'تقرير مؤشرات الجودة والسلامة 2023',      titleEn: 'Quality & Safety Indicators Report 2023',      descAr: 'مؤشرات الجودة والسلامة المؤسسية للعام المالي 2023',           descEn: 'Institutional quality and safety indicators for fiscal year 2023', date: '2023-12-31' },
  { id: 4, typeKey: 'quarterly', titleAr: 'تقرير الرعاية الصحية الأولية ق٤ 2023',  titleEn: 'Primary Healthcare Report Q4 2023',            descAr: 'أداء ومؤشرات مراكز الرعاية الصحية الأولية في منطقة نجران',   descEn: 'Performance of primary healthcare centers in Najran region',    date: '2024-01-31' },
  { id: 5, typeKey: 'monthly',   titleAr: 'تقرير الطوارئ الشهري — ديسمبر 2023',    titleEn: 'Monthly Emergency Report — December 2023',     descAr: 'إحصائيات أقسام الطوارئ في مستشفيات تجمع نجران الصحي',        descEn: 'Emergency department statistics across Najran cluster hospitals', date: '2024-01-05' },
  { id: 6, typeKey: 'annual',    titleAr: 'تقرير موارد بشرية التجمع 2023',          titleEn: 'Cluster Human Resources Report 2023',          descAr: 'إحصائيات وتحليلات الكوادر البشرية الصحية في تجمع نجران',     descEn: 'Statistics and analysis of health human resources in Najran cluster', date: '2023-11-15' },
];

const guidelineItems = [
  { id: 1, catKey: 'clinical',   titleAr: 'دليل بروتوكولات العلاج السريري',         titleEn: 'Clinical Treatment Protocols Guide',            descAr: 'البروتوكولات السريرية المعتمدة لأشيع الحالات في مرافق التجمع', descEn: 'Approved clinical protocols for common cases in cluster facilities', date: '2024-03-01' },
  { id: 2, catKey: 'safety',     titleAr: 'إرشادات مكافحة العدوى والوقاية منها',    titleEn: 'Infection Control & Prevention Guidelines',     descAr: 'معايير وإجراءات مكافحة العدوى المعتمدة في المرافق الصحية',   descEn: 'Approved infection control standards and procedures in health facilities', date: '2024-01-15' },
  { id: 3, catKey: 'emergency',  titleAr: 'دليل إجراءات الطوارئ والإسعافات الأولية', titleEn: 'Emergency & First Aid Procedures Guide',      descAr: 'الإجراءات المعتمدة للتعامل مع حالات الطوارئ الطبية المختلفة', descEn: 'Approved procedures for handling various medical emergencies',       date: '2023-11-10' },
  { id: 4, catKey: 'mental',     titleAr: 'إرشادات خدمات الصحة النفسية',           titleEn: 'Mental Health Services Guidelines',             descAr: 'إرشادات تقديم خدمات الصحة النفسية وعلاج الإدمان في التجمع',  descEn: 'Guidelines for providing mental health and addiction treatment services', date: '2023-09-05' },
  { id: 5, catKey: 'maternal',   titleAr: 'بروتوكول رعاية الأمومة والطفل',         titleEn: 'Maternal & Child Care Protocol',                descAr: 'معايير رعاية الأم والطفل في مستشفى الولادة والمراكز الصحية',  descEn: 'Mother and child care standards at maternity hospitals and health centers', date: '2023-07-20' },
  { id: 6, catKey: 'pharmacy',   titleAr: 'إرشادات الصرف الآمن للأدوية',           titleEn: 'Safe Medication Dispensing Guidelines',         descAr: 'معايير وضوابط الصرف الآمن للأدوية في مرافق تجمع نجران',     descEn: 'Standards and controls for safe medication dispensing in Najran facilities', date: '2023-05-12' },
];

const faqCategories = [
  { id: 'all',       labelAr: 'الكل',               labelEn: 'All',               Icon: Library },
  { id: 'general',   labelAr: 'عام',                 labelEn: 'General',           Icon: Building2 },
  { id: 'services',  labelAr: 'الخدمات الصحية',      labelEn: 'Health Services',   Icon: HeartPulse },
  { id: 'appts',     labelAr: 'المواعيد',             labelEn: 'Appointments',      Icon: CalendarDays },
  { id: 'insurance', labelAr: 'التأمين الصحي',       labelEn: 'Health Insurance',  Icon: ShieldCheck },
  { id: 'hr',        labelAr: 'الموارد البشرية',     labelEn: 'Human Resources',   Icon: Users },
];

const faqItems = [
  // General
  {
    id: 1, catId: 'general',
    questionAr: 'ما هو تجمع نجران الصحي؟',
    questionEn: 'What is Najran Health Cluster?',
    answerAr: 'تجمع نجران الصحي أحد التجمعات الصحية التابعة لشركة الصحة القابضة في المملكة العربية السعودية، تأسس ضمن برنامج التحول الصحي لرؤية 2030، ويقدم خدماته لأكثر من 495 ألف مستفيد عبر 12 مستشفى و69 مركزًا صحيًا.',
    answerEn: 'Najran Health Cluster is one of the health clusters under the Saudi Health Holding Company, established as part of the health transformation program of Vision 2030, serving over 495,000 beneficiaries through 12 hospitals and 69 health centers.',
  },
  {
    id: 2, catId: 'general',
    questionAr: 'ما هي رؤية ورسالة تجمع نجران الصحي؟',
    questionEn: 'What is the vision and mission of Najran Health Cluster?',
    answerAr: 'رؤيتنا: "نرتقي معاً بالرعاية الصحية للجميع". ورسالتنا: تقديم نموذج مستدام ومبتكر للرعاية الصحية يعزز من جودة الحياة للجميع، مع الالتزام بأعلى معايير الجودة والسلامة.',
    answerEn: 'Our vision: "Together we elevate healthcare for everyone." Our mission: Providing a sustainable and innovative healthcare model that enhances quality of life for all, with commitment to the highest quality and safety standards.',
  },
  {
    id: 3, catId: 'general',
    questionAr: 'كم عدد المنشآت الصحية التابعة للتجمع؟',
    questionEn: 'How many health facilities does the cluster have?',
    answerAr: 'يضم التجمع 12 مستشفى عاماً ومتخصصاً بسعة سريرية 1,300 سرير، و69 مركزاً للرعاية الصحية الأولية موزعة في منطقة نجران.',
    answerEn: 'The cluster includes 12 general and specialized hospitals with 1,300 bed capacity, and 69 primary healthcare centers distributed across the Najran region.',
  },
  {
    id: 4, catId: 'general',
    questionAr: 'كيف يمكنني التواصل مع تجمع نجران الصحي؟',
    questionEn: 'How can I contact Najran Health Cluster?',
    answerAr: 'يمكن التواصل عبر الرقم 920011140، أو حسابات التواصل الاجتماعي @NajranCluster، أو بزيارة أي من مرافقنا الصحية المنتشرة في المنطقة.',
    answerEn: 'You can contact us via 920011140, our social media accounts @NajranCluster, or by visiting any of our health facilities across the region.',
  },
  // Health Services
  {
    id: 5, catId: 'services',
    questionAr: 'ما هي الخدمات الصحية المتاحة في التجمع؟',
    questionEn: 'What health services are available at the cluster?',
    answerAr: 'نقدم: الرعاية الأولية والوقائية، الطوارئ 24/7، الرعاية التخصصية والجراحية، صحة الأم والطفل، الصحة النفسية، العناية المركزة، القسطرة القلبية، غسيل الكلى، طب الأسنان، والرعاية المنزلية.',
    answerEn: 'We provide: primary and preventive care, 24/7 emergency services, specialized and surgical care, maternal and child health, mental health, intensive care, cardiac catheterization, dialysis, dentistry, and home healthcare.',
  },
  {
    id: 6, catId: 'services',
    questionAr: 'أين يمكنني الحصول على رعاية الطوارئ؟',
    questionEn: 'Where can I get emergency care?',
    answerAr: 'تتوفر أقسام طوارئ تعمل 24 ساعة في جميع مستشفيات التجمع، أبرزها: مستشفى الملك خالد، مستشفى نجران العام، مستشفى شرورة العام. يمكنك كذلك الاتصال بالإسعاف على الرقم 911.',
    answerEn: 'Emergency departments operate 24 hours in all cluster hospitals, notably King Khalid Hospital, Najran General Hospital, and Sharurah General Hospital. You can also call emergency services at 911.',
  },
  {
    id: 7, catId: 'services',
    questionAr: 'هل تتوفر خدمات الصحة النفسية؟',
    questionEn: 'Are mental health services available?',
    answerAr: 'نعم، يضم التجمع مجمع إرادة والصحة النفسية المتخصص في تقديم خدمات الصحة النفسية وعلاج الإدمان، إضافة إلى عيادات الصحة النفسية في مراكز الرعاية الأولية.',
    answerEn: 'Yes, the cluster includes the Irada Mental Health Complex specializing in mental health and addiction treatment, in addition to mental health clinics in primary care centers.',
  },
  {
    id: 8, catId: 'services',
    questionAr: 'هل تتوفر خدمة الرعاية الصحية المنزلية؟',
    questionEn: 'Is home healthcare available?',
    answerAr: 'نعم، يقدم التجمع خدمة الرعاية الصحية المنزلية للمرضى المزمنين وذوي الاحتياجات الخاصة الذين يصعب عليهم التنقل. للاستفسار اتصل بمستشفى المنطقة الأقرب لك.',
    answerEn: 'Yes, the cluster provides home healthcare for chronic patients and people with special needs who have difficulty traveling. For inquiries, contact the nearest hospital.',
  },
  // Appointments
  {
    id: 9, catId: 'appts',
    questionAr: 'كيف يمكنني حجز موعد؟',
    questionEn: 'How can I book an appointment?',
    answerAr: 'يمكن حجز المواعيد عبر: تطبيق صحتي، منصة صحة الإلكترونية، أو الاتصال المباشر بالمستشفى أو المركز الصحي المختص. وذلك على مدار الساعة.',
    answerEn: 'Appointments can be booked through: the Sehhaty app, the Seha electronic platform, or by calling the hospital or health center directly, available around the clock.',
  },
  {
    id: 10, catId: 'appts',
    questionAr: 'ما هو تطبيق صحتي وكيف أستخدمه؟',
    questionEn: 'What is the Sehhaty app and how do I use it?',
    answerAr: 'تطبيق صحتي منصة موحدة لحجز المواعيد والاطلاع على الملف الصحي الرقمي. يمكن تحميله من App Store أو Google Play والتسجيل برقم الهوية الوطنية.',
    answerEn: 'Sehhaty is a unified platform for booking appointments and viewing your digital health record. Download it from the App Store or Google Play and register with your national ID number.',
  },
  {
    id: 11, catId: 'appts',
    questionAr: 'كيف يمكنني إلغاء أو تغيير موعدي؟',
    questionEn: 'How can I cancel or change my appointment?',
    answerAr: 'يمكن إلغاء المواعيد أو تغييرها عبر تطبيق صحتي أو منصة صحة، أو بالاتصال بالجهة الصحية المختصة قبل 24 ساعة على الأقل من الموعد.',
    answerEn: 'You can cancel or reschedule appointments through the Sehhaty app, the Seha platform, or by calling the health facility at least 24 hours before the appointment.',
  },
  {
    id: 12, catId: 'appts',
    questionAr: 'ما المدة الزمنية المعتادة لانتظار المواعيد؟',
    questionEn: 'What is the typical waiting time for appointments?',
    answerAr: 'تتفاوت مدة الانتظار حسب التخصص والإلحاحية. حالات الطوارئ تُعالج فوراً، أما المواعيد الاعتيادية فتتراوح عادة بين يوم وأسبوع حسب التخصص والطاقة الاستيعابية.',
    answerEn: 'Waiting times vary by specialty and urgency. Emergency cases are treated immediately, while routine appointments typically range from one day to one week depending on the specialty and capacity.',
  },
  // Insurance
  {
    id: 13, catId: 'insurance',
    questionAr: 'ما أنواع التأمين الصحي المقبولة في التجمع؟',
    questionEn: 'What types of health insurance are accepted at the cluster?',
    answerAr: 'يقبل التجمع تأمين صحي وزارة الصحة للمواطنين والمقيمين المؤهلين، بالإضافة إلى بعض شركات التأمين الصحي الخاص وفقاً للاتفاقيات المبرمة. للاستفسار راجع المركز الصحي.',
    answerEn: 'The cluster accepts MOH health insurance for eligible citizens and residents, plus some private health insurance companies per existing agreements. Contact your health center for inquiries.',
  },
  {
    id: 14, catId: 'insurance',
    questionAr: 'هل تشمل التغطية التأمينية الأدوية؟',
    questionEn: 'Does insurance coverage include medications?',
    answerAr: 'نعم، الأدوية المصروفة من صيدليات مرافق التجمع والمدرجة في قائمة الأدوية المعتمدة مشمولة بالتغطية التأمينية. الأدوية خارج القائمة قد تتطلب تحمّل جزئي من المريض.',
    answerEn: 'Yes, medications dispensed from cluster pharmacies and listed in the approved drug formulary are covered. Medications outside the formulary may require patient co-payment.',
  },
  {
    id: 15, catId: 'insurance',
    questionAr: 'ما الإجراء المتبع للمطالبة بالتأمين؟',
    questionEn: 'What is the procedure for insurance claims?',
    answerAr: 'تُعالج مطالبات التأمين مباشرةً بين التجمع وشركة التأمين في معظم الحالات. للاستفسار عن مطالبة بعينها تواصل مع قسم الشؤون المالية في المنشأة الصحية.',
    answerEn: 'Insurance claims are handled directly between the cluster and the insurance company in most cases. For inquiries about a specific claim, contact the financial department at the health facility.',
  },
  // HR
  {
    id: 16, catId: 'hr',
    questionAr: 'كيف يمكنني التقدم لوظيفة في تجمع نجران الصحي؟',
    questionEn: 'How can I apply for a job at Najran Health Cluster?',
    answerAr: 'تُعلن الوظائف الشاغرة عبر منصة أبشر وبوابة وزارة الصحة الرسمية وحسابات التواصل الاجتماعي للتجمع. يمكن التقديم إلكترونياً عبر المنصات المذكورة عند توفر الشواغر.',
    answerEn: 'Vacancies are announced through the Absher platform, the official MOH portal, and the cluster\'s social media accounts. Applications are submitted electronically through these platforms when positions are available.',
  },
  {
    id: 17, catId: 'hr',
    questionAr: 'ما إجراءات طلب الإجازات للموظفين؟',
    questionEn: 'What are the leave request procedures for employees?',
    answerAr: 'تُقدَّم طلبات الإجازات عبر نظام إدارة الموارد البشرية المعتمد في التجمع. للاستفسار التفصيلي يُرجى التواصل مع إدارة الموارد البشرية أو مراجعة صفحة خدمات الموظفين.',
    answerEn: 'Leave requests are submitted through the cluster\'s approved HR management system. For detailed inquiries, contact the Human Resources department or visit the Employee Services page.',
  },
  {
    id: 18, catId: 'hr',
    questionAr: 'كيف أستفسر عن مستحقاتي المالية؟',
    questionEn: 'How do I inquire about my financial entitlements?',
    answerAr: 'يمكن الاستفسار عن المستحقات المالية عبر نظام الموارد البشرية الإلكتروني، أو بالتواصل مع إدارة الشؤون المالية في التجمع.',
    answerEn: 'You can inquire about financial entitlements through the electronic HR system, or by contacting the cluster\'s Finance Department.',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string, language: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MediaCard({ item, language, fontClass, t }: any) {
  const isVideo = item.type === 'video';
  const isInfographic = item.type === 'infographic';

  const badgeLabel = t(`mediaCenter.badge.${item.type}`);
  const Icon = isVideo ? Video : isInfographic ? BarChart3 : Images;
  const actionLabel = isVideo ? t('mediaCenter.action.watch') : t('mediaCenter.action.view');
  const ActionIcon = isVideo ? Play : Eye;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(43,170,226,0.18)] hover:border-[#2BAAE2] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
        <Icon className="w-14 h-14 text-white/30" />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-white ms-1" />
            </div>
          </div>
        )}
        <span className="absolute top-3 end-3 text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
          {badgeLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1.5">{formatDate(item.date, language)}</p>
        <h3 className={`font-bold text-gray-800 text-sm leading-snug mb-4 line-clamp-2 ${fontClass} group-hover:text-[#2BAAE2] transition-colors`}>
          {language === 'ar' ? item.titleAr : item.titleEn}
        </h3>
        <button className={`flex items-center gap-1.5 text-xs font-semibold text-[#2BAAE2] hover:gap-2.5 transition-all ${fontClass}`}>
          <ActionIcon className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      </div>
    </motion.div>
  );
}

function DocumentCard({ item, language, fontClass, t, accent }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden flex"
    >
      <div className={`w-1.5 flex-shrink-0 ${accent}`} />
      <div className="flex-1 p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2BAAE2]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2BAAE2] transition-colors duration-300">
            <FileText className="w-6 h-6 text-[#2BAAE2] group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-1">{formatDate(item.date, language)}</p>
            <h3 className={`font-bold text-gray-800 text-sm leading-snug mb-1.5 ${fontClass} group-hover:text-[#2BAAE2] transition-colors`}>
              {language === 'ar' ? item.titleAr : item.titleEn}
            </h3>
            <p className={`text-gray-500 text-xs leading-relaxed line-clamp-2 ${fontClass}`}>
              {language === 'ar' ? item.descAr : item.descEn}
            </p>
            {item.pages && (
              <span className="inline-block mt-2 text-xs text-[#2BAAE2] font-medium bg-[#2BAAE2]/10 px-2 py-0.5 rounded-full">
                {item.pages} {language === 'ar' ? 'صفحة' : 'pages'}
              </span>
            )}
            {item.typeKey && (
              <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {language === 'ar'
                  ? (({ quarterly: 'ربع سنوي', annual: 'سنوي', monthly: 'شهري' } as Record<string, string>)[item.typeKey] ?? item.typeKey)
                  : (({ quarterly: 'Quarterly', annual: 'Annual', monthly: 'Monthly' } as Record<string, string>)[item.typeKey] ?? item.typeKey)
                }
              </span>
            )}
            {item.catKey && (
              <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {language === 'ar'
                  ? (({ clinical: 'سريري', safety: 'سلامة', emergency: 'طوارئ', mental: 'صحة نفسية', maternal: 'أمومة وطفل', pharmacy: 'صيدلة' } as Record<string, string>)[item.catKey] ?? item.catKey)
                  : (({ clinical: 'Clinical', safety: 'Safety', emergency: 'Emergency', mental: 'Mental Health', maternal: 'Maternal & Child', pharmacy: 'Pharmacy' } as Record<string, string>)[item.catKey] ?? item.catKey)
                }
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className={`flex items-center gap-1.5 text-xs font-semibold text-[#2BAAE2] bg-[#2BAAE2]/10 hover:bg-[#2BAAE2] hover:text-white px-3 py-1.5 rounded-full transition-colors duration-200 ${fontClass}`}>
            <Download className="w-3.5 h-3.5" />
            {t('mediaCenter.action.download')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FaqPanel({ language, fontClass, searchQuery }: { language: string; fontClass: string; searchQuery: string }) {
  const [activeCat, setActiveCat] = useState('all');
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return faqItems.filter(item => {
      const matchesCat = activeCat === 'all' || item.catId === activeCat;
      const matchesSearch = !q ||
        item.questionAr.includes(q) || item.questionEn.toLowerCase().includes(q) ||
        item.answerAr.includes(q)   || item.answerEn.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCat, searchQuery]);

  return (
    <motion.div key="faqs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {faqCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCat(cat.id); setOpenId(null); }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${fontClass} ${
              activeCat === cat.id
                ? 'bg-[#2BAAE2] text-white border-[#2BAAE2]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
            }`}
          >
            <cat.Icon className="w-3.5 h-3.5" />
            {language === 'ar' ? cat.labelAr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Accordion */}
      {filtered.length === 0 ? (
        <div className={`text-center py-20 text-gray-400 ${fontClass}`}>
          {language === 'ar' ? 'لا توجد نتائج مطابقة' : 'No results match your search'}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = openId === item.id;
            const catLabel = faqCategories.find(c => c.id === item.catId);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-[#2BAAE2] shadow-[0_8px_24px_rgba(43,170,226,0.15)]' : 'border-gray-100 shadow-sm hover:border-[#2BAAE2]/40'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-start ${fontClass}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isOpen ? 'bg-[#2BAAE2] text-white' : 'bg-[#2BAAE2]/10 text-[#2BAAE2]'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className={`font-semibold text-gray-800 text-sm leading-snug ${isOpen ? 'text-[#2BAAE2]' : ''}`}>
                        {language === 'ar' ? item.questionAr : item.questionEn}
                      </p>
                      {catLabel && (
                        <span className="text-xs text-gray-400 mt-0.5 block">
                          {language === 'ar' ? catLabel.labelAr : catLabel.labelEn}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 text-[#2BAAE2] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 pt-0 ${fontClass}`}>
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {language === 'ar' ? item.answerAr : item.answerEn}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'media',        labelKey: 'mediaCenter.tab.media',        Icon: Library },
  { id: 'publications', labelKey: 'mediaCenter.tab.publications',  Icon: BookOpen },
  { id: 'reports',      labelKey: 'mediaCenter.tab.reports',       Icon: BarChart3 },
  { id: 'guidelines',   labelKey: 'mediaCenter.tab.guidelines',    Icon: ClipboardList },
  { id: 'faqs',         labelKey: 'mediaCenter.tab.faqs',          Icon: MessageCircleQuestion },
];

const MEDIA_FILTERS = [
  { id: 'all',          labelKey: 'mediaCenter.filter.all' },
  { id: 'video',        labelKey: 'mediaCenter.filter.video' },
  { id: 'image',        labelKey: 'mediaCenter.filter.image' },
  { id: 'infographic',  labelKey: 'mediaCenter.filter.infographic' },
];

const ITEMS_PER_PAGE_MEDIA = 9;
const ITEMS_PER_PAGE_DOCS  = 6;

export default function MediaCenter() {
  const [activeTab, setActiveTab]       = useState('media');
  const [mediaFilter, setMediaFilter]   = useState('all');
  const [searchQuery, setSearchQuery]   = useState('');
  const [currentPage, setCurrentPage]   = useState(1);
  const { t, language }                 = useI18n();
  const fontClass                       = language === 'ar' ? 'font-arabic' : 'font-sans';
  const videoRef                        = useVideoAutoplay();

  useSEO({
    path: '/media-center',
    titleAr: 'مكتبة الوسائط | تجمع نجران الصحي',
    titleEn: 'Media Library | Najran Health Cluster',
    descriptionAr: 'مكتبة متكاملة من المواد الإعلامية والمطبوعات والتقارير والإرشادات الصحية لتجمع نجران الصحي.',
    descriptionEn: 'An integrated library of media materials, publications, reports, and health guidelines from Najran Health Cluster.',
  }, language);

  // Reset page when tab / filter / search changes
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setMediaFilter('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleFilterChange = (id: string) => {
    setMediaFilter(id);
    setCurrentPage(1);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  // Filtered media items
  const filteredMedia = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesFilter = mediaFilter === 'all' || item.type === mediaFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [mediaFilter, searchQuery]);

  const filteredPublications = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return publicationItems.filter(item => !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredReports = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return reportItems.filter(item => !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredGuidelines = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return guidelineItems.filter(item => !q || item.titleAr.includes(q) || item.titleEn.toLowerCase().includes(q));
  }, [searchQuery]);

  // Pagination
  const paginatedMedia        = filteredMedia.slice((currentPage - 1) * ITEMS_PER_PAGE_MEDIA, currentPage * ITEMS_PER_PAGE_MEDIA);
  const paginatedPublications = filteredPublications.slice((currentPage - 1) * ITEMS_PER_PAGE_DOCS, currentPage * ITEMS_PER_PAGE_DOCS);
  const paginatedReports      = filteredReports.slice((currentPage - 1) * ITEMS_PER_PAGE_DOCS, currentPage * ITEMS_PER_PAGE_DOCS);
  const paginatedGuidelines   = filteredGuidelines.slice((currentPage - 1) * ITEMS_PER_PAGE_DOCS, currentPage * ITEMS_PER_PAGE_DOCS);

  const totalPages = activeTab === 'media'
    ? Math.ceil(filteredMedia.length / ITEMS_PER_PAGE_MEDIA)
    : activeTab === 'publications'
    ? Math.ceil(filteredPublications.length / ITEMS_PER_PAGE_DOCS)
    : activeTab === 'reports'
    ? Math.ceil(filteredReports.length / ITEMS_PER_PAGE_DOCS)
    : activeTab === 'guidelines'
    ? Math.ceil(filteredGuidelines.length / ITEMS_PER_PAGE_DOCS)
    : 1; // faqs — no pagination

  return (
    <div className="min-h-screen overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="hero-section relative py-32 overflow-hidden" style={{ backgroundColor: '#004070', minHeight: '65vh' }}>
          <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="https://cmsapi.health.sa/background.mp4-n92g3n.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 dark:bg-black/50 pointer-events-none z-[2] transition-colors duration-300" />

          <div className="container-custom relative z-20">
            <motion.div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Library className="w-10 h-10 text-[#2BAAE2]" />
              </div>
              <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {t('mediaCenter.title')}
              </h1>
              <p className={`text-white/80 ${fontClass} max-w-3xl mx-auto text-lg`}>
                {t('mediaCenter.desc')}
              </p>
            </motion.div>
          </div>

          {/* White panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[100]">
            <div className="bg-white rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] px-3 pt-4 md:px-8 md:pt-8 pb-0">
              <div className="container-custom">
                <div className="grid grid-cols-3 gap-2 md:gap-6 -translate-y-6">
                  {[
                    { titleAr: 'عن التجمع',            titleEn: 'About Us',           subtitleAr: 'تعرف على تجمع نجران الصحي',  subtitleEn: 'Learn about Najran Health Cluster', href: '/about' },
                    { titleAr: 'خدمات الموظفين',       titleEn: 'Employee Services',  subtitleAr: 'خدمات إدارية للموظفين',      subtitleEn: 'Services for employees',            href: '/employee-services' },
                    { titleAr: 'الأخبار والمستجدات',   titleEn: 'News',               subtitleAr: 'آخر أخبار التجمع',           subtitleEn: 'Latest cluster news',               href: '/news' },
                  ].map((card, idx) => (
                    <a key={idx} href={card.href} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-2.5 md:p-5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden relative">
                      <div className="h-1 bg-[#2BAAE2] absolute top-0 left-0 right-0 rounded-t-2xl" />
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

        {/* ── Content ── */}
        <section className="relative pt-20 md:pt-24 pb-16 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
          <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none" />
          <video autoPlay loop muted playsInline aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>

          <div className="container-custom relative z-10">

            {/* ── Tabs ── */}
            <div className="flex gap-2 flex-wrap justify-center mb-8">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${fontClass} ${
                    activeTab === tab.id
                      ? 'bg-[#004070] text-white border-[#004070] shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
                  }`}
                >
                  <tab.Icon className="w-4 h-4" />
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>

            {/* ── Search ── */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${language === 'ar' ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                placeholder={t('mediaCenter.search.placeholder')}
                className={`w-full bg-white border border-gray-200 rounded-full py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#2BAAE2] focus:ring-2 focus:ring-[#2BAAE2]/20 transition-all ${fontClass} ${language === 'ar' ? 'pr-11 pl-5' : 'pl-11 pr-5'}`}
              />
            </div>

            {/* ── Media filters ── */}
            <AnimatePresence>
              {activeTab === 'media' && (
                <motion.div
                  key="media-filters"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex gap-2 flex-wrap justify-center mb-8"
                >
                  {MEDIA_FILTERS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => handleFilterChange(f.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${fontClass} ${
                        mediaFilter === f.id
                          ? 'bg-[#2BAAE2] text-white border-[#2BAAE2]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
                      }`}
                    >
                      {t(f.labelKey)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Content panels ── */}
            <AnimatePresence mode="wait">

              {/* Media */}
              {activeTab === 'media' && (
                <motion.div key="media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedMedia.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <AnimatePresence>
                        {paginatedMedia.map(item => (
                          <MediaCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Publications */}
              {activeTab === 'publications' && (
                <motion.div key="publications" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedPublications.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedPublications.map(item => (
                        <DocumentCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} accent="bg-[#2BAAE2]" />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Reports */}
              {activeTab === 'reports' && (
                <motion.div key="reports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedReports.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedReports.map(item => (
                        <DocumentCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} accent="bg-[#004070]" />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Guidelines */}
              {activeTab === 'guidelines' && (
                <motion.div key="guidelines" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {paginatedGuidelines.length === 0 ? (
                    <div className={`text-center py-20 text-gray-400 ${fontClass}`}>{t('mediaCenter.noResults')}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paginatedGuidelines.map(item => (
                        <DocumentCard key={item.id} item={item} language={language} fontClass={fontClass} t={t} accent="bg-emerald-500" />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* FAQs */}
              {activeTab === 'faqs' && (
                <FaqPanel language={language} fontClass={fontClass} searchQuery={searchQuery} />
              )}
            </AnimatePresence>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#2BAAE2] hover:text-[#2BAAE2] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold border transition-all ${
                      currentPage === i + 1
                        ? 'bg-[#004070] text-white border-[#004070]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#2BAAE2] hover:text-[#2BAAE2]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#2BAAE2] hover:text-[#2BAAE2] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
