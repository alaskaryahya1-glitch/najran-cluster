import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useI18n } from '@/lib/i18n';

const BASE_URL = 'https://najrancluster.com';

interface PageSEO {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

const routeSEO: Record<string, PageSEO> = {
  '/': {
    titleAr: 'تجمع نجران الصحي | Najran Health Cluster',
    titleEn: 'Najran Health Cluster | تجمع نجران الصحي',
    descriptionAr: 'يقدم تجمع نجران الصحي خدمات الرعاية الصحية لأكثر من 495 ألف مستفيد، من خلال 69 مركزًا للرعاية الأولية، و 12 مستشفى عام ومتخصص بسعة سريرية إجمالية تصل إلى 1300 سريرًا.',
    descriptionEn: 'Najran Health Cluster provides healthcare services to over 495,000 beneficiaries through 69 primary care centers and 12 general and specialized hospitals with a total bed capacity of 1,300.',
  },
  '/about': {
    titleAr: 'من نحن | تجمع نجران الصحي - الخدمات والمستشفيات والقيادة',
    titleEn: 'About Us | Najran Health Cluster - Services, Hospitals & Leadership',
    descriptionAr: 'تجمع نجران الصحي - تعرف على خدماتنا الصحية، مستشفياتنا الـ12، مراكز الرعاية الصحية الأولية الـ69، والقيادة التنفيذية. نخدم أكثر من 495 ألف مستفيد في منطقة نجران.',
    descriptionEn: 'Najran Health Cluster - Learn about our healthcare services, 12 hospitals, 69 primary healthcare centers, and executive leadership. Serving 495,000+ beneficiaries in Najran Region.',
  },
  '/news': {
    titleAr: 'الأخبار والفعاليات | تجمع نجران الصحي',
    titleEn: 'News & Events | Najran Health Cluster',
    descriptionAr: 'آخر أخبار وفعاليات تجمع نجران الصحي - تغطية شاملة للأحداث والمبادرات الصحية في منطقة نجران.',
    descriptionEn: 'Latest news and events from Najran Health Cluster - comprehensive coverage of health events and initiatives in Najran Region.',
  },
  '/care-model': {
    titleAr: 'أنظمة الرعاية الصحية | تجمع نجران الصحي',
    titleEn: 'Healthcare Systems | Najran Health Cluster',
    descriptionAr: 'تعرف على أنظمة الرعاية الصحية المتكاملة في تجمع نجران الصحي.',
    descriptionEn: 'Learn about integrated healthcare systems at Najran Health Cluster.',
  },
  '/employee-services': {
    titleAr: 'خدمات الموظفين | تجمع نجران الصحي',
    titleEn: 'Employee Services | Najran Health Cluster',
    descriptionAr: 'الخدمات الإلكترونية والأنظمة المتاحة لموظفي تجمع نجران الصحي.',
    descriptionEn: 'Electronic services and systems available for Najran Health Cluster employees.',
  },
  '/e-services': {
    titleAr: 'الخدمات الإلكترونية | تجمع نجران الصحي',
    titleEn: 'E-Services | Najran Health Cluster',
    descriptionAr: 'المنصات والخدمات الإلكترونية الصحية المتاحة للمستفيدين.',
    descriptionEn: 'Electronic health platforms and services available for beneficiaries.',
  },
  '/transformation': {
    titleAr: 'التحول الصحي | تجمع نجران الصحي',
    titleEn: 'Health Transformation | Najran Health Cluster',
    descriptionAr: 'رحلة التحول الصحي في تجمع نجران الصحي ضمن رؤية السعودية 2030.',
    descriptionEn: 'Health transformation journey at Najran Health Cluster under Saudi Vision 2030.',
  },
};

const defaultSEO: PageSEO = {
  titleAr: 'تجمع نجران الصحي | Najran Health Cluster',
  titleEn: 'Najran Health Cluster | تجمع نجران الصحي',
  descriptionAr: 'تجمع نجران الصحي - خدمات صحية متكاملة لمنطقة نجران.',
  descriptionEn: 'Najran Health Cluster - Integrated healthcare services for Najran Region.',
};

export function SEOManager() {
  const [location] = useLocation();
  const { language } = useI18n();

  useEffect(() => {
    const seo = routeSEO[location] || defaultSEO;
    const canonicalUrl = location === '/' ? `${BASE_URL}/` : `${BASE_URL}${location}`;

    document.title = language === 'ar' ? seo.titleAr : seo.titleEn;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', language === 'ar' ? seo.titleAr : seo.titleEn);
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    const descriptionContent = language === 'ar' ? seo.descriptionAr : seo.descriptionEn;
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionContent);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', descriptionContent);
    }
  }, [location, language]);

  return null;
}
