import { Router } from "express";

export const webhooksRouter = Router();

// POST /api/webhooks/stripe — P3-T01
// Note: Stripe webhooks need raw body, configured separately in app.ts
