# Investment & Loan Strategy

**Scope**: The investment system provides financial tools—specifically interest-bearing loans and demand-generating marketing campaigns—to allow players to trade future income for present growth or vice-versa.
**Audience**: Strategist
**Related JTBDs**: JTBD 3 (Manage resources/viability)
**Status**: ✅ Complete

## Overview

In the early game, capital is the primary bottleneck. In the late game, demand is the bottleneck. The Investment Strategy system solves both by giving the player levers to manipulate the flow of time and money.

**Loans** allow players to borrow against future earnings to solve immediate crises (e.g., "I need a Power Plant NOW but I'm broke") or to jumpstart expansion. However, interest payments drain daily profits, creating a risk-reward dynamic.

**Marketing Campaigns** allow players to spend surplus cash to artificially boost resident demand, filling vacancies faster than the natural rate allows. This is crucial for rapid expansion phases where building supply outstrips organic demand.

## Capabilities

The system should:
- [ ] **Loan System**:
    - [ ] Offer 3 tiers of loans (Small, Medium, Large).
    - [ ] Apply daily interest payments to the maintenance budget.
    - [ ] Allow principal repayment at any time.
- [ ] **Marketing System**:
    - [ ] Offer campaigns (e.g., "Social Media Blitz", "Off-World Ads").
    - [ ] boost resident spawn rates (Demand) for a fixed duration.
    - [ ] Cost a fixed upfront fee.
- [ ] **Bank UI**:
    - [ ] Show current active loans, interest rate, and total debt.
    - [ ] Show active marketing effects and remaining time.

## Acceptance Criteria

Success means:
- [ ] **Loans provide instant cash** - Taking a 10k loan adds 10k to balance immediately. - Verify: Balance updates.
- [ ] **Interest is deducted daily** - 10% interest on 10k loan = -1000/day. - Verify: Daily expenses include "Debt Service".
- [ ] **Principal must be repaid** - Repaying requires full 10k lump sum. - Verify: Balance decreases, interest payments stop.
- [ ] **Marketing boosts spawn rate** - "Ad Blitz" (+50% spawn rate) causes `ResidentSystem` to spawn residents more frequently. - Verify: Spawn interval decreases or check count increases.
- [ ] **Marketing expires** - After 7 days, the boost disappears. - Verify: Spawn rate returns to baseline.
- [ ] **Credit Limit** - Cannot take more than X loans at once. - Verify: Loan button disabled if at limit.

## Scenarios by Example

### Scenario 1: The Emergency Loan

**Given**: Player has 500 Credits and a Power Plant failure requires 2000 to replace (or build new). Power is out, residents are leaving.
**When**: Player takes "Emergency Loan" (5000 Credits, 20% interest).
**Then**: Balance becomes 5500.
**And**: Player builds Power Plant. Crisis averted.
**But**: Daily expenses increase by 1000/day.

### Scenario 2: Aggressive Expansion

**Given**: Player builds 50 empty apartments. Natural fill rate is 1 resident/day (too slow).
**When**: Player buys "Off-World Advertising" (Cost 2000, Duration 5 days).
**Then**: Spawn rate triples to 3 residents/day.
**And**: Apartments fill up in ~15 days instead of 50.
**And**: Revenue increases faster, offsetting the marketing cost.

### Scenario 3: The Debt Trap

**Given**: Player has 3 active loans. Interest payments > Income.
**When**: Midnight passes.
**Then**: Balance decreases (Net Loss).
**And**: Player cannot afford to repay principal.
**Result**: Player enters "Death Spiral" -> Bankruptcy (unless they sell assets).

## Edge Cases & Error Handling

**Edge Cases**:
- **Bankruptcy with Loan**: Can you take a loan while in bankruptcy warning?
    - *Behavior*: Yes, this is the intended "Hail Mary" move to save the game.
- **Overlapping Marketing**: Buying two campaigns at once.
    - *Behavior*: Effects stack (additively) or duration extends? (Simpler: Duration extends or slot system like "1 Active Campaign"). *Decision: Effects stack additively.*

## Integration Points

**Systems this depends on**:
- **EconomySystem**: Handles balance, transactions, and daily maintenance logic.
- **ResidentSystem**: Needs to accept a `spawnRateMultiplier`.

**Systems that depend on this**:
- **UIManager**: Bank/Finance tab.

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `EconomySystem.takeLoan()` increases balance and adds to `activeLoans`.
- [ ] `EconomySystem.update()` deducts interest for active loans.
- [ ] `EconomySystem.repayLoan()` removes loan and stops interest.
- [ ] `ResidentSystem.getSpawnRate()` reflects marketing multipliers.

## Definition of Done

This specification is complete when:
- [ ] Loan logic implemented in `EconomySystem`.
- [ ] Marketing logic implemented in `ResidentSystem` (spawn rate modifier).
- [ ] UI built for "Finance" screen.
