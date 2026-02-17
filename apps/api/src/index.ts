import "dotenv/config";
import { createApp } from "./app";
import { logger } from "./utils/logger";
import { initSentry } from "./utils/sentry";

// Initialize Sentry before app usage
initSentry();

const PORT = parseInt(process.env.PORT || "4000", 10);

const { httpServer } = createApp();

httpServer.listen(PORT, () => {
	logger.info(`API server running on http://localhost:${PORT}`);
	logger.info(`Health check: http://localhost:${PORT}/api/health`);
	logger.info(`Sentry Debug: http://localhost:${PORT}/api/debug-sentry`);
	logger.info(`WebSocket server ready for real-time messaging`);
});
