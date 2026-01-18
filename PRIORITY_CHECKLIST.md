# Priority Checklist - Marked for PROMPT_spec/plan/build

**This checklist is your operational guide. Update it as specifications progress.**

---

## 🔴 CRITICAL: UI/GRAPHICS FIRST (Mark in red to ensure visibility)

When implementing ANY mechanic, implement UI/Graphics AT THE SAME TIME:

- [ ] **READ FIRST**: IMPLEMENTATION_MANIFEST.md
- [ ] **READ SECOND**: UI_VISUAL_FEEDBACK.md
- [ ] **READ THIRD**: GRAPHICS_ANIMATION_ENHANCEMENTS.md
- [ ] **PRINCIPLE**: Never implement mechanics then defer visuals to later phases

---

## Spec Writing Checklist

### ✅ COMPLETE (15 of 21)

**Phase 1B: Movement & Traffic** ✅
- [x] RESIDENT_MOVEMENT.md (400 lines, 5 scenarios)
- [x] CONGESTION_MECHANICS.md (350 lines, 5 scenarios)
- [x] LOBBY_EXTENSION.md (350 lines, 5 scenarios)

**Phase 2A: Maintenance & Failure** ✅
- [x] MAINTENANCE_SYSTEM.md (450 lines, 5 scenarios)
- [x] FAILURE_CASCADES.md (500 lines, 5 scenarios)
- [x] OXYGEN_SYSTEM.md (400 lines, 5 scenarios)
- [x] POWER_SYSTEM.md (450 lines, 5 scenarios)

**Phase 2B: Infrastructure** ✅
- [x] WATER_WASTE_SYSTEM.md (400 lines, 5 scenarios)
- [x] FOOD_CHAINS.md (400 lines, 5 scenarios)
- [x] MEDICAL_SYSTEM.md (400 lines, 5 scenarios)

**Phase 3: Agents** ✅
- [x] AGENT_SYSTEM.md (450 lines, 4 scenarios)
- [x] AGENT_EMERGENCE.md (400 lines, 3 scenarios)
- [x] INFRASTRUCTURE_AGENTS.md (400 lines, 3 scenarios)

**🔴 UI/GRAPHICS (CRITICAL PRIORITY)** ✅
- [x] UI_VISUAL_FEEDBACK.md (400 lines, all UI feedback)
- [x] GRAPHICS_ANIMATION_ENHANCEMENTS.md (500 lines, all graphics effects)

---

### 🚧 PLANNED (6 of 21)

**Phase 4: Economy & Expansion** 🚧
- [ ] ZONING_DISTRICTS.md
- [ ] MAP_EXPANSION.md
- [ ] BANKRUPTCY_MECHANICS.md
- [ ] INVESTMENT_STRATEGY.md

**Phase 5: Residents & Stories** 🚧
- [ ] RESIDENT_AMBITIONS.md
- [ ] EMPLOYMENT_SYSTEM.md
- [ ] SATISFACTION_MECHANICS.md
- [ ] CRISIS_MECHANICS.md

---

## Implementation Checklist

### Phase 1 Build (With UI/Graphics)

**Core Mechanics**:
- [ ] RESIDENT_MOVEMENT.md implemented
- [ ] CONGESTION_MECHANICS.md implemented
- [ ] LOBBY_EXTENSION.md implemented

**UI/Graphics (Must build WITH Phase 1 mechanics, NOT AFTER)**:
- [ ] Building placement animations (UI_VISUAL_FEEDBACK.md L1-50)
- [ ] Building success animation: 750ms (grow, glow, settle)
- [ ] Building failure animation: 500ms (shake, pulse, fade)
- [ ] Resident walking animation: 6-frame cycle, 1.5s base
- [ ] Congestion visual bunching: resident spacing, movement slow
- [ ] Congestion darkening: corridors get darker when crowded

**Validation**:
- [ ] All acceptance criteria from mechanics specs met
- [ ] All animations implemented from graphics spec
- [ ] Building placement feels responsive and satisfying
- [ ] Resident movement is smooth and visible

---

### Phase 2 Build (With UI/Graphics)

**Core Mechanics**:
- [ ] MAINTENANCE_SYSTEM.md implemented
- [ ] FAILURE_CASCADES.md implemented
- [ ] OXYGEN_SYSTEM.md implemented
- [ ] POWER_SYSTEM.md implemented
- [ ] WATER_WASTE_SYSTEM.md implemented
- [ ] FOOD_CHAINS.md implemented
- [ ] MEDICAL_SYSTEM.md implemented

