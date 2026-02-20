import { Router } from "express";

import { getAllDealerships, getDealership, contactDealership } from "../controllers/dealershipController";
import { optionalAuth } from "../middleware/auth";
import { readLimiter, writeLimiter } from "../middleware/rateLimiter";
import { validate } from "../middleware/validate";
import { contactDealershipSchema } from "../schemas/dealership";

export const dealershipRouter = Router();

// Public routes - apply read limiter for browsing protection
dealershipRouter.get("/", readLimiter, getAllDealerships);
dealershipRouter.get("/:id", readLimiter, getDealership);
dealershipRouter.post(
    "/:id/contact",
    optionalAuth,
    writeLimiter,
    validate(contactDealershipSchema),
    contactDealership
);
