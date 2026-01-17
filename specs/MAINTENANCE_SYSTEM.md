# Maintenance System

**Scope**: Systems (oxygen, power, food production, water) degrade over time without maintenance, eventually failing and requiring repair.

**Audience**: Systems Operator, Arcology Architect

**Related JTBDs**: JTBD 6 (maintain critical systems), JTBD 7 (systems fail realistically), JTBD 8 (agents maintain systems), JTBD 9 (cascading failures), JTBD 3 (budget trade-offs)

**Status**: 🚧 In Progress (Core to vision)

## Overview

Critical systems don't run forever. They degrade gradually:
- Oxygen scrubbers get clogged with Venus dust
- Power generators need fuel/coolant and wear out
- Food processing equipment accumulates waste
- Water systems get sediment and algae buildup

Without maintenance, systems eventually fail. Failure consequences are severe:
- **Oxygen failure**: Residents suffocate (game over)
- **Power failure**: Cascades to elevators, lighting, systems
- **Food failure**: Residents starve
- **Water failure**: Residents get sick

This creates tension: maintenance costs money competing with expansion, but neglect is catastrophic.

## Capabilities

The system should:
- [ ] Track degradation for each critical system over time
- [ ] Display system health status to player (100% → 0%)
- [ ] Calculate maintenance costs based on system and urgency
- [ ] Apply degradation penalties as systems decline (20% degraded oxygen = 20% less oxygen output)
- [ ] Trigger failures at health 0% (system completely breaks)
- [ ] Allow player to perform maintenance (full restore to 100%)
- [ ] Track maintenance history (when was last maintenance?)
- [ ] Warn player when systems approaching failure (health <20%, UI alert)
- [ ] Make failures dramatic and visible (oxygen dropping, power flickering, food shortage)
- [ ] Support emergency repairs at premium cost (2x normal cost, instant completion)
- [ ] Integrate with economy (maintenance budget competes with expansion)
- [ ] Support future cascading failure system (power failure affects dependent systems)

## Acceptance Criteria

Success means:
- [ ] **Degradation is predictable** - System health decreases by fixed % per day (e.g., 1% per day) - Verify: measure health at day 0 and day 30, should differ by ~30%
- [ ] **Maintenance restores fully** - Performing maintenance returns system to 100% health - Verify: perform maintenance, health = 100% after
- [ ] **Neglect has consequences** - Not maintaining for 30 days causes failure - Verify: don't maintain oxygen, by day 30 it fails
- [ ] **Failure affects gameplay** - Failed system impacts residents, economy - Verify: oxygen failure kills residents, reduces population
- [ ] **Warnings alert player** - System health <20% triggers UI alert - Verify: at 15% health, see warning notification
- [ ] **Emergency repairs available** - Pay 2x cost for instant repair instead of scheduling - Verify: emergency repair costs $4,000 (vs $2,000 normal), completes immediately
- [ ] **Multiple systems tracked independently** - Oxygen and power degrade separately - Verify: oxygen at 50%, power at 80% simultaneously
- [ ] **Maintenance schedule visible** - Player knows when each system was last maintained - Verify: UI shows "Oxygen last maintained 5 days ago"
- [ ] **Costs scale with urgency** - Emergency repair expensive, normal maintenance cheaper - Verify: normal $2,000, emergency $4,000

## Scenarios by Example

### Scenario 1: Preventative Maintenance (Good Planning)

**Given**:
- Oxygen system at 100% health
- Player scheduled maintenance every 20 days
- Day 1: Perform oxygen maintenance ($2,000)

**When**: Time advances to day 21

**Then**:
- Day 1-20: Oxygen degrades from 100% → 80% (1% per day)
- Day 20: UI alert appears "Oxygen system needs maintenance (health 80%)"
- Day 21: Player performs maintenance again ($2,000)
- Oxygen returns to 100%
- Cycle repeats

**And**:
- Oxygen never fails
- Residents always have clean air
- Residents happy, productivity normal
- Cost: $2,000 per 20 days ($100/day ongoing)

### Scenario 2: Reactive Maintenance (Crisis Response)

**Given**:
- Player ignores oxygen maintenance
- Oxygen at 100% on day 1

**When**: Time advances without player performing maintenance

