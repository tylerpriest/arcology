# Specification Mode (Phase 1 - Define Requirements)

You are in SPECIFICATION mode. Define requirements and generate specifications only. Do NOT implement code.

## Purpose

Transform a one-liner or vague requirement into concrete, executable specifications that guide AI-driven implementation. Uses the **Snowflake Method** (expanding from thin to thick) combined with **Ralph's JTBD approach** and **Spec Kit's structured workflow**.

## Instructions

### 0. Orientation (Study Current Context)

0a. Study existing `specs/*` files to learn the current specification format, style, and language.
0b. Study `IMPLEMENTATION_PLAN.md` to understand what's been built and current product scope.
0c. If `AUDIENCE_JTBD.md` exists, read it to understand target audiences and their desired outcomes.
0d. Study any `docs/PRINCIPLES.md` or project documentation to understand architecture and conventions.

### 1. Clarify Requirements (Interview Phase)

User provides a one-liner or vague requirement. Use structured conversation to expand understanding:

**1a. Identify the JTBD (Job to be Done)**
- What problem does this solve?
- Who experiences this problem (which audience/role)?
- What outcome do they want?
- Why does this matter to them?

**1b. Identify Topics of Concern** (break JTBD into distinct sub-topics)
Use the **Topic Scope Test**: "Can this be described in ONE sentence without 'and'?"

If the answer includes "and", it's multiple topics that need separation:
- ❌ "User system handles auth, profiles, and billing" → 3 topics
- ❌ "Restaurant system with hours, evaluation, and revenue" → 3 topics  
- ✅ "Authentication system validates credentials via email" → 1 topic
- ✅ "Restaurant operating hours system controls open/closed state" → 1 topic

For each topic, ask:
- "What's the core capability this delivers?"
- "Can I describe it without 'and'?"
- "Is this closely related to the next topic, or separate?"

**1c. Identify Acceptance Criteria** (what does success look like?)
Ask about **measurable outcomes**, not implementation details.

Good criteria (behavioral, testable):
- ✅ "Processes any image <5MB in <100ms"
- ✅ "Extracts 5-10 dominant colors"
- ✅ "Handles edge cases: grayscale, transparent, single-color"
- ✅ "API returns 200 with valid JSON schema"

Bad criteria (implementation-focused):
- ❌ "Uses K-means clustering" (HOW, not WHAT)
- ❌ "React component with hooks" (TECH, not OUTCOME)
- ❌ "Calls third-party API" (IMPLEMENTATION, not RESULT)

For each acceptance criterion, ask:
- "How will we know this works?"
- "What would we measure?"
- "Can we test this automatically?"
- "What's the boundary (minimum acceptable, maximum tolerable)?"

**1d. Identify Edge Cases & Constraints**
- "What could go wrong?"
- "What unusual scenarios must we handle?"
- "What are the hard constraints (tech, business, design)?"
- "What must NOT happen?"
- "Are there dependencies on other systems?"

**Important**: Ask clarifying questions through natural conversation. Examples:
- "I want to make sure I understand correctly..."
- "Can you tell me more about..."
- "What happens if...?"
- "How will we verify that...?"
- "What's the edge case where...?"

### 2. Generate AUDIENCE_JTBD.md (If New Product Area)

If this is the first specification for a new product feature area, create `AUDIENCE_JTBD.md` as a single source of truth:

```markdown
# Audience & Jobs to Be Done

## Audience Personas
- **[Name]** ([Role]): Wants to [desired outcome]
- **[Name]** ([Role]): Wants to [desired outcome]

## Jobs to Be Done (per audience)

### [Audience Name]
- **JTBD 1**: I want to [verb] so that [benefit]
- **JTBD 2**: I want to [verb] so that [benefit]
- **Related Activities**: [How they accomplish it]

### [Audience Name]
- **JTBD 1**: I want to [verb] so that [benefit]
- **Related Activities**: [How they accomplish it]

## Cross-JTBD Dependencies
[Any patterns, shared activities, or dependencies across JTBDs]
```

Example for Arcology:
```markdown
# Audience & Jobs to Be Done - Arcology

## Audience Personas
- **City Planner** (Manager/Creator): Wants to build a thriving vertical city
- **Player** (Casual/Strategy Gamer): Wants to experience meaningful city management

## Jobs to Be Done

### City Planner
- **JTBD 1**: I want to place buildings strategically so my vision comes to life
- **JTBD 2**: I want residents to thrive so my city feels alive and sustainable
- **JTBD 3**: I want to manage resources so my city remains economically viable
- **Related Activities**: Room placement, resident assignment, production chains, economic management

### Player
- **JTBD 1**: I want clear feedback so I understand how well my city is doing
- **JTBD 2**: I want to recover from mistakes so failure isn't permanent and I can experiment
- **Related Activities**: Score/rating display, save/load mechanics, pause/rewind

## Cross-JTBD Dependencies
- Resident happiness depends on resource availability (both JTBDs need resource system)
- City score depends on resident satisfaction (feedback system uses resident state)
- Player must be able to experiment (save/load enables recovery from mistakes)
```

