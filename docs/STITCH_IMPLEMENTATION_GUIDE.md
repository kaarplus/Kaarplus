# Stitch-Based UI Implementation System - Setup Complete

## Overview

The Kaarplus project now has a **complete, mandatory UI implementation system** based on 8 Stitch design outputs. Every frontend component must be built according to this system.

## What Was Added

### 1. **DESIGN_SYSTEM.md** (746 lines - Master Reference)
**Location:** `docs/DESIGN_SYSTEM.md`

Comprehensive design system documentation covering:
- ✅ Brand colors with HSL CSS variables
- ✅ Typography scale (Inter font, all weights)
- ✅ Spacing & layout patterns
- ✅ Complete component architecture (70+ components mapped)
- ✅ Stitch-to-component mapping for all 8 design outputs
- ✅ Shared UI primitives specifications (vehicle-card, price-display, etc.)
- ✅ Material Icons → Lucide React mapping table
- ✅ Responsive breakpoints & patterns
- ✅ Animation guidelines
- ✅ Accessibility & SEO requirements
- ✅ Anti-patterns (what NOT to do)

### 2. **Stitch Reference Folder** (8 Design Outputs)
**Location:** `stitch/`

Each folder contains:
- `code.html` - HTML/Tailwind reference code
- `screen.png` - Visual screenshot

**Folders:**
1. `kaarplus_home_landing_page/` → Landing page sections
2. `navigation_and_cookie_consent_components/` → Header, Footer, Cookie banner
3. `login_and_registration_modals/` → Auth forms
4. `vehicle_listings_grid_and_list_view/` → Listings page
5. `vehicle_detail_and_specification_page/` → Car detail page
6. `sell_your_car_step-by-step_wizard/` → 4-step sell wizard
7. `user_dashboard_and_management/` → Dashboard
8. `vehicle_side-by-side_comparison/` → Comparison table

### 3. **Workflow Files**

#### `.agent/workflows/implement-ui.md` (NEW - 184 lines)
**The mandatory workflow for ALL UI implementation tasks.**

Phases:
1. **Gather Context** - Read DESIGN_SYSTEM.md, identify Stitch folder, view HTML/screenshot
2. **Pre-Implementation Checklist** - Verify file paths, check for existing shared components, verify Shadcn/ui primitives
3. **Implementation Rules** - Extract design values from Stitch, component structure template, responsive patterns
4. **Post-Implementation** - Verify rendering, run quality checks

#### `.agent/workflows/start-task.md` (UPDATED)
Now includes Stitch checking steps for UI tasks:
- Step 4: Review DESIGN_SYSTEM.md for UI tasks
- Step 5: Check corresponding stitch folder
- Read HTML, view screenshot
- Map Material Icons to Lucide
- Check shared components before creating

#### `.agent/workflows/add-component.md` (UPDATED)
Enhanced with:
- Pre-check for existing components
- Verify against DESIGN_SYSTEM.md
- Rules for NOT modifying Shadcn/ui core behavior

### 4. **CLAUDE.md Updates**
Added new section: **"UI Implementation Rules (MANDATORY)"**

10 mandatory rules for all UI work:
1. Read DESIGN_SYSTEM.md
2. Check Stitch reference
3. Stitch is reference only (never copy-paste)
4. Use Lucide React icons exclusively
5. Check shared components first
6. Use Shadcn/ui primitives
7. Use CSS variable tokens
8. Named exports only
9. Server Components by default
10. Run /implement-ui workflow

## Key Design Tokens Extracted from Stitch

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#10b77f` | Buttons, CTAs, links, active states |
| Background | `#f6f8f7` | Page background (light mode) |
| Dark background | `#10221c` | Hero overlay, dark sections |
| Footer background | `#1f2937` | Footer dark background |
| Font | Inter | All text (weights: 400, 500, 600, 700) |
| Border radius | 0.5rem | Default roundedness |
| Card shadow | `shadow-sm` | Default card elevation |
| Header height | 64px (`h-16`) | Fixed header size |
| Container max | 1400px | `container` utility |

