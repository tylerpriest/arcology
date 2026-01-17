# Power System

**Scope**: Power generation and distribution system that powers elevators, oxygen scrubbers, water pumps, and critical infrastructure; failure cascades to all dependent systems.

**Audience**: Systems Operator, Arcology Architect

**Related JTBDs**: JTBD 6 (maintain systems), JTBD 7 (failures critical), JTBD 9 (cascading failures)

**Status**: 🚧 In Progress (Critical infrastructure hub)

## Overview

The arcology requires constant power. Power runs:
- **Elevators**: Vertical transport
- **Oxygen scrubbers**: Air purification (backup system)
- **Water pumps**: Water distribution
- **Lighting**: Essential for residents
- **Medical systems**: Healthcare facilities
- **Food processing**: Kitchen equipment

Power generation on Venus:
- **Geothermal vents**: Drilling into Venus's hot crust provides heat
- **Fuel cells**: Convert heat/chemicals into electricity
- **Solar is useless**: Venus's atmosphere blocks sunlight

Power system degradation:
- Vents get clogged with mineral buildup
- Fuel cells corrode in harsh environment
- Thermal regulators fail from heat stress
- System requires constant maintenance

Power failure is the **most dangerous system failure** because:
- It cascades to oxygen (no scrubber backup)
- It cascades to water (pumps stop)
- It cascades to elevators (residents stranded)
- It creates stairwell disasters (overcrowding)

Player learns: **"Maintain power above all else."**

## Capabilities

The system should:
- [ ] Track power generation capacity (MW available)
- [ ] Track power demand from building systems (MW needed)
- [ ] Display power balance to player (surplus or deficit)
- [ ] Degrade power generation as power system health declines
- [ ] Apply brownout effects when demand > supply (systems run at reduced efficiency)
- [ ] Calculate power failures when health reaches 0%
- [ ] Cascade power failure to dependent systems (elevators, oxygen backup, water)
- [ ] Show power grid status (normal, stressed, failing, offline)
- [ ] Enable emergency power (battery backup, temporary)
- [ ] Display power grid visually (lighting effects, visual status)
- [ ] Track power history (player can see trends)

## Acceptance Criteria

Success means:
- [ ] **Power level always visible** - UI shows MW, bar shows % of capacity - Verify: UI displays "Power: 45 MW / 60 MW (75% capacity)"
- [ ] **Power health affects generation** - 50% health = 50% power output - Verify: measure power output at 100% health vs 50% health
- [ ] **Brownouts happen when power low** - Below 50% capacity, systems run slowly - Verify: elevators move slower when power 40% of capacity
- [ ] **Power failure cascades immediately** - When power reaches 0%, elevators stop, oxygen backup fails - Verify: power failure triggers cascade instantly
- [ ] **Maintenance restores power** - Fixing power system restores to 100% - Verify: maintain power, output restored to full
- [ ] **Residents notice blackouts** - When power fails, lights flicker, residents panicked - Verify: power fails, see lighting effect and resident panic animation
- [ ] **Emergency power available but temporary** - Battery backup 30 minutes, $3,000 cost - Verify: activate emergency power, lasts 30 minutes, then depletes
- [ ] **Power stress visible** - When power high demand, grid looks stressed - Verify: high load causes visual flickering/strain effects
- [ ] **Cascades cascade to oxygen** - Power failure immediately disables oxygen backup - Verify: power fails → oxygen backup notification appears immediately

## Scenarios by Example

### Scenario 1: Balanced Power (Well-Designed Building)

**Given**:
- Power generation capacity: 60 MW
- Power demand:
  - Elevators: 15 MW
  - Oxygen backup: 10 MW
  - Water pumps: 8 MW
  - Lighting: 5 MW
  - Food processing: 4 MW
  - Other systems: 8 MW
  - **Total demand: 50 MW**
- Power health: 100%

**When**: Normal building operation

**Then**:
- Power available: 60 MW
- Power used: 50 MW
- Surplus: 10 MW (16% buffer)
- Grid status: "Normal"
- All systems running at 100% efficiency

**And**:
- Residents experiencing normal elevator service
- Oxygen at 100%
- Water flowing normally
- Building operating smoothly
- No stress on power grid

