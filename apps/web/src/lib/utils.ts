import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in EUR with Estonian locale.
 */
export function formatPrice(price: number, includeVat = true): string {
  const formatted = new Intl.NumberFormat("et-EE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return includeVat ? `${formatted} (km-ga)` : `${formatted} (km-ta)`;
}

/**
 * Format number with Estonian locale.
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("et-EE").format(num);
}