**Then**:
- Day 1-20: Oxygen degrades 100% → 80% (1% per day)
- Day 20: UI alert "Oxygen system degraded (health 80%)" - Player ignores
- Day 21-30: Oxygen degrades 80% → 50%
- Day 30: UI alert "CRITICAL: Oxygen system failing (health 50%)" - Flashing red
- Day 31: UI alert "CRITICAL: Oxygen system FAILED" - Residents suffocating
- Player panics, performs emergency repair ($4,000, 2x cost, immediate)
- Oxygen restored to 100%

**And**:
- During days 1-31, oxygen output reduced (affecting food production, resident health)
- Days 1-30: Residents complain about "stuffy air"
- Day 30+: Residents panicked, satisfaction crashes
- Emergency repair costs $4,000 (vs $2,000 preventative)
- Player learned: prevention is cheaper than emergency

### Scenario 3: Multiple System Neglect (Cascading Crisis)

**Given**:
- Player focused on expansion, ignoring all maintenance
- Oxygen system health: 30%
- Power system health: 25%
- Food system health: 40%

**When**: Player attempts to ignore problems

**Then**:
- Day 1: "Oxygen degraded, needs maintenance" - Player ignores
- Day 2: "Power system degraded, needs maintenance" - Player ignores
- Day 3: Oxygen fails (health 0%) → oxygen output = 0% → residents suffocating
- Day 4: Player frantically repairing oxygen ($4,000 emergency)
- While fixing oxygen, power system continues degrading
- Day 5: Power fails → elevators stop → water pumps stop → cascading failures
- Day 6: Water system fails → residents get sick
- Day 7: Food system still critical (no power to process)
- Multiple crises simultaneously, each costing emergency repair ($4,000 each) = $12,000 total
- Player's cash flow devastated

**And**:
- Residents panicked, unhappy, some leaving
- Population drops
- Income drops
- Can't afford to fix remaining systems
- Spiral toward game over

### Scenario 4: Strategic Maintenance Prioritization

**Given**:
- Budget: $8,000/month
- Oxygen needs: $2,000 maintenance cost
- Power needs: $3,000 maintenance cost
- Food needs: $1,500 maintenance cost
- Total needed: $6,500
- But also need $3,000 for expansion

**When**: Player must choose priorities

**Then**:
- Can't do all (needs $9,500, only have $8,000)
- Choices:
  1. Maintain all systems, skip expansion ($6,500, leave $1,500 buffer)
  2. Maintain oxygen + power only, skip food ($5,000), skip expansion ($3,000 remaining)
  3. Maintain oxygen only + emergency defer others ($2,000), expand ($3,000), gamble others don't fail

**And**:
- Player realizes: maintenance competes with expansion
- Expansion required for income growth, but maintenance required for survival
- Creates tension: grow vs. maintain
- Different players make different choices

### Scenario 5: Recovery from Brink

**Given**:
- All systems very degraded (oxygen 15%, power 10%, food 20%)
- No emergency maintenance budget ($0 available)
- Monthly income: $15,000

**When**: Player salvages situation

**Then**:
- Month 1: Don't expand, spend all $15,000 on maintenance
  - Oxygen: full restore ($2,000) → 100%
  - Power: full restore ($3,000) → 100%
  - Food: full restore ($1,500) → 100%
  - Water: maintenance ($1,500) → 100%
  - Remaining: $7,000 (emergency buffer)
- Month 2: Systems stable, continue preventative maintenance
- Month 3: Can resume expansion (systems under control)

**And**:
- Player demonstrates long-term planning
- Accepts slow growth period to stabilize systems
- Shows maturity in player strategy

## Edge Cases & Error Handling

**Edge Cases**:
- **System health exactly at 0%**: Failure triggers, system breaks, output = 0%
- **Multiple systems failing simultaneously**: Each handles separately, cascades happen independently (power failure triggers dependent systems)
- **Maintenance performed at wrong time**: Always works (scheduled or emergency), updates health immediately
- **Player has no money for maintenance**: Can't perform maintenance, must wait for income or use emergency repair
- **System improved while degrading**: No (only maintenance or emergency repair improve health)
- **Health goes below 0%**: Cap at 0%, failure state triggered

**Error Conditions**:
- **Degradation calculation wrong**: Health doesn't decrease correctly - Log error, force recalculation
- **Maintenance doesn't restore**: Health not updated to 100% - Log error, refund player
- **System shows wrong health**: Display desync with actual health - Force refresh

## Performance & Constraints

**Performance Requirements**:
- Health calculation <1ms per system (update once per day only)
- Maintenance action <50ms (instant complete)
- Cascading failure propagation <100ms (when one system fails, update dependents)

