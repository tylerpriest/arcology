# Specification Methodology - Arcology

A synthesis of modern spec-driven development approaches for AI-assisted code generation.

## Overview

Arcology uses a three-phase workflow combining **Ralph methodology**, **Spec Kit**, and **OpenSpec** patterns:

| Phase | Mode | Purpose | Output |
|-------|------|---------|--------|
| **Phase 1** | SPECIFICATION | Define requirements from one-liner | `AUDIENCE_JTBD.md` + `specs/*.md` |
| **Phase 2** | PLANNING | Analyze specs vs code, create tasks | `IMPLEMENTATION_PLAN.md` |
| **Phase 3** | BUILDING | Implement tasks, test, validate | Working code + git commits |

Each phase:
- ✅ Reads previous phase's output
- ✅ Performs specific analysis/work
- ✅ Generates specific artifacts
- ✅ Hands off to next phase
- ✅ Is replaceable/re-runnable

## Methodology Foundation

### Ralph Wiggum Technique (Geoffrey Huntley)

**Core idea**: Continuous iteration with fresh context, memory via git/files, and explicit backpressure.

**Key tenets**:
- **Fresh Context Is Reliability** — Each iteration clears context
- **The Plan Is Disposable** — Regeneration costs one loop
- **Disk Is State, Git Is Memory** — Files are the handoff mechanism
- **Backpressure Over Prescription** — Quality gates (tests, lint, type checks)
- **Let Ralph Ralph** — Sit on the loop, not in it

**Implementation** (snarktank/ralph, frankbria/ralph-claude-code):
- PRD (Product Requirements Document) → JSON tasks
- Each task small enough for one context window
- Task completion tracked in `prd.json`
- Learnings appended to `progress.txt`
- AGENTS.md updated with discovered patterns

### Spec-Driven Development (GitHub Spec Kit)

**Core idea**: Specifications are source of truth; implementation follows specs; specs evolve with project.

**Key elements**:
- **Constitution** — Non-negotiable project principles
- **Specification** — What to build (user experience, not tech stack)
- **Plan** — How to build it (architecture, constraints)
- **Tasks** — Decomposed work items
- **Implementation** — Code that follows specs

**Process**:
1. `/specify` → Define "what" and "why"
2. `/plan` → Design "how" (respecting constitution)
3. `/tasks` → Break into manageable chunks
4. `/implement` → Build one task at a time
5. Review specs if implementation diverges

### OpenSpec (Fission-AI)

**Core idea**: Separate source of truth (current specs) from proposals (change requests).

**Key structure**:
- `openspec/specs/` — Current truth (living documentation)
- `openspec/changes/FEATURE_NAME/` — Proposed updates (isolated changes)
  - `specs/` — Spec deltas (ADDED, MODIFIED, REMOVED)
  - `tasks.md` — Tasks for this change
  - Implementation → Archive → Merge back to specs

**Benefits**:
- **Brownfield-friendly** — Great for modifying existing behavior
- **Change tracking** — Proposals, tasks, deltas grouped by feature
- **Diff-aware** — Changes stay separate until archiving
- **Multi-spec updates** — Handle cross-spec changes cleanly

## Arcology's Approach (Synthesis)

### Phase 1: Specification (PROMPT_spec.md)

**Input**: One-liner requirement
**Process**: Snowflake expansion (thin → thick) + structured interview
**Output**: 
- `AUDIENCE_JTBD.md` (target audiences + desired outcomes)
- `specs/TOPIC_1.md` through `specs/TOPIC_N.md` (one per topic of concern)

**Key practices**:
- **Topic Scope Test**: "Can I describe this in ONE sentence without 'and'?"
- **Acceptance Criteria**: Measurable outcomes (WHAT), not implementation (HOW)
- **Scenarios by Example**: Concrete Given/When/Then cases
- **Edge Cases**: What could go wrong? How to handle?
- **Integration Points**: What systems touch this? What depends on it?

**Inspired by**:
- Ralph JTBD breakdown
- Spec Kit's constitution + spec model
- OpenSpec's delta/requirements structure
- GitHub Spec Workshop's "Three Amigos" approach

### Phase 2: Planning (PROMPT_plan.md)

**Input**: `specs/*` + existing code
**Process**: Gap analysis (specs vs implementation) + task prioritization
**Output**: `IMPLEMENTATION_PLAN.md` with ordered task list

**Key practices**:
- Study specs comprehensively
- Search codebase for existing implementations
- Compare specs to code, identify gaps
- Prioritize by dependency + value
- Add discovery notes during analysis

**Inspired by**:
- Ralph's task breakdown
- Spec Kit's validation gates
- OpenSpec's change tracking

### Phase 3: Building (PROMPT_build.md)

**Input**: `IMPLEMENTATION_PLAN.md`
**Process**: Implement task → test → validate → commit
**Output**: Working code + updated plan

**Key practices**:
- Pick highest priority incomplete task
- Implement completely (no placeholders)
- Run tests immediately
- Run validation (typecheck + lint + test)
- Update `IMPLEMENTATION_PLAN.md` with completions
- Commit only if validation passes

**Inspired by**:
- Ralph's fresh-context iteration
- Spec Kit's task-by-task building
- OpenSpec's archive pattern (mark complete)

## Topic Scope Test (Critical!)

The **Topic Scope Test** is the boundary condition for Phase 1:

**Question**: Can I describe this in ONE sentence without "and"?

If "and" appears, you have multiple topics:

❌ "Restaurant system with hours, evaluation, and income"
- Topic 1: Operating hours (when open/closed)
- Topic 2: Evaluation scoring (quality assessment)
- Topic 3: Income calculation (revenue generation)

✅ "Restaurant operating hours system controls open/closed state"
- One topic, clear scope, testable

