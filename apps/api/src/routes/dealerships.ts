import { Router } from "express";
import { getAllDealerships, getDealership } from "../controllers/dealershipController";

export const dealershipRouter = Router();

// Public routes
dealershipRouter.get("/", getAllDealerships);
dealershipRouter.get("/:id", getDealership);
