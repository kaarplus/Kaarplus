import { prisma } from "@kaarplus/database";

interface SaveConsentInput {
    userId: string;
    marketing: boolean;
    analytics: boolean;
    ipAddress: string;
}

export const gdprService = {
    /**
     * Save or update GDPR consent preferences.
     */
    async saveConsent(input: SaveConsentInput) {
        const consent = await prisma.gdprConsent.upsert({
            where: { userId: input.userId },
            update: {
                marketing: input.marketing,
                analytics: input.analytics,
                ipAddress: input.ipAddress,
                consentDate: new Date(),
            },
            create: {
                userId: input.userId,
                marketing: input.marketing,
                analytics: input.analytics,
                ipAddress: input.ipAddress,
            },
        });

        return consent;
    },

    /**
     * Export all user data for GDPR data portability.
     */
    async exportUserData(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                listings: {
                    select: {
                        id: true,
                        make: true,
                        model: true,
                        year: true,
                        price: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                gdprConsent: {
                    select: {
                        marketing: true,
                        analytics: true,
                        consentDate: true,
                    },
                },
            },
        });

        return {
            exportDate: new Date().toISOString(),
            exportVersion: "1.0",
            profile: user
                ? {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    registeredAt: user.createdAt,
                    lastUpdated: user.updatedAt,
                }
                : null,
            listings: user?.listings || [],
            consent: user?.gdprConsent || null,
        };
    },

    /**
     * Soft-delete a user account.
     * Anonymizes personal data but keeps listing records for integrity.
     */
    async deleteUserAccount(userId: string) {
        await prisma.$transaction(async (tx) => {
            // Anonymize user profile
            await tx.user.update({
                where: { id: userId },
                data: {
                    name: "[Kustutatud kasutaja]",
                    email: `deleted_${userId}@anonymized.kaarplus.ee`,
                    phone: null,
                    image: null,
                    deletedAt: new Date(),
                },
            });

            // Deactivate all listings
            await tx.listing.updateMany({
                where: { userId },
                data: { status: "EXPIRED" },
            });

            // Remove GDPR consent record
            await tx.gdprConsent.deleteMany({
                where: { userId },
            });
        });
    },
};
