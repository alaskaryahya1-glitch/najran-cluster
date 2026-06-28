import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle, Mail, Building2, Search, Link, Phone } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CardStar } from "@/components/BrandIcon";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/hooks/useSEO";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Service } from "@shared/schema";
import heroImage from "@assets/2B883A14-BC32-41DF-906B-7A5ACD6EB41E_1767273959627.png";
import heroPhoto1 from "@assets/preparation_of_guidelines_and_strategies.jpg-ftk2s.jpeg";
import heroPhoto2 from "@assets/ensuring_the_development_of_cluster_capabilities.png-z4nw3y.png";
import heroPhoto3 from "@assets/asset_management.jpg-t3fl6j.jpeg";
import starLogo from "@assets/logo1_2_1767506250187.PNG";

import logoBain from "@assets/bain_1767513734752.png";
import logoEfada from "@assets/efada_1767513734752.png";
import logoHudoor from "@assets/Hudoor_1767513734752.png";
import logoMawared from "@assets/mawared_logo_1767517419920.png";
import logoMawid from "@assets/mawid_1767513734752.png";
import logoMoh from "@assets/moh_1767513734753.png";
import logoNewMawared from "@assets/Screenshot_1447-07-15_at_12.00.49_PM_1767517434695.png";
import logoNphies from "@assets/nphies_1767513734753.png";
import logoNupco from "@assets/nupco_1767513734753.png";
import logoPPM from "@assets/PPM_1767513734753.png";
import logoRaqeem from "@assets/raqeem_1767513734754.png";
import logoSahel from "@assets/sahel_1767513734754.png";
import logoShahem from "@assets/Shahem-3_1767514024701.png";
import logoVida from "@assets/vida_1767514024703.png";
import logoWasfaty from "@assets/wasfaty_(1)_1767514024704.png";
import logoEnaiti from "@assets/عنايتي_1767514024704.png";
import logoTraining from "@assets/منصة_التدريب_1767514203813.png";
import logoMOC from "@assets/MOC_1767514466423.png";
import logoConsultancy from "@assets/favicon2_(1)_1767514888704.png";
import logoSCHS from "@assets/SCHS_logo_1767515239145.png";
import logoEhalati from "@assets/احالتي_1767517180380.png";
import logoEtimad from "@assets/اعتمااااد_1767516335049.png";
import logoMasar from "@assets/masar-w_1767516273165.png";
import logoAnat from "@assets/Anat-1_1767515239148.webp";
import logoSeha from "@assets/SehaLogo_1767515239149.png";
import logoMyDrive from "@assets/mydrive_1767516273165.png";
import logoVolunteer from "@assets/التطووووع_1767516650602.png";
import logoDhaman from "@assets/IMG_8797_1767048634247.png";
import logoOutlook from "@assets/email-circle-icon.svg";
import logoEmailAddresses from "@assets/png-clipart-gmail-logo-illustration-email-computer-icons-messa_1767519110048.png";

import logoPhone from "@assets/pngtree-black-call-icon-png-image_2413693_1767519362030.png";
import logoWasfatyNew from "@assets/logo-rgb_1768467991326.png";

