import { Request, Response, NextFunction } from "express";

import { gdprService } from "../services/gdprService";

/**
 * POST /api/user/gdpr/consent
 * Save or update cookie consent preferences.
 */
export async function saveConsent(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const { marketing, analytics } = req.body;
        const ipAddress = req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";

        const consent = await gdprService.saveConsent({
            userId,
            marketing: Boolean(marketing),
            analytics: Boolean(analytics),
            ipAddress,
        });

        res.json({ data: consent });
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/user/gdpr/export
 * Export all user data as JSON.
 */
export async function exportData(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const data = await gdprService.exportUserData(userId);

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename="kaarplus-data-export-${userId}.json"`);
        res.json({ data });
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE /api/user/gdpr/delete
 * Soft-delete user account and anonymize data.
 */
export async function deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        await gdprService.deleteUserAccount(userId);

        res.json({
            data: {
                message: "Account deletion initiated. Your data will be removed within 30 days.",
                deletionScheduledAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            },
        });
    } catch (error) {
        next(error);
    }
}
