import { Router } from "express";

import { readLimiter, writeLimiter } from "../middleware/rateLimiter";

export const listingsRouter = Router();

// GET    /api/listings — P1-T07 (public, read limiter)
// GET    /api/listings/:id — P1-T07 (public)
// POST   /api/listings — P1-T07 (auth + seller role, write limiter)
// PATCH  /api/listings/:id — P1-T07 (owner/admin)
// DELETE /api/listings/:id — P1-T07 (owner/admin)
// GET    /api/listings/:id/similar — P1-T07 (public)
// POST   /api/listings/:id/contact — P1-T07 (public)
