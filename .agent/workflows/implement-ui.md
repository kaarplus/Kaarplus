---
description: Implement a UI page or component using Stitch reference and Design System rules
---

# Implement UI Workflow

Use this workflow when building any UI page, section, or component. This ensures consistent, DRY, pixel-accurate implementation from Stitch references.

## Phase 1: Gather Context

1. Read the Design System (mandatory for every UI task):

```bash
cat docs/DESIGN_SYSTEM.md
```

2. Identify the Stitch reference folder for your component/page. The mapping is in Section 5:

| Page/Feature | Stitch Folder |
|---|---|
| Landing page | `stitch/kaarplus_home_landing_page/` |
| Header, Footer, Cookie | `stitch/navigation_and_cookie_consent_components/` |
| Login, Register, Password Reset | `stitch/login_and_registration_modals/` |
| Listings (grid + list + filters) | `stitch/vehicle_listings_grid_and_list_view/` |
| Car detail + specs | `stitch/vehicle_detail_and_specification_page/` |
| Sell wizard (4 steps) | `stitch/sell_your_car_step-by-step_wizard/` |
| Dashboard + messages + settings | `stitch/user_dashboard_and_management/` |
| Comparison table | `stitch/vehicle_side-by-side_comparison/` |

3. Read the Stitch HTML file for design details (spacing, colors, layout, structure):

```bash
cat stitch/<folder>/code.html
```

4. View the Stitch screenshot for visual reference:
   - Open `stitch/<folder>/screen.png`

5. Check what shared components already exist:

```bash
ls -la apps/web/src/components/shared/
```

```bash
ls -la apps/web/src/components/ui/
```

## Phase 2: Pre-Implementation Checklist

Before writing any code, verify:

- [ ] **Component file path** matches `docs/DESIGN_SYSTEM.md` Section 4 directory structure
- [ ] **Shared components** — Am I about to build something that already exists in `shared/`? If the Design System lists it as shared, import it — do NOT recreate it
- [ ] **Shadcn/ui primitives** — Do I need any not yet installed? If so, install first:
  ```bash
  cd apps/web && npx shadcn@latest add <component-name>
  ```
- [ ] **Icons** — All icons use Lucide React. Check the Material-to-Lucide mapping table in Section 8 of DESIGN_SYSTEM.md
- [ ] **Colors** — All colors use CSS variables via Tailwind tokens (`text-primary`, `bg-background`, etc.). NEVER hardcode hex values
- [ ] **No default exports** — Use named exports only
- [ ] **Server Component by default** — Only add `"use client"` if using hooks, events, or browser APIs

## Phase 3: Implementation Rules

### Extracting Design Values from Stitch HTML

The Stitch HTML files contain Tailwind classes. Extract these values but adapt them:

1. **Colors**: Stitch uses `text-primary`, `bg-primary`, `text-slate-600` etc. Map to our CSS variable tokens:
   - `text-primary` → keep as-is (maps to `#10b77f` via CSS var)
   - `bg-slate-50` → use `bg-secondary` or `bg-muted` instead
   - `text-slate-600` → use `text-muted-foreground` instead
   - `text-slate-900` → use `text-foreground` instead
   - `border-slate-200` → use `border-border` instead
   - `bg-white` → use `bg-card` or `bg-background` instead

2. **Spacing**: Keep the Tailwind spacing classes from Stitch (p-4, p-6, gap-6, etc.) — they define the visual rhythm

3. **Layout**: Keep grid/flex patterns from Stitch (grid-cols-3, flex gap-6, etc.)

4. **Typography**: Keep font sizes and weights from Stitch (text-sm font-semibold, etc.)

5. **Icons**: Replace ALL Material Icon names with Lucide equivalents:
   ```tsx
   // Stitch: <span class="material-icons">directions_car</span>
   // Ours:
   import { Car } from "lucide-react";
   <Car className="h-5 w-5" />
   ```

6. **Images**: Use Next.js `<Image />` component, never raw `<img>`. Add `alt` text always.

7. **Links**: Use Next.js `<Link />` component, never raw `<a>` for internal routes.

### Component Structure Template

```tsx
// src/components/<category>/<component-name>.tsx

import { cn } from "@/lib/utils";
// Import Lucide icons as needed
// Import Shadcn/ui components as needed
// Import shared components as needed

interface ComponentNameProps {
  // Define props
}

export function ComponentName({ ...props }: ComponentNameProps) {
  return (
    // JSX matching Stitch layout with adapted tokens
  );
}
```

### Responsive Implementation

Desktop-first (matches Figma/Stitch). Key patterns from Stitch:

- **Header**: `h-16` desktop, hamburger Sheet on mobile
- **Grids**: Start with desktop column count, reduce for mobile
  - Landing categories: `grid-cols-2 md:grid-cols-4 lg:grid-cols-8`
  - Vehicle cards: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
  - Footer: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Sidebar layouts**: `hidden lg:block` for sidebars, Sheet on mobile

## Phase 4: Post-Implementation

1. Verify the component renders correctly
2. Check for console errors/warnings
3. Verify responsive behavior at all breakpoints
4. Run quality checks:

```bash
npm run lint
```

```bash
npm run typecheck
```

5. Verify no duplicate components were created:

```bash
ls apps/web/src/components/shared/
```

## Quick Reference: Stitch Design Tokens

These are the consistent values across ALL 8 Stitch files:

| Token | Value | Tailwind |
|-------|-------|----------|
| Primary | `#10b77f` | `text-primary`, `bg-primary` |
| Background | `#f6f8f7` | `bg-background` |
| Dark bg | `#10221c` | Custom `bg-[#10221c]` for hero |
| Footer bg | `#1f2937` | `bg-[#1f2937]` |
| Font | Inter | `font-sans` |
| Border radius | 0.5rem default | `rounded-md` / `rounded-lg` |
| Card shadow | `shadow-sm` | `shadow-sm` |
| Hover shadow | `shadow-xl` | `hover:shadow-xl` |
| Image aspect | 4/3 (cards) | `aspect-[4/3]` |
| Header height | 64px | `h-16` |
| Sidebar width | 280-300px | `w-[280px]` or `w-[300px]` |
| Max container | 1400px | `container` (2xl) |

## Stitch Cross-Reference: Shared Components

These components appear in MULTIPLE stitch files. Build them ONCE in `shared/`:

| Component | Appears In Stitch Files |
|-----------|------------------------|
| vehicle-card | landing, listings, car-detail (similar), dashboard |
| price-display | listings, car-detail, comparison |
| spec-icons | listings (grid+list cards), car-detail |
| favorite-button | listings, car-detail |
| search-bar | landing (hero), navigation (header) |
| breadcrumbs | car-detail, comparison, sell wizard |
| star-rating | landing (testimonials), car-detail (seller) |
| pagination | listings |
| status-badge | listings (New/Hot Deal/Certified), dashboard |
| image-gallery | car-detail |