### Scenario 2: Power Degradation (Preventable Crisis)

**Given**:
- Power health: 100% on day 1
- Player neglects maintenance for 60 days
- Degrading at 1.5% per day

**Day 1-30**: Slow degradation
- Power health: 100% → 55%
- Power capacity: 60 MW → 33 MW
- Power demand: still ~50 MW
- Result: **Deficit of 17 MW** (demand > supply)

**Day 30**: UI alert appears
- "Power system degraded to 55% health"
- Grid status changes: "Stressed" (orange)
- Elevators noticeably slower (brownout effect)
- Residents complaining about slow elevators

**Day 31-45**: Continued degradation
- Power health: 55% → 30%
- Power capacity: 33 MW → 18 MW
- Power demand: 50 MW
- Deficit: 32 MW (severely stressed)

**Day 45**: Critical alert
- "POWER SYSTEM CRITICAL (health 30%)"
- Grid status: "Critical" (red)
- Lights flickering
- Elevators moving very slowly (barely functioning)
- Residents frustrated

**Day 46-60**: Final degradation period
- Power health: 30% → 0% (approaching failure)
- Power capacity: 18 MW → 0 MW (if hits 0%)
- If player doesn't act soon...

**Day 61**: Player performs maintenance
- Power system health: 100% restored
- Power capacity: 60 MW restored
- Elevators immediately speed up
- Lights steady
- Grid status: "Normal"
- Crisis averted

**Lesson**: "Power degradation is gradual. Early signs are slow elevators. Don't ignore them."

### Scenario 3: Brownout Effects (Power Stress)

**Given**:
- Power capacity: 60 MW
- Power demand: 55 MW (very close to capacity)
- Power health: 100% but stressed

**When**: High-demand time (morning rush, many elevators in use)

**Then**:
- Demand spikes to 60 MW during rush
- Brief brownout: power insufficient
- Elevators run at 80% speed during brownout
- Lights flicker slightly
- Water pressure drops (reduced flow)

