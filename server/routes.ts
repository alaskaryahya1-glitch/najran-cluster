import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { ensureTablesExist } from "./db";
import { api } from "@shared/routes";
import path from "path";
import fs from "fs";
import { getNews, seedInitialTweets, forceRefreshTweets } from "./twitter-service";
import https from "https";

// In-memory cache for services (5 minute TTL)
let servicesCache: { data: any[]; ts: number } | null = null;
const SERVICES_CACHE_TTL = 5 * 60 * 1000;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  const publicPath = process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "public")
    : path.resolve(process.cwd(), "client", "public");
  
  // Health check - keeps container warm and used by Railway
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", ts: Date.now() });
  });

  app.get("/sitemap.xml", (_req, res) => {
    const filePath = path.join(publicPath, "sitemap.xml");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/xml");
      res.sendFile(filePath);
    } else {
      res.status(404).send("Not Found");
    }
  });

  app.get("/robots.txt", (_req, res) => {
    const filePath = path.join(publicPath, "robots.txt");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/plain");
      res.sendFile(filePath);
    } else {
      res.status(404).send("Not Found");
    }
  });

  app.get("/google8c3c7f02524ccfe9.html", (_req, res) => {
    const filePath = path.join(publicPath, "google8c3c7f02524ccfe9.html");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/html");
      res.sendFile(filePath);
    } else {
      res.status(404).send("Not Found");
    }
  });

  // Services endpoint with in-memory cache
  app.get(api.services.list.path, async (_req, res) => {
    try {
      const now = Date.now();
      if (servicesCache && now - servicesCache.ts < SERVICES_CACHE_TTL) {
        res.setHeader('Cache-Control', 'public, max-age=60');
        return res.json(servicesCache.data);
      }
      const services = await storage.getServices();
      servicesCache = { data: services, ts: now };
      res.setHeader('Cache-Control', 'public, max-age=60');
      res.json(services);
    } catch (err) {
      console.error('[API] getServices error:', err);
      res.json([]);
    }
  });

  app.get("/api/image-proxy", async (req, res) => {
    const mediaUrl = req.query.url as string;
    
    if (!mediaUrl || (!mediaUrl.startsWith('https://pbs.twimg.com/') && !mediaUrl.startsWith('https://video.twimg.com/'))) {
      return res.status(400).send('Invalid media URL');
    }
    
    try {
      const parsedUrl = new URL(mediaUrl);
      const headers: Record<string, string> = {};
      if (req.headers.range) {
        headers['Range'] = req.headers.range;
      }

      const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers,
      };

      const proxyReq = https.request(options, (proxyRes) => {
        const contentType = proxyRes.headers['content-type'] || 'application/octet-stream';
        const statusCode = proxyRes.statusCode || 200;

        res.status(statusCode);
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=604800');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (proxyRes.headers['content-length']) {
          res.setHeader('Content-Length', proxyRes.headers['content-length']);
        }
        if (proxyRes.headers['content-range']) {
          res.setHeader('Content-Range', proxyRes.headers['content-range']);
        }

        proxyRes.pipe(res);
      });
      
      proxyReq.on('error', (err) => {
        console.error('[Media Proxy] Error:', err);
        if (!res.headersSent) {
          res.status(500).send('Failed to fetch media');
        }
      });

      proxyReq.end();
    } catch (error) {
      console.error('[Media Proxy] Error:', error);
      if (!res.headersSent) {
        res.status(500).send('Failed to fetch media');
      }
    }
  });

  app.get("/api/news", async (_req, res) => {
    try {
      const newsData = await getNews();
      
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.json({
        tweets: newsData.tweets.map(t => ({
          id: t.id,
          text: t.text,
          created_at: t.createdAt.toISOString(),
          author_name: t.authorName,
          author_username: t.authorUsername,
          image_url: t.imageUrl,
          image_urls: t.imageUrls,
          video_url: t.videoUrl,
        })),
        lastUpdated: newsData.lastUpdated?.toISOString() || null,
        monthlyUsage: newsData.monthlyUsage,
        count: newsData.tweets.length,
      });
    } catch (error) {
      console.error('[API] Failed to get news:', error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  });

  app.post("/api/news/refresh", async (_req, res) => {
    try {
      const result = await forceRefreshTweets();
      res.json(result);
    } catch (error) {
      console.error('[API] Failed to refresh tweets:', error);
      res.status(500).json({ success: false, message: 'Failed to refresh tweets' });
    }
  });

  try {
    await ensureTablesExist();
  } catch (err) {
    console.error('[STARTUP] ensureTablesExist failed:', err);
  }

  try {
    await storage.seedServices();
    // Pre-warm the services cache on startup
    const services = await storage.getServices();
    servicesCache = { data: services, ts: Date.now() };
    console.log(`[STARTUP] Services seeded and cached (${services.length} services).`);
  } catch (err) {
    console.error('[STARTUP] seedServices failed (non-fatal):', err);
  }

  try {
    await seedInitialTweets();
    console.log('[STARTUP] Tweets seeded successfully.');
  } catch (err) {
    console.error('[STARTUP] seedInitialTweets failed (non-fatal):', err);
  }

  return httpServer;
}