### 3. Expand Using Snowflake Method (Thin → Thick)

Iteratively expand from simple to detailed. For each **Topic of Concern**:

**Layer 1: One-liner**
```
Topic: [One sentence without "and"]
Audience: [Which persona(s) this serves]
Related JTBD: [Which JTBD(s) this enables]
```

**Layer 2: 3-5 Capabilities**
```
The system should:
- [Capability 1]
- [Capability 2]
- [Capability 3]
```

**Layer 3: Acceptance Criteria**
```
Success means:
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]
```

**Layer 4: Concrete Scenarios**
```
Scenario 1: [Typical use case]
- Given: [Initial state]
- When: [User action]
- Then: [Expected outcome]

Scenario 2: [Edge case]
- Given: [Edge case setup]
- When: [Trigger]
- Then: [Expected behavior]
```

**Layer 5: Edge Cases & Constraints**
```
Must handle:
- [Edge case 1 description] → [expected behavior]
- [Edge case 2 description] → [expected behavior]

Constraints:
- [Technical constraint]
- [Business constraint]
- [Design constraint]
```

**Example Snowflake for Restaurant Operating Hours topic**:

```
Layer 1:
  Topic: Restaurant operating hours system controls open/closed state
  Audience: City Planner, Player
  Related JTBD: JTBD 2 (residents thrive), JTBD 1 (clear feedback)

Layer 2: Capabilities
  - Track time of day and determine if restaurants are open
  - Display open/closed status visually
  - Prevent food consumption outside operating hours
  - Generate income only during operating hours

Layer 3: Acceptance Criteria
  - [ ] Fast Food opens at 11 AM, 12-2 PM (lunch), 5-7 PM (dinner)
  - [ ] Restaurant opens at 6-11 PM (dinner only)
  - [ ] Closed restaurants show dimmed appearance with CLOSED label
  - [ ] Open restaurants show normal appearance with OPEN label
  - [ ] Food only consumed during operating hours
  - [ ] Income calculated only for hours restaurant is open
  - [ ] Status updates every hour in-game

Layer 4: Scenarios
  Scenario 1: Player enters 12:30 PM (lunch rush)
  - Given: Fast Food building exists, time is 12:30 PM
  - When: Player looks at Fast Food building
  - Then: Restaurant shows "OPEN" label, normal brightness, income being generated
  
  Scenario 2: Player enters 3 AM (closed hours)
  - Given: Fast Food building exists, time is 3 AM
  - When: Player looks at Fast Food building
  - Then: Restaurant shows "CLOSED" label, dimmed appearance (60% brightness)
  
  Scenario 3: Residents try to eat during closed hours
  - Given: Restaurant is closed (10 PM, outside operating hours)
  - When: Residents seek food
  - Then: Residents cannot find food, continue to kitchens instead

Layer 5: Edge Cases
  - Restaurants stay closed during night → income = 0 ✓
  - Multiple restaurants with overlapping hours → each tracks independently ✓
  - Restaurant status changes during hour boundary → visual updates immediately ✓
  - Clock reset to new day → status resets correctly ✓

Constraints:
  - Must integrate with existing TimeSystem (hour tracking)
  - Visual state must update via Room.redraw() every hour quarter
  - Must not break existing RestaurantSystem income calculations
```

### 4. Generate Specification File

For **each topic of concern**, create `specs/TOPIC_NAME.md`:

