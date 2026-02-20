/**
 * Validation utilities for API layer
 * Provides reusable validation helpers to follow DRY principle
 */

import { AppError, BadRequestError } from "./errors";
import { UserRole } from "@kaarplus/database";

/**
 * Validates that min <= max for range parameters
 * @throws BadRequestError if validation fails
 */
export function validateRange(
  min: number | undefined,
  max: number | undefined,
  fieldName: string
): void {
  if (min !== undefined && max !== undefined && min > max) {
    throw new BadRequestError(
      `${fieldName}Min cannot be greater than ${fieldName}Max`
    );
  }
}

/**
 * Validates multiple ranges at once
 * @param ranges Array of range tuples [min, max, fieldName]
 * @throws BadRequestError if any validation fails
 */
export function validateRanges(
  ...ranges: Array<[number | undefined, number | undefined, string]>
): void {
  for (const [min, max, fieldName] of ranges) {
    validateRange(min, max, fieldName);
  }
}

/**
 * Validates that a value is a positive integer
 * @throws BadRequestError if validation fails
 */
export function validatePositiveInteger(
  value: unknown,
  fieldName: string
): number {
  const num = Number(value);
  if (!Number.isInteger(num) || num <= 0) {
    throw new BadRequestError(`${fieldName} must be a positive integer`);
  }
  return num;
}

/**
 * Validates that a value is within a specific range
 * @throws BadRequestError if validation fails
 */
export function validateWithinRange(
  value: number,
  min: number,
  max: number,
  fieldName: string
): void {
  if (value < min || value > max) {
    throw new BadRequestError(
      `${fieldName} must be between ${min} and ${max}`
    );
  }
}

/**
 * Safely extracts typed user ID from Express request
 * Returns undefined if user is not authenticated
 */
export function getUserId(req: { user?: { id: string } }): string | undefined {
  return req.user?.id;
}

/**
 * Extracts user ID from request or throws AuthError
 * @throws AuthError if user is not authenticated
 */
export function requireUserId(req: { user?: { id: string } }): string {
  const userId = getUserId(req);
  if (!userId) {
    throw new AppError("Authentication required", 401);
  }
  return userId;
}

/**
 * Checks if user has admin role
 */
export function isAdmin(req: { user?: { role: string } }): boolean {
  return req.user?.role === UserRole.ADMIN;
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
