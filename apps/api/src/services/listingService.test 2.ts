
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ListingService } from './listingService';
import { ForbiddenError, NotFoundError } from '../utils/errors';

// Mock dependencies
const mockPrisma = {
	listing: {
		findMany: vi.fn(),
		count: vi.fn(),
		findUnique: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
	user: {
		findUnique: vi.fn(),
	},
	listingImage: {
		createMany: vi.fn(),
		update: vi.fn(),
		findUnique: vi.fn(),
		delete: vi.fn(),
	},
	message: {
		create: vi.fn(),
	},
	$transaction: vi.fn((callback) => {
		if (Array.isArray(callback)) {
			return Promise.resolve(callback);
		}
		return Promise.resolve(callback(mockPrisma));
	}),
};

vi.mock('@kaarplus/database', () => ({
	prisma: mockPrisma,
	ListingStatus: {
		ACTIVE: 'ACTIVE',
		PENDING: 'PENDING',
		SOLD: 'SOLD',
	},
}));

// Mock UploadService
vi.mock('./uploadService', () => {
	return {
		UploadService: vi.fn().mockImplementation(() => ({
			deleteFile: vi.fn().mockResolvedValue(true),
		})),
	};
});

describe('ListingService', () => {
	let service: ListingService;

	beforeEach(() => {
		service = new ListingService();
		vi.clearAllMocks();
	});

	describe('getAllListings', () => {
		it('should return paginated listings with default active status', async () => {
			const mockListings = [{ id: '1', make: 'Toyota' }];
			mockPrisma.listing.findMany.mockResolvedValue(mockListings);
			mockPrisma.listing.count.mockResolvedValue(1);

			const result = await service.getAllListings({
				page: 1,
				pageSize: 10,
				sort: 'newest',
			});

			expect(result.data).toEqual(mockListings);
			expect(result.meta.total).toBe(1);
			expect(mockPrisma.listing.findMany).toHaveBeenCalledWith(expect.objectContaining({
				where: expect.objectContaining({ status: 'ACTIVE' }),
			}));
		});

		it('should allow admin to see non-active listings', async () => {
			mockPrisma.listing.findMany.mockResolvedValue([]);
			mockPrisma.listing.count.mockResolvedValue(0);

			await service.getAllListings({ page: 1, pageSize: 10, sort: 'newest' }, true);

			expect(mockPrisma.listing.findMany).toHaveBeenCalledWith(expect.objectContaining({
				where: expect.not.objectContaining({ status: 'ACTIVE' }),
			}));
		});

		it('should apply complex filters', async () => {
			mockPrisma.listing.findMany.mockResolvedValue([]);
			mockPrisma.listing.count.mockResolvedValue(0);

			await service.getAllListings({
				page: 1,
				pageSize: 10,
				sort: 'price_asc',
				make: 'Toyota',
				priceMin: 1000,
				yearMax: 2020,
				fuelType: 'Petrol,Diesel',
				q: 'search term',
			});

			expect(mockPrisma.listing.findMany).toHaveBeenCalledWith(expect.objectContaining({
				where: expect.objectContaining({
					make: { equals: 'Toyota', mode: 'insensitive' },
					price: { gte: 1000, lte: undefined },
					year: { gte: undefined, lte: 2020 },
					fuelType: { in: ['Petrol', 'Diesel'] },
					OR: expect.arrayContaining([
						{ make: { contains: 'search term', mode: 'insensitive' } },
					]),
				}),
				orderBy: { price: 'asc' },
			}));
		});
	});

	describe('getListingById', () => {
		it('should return listing and increment view count', async () => {
			const mockListing = { id: '1', make: 'BMW' };
			mockPrisma.listing.findUnique.mockResolvedValue(mockListing);
			mockPrisma.listing.update.mockResolvedValue(mockListing);

			const result = await service.getListingById('1');
			expect(result).toEqual(mockListing);
			expect(mockPrisma.listing.update).toHaveBeenCalledWith(expect.objectContaining({
				where: { id: '1' },
				data: { viewCount: { increment: 1 } },
			}));
		});

		it('should throw NotFoundError if listing missing', async () => {
			mockPrisma.listing.findUnique.mockResolvedValue(null);
			await expect(service.getListingById('999')).rejects.toThrow(NotFoundError);
		});
	});

	describe('createListing', () => {
		it('should create PENDING listing', async () => {
			const userId = 'user-1';
			const inputData = { make: 'Audi' };
			const mockUser = { id: userId, role: 'DEALERSHIP' };

			mockPrisma.user.findUnique.mockResolvedValue(mockUser);
			mockPrisma.listing.create.mockResolvedValue({ id: 'new', ...inputData, userId, status: 'PENDING' });

			const result = await service.createListing(userId, inputData as any);
			expect(result.status).toBe('PENDING');
		});

		it('should check individual seller limits', async () => {
			const userId = 'user-ind';
			const mockUser = { id: userId, role: 'INDIVIDUAL_SELLER' };

			mockPrisma.user.findUnique.mockResolvedValue(mockUser);
			mockPrisma.listing.count.mockResolvedValue(5); // Limit reached

			await expect(service.createListing(userId, {} as any)).rejects.toThrow(ForbiddenError);
		});
	});

	describe('updateListing', () => {
		it('should update if user owns listing', async () => {
			const mockListing = { id: '1', userId: 'u1' };
			mockPrisma.listing.findUnique.mockResolvedValue(mockListing);
			mockPrisma.listing.update.mockResolvedValue({ ...mockListing, price: 100 });

			const result = await service.updateListing('1', 'u1', false, { price: 100 });
			expect(result.price).toBe(100);
		});

		it('should fail if user does not own listing', async () => {
			const mockListing = { id: '1', userId: 'u1' };
			mockPrisma.listing.findUnique.mockResolvedValue(mockListing);

			await expect(service.updateListing('1', 'u2', false, {})).rejects.toThrow(ForbiddenError);
		});
	});

	describe('contactSeller', () => {
		it('should create message for listing owner', async () => {
			const mockListing = { id: '1', userId: 'owner-1', make: 'Kia', model: 'Rio' };
			mockPrisma.listing.findUnique.mockResolvedValue(mockListing);
			mockPrisma.message.create.mockResolvedValue({ id: 'msg-1' });

			const contactData = { name: 'Buyer', email: 'b@test.com', message: 'Hi' };
			await service.contactSeller('1', contactData);

			expect(mockPrisma.message.create).toHaveBeenCalledWith(expect.objectContaining({
				data: expect.objectContaining({
					recipientId: 'owner-1',
					listingId: '1',
					senderId: 'system',
					body: expect.stringContaining('Nimi: Buyer'),
				}),
			}));
		});
	});

	describe('image operations', () => {
		it('should add images', async () => {
			const mockListing = { id: '1', userId: 'u1' };
			mockPrisma.listing.findUnique.mockResolvedValue(mockListing);
			mockPrisma.listingImage.createMany.mockResolvedValue({ count: 2 });

			await service.addImages('1', 'u1', false, [{ url: 'a.jpg', order: 1 }]);
			expect(mockPrisma.listingImage.createMany).toHaveBeenCalled();
		});

		it('should delete image', async () => {
			const mockListing = { id: '1', userId: 'u1' };
			const mockImage = { id: 'img-1', url: 'a.jpg' };

			mockPrisma.listing.findUnique.mockResolvedValue(mockListing);
			mockPrisma.listingImage.findUnique.mockResolvedValue(mockImage);
			mockPrisma.listingImage.delete.mockResolvedValue(mockImage);

			await service.deleteImage('1', 'img-1', 'u1', false);
			expect(mockPrisma.listingImage.delete).toHaveBeenCalledWith({ where: { id: 'img-1' } });
		});
	});
});