## Material Icons → Lucide React Mapping

Common mappings extracted from Stitch:

| Material Icon | Lucide Replacement |
|--------------|-------------------|
| `directions_car` | `Car` |
| `local_gas_station` | `Fuel` |
| `speed` | `Gauge` |
| `favorite` | `Heart` |
| `search` | `Search` |
| `settings` | `Cog` |
| `star` | `Star` |
| `check_circle` | `CheckCircle` |
| `photo_camera` | `Camera` |
| `menu` | `Menu` |

(Full table: 30+ mappings in DESIGN_SYSTEM.md Section 8)

## Shared Components (DRY Enforcement)

Components that appear in 2+ pages must be built ONCE in `shared/`:

| Component | Used In | File |
|-----------|---------|------|
| vehicle-card | Landing, Listings, Detail (related), Dashboard, Favorites, Comparison | `shared/vehicle-card.tsx` |
| price-display | Vehicle card, Detail price card, Comparison | `shared/price-display.tsx` |
| spec-icons | Vehicle card, Detail specs | `shared/spec-icons.tsx` |
| favorite-button | Vehicle card, Detail page | `shared/favorite-button.tsx` |
| search-bar | Header, Landing hero | `shared/search-bar.tsx` |
| breadcrumbs | Listings, Detail, Sell wizard | `shared/breadcrumbs.tsx` |
| star-rating | Landing reviews, Seller info | `shared/star-rating.tsx` |
| image-gallery | Car detail, Sell wizard preview | `shared/image-gallery.tsx` |
| pagination | Listings, Dashboard | `shared/pagination.tsx` |
| status-badge | Vehicle card, Dashboard, Admin | `shared/status-badge.tsx` |

## Stitch-to-Component Mapping Overview

### Landing Page (`stitch/kaarplus_home_landing_page/`)
- Hero section → `landing/hero-section.tsx`
- Category grid → `landing/category-grid.tsx`
- Value props → `landing/value-propositions.tsx`
- Popular brands → `landing/popular-brands.tsx`
- Reviews → `landing/reviews-carousel.tsx` + `shared/star-rating.tsx`
- FAQ → `landing/faq-section.tsx`
- Newsletter → `landing/newsletter-signup.tsx`

### Navigation (`stitch/navigation_and_cookie_consent_components/`)
- Header → `layout/header.tsx` (UPDATE existing)
- Language switcher → `layout/language-switcher.tsx` (NEW)
- Mobile nav → `layout/mobile-nav.tsx` (NEW)
- Footer → `layout/footer.tsx` (UPDATE existing)
- Cookie banner → `gdpr/cookie-banner.tsx`

### Auth (`stitch/login_and_registration_modals/`)
- Login → `auth/login-form.tsx`
- Register → `auth/register-form.tsx`
- Social buttons → `auth/social-auth-buttons.tsx`
- Password reset → `auth/password-reset-form.tsx`

### Listings (`stitch/vehicle_listings_grid_and_list_view/`)
- Filter sidebar → `listings/filter-sidebar.tsx`
- Filter badges → `listings/filter-badges.tsx`
- Sort controls → `listings/sort-controls.tsx`
- View toggle → `listings/view-toggle.tsx`
- Vehicle card (grid/list variants) → `shared/vehicle-card.tsx`
- Pagination → `shared/pagination.tsx`

### Car Detail (`stitch/vehicle_detail_and_specification_page/`)
- Image gallery → `car-detail/detail-gallery.tsx`
- Specs grid → `car-detail/specs-grid.tsx`
- Price card → `car-detail/price-card.tsx`
- Seller info → `car-detail/seller-info.tsx`
- Related cars → `car-detail/related-cars.tsx`
- Breadcrumbs → `shared/breadcrumbs.tsx`

