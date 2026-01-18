# Lobby Extension System

**Scope**: Player can extend lobby length to reduce congestion, with costs and benefits.

**Audience**: Arcology Architect

**Related JTBDs**: JTBD 2 (extend lobby to manage traffic), JTBD 3 (sustainable expansion planning), JTBD 5 (walking creates congestion need)

**Status**: ✅ Ready (Formulas and Mechanics Defined)

## Overview

The lobby is the main circulation hub where residents wait for elevators/stairs and move between floors. As the building gets taller and population grows, the lobby becomes congested.

Player can extend the lobby by increasing its width. Wider lobbies reduce congestion density, improving traffic flow and resident satisfaction. This is a core mechanic because:

- **Spatial problem-solving**: Player diagnoses congestion visually and solves it by redesigning space
- **Economic trade-off**: Lobby extension costs money that could go to expansion or maintenance
- **Sustainable growth**: Expanding lobby allows building to grow without economic collapse from congestion
- **Feedback loop**: Solves one iteration of congestion, but building gets bigger, congestion returns at larger scale

Unlike removal of rooms (permanent loss of space), lobby extension is pure architectural improvement.

## Formulas & Constants

### 1. Extension Cost
**Formula**:
`Cost = UnitsAdded * CostPerUnit`

**Constants**:
- **CostPerUnit**: $100 (Credits)
- **RefundRate**: 50% (on demolition/shrink)

**Examples**:
- Extend 5 units: $500
- Extend 10 units: $1,000

### 2. Physical Limits
- **Min Width**: 20 units (Starting size)
- **Max Width**: 80 units (Hard cap - limits max population flow)
- **Map Boundary**: Cannot extend beyond map width (100 units).

### 3. Congestion Impact
Extension increases `Capacity` in the Congestion Formula:
`NewCapacity = (CurrentWidth + ExtensionAmount) * 1.0`

**Example**:
- Current: 20 width (20 cap). 30 residents. C=1.5 (Red).
- Extend +20 units.
- New: 40 width (40 cap). 30 residents. C=0.75 (Yellow).

## Capabilities

The system should:
- [ ] Allow player to increase lobby width in increments (1, 5, or 10 unit extensions)
- [ ] Calculate cost based on extension size ($100 per unit)
- [ ] Display cost preview before extension (player knows price)
- [ ] Execute extension instantly or with brief animation
- [ ] Recalculate congestion immediately after extension (residents benefit immediately)
- [ ] Update movement paths if resident mid-transit (reroute if beneficial)
- [ ] Limit maximum lobby width to avoid abuse (hard cap at 80 units)
- [ ] Restrict extensions based on available adjacent space (can't extend off map)
- [ ] Track historical lobby sizes (for analytics, showing growth over time)
- [ ] Support undo/demolition of extensions (refund 50% of cost)
- [ ] Create visual feedback when extension completes (brief animation, satisfying)

## Acceptance Criteria

Success means:
- [ ] **Lobby extension is affordable but significant** - Costs $500-5000 depending on size - Verify: player must choose between extension and 2-3 new apartments
- [ ] **Extension reduces congestion measurably** - 25% wider = ~25% less congestion - Verify: measure congestion before/after same resident load
- [ ] **Effect is immediate** - Residents experience reduced congestion next movement - Verify: watch resident post-extension move faster
- [ ] **Player understands purpose** - Can diagnose congestion and know extension fixes it - Verify: player can explain "lobby was congested, extended it, now better"
- [ ] **Extension is visible change** - Player sees wider lobby on screen - Visual test: compare lobby width before/after
- [ ] **Cost scales appropriately** - Larger extensions cost more but are cheaper per-unit - Verify: 10-unit extension costs same per-unit ($100)
- [ ] **Movement improves proportionally** - If congestion halved, movement time also ~halved - Verify: time lobby walk before/after with same resident count
- [ ] **Extensions don't break game** - Building functions normally with very wide lobby - Verify: 80-unit lobby works correctly, no bugs
- [ ] **Extension is strategic choice** - Sometimes worth doing, sometimes not (trade-offs matter) - Verify: player sometimes chooses to extend, sometimes chooses not to

## Scenarios by Example

### Scenario 1: First Congestion Problem

**Given**:
- Lobby 20 units wide (starting size)
- Building has 5 floors, 50 residents
- Morning rush 8:00-9:00 AM: 20 residents trying to commute
- Congestion in lobby: 60% (high, noticeable delays)
- Residents complaining: "Crowded halls!"

**When**: Player observes congestion during morning rush

**Then**: 
- Player sees residents bunched in lobby
- UI shows: "Lobby congestion 60%"
- Player opens build menu, selects "Extend Lobby"
- Cost preview shows: "Extend by 10 units: $1,000"
- Player has $15,000 and just spent $2,000 on new apartment
- Decision point: Spend $1,000 on extension or save for next apartment?

**Decision: Player extends by 10 units** (wants to solve congestion)

**And**:
- Lobby becomes 30 units wide
- Animation: new space appears, lobby larger visually
- Congestion drops to 40% (immediately)
- Residents spread out
- Next day: residents arriving on time, less complaining
- Player satisfied: problem solved, $1,000 well spent

## Edge Cases & Error Handling

**Edge Cases**:
- **Lobby at maximum (80 units)**: Button disabled, can't extend further
- **Insufficient funds**: Show "Not enough funds, need $X more" in build menu
- **No adjacent space**: Player trying to extend beyond map boundary - Show "No space to extend" message
- **Resident mid-transit through lobby during extension**: Reroute resident to new wider path (actually faster) or let them complete original path
- **Multiple extensions in same month**: Allowed (wealthy players can do this)

**Error Conditions**:
- **Width calculation overflow**: Lobby somehow wider than map - Cap at map width.
- **Cost calculation wrong**: Log error, prevent extension.

## Integration Points

**Systems this depends on**:
- **Building System**: Lobby width stored in Building.lobbyWidth
- **EconomySystem**: Extension costs money, deducted from balance
- **CONGESTION_MECHANICS.md**: Congestion recalculated based on new lobby width
- **RESIDENT_MOVEMENT.md**: Pathfinding updated post-extension

**Systems that depend on this**:
- **UI System**: Build menu shows lobby extension option
- **Save System**: Lobby dimensions saved/loaded

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Cost calculation correct ($100 × units)
- [ ] Extension deducted from balance
- [ ] Lobby width updated in Building object
- [ ] Congestion recalculates post-extension (30% reduction for 50% width increase)
- [ ] Pathfinding updates (shorter paths possible through wider lobby)
- [ ] Maximum width enforced (can't exceed 80 units)

**Visual/Behavioral tests** (human observation):
- [ ] Lobby visibly wider after extension (UI shows larger space)
- [ ] Residents move faster post-extension (clear improvement)
- [ ] Congestion UI updates immediately (shows new %, lower than before)

## Definition of Done

This specification is complete when:
- [x] Cost formula defined ($100 per unit)
- [x] Maximum width defined (80 units)
- [x] Congestion reduction formula specified (width increase → congestion decrease)
- [ ] Extension UI designed (how player selects extension size)
- [ ] All edge cases handled