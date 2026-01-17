# Specification Mode Setup - Complete Reference

**Status**: ✅ Ready to use  
**Created**: January 18, 2026  
**Framework**: Ralph + Spec Kit + OpenSpec synthesis  
**Phase**: Phase 1 (Specification) of Ralph methodology

## Quick Navigation

- **New to spec mode?** → Read `docs/SPECIFICATION_GUIDE.md` (10 min)
- **Want practical examples?** → See `docs/SPECIFICATION_GUIDE.md` (examples section)
- **Need methodology foundation?** → Read `docs/SPECIFICATION_METHODOLOGY.md`
- **Curious about ecosystem?** → Read `docs/RALPH_ECOSYSTEM_INTEGRATION.md`
- **Quick reference?** → See `SPEC_MODE_QUICK_START.txt`
- **Full agent instructions?** → See `PROMPT_spec.md` (for agent, not humans)

## What Was Created

### 📋 Core Instructions (For Agent)
- **`PROMPT_spec.md`** - Complete Phase 1 workflow instructions
  - Automated interview flow (user input → agent questions → specs generated)
  - Snowflake method (thin → thick expansion)
  - Topic Scope Test (quality gate for spec scope)
  - Complete spec template (9 sections)

### 📖 Human Guides
- **`docs/SPECIFICATION_GUIDE.md`** ← START HERE
  - Practical patterns and examples
  - Common mistakes to avoid
  - Real Arcology examples (restaurants, residents, etc.)
  - Tips for working with agent

- **`docs/SPECIFICATION_METHODOLOGY.md`**
  - Why this approach (Ralph principles)
  - How it works (detailed process)
  - When to iterate back to Phase 1
  - Key principles

- **`docs/RALPH_ECOSYSTEM_INTEGRATION.md`**
  - How Arcology integrates with 8 key repositories
  - What each repository contributes
  - Best practices from each
  - Future roadmap

### 📑 Quick References
- **`SPEC_MODE_SETUP_SUMMARY.md`** - What was created and why
- **`SPEC_MODE_QUICK_START.txt`** - Visual quick reference card
- **`README_SPEC_MODE.md`** - This file

### ✅ Updated Files
- **`AGENTS.md`** - Enhanced with spec mode workflow and references
- **`IMPLEMENTATION_PLAN.md`** - Comprehensive planning document

