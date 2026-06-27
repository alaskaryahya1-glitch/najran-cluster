import { useState, useEffect, memo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Users, Heart, Stethoscope, Settings, CheckCircle2, TrendingUp, Monitor, Building2, Hospital, MapPin, Phone, Bed, Calendar, BedDouble, ChevronDown, Briefcase, Shield, FileText, Target, MessageSquare, Scale, UserCog, DollarSign, Laptop, Activity, Cog, Star, Home as HomeIcon, HeartPulse, HelpCircle, Plus, Minus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import ceoImage from "@assets/IMG_8850_1767133406852.jpeg";
import clusterStar from "@assets/logo1_2_1767081775884.png";
import aliImage from "@assets/IMG_8842_1767132761463.jpeg";
import rashidImage from "@assets/IMG_8841_1767132823617.jpeg";
import mohammedImage from "@assets/IMG_8844_1767132958441.jpeg";
import yahyaImage from "@assets/IMG_8843_1767132982183.jpeg";
import musabiImage from "@assets/IMG_8846_1767133007099.jpeg";
import ismailImage from "@assets/IMG_7535.jpg";
import mohammadMutlaqImage from "@assets/WhatsApp_Image_2026-02-23_at_2.29.03_PM_1771955205714.jpeg";
import heroImage from "@assets/0B4A4B84-6228-4A64-9958-EB4C285CB04D_1767273959627.png";
import { CardStar } from "@/components/BrandIcon";

const DeputyCard = memo(({ deputy, t, fontClass }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative p-6 rounded-2xl bg-card border hover:border-primary/50 transition-all duration-300"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
        <OptimizedImage src={deputy.image} alt={t(deputy.nameKey)} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className={`text-xl font-bold ${fontClass}`}>{t(deputy.nameKey)}</h3>
        <p className={`text-muted-foreground text-sm ${fontClass}`}>{t(deputy.titleKey)}</p>
      </div>
    </div>
  </motion.div>
));

DeputyCard.displayName = "DeputyCard";

const orgStructureData = [
  {
    id: "mohammed",
    nameKey: "about.deputy.mohammed",
    titleKey: "about.deputy.mohammed.title",
    icon: Cog,
    image: mohammedImage,
    color: "from-[#2BAAE2] to-[#1691D0]",
    departments: [
      "about.dept.facilities",
      "about.dept.procurement",
      "about.dept.engineering",
      "about.dept.supportServices",
      "about.dept.security",
    ]
  },
  {
    id: "rashid",
    nameKey: "about.deputy.rashid",
    titleKey: "about.deputy.rashid.title",
    icon: Heart,
    image: rashidImage,
    color: "from-[#1691D0] to-[#1691D0]",
    departments: [
      "about.dept.alliedHealth",
      "about.dept.nursing",
      "about.dept.populationHealth",
      "about.dept.modelOfCare",
      "about.dept.clinicalServices",
      "about.dept.publicHealth",
      "about.dept.clinicalPerformance",
    ]
  },
  {
    id: "mohammadMutlaq",
    nameKey: "about.deputy.mohammadMutlaq",
    titleKey: "about.deputy.mohammadMutlaq.title",
    icon: Stethoscope,
    image: mohammadMutlaqImage,
    color: "from-[#15508A] to-[#2BAAE2]",
    departments: [
      "about.dept.specializedCenters",
      "about.dept.generalHospitals",
      "about.dept.phcs",
      "about.dept.referralHospitals",
      "about.dept.ruralHospitals",
      "about.dept.careCenters",
    ]
  },
  {
    id: "musabi",
    nameKey: "about.deputy.musabi",
    titleKey: "about.deputy.musabi.title",
    icon: Shield,
    image: musabiImage,
    color: "from-[#1691D0] to-[#15508A]",
    departments: [
      "about.dept.patientSafety",
      "about.dept.qualityAccreditation",
      "about.dept.performanceOutcomes",
      "about.dept.patientExperience",
    ]
  },
  {
    id: "ismail",
    nameKey: "about.deputy.ismail",
    titleKey: "about.deputy.ismail.title",
    icon: Laptop,
    image: ismailImage,
    color: "from-[#1691D0] to-[#2BAAE2]",
    departments: [
      "about.dept.digitalStrategy",
      "about.dept.dataOffice",
      "about.dept.clinicalSystems",
      "about.dept.businessSolutions",
      "about.dept.infrastructure",
    ]
  },
  {
    id: "yahya",
    nameKey: "about.deputy.yahya",
    titleKey: "about.deputy.yahya.title",
    icon: DollarSign,
    image: yahyaImage,
    color: "from-[#15508A] to-[#1691D0]",
    departments: [
      "about.dept.budgeting",
      "about.dept.financeOperations",
      "about.dept.spendingEfficiency",
      "about.dept.revenueManagement",
      "about.dept.records",
      "about.dept.financeTransformation",
    ]
  },
  {
    id: "ali",
    nameKey: "about.deputy.ali",
    titleKey: "about.deputy.ali.title",
    icon: Users,
    image: aliImage,
    color: "from-[#1691D0] to-[#2BAAE2]",
    departments: [
      "about.dept.payroll",
      "about.dept.hrPlanning",
      "about.dept.hrOperations",
      "about.dept.recruitment",
    ]
  },
];

const hospitalsData = [
  {
    nameKey: "about.hospital.westNajranShort",
    descKey: "about.hospital.westNajranShort.desc",
    searchQuery: "مستشفى غرب نجران للولادة والأطفال",
    beds: 50,
    established: null,
    phone: null,
    website: null,
    serviceKeys: ["about.service.obgyn", "about.service.pediatrics", "about.service.outpatient"]
  },
  {
    nameKey: "about.hospital.kingKhaledShort",
    descKey: "about.hospital.kingKhaledShort.desc",
    searchQuery: "مستشفى الملك خالد نجران",
    beds: 300,
    established: "1404هـ",
    phone: "017-529-0000",
    website: null,
    serviceKeys: ["about.service.emergency24", "about.service.icu", "about.service.cardiacCath", "about.service.outpatient"]
  },
  {
    nameKey: "about.hospital.eradahShort",
    descKey: "about.hospital.eradahShort.desc",
    searchQuery: "مجمع إرادة والصحة النفسية نجران",
    beds: null,
    established: null,
    phone: "017 540 6000",
    website: null,
    serviceKeys: ["about.service.mentalHealth", "about.service.addictionTreatment", "about.service.psychRehab", "about.service.halfwayHouse"]
  },
  {
    nameKey: "about.hospital.maternityShort",
    descKey: "about.hospital.maternityShort.desc",
    searchQuery: "مستشفى الولادة والأطفال نجران",
    beds: 200,
    established: null,
    phone: "017-529-5000",
    website: null,
    serviceKeys: ["about.service.obgyn", "about.service.pediatrics", "about.service.surgery", "about.service.outpatient"]
  },
  {
    nameKey: "about.hospital.sharurahShort",
    descKey: "about.hospital.sharurahShort.desc",
    searchQuery: "مستشفى شرورة العام",
    beds: null,
    established: null,
    phone: "075321457",
    website: null,
    serviceKeys: ["about.service.emergency", "about.service.internal", "about.service.generalSurgery", "about.service.obgyn", "about.service.pediatrics"]
  },
  {
    nameKey: "about.hospital.habunaShort",
    descKey: "about.hospital.habunaShort.desc",
    searchQuery: "مستشفى حبونا العام نجران",
    beds: null,
    established: null,
    phone: "0175452413",
    website: "https://habuna-gh.org/",
    serviceKeys: ["about.service.emergency", "about.service.generalSurgery", "about.service.obgyn", "about.service.dialysis"]
  },
  {
    nameKey: "about.hospital.tharShort",
    descKey: "about.hospital.tharShort.desc",
    searchQuery: "مستشفى ثار العام نجران",
    beds: 50,
    established: "1433هـ",
    phone: null,
    website: null,
    serviceKeys: ["about.service.emergency", "about.service.operations", "about.service.icu", "about.service.outpatient"]
  },
  {
    nameKey: "about.hospital.yadamahShort",
    descKey: "about.hospital.yadamahShort.desc",
    searchQuery: "مستشفى يدمة العام نجران",
    beds: null,
    established: "1431هـ",
    phone: "0175455529",
    website: null,
    serviceKeys: ["about.service.emergency", "about.service.operations", "about.service.delivery", "about.service.physicalTherapy"]
  },
  {
    nameKey: "about.hospital.badrSouthShort",
    descKey: "about.hospital.badrSouthShort.desc",
    searchQuery: "مستشفى بدر الجنوب نجران",
    beds: 50,
    established: "2012م",
    phone: null,
    website: null,
    serviceKeys: ["about.service.generalSurgery", "about.service.internal", "about.service.obgyn", "about.service.dialysis"]
  },
  {
    nameKey: "about.hospital.khubashShort",
    descKey: "about.hospital.khubashShort.desc",
    searchQuery: "مستشفى خباش العام نجران",
    beds: 50,
    established: null,
    phone: null,
    website: null,
    serviceKeys: ["about.service.emergency", "about.service.outpatient", "about.service.generalSurgery", "about.service.lab"]
  },
  {
    nameKey: "about.hospital.najranGeneralNew",
    descKey: "about.hospital.najranGeneralNew.desc",
    searchQuery: "مستشفي نجران العام (الشرفة)",
    beds: 200,
    established: "1436هـ",
    phone: "175227374",
    website: null,
    serviceKeys: ["about.service.emergency", "about.service.icu", "about.service.digitalOperations", "about.service.dialysis"]
  },
];

const specializedCentersData = [
  {
    nameKey: "about.specializedCenter.dental",
    descKey: "about.specializedCenter.dental.desc",
    searchQuery: "مركز طب الأسنان التخصصي نجران",
    serviceKeys: ["about.service.dentalTreatment", "about.service.orthodontics", "about.service.oralSurgery", "about.service.cosmeticDentistry"],
    phone: null
  },
];

const healthCentersData = [
  { ar: "مركز الرعاية الصحية الأولية - الفيصلية", en: "Al-Faisaliyah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الفيصلية نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الضباط", en: "Al-Dhubat PHC", searchQuery: "مركز الرعاية الصحية الأولية - الضباط نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الحضن", en: "Al-Hadn PHC", searchQuery: "مركز الرعاية الصحية الأولية - الحضن نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الشرفة", en: "Al-Shurfa PHC", searchQuery: "مركز الرعاية الصحية الأولية - الشرفة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - مراطة", en: "Marata PHC", searchQuery: "مركز الرعاية الصحية الأولية - مراطة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - إسكان قوى الامن", en: "Security Forces Housing PHC", searchQuery: "مركز الرعاية الصحية الأولية - إسكان قوى الامن شرورة" },
  { ar: "مركز الرعاية الصحية الأولية - الاثايبة", en: "Al-Athaybah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الاثايبة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - البلد", en: "Al-Balad PHC", searchQuery: "مركز الرعاية الصحية الأولية - البلد نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الجربة", en: "Al-Jarbah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الجربة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الجفة", en: "Al-Jaffah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الجفة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الحرشف", en: "Al-Harshaf PHC", searchQuery: "مركز الرعاية الصحية الأولية - الحرشف نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الحصينية", en: "Al-Hasayniyah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الحصينية نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الحمر", en: "Al-Humar PHC", searchQuery: "مركز الرعاية الصحية الأولية - الحمر نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الخالدية", en: "Al-Khalidiyah PHC (Najran)", searchQuery: "مركز الرعاية الصحية الأولية - الخالدية نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الخالدية شرورة", en: "Al-Khalidiyah PHC (Sharurah)", searchQuery: "مركز الرعاية الصحية الأولية - الخالدية شرورة" },
  { ar: "مركز الرعاية الصحية الأولية - الخانق", en: "Al-Khaniq PHC", searchQuery: "مركز الرعاية الصحية الأولية - الخانق نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الرحاب", en: "Al-Rehab PHC", searchQuery: "مركز الرعاية الصحية الأولية - الرحاب نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الشبهان", en: "Al-Shabhan PHC", searchQuery: "مركز الرعاية الصحية الأولية - الشبهان نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الصفا", en: "Al-Safa PHC", searchQuery: "مركز الرعاية الصحية الأولية - الصفا نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الصفاح", en: "Al-Safah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الصفاح نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الضيافة", en: "Al-Diyafah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الضيافة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الضيقة", en: "Al-Dayqah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الضيقة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - العريسة", en: "Al-Uraysa PHC", searchQuery: "مركز الرعاية الصحية الأولية - العريسة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - العزيزية", en: "Al-Aziziyah PHC", searchQuery: "مركز الرعاية الصحية الأولية - العزيزية شرورة" },
  { ar: "مركز الرعاية الصحية الأولية - الغويلا", en: "Al-Ghuwayla PHC", searchQuery: "مركز الرعاية الصحية الأولية - الغويلا نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الفهد الجنوبي", en: "South Al-Fahd PHC", searchQuery: "مركز الرعاية الصحية الأولية - الفهد الجنوبي نجران" },
  { ar: "مركز الرعاية الصحية الأولية - القابل", en: "Al-Qabil PHC", searchQuery: "مركز الرعاية الصحية الأولية - القابل نجران" },
  { ar: "مركز الرعاية الصحية الأولية - القرن", en: "Al-Qarn PHC", searchQuery: "مركز الرعاية الصحية الأولية - القرن نجران" },
  { ar: "مركز الرعاية الصحية الأولية - اللجام", en: "Al-Lijam PHC", searchQuery: "مركز الرعاية الصحية الأولية - اللجام نجران" },
  { ar: "مركز الرعاية الصحية الأولية - المجمع", en: "Al-Mujamma PHC", searchQuery: "مركز الرعاية الصحية الأولية - المجمع نجران" },
  { ar: "مركز الرعاية الصحية الأولية - المحمدية", en: "Al-Muhammadiyah PHC", searchQuery: "مركز الرعاية الصحية الأولية - المحمدية نجران" },
  { ar: "مركز الرعاية الصحية الأولية - المشعلية", en: "Al-Mish'aliyah PHC", searchQuery: "مركز الرعاية الصحية الأولية - المشعلية نجران" },
  { ar: "مركز الرعاية الصحية الأولية - المليحة", en: "Al-Malihah PHC", searchQuery: "مركز الرعاية الصحية الأولية - المليحة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الموفجة", en: "Al-Mawfajah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الموفجة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - أبا السعود", en: "Aba Al-Saud PHC", searchQuery: "مركز الرعاية الصحية الأولية - أبا السعود نجران" },
  { ar: "مركز الرعاية الصحية الأولية - بدر الجنوب", en: "Badr Al-Janoub PHC", searchQuery: "مركز الرعاية الصحية الأولية - بدر الجنوب نجران" },
  { ar: "مركز الرعاية الصحية الأولية - برك", en: "Bark PHC", searchQuery: "مركز الرعاية الصحية الأولية - برك نجران" },
  { ar: "مركز الرعاية الصحية الأولية - بئر عسكر", en: "Bir Askar PHC", searchQuery: "مركز الرعاية الصحية الأولية - بئر عسكر نجران" },
  { ar: "مركز الرعاية الصحية الأولية - تلاع", en: "Tala' PHC", searchQuery: "مركز الرعاية الصحية الأولية - تلاع نجران" },
  { ar: "مركز الرعاية الصحية الأولية - تماني", en: "Tamani PHC", searchQuery: "مركز الرعاية الصحية الأولية - تماني نجران" },
  { ar: "مركز الرعاية الصحية الأولية - ثار", en: "Thar PHC", searchQuery: "مركز الرعاية الصحية الأولية - ثار نجران" },
  { ar: "مركز الرعاية الصحية الأولية - حبونا", en: "Habuna PHC", searchQuery: "مركز الرعاية الصحية الأولية - حبونا نجران" },
  { ar: "مركز الرعاية الصحية الأولية - حما", en: "Hama PHC", searchQuery: "مركز الرعاية الصحية الأولية - حما نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الفهد الشمالي", en: "North Al-Fahd PHC", searchQuery: "مركز الرعاية الصحية الأولية - الفهد الشمالي نجران" },
  { ar: "مركز الرعاية الصحية الأولية - دحضة", en: "Dahda PHC", searchQuery: "مركز الرعاية الصحية الأولية - دحضة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - رجلاء", en: "Rajla PHC", searchQuery: "مركز الرعاية الصحية الأولية - رجلاء نجران" },
  { ar: "مركز الرعاية الصحية الأولية - وادي ريمان", en: "Wadi Riman PHC", searchQuery: "مركز الرعاية الصحية الأولية - وادي ريمان نجران" },
  { ar: "مركز الرعاية الصحية الأولية - سلطانة", en: "Sultanah PHC (Najran)", searchQuery: "مركز الرعاية الصحية الأولية - سلطانة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - سلطانة شرورة", en: "Sultanah PHC (Sharurah)", searchQuery: "مركز الرعاية الصحية الأولية - سلطانة شرورة" },
  { ar: "مركز الرعاية الصحية الأولية - طلحام", en: "Talham PHC", searchQuery: "مركز الرعاية الصحية الأولية - طلحام نجران" },
  { ar: "مركز الرعاية الصحية الأولية - قطن", en: "Qutn PHC", searchQuery: "مركز الرعاية الصحية الأولية - قطن نجران" },
  { ar: "مركز الرعاية الصحية الأولية - نعوان", en: "Na'wan PHC", searchQuery: "مركز الرعاية الصحية الأولية - نعوان نجران" },
  { ar: "مركز الرعاية الصحية الأولية - هدادة", en: "Hadada PHC", searchQuery: "مركز الرعاية الصحية الأولية - هدادة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - وادي وسط", en: "Wadi Wasat PHC", searchQuery: "مركز الرعاية الصحية الأولية - وادي وسط نجران" },
  { ar: "مركز الرعاية الصحية الأولية - يدمة", en: "Yadamah PHC", searchQuery: "مركز الرعاية الصحية الأولية - يدمة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الخرعاء", en: "Al-Khara'a PHC", searchQuery: "مركز الرعاية الصحية الأولية - الخرعاء نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الروضة الشمالية", en: "North Al-Rawdah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الروضة الشمالية نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الكنتوب", en: "Al-Kantub PHC", searchQuery: "مركز الرعاية الصحية الأولية - الكنتوب نجران" },
  { ar: "مركز الرعاية الصحية الأولية - المنتشر", en: "Al-Muntashir PHC", searchQuery: "مركز الرعاية الصحية الأولية - المنتشر نجران" },
  { ar: "مركز الرعاية الصحية الأولية - تصلال", en: "Taslal PHC", searchQuery: "مركز الرعاية الصحية الأولية - تصلال نجران" },
  { ar: "مركز الرعاية الصحية الأولية - جنوب المطار", en: "South Airport PHC", searchQuery: "مركز الرعاية الصحية الأولية - جنوب المطار نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الأمير مشعل", en: "Prince Mishal PHC", searchQuery: "مركز الرعاية الصحية الأولية - الأمير مشعل نجران" },
  { ar: "مركز الرعاية الصحية الأولية - خباش", en: "Khubash PHC", searchQuery: "مركز الرعاية الصحية الأولية - خباش نجران" },
  { ar: "مركز الرعاية الصحية الأولية - شعب رير", en: "Shi'b Rir PHC", searchQuery: "مركز الرعاية الصحية الأولية - شعب رير نجران" },
  { ar: "مركز الرعاية الصحية الأولية - نهوقة", en: "Nahuqah PHC", searchQuery: "مركز الرعاية الصحية الأولية - نهوقة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الوديعة", en: "Al-Wadiah PHC", searchQuery: "مركز الرعاية الصحية الأولية - الوديعة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - عاكفة", en: "Akifah PHC", searchQuery: "مركز الرعاية الصحية الأولية - عاكفة نجران" },
  { ar: "مركز الرعاية الصحية الأولية - الاخاشيم", en: "Al-Akhashim PHC", searchQuery: "مركز الرعاية الصحية الأولية - الاخاشيم نجران" },
  { ar: "مركز الرعاية الصحية الأولية - المنخلي", en: "Al-Mankhali PHC", searchQuery: "مركز الرعاية الصحية الأولية - المنخلي نجران" },
];

export default function About() {
  const [showHospitals, setShowHospitals] = useState(false);
  const [showSpecializedCenters, setShowSpecializedCenters] = useState(false);
  const [showHealthCenters, setShowHealthCenters] = useState(false);
  const [expandedDeputy, setExpandedDeputy] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { t, language } = useI18n();

  useSEO({
    path: '/about',
    titleAr: 'من نحن | تجمع نجران الصحي - الخدمات والمستشفيات والقيادة',
    titleEn: 'About Us | Najran Health Cluster - Services, Hospitals & Leadership',
    descriptionAr: 'تجمع نجران الصحي - تعرف على خدماتنا الصحية، مستشفياتنا الـ12، مراكز الرعاية الصحية الأولية الـ69، والقيادة التنفيذية. نخدم أكثر من 495 ألف مستفيد في منطقة نجران.',
    descriptionEn: 'Najran Health Cluster - Learn about our healthcare services, 12 hospitals, 69 primary healthcare centers, and executive leadership. Serving 495,000+ beneficiaries in Najran Region.',
  }, language);

  const faqItems = [
    { questionKey: "about.faq.q1", answerKey: "about.faq.a1" },
    { questionKey: "about.faq.q2", answerKey: "about.faq.a2" },
    { questionKey: "about.faq.q3", answerKey: "about.faq.a3" },
    { questionKey: "about.faq.q4", answerKey: "about.faq.a4" },
    { questionKey: "about.faq.q5", answerKey: "about.faq.a5" },
  ];

  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "@id": "https://najrancluster.com/#organization",
      "name": language === 'ar' ? "تجمع نجران الصحي" : "Najran Health Cluster",
      "alternateName": language === 'ar' ? "Najran Health Cluster" : "تجمع نجران الصحي",
      "url": "https://najrancluster.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://najrancluster.com/favicon.png",
        "width": 512,
        "height": 512
      },
      "description": language === 'ar'
        ? "تجمع نجران الصحي هو أحد التجمعات الصحية التابعة لشركة الصحة القابضة في المملكة العربية السعودية، يقدم خدماته لأكثر من 495 ألف مستفيد عبر 12 مستشفى و69 مركز رعاية صحية أولية"
        : "Najran Health Cluster is one of the health clusters under the Health Holding Company in Saudi Arabia, serving over 495,000 beneficiaries through 12 hospitals and 69 primary healthcare centers",
      "foundingDate": "2021",
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": language === 'ar' ? "منطقة نجران" : "Najran Region"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": language === 'ar' ? "نجران" : "Najran",
        "addressCountry": "SA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "017 540 6000",
        "contactType": "customer service",
        "availableLanguage": ["Arabic", "English"]
      },
      "sameAs": [
        "https://twitter.com/NajranCluster",
        "https://www.linkedin.com/company/najrancluster"
      ],
      "parentOrganization": {
        "@type": "Organization",
        "name": language === 'ar' ? "شركة الصحة القابضة" : "Health Holding Company"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": 5000
      },
      "medicalSpecialty": [
        "Emergency Medicine",
        "Cardiology",
        "Pediatrics",
        "Obstetrics",
        "Mental Health",
        "Primary Care",
        "Dentistry"
      ]
    };

    const leadershipSchema = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": language === 'ar' ? "عمر بن أحمد الزهراني" : "Omar bin Ahmed Al-Zahrani",
        "jobTitle": language === 'ar' ? "الرئيس التنفيذي لتجمع نجران الصحي" : "CEO of Najran Health Cluster",
        "worksFor": {
          "@type": "Organization",
          "@id": "https://najrancluster.com/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": language === 'ar' ? "د. راشد بن علي الوادعي" : "Dr. Rashid bin Ali Al-Wadai",
        "jobTitle": language === 'ar' ? "نائب الرئيس التنفيذي للخدمات الطبية" : "Deputy CEO for Medical Services",
        "worksFor": { "@type": "Organization", "@id": "https://najrancluster.com/#organization" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": language === 'ar' ? "عبدالله بن مسعبي آل مهري" : "Abdullah bin Musabi Al-Mahri",
        "jobTitle": language === 'ar' ? "نائب الرئيس التنفيذي للجودة والتميز المؤسسي" : "Deputy CEO for Quality & Institutional Excellence",
        "worksFor": { "@type": "Organization", "@id": "https://najrancluster.com/#organization" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": language === 'ar' ? "محمد بن عبدالله آل جابر" : "Mohammed bin Abdullah Al-Jaber",
        "jobTitle": language === 'ar' ? "نائب الرئيس التنفيذي للخدمات المساندة" : "Deputy CEO for Support Services",
        "worksFor": { "@type": "Organization", "@id": "https://najrancluster.com/#organization" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": language === 'ar' ? "إسماعيل بن أحمد الهبيل" : "Ismail bin Ahmed Al-Hubail",
        "jobTitle": language === 'ar' ? "نائب الرئيس التنفيذي للتحول الرقمي" : "Deputy CEO for Digital Transformation",
        "worksFor": { "@type": "Organization", "@id": "https://najrancluster.com/#organization" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": language === 'ar' ? "يحيى بن أحمد اليامي" : "Yahya bin Ahmed Al-Yami",
        "jobTitle": language === 'ar' ? "نائب الرئيس التنفيذي للشؤون المالية" : "Deputy CEO for Financial Affairs",
        "worksFor": { "@type": "Organization", "@id": "https://najrancluster.com/#organization" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": language === 'ar' ? "علي بن سعيد اليامي" : "Ali bin Saeed Al-Yami",
        "jobTitle": language === 'ar' ? "نائب الرئيس التنفيذي للموارد البشرية" : "Deputy CEO for Human Resources",
        "worksFor": { "@type": "Organization", "@id": "https://najrancluster.com/#organization" }
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": t(item.questionKey),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t(item.answerKey)
        }
      }))
    };

    const combinedSchema = [organizationSchema, ...leadershipSchema, faqSchema];

    const existingScript = document.getElementById('about-structured-data');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'about-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(combinedSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('about-structured-data');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [language, t]);

  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* ===== NEW: Hero Section ===== */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#005d47', minHeight: '50vh' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          >
            <source src="https://cmsapi.health.sa/about-video.mp4-ri13td.mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 text-center text-white px-4 py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${fontClass}`}>
                {language === 'ar' ? 'قصة التحول الصحي في نجران' : 'Najran Health Transformation Story'}
              </h1>
              <p className={`text-white/70 text-lg ${fontClass}`}>
                {language === 'ar'
                  ? 'نحن نبني مستقبلاً صحياً واعداً لأكثر من نصف مليون إنسان'
                  : 'Building a healthy future for over half a million people'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== NEW: About Section ===== */}
        <section className="relative py-10 md:py-16 overflow-hidden bg-white">
          {/* زخرفة خلفية خفية */}
          <video autoPlay loop muted playsInline aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
            <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
          </video>

          <div className="container-custom relative z-10">
            <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${language === 'ar' ? '' : 'lg:flex-row-reverse'}`}>

              {/* النص والإحصائيات */}
              <motion.div
                className="lg:w-1/2 space-y-6"
                initial={{ opacity: 0, x: language === 'ar' ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span
                  className={`font-bold text-sm tracking-[0.2em] uppercase pr-3 ${fontClass} ${language === 'ar' ? 'border-r-4' : 'border-l-4 pl-3 pr-0'}`}
                  style={{ color: '#004d3a', borderColor: '#004d3a' }}
                >
                  {language === 'ar' ? 'قصة التحول' : 'Our Story'}
                </span>

                <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2] ${fontClass}`}>
                  {language === 'ar' ? (
                    <>تجمع نجران الصحي.. <br /> <span style={{ color: '#004d3a' }}>التزام بالتميز الطبي</span></>
                  ) : (
                    <>Najran Health Cluster.. <br /> <span style={{ color: '#004d3a' }}>Commitment to Medical Excellence</span></>
                  )}
                </h2>

                <p className={`text-lg text-gray-600 leading-relaxed ${fontClass}`}>
                  {language === 'ar'
                    ? 'نحن لسنا مجرد شبكة مستشفيات، بل منظومة صحية متكاملة تهدف إلى إعادة صياغة مفهوم الرعاية الصحية في منطقة نجران، واضعين سلامة المستفيد وجودة الخدمة في قمة أولوياتنا.'
                    : 'We are not just a network of hospitals, but a comprehensive healthcare system aimed at redefining healthcare in the Najran region, placing beneficiary safety and service quality at the top of our priorities.'}
                </p>

                {/* الإحصائيات */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="text-3xl font-bold" style={{ color: '#004d3a' }}>12</h4>
                    <p className={`text-sm text-gray-500 font-medium ${fontClass}`}>
                      {language === 'ar' ? 'مستشفى متخصص' : 'Specialized Hospitals'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="text-3xl font-bold" style={{ color: '#004d3a' }}>69</h4>
                    <p className={`text-sm text-gray-500 font-medium ${fontClass}`}>
                      {language === 'ar' ? 'مركز رعاية أولية' : 'Primary Care Centers'}
                    </p>
                  </div>
                  <div
                    className={`col-span-2 p-4 rounded-2xl flex justify-between items-center ${language === 'ar' ? '' : 'flex-row-reverse'}`}
                    style={{ backgroundColor: '#004d3a' }}
                  >
                    <span className={`text-white text-lg font-medium ${fontClass}`}>
                      {language === 'ar' ? 'إجمالي المستفيدين في المنطقة' : 'Total Beneficiaries in the Region'}
                    </span>
                    <span className="text-white text-2xl font-bold font-sans">+495,000</span>
                  </div>
                </div>
              </motion.div>

              {/* الصورة */}
              <motion.div
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="overflow-hidden border-[6px] border-white"
                  style={{
                    borderRadius: '50px 15px 50px 15px',
                    boxShadow: '20px 20px 0px 0px rgba(0, 77, 58, 0.05)',
                  }}
                >
                  <img
                    src={heroImage}
                    alt={t("about.title")}
                    className="w-full object-cover"
                    style={{ height: '450px' }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ===== Leadership Section ===== */}
        <section className="py-20 md:py-24" style={{ backgroundColor: '#f8fafc' }}>
          <div className="container-custom text-center">

            {/* العنوان */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={`font-bold text-sm tracking-widest uppercase ${fontClass}`} style={{ color: '#004d3a' }}>
                {language === 'ar' ? 'الفريق القيادي' : 'Leadership Team'}
              </span>
              <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mt-4 ${fontClass}`}>
                {language === 'ar' ? 'الإدارة التنفيذية' : 'Executive Management'}
              </h2>
              <div className="w-24 h-1.5 mx-auto mt-6 rounded-full" style={{ backgroundColor: '#004d3a' }}></div>
            </motion.div>

            {/* شبكة القادة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { image: ceoImage, nameKey: "about.ceo.name", titleKey: "about.ceo" },
                { image: rashidImage, nameKey: "about.deputy.rashid", titleKey: "about.deputy.rashid.title" },
                { image: mohammedImage, nameKey: "about.deputy.mohammed", titleKey: "about.deputy.mohammed.title" },
                { image: mohammadMutlaqImage, nameKey: "about.deputy.mohammadMutlaq", titleKey: "about.deputy.mohammadMutlaq.title" },
                { image: musabiImage, nameKey: "about.deputy.musabi", titleKey: "about.deputy.musabi.title" },
                { image: ismailImage, nameKey: "about.deputy.ismail", titleKey: "about.deputy.ismail.title" },
                { image: yahyaImage, nameKey: "about.deputy.yahya", titleKey: "about.deputy.yahya.title" },
                { image: aliImage, nameKey: "about.deputy.ali", titleKey: "about.deputy.ali.title" },
              ].map((leader, idx) => (
                <motion.div
                  key={idx}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                >
                  <div
                    className="bg-white rounded-[3.5rem] p-8 shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-4"
                  >
                    <div className="aspect-square overflow-hidden rounded-[2.5rem] mb-8 bg-gray-50">
                      <img
                        src={leader.image}
                        alt={t(leader.nameKey)}
                        className="w-full h-full object-cover object-top transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
                      />
                    </div>
                    <h4 className={`text-xl font-bold text-gray-900 mb-2 ${fontClass}`}>{t(leader.nameKey)}</h4>
                    <p className={`font-semibold tracking-wide text-sm ${fontClass}`} style={{ color: '#004d3a' }}>
                      {t(leader.titleKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ===== Cluster Services Section ===== */}
        <section className="relative py-10 sm:py-12 md:py-16 overflow-hidden" style={{ backgroundColor: '#000e22' }}>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>

          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8 text-center mb-6 sm:mb-8 md:mb-10 relative overflow-hidden"
            >
              <CardStar size="lg" />
              <div className="h-1.5 bg-[#2BAAE2] absolute top-0 left-0 right-0"></div>
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${fontClass} text-white mb-3 relative z-10`}>
                {t("home.clusterServices.title")}
              </h2>
              <p className={`text-white text-lg ${fontClass} relative z-10`}>
                {t("home.clusterServices.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
              {[
                { id: 'homecare', icon: HomeIcon },
                { id: 'primary', icon: Stethoscope },
                { id: 'specialized', icon: HeartPulse },
                { id: 'virtual', icon: Monitor },
              ].map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 text-center relative"
                >
                  <CardStar size="md" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-6 relative z-10">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-[#2BAAE2]" />
                    </div>
                    <h3 className={`text-lg font-bold text-white ${fontClass} mb-3`}>
                      {t(`home.clusterServices.${service.id}.title`)}
                    </h3>
                    <p className={`text-white/80 text-sm ${fontClass}`}>
                      {t(`home.clusterServices.${service.id}.desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Healthcare Facilities Section ===== */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#001228' }}>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>

          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h2 className={`text-2xl md:text-3xl font-bold text-white ${fontClass} mb-2`}>{t("about.facilities")}</h2>
              <p className={`text-white/80 ${fontClass}`}>{t("about.facilities.subtitle")}</p>
            </motion.div>

            <div className="bg-white/5 backdrop-blur-md text-white rounded-2xl overflow-hidden border border-white/10 relative">
              <CardStar size="lg" />
              <div className="h-1.5 bg-[#2BAAE2]"></div>
              <div className="py-4 px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  <button
                    onClick={() => { setShowHospitals(!showHospitals); setShowSpecializedCenters(false); setShowHealthCenters(false); }}
                    className={`text-center cursor-pointer rounded-lg py-2 transition-all ${showHospitals ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    data-testid="button-hospitals"
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 opacity-80 text-[#2BAAE2] brand-icon" />
                    <p className="text-xl font-bold">11</p>
                    <p className={`text-white/90 ${fontClass} text-xs`}>{t("about.hospitals")}</p>
                    <ChevronDown className={`w-4 h-4 mx-auto mt-1 opacity-60 transition-transform text-[#2BAAE2] ${showHospitals ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    onClick={() => { setShowSpecializedCenters(!showSpecializedCenters); setShowHospitals(false); setShowHealthCenters(false); }}
                    className={`text-center cursor-pointer rounded-lg py-2 transition-all ${showSpecializedCenters ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    data-testid="button-specialized-centers"
                  >
                    <Hospital className="w-5 h-5 mx-auto mb-1 opacity-80 text-[#2BAAE2] brand-icon" />
                    <p className="text-xl font-bold">1</p>
                    <p className={`text-white/90 ${fontClass} text-xs`}>{t("about.specializedCenters")}</p>
                    <ChevronDown className={`w-4 h-4 mx-auto mt-1 opacity-60 transition-transform text-[#2BAAE2] ${showSpecializedCenters ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    onClick={() => { setShowHealthCenters(!showHealthCenters); setShowHospitals(false); setShowSpecializedCenters(false); }}
                    className={`text-center cursor-pointer rounded-lg py-2 transition-all ${showHealthCenters ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    data-testid="button-health-centers"
                  >
                    <Stethoscope className="w-5 h-5 mx-auto mb-1 opacity-80 text-[#2BAAE2] brand-icon" />
                    <p className="text-xl font-bold">69</p>
                    <p className={`text-white/90 ${fontClass} text-xs`}>{t("about.healthCenters")}</p>
                    <ChevronDown className={`w-4 h-4 mx-auto mt-1 opacity-60 transition-transform text-[#2BAAE2] ${showHealthCenters ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="text-center py-2">
                    <Users className="w-5 h-5 mx-auto mb-1 opacity-80 text-[#2BAAE2] brand-icon" />
                    <p className="text-xl font-bold">495K+</p>
                    <p className={`text-white/90 ${fontClass} text-xs`}>{t("about.beneficiaries")}</p>
                  </div>
                  <div className="text-center py-2">
                    <BedDouble className="w-5 h-5 mx-auto mb-1 opacity-80 text-[#2BAAE2] brand-icon" />
                    <p className="text-xl font-bold">1,300</p>
                    <p className={`text-white/90 ${fontClass} text-xs`}>{t("about.beds")}</p>
                  </div>
                </div>

                {/* Hospitals List */}
                <AnimatePresence>
                  {showHospitals && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <h4 className={`text-center ${fontClass} font-bold mb-3`}>{t("about.hospitalsList")}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {hospitalsData.map((hospital, idx) => (
                            <Tooltip key={hospital.nameKey} delayDuration={200}>
                              <TooltipTrigger asChild>
                                <motion.a
                                  href={hospital.website || `https://www.google.com/maps/search/${encodeURIComponent(hospital.searchQuery)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/10 rounded-lg px-3 py-2 text-center hover:bg-white/20 transition-all cursor-pointer group"
                                  data-testid={`link-hospital-${idx}`}
                                >
                                  <div className="flex items-center justify-center gap-1 mb-1">
                                    <MapPin className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity text-[#2BAAE2] brand-icon" />
                                  </div>
                                  <p className={`${fontClass} text-sm`}>{t(hospital.nameKey)}</p>
                                </motion.a>
                              </TooltipTrigger>
                              <TooltipContent side="top" className={`max-w-xs bg-white dark:bg-card text-foreground p-4 rounded-xl shadow-xl border border-border/50 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                <div className={fontClass}>
                                  <h5 className="font-bold text-[#1691D0] mb-2">{t(hospital.nameKey)}</h5>
                                  <p className="text-sm text-muted-foreground mb-3">{t(hospital.descKey)}</p>
                                  <div className="space-y-1.5 text-xs">
                                    {hospital.beds && (
                                      <div className={`flex items-center gap-2 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                                        <span>{hospital.beds} {t("about.hospital.beds")}</span>
                                        <Bed className="w-3.5 h-3.5 text-[#1691D0]" />
                                      </div>
                                    )}
                                    {hospital.established && (
                                      <div className={`flex items-center gap-2 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                                        <span>{t("about.hospital.established")}: {hospital.established}</span>
                                        <Calendar className="w-3.5 h-3.5 text-[#1691D0]" />
                                      </div>
                                    )}
                                    {hospital.phone && (
                                      <div className={`flex items-center gap-2 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                                        <span dir="ltr">{hospital.phone}</span>
                                        <Phone className="w-3.5 h-3.5 text-[#1691D0]" />
                                      </div>
                                    )}
                                  </div>
                                  <div className={`flex flex-wrap gap-1 mt-3 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                                    {hospital.serviceKeys.slice(0, 4).map((serviceKey, i) => (
                                      <span key={i} className="bg-[#1691D0]/10 text-[#1691D0] px-2 py-0.5 rounded-full text-xs">
                                        {t(serviceKey)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Specialized Centers List */}
                <AnimatePresence>
                  {showSpecializedCenters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <h4 className={`text-center ${fontClass} font-bold mb-3`}>{t("about.specializedCentersList")}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {specializedCentersData.map((center, idx) => (
                            <Tooltip key={center.nameKey} delayDuration={200}>
                              <TooltipTrigger asChild>
                                <motion.a
                                  href={`https://www.google.com/maps/search/${encodeURIComponent(center.searchQuery)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/10 rounded-lg px-3 py-2 text-center hover:bg-white/20 transition-all cursor-pointer group"
                                  data-testid={`link-specialized-center-${idx}`}
                                >
                                  <div className="flex items-center justify-center gap-1 mb-1">
                                    <MapPin className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity text-[#2BAAE2] brand-icon" />
                                  </div>
                                  <p className={`${fontClass} text-sm`}>{t(center.nameKey)}</p>
                                </motion.a>
                              </TooltipTrigger>
                              <TooltipContent side="top" className={`max-w-xs bg-white dark:bg-card text-foreground p-4 rounded-xl shadow-xl border border-border/50 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                <div className={fontClass}>
                                  <h5 className="font-bold text-[#1691D0] mb-2">{t(center.nameKey)}</h5>
                                  <p className="text-sm text-muted-foreground mb-3">{t(center.descKey)}</p>
                                  {center.phone && (
                                    <div className={`flex items-center gap-2 ${language === 'ar' ? 'justify-end' : 'justify-start'} text-xs mb-2`}>
                                      <span dir="ltr">{center.phone}</span>
                                      <Phone className="w-3.5 h-3.5 text-[#1691D0]" />
                                    </div>
                                  )}
                                  <div className={`flex flex-wrap gap-1 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                                    {center.serviceKeys.map((serviceKey, i) => (
                                      <span key={i} className="bg-[#1691D0]/10 text-[#1691D0] px-2 py-0.5 rounded-full text-xs">
                                        {t(serviceKey)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Health Centers List */}
                <AnimatePresence>
                  {showHealthCenters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <h4 className={`text-center ${fontClass} font-bold mb-3`}>{t("about.healthCentersList")}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                          {healthCentersData.map((center, idx) => (
                            <motion.a
                              key={center.searchQuery}
                              href={`https://www.google.com/maps/search/${encodeURIComponent(center.searchQuery)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/10 rounded-lg px-3 py-2 text-center hover:bg-white/20 transition-all cursor-pointer group"
                              data-testid={`link-health-center-${idx}`}
                            >
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <MapPin className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity text-[#2BAAE2] brand-icon" />
                              </div>
                              <p className={`${fontClass} text-xs`}>
                                {language === 'ar' ? center.ar : center.en}
                              </p>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Organizational Structure Section ===== */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#000e22' }}>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>

          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className={`text-2xl md:text-3xl font-bold text-white ${fontClass}`}>{t("about.orgStructure.title")}</h2>
            </motion.div>

            {/* CEO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden text-white text-center mb-6 max-w-md mx-auto border border-white/10 relative"
            >
              <CardStar size="md" />
              <div className="h-1.5 bg-[#2BAAE2]"></div>
              <div className="p-6 relative z-10">
                <div className="w-28 h-28 rounded-full mx-auto mb-3 overflow-hidden border-4 border-white/30">
                  <img
                    src={ceoImage}
                    alt={t("about.ceo.name")}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className={`text-xl font-bold ${fontClass} mb-1`}>{t("about.ceo.name")}</h3>
                <p className={`text-white/80 ${fontClass}`}>{t("about.ceo")}</p>
              </div>
            </motion.div>

            <div className="flex justify-center mb-6">
              <div className="w-0.5 h-8 bg-[#2BAAE2]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h3 className={`text-xl font-bold text-white ${fontClass}`}>
                {language === 'ar' ? "نواب الرئيس التنفيذي" : "VPs"}
              </h3>
            </motion.div>

            {/* Deputies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orgStructureData.map((deputy, idx) => {
                const Icon = deputy.icon;
                const isExpanded = expandedDeputy === deputy.id;
                return (
                  <motion.div
                    key={deputy.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden relative"
                    data-testid={`card-deputy-${idx}`}
                  >
                    <CardStar size="sm" />
                    <div className="h-1.5 bg-[#2BAAE2]"></div>
                    <button
                      onClick={() => setExpandedDeputy(isExpanded ? null : deputy.id)}
                      className="w-full p-4 flex items-center gap-4 text-right"
                      data-testid={`button-expand-deputy-${idx}`}
                    >
                      <div className="w-16 h-16 rounded-full flex-shrink-0 bg-white/10 flex items-center justify-center overflow-hidden">
                        {deputy.image ? (
                          <img src={deputy.image} alt={t(deputy.nameKey)} className="w-full h-full object-cover" />
                        ) : (
                          <Icon className="w-8 h-8 text-[#2BAAE2] brand-icon" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-white ${fontClass} text-sm`}>{t(deputy.nameKey)}</h4>
                        <p className={`text-white/70 ${fontClass} text-xs leading-tight`}>{t(deputy.titleKey)}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <ChevronDown className={`w-4 h-4 text-[#2BAAE2] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-2 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-2">
                              {deputy.departments.map((dept, deptIdx) => (
                                <motion.div
                                  key={dept}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: deptIdx * 0.03 }}
                                  className="bg-white/10 px-2 py-1.5 rounded-lg"
                                >
                                  <p className={`text-white ${fontClass} text-xs text-center`}>{t(dept)}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center my-8">
              <div className="w-0.5 h-8 bg-[#2BAAE2]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h3 className={`text-xl font-bold text-white ${fontClass}`}>
                {t("about.hospitalDirectors")}
              </h3>
            </motion.div>

            {/* Hospital Directors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                { hospitalKey: "about.hospital.westNajran", directorKey: "about.hospital.westNajran.director" },
                { hospitalKey: "about.hospital.kingKhaled", directorKey: "about.hospital.kingKhaled.director" },
                { hospitalKey: "about.hospital.maternity", directorKey: "about.hospital.maternity.director" },
                { hospitalKey: "about.hospital.najranGeneral", directorKey: "about.hospital.najranGeneral.director" },
                { hospitalKey: "about.hospital.badrSouth", directorKey: "about.hospital.badrSouth.director" },
                { hospitalKey: "about.hospital.habuna", directorKey: "about.hospital.habuna.director" },
                { hospitalKey: "about.hospital.thar", directorKey: "about.hospital.thar.director" },
                { hospitalKey: "about.hospital.sharurah", directorKey: "about.hospital.sharurah.director" },
                { hospitalKey: "about.hospital.khubash", directorKey: "about.hospital.khubash.director" },
                { hospitalKey: "about.hospital.yadamah", directorKey: "about.hospital.yadamah.director" },
                { hospitalKey: "about.hospital.eradah", directorKey: "about.hospital.eradah.director" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden relative"
                  data-testid={`card-hospital-${idx}`}
                >
                  <CardStar size="sm" />
                  <div className="h-1.5 bg-[#2BAAE2]"></div>
                  <div className="p-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 p-1.5">
                        <img src={clusterStar} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-white ${fontClass} text-sm`}>{t(item.hospitalKey)}</h4>
                        <p className={`text-white/70 ${fontClass} text-xs`}>{t(item.directorKey)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
        <section className="relative py-16 overflow-hidden" id="faq" style={{ backgroundColor: '#001228' }}>
          <div className="absolute inset-0 najran-geometric-bg opacity-20"></div>

          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2BAAE2]/20 mb-4">
                <HelpCircle className="w-8 h-8 text-[#2BAAE2]" />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold text-white ${fontClass} mb-3`}>
                {t("about.faq.title")}
              </h2>
              <p className={`text-white/70 ${fontClass} max-w-2xl mx-auto`}>
                {t("about.faq.subtitle")}
              </p>
            </motion.div>

            <div className="w-full space-y-4">
              {faqItems.map((item, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
                    data-testid={`faq-item-${idx}`}
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className={`w-full p-5 flex items-center gap-4 ${textAlign}`}
                      data-testid={`button-faq-${idx}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#2BAAE2]/20 flex items-center justify-center flex-shrink-0">
                        {isExpanded ? (
                          <Minus className="w-5 h-5 text-[#2BAAE2]" />
                        ) : (
                          <Plus className="w-5 h-5 text-[#2BAAE2]" />
                        )}
                      </div>
                      <h3 className={`flex-1 font-semibold text-white ${fontClass} text-base md:text-lg`}>
                        {t(item.questionKey)}
                      </h3>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0">
                            <div className={`${language === 'ar' ? 'pr-14' : 'pl-14'}`}>
                              <p className={`text-white/80 ${fontClass} leading-relaxed text-sm md:text-base`}>
                                {t(item.answerKey)}
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
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
