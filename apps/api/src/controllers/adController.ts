import { Request, Response } from "express";

import { AdService } from "../services/adService";
import { getUserId } from "../utils/validation";

const adService = new AdService();

// ─── Public Endpoints ─────────────────────────────────────────

export const getAdForPlacement = async (req: Request, res: Response) => {
	const placementId = String(req.params.placementId);
	const context = {
		fuelType: req.query.fuelType ? String(req.query.fuelType) : undefined,
		bodyType: req.query.bodyType ? String(req.query.bodyType) : undefined,
		make: req.query.make ? String(req.query.make) : undefined,
		location: req.query.location ? String(req.query.location) : undefined,
	};

	const ad = await adService.getAdForPlacement(placementId, context);
	res.json({ data: ad });
};

export const trackAdEvent = async (req: Request, res: Response) => {
	// Body validated by middleware
	const { eventType, device, locale, metadata } = req.body as {
		eventType: "IMPRESSION" | "CLICK";
		device?: string;
		locale?: string;
		metadata?: Record<string, unknown>;
	};
	const id = String(req.params.id);
	const ip = req.ip || req.socket.remoteAddress;
	await adService.trackEvent(id, eventType, {
		userId: getUserId(req),
		device,
		locale,
		ip,
		metadata,
	});

	res.status(204).send();
};

// ─── Admin: Campaigns ─────────────────────────────────────────

export const getCampaigns = async (req: Request, res: Response) => {
	// Query validated by middleware
	const { page, pageSize, status } = (req.validatedQuery || req.query) as unknown as {
		page: number;
		pageSize: number;
		status?: string;
	};
	const response = await adService.getCampaigns(page, pageSize, status);
	res.json(response);
};

export const getCampaignById = async (req: Request, res: Response) => {
	const id = String(req.params.id);
	const campaign = await adService.getCampaignById(id);
	res.json({ data: campaign });
};

export const createCampaign = async (req: Request, res: Response) => {
	// Body validated by middleware
	const data = req.body;
	const campaign = await adService.createCampaign(data);
	res.status(201).json({ data: campaign });
};

export const updateCampaign = async (req: Request, res: Response) => {
	// Body validated by middleware
	const data = req.body;
	const id = String(req.params.id);
	const campaign = await adService.updateCampaign(id, data);
	res.json({ data: campaign });
};

export const archiveCampaign = async (req: Request, res: Response) => {
	const id = String(req.params.id);
	const campaign = await adService.archiveCampaign(id);
	res.json({ data: campaign });
};

export const getCampaignAnalytics = async (req: Request, res: Response) => {
	// Query validated by middleware
	const { startDate, endDate } = (req.validatedQuery || req.query) as unknown as {
		startDate?: string;
		endDate?: string;
	};
	const id = String(req.params.id);
	const analytics = await adService.getCampaignAnalytics(
		id,
		startDate ? new Date(startDate) : undefined,
		endDate ? new Date(endDate) : undefined
	);
	res.json({ data: analytics });
};

// ─── Admin: Advertisements ────────────────────────────────────

export const createAdvertisement = async (req: Request, res: Response) => {
	// Body validated by middleware
	const data = req.body;
	const ad = await adService.createAdvertisement(data);
	res.status(201).json({ data: ad });
};

export const updateAdvertisement = async (req: Request, res: Response) => {
	// Body validated by middleware
	const data = req.body;
	const id = String(req.params.id);
	const ad = await adService.updateAdvertisement(id, data);
	res.json({ data: ad });
};

// ─── Admin: Ad Units & Overview ───────────────────────────────

export const getAdUnits = async (_req: Request, res: Response) => {
	const units = await adService.getAdUnits();
	res.json({ data: units });
};

export const getAnalyticsOverview = async (_req: Request, res: Response) => {
	const overview = await adService.getAnalyticsOverview();
	res.json({ data: overview });
};

// ─── Public: Sponsored Listings ───────────────────────────────

export const getSponsoredListings = async (req: Request, res: Response) => {
	const context = {
		fuelType: req.query.fuelType ? String(req.query.fuelType) : undefined,
		bodyType: req.query.bodyType ? String(req.query.bodyType) : undefined,
	};

	const listings = await adService.getSponsoredListingsForSearch(context);
	res.json({ data: listings });
};
