# Specification Mode Guide

A practical guide to using Arcology's Phase 1 specification workflow to turn ideas into executable requirements.

## Quick Start

When you have a feature idea or requirement:

1. **Provide a one-liner** to the agent in conversation
2. **Agent asks clarifying questions** (JTBD, topics, acceptance criteria, edge cases)
3. **Agent generates specs** in `specs/TOPIC_NAME.md`
4. **You review and refine** (ask for changes, request examples, clarify ambiguities)
5. **Hand off to Planning Mode** (agent creates IMPLEMENTATION_PLAN.md)
6. **Hand off to Building Mode** (agent implements code)

Example one-liner:
```
"I want restaurants to show when they're open or closed"
```

## The Specification Process

### Phase 1: Understand the Requirement

The agent will ask clarifying questions to understand:

1. **The JTBD (Job to be Done)** - What problem does this solve? Who has it?
2. **The Topics** - What distinct capabilities/components are needed?
3. **Success Criteria** - How will we know this works?
4. **Edge Cases** - What unusual scenarios must we handle?

You answer in natural conversation - don't worry about being too technical or too vague. The agent will help you refine until it's clear.

### Phase 2: Snowflake Expansion

The agent expands your requirement from thin (one-liner) to thick (detailed spec) using layers:

1. **Layer 1**: One-sentence topic
2. **Layer 2**: 3-5 core capabilities
3. **Layer 3**: Acceptance criteria (measurable outcomes)
4. **Layer 4**: Concrete scenarios (Given/When/Then examples)
5. **Layer 5**: Edge cases and constraints

You can ask the agent to expand specific layers or add more detail as needed.

### Phase 3: Spec Document Generation

The agent creates formal spec files in `specs/TOPIC_NAME.md` with:

- **Overview**: What this does and why it matters
- **Capabilities**: List of functions/features
- **Acceptance Criteria**: Measurable outcomes for success
- **Scenarios by Example**: Concrete use cases and edge cases
- **Constraints**: Technical, business, design limitations
- **Integration Points**: How this connects to other systems
- **Testing Strategy**: How to verify it works

### Phase 4: Review & Iterate

Review the spec and ask for changes:
- "Can you add a scenario where X happens?"
- "What if the user does Y instead?"
- "This constraint is unclear, can you elaborate?"
- "I need to see how this integrates with System Z"

The agent regenerates specs based on your feedback. Iterate until you're satisfied.

## Topic Scope Test (Critical!)

Each spec must describe **one topic of concern** that passes the Topic Scope Test:

**"Can I describe this in ONE sentence without 'and'?"**

If the answer is no, it's actually multiple topics:

❌ "Restaurant system with hours, evaluation, and income" → 3 topics
- Topic 1: Operating hours control (when open/closed)
- Topic 2: Evaluation scoring (quality assessment)
- Topic 3: Income calculation (revenue generation)

✅ "Restaurant operating hours system controls open/closed state"
- One sentence, one topic, clear scope

Why this matters:
- Each topic gets its own spec file
- Specs are easier to understand when focused
- Implementation tasks are clearer when scope is bounded
- Testing is simpler when not mixing concerns

## Common Patterns

### Scenario 1: New Feature Request

**You say**: "I want players to be able to pause and resume the game"

**Agent asks**:
- What happens to residents while paused? (Can they still eat/move?)
- Is pause instant or gradual?
- Can player save while paused?
- What's the UI for pause/resume?

**You answer**, then agent breaks into topics:
- Topic 1: Pause/resume state management (what pauses)
- Topic 2: Pause/resume UI (how to trigger)
- Topic 3: Game state during pause (what happens to residents, time, etc.)

Each gets a spec.

### Scenario 2: Visual/Polish Feature

**You say**: "I want residents to look more diverse"

**Agent asks**:
- How diverse? Different body shapes? Colors? Clothing?
- Should diversity be random or based on something (name, role)?
- How much does this affect game performance?
- Should diversity be visually consistent (same resident always looks same)?

**Topics might be**:
- Topic 1: Color palette system (visual distinction)
- Topic 2: Size variation (height/width differences)
- Topic 3: Traits system (display distinguishing characteristics)

