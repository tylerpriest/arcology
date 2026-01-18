# 🔴 IMPLEMENTATION MANIFEST - READ THIS FIRST

**Before running PROMPT_spec, PROMPT_plan, or PROMPT_build, read this document.**

This manifest is the source of truth for implementation priorities and is NOT auto-generated from PROMPT_XXXX.md files.

---

## CRITICAL PRIORITY: UI/GRAPHICS VISUAL FEEDBACK

**Status**: 🔴 MUST BE IMPLEMENTED ALONGSIDE CORE MECHANICS (NOT DEFERRED)

### Specifications (Ready to Implement)
- **UI_VISUAL_FEEDBACK.md** - Building placement animations, health indicators, cascade UI, alerts, crisis notifications
- **GRAPHICS_ANIMATION_ENHANCEMENTS.md** - Animation timings, system visuals, particles, screen effects

### Why Critical
Player understanding of ALL mechanics depends on visual feedback:
- Building placement → Needs glow + grow feedback (750ms animation)
- System health → Needs color bar progression (cyan → amber → orange → magenta)
- Cascading failures → Need red visualization showing cascade path
- Congestion → Needs visual bunching of residents
- Crises → Need red overlay + flashing + alerts for urgency

### Implementation Strategy
**DO NOT DEFER UI/GRAPHICS TO END**

Implement in parallel with mechanics:
1. **Phase 1**: Movement mechanics → immediately implement building animations + walking cycles
2. **Phase 2**: Maintenance/crisis mechanics → immediately implement health bars + cascade visuals
3. **Phase 3**: Agent mechanics → immediately implement agent activity displays
4. **Phase 4-5**: Economy/residents → immediately implement corresponding UI/Graphics

### Checklist (Implement These First in Each Phase)

#### Phase 1 Priority UI/Graphics
- [ ] Building placement success animation (750ms: fade in → grow → glow → settle)
- [ ] Building placement failure animation (500ms: shake → pulse → fade)
- [ ] Resident walking animation (6-frame cycle, 1.5s base)
- [ ] Congestion visual bunching (closer spacing, slower movement, darker)

#### Phase 2 Priority UI/Graphics
- [ ] System health bar 4-state progression (100%-50% cyan, 50%-20% amber, 20%-0% orange, 0% magenta)
- [ ] Real-time system status display (top bar showing all 5 systems)
- [ ] Cascade visualization (red lines showing failure path, affected systems glowing magenta)
- [ ] Emergency lighting (power failure → black with red emergency lights)
- [ ] Crisis alert UI (full-screen modal when 3+ systems failing)

#### Phase 3 Priority UI/Graphics
- [ ] Worker activity display (UI showing current worker allocation)
- [ ] Worker redirect animation (icons moving to emergency location)
- [ ] Particle effects for repairs (sparks, tool effects)

---

## Specification Completion Status

### Completed ✅ (15 of 21 specs - 71%)

**Phase 1B: Movement & Traffic** (3 specs)
- RESIDENT_MOVEMENT.md
- CONGESTION_MECHANICS.md
- LOBBY_EXTENSION.md

**Phase 2A: Maintenance & Failure** (4 specs)
- MAINTENANCE_SYSTEM.md
- FAILURE_CASCADES.md
- OXYGEN_SYSTEM.md
- POWER_SYSTEM.md

**Phase 2B: Infrastructure** (3 specs)
- WATER_WASTE_SYSTEM.md
- FOOD_CHAINS.md
- MEDICAL_SYSTEM.md

**Phase 3: Agents** (3 specs)
- AGENT_SYSTEM.md
- AGENT_EMERGENCE.md
- INFRASTRUCTURE_AGENTS.md

**🔴 UI/Graphics (CRITICAL PRIORITY)** (2 specs)
- **UI_VISUAL_FEEDBACK.md** ← READ THIS FIRST FOR UI SPECS
- **GRAPHICS_ANIMATION_ENHANCEMENTS.md** ← READ THIS FIRST FOR GRAPHICS SPECS

### Planned 🚧 (6 of 21 specs - 29%)

**Phase 4: Economy & Expansion** (4 specs)
- ZONING_DISTRICTS.md
- MAP_EXPANSION.md
- BANKRUPTCY_MECHANICS.md
- INVESTMENT_STRATEGY.md

**Phase 5: Residents & Stories** (4 specs)
- RESIDENT_AMBITIONS.md
- EMPLOYMENT_SYSTEM.md
- SATISFACTION_MECHANICS.md
- CRISIS_MECHANICS.md

