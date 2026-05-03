import express, { type Express } from "express";
import fs from "fs";
import path from "path";

const BASE_URL = 'https://najrancluster.com';

const routeSEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'تجمع نجران الصحي | Najran Health Cluster',
    description: 'يقدم تجمع نجران الصحي خدمات الرعاية الصحية لأكثر من 495 ألف مستفيد، من خلال 69 مركزًا للرعاية الأولية، و 12 مستشفى عام ومتخصص بسعة سريرية إجمالية تصل إلى 1300 سريرًا.',
  },
  '/about': {
    title: 'من نحن | تجمع نجران الصحي - الخدمات والمستشفيات والقيادة',
    description: 'تجمع نجران الصحي - تعرف على خدماتنا الصحية، مستشفياتنا الـ12، مراكز الرعاية الصحية الأولية الـ69، والقيادة التنفيذية. نخدم أكثر من 495 ألف مستفيد في منطقة نجران.',
  },
  '/news': {
    title: 'الأخبار والفعاليات | تجمع نجران الصحي',
    description: 'آخر أخبار وفعاليات تجمع نجران الصحي - تغطية شاملة للأحداث والمبادرات الصحية في منطقة نجران.',
  },
  '/care-model': {
    title: 'أنظمة الرعاية الصحية | تجمع نجران الصحي',
    description: 'تعرف على أنظمة الرعاية الصحية المتكاملة في تجمع نجران الصحي.',
  },
  '/employee-services': {
    title: 'خدمات الموظفين | تجمع نجران الصحي',
    description: 'الخدمات الإلكترونية والأنظمة المتاحة لموظفي تجمع نجران الصحي.',
  },
  '/e-services': {
    title: 'الخدمات الإلكترونية | تجمع نجران الصحي',
    description: 'المنصات والخدمات الإلكترونية الصحية المتاحة للمستفيدين.',
  },
  '/transformation': {
    title: 'التحول الصحي | تجمع نجران الصحي',
    description: 'رحلة التحول الصحي في تجمع نجران الصحي ضمن رؤية السعودية 2030.',
  },
};

function injectSEO(html: string, requestPath: string): string {
  const normalizedPath = requestPath === '' ? '/' : requestPath.split('?')[0];
  const seo = routeSEO[normalizedPath] || routeSEO['/'];
  const canonicalUrl = normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;

  let result = html;
  result = result.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  result = result.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${seo.title}</title>`
  );
  result = result.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${seo.description}" />`
  );
  result = result.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${seo.title}" />`
  );
  result = result.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${seo.description}" />`
  );

  return result;
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Cache static assets aggressively (JS/CSS/images have hashed filenames)
  app.use('/assets', express.static(distPath + '/assets', {
    maxAge: '1y',
    immutable: true,
    etag: false,
  }));

  // Cache other static files (favicon, manifest, sw) for a short time
  app.use(express.static(distPath, {
    maxAge: '1h',
    etag: true,
    lastModified: true,
  }));

  // SPA fallback — serve index.html for all routes so client-side routing works
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    const html = fs.readFileSync(indexPath, 'utf-8');
    const modifiedHtml = injectSEO(html, req.originalUrl);
    res
      .status(200)
      .set({
        "Content-Type": "text/html",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      })
      .send(modifiedHtml);
  });
}
