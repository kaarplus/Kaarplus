# P3-T02: Dealership Accounts & Profiles

> **Phase:** 3 — Monetization
> **Status:** ✅ Complete
> **Dependencies:** P1-T05
> **Estimated Time:** 3 hours

## Objective

Enhance the platform to support professional dealership accounts. Dealerships should have dedicated profile pages, enhanced visibility, and the ability to post unlimited listings.

## Scope

### 1. Database & API (apps/api)

- **Listing Service Update**: Ensure users with `DEALERSHIP` role are not limited by the 5-listing cap applied to individual sellers.
- **User Profile Extension**: Add dealership-specific fields to the User model if necessary (address, website, opening hours, logo). These can be stored in the existing `Json` metadata or by extending the schema.
- **Dealership Controller**: Create endpoints to fetch dealership details and their active listings.
  - `GET /api/user/dealerships/:id` (Public)
  - `GET /api/user/dealerships` (Public - list all dealerships)

### 2. Frontend Implementation (apps/web)

- **Dealership Profile Page**: Create `/dealers/[id]` to show:
  *   Dealership branding (logo, cover image).
  *   Contact info & location map.
  *   A filterable list of all vehicles currently in their inventory.
- **Enhanced Listing Display**: 
  *   Add "Professional Dealer" badges to listings posted by dealerships.
  *   Incorporate dealership branding into the `SellerInfo` component on the listing detail page.
- **Registration Flow**: Allow users to select "Register as Dealership" during registration or upgrade their existing account.

## Acceptance Criteria

- [ ] Users can register as a dealership or upgrade their account.
- [ ] Dealerships have no listing limit (verify 5+ listings).
- [ ] Individual dealership pages (`/dealers/[id]`) display correctly.
- [ ] Listings show clear "Professional Seller" badge.
- [ ] Dealership info is prominent on vehicles they list.
- [ ] List of all dealerships available at `/dealers`.
