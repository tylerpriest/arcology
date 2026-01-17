# Lobby Extension System

**Scope**: Player can extend lobby length to reduce congestion, with costs and benefits.

**Audience**: Arcology Architect

**Related JTBDs**: JTBD 2 (extend lobby to manage traffic), JTBD 3 (sustainable expansion planning), JTBD 5 (walking creates congestion need)

**Status**: 🚧 In Progress (New system for spatial problem-solving)

## Overview

The lobby is the main circulation hub where residents wait for elevators/stairs and move between floors. As the building gets taller and population grows, the lobby becomes congested.

Player can extend the lobby by increasing its width. Wider lobbies reduce congestion density, improving traffic flow and resident satisfaction. This is a core mechanic because:

- **Spatial problem-solving**: Player diagnoses congestion visually and solves it by redesigning space
- **Economic trade-off**: Lobby extension costs money that could go to expansion or maintenance
- **Sustainable growth**: Expanding lobby allows building to grow without economic collapse from congestion
- **Feedback loop**: Solves one iteration of congestion, but building gets bigger, congestion returns at larger scale

Unlike removal of rooms (permanent loss of space), lobby extension is pure architectural improvement.

## Capabilities

The system should:
- [ ] Allow player to increase lobby width in increments (1, 5, or 10 unit extensions)
- [ ] Calculate cost based on extension size ($100-500 per unit width added)
- [ ] Display cost preview before extension (player knows price)
- [ ] Execute extension instantly or with brief animation
- [ ] Recalculate congestion immediately after extension (residents benefit immediately)
- [ ] Update movement paths if resident mid-transit (reroute if beneficial)
- [ ] Limit maximum lobby width to avoid abuse (hard cap at 60 units)
- [ ] Restrict extensions based on available adjacent space (can't extend off map)
- [ ] Track historical lobby sizes (for analytics, showing growth over time)
- [ ] Support undo/demolition of extensions (refund 50% of cost, like other buildings)
- [ ] Create visual feedback when extension completes (brief animation, satisfying)

## Acceptance Criteria

Success means:
- [ ] **Lobby extension is affordable but significant** - Costs $500-5000 depending on size - Verify: player must choose between extension and 2-3 new apartments
- [ ] **Extension reduces congestion measurably** - 25% wider = ~25% less congestion - Verify: measure congestion before/after same resident load
- [ ] **Effect is immediate** - Residents experience reduced congestion next movement - Verify: watch resident post-extension move faster
- [ ] **Player understands purpose** - Can diagnose congestion and know extension fixes it - Verify: player can explain "lobby was congested, extended it, now better"
- [ ] **Extension is visible change** - Player sees wider lobby on screen - Visual test: compare lobby width before/after
- [ ] **Cost scales appropriately** - Larger extensions cost more but are cheaper per-unit - Verify: 10-unit extension costs less per-unit than 1-unit
- [ ] **Movement improves proportionally** - If congestion halved, movement time also ~halved - Verify: time lobby walk before/after with same resident count
- [ ] **Extensions don't break game** - Building functions normally with very wide lobby - Verify: 60-unit lobby works correctly, no bugs
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

### Scenario 2: Strategic Lobby Extension Before Crisis

**Given**:
- Lobby 20 units, building 8 floors, 80 residents
- Player planning major expansion (adding 2 new office buildings)
- Knows this will add ~30 more residents
- Current congestion: 50% (manageable)

**When**: Player forecasts that adding 30 residents will push congestion to 90%

**Then**:
- Player extends lobby by 15 units ($1,500)
- Lobby becomes 35 units
- After expansion, congestion only reaches 70% (vs. 90% without extension)
- Building remains functional

**And**:
- This is preventative maintenance of sorts
- Player demonstrates foresight
- Extension pays off during peak times

### Scenario 3: Cascading Extensions

**Given**:
- Building started at 20-unit lobby, now 8 years in
- Current lobby: 55 units (extended multiple times)
- Current congestion: 65% even at this size
- Population: 250 residents

**When**: Player at late game realizes lobby is at functional limit

**Then**:
- Can extend by 5 more units to reach 60-unit cap ($500)
- Congestion drops to 55%
- But future expansion is now limited by lobby width

**And**:
- Player realizes: can't expand much more without rethinking design
- Lesson: long-term planning matters
- Options: demolish some rooms to rebuild with larger lobby, or accept congestion

### Scenario 4: Extension Doesn't Solve Everything

**Given**:
- Stairwell is bottleneck (narrow)
- Congestion in stairwell: 80% (critical)
- Congestion in lobby: 40% (fine)

**When**: Player extends lobby thinking it will fix all congestion

**Then**:
- Lobby congestion drops to 25%
- But stairwell congestion still 80%
- Residents still delayed because bottleneck is stairs, not lobby

**And**:
- Player learns: extension only helps if lobby is bottleneck
- Realizes: need to widen stairs instead
- Lesson: must diagnose root cause, extension isn't universal fix

### Scenario 5: Economic Pressure on Extension

**Given**:
- Lobby 20 units, congestion 70%
- Player has $5,000 (tight budget)
- Extension would cost $2,000
- Oxygen system failing, emergency repair costs $3,000
- Food shortage, need to expand kitchen for $1,000

**When**: Player faces three simultaneous needs, budget crisis

**Then**:
- Can't do all three
- Choices:
  - Skip extension, pay oxygen ($3k) + kitchen ($1k) = $4k, leaves $1k buffer
  - Skip oxygen, pay extension ($2k) + kitchen ($1k) = $3k, but oxygen fails (residents die)
  - Skip kitchen, pay oxygen + extension, but residents starve

**And**:
- Player chooses: oxygen and kitchen (infrastructure critical)
- Accepts congestion as price for safety
- Lesson: extension competes with other investments
- Next month, after income recovery, extends lobby

## Edge Cases & Error Handling

**Edge Cases**:
- **Lobby at maximum (60 units)**: Button disabled, can't extend further
- **Insufficient funds**: Show "Not enough funds, need $X more" in build menu
- **No adjacent space**: Player trying to extend beyond map boundary - Show "No space to extend" message
- **Resident mid-transit through lobby during extension**: Reroute resident to new wider path (actually faster) or let them complete original path
- **Extension creates new room?**: No, extension is not a buildable room, pure space
- **Multiple extensions in same month**: Allowed (wealthy players can do this)
- **Extension refund**: 50% of original cost refunded if demolished ($1,000 extension → $500 refund)

**Error Conditions**:
- **Width calculation overflow**: Lobby somehow wider than map - Cap at map width, don't allow
- **Cost calculation wrong**: Log error, prevent extension
- **Congestion not recalculating**: Force immediate recalculation

## Performance & Constraints

**Performance Requirements**:
- Extension decision/execution <100ms (not frame-blocking)
- Pathfinding recalculation <50ms post-extension
- Movement re-simulation <100ms (residents moving faster immediately)

**Technical Constraints**:
- Must integrate with RESIDENT_MOVEMENT.md (pathfinding updates)
- Must integrate with CONGESTION_MECHANICS.md (congestion recalculation)
- Lobby dimensions stored in Building.lobbyWidth (trackable for history)
- Extension cost calculated by formula: $100 × units_added

**Design/Business Constraints**:
- Extension must feel like real spatial improvement (not just number change)
- Cost must be significant (meaningful choice, not trivial)
- Must scale sensibly (too cheap = no challenge, too expensive = inaccessible)
- Should be clear why congestion reduced (causality evident)

## Integration Points

**Systems this depends on**:
- **Building System**: Lobby width stored in Building.lobbyWidth
- **EconomySystem**: Extension costs money, deducted from balance
- **CONGESTION_MECHANICS.md**: Congestion recalculated based on new lobby width
- **RESIDENT_MOVEMENT.md**: Pathfinding updated post-extension
- **RESIDENT_SATISFACTION**: Congestion affects satisfaction, extension reduces satisfaction penalty

**Systems that depend on this**:
- **UI System**: Build menu shows lobby extension option
- **Save System**: Lobby dimensions saved/loaded
- **Analytics**: Track lobby extension history, growth over time

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Cost calculation correct ($100 × units)
- [ ] Extension deducted from balance
- [ ] Lobby width updated in Building object
- [ ] Congestion recalculates post-extension (30% reduction for 50% width increase)
- [ ] Pathfinding updates (shorter paths possible through wider lobby)
- [ ] Maximum width enforced (can't exceed 60 units)
- [ ] Refund calculation correct (50% of original cost)
- [ ] Extension limits enforced (can't extend beyond map)

**Visual/Behavioral tests** (human observation):
- [ ] Lobby visibly wider after extension (UI shows larger space)
- [ ] Residents move faster post-extension (clear improvement)
- [ ] Congestion UI updates immediately (shows new %, lower than before)
- [ ] Cost preview accurate (player knows price before confirming)
- [ ] Animation smooth when extension completes (satisfying visual)
- [ ] Resident pathfinding respects new space (take advantage of width)

**Integration tests**:
- [ ] Building functions normally with wide lobby (no bugs at 60 units)
- [ ] Movement speed actually improves (timed walk-through)
- [ ] Resident satisfaction improves post-extension (check mood deltas)
- [ ] Save/load preserves lobby width (load game, lobby same size)
- [ ] Cost impacts economy (balance decreases by correct amount)

## Definition of Done

This specification is complete when:
- [ ] Cost formula defined ($X per unit)
- [ ] Maximum width defined (hard cap)
- [ ] Congestion reduction formula specified (width increase → congestion decrease)
- [ ] Extension UI designed (how player selects extension size)
- [ ] Animation specified (how extension appears)
- [ ] Integration with pathfinding specified
- [ ] Integration with congestion specified
- [ ] Undo/demolition mechanics specified
- [ ] All edge cases handled

## Economic Balance Notes

Extension costs should create tension. Examples:

- **1-unit extension**: $100 (trivial, not challenging)
- **5-unit extension**: $500 (one small apartment cost)
- **10-unit extension**: $1,000 (two apartment cost, real choice)
- **15-unit extension**: $1,500 (one office cost, significant)
- **20-unit extension**: $2,000 (one restaurant cost, major investment)

Starting lobby is 20 units. Max is 60 units (one full extension per 5 units played).

## Next Steps (Planning Phase)

1. Define exact cost formula
2. Specify congestion improvement function (width increase → congestion % decrease)
3. Design UI for lobby extension selection
4. Plan animation for extension completion
5. Define undo/demolition mechanics for extensions
6. Create player tutorial moment (first congestion, suggest extension)
