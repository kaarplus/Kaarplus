import { Router } from "express";

import * as adminController from "../controllers/adminController";
import { requireAuth, requireRole } from "../middleware/auth";
import { adminLimiter, readLimiter, writeLimiter } from "../middleware/rateLimiter";
import { asyncHandler } from "../utils/asyncHandler";

export const adminRouter = Router();

// All admin routes require admin role
adminRouter.use(requireAuth);
adminRouter.use(requireRole("ADMIN", "SUPPORT"));

// Apply base admin rate limiting
adminRouter.use(adminLimiter);

// Listings
adminRouter.get("/listings/pending", readLimiter, asyncHandler(adminController.getPendingListings));
adminRouter.patch("/listings/:id/verify", writeLimiter, asyncHandler(adminController.verifyListing));

// Users
adminRouter.get("/users", readLimiter, asyncHandler(adminController.getUsers));

// Analytics & Stats
adminRouter.get("/analytics", readLimiter, asyncHandler(adminController.getAnalytics));
adminRouter.get("/stats", readLimiter, asyncHandler(adminController.getStats));

