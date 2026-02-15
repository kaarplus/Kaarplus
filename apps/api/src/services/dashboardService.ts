import { prisma } from "@kaarplus/database";

export interface DashboardStats {
    activeListings: number;
    totalViews: number;
    totalFavorites: number;
    totalMessages: number;
}

export async function getUserDashboardStats(userId: string): Promise<DashboardStats> {
    const [activeListings, viewsResult, favoritesResult, totalMessages] = await Promise.all([
        prisma.listing.count({
            where: { userId, status: "ACTIVE" },
        }),
        prisma.listing.aggregate({
            where: { userId },
            _sum: { viewCount: true },
        }),
        prisma.listing.aggregate({
            where: { userId },
            _sum: { favoriteCount: true },
        }),
        prisma.message.count({
            where: { recipientId: userId },
        }),
    ]);

    return {
        activeListings,
        totalViews: viewsResult._sum.viewCount ?? 0,
        totalFavorites: favoritesResult._sum.favoriteCount ?? 0,
        totalMessages,
    };
}

export async function getUserListings(
    userId: string,
    page: number,
    pageSize: number
) {
    const skip = (page - 1) * pageSize;

    const [listings, total] = await Promise.all([
        prisma.listing.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
            include: {
                images: {
                    orderBy: { order: "asc" },
                    take: 1,
                },
                _count: {
                    select: {
                        favorites: true,
                        messages: true,
                    },
                },
            },
        }),
        prisma.listing.count({ where: { userId } }),
    ]);

    return { listings, total };
}

export async function getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            image: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}

export async function updateUserProfile(
    userId: string,
    data: { name?: string; phone?: string }
) {
    const user = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            image: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}
