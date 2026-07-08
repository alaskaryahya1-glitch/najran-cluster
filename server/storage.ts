import { db } from "./db";
import { services, type Service, type InsertService } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  seedServices(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async seedServices(): Promise<void> {
    const existing = await this.getServices();

    const seedData: InsertService[] = [
      // Info Group
      {
        titleAr: "عناوين البريد الإلكتروني للتجمع",
        titleEn: "NHC Departments E-Mails",
        url: "#",
        iconType: "mail",
        category: "info",
        logoPath: "png-clipart-gmail-logo-illustration-email-computer-icons-messa_1767519110048.png",
      },
      {
        titleAr: "ارقام التواصل بالتجمع",
        titleEn: "NHC Contact Numbers",
        url: "#",
        iconType: "phone",
        category: "info",
        logoPath: "pngtree-black-call-icon-png-image_2413693_1767519362030.png",
      },
      {
        titleAr: "استعادة كلمة المرور",
        titleEn: "Reset Password",
        url: "https://hsp.moh.gov.sa/ResetPassword.aspx",
        iconType: "lock",
        category: "info",
        logoPath: "moh_1767513734753.png",
      },
      {
        titleAr: "تحديث بيانات الموظف",
        titleEn: "Employee Update",
        url: "https://empupdate.moh.gov.sa/",
        iconType: "user",
        category: "info",
        logoPath: "moh_1767513734753.png",
      },
      {
        titleAr: "استعادة كلمة مرور موارد",
        titleEn: "Mawared ResetPassword",
        url: "https://erp.moh.gov.sa/OA_HTML/OA.jsp?OAFunc=XXMOH_FORGET_PASSWORD",
        iconType: "lock",
        category: "info",
        logoPath: "mawared_logo_1767517419920.png",
      },
      {
        titleAr: "البريد الإلكتروني",
        titleEn: "Email",
        url: "https://webmail.moh.gov.sa/",
        iconType: "mail",
        category: "info",
        logoPath: "original-31293c6476ae8628875b4f422264e2c4_1767518560706.png",
      },
      {
        titleAr: "بــيــن",
        titleEn: "BAIN",
        url: "https://bain.moh.gov.sa/Account/Login?ReturnUrl=%2F",
        iconType: "link",
        category: "info",
        logoPath: "bain_1767513734752.png",
      },
      {
        titleAr: "مــوارد",
        titleEn: "Mawared",
        url: "https://erp.moh.gov.sa/",
        iconType: "monitor",
        category: "info",
        logoPath: "mawared_logo_1767517419920.png",
      },
      {
        titleAr: "موارد - الشركة القابضة",
        titleEn: "Mawared - HHC",
        url: "https://hhctrs.moh.gov.sa",
        iconType: "monitor",
        category: "info",
        logoPath: "mawared_logo_1767517419920.png",
      },
      // Systems Group
      {
        titleAr: "شــهــم",
        titleEn: "Shahem",
        url: "https://itsm.moh.gov.sa/dwp",
        iconType: "shield",
        category: "system",
        logoPath: "Shahem-3_1767514024701.png",
      },
      {
        titleAr: "موارد (الجديد)",
        titleEn: "NEW MAWARED",
        url: "https://mawared.moh.gov.sa/",
        iconType: "monitor",
        category: "system",
        logoPath: "Screenshot_1447-07-15_at_12.00.49_PM_1767517434695.png",
      },
      {
        titleAr: "حضــور",
        titleEn: "Hudoor",
        url: "https://mohnaj.hudoor.net/ar/Dashboard",
        iconType: "clock",
        category: "system",
        logoPath: "Hudoor_1767513734752.png",
      },
      {
        titleAr: "نظام سهل",
        titleEn: "Sahel",
        url: "https://sahel.moh.gov.sa/Login.aspx",
        iconType: "check-circle",
        category: "system",
        logoPath: "sahel_1767513734754.png",
      },
      {
        titleAr: "منصة التدريب - MOH",
        titleEn: "Training - MOH",
        url: "https://tr.moh.gov.sa",
        iconType: "graduation-cap",
        category: "system",
        logoPath: "منصة_التدريب_1767514203813.png",
      },
      {
        titleAr: "مشاركة الملفات",
        titleEn: "MOH MyDrive",
        url: "https://mydrive.moh.gov.sa/portal/en/Account/Login",
        iconType: "cloud",
        category: "system",
        logoPath: "mydrive_1767516273165.png",
      },
      {
        titleAr: "PowerPerformance Manager",
        titleEn: "PPM",
        url: "https://ppm-najran.moh.gov.sa/ppm/",
        iconType: "chart",
        category: "system",
        logoPath: "PPM_1767513734753.png",
      },
      {
        titleAr: "مــوعــد",
        titleEn: "Mawid",
        url: "https://mawidstf.moh.gov.sa/#/staffLogin",
        iconType: "calendar",
        category: "system",
        logoPath: "mawid_1767513734752.png",
      },
      {
        titleAr: "عنايتي",
        titleEn: "Enaiti",
        url: "https://mcn.enaiti.com/",
        iconType: "heart",
        category: "system",
        logoPath: "عنايتي_1767514024704.png",
      },
      {
        titleAr: "إحالتي",
        titleEn: "Ehalati",
        url: "https://hsp.moh.gov.sa/",
        iconType: "arrow-right",
        category: "system",
        logoPath: "احالتي_1767517180380.png",
      },
      {
        titleAr: "رقـــيـــم",
        titleEn: "Raqeem",
        url: "https://raqeem.anat.sa/",
        iconType: "file-text",
        category: "system",
        logoPath: "raqeem_1767513734754.png",
      },
      {
        titleAr: "فيدا بلس",
        titleEn: "Vida Plus",
        url: "https://apphiss3vi.moh.gov.sa/",
        iconType: "activity",
        category: "system",
        logoPath: "vida_1767514024703.png",
      },
      {
        titleAr: "نفيس",
        titleEn: "NPHIES",
        url: "https://iam.cs.nphies.sa/",
        iconType: "shield",
        category: "system",
        logoPath: "nphies_1767513734753.png",
      },
      {
        titleAr: "وصـفـتـي",
        titleEn: "Wasfaty",
        url: "https://wasfatypp.moh.gov.sa/",
        iconType: "file-plus",
        category: "system",
        logoPath: "logo-rgb_1768467991326.png",
      },
      {
        titleAr: "إفـــادة",
        titleEn: "Efada",
        url: "https://www.efada.com.sa",
        iconType: "message-circle",
        category: "system",
        logoPath: "efada_1767513734752.png",
      },
      {
        titleAr: "أنـــاة",
        titleEn: "ANAT",
        url: "https://anat.sa/",
        iconType: "clock",
        category: "system",
        logoPath: "Anat-1_1767515239148.webp",
      },
      {
        titleAr: "نوبكو",
        titleEn: "Nupco",
        url: "https://hos.nupco.com/store/login",
        iconType: "box",
        category: "system",
        logoPath: "nupco_1767513734753.png",
      },
      {
        titleAr: "منصة استشارات",
        titleEn: "Consultancy Portal",
        url: "https://937wwe.moh.gov.sa/",
        iconType: "phone",
        category: "system",
        logoPath: "favicon2_(1)_1767514888704.png",
      },
      {
        titleAr: "صـــحـــة",
        titleEn: "Seha",
        url: "https://www.seha.sa/Account/Login",
        iconType: "heart",
        category: "system",
        logoPath: "SehaLogo_1767515239149.png",
      },
      {
        titleAr: "الهيئة السعودية للتخصصات الصحية",
        titleEn: "SCHS",
        url: "https://scfhs.org.sa/ar",
        iconType: "award",
        category: "system",
        logoPath: "SCHS_logo_1767515239145.png",
      },
      {
        titleAr: "اعتـــمـــاد",
        titleEn: "Etimad",
        url: "https://login.etimad.sa/Account/Login",
        iconType: "check-circle",
        category: "system",
        logoPath: "اعتمااااد_1767516335049.png",
      },
      {
        titleAr: "مـــســـار",
        titleEn: "Masar",
        url: "https://masar.sa/Portal/Account/Login",
        iconType: "trending-up",
        category: "system",
        logoPath: "masar-w_1767516273165.png",
      },
      {
        titleAr: "المنصة الوطنية للعمل التطوعي",
        titleEn: "NVG",
        url: "https://nvg.gov.sa/",
        iconType: "users",
        category: "system",
        logoPath: "التطووووع_1767516650602.png",
      },
      {
        titleAr: "مجلس الضمان الصحي",
        titleEn: "Council of Health Insurance",
        url: "https://www.chi.gov.sa/ServicesDirectory/Pages/default.aspx",
        iconType: "shield",
        category: "system",
        logoPath: "IMG_8797_1767048634247.png",
      },
      {
        titleAr: "منصة نموذج الرعاية",
        titleEn: "HealthCare Model Portal",
        url: "http://portal.nhc.moh.gov.sa/#login",
        iconType: "activity",
        category: "system",
        logoPath: "MOC_1767514466423.png",
      },
      {
        titleAr: "النظام الإحصائي",
        titleEn: "Statistical System",
        url: "https://nhc.moh.gov.sa/",
        iconType: "bar-chart",
        category: "system",
        logoPath: "moh_1767513734753.png",
      },
      {
        titleAr: "الأصول الثابتة",
        titleEn: "Fixed Assets",
        url: "https://nhc.moh.gov.sa/",
        iconType: "archive",
        category: "system",
        logoPath: "moh_1767513734753.png",
      },
      {
        titleAr: "تبليغ الولادة والأطفال",
        titleEn: "Birth and Children Reporting",
        url: "https://nhc.moh.gov.sa/",
        iconType: "baby",
        category: "system",
        logoPath: "moh_1767513734753.png",
      },
      {
        titleAr: "نظام الوفيات",
        titleEn: "Death Reporting System",
        url: "https://nhc.moh.gov.sa/",
        iconType: "file-text",
        category: "system",
        logoPath: "moh_1767513734753.png",
      },
    ];

    if (existing.length === 0) {
      // No services exist, create all
      for (const service of seedData) {
        await this.createService(service);
      }
    } else {
      // Services exist - sync logoPath values and add missing services
      for (const seed of seedData) {
        // Normalize Arabic titles by removing tatweel character (ـ)
        const normalizeAr = (t: string) => t.replace(/ـ/g, '').trim();
        const normalizeEn = (t: string) => t.trim().toLowerCase();
        
        // Match by URL (most reliable), or normalized titleEn/titleAr
        const existingService = existing.find(s => {
          const matchUrl = s.url === seed.url && seed.url !== '#';
          const matchEn = normalizeEn(s.titleEn) === normalizeEn(seed.titleEn);
          const matchAr = normalizeAr(s.titleAr) === normalizeAr(seed.titleAr);
          return matchUrl || matchEn || matchAr;
        });
        
        if (existingService) {
          // Always sync logoPath and category (force sync all important fields)
          const updates: { logoPath?: string; category?: string } = {};
          if (seed.logoPath) {
            updates.logoPath = seed.logoPath;
          }
          if (seed.category && existingService.category !== seed.category) {
            updates.category = seed.category;
          }
          if (Object.keys(updates).length > 0) {
            await db.update(services)
              .set(updates)
              .where(eq(services.id, existingService.id));
            console.log(`Synced service: ${seed.titleEn}`, updates);
          }
        } else {
          // Service doesn't exist, create it
          await this.createService(seed);
          console.log(`Created new service: ${seed.titleEn}`);
        }
      }
    }
  }
}

export const storage = new DatabaseStorage();
