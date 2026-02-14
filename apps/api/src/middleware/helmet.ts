import helmetLib from "helmet";

export const helmetMiddleware = helmetLib({
  contentSecurityPolicy: false, // Disabled for API — no HTML served
  crossOriginResourcePolicy: { policy: "cross-origin" },
});
