import { Router } from "express";

import { saveConsent, exportData, deleteAccount } from "../controllers/gdprController";
import { requireAuth } from "../middleware/auth";

export const userRouter = Router();

// All user routes require authentication
userRouter.use(requireAuth);

// GDPR endpoints
userRouter.post("/gdpr/consent", saveConsent);
userRouter.get("/gdpr/export", exportData);
userRouter.delete("/gdpr/delete", deleteAccount);

// GET    /api/user/profile — P1-T05
// PATCH  /api/user/profile — P1-T05
// GET    /api/user/listings — P2-T05
// GET    /api/user/favorites — P2-T01
// POST   /api/user/favorites/:listingId — P2-T01
// DELETE /api/user/favorites/:listingId — P2-T01
// GET    /api/user/messages — P2-T06
// POST   /api/user/messages — P2-T06
