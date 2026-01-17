# Specification Mode Setup Summary

Created January 18, 2026 - Arcology Spec-Driven Development Framework

## What Was Created

### Core Files (3 new PROMPT files)
- ✅ `PROMPT_spec.md` - Phase 1: Specification Mode instructions (automated requirements definition)
- ✅ `PROMPT_plan.md` - Phase 2: Planning Mode (already existed, enhanced references)
- ✅ `PROMPT_build.md` - Phase 3: Building Mode (already existed, enhanced references)

### Documentation (3 new docs)
- ✅ `docs/SPECIFICATION_GUIDE.md` - Practical guide with examples, patterns, and common mistakes
- ✅ `docs/SPECIFICATION_METHODOLOGY.md` - Synthesis of Ralph, Spec Kit, and OpenSpec methodologies
- ✅ `AGENTS.md` - Updated with specification workflow references

### Key Innovations

1. **Topic Scope Test** - "Can I describe this in ONE sentence without 'and'?"
   - Prevents scope creep
   - Ensures cohesive specs
   - Makes tasks clearer

2. **Snowflake Method** - Expand from thin (one-liner) to thick (detailed spec)
   - Layer 1: One-liner
   - Layer 2: Capabilities (3-5)
   - Layer 3: Acceptance criteria
   - Layer 4: Concrete scenarios
   - Layer 5: Edge cases & constraints

3. **Automated Interview Flow**
   - User provides one-liner
   - Agent asks clarifying questions
   - Agent generates complete specs
   - User reviews and iterates

## How It Works

### Phase 1: Specification Mode

```
User Input (one-liner)
        ↓
Agent: Clarifies JTBD, topics, criteria, edge cases
        ↓
Agent: Generates AUDIENCE_JTBD.md
        ↓
Agent: Generates specs/TOPIC_1.md ... specs/TOPIC_N.md
        ↓
User: Reviews and refines specs
        ↓
Handoff to Planning Mode
```

Example:
```
User: "I want restaurants to show when they're open or closed"

Agent asks:
- What time do restaurants operate?
- How should closed restaurants look visually?
- Can residents eat outside operating hours?

User answers:
- Fast Food: 11-2 PM, 5-7 PM. Restaurant: 6-11 PM.
- Closed: Red CLOSED label, 60% brightness
- No, they go to kitchen instead

Agent generates:
- specs/RESTAURANT_OPERATING_HOURS.md
- specs/RESTAURANT_VISUAL_STATE.md
```

### Phase 2: Planning Mode (Existing)

Takes specs, analyzes current code, generates `IMPLEMENTATION_PLAN.md`

### Phase 3: Building Mode (Existing)

Implements tasks from plan, tests, validates, commits

## Using Specification Mode

### Start a New Specification

```bash
# 1. You're in SPECIFICATION mode (read PROMPT_spec.md)
# 2. Provide a one-liner requirement
# 3. Agent asks clarifying questions
# 4. Agent generates specs and AUDIENCE_JTBD.md
# 5. You review/refine (ask for changes)
# 6. Switch to Planning Mode when done
```

### Spec Structure (9 Sections)

```markdown
# [Topic Name]
**Scope**: One-sentence without "and"
**Audience**: Who this serves
**Related JTBDs**: Why it matters

## Overview - Problem context
## Capabilities - What it should do
## Acceptance Criteria - Measurable outcomes
## Scenarios by Example - Given/When/Then
## Edge Cases & Error Handling - What could go wrong
## Performance & Constraints - Technical/business limits
## Integration Points - System dependencies
## Testing Strategy - How to verify
```

### Acceptance Criteria (Key Principle)

**Write outcomes** ✅:
```
- [ ] Fast Food opens 11-2 PM and 5-7 PM
- [ ] Income only accrues during operating hours
- [ ] Closed restaurants show CLOSED label in red
```

**NOT implementation** ❌:
```
- [ ] Use RestaurantSystem.isRestaurantOpen()
- [ ] Add statusLabel Text object
- [ ] Check time in update() loop
```

Why? The agent knows how to code. You define WHAT; they implement HOW.

## File Organization

