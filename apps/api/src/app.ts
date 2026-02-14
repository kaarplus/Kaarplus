import cookieParser from "cookie-parser";
import express from "express";

import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/errorHandler";
import { helmetMiddleware } from "./middleware/helmet";
import { defaultLimiter } from "./middleware/rateLimiter";
import { apiRouter } from "./routes";

export function createApp() {
  const app = express();

  // --- Global middleware ---
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(defaultLimiter);
  app.use(cookieParser());

  // JSON body parser (skip for webhook routes that need raw body)
  app.use(
    express.json({
      limit: "10mb",
    })
  );
  app.use(express.urlencoded({ extended: true }));

  // --- Routes ---
  app.use("/api", apiRouter);

  // --- Error handling (must be last) ---
  app.use(errorHandler);

  return app;
}
