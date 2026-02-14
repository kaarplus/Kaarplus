import { Router } from "express";

import { readLimiter } from "../middleware/rateLimiter";

export const searchRouter = Router();

searchRouter.use(readLimiter);

// GET /api/search — P1-T07
// GET /api/search/makes — P1-T07
// GET /api/search/models — P1-T07
// GET /api/search/filters — P1-T07
