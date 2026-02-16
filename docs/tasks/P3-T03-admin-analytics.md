# P3-T03: Admin Analytics Dashboard

> **Phase:** 3 — Monetization
> **Status:** ✅ Complete
> **Dependencies:** P1-T12
> **Estimated Time:** 3 hours

## Objective

Create a comprehensive analytics dashboard for platform administrators to monitor key performance indicators (KPIs), user growth, and sales activity.

## Scope

### 1. Backend Implementation (apps/api)

- **Analytics Controller**: create endpoints to aggregate data.
  - `GET /api/admin/analytics/summary` (Counts of users, listings, sales)
  - `GET /api/admin/analytics/revenue` (Revenue over time)
  - `GET /api/admin/analytics/listings` (Active vs sold listings trends)
- **Data Aggregation**: Use Prisma aggregate queries to fetch stats efficiently.

### 2. Frontend Implementation (apps/web)

- **Analytics Page**: Create `/admin/analytics` or integrate into `/admin` dashboard home.
- **Stats Cards**: Display total users, active listings, sold cars, total revenue.
- **Charts**: Implement visual charts using `recharts` (or similar library if already installed, or just simple CSS bars if preferred to avoid deps). *Note: `recharts` is a standard choice for React.*
- **Recent Activity**: Show a list of recent user registrations and sales.

## Acceptance Criteria

- [ ] Admin can view total number of users, listings, and sales.
- [ ] Admin can view total revenue generated.
- [ ] Charts visualize growth trends (e.g., new listings per day).
- [ ] Data is protected and only accessible to users with `ADMIN` role.