```
arcology/
├── PROMPT_spec.md                    # ← Phase 1: Specification Mode
├── PROMPT_plan.md                    # Phase 2: Planning Mode
├── PROMPT_build.md                   # Phase 3: Building Mode
├── AUDIENCE_JTBD.md                  # Generated: Target audiences + desired outcomes
├── IMPLEMENTATION_PLAN.md            # Generated: Prioritized tasks
├── AGENTS.md                         # Project workflow & references
├── specs/
│   ├── BUILDING.md                   # Spec: Room placement, height limits, sky lobbies
│   ├── RESIDENTS.md                  # Spec: Resident behavior, hunger, satisfaction
│   ├── FOOD_SYSTEM.md                # Spec: Farm→Kitchen→Meals production
│   ├── RESTAURANTS.md                # Spec: Operating hours, evaluation, income
│   ├── TIME_EVENTS.md                # Spec: Day/night cycle, time tracking
│   ├── ELEVATORS.md                  # Spec: Vertical transport, queuing
│   ├── ECONOMY.md                    # Spec: Money, rent tiers, bankruptcy
│   ├── SAVE_LOAD.md                  # Spec: Persistence, auto-save
│   ├── UI_UX.md                      # Spec: Interface, controls, feedback
│   ├── AUDIO.md                      # Spec: Sound effects, volume control
│   ├── GRAPHICS.md                   # Spec: Visual style, aesthetics
│   └── MENUS.md                      # Spec: Navigation, settings, pause
│
└── docs/
    ├── SPECIFICATION_GUIDE.md        # ← START HERE: How to use spec mode
    ├── SPECIFICATION_METHODOLOGY.md  # Deep dive: Ralph + Spec Kit + OpenSpec synthesis
    └── PRINCIPLES.md                 # Coding standards
```

## Topic Scope Test Examples

### ✅ Good (Single Topic)
- "Restaurant operating hours system controls open/closed state"
- "Hunger decay system reduces satisfaction over time"
- "Elevator queue system manages passenger wait times"
- "Save/load system persists building and resident state"

### ❌ Bad (Multiple Topics - SPLIT THESE!)
- "Restaurant system with hours, evaluation, and income" → 3 topics
- "Resident system handles hunger, stress, and satisfaction" → 3 topics
- "Elevator system with pathfinding, state machine, and queuing" → 3 topics

## Methodology Synthesis

**Ralph Wiggum Technique** (Geoffrey Huntley)
- Fresh context each iteration
- Memory via git/files
- Explicit backpressure (tests, lint, type checks)

**Spec Kit** (GitHub)
- Constitution (project principles)
- Specifications (what + why)
- Plan (architecture + constraints)
- Tasks (decomposed work)

**OpenSpec** (Fission-AI)
- Source of truth (specs/) vs Proposals (changes/)
- Delta format (ADDED/MODIFIED/REMOVED)
- Change tracking by feature

**Arcology's Synthesis**:
- Phase 1 (SPEC): Snowflake expansion + structured interview
- Phase 2 (PLAN): Gap analysis + task prioritization
- Phase 3 (BUILD): One task at a time + validation

## Key Principles

1. **Specifications are source of truth** (not code)
2. **Measure outcomes, not approaches** (WHAT not HOW)
3. **One topic per spec** (Topic Scope Test)
4. **Examples catch misunderstandings** (Given/When/Then)
5. **Fresh context is reliability** (phase boundaries)
6. **Backpressure prevents bugs** (tests, lint, type checks)

## Ready to Specify?

1. Read `docs/SPECIFICATION_GUIDE.md` (examples + patterns)
2. Switch to `PROMPT_spec.md` mode
3. Provide a one-liner requirement
4. Agent asks clarifying questions
5. Agent generates specs
6. Iterate until satisfied
7. Switch to Planning Mode

Example one-liners:
- "I want restaurants to show when they're open or closed"
- "Residents should look more diverse (colors, sizes, traits)"
- "The game should automatically save every game day"
- "I want a feedback tooltip on hover"

## Documentation References

- `docs/SPECIFICATION_GUIDE.md` - Practical guide (read first)
- `docs/SPECIFICATION_METHODOLOGY.md` - Theoretical foundation
- `PROMPT_spec.md` - Full spec mode instructions (for agent)
- `AGENTS.md` - Project workflow + external refs

External:
- Ralph Playbook: https://ghuntley.com/ralph-playbook
- GitHub Spec Kit: https://github.com/github/spec-kit
- OpenSpec: https://github.com/Fission-AI/OpenSpec
- Ralph Orchestrator: https://github.com/mikeyobrien/ralph-orchestrator

## Next Steps

1. ✅ Specification Mode framework created
2. ⏳ Use for new features/requirements
3. ⏳ Existing specs can be reviewed/updated using this framework
4. ⏳ Planning Mode (Phase 2) reads specs and creates task list
5. ⏳ Building Mode (Phase 3) implements and commits

---

**Status**: ✅ Complete and ready to use
**Created**: 2026-01-18
**Framework**: Ralph + Spec Kit + OpenSpec synthesis