### Sell Wizard (`stitch/sell_your_car_step-by-step_wizard/`)
- Progress indicator → `sell/step-indicator.tsx`
- Vehicle type step → `sell/step-vehicle-type.tsx`
- Data form step → `sell/step-vehicle-data.tsx`
- Photo upload step → `sell/step-photo-upload.tsx` + `sell/photo-dropzone.tsx`
- Confirmation step → `sell/step-confirmation.tsx`
- Equipment checkboxes → `sell/equipment-checkboxes.tsx`

### Dashboard (`stitch/user_dashboard_and_management/`)
- Sidebar → `dashboard/dashboard-sidebar.tsx`
- Stats → `dashboard/stats-overview.tsx`
- Listings table → `dashboard/listings-table.tsx`
- Messages → `dashboard/messages-panel.tsx`
- Profile settings → `dashboard/profile-settings.tsx`
- GDPR section → `dashboard/gdpr-section.tsx`

### Comparison (`stitch/vehicle_side-by-side_comparison/`)
- Comparison header → `comparison/comparison-header.tsx`
- Comparison table → `comparison/comparison-table.tsx`
- Add vehicle panel → `comparison/add-vehicle-panel.tsx`

## How to Use This System

### For Every UI Task:

1. **Read the task spec** (e.g., `docs/tasks/P1-T06-landing-page.md`)

2. **Follow the /implement-ui workflow:**
   ```bash
   cat .agent/workflows/implement-ui.md
   ```

3. **Read DESIGN_SYSTEM.md Section 5** to identify the Stitch folder

4. **Open the Stitch reference:**
   - Read `stitch/<folder>/code.html` for spacing, colors, layout
   - View `stitch/<folder>/screen.png` for visual accuracy

5. **Check shared components:**
   ```bash
   ls apps/web/src/components/shared/
   ```

6. **Install missing Shadcn/ui primitives:**
   ```bash
   cd apps/web && npx shadcn@latest add <component>
   ```

7. **Implement using:**
   - CSS variable tokens (never hex colors)
   - Lucide React icons (use mapping table)
   - Tailwind spacing from Stitch
   - Component structure from DESIGN_SYSTEM.md

8. **Verify:**
   ```bash
   npm run lint
   npm run typecheck
   ```

## Anti-Patterns (NEVER Do This)

❌ **NEVER** copy-paste code from `stitch/` files  
❌ **NEVER** use Material Icons (use Lucide React)  
❌ **NEVER** hardcode hex colors (use CSS variables)  
❌ **NEVER** create custom Button, Input, Card (use Shadcn/ui)  
❌ **NEVER** duplicate components (check `shared/` first)  
❌ **NEVER** skip the Stitch reference when building UI  
❌ **NEVER** use default exports  
❌ **NEVER** add `"use client"` unless using hooks/events  

## Current Status

✅ All workflows created and documented  
✅ DESIGN_SYSTEM.md complete (746 lines)  
✅ All 8 Stitch folders committed  
✅ CLAUDE.md updated with UI rules  
✅ Icon mapping table complete (30+ mappings)  
✅ Component architecture fully mapped (70+ components)  
✅ Shared component DRY rules enforced  

## Next Steps for P1-T04 Fixes

Based on verification report, the current P1-T04 implementation needs:

1. **Add language selector** to header
   - Location: `apps/web/src/components/layout/header.tsx`
   - Reference: `stitch/navigation_and_cookie_consent_components/code.html`
   - Component: `layout/language-switcher.tsx` (NEW)
   - Store: `lib/stores/useLanguageStore.ts` (NEW)

2. **Make "Müü auto" a prominent CTA button**
   - Change from link to primary button
   - Reference Stitch for exact styling

3. **Verify light mode default**
   - Already correct (no dark mode CSS variables)

---

**Last Updated:** 2026-02-14  
**Committed:** `ceda485`  
**Status:** ✅ Complete and ready for use

All future UI work MUST follow this system.