---

## Implementation Workflow

### When Entering Build Mode
1. **Review UI_VISUAL_FEEDBACK.md** - What UI animations/feedback needed?
2. **Review GRAPHICS_ANIMATION_ENHANCEMENTS.md** - What graphics effects needed?
3. **Review the mechanic spec** - What system/feature to build?
4. **Implement mechanic + corresponding UI/Graphics together** - Don't defer visuals

### When Entering Plan Mode
1. **Reference JTBD_TO_SPECS_MAPPING.md** - Which specs map to which JTBDs?
2. **Check UI_GRAPHICS_IMPLEMENTATION_PRIORITY.md** - What UI/Graphics needed for this phase?
3. **Create tasks for mechanic + UI/Graphics in parallel** - Not sequentially

### When Entering Spec Mode
1. **Check existing IMPLEMENTATION_MANIFEST.md** - What's already specified?
2. **Review UI_VISUAL_FEEDBACK.md pattern** - Match spec quality/detail level
3. **Define UI/Graphics requirements in your new spec** - Don't assume "we'll add UI later"

---

## Quick Reference: Spec to UI/Graphics Mapping

| Mechanic Spec | UI Spec | Graphics Spec | Status |
|---|---|---|---|
| RESIDENT_MOVEMENT.md | UI_VISUAL_FEEDBACK.md (L50-100) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L50-150) | ✅ Ready |
| CONGESTION_MECHANICS.md | UI_VISUAL_FEEDBACK.md (L120-180) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L280-320) | ✅ Ready |
| LOBBY_EXTENSION.md | UI_VISUAL_FEEDBACK.md (L30-50) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L20-50) | ✅ Ready |
| MAINTENANCE_SYSTEM.md | UI_VISUAL_FEEDBACK.md (L200-250) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L155-250) | ✅ Ready |
| FAILURE_CASCADES.md | UI_VISUAL_FEEDBACK.md (L250-350) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L350-450) | ✅ Ready |
| OXYGEN_SYSTEM.md | UI_VISUAL_FEEDBACK.md (L200-230) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L160-190) | ✅ Ready |
| POWER_SYSTEM.md | UI_VISUAL_FEEDBACK.md (L200-230) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L195-230) | ✅ Ready |
| AGENT_SYSTEM.md | UI_VISUAL_FEEDBACK.md (L110-150) | GRAPHICS_ANIMATION_ENHANCEMENTS.md (L450-480) | ✅ Ready |

---

## Why This Manifest Exists

The PROMPT_SPEC.md, PROMPT_PLAN.md, and PROMPT_BUILD.md files contain methodology guidance. They should NOT be edited to reflect changing priorities.

This IMPLEMENTATION_MANIFEST.md is the operational source of truth for:
- Current specification status
- Critical implementation priorities
- Which specs to read first for each mode
- UI/Graphics integration requirements

**Update this manifest as you:**
- Complete new specifications
- Discover implementation priorities
- Integrate new findings

---

## File Organization

**Before entering any build/plan/spec mode, check**:
1. This file (IMPLEMENTATION_MANIFEST.md) ← YOU ARE HERE
2. UI_GRAPHICS_IMPLEMENTATION_PRIORITY.md ← For detailed UI/Graphics guidance
3. JTBD_TO_SPECS_MAPPING.md ← For spec priority ordering
4. The specific PROMPT_XXXX.md file ← For methodology

---

## Most Important Takeaway

**🔴 UI/GRAPHICS MUST BE IMPLEMENTED WITH MECHANICS, NOT AFTER**

This is not a suggestion. This is how you make the game feel responsive, understandable, and fun.

Every mechanic needs:
1. **Mechanic spec** (what it does)
2. **UI spec** (how player controls/understands it)
3. **Graphics spec** (visual feedback making it real)

Implement all three together. Don't implement #1 and defer #2 & #3 "for later".

---

## Next Actions

- [ ] Read UI_VISUAL_FEEDBACK.md (building animations, health bars, cascade alerts)
- [ ] Read GRAPHICS_ANIMATION_ENHANCEMENTS.md (animation timings, system visuals, effects)
- [ ] Use this manifest as quick reference before entering build/plan/spec modes
- [ ] Update this manifest when new specs complete or priorities change

**Last Updated**: January 18, 2026
**Maintainer**: You (update whenever spec status or priorities change)