**UI/Graphics (Must build WITH Phase 2 mechanics)**:
- [ ] System health bar 4-state progression (cyan → amber → orange → magenta)
- [ ] Real-time system status bar (top UI showing all 5 systems)
- [ ] System-specific glows (colors from GRAPHICS_ANIMATION_ENHANCEMENTS.md)
- [ ] Cascade visualization: red lines showing failure path
- [ ] Cascade animation sequence: 500ms progression
- [ ] Emergency lighting: power failure → blackout + red emergency lights
- [ ] Crisis full-screen modal: 3+ systems failing
- [ ] Starvation indicator: red bar, flashing "STARVING"
- [ ] Disease indicator: orange glow, "EPIDEMIC" warning

**Validation**:
- [ ] System health visible and understandable
- [ ] Cascades are visually obvious (red lines, magenta glows)
- [ ] Crisis moments feel urgent (red overlays, flashing, alerts)
- [ ] Starvation and disease are clear player concerns

---

### Phase 3 Build (With UI/Graphics)

**Core Mechanics**:
- [ ] AGENT_SYSTEM.md implemented
- [ ] AGENT_EMERGENCE.md implemented
- [ ] INFRASTRUCTURE_AGENTS.md implemented

**UI/Graphics**:
- [ ] Worker activity display (UI showing current allocations)
- [ ] Worker redirect animation (movement to emergency)
- [ ] Particle effects for repairs (sparks, effects)

---

### Phase 4-5 Build

Complete when Phase 4-5 specs are written

---

## Before Each Mode (PROMPT_spec/plan/build)

### Entering PROMPT_spec mode

- [ ] Read IMPLEMENTATION_MANIFEST.md
- [ ] Check which phase/specs are missing
- [ ] Use JTBD_TO_SPECS_MAPPING.md to understand priority
- [ ] Use existing specs as quality template (should match ~400-500 lines, 5+ scenarios)
- [ ] Include UI/Graphics requirements in ANY spec (don't assume "we'll add UI later")

### Entering PROMPT_plan mode

- [ ] Read IMPLEMENTATION_MANIFEST.md
- [ ] Check which specs are complete and ready
- [ ] Use JTBD_TO_SPECS_MAPPING.md for task breakdown
- [ ] Create tasks for mechanic AND corresponding UI/Graphics in parallel
- [ ] Use UI_GRAPHICS_IMPLEMENTATION_PRIORITY.md to understand visual requirements

### Entering PROMPT_build mode

- [ ] Read IMPLEMENTATION_MANIFEST.md
- [ ] Read the mechanic spec you're building
- [ ] **Read UI_VISUAL_FEEDBACK.md** for that mechanic's UI requirements
- [ ] **Read GRAPHICS_ANIMATION_ENHANCEMENTS.md** for animation specs
- [ ] Implement all three together (not mechanics first)
- [ ] Validate against acceptance criteria in all three specs

---

## Quality Gates

### Before Marking Spec "Done"

- [ ] All acceptance criteria defined and testable
- [ ] 5+ detailed scenarios with expected outcomes
- [ ] Edge cases identified and recovery behaviors specified
- [ ] Integration points mapped to dependent systems
- [ ] Testing strategy complete
- [ ] UI/Graphics requirements defined (if applicable)

### Before Marking Implementation "Done"

- [ ] All acceptance criteria from mechanics spec met
- [ ] All UI feedback implemented per UI_VISUAL_FEEDBACK.md
- [ ] All graphics/animations implemented per GRAPHICS_ANIMATION_ENHANCEMENTS.md
- [ ] Animations tested at 1x, 2x, 4x game speeds
- [ ] No visual feedback deferred to "later"
- [ ] All integration tests pass

---

## Current Session Status

**Started with**: Direction + vision (vague)
**Ended with**: 15 complete detailed specs + 2 critical UI/Graphics specs
**Progress**: 71% of full specification complete

**What's locked in**: Phases 1-3 (core mechanics, UI, graphics)
**What's remaining**: Phases 4-5 (economy, residents) - 6 specs, ~3 hours writing

**Next steps**:
1. Continue spec writing (4+ hours) → Complete all 21 specs
2. OR start building immediately (have 15 specs ready)
3. Recommendation: Finish Phase 4-5 specs (ensure full vision locked), then build

---

## Remember: UI/Graphics is Top Priority

**This checklist exists because:**
- Without UI, mechanics feel abstract
- Without graphics feedback, players don't understand causality
- Deferring UI/Graphics to end makes implementation chaotic
- Building together creates coherent, responsive game

**Every item in this checklist that mentions UI or graphics is CRITICAL PATH, not optional.**

---

**Last Updated**: January 18, 2026
**Maintainer**: You
**Next Review**: Before PROMPT_spec/plan/build modes