**Why**:
- Specs are easier to understand when focused
- Implementation tasks are clearer when scope is bounded
- Testing is simpler when not mixing concerns
- Dependencies between topics are explicit (not hidden in one mega-spec)

## Spec Structure (Template)

Every spec follows this structure:

```markdown
# [Topic Name]

**Scope**: One-sentence without "and"
**Audience**: [Who benefits]
**Related JTBDs**: [Which high-level goals this enables]
**Status**: ✅ Complete / 🚧 In Progress / ❌ Not Started

## Overview
[Why this matters, what problem it solves, context]

## Capabilities
- The system should [do X]
- The system should [do Y]

## Acceptance Criteria
- [ ] [Measurable outcome 1] — How to verify
- [ ] [Measurable outcome 2] — How to verify

## Scenarios by Example
### Scenario 1: [Case Name]
**Given**: [Starting state]
**When**: [Action]
**Then**: [Expected outcome]

## Edge Cases & Error Handling
- [Edge case] → [Expected behavior]
- [Error condition] → [Recovery strategy]

## Performance & Constraints
- [Technical constraint]
- [Business constraint]
- [Design constraint]

## Integration Points
**Systems this depends on**: [System]: [Capability needed]
**Systems that depend on this**: [System]: [How used]

## Testing Strategy
- **Programmatic** (automated): [Test 1], [Test 2]
- **Visual** (human/LLM judgment): [Test 1]
- **Integration**: [Test 1], [Test 2]
```

## Acceptance Criteria (Best Practices)

**Write** ✅ (outcomes/results):
```
- [ ] Fast Food opens 11-2 PM and 5-7 PM lunch/dinner
- [ ] Restaurant opens 6 PM, closes 11 PM
- [ ] Income accrues only during operating hours
- [ ] Residents cannot eat outside operating hours
- [ ] Closed restaurants show CLOSED label in red
```

**Don't write** ❌ (implementation details):
```
- [ ] Use RestaurantSystem.isRestaurantOpen() ← HOW
- [ ] Check time in update() loop ← HOW
- [ ] Add statusLabel Text object ← HOW
```

**Why**: The agent knows how to code. You define outcomes; they implement.

## Integration: How Phases Connect

```
Phase 1 (Specification)
  ↓
User: "I want restaurants to show when they're open or closed"
  ↓
Agent: Asks clarifying questions
  ↓
Agent generates: AUDIENCE_JTBD.md + specs/*.md
  
Phase 2 (Planning)
  ↓
Agent reads: specs/* + existing code
  ↓
Agent: "Fast Food and Restaurant both implemented, but visual state missing"
  ↓
Agent generates: IMPLEMENTATION_PLAN.md with task list
  
Phase 3 (Building)
  ↓
Agent reads: IMPLEMENTATION_PLAN.md + specs/*
  ↓
Agent: Picks top task, implements, tests, validates
  ↓
Agent generates: Working code + git commits
  ↓
Agent marks task complete in IMPLEMENTATION_PLAN.md
```

## Key Differences from Traditional Development

| Traditional | Spec-Driven |
|-------------|------------|
| Code is source of truth | Specs are source of truth |
| Documentation added after | Specs drive implementation |
| Scope creep via chat | Scope bounded by specs |
| Unclear what "done" means | Acceptance criteria define "done" |
| Hard to validate completion | Specs enable automated validation |
| Technical decisions first | Understanding requirements first |

## When to Re-Enter Phase 1

**Situation**: You discover the spec was incomplete/wrong

**Solution**: 
1. Switch back to `PROMPT_spec.md` (Specification Mode)
2. Update the relevant `specs/*.md` file(s)
3. Switch back to `PROMPT_plan.md` (Planning Mode)
4. Agent regenerates plan based on updated specs
5. Continue building

**Example**:
```
Building: "The visual state update needs to handle edge case X"
Realize: Spec didn't mention edge case X
Fix: Add edge case to specs/TOPIC.md
Regenerate: Plan tasks updated
Continue: Building from new plan
```

## Recommended Reading Order

1. **Start here**: `docs/SPECIFICATION_GUIDE.md` (examples, patterns, tips)
2. **Reference**: `PROMPT_spec.md` (full instructions for agent)
3. **Deep dive**: `docs/SPECIFICATION_METHODOLOGY.md` (this file)
4. **For context**: Ralph Playbook (ghuntley.com/ralph)
5. **For comparison**: GitHub Spec Kit, OpenSpec, Ralph Orchestrator (see references)

## References & Further Reading

**Ralph Methodology**:
- Geoffrey Huntley's Ralph article: https://ghuntley.com/ralph/
- Ralph Playbook: https://github.com/ClaytonFarr/ralph-playbook
- snarktank/ralph: https://github.com/snarktank/ralph
- frankbria/ralph-claude-code: https://github.com/frankbria/ralph-claude-code
- mikeyobrien/ralph-orchestrator: https://github.com/mikeyobrien/ralph-orchestrator

**Spec-Driven Development**:
- GitHub Spec Kit: https://github.com/github/spec-kit
- OpenSpec: https://github.com/Fission-AI/OpenSpec
- GitHub Blog: Spec-driven development with AI

**Specification Techniques**:
- SPECIFICATION_WORKSHOP.md (frankbria/ralph-claude-code)
- Specification by Example (Gojko Adzic)
- Three Amigos Pattern (Agile Alliance)
- Given/When/Then (Gherkin format)

## Quick Start Checklist

- [ ] Read `SPECIFICATION_GUIDE.md`
- [ ] Understand Topic Scope Test
- [ ] Know spec structure (9 sections)
- [ ] Understand acceptance criteria (outcomes, not implementation)
- [ ] Have a one-liner requirement ready
- [ ] Enter Phase 1: Switch to `PROMPT_spec.md`

