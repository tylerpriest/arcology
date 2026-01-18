# Resident Ambitions & Stories

**Scope**: The ambitions system assigns unique, long-term goals to residents, transforming them from generic units into individuals with specific needs and "win states" that reward the player.
**Audience**: Player (Narrative/Sim)
**Related JTBDs**: JTBD 2 (Residents thrive/alive)
**Status**: ✅ Complete

## Overview

In a typical city builder, residents are consumers of resources. In Arcology, they should feel like the protagonists of their own cyberpunk stories. The Ambition System gives select residents (or all, if performant) a "Life Goal."

These goals act as micro-quests for the player. A resident might want to "Work in a Skylab" or "Eat at a 5-Star Restaurant" or "Accumulate 10,000 Credits." Helping residents achieve these goals rewards the player with "Influence" (a meta-currency or just high rating score) and prevents "Brain Drain" (high-level residents leaving).

## Capabilities

The system should:
- [ ] Assign a random **Ambition** to a resident upon arrival (or upon promotion).
- [ ] Track progress towards that ambition (e.g., "Savings: 500/1000").
- [ ] Trigger an **Ascension Event** when an ambition is fulfilled (Resident becomes "Elite", provides permanent city bonus, or retires happily).
- [ ] Display the ambition in the Resident Inspector UI.
- [ ] (Optional) Generate a short bio/story string based on the ambition.

## Acceptance Criteria

Success means:
- [ ] **Ambitions are assigned** - New residents have a non-null `ambition` field. - Verify: Inspect resident data.
- [ ] **Ambitions vary** - Different residents have different goals (Wealth, Housing Quality, Career). - Verify: Check 10 residents, see variety.
- [ ] **Progress is tracked** - If ambition is "Save 1000", and resident earns money, progress updates. - Verify: Progress bar increases.
- [ ] **Completion triggers reward** - When complete, player gets Notification + Reward (e.g., Reputation boost). - Verify: Event fires.
- [ ] **Failure is possible** - If resident leaves before completing ambition, it counts as "Unfulfilled". - Verify: Happiness penalty or neutral departure.

## Scenarios by Example

### Scenario 1: The Climber

**Given**: Resident "J. Silverhand" has Ambition: "Live in a Luxury Apartment".
**When**: Player builds a Luxury Apartment and zones it for Residential.
**Then**: J. Silverhand moves in (if rent allows).
**And**: Ambition marked "Complete".
**And**: J. Silverhand gains "Loyal" trait (Never leaves, pays +20% rent).

### Scenario 2: The Tycoon

**Given**: Resident "S. Arasaka" has Ambition: "Accumulate 5,000 Credits".
**When**: Resident works at high-paying Office job for 20 days.
**Then**: Savings hit 5,000.
**And**: Notification: "S. Arasaka has achieved their dream of wealth!"
**And**: Player receives +5 City Rating.

### Scenario 3: The Frustrated Artist

**Given**: Resident "V" has Ambition: "Visit a Cultural Center".
**When**: Player never builds a Cultural Center.
**Then**: V's happiness slowly decays despite having food/home.
**And**: V leaves the city: "This city has no soul."

## Edge Cases & Error Handling

**Edge Cases**:
- **Impossible Ambitions**: Resident wants to work at a factory, but no factories exist.
    - *Behavior*: Ambition remains 0%. Resident eventually leaves due to lack of fulfillment (soft fail).
- **Job Switching**: Resident changes jobs.
    - *Behavior*: Wealth ambitions continue; Career ambitions might reset or fail depending on type.

## Integration Points

**Systems this depends on**:
- **ResidentSystem**: Stores ambition data on agents.
- **EconomySystem/EmploymentSystem**: Provides the means (money/jobs) to fulfill ambitions.

**Systems that depend on this**:
- **SatisfactionSystem**: Ambition progress boosts happiness.

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `Resident` is initialized with an Ambition.
- [ ] `Resident.update()` checks ambition criteria (low frequency, e.g., daily).
- [ ] `Ambition.checkCompletion()` returns true when conditions met.

## Definition of Done

This specification is complete when:
- [ ] `Ambition` class/interface defined.
- [ ] 3-5 concrete Ambition types implemented (Wealth, Housing, Job).
- [ ] UI updated to show Ambition bar.
