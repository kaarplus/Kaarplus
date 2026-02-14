# Project Requirements Update - 2026-02-14

## Summary

This document summarizes the critical project requirement updates that have been integrated into all documentation, workflows, and task specifications.

## Key Requirements

### 1. Platform Strategy
- **Web-first approach** - Mobile app will follow later
- **Investor screens** to be developed alongside main app for fundraising purposes

### 2. Design & UX
- **Design Style:** NOT like Turbo.az or Auto24
- **Theme Priority:** Light mode (dark mode planned for future releases)
- **Login/Registration:** Style similar to Auto24 platform

### 3. Language Support
- **Estonian (Primary)**
- **Russian**
- **English**
- Language selector in header (ET / RU / EN)
- All future UI text must be translatable

### 4. Header/Navigation
- **"Place your ad" CTA button** must be prominent in header
- Language selector (ET / RU / EN)
- Logo, search bar, auth buttons, category nav

### 5. Landing Page
- **Excluded for MVP:**
  - Video content
  - "Old for New" feature
  - "Comprehensive services" section
- **Vehicle Category Sections:**
  - Buy (general cars)
  - Electric (with dealership ad placements)
  - Hybrid (with dealership ad placements)
- **Reviews:** Carvago-style customer reviews/testimonials

### 6. Photo Upload (CRITICAL)
**Instructional tips must be displayed when users upload car photos:**
- "Take photos in daylight for best results"
- "Include exterior from all angles (front, back, sides)"
- "Capture interior dashboard and seats"
- "Show engine bay and wheels"
- "Avoid blurry or dark images"
- "Include any damage or special features"

### 7. New Features Added
- **Reviews System:** Carvago-style reviews for listings and sellers (Phase 2)
- **Vehicle Inspection:** Professional inspection service with reports (Phase 2)

### 8. Database Schema Extensions
**New Models to be added in Phase 2:**
- `Review` - User reviews with rating, comment, verification
- `Inspection` - Vehicle inspection records with PDF reports

**New Enums:**
- `InspectionStatus` (PENDING, COMPLETED, FAILED)
- `VehicleCondition` (EXCELLENT, GOOD, FAIR, POOR)

## Documentation Files Updated

### Core Documentation
1. ✅ `CLAUDE.md` - Updated with all new requirements and business rules
2. ✅ `docs/FEATURES.md` - Added Electric/Hybrid sections, reviews, inspection, language support
3. ✅ `docs/DATABASE.md` - Extended with Review and Inspection models
4. ✅ `docs/IMPLEMENTATION_PLAN.md` - Added P2-T09, P2-T10, P4-T06 tasks

### Completed Task Adjustments
1. ✅ `docs/tasks/P1-T02-database-schema.md` - Note about future Review/Inspection models
2. ✅ `docs/tasks/P1-T04-nextjs-scaffolding.md` - Light mode priority, language selector, CTA button
3. ✅ `docs/tasks/P1-T06-landing-page.md` - Electric/Hybrid sections, no video, Carvago reviews
4. ✅ `docs/tasks/P1-T11-photo-upload.md` - Photo upload instructional tips (CRITICAL)

## Implementation Impact Analysis

### Completed Tasks (No Code Changes Required)
- **P1-T01:** Monorepo scaffolding - ✅ No impact
- **P1-T02:** Database schema - ⚠️ Review/Inspection models deferred to Phase 2
- **P1-T03:** API boilerplate - ✅ No impact (backend flexible enough)
- **P1-T04:** Next.js scaffolding - ⚠️ Needs runtime validation:
  - Verify light mode is default
  - Check if language selector stub exists
  - Confirm "Place your ad" button in header

### Future Tasks Significantly Affected
- **P1-T06:** Landing page - Major changes (Electric/Hybrid sections, reviews)
- **P1-T11:** Photo upload - CRITICAL: Must add instructional tips UI

## Action Items

### For Development Team
1. Review completed P1-T04 implementation for compliance with:
   - Light mode as default
   - Language selector presence
   - "Place your ad" CTA button

2. When implementing P1-T06 (Landing Page):
   - Do NOT style like Turbo.az or Auto24
   - Include Buy/Electric/Hybrid sections
   - Use Carvago-style reviews
   - Exclude video, "Old for New", "Comprehensive services"

3. When implementing P1-T11 (Photo Upload):
   - **MUST include** instructional tips overlay/tooltip
   - Display tips immediately when user enters upload area

### For Phase 2 Planning
1. Create task specifications for:
   - P2-T09: Reviews system (Carvago-style)
   - P2-T10: Vehicle inspection service

2. Create database migration for:
   - Review model
   - Inspection model
   - New enums (InspectionStatus, VehicleCondition)

### For Phase 4 Planning
1. Create task specification for:
   - P4-T06: Mobile app preparation (investor screens)

2. Update P4-T01 implementation to support:
   - Estonian (primary)
   - Russian
   - English

## SEO Keywords Update

Added focus keywords for Electric/Hybrid:
- "elektriautod" (electric cars)
- "hübriidautod" (hybrid cars)

## Notes for Future Sessions

- All .md documentation is now synchronized with latest requirements
- Database schema documentation reflects future additions
- Implementation plan phases updated with new tasks
- Photo upload tips are CRITICAL for user experience - do not skip

---

**Last Updated:** 2026-02-14  
**Updated By:** AI Agent (Claude)  
**Review Status:** Ready for team approval
