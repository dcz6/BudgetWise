import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { registerAuthRoutes } from "./auth";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";

const app = express();

// Add CORS headers to handle cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

// Basic rate limiting
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
};

app.use((req, res, next) => {
  res.setHeader('X-RateLimit-Limit', rateLimit.max);
  next();
});

(async () => {
  // Setup session handling
  const PostgresqlStore = connectPgSimple(session);
  app.use(
    session({
      store: new PostgresqlStore({
        conObject: {
          connectionString: process.env.DATABASE_URL,
        },
      }),
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Register routes
  registerAuthRoutes(app);
  registerRoutes(app);

  const server = createServer(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const path = await import("path");
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    app.use(express.static(path.resolve(__dirname, "../dist/public")));

    // Handle API routes
    app.use("/api", (req, res, next) => next());

    // Serve index.html for client-side routing
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "../dist/public/index.html"));
    });
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    console.log(`${formattedTime} [express] serving on port ${PORT}`);
  });
})();