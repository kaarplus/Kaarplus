import { prisma } from "@kaarplus/database";
import { NotFoundError } from "../utils/errors";

export class DealershipService {
    async getDealerships() {
        return prisma.user.findMany({
            where: {
                role: "DEALERSHIP",
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                image: true,
                coverImage: true,
                bio: true,
                website: true,
                address: true,
                openingHours: true,
                _count: {
                    select: {
                        listings: {
                            where: { status: "ACTIVE" },
                        },
                    },
                },
            },
            orderBy: { name: "asc" },
        });
    }

    async getDealershipById(id: string) {
        const dealership = await prisma.user.findFirst({
            where: {
                id,
                role: "DEALERSHIP",
                deletedAt: null,
            },
            select: {
                id: true,
                email: true,
                phone: true,
                name: true,
                image: true,
                coverImage: true,
                bio: true,
                website: true,
                address: true,
                openingHours: true,
                createdAt: true,
            },
        });

        if (!dealership) {
            throw new NotFoundError("Dealership not found");
        }

        return dealership;
    }

    async getDealershipListings(id: string) {
        return prisma.listing.findMany({
            where: {
                userId: id,
                status: "ACTIVE",
            },
            include: {
                images: {
                    where: { verified: true },
                    orderBy: { order: "asc" },
                    take: 1,
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
}
