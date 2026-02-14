import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import { logger } from "./utils/logger";

const PORT = parseInt(process.env.PORT || "4000", 10);

const app = createApp();

app.listen(PORT, () => {
  logger.info(`API server running on http://localhost:${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/api/health`);
});
