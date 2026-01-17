# Failure Cascades & System Interdependencies

**Scope**: When one system fails, dependent systems degrade or fail, creating cascading crises that compound each other.

**Audience**: Systems Operator, Arcology Architect

**Related JTBDs**: JTBD 7 (systems fail realistically), JTBD 8 (deep simulation), JTBD 9 (emergent gameplay), JTBD 13 (respond to crises)

**Status**: 🚧 In Progress (Core to maintenance drama)

## Overview

Systems don't fail in isolation. They're interconnected:

- **Power failure** → Elevators stop → Residents trapped → Oxygen system loses backup → Water pumps stop
- **Oxygen failure** → Residents suffocating → Panic spreads → Morale crashes → Productivity drops
- **Food failure** → Residents starving → Health degrades → Morale crashes → Unrest
- **Water failure** → Disease spreads → Residents get sick → Demand for medical attention spikes

This creates cascading failures where one system's collapse triggers others. Cascades are:
- **Dramatic**: Creates intense moments where player must prioritize
- **Telegraphed**: Player sees early warnings (oxygen down to 50%, affecting system) before full failure
- **Emergent**: Cascades happen naturally from dependencies, not scripted events
- **Solvable**: Player can interrupt cascades by fixing root cause or critical dependent systems

This is the core mechanic that makes **maintenance feel critical**.

## System Dependencies Map

```
POWER SYSTEM (Critical Hub)
├── Powers: ELEVATORS, OXYGEN BACKUP, WATER PUMPS, LIGHTING
└── If power fails:
    ├── Elevators stop immediately (strands residents)
    ├── Oxygen backup disabled (oxygen levels drop faster)
    ├── Water stops flowing (disease spreads)
    └── Lighting fails (residents panic more)

OXYGEN SYSTEM
├── Provides: Clean air for residents
├── Depends on: Power (for scrubber operation)
└── If oxygen fails:
    ├── Residents suffocate over time
    ├── Health drops rapidly
    ├── Morale crashes (panic)
    └── Game over condition (total oxygen depletion)

FOOD SYSTEM
├── Provides: Meals for residents
├── Pipeline: Farm → Kitchen → Meals
└── If food fails:
    ├── Residents starve over time
    ├── Health drops
    ├── Morale crashes (hunger panic)
    └── Game over condition (starvation)

WATER SYSTEM
├── Provides: Drinking water, sanitation
├── Depends on: Power (for pumps)
└── If water fails:
    ├── Disease spreads
    ├── Resident health degrades
    ├── Medical demand spikes
    └── Secondary morale crash from sickness

ELEVATOR SYSTEM
├── Provides: Vertical transport
├── Depends on: Power
└── If elevators fail:
    ├── Residents must use stairs
    ├── Stair congestion increases massively
    ├── Movement times triple
    ├── Residents late to work (productivity down)
    └── Secondary: stress from crowding affects morale

MEDICAL SYSTEM (future)
├── Provides: Healthcare for sick residents
├── Depends on: Power, Water
└── If medical fails (understaffed or no power):
    ├── Sick residents get sicker
    ├── Deaths increase
    ├── Morale crashes (residents dying)
    └── Population loss
```

## Capabilities

The system should:
- [ ] Track dependencies between all critical systems
- [ ] Propagate health degradation when dependent system down (oxygen backup disabled if power down)
- [ ] Apply cascading penalties as failures compound (stranded residents + oxygen low + morale crash)
- [ ] Telegraphic warnings before cascade becomes critical (see oxygen dropping due to power loss before oxygen itself fails)
- [ ] Create decision points during cascades (fix power first? rescue stranded residents? supply emergency oxygen?)
- [ ] Calculate cascade severity (single failure = 3 points damage, cascade = 10+ points)
- [ ] Support partial mitigation (extend stairs while fixing elevator reduces impact)
- [ ] Display cascade visually (elevators stop, lights flicker, residents panic, text updates)
- [ ] Create emergent strategies (player learns: maintain power religiously, power failure is most dangerous)
- [ ] Enable player to interrupt cascades (fix root cause stops secondary failures)

## Acceptance Criteria

