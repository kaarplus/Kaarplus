import { Router } from "express";

import { requireAuth } from "../middleware/auth";

export const userRouter = Router();

// All user routes require authentication
userRouter.use(requireAuth);

// GET    /api/user/profile — P1-T05
// PATCH  /api/user/profile — P1-T05
// GET    /api/user/listings — P2-T05
// GET    /api/user/favorites — P2-T01
// POST   /api/user/favorites/:listingId — P2-T01
// DELETE /api/user/favorites/:listingId — P2-T01
// GET    /api/user/messages — P2-T06
// POST   /api/user/messages — P2-T06
// GET    /api/user/gdpr/export — P1-T14
// DELETE /api/user/gdpr/delete — P1-T14
