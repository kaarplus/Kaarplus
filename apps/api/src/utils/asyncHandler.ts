import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Async handler wrapper for Express controllers.
 * Catches errors from async functions and passes them to the error handling middleware.
 * 
 * Usage:
 *   router.get('/path', asyncHandler(async (req, res) => {
 *     const data = await someAsyncOperation();
 *     res.json(data);
 *   }));
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
