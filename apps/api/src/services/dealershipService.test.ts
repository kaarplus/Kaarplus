import { describe, it, expect, vi, beforeEach } from 'vitest';

import { NotFoundError } from '../utils/errors';

vi.mock('@kaarplus/database', () => ({
    prisma: {
        user: {
            findMany: vi.fn(),
            findFirst: vi.fn(),
        },
        listing: {
            findMany: vi.fn(),
        },
        message: {
            create: vi.fn(),
        }
    },
}));

vi.mock('../services/emailService', () => ({
    emailService: {
        sendNewMessageEmail: vi.fn().mockResolvedValue(true),
    }
}));

vi.mock('../services/socketService', () => ({
    socketService: {
        isInitialized: vi.fn().mockReturnValue(true),
        emitNewMessage: vi.fn(),
    }
}));
import { DealershipService } from './dealershipService';
import { prisma } from '@kaarplus/database';
import { emailService } from './emailService';
import { socketService } from './socketService';

describe('DealershipService', () => {
    let service: DealershipService;

    beforeEach(() => {
        service = new DealershipService();
        vi.clearAllMocks();
    });

    describe('getDealerships', () => {
        it('should return all dealerships', async () => {
            const mockDealerships = [{ id: '1', name: 'Auto' }];
            vi.mocked(prisma.user.findMany).mockResolvedValue(mockDealerships as any);

            const result = await service.getDealerships();
            expect(result).toEqual(mockDealerships);
            expect(prisma.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: { role: 'DEALERSHIP', deletedAt: null },
            }));
        });
    });

    describe('getDealershipById', () => {
        it('should return dealership by id', async () => {
            const mockDealership = { id: '1', name: 'Auto', role: 'DEALERSHIP' };
            vi.mocked(prisma.user.findFirst).mockResolvedValue(mockDealership as any);

            const result = await service.getDealershipById('1');
            expect(result).toEqual(mockDealership);
        });

        it('should throw NotFoundError if dealership not found', async () => {
            vi.mocked(prisma.user.findFirst).mockResolvedValue(null);

            await expect(service.getDealershipById('999')).rejects.toThrow(NotFoundError);
        });
    });

    describe('getDealershipListings', () => {
        it('should return dealership listings', async () => {
            const mockListings = [{ id: 'l1', make: 'Toyota' }];
            vi.mocked(prisma.listing.findMany).mockResolvedValue(mockListings as any);

            const result = await service.getDealershipListings('1');
            expect(result).toEqual(mockListings);
            expect(prisma.listing.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: { userId: '1', status: 'ACTIVE' },
            }));
        });
    });

    describe('contactDealership', () => {
        it('should send a message to the dealership successfully without senderId', async () => {
            const dealershipId = 'd1';
            const mockDealership = { id: dealershipId, role: 'DEALERSHIP', email: 'dealer@test.com' };
            const contactData = { name: 'John Doe', email: 'john@example.com', message: 'Hi there' };
            const mockMessage = { id: 'm1', recipientId: dealershipId, body: 'Sõnum' };

            vi.mocked(prisma.user.findFirst).mockResolvedValue(mockDealership as any);
            vi.mocked(prisma.message.create).mockResolvedValue(mockMessage as any);

            const result = await service.contactDealership(dealershipId, contactData);

            expect(result).toEqual(mockMessage);
            expect(prisma.message.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    recipientId: dealershipId,
                    subject: `Päring esindusele: ${contactData.name}`,
                })
            }));
            expect(emailService.sendNewMessageEmail).toHaveBeenCalledWith(
                mockDealership.email,
                contactData.name,
                "Teie esindusele"
            );
        });

        it('should send a message to the dealership successfully with senderId', async () => {
            const dealershipId = 'd1';
            const senderId = 'u1';
            const mockDealership = { id: dealershipId, role: 'DEALERSHIP', email: 'dealer@test.com' };
            const contactData = { name: 'Jane Doe', email: 'jane@example.com', message: 'Hi dealer' };
            const mockMessage = { id: 'm1', recipientId: dealershipId, senderId, sender: { name: 'Jane Doe' } };

            vi.mocked(prisma.user.findFirst).mockResolvedValue(mockDealership as any);
            vi.mocked(prisma.message.create).mockResolvedValue(mockMessage as any);

            await service.contactDealership(dealershipId, contactData, senderId);

            expect(prisma.message.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    recipientId: dealershipId,
                    senderId,
                    body: contactData.message,
                })
            }));
            expect(socketService.emitNewMessage).toHaveBeenCalledWith(mockMessage);
        });

        it('should throw NotFoundError if dealership not found', async () => {
            vi.mocked(prisma.user.findFirst).mockResolvedValue(null);

            const contactData = { name: 'John', email: 'john@test.com', message: 'Hello' };
            await expect(service.contactDealership('999', contactData)).rejects.toThrow(NotFoundError);
        });
    });
});
