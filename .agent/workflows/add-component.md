---
description: Add a new Shadcn/ui component to the project
---

# Add Shadcn Component Workflow

Use this when you need a Shadcn/ui primitive that isn't yet installed.

## Pre-Check

1. **Check if component is already installed:**
   // turbo
   ```bash
   ls apps/web/src/components/ui/
   ```

2. **Verify it's needed** — Before adding a primitive, check if a shared composite component already exists:
   ```bash
   cat docs/DESIGN_SYSTEM.md | grep -A 20 "Shared UI Primitives"
   ```

3. **Check component list:**
   ```bash
   cat docs/DESIGN_SYSTEM.md | grep -A 30 "Appendix A: Shadcn/ui Components to Install"
   ```

## Installation

1. Add the component:
   ```bash
   cd apps/web && npx shadcn@latest add <component-name>
   ```

2. Verify installation:
   ```bash
   ls apps/web/src/components/ui/ | grep <component-name>
   ```

3. Import path: `@/components/ui/<component-name>`

## Rules

- **DO NOT modify** the core behavior of Shadcn/ui components
- **DO NOT create custom Button, Card, Input, etc.** — use Shadcn/ui versions
- If you need styling changes, create a **wrapper component** in `shared/` or use `cn()` to extend classes
