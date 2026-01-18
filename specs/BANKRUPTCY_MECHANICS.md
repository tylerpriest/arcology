# Bankruptcy Mechanics

**Scope**: The bankruptcy system enforces economic failure states by tracking debt, providing a grace period for recovery, and triggering game over if financial solvency is not restored.
**Audience**: Player
**Related JTBDs**: JTBD 1 (Clear feedback), JTBD 2 (Recover from mistakes)
**Status**: ✅ Complete

## Overview

In Arcology, money is the lifeblood of the city. While running a deficit is a valid short-term strategy, running out of cash halts construction and, if prolonged, leads to total collapse. The Bankruptcy system ensures that economic management has real stakes.

Instead of an instant "Game Over" when funds hit zero, the system offers a "Grace Period" (e.g., 7 days) representing a line of credit or emergency loans. This gives players a chance to correct their mistakes—selling buildings, cutting costs, or raising taxes—creating tense, high-stakes gameplay moments. Failure to recover results in the corporation seizing the tower (Game Over).

## Capabilities

The system should:
- [ ] Allow the player's balance to go negative (Debt).
- [ ] Trigger a "Financial Warning" state when funds drop below zero.
- [ ] Display a "Bankruptcy Timer" (e.g., 7 Days remaining).
- [ ] Halt all new construction while in debt (Stop loss).
- [ ] End the game if the timer reaches zero while still in debt.
- [ ] Clear the timer if funds return to positive.
- [ ] (Optional) Apply interest on debt to make recovery harder over time.

## Acceptance Criteria

Success means:
- [ ] **Negative balance allowed** - Player can spend more than they have? (Usually no, but maintenance can push you under). *Correction*: Construction checks affordabilty, but *maintenance* triggers at midnight and can drive balance negative. - Verify: Balance becomes -500 after daily maintenance.
- [ ] **Warning triggers** - When Balance < 0, a red "Bankruptcy Imminent" warning appears. - Verify: UI element visible.
- [ ] **Timer counts down** - Each day at midnight, the countdown decreases. - Verify: 7 days -> 6 days.
- [ ] **Recovery resets timer** - If Balance > 0, warning disappears and timer resets to max. - Verify: Selling building to reach +100 clears state.
- [ ] **Construction halted** - Cannot build new modules while in debt. - Verify: Build menu disabled.
- [ ] **Game Over triggers** - If timer hits 0, Game Over screen appears. - Verify: Scene transition to GameOver.

## Scenarios by Example

### Scenario 1: The Midnight Drop

**Given**: Player has 100 Credits. Daily maintenance cost is 200.
**When**: Midnight passes (Day 10).
**Then**: Balance becomes -100.
**And**: "Bankruptcy Warning" appears with "7 Days Remaining".
**And**: Notification: "Warning: Funds negative. Construction halted."

### Scenario 2: The Recovery

**Given**: Player is in debt (-100), 5 days remaining.
**When**: Player demolishes a customized lobby (Refund: +500).
**Then**: Balance becomes +400.
**And**: Bankruptcy warning disappears.
**And**: Timer resets to 7 days (hidden).

### Scenario 3: The Collapse

**Given**: Player is in debt (-5000), 1 day remaining.
**When**: Midnight passes.
**Then**: Timer hits 0.
**And**: Game pauses.
**And**: "Game Over: Insolvency" screen appears.
**And**: Screen shows stats (Days survived, Peak population).

### Scenario 4: Flickering Solvency

**Given**: Player is oscillating between -10 and +10 credits.
**When**: Balance drops to -10 (Warning ON).
**Then**: Balance rises to +10 (Warning OFF).
**Then**: Balance drops to -10 again.
**Then**: Warning ON, Timer starts at full 7 days (Grace period resets to be forgiving, or remembers? *Decision: Resets to be forgiving/simple*).

## Edge Cases & Error Handling

**Edge Cases**:
- **Massive Debt**: Debt exceeds a certain threshold (e.g., -1,000,000).
    - *Behavior*: Immediate Game Over? Or just standard timer? (Standard timer is more consistent).
- **Game Load**: Loading a save where player was in debt.
    - *Behavior*: Timer must resume from saved state (e.g., 3 days left), not reset.

**Technical Constraints**:
- **Save System**: Must serialize `bankruptcyTimer` and `isInDebt` state.

## Integration Points

**Systems this depends on**:
- **EconomySystem**: Tracks balance and processes daily transactions.
- **TimeSystem**: Triggers daily updates.

**Systems that depend on this**:
- **BuildMenu**: Checks `isInDebt` to disable building.
- **UIManager**: Displays warning/timer.

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `EconomySystem` allows negative balance via maintenance.
- [ ] `EconomySystem` updates timer on daily tick if negative.
- [ ] `EconomySystem` triggers `GameOver` event when timer expires.
- [ ] `BuildMenu` checks `canBuild` which returns false if in debt.

**Visual tests**:
- [ ] Warning UI is prominent and alarming (red/flashing).
- [ ] Game Over screen displays correct reason.

## Definition of Done

This specification is complete when:
- [ ] Bankruptcy logic is added to `EconomySystem`.
- [ ] Warning UI is implemented.
- [ ] Game Over trigger is connected.
- [ ] Construction blocking logic is implemented.
