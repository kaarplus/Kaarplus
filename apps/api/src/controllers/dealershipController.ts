import { Request, Response, NextFunction } from "express";

import { DealershipService } from "../services/dealershipService";

const dealershipService = new DealershipService();

export async function getAllDealerships(req: Request, res: Response, next: NextFunction) {
    try {
        const dealerships = await dealershipService.getDealerships();
        res.json({ data: dealerships });
    } catch (error) {
        next(error);
    }
}

export async function getDealership(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string;
        const dealership = await dealershipService.getDealershipById(id);
        const listings = await dealershipService.getDealershipListings(id);
        res.json({ data: { ...dealership, listings } });
    } catch (error) {
        next(error);
    }
}

// Helper to get optional user ID
function getUserId(req: Request): string | undefined {
    return req.user?.id;
}

export async function contactDealership(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id as string;
        const data = req.body;
        const senderId = getUserId(req);

        await dealershipService.contactDealership(id, data, senderId);
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        next(error);
    }
}
