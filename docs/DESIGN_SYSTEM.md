# Kaarplus Design System & UI/UX Rules

> Single source of truth for all UI implementation. Every component must conform to these rules.
> Updated: 2026-02-14

## Table of Contents

1. [Brand Colors & Design Tokens](#1-brand-colors--design-tokens)
2. [Typography](#2-typography)
3. [Spacing & Layout](#3-spacing--layout)
4. [Component Architecture](#4-component-architecture)
5. [Stitch-to-Component Mapping](#5-stitch-to-component-mapping)
6. [Shared UI Primitives](#6-shared-ui-primitives)
7. [Page-Specific Component Specs](#7-page-specific-component-specs)
8. [Icon System](#8-icon-system)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Animation & Interaction](#10-animation--interaction)
11. [Accessibility & SEO](#11-accessibility--seo)
12. [Anti-Patterns (Do NOT)](#12-anti-patterns-do-not)

---

## 1. Brand Colors & Design Tokens

### Primary Palette (from Figma)

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--primary` | `#10b77f` | `158 84% 39%` | Buttons, links, CTAs, active states |
| `--primary-foreground` | `#ffffff` | `0 0% 100%` | Text on primary backgrounds |
| `--background` | `#f6f8f7` | `150 13% 97%` | Page background |
| `--background-alt` | `#ffffff` | `0 0% 100%` | Card/section backgrounds |
| `--foreground` | `#1a2421` | `155 18% 12%` | Primary text |
| `--muted-foreground` | `#5a6e66` | `155 10% 39%` | Secondary/muted text |
| `--border` | `#e1e6e4` | `150 8% 89%` | Borders, dividers |
| `--input` | `#e1e6e4` | `150 8% 89%` | Input borders |
| `--ring` | `#10b77f` | `158 84% 39%` | Focus rings |
| `--destructive` | `#ef4444` | `0 84% 60%` | Errors, delete actions |
| `--destructive-foreground` | `#ffffff` | `0 0% 100%` | Text on destructive |
| `--accent` | `#f0faf6` | `155 53% 96%` | Hover backgrounds, subtle highlights |
| `--accent-foreground` | `#1a2421` | `155 18% 12%` | Text on accent |
| `--secondary` | `#f0f5f3` | `150 20% 95%` | Secondary backgrounds |
| `--secondary-foreground` | `#1a2421` | `155 18% 12%` | Text on secondary |
| `--muted` | `#f0f5f3` | `150 20% 95%` | Muted backgrounds |
| `--card` | `#ffffff` | `0 0% 100%` | Card backgrounds |
| `--card-foreground` | `#1a2421` | `155 18% 12%` | Card text |
| `--popover` | `#ffffff` | `0 0% 100%` | Popover backgrounds |
| `--popover-foreground` | `#1a2421` | `155 18% 12%` | Popover text |

### Semantic Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#10b77f` | Success states (same as primary) |
| `--warning` | `#f59e0b` | Warning badges, alerts |
| `--info` | `#3b82f6` | Info badges, links |
| `--hot-deal` | `#ef4444` | "Hot Deal" badge |
| `--new` | `#10b77f` | "New" badge |
| `--certified` | `#3b82f6` | "Certified" badge |

### Dark Background (Hero, Footer)

| Token | Hex | Usage |
|-------|-----|-------|
| `--background-dark` | `#10221c` | Hero overlays, dark sections |
| `--footer-bg` | `#1f2937` | Footer background |

### CSS Variable Format

All colors use HSL without the `hsl()` wrapper in CSS variables (Shadcn/ui convention):
```css
--primary: 158 84% 39%;
/* Used as: hsl(var(--primary)) in Tailwind config */
```

---

## 2. Typography

### Font Family

- **Primary:** Inter (Google Fonts)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Fallback:** `system-ui, sans-serif`
- Loaded via `next/font/google` as CSS variable `--font-inter`

### Type Scale

| Element | Class | Size | Weight | Line Height |
|---------|-------|------|--------|-------------|
| Page title (H1) | `text-3xl md:text-4xl font-bold` | 30/36px | 700 | 1.2 |
| Section title (H2) | `text-2xl md:text-3xl font-bold` | 24/30px | 700 | 1.2 |
| Card title (H3) | `text-xl font-semibold` | 20px | 600 | 1.4 |
| Subsection (H4) | `text-lg font-semibold` | 18px | 600 | 1.4 |
| Body | `text-base` | 16px | 400 | 1.5 |
| Body small | `text-sm` | 14px | 400 | 1.5 |
| Caption/Label | `text-xs font-medium` | 12px | 500 | 1.5 |
| Price (large) | `text-2xl md:text-3xl font-bold` | 24/30px | 700 | 1.2 |
| Stat number | `text-3xl md:text-4xl font-bold` | 30/36px | 700 | 1.2 |

### Rules

- Single `<h1>` per page (SEO requirement)
- Heading hierarchy must be sequential (no skipping h2 to h4)
- Use `tracking-tight` on large headings (text-2xl and above)
- Use `text-muted-foreground` for secondary information
- Price always uses `tabular-nums` for alignment

---

## 3. Spacing & Layout

### Container

```
max-width: 1400px (2xl breakpoint)
padding: 2rem horizontal (container utility)
centered: mx-auto
```

### Spacing Scale (Standardized)

Use these consistently across all components:

| Context | Tailwind Class | Pixels |
|---------|---------------|--------|
| Component internal padding | `p-4` or `p-6` | 16/24px |
| Card padding | `p-6` | 24px |
| Section vertical spacing | `py-12 md:py-16` | 48/64px |
| Grid gap | `gap-6` | 24px |
| Small gap (inline items) | `gap-2` or `gap-3` | 8/12px |
| Stack spacing | `space-y-4` or `space-y-6` | 16/24px |
| Form field spacing | `space-y-4` | 16px |
| Between sections | `space-y-8` or `space-y-12` | 32/48px |

### Page Layout Patterns

**Full-width with container:**
```tsx
<section className="py-12 md:py-16">
  <div className="container">
    {/* content */}
  </div>
</section>
```

**Sidebar + Main (Listings, Dashboard):**
```tsx
<div className="container flex gap-6">
  <aside className="hidden lg:block w-[280px] shrink-0">
    {/* filters/nav */}
  </aside>
  <main className="flex-1 min-w-0">
    {/* content */}
  </main>
</div>
```

**Sticky Sidebar (Car Detail):**
```tsx
<div className="container flex gap-6">
  <div className="flex-1 min-w-0">{/* gallery + specs */}</div>
  <aside className="hidden lg:block w-[380px] shrink-0">
    <div className="sticky top-20">{/* price card */}</div>
  </aside>
</div>
```

---

## 4. Component Architecture

### Directory Structure

```
src/components/
├── ui/                  # Shadcn/ui primitives (DO NOT modify core behavior)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── select.tsx       # To add
│   ├── checkbox.tsx     # To add
│   ├── dialog.tsx       # To add
│   ├── sheet.tsx        # To add
│   ├── tabs.tsx         # To add
│   ├── accordion.tsx    # To add
│   ├── separator.tsx    # To add
│   ├── dropdown-menu.tsx # To add
│   ├── toggle.tsx       # To add
│   ├── slider.tsx       # To add
│   ├── textarea.tsx     # To add
│   └── skeleton.tsx     # To add
├── layout/              # App shell (Header, Footer, MainLayout)
│   ├── header.tsx
│   ├── footer.tsx
│   ├── main-layout.tsx
│   ├── mobile-nav.tsx   # To add
│   └── language-switcher.tsx # To add
├── shared/              # Reusable composite components (used across pages)
│   ├── vehicle-card.tsx           # Single card (used in grid, list, carousel, related)
│   ├── vehicle-card-skeleton.tsx  # Loading skeleton for vehicle card
│   ├── price-display.tsx          # Formatted price with VAT indicator
│   ├── spec-icons.tsx             # Mileage/fuel/transmission icon row
│   ├── favorite-button.tsx        # Heart toggle (connects to Zustand)
│   ├── status-badge.tsx           # Listing status (New, Hot Deal, Certified, etc.)
│   ├── star-rating.tsx            # 5-star display (reviews, testimonials)
│   ├── image-gallery.tsx          # Reusable gallery with lightbox
│   ├── breadcrumbs.tsx            # Breadcrumb navigation
│   ├── empty-state.tsx            # Empty state placeholder
│   ├── search-bar.tsx             # Global search bar (header + hero)
│   └── pagination.tsx             # Page navigation
├── landing/             # Landing page sections
│   ├── hero-section.tsx
│   ├── category-grid.tsx
│   ├── value-propositions.tsx
│   ├── popular-brands.tsx
│   ├── reviews-carousel.tsx
│   ├── statistics-section.tsx
│   ├── faq-section.tsx
│   └── newsletter-signup.tsx
├── listings/            # Listings page
│   ├── filter-sidebar.tsx
│   ├── filter-badges.tsx
│   ├── sort-controls.tsx
│   ├── view-toggle.tsx
│   └── results-count.tsx
├── car-detail/          # Car detail page
│   ├── detail-gallery.tsx
│   ├── specs-grid.tsx
│   ├── feature-badges.tsx
│   ├── price-card.tsx
│   ├── seller-info.tsx
│   ├── contact-modal.tsx
│   └── related-cars.tsx
├── sell/                # Sell wizard
│   ├── sell-wizard.tsx
│   ├── step-indicator.tsx
│   ├── step-vehicle-type.tsx
│   ├── step-vehicle-data.tsx
│   ├── step-photo-upload.tsx
│   ├── step-confirmation.tsx
│   ├── equipment-checkboxes.tsx
│   └── photo-dropzone.tsx
├── auth/                # Auth modals/pages
│   ├── login-form.tsx
│   ├── register-form.tsx
│   ├── social-auth-buttons.tsx
│   └── password-reset-form.tsx
├── comparison/          # Comparison page
│   ├── comparison-table.tsx
│   ├── comparison-header.tsx
│   └── add-vehicle-panel.tsx
├── dashboard/           # User dashboard
│   ├── dashboard-sidebar.tsx
│   ├── stats-overview.tsx
│   ├── listings-table.tsx
│   ├── messages-panel.tsx
│   ├── profile-settings.tsx
│   └── gdpr-section.tsx
├── gdpr/                # GDPR components
│   ├── cookie-banner.tsx
│   └── cookie-settings-modal.tsx
└── admin/               # Admin components
    ├── verification-queue.tsx
    └── listing-review.tsx
```

### Component Rules

1. **Named exports only** — `export function VehicleCard()`, never `export default`
2. **Props interface colocated** — Define `interface VehicleCardProps` in the same file
3. **Server Components by default** — Only add `"use client"` when using hooks, events, or browser APIs
4. **Composition over configuration** — Prefer children/slots over excessive props
5. **Use `cn()` for all conditional classes** — Never ternary string concatenation
6. **Shadcn/ui for primitives** — Never build custom Button, Input, Card, etc.
7. **File naming: `kebab-case.tsx`** — e.g., `vehicle-card.tsx`, not `VehicleCard.tsx`
8. **One component per file** — Exception: tightly coupled sub-components (Card + CardHeader)

### The "shared/" Rule (DRY Enforcement)

**A component goes in `shared/` if it's used on 2+ pages.** Key shared components:

| Component | Used In |
|-----------|---------|
| `vehicle-card.tsx` | Landing (categories), Listings (grid/list), Car Detail (related), Dashboard, Favorites, Comparison |
| `price-display.tsx` | Vehicle card, Car detail price card, Comparison table |
| `spec-icons.tsx` | Vehicle card (all variants), Car detail specs |
| `favorite-button.tsx` | Vehicle card, Car detail page |
| `search-bar.tsx` | Header, Landing hero |
| `pagination.tsx` | Listings, Dashboard listings |
| `breadcrumbs.tsx` | Listings, Car detail, Sell wizard |
| `star-rating.tsx` | Landing reviews, Seller info, Review system |
| `image-gallery.tsx` | Car detail, Sell wizard preview |
| `status-badge.tsx` | Vehicle card, Dashboard table, Admin queue |

---

## 5. Stitch-to-Component Mapping

This maps each Stitch output to the actual component files to create. Components shared across stitch outputs are extracted to `shared/`.

### `stitch/kaarplus_home_landing_page/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Hero with search | `landing/hero-section.tsx` + `shared/search-bar.tsx` | Search bar is shared with header |
| Category grid (8 types) | `landing/category-grid.tsx` | Uses BODY_TYPES constant |
| Stats counters | `landing/statistics-section.tsx` | Animated counters |
| "Why Kaarplus" cards | `landing/value-propositions.tsx` | 4 feature cards |
| Popular brands | `landing/popular-brands.tsx` | Logo carousel |
| Testimonials | `landing/reviews-carousel.tsx` + `shared/star-rating.tsx` | Carvago-style |
| FAQ accordion | `landing/faq-section.tsx` | Uses Shadcn Accordion |
| Newsletter | `landing/newsletter-signup.tsx` | Email + submit |
| Car cards in categories | `shared/vehicle-card.tsx` | Shared component |

### `stitch/login_and_registration_modals/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Login modal | `auth/login-form.tsx` | Inside Shadcn Dialog |
| Register modal | `auth/register-form.tsx` | Inside Shadcn Dialog |
| Social buttons | `auth/social-auth-buttons.tsx` | Google + Facebook |
| Password reset | `auth/password-reset-form.tsx` | Success state included |

### `stitch/navigation_and_cookie_consent_components/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Header (70px) | `layout/header.tsx` | UPDATE existing - add language switcher, mobile nav |
| Language switcher | `layout/language-switcher.tsx` | ET/EN/RU dropdown |
| Mobile hamburger | `layout/mobile-nav.tsx` | Shadcn Sheet |
| Footer | `layout/footer.tsx` | UPDATE existing - add newsletter, social, payment logos |
| Cookie banner | `gdpr/cookie-banner.tsx` | Fixed bottom, granular options |
| Cookie settings | `gdpr/cookie-settings-modal.tsx` | Toggle switches per category |

### `stitch/vehicle_listings_grid_and_list_view/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Sidebar filters | `listings/filter-sidebar.tsx` | Connects to useFilterStore |
| Active filter badges | `listings/filter-badges.tsx` | Removable chips |
| Sort dropdown | `listings/sort-controls.tsx` | Shadcn Select |
| Grid/List toggle | `listings/view-toggle.tsx` | Two-mode toggle |
| Results count | `listings/results-count.tsx` | "X autot leitud" |
| Vehicle card (grid) | `shared/vehicle-card.tsx` variant="grid" | SHARED |
| Vehicle card (list) | `shared/vehicle-card.tsx` variant="list" | SHARED - same component |
| Pagination | `shared/pagination.tsx` | SHARED |

### `stitch/vehicle_detail_and_specification_page/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Image gallery + thumbnails | `car-detail/detail-gallery.tsx` + `shared/image-gallery.tsx` | Lightbox support |
| Breadcrumbs | `shared/breadcrumbs.tsx` | SHARED |
| Tab nav (Info/Desc/Features/History) | Uses Shadcn Tabs directly | No wrapper needed |
| Specs grid | `car-detail/specs-grid.tsx` | 2-column key-value |
| Feature checklist | `car-detail/feature-badges.tsx` | Check icons |
| Price history chart | `car-detail/price-card.tsx` | SVG or stub for MVP |
| Sticky sidebar pricing | `car-detail/price-card.tsx` | Price + CTAs |
| Seller info | `car-detail/seller-info.tsx` | Rating + contact |
| Related cars | `car-detail/related-cars.tsx` | Uses `shared/vehicle-card.tsx` |

### `stitch/sell_your_car_step-by-step_wizard/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Progress indicator | `sell/step-indicator.tsx` | 4-step visual |
| Vehicle type selection | `sell/step-vehicle-type.tsx` | Body type cards |
| Vehicle data form | `sell/step-vehicle-data.tsx` | React Hook Form + Zod |
| Equipment checkboxes | `sell/equipment-checkboxes.tsx` | Grouped categories |
| Photo upload | `sell/step-photo-upload.tsx` + `sell/photo-dropzone.tsx` | Drag-drop + tips |
| Confirmation | `sell/step-confirmation.tsx` | Success + next steps |
| Wizard orchestrator | `sell/sell-wizard.tsx` | State machine for steps |

### `stitch/user_dashboard_and_management/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Sidebar navigation | `dashboard/dashboard-sidebar.tsx` | Fixed 250px |
| Stats cards | `dashboard/stats-overview.tsx` | 4 metric cards |
| Listings table | `dashboard/listings-table.tsx` | Status + actions |
| Messages split pane | `dashboard/messages-panel.tsx` | Conversation + chat |
| Profile settings | `dashboard/profile-settings.tsx` | Avatar + fields |
| GDPR section | `dashboard/gdpr-section.tsx` | Export + delete |

### `stitch/vehicle_side-by-side_comparison/`

| Stitch Section | Component File | Notes |
|----------------|---------------|-------|
| Comparison header slots | `comparison/comparison-header.tsx` | 2-4 vehicle slots |
| Comparison table | `comparison/comparison-table.tsx` | Sectioned rows |
| Add vehicle panel | `comparison/add-vehicle-panel.tsx` | Overlay search |
| Difference toggle | Uses Shadcn Toggle | Inline control |

---

## 6. Shared UI Primitives

### Vehicle Card (`shared/vehicle-card.tsx`)

The most reused component. Must support two variants:

```tsx
interface VehicleCardProps {
  vehicle: VehicleSummary;
  variant?: "grid" | "list";
  showFavorite?: boolean;
  showBadge?: boolean;
}
```

**Grid variant:** Vertical card (image top, info bottom)
- Image: `aspect-[4/3]` with `object-cover`
- Title: `text-base font-semibold truncate`
- Specs row: `spec-icons.tsx` (mileage, fuel, transmission)
- Price: `text-lg font-bold text-primary`
- Favorite heart: top-right corner of image
- Status badge: top-left corner of image
- Hover: `shadow-lg` transition

**List variant:** Horizontal card (image left, info right)
- Image: `w-[280px] aspect-[4/3]`
- Title + description in center column
- Price + actions in right column
- Same spec icons, favorite, badge behavior

### Price Display (`shared/price-display.tsx`)

```tsx
interface PriceDisplayProps {
  price: number;
  includeVat?: boolean;
  size?: "sm" | "md" | "lg";
}
```

Always uses `formatPrice()` from `@/lib/utils`. Uses `tabular-nums` class.

### Spec Icons (`shared/spec-icons.tsx`)

```tsx
interface SpecIconsProps {
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  year?: number;
  power?: string;
  compact?: boolean; // fewer items for card vs detail
}
```

Renders inline icon + text pairs. Uses Lucide icons (already in deps).

---

## 7. Page-Specific Component Specs

### Header Requirements

- Height: `h-16` (64px)
- Sticky: `sticky top-0 z-50`
- Background: `bg-background/95 backdrop-blur`
- Logo: Left-aligned, `text-xl font-bold text-primary`
- Nav links: `Autod`, `Müü auto`, `Võrdle` — hidden on mobile
- Language switcher: `ET` / `EN` / `RU` dropdown — right side
- CTA: "Lisa kuulutus" (Place your ad) button — `bg-primary` — right side
- Auth: Login text link + Register button
- Mobile: Hamburger icon → Sheet slide-out

### Footer Requirements

- Background: `bg-[#1f2937]` dark footer (from Stitch)
- Text: `text-gray-300` on dark background
- 4 columns: Brand + description, Services, Info, Contact
- Newsletter signup row
- Social media links (icons)
- Payment provider logos (Visa, Mastercard)
- Copyright bottom bar
- All links must be `hover:text-white` transitions

### Landing Page Section Order

1. Hero (dark overlay image + search bar)
2. Vehicle Categories (tabs: Buy / Electric / Hybrid with card carousels)
3. Category Grid (8 body types with icons)
4. Value Propositions (4 cards)
5. Popular Brands (logo grid/carousel)
6. Customer Reviews (Carvago-style carousel)
7. Statistics (animated counters)
8. FAQ (accordion)
9. Newsletter Signup

### Listings Page Layout

- Mobile: Filters in Sheet (slide-out), single column cards
- Tablet: 2-column grid, filters in Sheet
- Desktop: Sidebar (280px) + 3-column grid
- URL-driven filters: `?make=BMW&fuelType=Electric&page=2`

---

## 8. Icon System

### Library: Lucide React

Already installed (`lucide-react@0.379.0`). Use exclusively for all icons.

**Do NOT use:** Material Icons, Material Symbols, Font Awesome, or any other icon library.

The Stitch outputs reference Material Icons — these must be replaced with Lucide equivalents during implementation.

### Common Icon Mappings (Stitch Material → Lucide)

| Stitch Material Icon | Lucide Replacement | Usage |
|---------------------|-------------------|-------|
| `directions_car` | `Car` | Vehicle type |
| `local_gas_station` | `Fuel` | Fuel type |
| `speed` | `Gauge` | Mileage |
| `settings` | `Settings` or `Cog` | Transmission |
| `favorite` / `favorite_border` | `Heart` | Favorites |
| `search` | `Search` | Search |
| `close` | `X` | Close/dismiss |
| `chevron_left/right` | `ChevronLeft` / `ChevronRight` | Navigation |
| `arrow_forward` | `ArrowRight` | CTAs |
| `check_circle` | `CheckCircle` | Features, success |
| `cancel` | `XCircle` | Missing features |
| `star` | `Star` | Ratings |
| `photo_camera` | `Camera` | Upload |
| `delete` | `Trash2` | Remove |
| `edit` | `Pencil` | Edit |
| `visibility` | `Eye` | Views |
| `email` | `Mail` | Email/messages |
| `phone` | `Phone` | Phone |
| `location_on` | `MapPin` | Location |
| `calendar_today` | `Calendar` | Year/date |
| `expand_more` | `ChevronDown` | Dropdowns |
| `menu` | `Menu` | Hamburger |
| `share` | `Share2` | Share |
| `compare_arrows` | `ArrowLeftRight` | Compare |
| `shield` | `Shield` | Verified/certified |
| `download` | `Download` | GDPR export |

### Icon Sizing Convention

| Context | Size | Class |
|---------|------|-------|
| Inline with text | 16px | `size={16}` or `className="h-4 w-4"` |
| Button icon | 18-20px | `size={18}` or `className="h-5 w-5"` |
| Card feature icon | 20-24px | `size={20}` or `className="h-5 w-5"` |
| Section/empty state icon | 32-48px | `size={32}` or `className="h-8 w-8"` |
| Hero icon | 48-64px | `size={48}` or `className="h-12 w-12"` |

---

## 9. Responsive Breakpoints

### Tailwind Breakpoints (default)

| Breakpoint | Min Width | Usage |
|-----------|-----------|-------|
| (default) | 0px | Mobile-first base |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1400px | Container max-width |

### Desktop-First Priority

Per CLAUDE.md, design is **desktop-first** matching Figma. Implementation approach:
- Build desktop layout first
- Add responsive overrides for smaller screens
- Key pattern: `lg:flex` for desktop layouts, column-stack on mobile

### Critical Responsive Patterns

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Header nav | Hamburger Sheet | Hamburger Sheet | Inline links |
| Vehicle grid | 1 column | 2 columns | 3-4 columns |
| Filter sidebar | Sheet overlay | Sheet overlay | Visible sidebar |
| Car detail | Stacked (gallery → price → specs) | Stacked | Gallery + sticky sidebar |
| Dashboard | No sidebar, bottom nav | Sidebar | Sidebar |
| Footer | 1 column stacked | 2 columns | 4 columns |
| Comparison | 2 vehicles max | 3 vehicles | 4 vehicles |

---

## 10. Animation & Interaction

### Transitions (keep subtle, performant)

| Interaction | Tailwind Classes |
|-------------|-----------------|
| Color change | `transition-colors duration-200` |
| Shadow on hover | `transition-shadow duration-200` |
| Scale on hover (cards) | `transition-transform duration-300 hover:scale-[1.02]` |
| Opacity | `transition-opacity duration-200` |
| Slide-in (Sheet) | Handled by Shadcn/Radix |
| Accordion expand | Handled by Shadcn/Radix |

### Rules

- Use `tailwindcss-animate` plugin classes for enter/exit animations
- No custom CSS animations unless absolutely necessary
- No layout shift — use `aspect-[4/3]` on images, `skeleton` for loading
- Keep animations under 300ms for interactions, 500ms for page transitions
- Use `will-change-transform` sparingly and only when needed

---

## 11. Accessibility & SEO

### Accessibility

- All interactive elements must be keyboard-navigable
- All images must have `alt` text
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- Focus states: Shadcn/ui default `ring-2 ring-ring ring-offset-2`
- Color contrast: Minimum WCAG AA (4.5:1 for text)
- ARIA labels on icon-only buttons (e.g., favorite heart, close button)

### SEO (per page)

- Every page: `metadata` or `generateMetadata` export
- Single `<h1>` per page
- JSON-LD structured data where applicable
- Open Graph + Twitter Card meta tags
- `alt` text on all `<Image />` components
- Canonical URL on every page
- Language `hreflang` tags (et, ru, en)

---

## 12. Anti-Patterns (Do NOT)

### Styling
- **Never** use inline styles or CSS modules
- **Never** create custom CSS classes when Tailwind utilities suffice
- **Never** use `!important`
- **Never** hardcode colors — always use CSS variables via Tailwind tokens
- **Never** use `dark:` prefixed classes for now (light mode only for MVP)

### Components
- **Never** create custom Button, Input, Card — use Shadcn/ui
- **Never** duplicate a component — if it exists in `shared/`, import it
- **Never** put page-specific logic in `shared/` components
- **Never** use default exports
- **Never** create wrapper components that just pass props through
- **Never** use `any` type — define proper interfaces

### Architecture
- **Never** fetch data in client components — use Server Components + server actions
- **Never** use `useEffect` for data fetching — use React Server Components
- **Never** store server state in Zustand — only client UI state
- **Never** import from `stitch/` — it's reference only, not source code
- **Never** use Material Icons — use Lucide React exclusively
- **Never** skip the loading skeleton — every async component needs a `Suspense` boundary

### Code Quality
- **Never** add code comments explaining obvious logic
- **Never** add `console.log` in committed code
- **Never** create files for "future use" — build when needed
- **Never** add error handling for impossible states
- **Never** create abstractions for single-use patterns

---

## Appendix A: Shadcn/ui Components to Install

Run these from `apps/web/`:

```bash
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add tabs
npx shadcn@latest add accordion
npx shadcn@latest add separator
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toggle
npx shadcn@latest add slider
npx shadcn@latest add textarea
npx shadcn@latest add skeleton
npx shadcn@latest add toast
npx shadcn@latest add switch
npx shadcn@latest add progress
npx shadcn@latest add popover
npx shadcn@latest add tooltip
```

---

## Appendix B: VehicleSummary Interface

Shared type used by vehicle-card and related components:

```typescript
interface VehicleSummary {
  id: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  includeVat: boolean;
  mileage: number;
  fuelType: string;
  transmission: string;
  power?: string;
  bodyType: string;
  thumbnailUrl: string;
  status: "ACTIVE" | "PENDING" | "SOLD" | "REJECTED" | "EXPIRED";
  badges?: Array<"new" | "hot_deal" | "certified" | "verified">;
  isFavorited?: boolean;
  createdAt: string;
}
```

---

## Appendix C: Zustand Store Contracts

### useFilterStore
- Manages: make, model, priceMin, priceMax, yearMin, yearMax, fuelType[], transmission, bodyType, color, query, sort, page
- Actions: setFilter(key, value), resetFilters(), setPage(n)
- URL sync: Filters reflect in URL query params

### useFavoritesStore
- Manages: Set<string> of listing IDs
- Actions: toggleFavorite(id), setFavorites(ids[]), isFavorite(id)
- Persistence: localStorage + API sync when authenticated

### useCompareStore
- Manages: Array<VehicleSummary> (max 4)
- Actions: addToCompare(vehicle), removeFromCompare(id), clearCompare()
- Constraint: Max COMPARISON_MAX (4) items

### useLanguageStore
- Manages: locale ("et" | "en" | "ru")
- Actions: setLocale(locale)
- Default: "et"
