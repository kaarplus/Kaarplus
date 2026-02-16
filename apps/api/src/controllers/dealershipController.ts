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