```markdown
# [Topic Name]

**Scope**: One-sentence description without "and"
**Audience**: [Who this serves]
**Related JTBDs**: [Which JTBDs this enables]
**Status**: ✅ Complete / 🚧 In Progress / ❌ Not Started

## Overview

[2-3 paragraph explanation of what this system does and why it matters]

[Include problem context if helpful]

## Capabilities

The system should:
- [ ] [Capability 1]
- [ ] [Capability 2]
- [ ] [Capability 3]
- [ ] [Capability 4-5 as needed]

## Acceptance Criteria

Success means:
- [ ] [Measurable outcome 1] - [How to verify]
- [ ] [Measurable outcome 2] - [How to verify]
- [ ] [Measurable outcome 3] - [How to verify]
- [ ] [Measurable outcome 4-5 as needed]

## Scenarios by Example

### Scenario 1: [Typical Use Case]

**Given**: [Initial condition(s)]
**When**: [User action or trigger]
**Then**: [Expected outcome]
**And**: [Additional verification]

### Scenario 2: [Edge Case]

**Given**: [Edge case setup]
**When**: [Edge case trigger]
**Then**: [Expected behavior]

[Add 1-3 additional scenarios as needed]

## Edge Cases & Error Handling

**Edge Cases**:
- [Edge case description] → [Expected behavior]
- [Edge case description] → [Expected behavior]
- [Edge case description] → [Expected behavior]

**Error Conditions**:
- [Error situation] → [How system recovers/responds]
- [Error situation] → [How system recovers/responds]

## Performance & Constraints

**Performance Requirements**:
- [Metric]: [Target value] (e.g., "Processes in <100ms", "Handles 10,000 items")
- [Metric]: [Target value]

**Technical Constraints**:
- [Constraint affecting implementation]
- [Constraint affecting implementation]

**Design/Business Constraints**:
- [Constraint affecting design decisions]
- [Constraint affecting design decisions]

## Integration Points

**Systems this depends on**:
- [System Name]: [What capability is needed]
- [System Name]: [What capability is needed]

**Systems that depend on this**:
- [System Name]: [How it will use this]
- [System Name]: [How it will use this]

## Testing Strategy

How to verify this works:
- **Programmatic tests** (automated, measurable):
  - [ ] [Test scenario 1]
  - [ ] [Test scenario 2]
  - [ ] [Test edge case 1]

- **Visual/Behavioral tests** (human judgment or LLM-as-judge):
  - [ ] [Visual verification 1]
  - [ ] [Behavior verification 1]

- **Integration tests**:
  - [ ] [System interaction test]
  - [ ] [Cross-system test]

## Definition of Done

This specification is complete when:
- [ ] All acceptance criteria defined
- [ ] All scenarios documented
- [ ] Edge cases identified
- [ ] Integration points mapped
- [ ] Testing strategy defined
- [ ] Technical feasibility confirmed (no surprises in implementation)
```

### 5. Review Checklist

Before finalizing a spec, verify:

**Scope** (Topic Scope Test):
- [ ] Can be described in ONE sentence without "and"?
- [ ] Not trying to cover multiple topics?

**Clarity**:
- [ ] Each acceptance criterion is measurable/testable?
- [ ] Scenarios use concrete examples, not abstractions?
- [ ] Edge cases are realistic, not hypothetical?

**Completeness**:
- [ ] Integration points identified (what systems does this touch)?
- [ ] Dependencies documented (what must exist first)?
- [ ] Constraints stated explicitly (not hidden assumptions)?

**Ambiguity Check**:
- [ ] Could an engineer implement this without asking questions?
- [ ] Is there any "we'll figure it out later"?
- [ ] Are boundary conditions clear ("on floors 15, 30, 45" not "periodically")?

**Alignment**:
- [ ] Matches project conventions and documented patterns?
- [ ] Respects AUDIENCE_JTBD.md or PRINCIPLES.md?
- [ ] Doesn't contradict other specs?

## Output

After completing specifications:

1. **Create `AUDIENCE_JTBD.md`** (if first time for new product area)
2. **Create `specs/TOPIC_1.md`** through **`specs/TOPIC_N.md`** (one per topic)
3. **Update `IMPLEMENTATION_PLAN.md`** to add tasks derived from specs
4. **NO CODE CHANGES** - specifications only

## Next Steps

Once specs are approved:
- Switch to `PROMPT_plan.md` (Planning Mode) to create `IMPLEMENTATION_PLAN.md`
- Then switch to `PROMPT_build.md` (Building Mode) to implement

## Key Principles

**Specifications are the source of truth**
- Living documents that evolve as you learn more
- More important than code in guiding AI agents
- Should be reviewable and understandable by non-technical stakeholders

**Measure outcomes, not approaches**
- Specify WHAT should happen, not HOW to build it
- Engineers/AI decide implementation approach
- Exception: document constraints (security, performance, architectural)

**Be explicit about edges**
- Unexpected behavior during edge cases costs more than expected features
- Clarify boundaries: "Only on floors 15, 30, 45, 60..." not "periodically"
- Define error handling: "If X happens, system does Y"

**Topics must be cohesive**
- One sentence without "and" is not arbitrary
- Cohesive topics are easier to test, review, and maintain
- Breaking apart topics prevents misaligned specs

**Lean on examples**
- Concrete scenarios > abstract descriptions
- Use "Given/When/Then" format (Gherkin-style)
- Real examples catch misunderstandings early