### Scenario 3: System Integration

**You say**: "Residents should prefer certain restaurants based on quality"

**Agent asks**:
- How does quality affect preference? Hard rule or soft preference?
- How do residents discover preferences? First visit? Always?
- What if a high-quality restaurant is far away?
- Should reputation improve/degrade over time?

**Topics might be**:
- Topic 1: Restaurant evaluation scoring (measuring quality)
- Topic 2: Resident restaurant preference logic (choosing based on quality)
- Topic 3: Preference persistence (memory of good/bad experiences)

## Acceptance Criteria (Key Concept)

Acceptance criteria must be **measurable outcomes**, not implementation details:

**Good criteria** ✅ (What should happen):
- "Fast Food opens 11-2 PM and 5-7 PM"
- "Closed restaurants show CLOSED label in red"
- "Residents cannot eat when restaurant is closed"
- "Income only calculated during operating hours"

**Bad criteria** ❌ (How to build it):
- "Use RestaurantSystem.isRestaurantOpen()"
- "Add a statusLabel Text object"
- "Check time in the update() loop"
- "Reference operating hours from ROOM_SPECS"

Why? The agent knows the codebase and patterns. You specify the outcome; they figure out implementation.

## Edge Cases (Real Examples from Arcology)

These are actual edge cases the team discovered:

**Example 1: Building height limit and sky lobbies**
- Edge case: "What if player tries to build on floor 20?"
- Spec answer: "Error message, building not placed, refund not consumed"
- Edge case: "What if player builds floor 15 (sky lobby) after floor 16?"
- Spec answer: "Allow it, sky lobby retroactively serves upper floors, no destruction"

**Example 2: Restaurant closed hours and resident hunger**
- Edge case: "Resident is hungry at 3 AM when Fast Food is closed"
- Spec answer: "Resident seeks kitchen instead, or waits until morning"
- Edge case: "Restaurant closes while resident is inside eating"
- Spec answer: "Resident finishes meal, doesn't get interrupted"

**Example 3: Demolition and economic impact**
- Edge case: "Player demolishes office while residents are working"
- Spec answer: "Residents lose job, return to apartment, office income stops"
- Edge case: "Player demolishes restaurant mid-transaction"
- Spec answer: "Transaction completes or cancels gracefully"

## Spec Template Structure

Every spec follows this structure:

```markdown
# [Topic Name]

**Scope**: One sentence without "and"
**Audience**: Who this serves
**Related JTBDs**: Which high-level jobs this enables
**Status**: ✅ Complete / 🚧 In Progress / ❌ Not Started

## Overview
[2-3 paragraphs explaining what and why]

## Capabilities
- List of functions/features

## Acceptance Criteria
- Measurable outcomes for success

## Scenarios by Example
- Given/When/Then concrete examples

## Edge Cases & Error Handling
- What could go wrong and how to handle it

## Performance & Constraints
- Technical, business, design limitations

## Integration Points
- How this connects to other systems

## Testing Strategy
- How to verify it works
```

## Integration with Planning & Building

### After Specification

Once specs are complete:

1. **Switch to Planning Mode** (`PROMPT_plan.md`)
   - Agent reads specs
   - Agent compares specs to current code
   - Agent creates IMPLEMENTATION_PLAN.md with prioritized tasks
   - You review plan

2. **Switch to Building Mode** (`PROMPT_build.md`)
   - Agent implements tasks one by one
   - Agent runs tests after each change
   - Agent runs validation after implementation
   - You review changes and merge

The spec is the source of truth throughout. If implementation diverges from spec, you can:
- Ask agent to follow spec more closely, OR
- Update spec if you discover spec was wrong

## Avoiding Common Mistakes

❌ **Too vague**: "Make the game better"
✅ **Better**: "I want visual feedback when residents are unhappy"

❌ **Too prescriptive**: "Use observer pattern to notify UI of changes"
✅ **Better**: "UI should update within 1 frame (16ms) when resident satisfaction changes"