**Technical Constraints**:
- Each critical system has health property (0-100%)
- Each system has degradation rate (% per day)
- Each system has maintenance cost
- Each system has emergency repair cost (2x normal)
- System failures integrated with dependent systems (power affects elevators, oxygen, water)

**Design/Business Constraints**:
- Maintenance must feel necessary, not tedious
- Degradation rates must be realistic (not instant, not absurdly slow)
- Emergency repairs available but expensive (creates choice: plan ahead or pay premium)
- Failure consequences must be serious (not ignorable)

## Integration Points

**Systems this depends on**:
- **EconomySystem**: Maintenance costs money, deducted from balance
- **TimeSystem**: Degradation calculated per in-game day
- **BuildingSystem**: System tracking linked to building/rooms
- **NotificationSystem**: Alerts when systems degrading/failing

**Systems that depend on this**:
- **FAILURE_CASCADES.md**: Power failure cascades to elevators, water, etc.
- **OxygenSystem**: Oxygen output depends on oxygen system health
- **PowerSystem**: Power output depends on power system health
- **FoodSystem**: Food production depends on food system health
- **ElevatorSystem**: Elevators require power (fail if power down)
- **ResidentSystem**: Residents affected by failed systems (die from oxygen/food failure)
- **SatisfactionSystem**: Poor system health affects morale (complaints about "stuffy air", etc.)

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Degradation rate consistent (1% per day for oxygen)
- [ ] Maintenance restores to 100%
- [ ] Failure triggers at health 0%
- [ ] Emergency repair costs 2x normal
- [ ] Multiple systems degrade independently
- [ ] Health logged to resident activity/analytics
- [ ] Alerts triggered at correct thresholds (<20%, failure)
- [ ] System health persists in save/load

**Visual/Behavioral tests** (human observation):
- [ ] Oxygen output visibly reduced as health decreases (residents notice air quality)
- [ ] Power flickers as system health drops (visual indicator)
- [ ] Food shortage as food system degrades (visible in food inventory)
- [ ] Failure is dramatic (system stops completely, residents panicked)
- [ ] Maintenance animation satisfying (system restored, health bar fills)
- [ ] Alerts are clear and urgent (red flashing for critical)
- [ ] Player understands degradation (can see health declining)

**Integration tests**:
- [ ] Maintenance cost deducted from balance (economy integration)
- [ ] Failed oxygen kills residents (resident integration)
- [ ] Failed power stops elevators (cascade integration)
- [ ] System health visible in UI (player awareness)
- [ ] Save/load preserves system health state

## Degradation Rates (Proposal)

Suggest baseline rates (tunable in implementation):

- **Oxygen system**: 1% per day → fails after 100 days of neglect
- **Power system**: 1.5% per day → fails after 67 days of neglect
- **Food system**: 0.5% per day → fails after 200 days of neglect (less critical, slower degradation)
- **Water system**: 0.8% per day → fails after 125 days of neglect

These create natural maintenance cadence: one system needs maintenance every 2-3 months, requiring ongoing budget.

## Maintenance Costs (Proposal)

Suggest baseline costs:

- **Oxygen maintenance**: $2,000 (normal), $4,000 (emergency)
- **Power maintenance**: $3,000 (normal), $6,000 (emergency)
- **Food system**: $1,500 (normal), $3,000 (emergency)
- **Water system**: $1,500 (normal), $3,000 (emergency)

Total preventative: ~$8,000/month at baseline population

This forces meaningful budget choices against expansion (~$2,000-10,000 per room).

## Definition of Done

This specification is complete when:
- [ ] Degradation rates specified for each system
- [ ] Maintenance cost defined (normal + emergency)
- [ ] Failure thresholds defined (0% health = failure)
- [ ] Alert thresholds defined (warn at 20%, fail at 0%)
- [ ] Integration with dependent systems specified
- [ ] Cascading failure behavior specified
- [ ] UI representation designed (health bars, alerts)
- [ ] Maintenance scheduling mechanics defined
- [ ] Emergency repair mechanics defined

## Next Steps (Planning Phase)

1. Specify degradation rates per system
2. Specify maintenance cost formula
3. Specify failure consequences per system
4. Specify cascade triggers (power failure → elevator failure, etc.)
5. Design maintenance UI (health display, scheduling, cost preview)
6. Plan integration with OxygenSystem, PowerSystem, FoodSystem