Success means:
- [ ] **Cascades are predictable** - Player understands dependencies, can predict cascade from power failure - Verify: player says "power down means elevators stop, oxygen backup fails"
- [ ] **Cascades are telegraphed** - Player sees warning signs before full cascade (oxygen system alert at 50%, before full failure) - Verify: UI alerts show "Oxygen backup disabled (power down)" before oxygen fails
- [ ] **Cascades create decision points** - Player must choose what to fix first during crisis - Verify: with power down, ask player: fix power? Extend stairs? Deploy emergency oxygen?
- [ ] **Root cause fixes work** - Fixing power restores elevators, oxygen backup, water immediately - Verify: restore power → elevators restart, oxygen stabilizes
- [ ] **Cascades are dramatic and visible** - Player sees consequences (elevators stop, residents trapped, panic) - Visual test: watch cascade unfold in UI and visually
- [ ] **Severity scales with cascade depth** - Single failure = manageable, 3-system cascade = crisis - Verify: measure morale impact, economic impact of cascade
- [ ] **Resident behavior reflects cascade** - Panic, crowds, deaths visible - Visual test: residents panicked, stairwell crowded, some dying
- [ ] **Multiple cascades possible** - Two unrelated systems can fail simultaneously, creating double crisis - Verify: oxygen + food both fail, create two separate cascades
- [ ] **Player can use partial solutions** - Extend stairs while fixing power reduces strandedness impact - Verify: stair congestion lower after extension during elevator failure

## Scenarios by Example

### Scenario 1: Power Failure Cascade (The Classic)

**Given**:
- Power system health: 30% (degraded but running)
- Oxygen backup: running (depends on power)
- Elevators: working normally
- Building: 10 floors, 120 residents

**When**: Player ignores power system for 70 more days (total 100 days neglect)

**Day 100**: Power system health reaches 0% → POWER FAILS

**Immediate Cascade** (within 1 game-minute):
- Elevators stop mid-transit
- 4 residents trapped in elevator (emergency lights on, panic)
- Lighting system fails (darkening effect, eerie)
- UI alert: "CRITICAL: POWER SYSTEM FAILURE"

**Secondary Cascade** (within 5 game-minutes):
- Oxygen backup disabled (depends on power)
- Oxygen output drops from 100% to 50% (relying on manual system only)
- UI alert: "WARNING: Oxygen backup disabled (power system down)"
- Residents notice: "Air feels thin"

**Tertiary Cascade** (within 10 game-minutes):
- Water pumps stopped
- Water output drops to 0%
- UI alert: "Water system offline"
- Residents get thirsty (morale penalty)

**Quaternary Cascade** (within 15 game-minutes):
- Stairwell overcrowding (residents stuck in elevators must use stairs)
- 20+ residents trying to use stairs simultaneously
- Congestion in stairwell: 100% (critical)
- Movement time through stairs: 10 seconds (vs. 2 normally)

**At Minute 20**:
- 4 residents in elevator calling for help
- 20 residents trapped in stairwell (panicked)
- Oxygen dropping (morale crashing from thin air)
- Water offline (residents thirsty and panicked)
- Building in full crisis state

**What player sees**:
- UI filled with red alerts
- Residents panicked (visual animation changes)
- Stairwell visibly crowded
- Text: "Residents trapped in stairwell!" "Oxygen levels critical!"
- This is the most dramatic moment possible

**Player's options** (must choose):
1. **Fix power immediately** ($6,000 emergency repair, 5-minute fix)
   - Restores elevators, oxygen backup, water pumps
   - Cascade stops, crisis over
   - Expensive but ends everything

2. **Deploy emergency oxygen** ($2,000, temporary)
   - Slows oxygen decline
   - Buys time while fixing other problems
   - Temporary solution (lasts 30 game-minutes)

3. **Extend stairs** ($1,500)
   - Reduces stairwell congestion
   - Helps residents escape elevator, reduces panic
   - Doesn't fix underlying problems

4. **Let it play out** (catastrophic)
   - Oxygen drops to critical
   - Residents suffocate
   - Game over (population death, cannot continue)

**Most players choose**: Fix power ($6,000) because it solves everything.

**Lesson learned**: "Power failure is the worst thing. I need to maintain power religiously."

### Scenario 2: Multiple Independent Cascades

**Given**:
- Player neglected multiple systems simultaneously
- Oxygen: 20% health
- Power: 25% health
- Food: 40% health

**When**: Oxygen fails first (hits 0%)

**Day 1 - Oxygen Cascade**:
- Oxygen failure → residents suffocating → UI alert "OXYGEN CRITICAL"
- Player emergency repairs oxygen ($4,000)
- Oxygen restored to 100%

