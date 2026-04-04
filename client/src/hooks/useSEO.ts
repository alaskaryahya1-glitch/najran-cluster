import { useEffect } from 'react';

interface SEOConfig {
  path: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

const BASE_URL = 'https://najrancluster.com';

export function useSEO(config: SEOConfig, language: 'ar' | 'en') {
  useEffect(() => {
    document.title = language === 'ar' ? config.titleAr : config.titleEn;
    
    const canonicalUrl = config.path === '/' 
      ? `${BASE_URL}/` 
      : `${BASE_URL}${config.path}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }
    
    if (config.descriptionAr && config.descriptionEn) {
      const descriptionContent = language === 'ar' ? config.descriptionAr : config.descriptionEn;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', descriptionContent);
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', descriptionContent);
      }
    }
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', language === 'ar' ? config.titleAr : config.titleEn);
    }
  }, [config, language]);
}
