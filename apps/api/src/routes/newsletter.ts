import { Router } from "express";

import { subscribe, unsubscribe } from "../controllers/newsletterController";
import { readLimiter, writeLimiter } from "../middleware/rateLimiter";

export const newsletterRouter = Router();

// Subscribe endpoint - write operation with strict limiting
newsletterRouter.post("/subscribe", writeLimiter, subscribe);

// Unsubscribe endpoint - read operation (token-based, idempotent)
newsletterRouter.get("/unsubscribe", readLimiter, unsubscribe);