**Day 2 - Power Fails** (while recovering from oxygen):
- Power system hits 0% → elevator stops → cascade begins
- Player dealing with oxygen, now facing power cascade too
- Can't fix both simultaneously with current budget
- This is double crisis

**Day 3 - Food Fails**:
- Food system hits 0% → residents starving
- Three simultaneous crises
- Each emergency repair: $4,000-8,000
- Total cost: $12,000-24,000 to fix all three
- Player's budget: $5,000
- **Game over** (cannot afford solutions, cascades kill residents)

**What happened**: Neglect of multiple systems created unsolvable cascade. This is failure state.

### Scenario 3: Cascade Interruption (Good Planning)

**Given**:
- Player noticed power at 50% health
- Performed maintenance ($3,000) → power restored to 100%

**When**: Other systems degrade normally but power maintained

**Then**:
- Oxygen might fail separately
- Food might fail separately
- But **power never fails**, so no power cascade
- Each system failure is isolated problem, solvable with $4,000 emergency repair
- Building survives, player wins

**Lesson**: "Maintaining power prevents the cascade that makes everything else worse."

### Scenario 4: Clever Mitigation During Cascade

**Given**:
- Power fails (cascade begins)
- Elevators stop, residents trapped/crowded in stairs
- Player's budget: $8,000

**Options**:
1. Emergency power repair: $6,000 → restores everything
2. Emergency stairs extension: $1,500 + emergency oxygen: $2,000 = $3,500 → mitigates elevator impact + oxygen impact
   - Doesn't fix power, but residents not dying/panicking as much
   - Lets player spread cost over 2-3 months

**Player chooses**: Stairs + oxygen ($3,500) now, power next month when income recovers

**Result**:
- Cascade partially mitigated
- Building survives through month
- Power restored next month
- Clever play rewarded

**Lesson**: "You don't always need to fix root cause immediately. Sometimes partial solutions buy time."

### Scenario 5: Cascading Health Degradation

**Given**:
- Power system health: 40% (degraded)
- Oxygen system health: 70% (normal)
- Because power is degraded, oxygen's backup system running at 50% efficiency
- Effectively: oxygen operating at 70% × 50% = 35% effective output

**When**: Player notices oxygen dropping faster than expected

**Then**:
- UI shows: "Oxygen output 35% (backup system degraded due to power issues)"
- This is telegraphic warning
- Tells player: "If I let power drop more, oxygen will fail"

**Player realizes**: Fix power to stabilize oxygen

**When**: Player fixes power ($3,000) → power back to 100%

**Then**:
- Oxygen backup system running at 100% again
- Oxygen output back to 70%
- Crisis averted

**Lesson**: "Systems depend on each other. Fixing one system helps others."

## Edge Cases & Error Handling

**Edge Cases**:
- **Cascade during emergency repair**: Power down while someone fixing it - Pause cascade during repair, resume after
- **Player emergency repairs multiple systems simultaneously**: Not possible (can only repair one at a time) - Queue repairs, execute in order
- **Cascading failures during disasters**: If water down + oxygen down + food down simultaneously - Each has separate cascade, player must prioritize
- **Cascade creates infinite loop** (fixing one triggers another): Design constraints prevent this, but if happens - Break loop after 2 cascades
- **Cascade kills all residents**: Game over state, player loses

**Error Conditions**:
- **Health calculation infinite loop**: Dependency cycle - Log error, cap at 3-system cascade
- **Cascade doesn't stop when root cause fixed**: Keep propagating incorrectly - Force recalculation
- **Cascade creates unintended consequences**: Cascades health wrong way - Log and correct

## Performance & Constraints

**Performance Requirements**:
- Cascade propagation calculation: <50ms (update all dependents when one fails)
- Cascade visual updates: smooth, <16ms per frame
- Handling 3-system cascade simultaneously: <100ms total calculation

**Technical Constraints**:
- Dependencies defined in MAINTENANCE_SYSTEM.md
- Cascade severity scales with depth (single = 1x, dual = 2.5x, triple = 5x)
- Each system has cascade timer (how long before cascade hits dependent system)
- Cascades logged for player understanding (UI can show: "Power down → Elevator fails")

**Design/Business Constraints**:
- Cascades must feel like natural consequence, not punishment
- Player must see warnings (not instant surprise)
- Cascades must create dramatic moments (core to experience)
- Cascades should teach systems thinking (maintenance matters)