const logoMap: Record<string, string> = {
  'bain_1767513734752.png': logoBain,
  'efada_1767513734752.png': logoEfada,
  'Hudoor_1767513734752.png': logoHudoor,
  'mawared_logo_1767517419920.png': logoMawared,
  'mawid_1767513734752.png': logoMawid,
  'moh_1767513734753.png': logoMoh,
  'Screenshot_1447-07-15_at_12.00.49_PM_1767517434695.png': logoNewMawared,
  'nphies_1767513734753.png': logoNphies,
  'nupco_1767513734753.png': logoNupco,
  'PPM_1767513734753.png': logoPPM,
  'raqeem_1767513734754.png': logoRaqeem,
  'sahel_1767513734754.png': logoSahel,
  'Shahem-3_1767514024701.png': logoShahem,
  'vida_1767514024703.png': logoVida,
  'wasfaty_(1)_1767514024704.png': logoWasfaty,
  'عنايتي_1767514024704.png': logoEnaiti,
  'منصة_التدريب_1767514203813.png': logoTraining,
  'MOC_1767514466423.png': logoMOC,
  'favicon2_(1)_1767514888704.png': logoConsultancy,
  'SCHS_logo_1767515239145.png': logoSCHS,
  'احالتي_1767517180380.png': logoEhalati,
  'اعتمااااد_1767516335049.png': logoEtimad,
  'masar-w_1767516273165.png': logoMasar,
  'Anat-1_1767515239148.webp': logoAnat,
  'SehaLogo_1767515239149.png': logoSeha,
  'mydrive_1767516273165.png': logoMyDrive,
  'التطووووع_1767516650602.png': logoVolunteer,
  'IMG_8797_1767048634247.png': logoDhaman,
  'original-31293c6476ae8628875b4f422264e2c4_1767518560706.png': logoOutlook,
  'png-clipart-gmail-logo-illustration-email-computer-icons-messa_1767519110048.png': logoEmailAddresses,
  'pngtree-black-call-icon-png-image_2413693_1767519362030.png': logoPhone,
  'logo-rgb_1768467991326.png': logoWasfatyNew,
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
  { email: "NJ-GRC@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للحوكمة والالتزام والمخاطر تجمع نجران الصحي" },
  { email: "NJ-RCC@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مركز القيادة والتحكم تجمع نجران الصحي" },
  { email: "NJ-Revenue@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "تنمية الايرادات تجمع نجران الصحي" },
  { email: "NJ-IAG@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "المراجعة الداخلية تجمع نجران الصحي" },
  { email: "NJ-SPT@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "التخطيط الاستراتيجي والتحول تجمع نجران الصحي" },
  { email: "NJ-CMIC@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للتواصل وإدارة التغيير تجمع نجران الصحي" },
  { email: "NJ-Legal@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الشؤون القانونية والالتزام تجمع نجران الصحي" },
  { email: "NJ-CP@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "المشاركة المجتمعية تجمع نجران الصحي" },
  { email: "NJ-937@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مركز الاتصال التفاعلي تجمع نجران الصحي" },
  { email: "NJ-CO@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "لجنه فحص العروض تجمع نجران الصحي" },
  { email: "NJ-PSA@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الخدمات العامة والأصول تجمع نجران الصحي" },
  { email: "NJ-HaajUmrah@moh.gov.sa", department: "الخدمات العامة", displayName: "إدارة الحج والعمرة تجمع نجران الصحي" },
  { email: "NJ-Training@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "إدارة الشؤون الأكاديمية والتدريب تجمع نجران الصحي" },
  { email: "NJ-Training-STD@moh.gov.sa", department: "إدارة الشؤون الأكاديمية والتدريب", displayName: "التدريب والتعليم الطبي المستمر للشؤون الأكاديمية والتدريب" },
  { email: "NJ-Dio-SCFHS@moh.gov.sa", department: "إدارة الشؤون الأكاديمية والتدريب", displayName: "الممثل النظامي للشؤون الأكاديمية والتدريب تجمع نجران الصحي" },
  { email: "NJ-TSCSL@moh.gov.sa", department: "إدارة الشؤون الأكاديمية والتدريب", displayName: "مركز المهارات الفنية ومعمل المحاكاة للشؤون الاكاديمية والتدريب" },
  { email: "NJ-Disaster@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "مركز التحكم والكوارث تجمع نجران الصحي" },
  { email: "NJ-RCCOperation@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "عمليات مركز التحكم والكوارث تجمع نجران الصحي" },
  { email: "NJ-Disaster-MT@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "النقل الطبي لمركز التحكم والكوارث تجمع نجران الصحي" },
  { email: "NJ-Disaster-IC@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "القيادة الميدانية لمركز التحكم والكوارث تجمع نجران الصحي" },
  { email: "NJ-Disaster-KPI@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "الجودة والمؤشرات لمركز التحكم والكوارث تجمع نجران الصحي" },
  { email: "NJ-Disaster-hepps@moh.gov.sa", department: "مركز التحكم والكوارث", displayName: "التخطيط والاستعداد لمركز التحكم والكوارث تجمع نجران الصحي" },
  { email: "NJ-PSP@moh.gov.sa", department: "الادارة التنفيذية للاستراتيجية والتحول", displayName: "ادارة التخطيط الاستراتيجي والتحول ومشاركة القطاع الخاص" },
  { email: "NJ-SPT-QUALITY@moh.gov.sa", department: "الادارة التنفيذية للاستراتيجية والتحول", displayName: "وحدة الجودة للاستراتيجية والتحول تجمع نجران الصحي" },
  { email: "NJ-SPlan@moh.gov.sa", department: "الادارة التنفيذية للاستراتيجية والتحول", displayName: "وحدة الخطة الاستراتيجية للاستراتيجية والتحول تجمع نجران الصحي" },
  { email: "NJ-BPlan@moh.gov.sa", department: "الادارة التنفيذية للاستراتيجية والتحول", displayName: "وحدة الخطة التشغيلية للاستراتيجية والتحول تجمع نجران الصحي" },
  { email: "NJ-GPlan@moh.gov.sa", department: "الادارة التنفيذية للاستراتيجية والتحول", displayName: "وحدة متطلبات البوابة للاستراتيجية والتحول تجمع نجران الصحي" },
  { email: "NJ-HealthServices@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للخدمات الصحية تجمع نجران الصحي" },
  { email: "NJ-HOS@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "إدارة المستشفيات تجمع نجران الصحي" },
  { email: "NJ-HosTec@moh.gov.sa", department: "إدارة المستشفيات", displayName: "إدارة الشؤون الفنية لإدارة المستشفيات تجمع نجران الصحي" },
  { email: "NJ-PublicHealth@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "إدارة الصحة العامة تجمع نجران الصحي" },
  { email: "NJ-Nursing@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "التمريض تجمع نجران الصحي" },
  { email: "NJ-NU-Edu@moh.gov.sa", department: "التمريض", displayName: "التدريب للتمريض تجمع نجران الصحي" },
  { email: "NJ-NU-Quality@moh.gov.sa", department: "التمريض", displayName: "الجودة التمريضية بالتمريض تجمع نجران الصحي" },
  { email: "NJ-NU-Adm@moh.gov.sa", department: "التمريض", displayName: "الشؤون الإدارية للتمريض تجمع نجران الصحي" },
  { email: "NJ-NU-TA@moh.gov.sa", department: "التمريض", displayName: "الشؤون الفنية للتمريض تجمع نجران الصحي" },
  { email: "NJ-SMServices@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "الخدمات الطبية المساندة تجمع نجران الصحي" },
  { email: "Nj-reglabs@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "ادارة المختبرات والمختبر الاقليمي تجمع نجران الصحي" },
  { email: "Nj-reglab-it@moh.gov.sa", department: "المختبر الإقليمي", displayName: "الصحة الرقمية بالمختبر الاقليمي تجمع نجران الصحي" },
  { email: "NJ-BloodBank@moh.gov.sa", department: "المختبر الإقليمي", displayName: "بنك الدم المساند تجمع نجران الصحي" },
  { email: "NJ-MSServices@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "ادارة الخدمات النفسية والاجتماعية تجمع نجران الصحي" },
  { email: "NJ-BFeeding@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "إدارة دعم الرضاعة الطبيعية تجمع نجران الصحي" },
  { email: "NJ-JORAS@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "غرفة العمليات المشتركة لمشروع عيني تجمع نجران الصحي" },
  { email: "NJ-Rad@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "إدارة الاشعة والخدمات التطبيقية تجمع نجران الصحي" },
  { email: "NJ-HS-Ayenati@moh.gov.sa", department: "الخدمات الطبية المساندة", displayName: "فريق عيني تجمع نجران الصحي" },
  { email: "NJ-AdminPacs@moh.gov.sa", department: "إدارة الأشعة", displayName: "لباكس بإدارة الأشعة تجمع نجران الصحي" },
  { email: "NJ-Rad-MedPhys@moh.gov.sa", department: "إدارة الأشعة", displayName: "الفيزياء الطبية بإدارة الأشعة تجمع نجران الصحي" },
  { email: "Nj-Rad-Mawid@moh.gov.sa", department: "إدارة الأشعة", displayName: "برنامج موعد بإدارة الأشعة تجمع نجران الصحي" },
  { email: "NJ-Rad-Equipment@moh.gov.sa", department: "إدارة الأشعة", displayName: "وحدة الأجهزة بإدارة الأشعة تجمع نجران الصحي" },
  { email: "NJ-InfControl@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "مكافحة العدوى تجمع نجران الصحي" },
  { email: "NJ-COGH@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "مركز عمليات الصحة العامة تجمع نجران الصحي" },
  { email: "NJ-Mw@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "برنامج النفايات الطبية تجمع نجران الصحي" },
  { email: "NJ-MedReco@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "المعلوماتية الصحية تجمع نجران الصحي" },
  { email: "NJ-ServiceLine@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "المسارات الاكلينيكية تجمع نجران الصحي" },
  { email: "NJ-IntHealthCare@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "الرعاية الصحية المتكاملة تجمع نجران الصحي" },
  { email: "NJ-Diet@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "التغذية تجمع نجران الصحي" },
  { email: "NJ-HealthVol@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "التطوع الصحي تجمع نجران الصحي" },
  { email: "NJ-LTC@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "التأهيل الطبي والرعاية المديدة تجمع نجران الصحي" },
  { email: "eam-lab-RLNreception@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "استقبال عينات المختبر الاقليمي بنجران" },
  { email: "NJ-Musta@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "إدارة برنامج مستعد تجمع نجران الصحي" },
  { email: "NJ-HS-PMO@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "إدارة المشاريع بالإدارة التنفيذية للخدمات الصحية" },
  { email: "NJ-PerfMgmt@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "إدارة الأداء الاكلينيكي تجمع نجران الصحي" },
  { email: "NJ-PM-Phcc@moh.gov.sa", department: "إدارة الأداء الكلينيكي", displayName: "وحدة أداء الرعاية الأولية تجمع نجران الصحي" },
  { email: "NJ-HomeMed@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "إدارة الرعاية الصحية المنزلية تجمع نجران الصحي" },
  { email: "NJ-PhCare@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "إدارة الرعاية الصيدلية تجمع نجران الصحي" },
  { email: "NJ-PhCare-Wasfaty@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "وصفتي للرعاية الصيدلية تجمع نجران الصحي" },
  { email: "NJ-PHM@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "الصحة السكانية تجمع نجران الصحي" },
  { email: "NJ-PHM-DM@moh.gov.sa", department: "الصحة السكانية", displayName: "ادارة البيانات بإدارة الصحة السكانية تجمع نجران الصحي" },
  { email: "NJ-PHM-PP@moh.gov.sa", department: "الصحة السكانية", displayName: "ادارة التخطيط والاداء بإدارة الصحة السكانية" },
  { email: "NJ-PHM-DA@moh.gov.sa", department: "الصحة السكانية", displayName: "ادارة تحليل البيانات بإدارة الصحة السكانية" },
  { email: "NJ-PHM-Research@moh.gov.sa", department: "الصحة السكانية", displayName: "ادارة البحوث والجودة بإدارة الصحة السكانية" },
  { email: "NJ-HPMPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "إدارة البرامج الصحية للصحة العامة بتجمع نجران الصحي" },
  { email: "NJ-CEPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "التثقيف الإكلينيكي للصحة العامة تجمع نجران الصحي" },
  { email: "NJ-AAPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "الشؤون الإدارية للصحة العامة تجمع نجران الصحي" },
  { email: "NJ-HScl@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "الصحة المدرسية للصحة العامة تجمع نجران الصحي" },
  { email: "NJ-MCDPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "العيادات المتنقلة للصحة العامة تجمع نجران الصحي" },
  { email: "NJ-ASPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "برنامج مكافحة التدخين للصحة العامة تجمع نجران الصحي" },
  { email: "NJ-HCAPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "شؤون المراكز الصحية للصحة العامة تجمع نجران الصحي" },
  { email: "NJ-IDDPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "الأمراض المعدية للصحة العامة تجمع نجران الصحي" },
  { email: "NJ-CIDPH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "مكافحة الأمراض المعدية للصحة العامة تجمع نجران الصحي" },
  { email: "Nj-PHealth@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "مكتب مدير ادارة الصحة العامة تجمع نجران الصحي" },
  { email: "NJ-EHCH@moh.gov.sa", department: "إدارة الصحة العامة", displayName: "وحدة البيئة والصحة المهنية تجمع نجران الصحي" },
  { email: "NJ-MOC@moh.gov.sa", department: "الإدارة التنفيذية للخدمات الصحية", displayName: "نموذج الرعاية الصحية تجمع نجران الصحي" },
  { email: "NJ-MOC-Portal@moh.gov.sa", department: "نموذج الرعاية", displayName: "منصة نموذج الرعاية الصحية تجمع نجران الصحي" },
  { email: "NJ-MOC-Risk@moh.gov.sa", department: "نموذج الرعاية", displayName: "مخاطر نموذج الرعاية الصحية تجمع نجران الصحي" },
  { email: "NJ-MOCLead@moh.gov.sa", department: "نموذج الرعاية", displayName: "قائد نموذج الرعاية الصحية تجمع نجران الصحي" },
  { email: "NJ-MOC-DCLead@moh.gov.sa", department: "نموذج الرعاية", displayName: "قائد بيانات نموذج الرعاية الصحية تجمع نجران الصحي" },
  { email: "NJ-MOC-Quality@moh.gov.sa", department: "نموذج الرعاية", displayName: "الجودة نموذج الرعاية الصحية تجمع نجران الصحي" },
  { email: "Nj-MOCSTS@moh.gov.sa", department: "نموذج الرعاية", displayName: "إحصائيات نموذج الرعاية الصحية تجمع نجران الصحي" },
  { email: "NJ-HealthCare-PMO@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "إدارة المشاريع لتقديم الرعاية الصحية تجمع نجران الصحي" },
  { email: "NJ-BMap@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "الطاقة الاستيعابية تجمع نجران الصحي" },
  { email: "NJ-ETMC@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "الطوارئ ودعم الوصول تجمع نجران الصحي" },
  { email: "NJ-SPhlC@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "المراكز المتخصصة تجمع نجران الصحي" },
  { email: "NJ-AMCU@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "وحدة مراقبة وضبط الموعد تجمع نجران الصحي" },
  { email: "NJ-Temp@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "وحدة التعاقد المؤقت تجمع نجران الصحي" },
  { email: "NJ-ClinicalPrivileges@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "الامتيازات السريرية تجمع نجران الصحي" },
  { email: "NJ-VirtualCare@moh.gov.sa", department: "الإدارة التنفيذية لتقديم الرعاية الصحية", displayName: "الرعاية الافتراضية تجمع نجران الصحي" },
  { email: "NJ-VC-IMC@moh.gov.sa", department: "إدارة الرعاية الافتراضية", displayName: "الاستشارات الطبية الفورية للرعاية الافتراضية تجمع نجران الصحي" },
  { email: "NJ-VC-vOPD@moh.gov.sa", department: "إدارة الرعاية الافتراضية", displayName: "العيادات الافتراضية تجمع نجران الصحي" },
  { email: "NJ-ExQu@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للجودة والاداء تجمع نجران الصحي" },
  { email: "NJ-KPI@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "إدارة الأداء والمخرجات تجمع نجران الصحي" },
  { email: "NJ-CreMgmt@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "إدارة الإبداع تجمع نجران الصحي" },
  { email: "NJ-Quality@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "ادارة الجودة والاعتماد تجمع نجران الصحي" },
  { email: "NJ-Accreditation@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "ادارة الاعتماد تجمع نجران الصحي" },
  { email: "NJ-PMO@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "إدارة المشاريع للتغير والجودة والاداء تجمع نجران الصحي" },
  { email: "NJ-Research@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "البحوث والدراسات تجمع نجران الصحي" },
  { email: "NJ-SecretVisitor@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "الزائر السري تجمع نجران الصحي" },
  { email: "NJ-CSR@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "السلامة الإكلينيكية والمخاطر تجمع نجران الصحي" },
  { email: "NJ-BE@moh.gov.sa", department: "الإدارة التنفيذية للجودة والاداء", displayName: "تجربة المستفيد تجمع نجران الصحي" },
  { email: "NJ-Operation@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للتشغيل تجمع نجران الصحي" },
  { email: "NJ-SupChains@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "سلاسل الامداد تجمع نجران الصحي" },
  { email: "NJ-SCPQuality@moh.gov.sa", department: "سلاسل الإمداد", displayName: "ضبط الأداء والجودة سلاسل الإمداد تجمع نجران الصحي" },
  { email: "NJ-SCWarehouse@moh.gov.sa", department: "سلاسل الإمداد", displayName: "إدارة المستودعات سلاسل الإمداد تجمع نجران الصحي" },
  { email: "NJ-DMWarehouse@moh.gov.sa", department: "سلاسل الإمداد", displayName: "نائب مدير إدارة المستودعات سلاسل الإمداد تجمع نجران الصحي" },
  { email: "NJ-SCPlan@moh.gov.sa", department: "سلاسل الإمداد", displayName: "التخطيط سلاسل الإمداد تجمع نجران الصحي" },
  { email: "NJ-Housing@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "الإسكان والاحتياج تجمع نجران الصحي" },
  { email: "NJ-SecSafety@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "الأمن والسلامة تجمع نجران الصحي" },
  { email: "NJ-Equipments@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "التجهيزات تجمع نجران الصحي" },
  { email: "NJ-OP-SSER@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "الخدمات المساندة للتشغيل تجمع نجران الصحي" },
  { email: "NJ-EngAffairs@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "الشؤون الهندسية تجمع نجران الصحي" },
  { email: "NJ-Maintenance@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "الصيانة تجمع نجران الصحي" },
  { email: "NJ-OP-SU@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "وحدة الدعم للتشغيل تجمع نجران الصحي" },
  { email: "NJ-OP-FAFF@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "وحدة الشؤون المالية للتشغيل تجمع نجران الصحي" },
  { email: "NJ-Properties@moh.gov.sa", department: "الإدارة التنفيذية للتشغيل", displayName: "ممتلكات تجمع نجران الصحي" },
  { email: "NJ-Assets@moh.gov.sa", department: "المنشآت", displayName: "إدارة الأصول تجمع نجران الصحي" },
  { email: "NJ-HR@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للموارد البشرية تجمع نجران الصحي" },
  { email: "NJ-JOBS@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "التوظيف تجمع نجران الصحي" },
  { email: "NJ-SalBen@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "الرواتب تجمع نجران الصحي" },
  { email: "NJ-HCD@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "تخطيط وتطوير الموارد البشرية تجمع نجران الصحي" },
  { email: "NJ-OpHR@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "عمليات الموارد البشرية تجمع نجران الصحي" },
  { email: "NJ-PerMo@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "مراقبة انتظام الموارد البشرية تجمع نجران الصحي" },
  { email: "NJ-Invest@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "وحدة التحقيقات تجمع نجران الصحي" },
  { email: "NJ-HR-NSEU@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "وحدة التوظيف لغير السعوديين تجمع نجران الصحي" },
  { email: "NJ-TRSU@moh.gov.sa", department: "الإدارة التنفيذية للموارد البشرية", displayName: "وحدة المواهب والتدوير والتعاقب الوظيفي تجمع نجران الصحي" },
  { email: "NJ-Finance@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للمالية تجمع نجران الصحي" },
  { email: "NJ-Comm@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "مركز الوثائق والمحفوظات والاتصالات الإدارية تجمع نجران الصحي" },
  { email: "NJ-FTM@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "ادارة التحول المالي تجمع نجران الصحي" },
  { email: "NJ-CPM@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "إدارة العقود والمشتريات تجمع نجران الصحي" },
  { email: "NJ-SEO@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "ادارة كفاءة الإنفاق تجمع نجران الصحي" },
  { email: "NJ-FM@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "الإدارة المالية تجمع نجران الصحي" },
  { email: "NJ-SABA@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "التحول لأساس الاستحقاق تجمع نجران الصحي" },
  { email: "NJ-PB@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "التخطيط والميزانية تجمع نجران الصحي" },
  { email: "NJ-PSC@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "القطاع الخاص والشركات تجمع نجران الصحي" },
  { email: "NJ-FIC@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "مراقبة المخزون تجمع نجران الصحي" },
  { email: "NJ-REVENUES@moh.gov.sa", department: "الإدارة التنفيذية للمالية", displayName: "تنمية ومتابعة الإيرادات تجمع نجران الصحي" },
  { email: "NJ-eHealth@moh.gov.sa", department: "الرئيس التنفيذي", displayName: "الإدارة التنفيذية للصحة الرقمية تجمع نجران الصحي" },
  { email: "NJ-eHealth-IS@moh.gov.sa", department: "الصحة الرقمية", displayName: "مكتب البيانات للصحة الرقمية تجمع نجران الصحي" },
  { email: "NJ-eHealth-SE@moh.gov.sa", department: "الصحة الرقمية", displayName: "الأنظمة الإكلينيكية للصحة الرقمية تجمع نجران الصحي" },
  { email: "NJ-eHealth-DI@moh.gov.sa", department: "الصحة الرقمية", displayName: "حلول الأعمال للصحة الرقمية تجمع نجران الصحي" },
  { email: "NJ-eHealth-SA@moh.gov.sa", department: "الصحة الرقمية", displayName: "البنية التحتية والتشغيل للصحة الرقمية تجمع نجران الصحي" },
  { email: "NJ-eHealth-PM@moh.gov.sa", department: "الصحة الرقمية", displayName: "الاستراتيجية الرقمية والبنية المؤسسية للصحة الرقمية تجمع نجران" },
];

const departments: string[] = Array.from(new Set(emailDirectory.map(e => e.department)));

const getIconComponent = (iconName: string) => {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return icons[iconName] || Link;
};

interface GlassStarServiceProps {
  service: Service;
  index: number;
  language: string;
  fontClass: string;
  size?: "sm" | "md" | "lg";
  onOpenEmailDialog?: () => void;
  onOpenPhoneDialog?: () => void;
}

function GlassStarService({ service, index, language, fontClass, size = "md", onOpenEmailDialog, onOpenPhoneDialog }: GlassStarServiceProps) {
  const IconComponent = getIconComponent(service.iconType);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const hasLogo = service.logoPath && logoMap[service.logoPath];
  const logoSrc = service.logoPath ? logoMap[service.logoPath] : null;
  const keepOriginalColors = service.logoPath === 'png-clipart-gmail-logo-illustration-email-computer-icons-messa_1767519110048.png';
  const shouldInvertLogo = service.logoPath === 'pngtree-black-call-icon-png-image_2413693_1767519362030.png' ||
    service.logoPath === 'logo-rgb_1768467991326.png';
  const isOutlookLogo = service.logoPath === 'original-31293c6476ae8628875b4f422264e2c4_1767518560706.png';
  
  const sizes = {
    sm: { container: "w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32", icon: "w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7", text: "text-[8px] xs:text-[9px] sm:text-[10px]", logo: "w-12 h-12 xs:w-16 xs:h-16 sm:w-18 sm:h-18" },
    md: { container: "w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40", icon: "w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10", text: "text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs", logo: "w-14 h-14 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24" },
    lg: { container: "w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48", icon: "w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12", text: "text-[9px] xs:text-[10px] sm:text-xs md:text-sm", logo: "w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" }
  };

  const isEmailDirectory = service.titleAr.includes("عناوين البريد الإلكتروني") && service.iconType === "mail" && service.category === "info";
  const isPhoneContact = service.titleAr.includes("ارقام التواصل") && service.iconType === "phone" && service.category === "info";

  const handleClick = () => {
    if (isEmailDirectory && onOpenEmailDialog) {
      onOpenEmailDialog();
    } else if (isPhoneContact && onOpenPhoneDialog) {
      onOpenPhoneDialog();
    } else {
      window.open(service.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        type: "spring",
        stiffness: 150,
        damping: 15
      }}
      whileHover={{ scale: 1.06, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative cursor-pointer group ${sizes[size].container} rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered
          ? 'bg-[#2BAAE2] border-2 border-[#2BAAE2] shadow-[0_12px_32px_rgba(43,170,226,0.35)]'
          : 'bg-white border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700'
      }`}
      data-testid={`service-star-${service.id}`}
    >
      {/* Blue top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#2BAAE2] z-30" />

      {/* Star watermark */}
      <div className="absolute inset-[5%] z-10">
        <img
          src={starLogo}
          alt=""
          className="w-full h-full object-contain transition-all duration-300"
          style={{
            filter: isHovered ? "brightness(0) invert(1)" : "brightness(0)",
            opacity: isHovered ? 0.12 : 0.04,
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          animate={{ y: isHovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center px-3"
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="mb-2"
          >
            {hasLogo && logoSrc ? (
              <img
                src={logoSrc}
                alt={language === 'ar' ? service.titleAr : service.titleEn}
                className={`${sizes[size].logo} object-contain drop-shadow transition-all duration-300`}
                style={{
                  filter: isHovered
                    ? "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(255,255,255,0.3))"
                    : isDark ? "brightness(0) invert(1)" : keepOriginalColors ? "none" : "brightness(0)",
                }}
              />
            ) : (
              <IconComponent
                className={`${sizes[size].icon} transition-all duration-300 ${
                  isHovered ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                }`}
              />
            )}
          </motion.div>
          <span
            className={`font-semibold ${sizes[size].text} ${fontClass} leading-tight max-w-[90%] line-clamp-2 break-words transition-colors duration-300 ${
              isHovered ? 'text-white' : isDark ? 'text-gray-200' : 'text-gray-700'
            }`}
          >
            {language === 'ar' ? service.titleAr : service.titleEn}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function EmployeeServices() {
  const { t, language } = useI18n();
  const fontClass = language === 'ar' ? 'font-arabic' : 'font-sans';
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [heroPhoto1, heroPhoto2, heroPhoto3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  useSEO({
    path: '/employee-services',
    titleAr: 'خدمات الموظفين | تجمع نجران الصحي',
    titleEn: 'Employee Services | Najran Health Cluster',
    descriptionAr: 'الخدمات الإلكترونية والأنظمة المتاحة لموظفي تجمع نجران الصحي.',
    descriptionEn: 'Electronic services and systems available for Najran Health Cluster employees.',
  }, language);
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const infoServices = services?.filter(s => s.category === 'info') || [];
  const systemServices = services?.filter(s => s.category === 'system') || [];

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

  return (
    <div className="min-h-screen employee-services-page overflow-x-clip">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-section relative py-32 overflow-hidden" style={{ backgroundColor: '#004070', minHeight: '65vh' }}>
          {heroSlides.map((slide, idx) => (
            <img
              key={idx}
              src={slide}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/70" />
          <div className="absolute inset-0 dark:bg-black/50 pointer-events-none z-[2] transition-colors duration-300"></div>
          <div className="absolute inset-0 najran-geometric-bg opacity-20 pointer-events-none z-[3] dark:hidden"></div>
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-[#2BAAE2]' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>

          <div className="container-custom relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white ${fontClass} mb-4`}>
                {t("employeeServices.title")}
              </h1>
              <p className={`text-white/80 ${fontClass} text-base sm:text-lg md:text-xl`}>
                {t("employeeServices.subtitle")}
              </p>
            </motion.div>
          </div>

          {/* White panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[100]">
            <div className="bg-white rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] px-3 pt-4 md:px-8 md:pt-8 pb-0">
              <div className="container-custom">
                <div className="grid grid-cols-3 gap-2 md:gap-6 -translate-y-6">
                  {[
                    { titleAr: 'عن التجمع', titleEn: 'About Us', subtitleAr: 'تعرف على تجمع نجران الصحي', subtitleEn: 'Learn about Najran Health Cluster', href: '/about' },
                    { titleAr: 'الخدمات الإلكترونية', titleEn: 'E-Services', subtitleAr: 'منصات رقمية للخدمات الصحية', subtitleEn: 'Digital health platforms', href: '/e-services' },
                    { titleAr: 'الأخبار والمستجدات', titleEn: 'News', subtitleAr: 'آخر أخبار التجمع', subtitleEn: 'Latest cluster news', href: '/news' },
                  ].map((card, idx) => (
                    <a key={idx} href={card.href} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm p-2.5 md:p-5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-300 overflow-hidden relative">
                      <div className="h-1 bg-[#2BAAE2] absolute top-0 left-0 right-0 rounded-t-2xl"></div>
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

        {/* Loading State */}
        {isLoading && (
          <section className="relative pt-24 md:pt-28 pb-20" style={{ backgroundColor: '#f7f8f9' }}>
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-[#2BAAE2] animate-spin mb-4" />
              <p className={`text-gray-600 ${fontClass}`}>{t("employeeServices.loading")}</p>
            </div>
          </section>
        )}

        {/* Error State */}
        {error && (
          <section className="relative py-20" style={{ backgroundColor: '#f7f8f9' }}>
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-3xl flex items-center gap-4 border border-gray-100 shadow-sm max-w-lg">
                <AlertCircle className="w-10 h-10 flex-shrink-0 text-[#2BAAE2]" />
                <div className={fontClass}>
                  <h3 className="font-bold text-lg mb-1 text-gray-900">{t("employeeServices.error")}</h3>
                  <p className="text-sm text-gray-600">{t("employeeServices.errorRetry")}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Info Services */}
        {!isLoading && !error && infoServices.length > 0 && (
          <section className="relative pt-24 md:pt-28 pb-12 overflow-hidden" style={{ backgroundColor: '#f7f8f9' }}>
            <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
            <video autoPlay loop muted playsInline aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
              <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
            </video>
            <div className="container-custom relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="bg-white rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-[400ms]"
              >
                <div className="h-1.5 bg-[#2BAAE2] rounded-t-[40px]"></div>
                <CardStar size="lg" />
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 relative z-10">
                    {infoServices.map((service, idx) => (
                      <GlassStarService
                        key={service.id}
                        service={service}
                        index={idx}
                        language={language}
                        fontClass={fontClass}
                        size="md"
                        onOpenEmailDialog={() => setIsEmailDialogOpen(true)}
                        onOpenPhoneDialog={() => setIsPhoneDialogOpen(true)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* System Services */}
        {!isLoading && !error && systemServices.length > 0 && (
          <section className="relative py-12 overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
            <div className="absolute inset-0 najran-geometric-bg-light opacity-[0.06] pointer-events-none"></div>
            <video autoPlay loop muted playsInline aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none">
              <source src="https://www.health.sa/common/pattern-1.mp4" type="video/mp4" />
            </video>
            <div className="container-custom relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="bg-white rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(43,170,226,0.15)] hover:border-[#2BAAE2] transition-all duration-[400ms]"
              >
                <div className="h-1.5 bg-[#2BAAE2] rounded-t-[40px]"></div>
                <CardStar size="lg" />
                <div className="p-6 md:p-8">
                  <div className="text-center mb-10 relative z-10">
                    <h2 className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold ${fontClass} text-gray-900 mb-4`}>
                      {t("employeeServices.systems")}
                    </h2>
                    <p className={`text-gray-600 ${fontClass}`}>
                      {t("employeeServices.systemsSubtitle")}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 relative z-10">
                    {systemServices.map((service, idx) => (
                      <GlassStarService
                        key={service.id}
                        service={service}
                        index={idx}
                        language={language}
                        fontClass={fontClass}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Email Directory Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 rounded-3xl bg-white border border-gray-200 shadow-xl">
          <div className="bg-gray-50 px-5 py-6 rounded-t-3xl relative border-b border-gray-100">
            <DialogHeader className="pb-0">
              <DialogTitle className={`text-lg ${fontClass} flex items-center justify-center gap-2 text-gray-900`}>
                <Mail className="w-5 h-5 text-[#2BAAE2]" />
                {language === 'ar' ? 'عناوين البريد الإلكتروني للإدارات' : 'Department Email Addresses'}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-4 relative">
              <Input
                placeholder={language === 'ar' ? 'ابحث عن إدارة أو بريد إلكتروني...' : 'Search for department or email...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`bg-white border-gray-200 text-gray-700 placeholder:text-gray-400 rounded-full pr-4 pl-10 h-11 ${fontClass}`}
                data-testid="input-email-search"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2BAAE2]" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white">
            {Object.entries(groupedEmails).map(([dept, emails]) => (
              <div key={dept}>
                <div className="px-4 py-3 flex items-center gap-2 bg-gray-50 border-b border-gray-100">
                  <Building2 className="w-4 h-4 text-[#2BAAE2]" />
                  <span className={`font-semibold text-sm ${fontClass} text-gray-800`}>{dept}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2BAAE2]/40 mr-auto"></div>
                </div>

                <div className="px-3 py-2 space-y-1.5">
                  {emails.map((entry, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${entry.email}`}
                      className="block bg-gray-50 rounded-xl px-4 py-3 hover:bg-[#e6f7ff] transition-colors border border-gray-100"
                      data-testid={`link-email-${dept}-${idx}`}
                    >
                      <p className={`text-sm ${fontClass} text-gray-600 leading-relaxed`}>
                        {entry.displayName}
                      </p>
                      <p className="text-sm text-[#2BAAE2] mt-0.5" dir="ltr">
                        {entry.email}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(groupedEmails).length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className={fontClass}>
                  {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Contact Dialog */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent className="max-w-md overflow-hidden flex flex-col p-0 gap-0 rounded-3xl bg-white border border-gray-200 shadow-xl">
          <div className="bg-gray-50 px-5 py-6 rounded-t-3xl relative border-b border-gray-100">
            <DialogHeader className="pb-0">
              <DialogTitle className={`text-lg ${fontClass} flex items-center justify-center gap-2 text-gray-900`}>
                <Phone className="w-5 h-5 text-[#2BAAE2]" />
                {language === 'ar' ? 'أرقام التواصل بالتجمع' : 'NHC Contact Numbers'}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 text-center">
            <div className="bg-gray-50 rounded-2xl px-6 py-8 border border-gray-100">
              <Phone className="w-12 h-12 mx-auto mb-4 text-[#2BAAE2]" />
              <p className={`text-gray-600 ${fontClass} mb-3`}>
                {language === 'ar' ? 'للتواصل مع تجمع نجران الصحي' : 'To contact Najran Health Cluster'}
              </p>
              <a
                href="tel:0175406000"
                className="text-3xl font-bold text-gray-900 hover:text-[#2BAAE2] transition-colors block"
                dir="ltr"
                data-testid="link-phone-number"
              >
                920011140
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
