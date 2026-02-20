import { Request, Response, NextFunction } from "express";

import {
    getUserDashboardStats,
    getUserListings,
    getUserProfile,
    updateUserProfile,
    updateNotificationPrefs as updateNotificationPrefsService,
} from "../services/dashboardService";
import { NotFoundError, ErrorCode } from "../utils/errors";

export const getDashboardStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const stats = await getUserDashboardStats(userId);
        res.json({ data: stats });
    } catch (error) {
        next(error);
    }
};

export const getMyListings = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const pageSize = Math.min(
            50,
            Math.max(1, parseInt(req.query.pageSize as string) || 10)
        );

        const { listings, total } = await getUserListings(userId, page, pageSize);

        res.json({
            data: listings,
            meta: { page, pageSize, total },
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const user = await getUserProfile(userId);

        if (!user) {
            throw new NotFoundError("User not found", ErrorCode.USER_NOT_FOUND);
        }

        res.json({ data: user });
    } catch (error) {
        next(error);
    }
};

export const patchProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const { name, phone } = req.body;

        const user = await updateUserProfile(userId, { name, phone });
        res.json({ data: user });
    } catch (error) {
        next(error);
    }
};

export const updateNotificationPrefs = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;
        const prefs = req.body;

        const user = await updateNotificationPrefsService(userId, prefs);
        res.json({ data: user });
    } catch (error) {
        next(error);
    }
};
