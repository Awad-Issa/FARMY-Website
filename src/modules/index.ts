/**
 * Future expansion modules for FARMY platform.
 * Each module can be developed independently and mounted under its own route group.
 *
 * Planned modules:
 * - livestock-management: Herd tracking and farm operations
 * - animal-tracking: GPS/RFID animal identification
 * - rfid-systems: Smart tagging and scanning
 * - farm-analytics: Reports and insights
 * - smart-farm-dashboard: Unified farm control panel
 */

export const FUTURE_MODULES = [
  "livestock-management",
  "animal-tracking",
  "rfid-systems",
  "farm-analytics",
  "smart-farm-dashboard",
] as const;

export type FutureModule = (typeof FUTURE_MODULES)[number];
