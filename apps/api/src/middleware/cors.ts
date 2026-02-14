import cors from "cors";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

export const corsMiddleware = cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
