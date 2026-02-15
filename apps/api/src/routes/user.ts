import { Router } from "express";

import {
    getDashboardStats,
    getMyListings,
    getProfile,
    patchProfile,
} from "../controllers/dashboardController";
import {
    getUserFavorites,
    addFavorite,
    removeFavorite,
    checkFavorite,
    getFavoriteIds,
} from "../controllers/favoriteController";
import { saveConsent, exportData, deleteAccount } from "../controllers/gdprController";
import { requireAuth } from "../middleware/auth";
import { readLimiter, writeLimiter } from "../middleware/rateLimiter";

export const userRouter = Router();

// All user routes require authentication
userRouter.use(requireAuth);

// GDPR endpoints
userRouter.post("/gdpr/consent", saveConsent);
userRouter.get("/gdpr/export", exportData);
userRouter.delete("/gdpr/delete", deleteAccount);

// Favorites endpoints
userRouter.get("/favorites", readLimiter, getUserFavorites);
userRouter.get("/favorites/ids", readLimiter, getFavoriteIds);
userRouter.get("/favorites/:listingId", readLimiter, checkFavorite);
userRouter.post("/favorites/:listingId", writeLimiter, addFavorite);
userRouter.delete("/favorites/:listingId", writeLimiter, removeFavorite);

// Dashboard & Profile endpoints
userRouter.get("/dashboard/stats", readLimiter, getDashboardStats);
userRouter.get("/listings", readLimiter, getMyListings);
userRouter.get("/profile", readLimiter, getProfile);
userRouter.patch("/profile", writeLimiter, patchProfile);

// GET    /api/user/messages — P2-T06
// POST   /api/user/messages — P2-T06
