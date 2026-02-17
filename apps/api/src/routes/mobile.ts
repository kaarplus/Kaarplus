import { Router } from "express";

import { readLimiter } from "../middleware/rateLimiter";

const router = Router();

// Mobile version endpoint - apply read limiter
router.get("/version", readLimiter, (req, res) => {
    res.json({
        platform: "ios",
        minVersion: "1.0.0",
        latestVersion: "1.0.0",
        updateUrl: "https://apps.apple.com/app/kaarplus"
    });
});

export { router as mobileRouter };
