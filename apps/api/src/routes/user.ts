import { Router } from "express";

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

// GET    /api/user/profile — P1-T05
// PATCH  /api/user/profile — P1-T05
// GET    /api/user/listings — P2-T05
// GET    /api/user/messages — P2-T06
// POST   /api/user/messages — P2-T06
