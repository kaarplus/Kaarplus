import { Router } from "express";

import { requireAuth, requireRole } from "../middleware/auth";

export const adminRouter = Router();

// All admin routes require admin role
adminRouter.use(requireAuth);
adminRouter.use(requireRole("ADMIN"));

// GET   /api/admin/listings/pending — P1-T12
// PATCH /api/admin/listings/:id/verify — P1-T12
// GET   /api/admin/users — P1-T12
// GET   /api/admin/analytics — P3-T03
