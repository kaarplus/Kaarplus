import { Router } from "express";

import { handleStripeWebhook } from "../controllers/webhookController";
import { webhookLimiter } from "../middleware/rateLimiter";

export const webhooksRouter = Router();

// Stripe webhook (public)
// Note: Signature is verified in the controller
// Apply webhook-specific rate limiting to prevent flooding
webhooksRouter.post("/stripe", webhookLimiter, handleStripeWebhook);
