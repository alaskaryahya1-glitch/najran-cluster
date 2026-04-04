// Catch all errors
process.on('uncaughtException', (err) => {
  console.error('[ERROR] uncaughtException:', err.message);
  console.error(err.stack);
  // Don't exit - keep server running
});
process.on('unhandledRejection', (reason) => {
  console.error('[ERROR] unhandledRejection:', reason);
  // Don't exit - keep server running
});

import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

console.log('[STARTUP] Starting server...');
console.log('[STARTUP] NODE_ENV:', process.env.NODE_ENV);
console.log('[STARTUP] DATABASE_URL set:', !!process.env.DATABASE_URL);
console.log('[STARTUP] PORT:', process.env.PORT);

const app = express();
app.use(compression());
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log('[STARTUP] Registering routes...');
    await registerRoutes(httpServer, app);
    console.log('[STARTUP] Routes registered.');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    });

    if (process.env.NODE_ENV === "production") {
      console.log('[STARTUP] Setting up static serving...');
      serveStatic(app);
      console.log('[STARTUP] Static serving ready.');
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    const port = parseInt(process.env.PORT || "5000", 10);
    console.log('[STARTUP] Listening on port:', port);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        log(`serving on port ${port}`);
      },
    );
  } catch (err: any) {
    console.error('[STARTUP ERROR] Server failed to start:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
