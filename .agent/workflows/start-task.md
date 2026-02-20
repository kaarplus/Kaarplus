---
description: Start a new implementation task from the implementation plan
---

# Start Task Workflow

Use this workflow when beginning a new implementation task.

1. Read the implementation plan to find the next task:

```bash
cat docs/IMPLEMENTATION_PLAN.md
```

2. Identify the next uncompleted task (marked with ⬜). Confirm its dependencies are met (marked with ✅).

3. Read the task specification file:

```bash
cat docs/tasks/<TASK-ID>-<slug>.md
```

4. Review related documentation:
   - `docs/ARCHITECTURE.md` for structural guidance
   - `docs/API.md` for endpoint specifications
   - `docs/DATABASE.md` for schema details
   - `docs/FEATURES.md` for feature details
   - `docs/DESIGN_SYSTEM.md` for ALL UI implementation rules

5. **If the task involves UI/frontend work**, check the Stitch reference:
   - Read `docs/DESIGN_SYSTEM.md` Section 5 (Stitch-to-Component Mapping) to identify which stitch folder maps to this task
   - Read the corresponding `stitch/<folder>/code.html` for design reference (colors, spacing, layout, structure)
   - View `stitch/<folder>/screen.png` for visual reference
   - Cross-reference with `docs/DESIGN_SYSTEM.md` to confirm component file paths and shared component reuse
   - **NEVER import or copy code from stitch files** — they are HTML reference only
   - **ALWAYS use Lucide React icons** — map any Material Icons from stitch using the icon mapping table in DESIGN_SYSTEM.md Section 8
   - **ALWAYS use Shadcn/ui primitives** — never recreate Button, Card, Input, etc.
   - **Check `src/components/shared/`** before creating any component — it may already exist

6. Create a new git branch for the task:

```bash
git checkout -b feat/<task-id>-<short-description>
```

7. Implement the task following the specification and design system rules.

8. After implementation, run quality checks:

```bash
npm run lint
```

```bash
npm run typecheck
```

```bash
npm run test
```

9. Update the task status in `docs/IMPLEMENTATION_PLAN.md` — change ⬜ to ✅.

10. Update the task status in the task file header — change "⬜ Not Started" to "✅ Complete".

11. Commit with conventional commit format:

```bash
git add -A && git commit -m "feat(<scope>): <description> [<TASK-ID>]"
```