**Result**:
- Morning commute slightly slower
- Residents annoyed but okay
- No cascade (power didn't fail completely)

**After rush hour**: Demand drops back to 55 MW
- Power recovers
- Everything normal again

**Player learns**: "Building at capacity. Need more power generation or less demand."

**Options**:
1. Build another geothermal generator (future mechanic, expensive)
2. Reduce population (not viable)
3. Upgrade power system (future mechanic)
4. Accept brownouts during peak times (dangerous strategy)

### Scenario 4: Power Failure Cascade (The Ultimate Crisis)

**Given**:
- Power system health: 20% (degraded)
- Player ignores maintenance for 80+ days

**When**: Power system hits 0% health → POWER FAILS

**Immediately** (within 0 seconds):

Elevators fail:
- All elevators stop immediately
- 8 residents in elevators at that moment (stranded)
- Lighting in elevators goes to emergency backup (dim)
- Residents trapped (emergency call button activated)
- Panic spreads: "We're stuck!"

Lights flicker:
- Main lights go out momentarily
- Emergency lighting activates (dim, red)
- Entire arcology suddenly dark
- Residents shocked and frightened

UI alerts cascade:
- "CRITICAL: POWER SYSTEM FAILURE"
- "WARNING: Oxygen backup disabled (power down)"
- "WARNING: Water system offline (power down)"
- "ALERT: Residents stranded in elevators"

**Within 1 minute**:

Oxygen crisis:
- Oxygen scrubber stops (no power)
- Oxygen backup disabled (depends on power)
- Oxygen production: 0%
- Residents breathing air, oxygen levels dropping
- UI: "OXYGEN BACKUP DISABLED (power down)"
- Residents: "Air feels thin!"

Water crisis:
- Water pumps stop (no power)
- Water pressure drops to 0%
- Water system offline
- Residents can't shower/drink
- Potential disease outbreak soon

Stairwell disaster:
- All 8 stranded elevators = 32+ residents trying to exit
- Stairwells become primary transport
- Stairwell congestion spikes to 100%
- Residents crowding, stepping over each other
- Some residents panic and freeze

**Within 5 minutes**:

Morale crash:
- Residents trapped in elevators: extreme panic
- Residents in stairwell: crowded and frightened
- General population: "System is failing!"
- Morale crash: -30 points (critical)
- Some residents consider leaving

Oxygen critical:
- Oxygen level: 100% → 70% (already consumed 30%)
- Dropping fast without scrubber
- Residents: "We're suffocating!"
- Time pressure: only 10 minutes until critical

**Player's options** (must choose immediately):

1. **Emergency power repair** ($6,000, takes 5 minutes to complete)
   - Restores power immediately
   - Elevators come back online
   - Oxygen backup resumes
   - Water pumps restart
   - Solves everything but takes 5 minutes (oxygen reaches 50% during repair)

2. **Emergency oxygen supply** ($5,000, immediate)
   - Deploys temporary oxygen (30-minute reserve)
   - Doesn't fix power, but saves residents from suffocation
   - Oxygen stays stable while other systems fail

3. **Extend stairs** ($1,500, immediate)
   - Adds stairwell capacity
   - Reduces congestion in stairs
   - Doesn't help with oxygen or elevators, just mitigates crowding

4. **Deploy emergency power battery** ($3,000, immediate)
   - 10-minute emergency power (just lights, elevators at 50%)
   - Buys time while fixing power
   - Not permanent

5. **Combination approach** ($8,000+)
   - Emergency oxygen + extend stairs + battery
   - Maximum mitigation
   - Expensive but survivors safe

**Most common player choice**: Emergency power repair ($6,000) because it's single fix for everything

**Result of emergency power repair**:
- Minute 0: Power fails
- Minute 0-5: Crisis, oxygen dropping
- Minute 5: Power restored
- Elevators restart
- Oxygen backup online
- Water pumps restart
- Residents safe (oxygen at 50%, but recovering)
- 8 stranded residents rescued
- Stairwell clears

**Cost**: $6,000 emergency repair
**Consequence**: Player's budget severely impacted, can't expand for a month
**Lesson**: "Never let power fail. It cascades to everything. Maintain power above all else."

### Scenario 5: Strategic Brownout (Player Decision)

**Given**:
- Power capacity: 50 MW
- Power demand: 55 MW (over capacity)
- Player budget: $10,000

**Situation**:
- Can't afford full power system upgrade ($15,000)
- Can't afford emergency power backup ($3,000)
- Must choose between:
  1. Do nothing (accept brownouts)
  2. Reduce demand (demolish some systems)
  3. Temporary fix (emergency power battery for critical periods)

**Player decides**: Accept brownouts during peak hours

**Result**:
- Morning rush (8-9 AM): Elevators run at 80% speed, lights flicker
- Residents slightly annoyed (-2 morale during rush)
- Rest of day: normal (demand below 55 MW)
- No cascade risk (not hitting 0%)

**Risk**: If power health degrades while in brownout state, could cascade
**Reward**: Save $3,000, use for other priorities

**Lesson**: "Can trade slight inefficiency for budget savings, but it's risky."

## Edge Cases & Error Handling

**Edge Cases**:
- **Power at exactly 0%**: Failure triggers, cascade begins
- **Power below 0%**: Capped at 0%, failure triggered
- **Demand > capacity (brownout)**: Systems run at reduced efficiency, no cascade
- **Emergency power deployed during cascade**: Stops elevator cascade immediately
- **Multiple power systems** (future): redundancy possible
- **Power restored during cascade**: Cascade reverses, systems come back online
- **Residents trapped in elevator during power out**: Emergency descent after 2 minutes

**Error Conditions**:
- **Power generation calculation wrong**: Log error, recalculate
- **Cascade doesn't propagate**: Force cascade calculation
- **Emergency power doesn't deploy**: Refund and retry

## Performance & Constraints

**Performance Requirements**:
- Power balance calculation: <2ms per update (once per game-minute)
- Brownout effects application: <1ms (affect elevator/water/oxygen systems)
- Emergency power deployment: <100ms
- Cascade propagation: <50ms (to all dependent systems)

**Technical Constraints**:
- Power capacity: MW (integral value, 0-100 MW typical building)
- Power demand: MW (scales with building size and systems)
- Power health: 0-100% (affects generation capacity linearly)
- Brownout threshold: demand > 80% of capacity = visual effects
- Emergency power: 10-30 minute duration (tunable)

**Design/Business Constraints**:
- Power failure must feel catastrophic (highest stakes)
- Brownouts must be noticeable but survivable (warning without death)
- Cascade must educate about dependencies (players learn systems interconnected)
- Emergency solutions must exist (player always has way out, but costs money/time)

## Integration Points

**Systems this depends on**:
- **MAINTENANCE_SYSTEM.md**: Power system health, degradation, maintenance
- **TimeSystem**: Power degradation tracked per day
- **BuildingSystem**: Power demand scales with building systems
- **FAILURE_CASCADES.md**: Power failure triggers cascades

**Systems that depend on this**:
- **ElevatorSystem**: Elevators require power (fail when power down)
- **OXYGEN_SYSTEM.md**: Oxygen backup requires power (cascade component)
- **WaterSystem**: Water pumps require power (cascade component)
- **LightingSystem**: Lights require power (emergency lighting on backup)
- **ResidentSystem**: Residents affected by cascades

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Power generation = health % (50% health = 50% MW output)
- [ ] Power demand scales with building load
- [ ] Brownout triggers when demand > 80% capacity
- [ ] Power failure (health 0%) triggers cascade
- [ ] Maintenance restores power to 100%
- [ ] Emergency power provides 10-30 minute backup
- [ ] Cascade propagates to oxygen and water
- [ ] Power degradation 1.5% per day
- [ ] Power level displayed correctly

**Visual/Behavioral tests** (human observation):
- [ ] Elevators slow visibly during brownout
- [ ] Lights flicker when power stressed
- [ ] Lights go out when power fails
- [ ] Residents panic when lights out
- [ ] Power failure immediately disables oxygen backup (UI alert)
- [ ] Cascade appears in correct order
- [ ] Emergency power deployment visible (lights come back partially)
- [ ] Power restoration is smooth (systems come back online progressively)

**Integration tests**:
- [ ] Elevator speed actually reduced during brownout
- [ ] Oxygen backup disabled when power down (cascade integration)
- [ ] Water pumps offline when power down (cascade integration)
- [ ] Resident panic visible during cascade
- [ ] Power maintenance costs money
- [ ] Power level persists in save/load

## Power Capacity Scaling (Proposal)

**Building size determines power demand**:

| Building Size | Demand | Typical Capacity | Notes |
|---------------|--------|------------------|-------|
| 10 floors, 50 residents | 40 MW | 50 MW | 25% buffer |
| 15 floors, 100 residents | 55 MW | 70 MW | 27% buffer |
| 20 floors, 200 residents | 80 MW | 100 MW | 25% buffer |

Player typically has 25-30% buffer if well-managed.

## Maintenance Costs (Proposal)

- **Normal power maintenance**: $3,000 (restores to 100%, scheduled)
- **Emergency power repair**: $6,000 (restores to 100%, immediate)
- **Emergency power battery**: $3,000 (temporary 10-30 minute backup, doesn't fix system)
- **Power system upgrade**: $12,000 (future mechanic: larger generators, higher capacity)

## Definition of Done

This specification is complete when:
- [ ] Power generation formula specified
- [ ] Power demand formula specified
- [ ] Brownout threshold and effects specified
- [ ] Maintenance cost defined
- [ ] Emergency power mechanics defined
- [ ] Cascade behavior specified (what cascades, timing, order)
- [ ] UI representation designed (bar, lights, alerts)
- [ ] Integration with dependent systems specified
- [ ] Failure state specified (game doesn't break, emergency descent works)

## Next Steps (Planning Phase)

1. Define exact power generation/demand formulas
2. Specify brownout effect mechanics (elevator slowdown %, light flicker rate)
3. Specify cascade timing (immediate for elevators, delayed for others)
4. Design UI (power bar, grid status, cascade alerts)
5. Specify emergency descent mechanic (stranded elevators)
6. Plan integration with each dependent system
7. Define power grid visualization (optional: show grid map)
