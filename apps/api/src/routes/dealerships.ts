import { Router } from "express";

import { getAllDealerships, getDealership } from "../controllers/dealershipController";
import { readLimiter } from "../middleware/rateLimiter";

export const dealershipRouter = Router();

// Public routes - apply read limiter for browsing protection
dealershipRouter.get("/", readLimiter, getAllDealerships);
dealershipRouter.get("/:id", readLimiter, getDealership);
