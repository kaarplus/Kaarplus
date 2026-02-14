import { Router } from "express";

import * as uploadController from "../controllers/uploadController";
import { requireAuth } from "../middleware/auth";
import { writeLimiter } from "../middleware/rateLimiter";

export const uploadsRouter = Router();

// Only authenticated users can request presigned URLs
uploadsRouter.post("/presign", requireAuth, writeLimiter, uploadController.getPresignedUrl);