## Integration Points

**Systems this depends on**:
- **MAINTENANCE_SYSTEM.md**: When systems fail, cascades trigger
- **OxygenSystem, PowerSystem, FoodSystem, WaterSystem**: Specific system failures
- **ResidentSystem**: Cascades affect residents (death, panic, morale)
- **ElevatorSystem**: Power failure affects elevator (cascade component)
- **TimeSystem**: Cascades unfold over time (telegraphed)

**Systems that depend on this**:
- **SatisfactionSystem**: Cascades affect morale dramatically
- **EconomySystem**: Cascades increase emergency repair costs
- **NotificationSystem**: Cascade alerts shown to player
- **SaveSystem**: Cascade state saved/restored

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Power failure disables dependent systems (elevator, oxygen backup, water)
- [ ] Oxygen backup health reduced when power degraded
- [ ] Cascade propagates in correct order (power → elevator, then oxygen)
- [ ] Root cause fix restores dependent systems
- [ ] Cascade severity increases with depth (3-system worse than 1-system)
- [ ] Multiple cascades track independently
- [ ] Cascade state persists in save/load

**Visual/Behavioral tests** (human observation):
- [ ] Power failure visibly stops elevators (no movement)
- [ ] Elevators stopping creates stairwell crowd (visible bunching)
- [ ] Cascade alerts appear in correct order (UI shows progression)
- [ ] Residents visibly panic during cascade (animation changes)
- [ ] Stairwell overflow during elevator failure (visual signal)
- [ ] Fixing power restores elevators immediately (cause → effect)
- [ ] Oxygen backup alert appears before oxygen fails
- [ ] Each cascade creates unique visual/behavioral pattern

**Integration tests**:
- [ ] Elevator failure increases stair congestion (timed walk-through)
- [ ] Power failure kills backup oxygen (measure oxygen output)
- [ ] Cascade alerts trigger notifications correctly
- [ ] Cascade emergency repairs cost 2x normal
- [ ] Cascade save/load preserves dependent states

## Cascade Timer Tables

**How long between primary failure and secondary failure** (telegraphic warning window):

| Primary | Secondary | Delay | Notes |
|---------|-----------|-------|-------|
| Power fail | Elevator stops | Immediate (0s) | Instant consequence |
| Power fail | Oxygen backup disabled | 1 minute | Player has time to notice |
| Power fail | Water offline | 3 minutes | Slower consequence |
| Oxygen fail (0%) | Resident suffocation | 5 minutes | Players have time to emergency repair |
| Food fail (0%) | Resident starvation | 10 minutes | Longer delay (slower process) |
| Water fail (0%) | Disease spreads | 15 minutes | Very slow, but real |
| Elevator fail + stairs full | Resident panic | 2 minutes | Happens when trapped |

These delays create telegraphing window for player to respond.

## Cascade Severity Scores (Proposal)

**Single System Failure**:
- Power down: 3 severity points
- Oxygen down: 2 severity points
- Food down: 2 severity points
- Water down: 1 severity point

**Cascade Multipliers**:
- 1-system cascade: 1x multiplier
- 2-system cascade: 2.5x multiplier (compounding effect)
- 3-system cascade: 5x multiplier (critical, game-threatening)

**Example**:
- Power fails alone: 3 points → recoverable
- Power fails + oxygen backup disabled: 3×2.5 = 7.5 points → serious crisis
- Power + oxygen + food all fail: ~10 points × 5 = 50 points → game over territory

---

## Definition of Done

This specification is complete when:
- [ ] All system dependencies mapped
- [ ] Cascade triggers defined for each relationship
- [ ] Telegraph timing defined (warning window before cascade hits)
- [ ] Cascade severity scores assigned
- [ ] Root cause fixes interrupt cascades
- [ ] Multiple cascades can happen simultaneously
- [ ] Visual/behavioral feedback designed
- [ ] Integration with each dependent system specified
- [ ] Testing strategy complete

## Next Steps (Planning Phase)

1. Define exact cascade timing for each relationship
2. Design UI alerts for cascade progression
3. Specify resident behavior during cascades (panic animations, morale crash)
4. Plan integration with each system (oxygen, power, food, water)
5. Design cascade history tracking (player can see "why did this happen")
6. Specify partial mitigation strategies (extend stairs during elevator failure, etc.)
