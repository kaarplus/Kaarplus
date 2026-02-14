import { Router } from "express";

import { requireAuth } from "../middleware/auth";

export const paymentsRouter = Router();

// POST /api/payments/create-intent — P3-T01 (auth required)
// POST /api/payments/confirm — P3-T01 (auth required)
