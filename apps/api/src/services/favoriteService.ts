import { prisma } from "@kaarplus/database";

export const favoriteService = {
    /**
     * Get paginated favorites for a user, including listing with first image.
     */
    async getFavorites(userId: string, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const [favorites, total] = await Promise.all([
            prisma.favorite.findMany({
                where: { userId },
                skip,
                take: pageSize,
                orderBy: { createdAt: "desc" },
                include: {
                    listing: {
                        include: {
                            images: {
                                take: 1,
                                orderBy: { order: "asc" },
                            },
                        },
                    },
                },
            }),
            prisma.favorite.count({ where: { userId } }),
        ]);

        return { favorites, total };
    },

    /**
     * Add a listing to the user's favorites.
     * Checks that the listing exists and is not already favorited.
     * Increments the listing's favoriteCount.
     */
    async addFavorite(userId: string, listingId: string) {
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
        });

        if (!listing) {
            throw new Error("LISTING_NOT_FOUND");
        }

        const existing = await prisma.favorite.findUnique({
            where: { userId_listingId: { userId, listingId } },
        });

        if (existing) {
            throw new Error("ALREADY_FAVORITED");
        }

        const favorite = await prisma.$transaction(async (tx) => {
            const created = await tx.favorite.create({
                data: { userId, listingId },
            });

            await tx.listing.update({
                where: { id: listingId },
                data: { favoriteCount: { increment: 1 } },
            });

            return created;
        });

        return favorite;
    },

    /**
     * Remove a listing from the user's favorites.
     * Decrements the listing's favoriteCount.
     */
    async removeFavorite(userId: string, listingId: string) {
        const existing = await prisma.favorite.findUnique({
            where: { userId_listingId: { userId, listingId } },
        });

        if (!existing) {
            throw new Error("FAVORITE_NOT_FOUND");
        }

        await prisma.$transaction(async (tx) => {
            await tx.favorite.delete({
                where: { userId_listingId: { userId, listingId } },
            });

            await tx.listing.update({
                where: { id: listingId },
                data: { favoriteCount: { decrement: 1 } },
            });
        });
    },

    /**
     * Check if a user has favorited a specific listing.
     */
    async checkFavorite(userId: string, listingId: string) {
        const favorite = await prisma.favorite.findUnique({
            where: { userId_listingId: { userId, listingId } },
        });

        return { isFavorited: !!favorite };
    },

    /**
     * Get all favorited listing IDs for a user (for bulk checking on frontend).
     */
    async getFavoriteIds(userId: string) {
        const favorites = await prisma.favorite.findMany({
            where: { userId },
            select: { listingId: true },
        });

        return favorites.map((f) => f.listingId);
    },
};