❌ **Multiple topics**: "Residents should eat, sleep, and work on schedules"
✅ **Better** (3 separate topics):
- Topic 1: Hunger system drives eating behavior
- Topic 2: Sleep system drives rest behavior
- Topic 3: Employment system drives work behavior

❌ **Missing edge cases**: "Restaurants should be open during lunch"
✅ **Better**: 
- "Fast Food: 11-2 PM (lunch), 5-7 PM (dinner)"
- "Restaurant: 6-11 PM (dinner only)"
- "Closed restaurants cannot serve residents, period"
- "Edge case: Resident inside when restaurant closes → finishes meal"

❌ **Unclear constraints**: "System should be fast"
✅ **Better**: "Restaurant status update must complete in <10ms to not stutter frame rate"

## Real Example: Restaurant Operating Hours Spec

### Input (One-liner)
```
"Restaurants should show when they're open or closed"
```

### Agent's Clarifying Questions
1. What time of day do restaurants operate?
2. Should closed restaurants still consume income? (No)
3. How should open vs closed look visually? (Different colors/brightness)
4. Can residents eat during closed hours? (No)
5. Should status update dynamically or on hour change? (Hour change)

### Your Answers
```
Fast Food: 11-2 PM lunch, 5-7 PM dinner
Restaurant: 6-11 PM dinner only

Visual:
- Open: normal brightness, "OPEN" label in cyan
- Closed: 60% brightness, "CLOSED" label in red

Residents:
- Cannot eat outside operating hours
- Must go to kitchen instead if hungry when closed

Income:
- Only accrues during operating hours
```

### Resulting Spec Topics
1. **Restaurant Operating Hours System** - Controls when restaurants are open
2. **Restaurant Visual State Display** - Shows open/closed status visually

### Example Spec Generated

```markdown
# Restaurant Operating Hours System

**Scope**: Restaurant operating hours control when buildings are open and accepting residents

## Acceptance Criteria
- [ ] Fast Food opens 11-2 PM and 5-7 PM
- [ ] Restaurant opens 6-11 PM
- [ ] Income only accrues during operating hours
- [ ] Residents cannot eat outside operating hours
- [ ] Status updates correctly at hour boundaries

## Scenarios by Example

### Scenario 1: Resident Eats During Operating Hours
**Given**: Fast Food is open (1 PM), resident hunger < 50
**When**: Resident seeks food
**Then**: Resident finds Fast Food and eats
**And**: Resident satisfaction increases

### Scenario 2: Resident Cannot Eat During Closed Hours
**Given**: Fast Food is closed (10 PM), resident hunger < 50
**When**: Resident seeks food
**Then**: Resident finds kitchen instead
**And**: Resident queues for kitchen food

## Edge Cases
- Restaurant closes during lunch → accurate hours (11-2, not 11-3)
- Multiple restaurants with different hours → each tracks independently
- Transition at hour boundary → visual updates immediately
- Closed restaurant → no income generated (0 CR)
```

## Tips for Success

1. **Be concrete, not abstract**
   - "Fast Food: 11-2 PM" not "During lunch"
   - "60% brightness when closed" not "Dimmed appearance"
   - "Cannot eat outside operating hours" not "Respects operating hours"

2. **Separate concerns**
   - Operating hours (when open) ≠ Visual state (how it looks)
   - Preference logic ≠ Pathfinding logic
   - Each gets its own topic/spec

3. **Think like a tester**
   - "How would I test this?"
   - "What could break?"
   - "What's the boundary condition?"

4. **Ask "Given/When/Then"**
   - Forces concrete scenarios
   - Prevents vague acceptance criteria
   - Makes testing obvious

5. **Iterate with the agent**
   - Specs aren't perfect on first try
   - "This edge case is unclear, can you clarify?"
   - "Can you add a scenario where...?"
   - Refresh until you're confident

## Ready to Specify?

Provide a one-liner requirement and I'll ask clarifying questions to build out complete specifications.

Example formats:
- "I want [feature] so that [benefit]"
- "I need [system] to [behavior]"
- "Players should [action] when [condition]"

Just one line is enough to start!