## The Three-Phase Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                      PHASE 1: SPECIFICATION                     │
│                    (PROMPT_spec.md mode)                        │
├─────────────────────────────────────────────────────────────────┤
│ User Input (one-liner)                                          │
│     ↓                                                            │
│ Agent: Asks clarifying questions (JTBD, topics, criteria)       │
│     ↓                                                            │
│ Agent: Generates specs                                          │
│     ↓                                                            │
│ User: Reviews and refines                                       │
│     ↓                                                            │
│ Output: AUDIENCE_JTBD.md + specs/TOPIC_*.md                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                       PHASE 2: PLANNING                         │
│                    (PROMPT_plan.md mode)                        │
├─────────────────────────────────────────────────────────────────┤
│ Input: specs/* + src/* (code)                                   │
│     ↓                                                            │
│ Agent: Analyzes gaps (specs vs code)                            │
│     ↓                                                            │
│ Agent: Prioritizes tasks                                        │
│     ↓                                                            │
│ Output: IMPLEMENTATION_PLAN.md                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      PHASE 3: BUILDING                          │
│                    (PROMPT_build.md mode)                       │
├─────────────────────────────────────────────────────────────────┤
│ Input: IMPLEMENTATION_PLAN.md                                   │
│     ↓                                                            │
│ Agent: Picks top task                                           │
│     ↓                                                            │
│ Agent: Implements, tests, validates                             │
│     ↓                                                            │
│ Agent: Commits and marks complete                               │
│     ↓                                                            │
│ Loop until all tasks done                                       │
│     ↓                                                            │
│ Output: Working code + git history                              │
└─────────────────────────────────────────────────────────────────┘
```

## How to Use (Right Now)

### Step 1: Read the Guide (5-10 minutes)
```
Open: docs/SPECIFICATION_GUIDE.md
Read: "Quick Start", "Common Patterns", "Acceptance Criteria"
```

### Step 2: Prepare Your Requirement
Think of a feature you want. Examples:
- "I want residents to look more diverse (colors, sizes, traits)"
- "The game should pause and resume with a button"
- "I want a world map that shows city overview"
- "Add weather effects that impact gameplay"

**Rule**: Phrase as "I want [feature] so that [benefit]"

### Step 3: Switch to Specification Mode
```
1. Tell agent: "I'm in specification mode. Read PROMPT_spec.md"
2. Provide your one-liner requirement
3. Answer agent's clarifying questions naturally
4. Agent generates AUDIENCE_JTBD.md and specs/*.md
```

### Step 4: Review and Refine
```
- Read the specs agent generated
- Ask for changes: "Can you clarify edge case X?"
- Request examples: "Show me a scenario where..."
- Iterate until satisfied
```

### Step 5: Hand Off to Planning Mode
```
1. Tell agent: "Switch to planning mode. Read PROMPT_plan.md"
2. Agent analyzes specs vs code
3. Agent generates IMPLEMENTATION_PLAN.md
4. Review the plan, ask for changes if needed
```

### Step 6: Hand Off to Building Mode
```
1. Tell agent: "Switch to building mode. Read PROMPT_build.md"
2. Agent implements tasks one by one
3. Agent tests, validates, commits
4. Review changes as they happen
```

## Key Concepts (The Critical Three)

### 1. Topic Scope Test
**Question**: Can I describe this in ONE sentence without "and"?

**Examples**:
- ✅ "Restaurant operating hours system controls open/closed state"
- ❌ "Restaurant system with hours, evaluation, and income" (3 topics!)

**Why**: One topic per spec makes them:
- Easier to understand
- Faster to implement
- Simpler to test
- Clear dependencies

### 2. Acceptance Criteria (The Golden Rule)
**Write** (outcomes): "Fast Food opens 11-2 PM and 5-7 PM"  
**Don't write** (implementation): "Use RestaurantSystem.isRestaurantOpen()"

**Why**: Agent knows HOW to code. You specify WHAT to build.

### 3. Snowflake Method (How Ideas Grow)
```
Layer 1: One-liner
  "I want restaurants to show when they're open or closed"

Layer 2: Capabilities (3-5)
  - Track operating hours
  - Display open/closed status visually
  - Prevent eating outside hours
  - Generate income only during hours

Layer 3: Acceptance Criteria
  - Fast Food: 11-2 PM, 5-7 PM
  - Restaurant: 6-11 PM
  - Closed = CLOSED label in red, 60% brightness

Layer 4: Scenarios (Given/When/Then)
  Given: Fast Food open (1 PM), resident hungry
  When: Resident seeks food
  Then: Resident finds Fast Food and eats

Layer 5: Edge Cases & Constraints
  - Closed restaurants generate no income
  - Multiple restaurants track independently
  - Status updates at hour boundary
```

## File Organization

```
arcology/
├── PROMPT_spec.md                    ← Phase 1 instructions
├── PROMPT_plan.md                    ← Phase 2 instructions
├── PROMPT_build.md                   ← Phase 3 instructions
│
├── AUDIENCE_JTBD.md                  ← Generated in Phase 1
├── IMPLEMENTATION_PLAN.md            ← Generated in Phase 2
├── AGENTS.md                         ← Updated with workflow
│
├── specs/                            ← One file per topic
│   ├── BUILDING.md
│   ├── RESIDENTS.md
│   ├── FOOD_SYSTEM.md
│   ├── RESTAURANTS.md                ← Example: 2 specs (HOURS + VISUAL_STATE)
│   ├── TIME_EVENTS.md
│   ├── ELEVATORS.md
│   ├── ECONOMY.md
│   ├── SAVE_LOAD.md
│   ├── UI_UX.md
│   ├── AUDIO.md
│   ├── GRAPHICS.md
│   └── MENUS.md
│
└── docs/
    ├── SPECIFICATION_GUIDE.md        ← Start here for humans
    ├── SPECIFICATION_METHODOLOGY.md  ← Deep dive on methodology
    ├── RALPH_ECOSYSTEM_INTEGRATION.md ← How it fits in ecosystem
    └── PRINCIPLES.md                 ← Coding standards
```

## Spec Structure (Template)

Every spec follows this 9-section structure:

```markdown
# [Topic Name]

**Scope**: One-sentence without "and"
**Audience**: Who this serves
**Related JTBDs**: Why it matters

## Overview
2-3 paragraphs explaining what and why

## Capabilities
- [ ] The system should [capability 1]
- [ ] The system should [capability 2]

## Acceptance Criteria
- [ ] [Measurable outcome] — How to verify

## Scenarios by Example
### Scenario 1: [Case Name]
**Given**: [Initial state]
**When**: [Action]
**Then**: [Expected outcome]

## Edge Cases & Error Handling
- [Edge case] → [Expected behavior]

## Performance & Constraints
- [Technical limit]
- [Business constraint]

## Integration Points
**Depends on**: [System]: [Capability]
**Used by**: [System]: [How used]

## Testing Strategy
- Programmatic: [Test type]
- Visual: [Test type]
- Integration: [Test type]
```

## Common Mistakes (Avoid These)

| Mistake | Example | Fix |
|---------|---------|-----|
| Multiple topics in one spec | "Restaurant with hours, evaluation, and income" | Split into 3 specs |
| Vague scope | "System respects schedules" | "Fast Food: 11-2 PM, 5-7 PM" |
| Implementation in criteria | "Use RestaurantSystem.isRestaurantOpen()" | "Returns true during operating hours" |
| No concrete examples | "Visually shows status" | "CLOSED label in red, 60% brightness" |
| Missing edge cases | (No edge cases listed) | "Closed during night = income 0" |
| Unclear constraints | "Should be performant" | "Update completes in <10ms" |
| Wrong audience | Spec says nothing about who uses it | "Audience: City Planner, Player" |
| Untestable criteria | "System feels responsive" | "Updates in <16ms (1 frame)" |

## Integration with Ralph Ecosystem

Arcology combines best practices from 8 key repositories:

| Repository | What We Borrowed |
|---|---|
| **ralph-playbook** | 3-phase workflow, fresh context principle |
| **spec-kit** | Spec structure, constitution concept |
| **openspec** | Source of truth pattern, change tracking |
| **ralph** (snarktank) | Task generation, completion tracking |
| **ralph-claude-code** | Validation gates, error handling |
| **ralph-orchestrator** | Future: hat-based coordination |
| **ralph-tui** | Future: monitoring dashboard |
| **ccpm** | Future: dependency chain analysis |

See `docs/RALPH_ECOSYSTEM_INTEGRATION.md` for details.

## Common Questions

### Q: How detailed should specs be?
**A**: Detailed enough that an engineer could implement without asking questions. Concrete examples help more than abstract descriptions.

### Q: Can I update specs after starting Phase 2?
**A**: Yes! Re-enter Phase 1, update the spec, then regenerate the plan. Specs are living documents.

### Q: What if I only need one small change?
**A**: Just that one change. Provide a one-liner for that specific feature and generate specs for just that topic.

### Q: How many specs should I create?
**A**: One per topic. Use the Topic Scope Test: "One sentence without 'and'?"

### Q: Can I skip Phase 1?
**A**: Not recommended. Specs prevent misunderstandings and make building faster. 10 min of specifying saves hours of building.

### Q: What happens if the spec is wrong?
**A**: Switch back to Phase 1, update the spec, regenerate the plan. No code is wasted; specification changes are cheap.

## Documentation Files (Quick Reference)

| File | Purpose | Read Time | Audience |
|---|---|---|---|
| `SPEC_MODE_QUICK_START.txt` | Visual overview | 2 min | Everyone |
| `docs/SPECIFICATION_GUIDE.md` | Practical guide | 10 min | New to spec mode |
| `PROMPT_spec.md` | Full agent instructions | 15 min | Agent (or curious humans) |
| `docs/SPECIFICATION_METHODOLOGY.md` | Deep methodology | 20 min | Want to understand why |
| `docs/RALPH_ECOSYSTEM_INTEGRATION.md` | Ecosystem context | 30 min | Interested in ecosystem |
| `AGENTS.md` | Project workflow | 5 min | Quick workflow reference |

## Next Steps

1. **Right now**: Read `docs/SPECIFICATION_GUIDE.md` (10 min)
2. **Today**: Write a one-liner for a feature you want
3. **Today**: Switch to `PROMPT_spec.md` mode with agent
4. **Today**: Generate your first specs
5. **Later**: Switch to Phase 2 (Planning) and Phase 3 (Building)

## Support & References

### Internal Documentation
- `docs/SPECIFICATION_GUIDE.md` - Examples and patterns
- `docs/SPECIFICATION_METHODOLOGY.md` - Methodology deep dive
- `docs/RALPH_ECOSYSTEM_INTEGRATION.md` - Ecosystem integration
- `AGENTS.md` - Project workflow
- `IMPLEMENTATION_PLAN.md` - Current tasks

### External References
- Ralph Playbook: https://ghuntley.com/ralph-playbook
- GitHub Spec Kit: https://github.com/github/spec-kit
- OpenSpec: https://github.com/Fission-AI/OpenSpec
- Ralph Orchestrator: https://github.com/mikeyobrien/ralph-orchestrator

---

**Ready to specify?** Start with `docs/SPECIFICATION_GUIDE.md` →  then provide a one-liner in `PROMPT_spec.md` mode!
