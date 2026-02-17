import { Request, Response, NextFunction } from "express";

import { AppError, ValidationError } from "../utils/errors";
import { logger } from "../utils/logger";

/**
 * Global error handler middleware.
 * Must be the last middleware registered.
 * 
 * Error response format:
 * {
 *   error: string;        // Human-readable error message
 *   code?: string;        // Machine-readable error code (for AppErrors)
 *   details?: unknown;    // Additional error details (for ValidationErrors)
 * }
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Known operational errors
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      details: err.details,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
    return;
  }

  // Unknown / programming errors
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    code: "INTERNAL_ERROR",
  });
}
