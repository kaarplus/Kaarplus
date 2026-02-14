import { Request, Response, NextFunction } from "express";
import * as z from "zod";

import { ValidationError } from "../utils/errors";

/**
 * Zod validation middleware factory.
 * Validates req.body, req.query, or req.params against a Zod schema.
 */
export function validate(schema: z.ZodType, source: "body" | "query" | "params" = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const details = result.error.issues.map((issue: z.ZodIssue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      throw new ValidationError("Validation failed", details);
    }
    // Replace with parsed (and potentially transformed) data
    if (source === "body") {
      req.body = result.data;
    }
    next();
  };
}
