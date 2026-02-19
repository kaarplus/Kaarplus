import { Request, Response } from "express";

import { AdminService } from "../services/adminService";

const adminService = new AdminService();

export const getPendingListings = async (req: Request, res: Response) => {
  // Query validated by middleware
  const { page, pageSize } = (req.validatedQuery || req.query) as unknown as { page: number; pageSize: number };
  const result = await adminService.getPendingListings(page, pageSize);
  res.json(result);
};

export const verifyListing = async (req: Request, res: Response) => {
  // Body validated by middleware
  const { action, reason } = req.body as { action: "approve" | "reject"; reason?: string };
  const listing = await adminService.verifyListing(String(req.params.id), action, reason);
  res.json({ data: listing });
};

export const getUsers = async (req: Request, res: Response) => {
  // Query validated by middleware
  const { page, pageSize } = (req.validatedQuery || req.query) as unknown as { page: number; pageSize: number };
  const result = await adminService.getUsers(page, pageSize);
  res.json(result);
};

export const getAnalytics = async (_req: Request, res: Response) => {
  const result = await adminService.getAnalytics();
  res.json({ data: result });
};

export const getStats = async (_req: Request, res: Response) => {
  const result = await adminService.getStats();
  res.json({ data: result });
};
