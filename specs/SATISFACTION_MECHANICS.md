# Satisfaction & Happiness System

**Scope**: The satisfaction system tracks the emotional state of residents based on their needs and environment, serving as the primary feedback loop for player performance and the driver of population growth/decline.
**Audience**: Player
**Related JTBDs**: JTBD 1 (Clear feedback), JTBD 2 (Residents thrive)
**Status**: ✅ Complete

## Overview

Satisfaction is the "score" of the simulation. It aggregates all the complex interactions—did they eat? Is their home nice? Is the elevator slow?—into a single, understandable metric.

High satisfaction drives immigration (growth) and revenue (rent upgrades). Low satisfaction drives emigration (death spiral). This system ensures that the player cannot simply "paint" a city; they must nurture it.

## Capabilities

The system should:
- [ ] Calculate **Individual Happiness** (0-100) for every resident.
- [ ] Aggregate **City Rating** (Average Happiness).
- [ ] Define **Factors**:
    - [ ] Basic Needs (Food, Sleep).
    - [ ] Environment (Noise, Beauty, Crowding).
    - [ ] Service Access (Medical, Retail).
- [ ] Drive **Migration**:
    - [ ] High happiness -> Increased spawn rate.
    - [ ] Low happiness -> Residents pack up and leave.
- [ ] Provide **Visual Feedback**: Icons/bubbles over heads for major changes (+/-).

## Acceptance Criteria

Success means:
- [ ] **Needs impact happiness** - Starving resident loses happiness daily. - Verify: Happiness decreases.
- [ ] **Environment impacts happiness** - Living next to a noisy factory reduces happiness. - Verify: "Noise" penalty applied.
- [ ] **HUD shows rating** - Top bar shows "Avg Happiness: 78%". - Verify: UI element matches data.
- [ ] **Unhappy residents leave** - If Happiness < 10% for X days, resident despawns (Move Out). - Verify: Population count drops.
- [ ] **Happy residents attract others** - Rating > 80% increases immigration rate. - Verify: Spawn rate up.

## Scenarios by Example

### Scenario 1: The Slumlord

**Given**: Player builds apartments next to heavy industry. No parks.
**When**: Residents move in.
**Then**: They gain "Noise Pollution" penalty (-10/day).
**And**: Happiness drops to 0.
**And**: They leave within a week.
**Result**: City becomes a ghost town.

### Scenario 2: The Utopia

**Given**: High-quality housing, abundant food, quick elevators.
**When**: Simulation runs.
**Then**: Happiness stabilizes at ~90%.
**And**: Immigration rate doubles.
**And**: Residents upgrade their apartments (paying more rent).

### Scenario 3: The Hunger Crisis

**Given**: Food supply chain fails.
**When**: Residents miss 3 consecutive meals.
**Then**: Happiness plummets (-20 per missed meal).
**And**: Angry icons appear over heads.
**And**: Riot risk increases (if implemented).

## Edge Cases & Error Handling

**Edge Cases**:
- **New Arrivals**: Start at 50% or 100%?
    - *Behavior*: Start at 75% (Optimistic). Give them a chance to settle.
- **Homelessness**: Resident has no bed.
    - *Behavior*: Massive daily penalty. Leaves very quickly.

## Integration Points

**Systems this depends on**:
- **ResidentSystem**: Stores happiness data.
- **NeedsSystem** (Food/Sleep): Inputs for calculation.

**Systems that depend on this**:
- **ResidentSystem** (Spawning/Despawning logic).
- **EconomySystem**: Rent prices might scale with happiness?

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `SatisfactionSystem.update()` modifies resident happiness based on need status.
- [ ] `Resident` triggers "MoveOut" event when happiness < threshold.

## Definition of Done

This specification is complete when:
- [ ] Happiness logic implemented.
- [ ] Factors defined and weighted.
- [ ] Migration logic connected to happiness.
- [ ] UI feedback added.
