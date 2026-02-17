import { Request, Response, NextFunction } from "express";

import { favoriteService } from "../services/favoriteService";
import { NotFoundError, ConflictError, ErrorCode } from "../utils/errors";

/**
 * GET /api/user/favorites
 * Get paginated list of user's favorite listings.
 */
export async function getUserFavorites(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize as string) || 20));

        const { favorites, total } = await favoriteService.getFavorites(userId, page, pageSize);

        res.json({
            data: favorites,
            meta: { page, pageSize, total },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/user/favorites/:listingId
 * Add a listing to the user's favorites.
 */
export async function addFavorite(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const listingId = req.params.listingId as string;

        const favorite = await favoriteService.addFavorite(userId, listingId);

        res.status(201).json({ data: favorite });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "LISTING_NOT_FOUND") {
                next(new NotFoundError("Listing not found", ErrorCode.LISTING_NOT_FOUND));
                return;
            }
            if (error.message === "ALREADY_FAVORITED") {
                next(new ConflictError("Listing is already in favorites", ErrorCode.ALREADY_FAVORITED));
                return;
            }
        }
        next(error);
    }
}

/**
 * DELETE /api/user/favorites/:listingId
 * Remove a listing from the user's favorites.
 */
export async function removeFavorite(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const listingId = req.params.listingId as string;

        await favoriteService.removeFavorite(userId, listingId);

        res.json({ data: { message: "Listing removed from favorites" } });
    } catch (error) {
        if (error instanceof Error && error.message === "FAVORITE_NOT_FOUND") {
            next(new NotFoundError("Favorite not found", ErrorCode.FAVORITE_NOT_FOUND));
            return;
        }
        next(error);
    }
}

/**
 * GET /api/user/favorites/:listingId
 * Check if the user has favorited a specific listing.
 */
export async function checkFavorite(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const listingId = req.params.listingId as string;

        const result = await favoriteService.checkFavorite(userId, listingId);

        res.json({ data: result });
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/user/favorites/ids
 * Get all favorited listing IDs for the user (bulk check).
 */
export async function getFavoriteIds(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;

        const ids = await favoriteService.getFavoriteIds(userId);

        res.json({ data: ids });
    } catch (error) {
        next(error);
    }
}
