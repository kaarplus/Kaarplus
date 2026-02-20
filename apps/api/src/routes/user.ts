import { Router } from "express";

import {
    getDashboardStats,
    getMyListings,
    getProfile,
    patchProfile,
    updateNotificationPrefs,
} from "../controllers/dashboardController";
import {
    getUserFavorites,
    addFavorite,
    removeFavorite,
    checkFavorite,
    getFavoriteIds,
} from "../controllers/favoriteController";
import { saveConsent, exportData, deleteAccount } from "../controllers/gdprController";
import {
    requestInspection,
    getMyInspections,
    getInspection,
} from "../controllers/inspectionController";
import {
    getConversations,
    getThread,
    getUnreadCount,
    sendMessage,
    markMessagesAsRead,
} from "../controllers/messageController";
import {
    getSavedSearches,
    createSavedSearch,
    updateSavedSearch,
    deleteSavedSearch,
} from "../controllers/savedSearchController";
import { requireAuth } from "../middleware/auth";
import { readLimiter, writeLimiter, strictLimiter } from "../middleware/rateLimiter";
import { validate } from "../middleware/validate";
import { updateNotificationPrefsSchema } from "../schemas/user";

export const userRouter = Router();

// All user routes require authentication
userRouter.use(requireAuth);

// GDPR endpoints
userRouter.post("/gdpr/consent", writeLimiter, saveConsent);
userRouter.delete("/gdpr/delete", writeLimiter, deleteAccount);

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
userRouter.patch("/notifications", writeLimiter, validate(updateNotificationPrefsSchema), updateNotificationPrefs);

// Saved searches
userRouter.get("/saved-searches", readLimiter, getSavedSearches);
userRouter.post("/saved-searches", writeLimiter, createSavedSearch);
userRouter.patch("/saved-searches/:id", writeLimiter, updateSavedSearch);
userRouter.delete("/saved-searches/:id", writeLimiter, deleteSavedSearch);

// Inspection endpoints
userRouter.post("/inspections", writeLimiter, requestInspection);
userRouter.get("/inspections", readLimiter, getMyInspections);
userRouter.get("/inspections/:id", readLimiter, getInspection);

// Messaging endpoints
userRouter.get("/messages", readLimiter, getConversations);
userRouter.get("/messages/thread", readLimiter, getThread);
userRouter.get("/messages/unread-count", readLimiter, getUnreadCount);
userRouter.post("/messages", writeLimiter, sendMessage);
userRouter.patch("/messages/mark-read", writeLimiter, markMessagesAsRead);

// GDPR export is expensive - use strict rate limit (10 req/15min)
userRouter.get("/gdpr/export", strictLimiter, exportData);
