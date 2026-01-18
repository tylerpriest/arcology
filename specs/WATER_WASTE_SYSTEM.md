# Water & Waste System

**Scope**: Water distribution and waste recycling system; depends on power; water loss leads to disease and health degradation.

**Audience**: Systems Operator, Arcology Architect

**Related JTBDs**: JTBD 6 (maintain systems), JTBD 7 (failures critical), JTBD 9 (cascading failures)

**Status**: 🚧 In Progress (Infrastructure system)

## Overview

The arcology's water system:
- **Extracts water**: From Venus atmosphere condensation or recycling
- **Distributes water**: Pumps deliver to all rooms
- **Recycles waste**: Sewage processing converts waste back to usable water
- **Requires power**: Pumps and treatment need electricity

Water system failure creates:
- **Disease outbreak**: No sanitation → disease spreads
- **Resident sickness**: Residents get ill, demand medical care
- **Health degradation**: Sick residents weaker, productivity down
- **Death spiral**: If untreated, sickness → deaths → morale crash

Unlike oxygen (instant game over), water failure is a **slow-burning crisis** that compounds over time.

## Capabilities

The system should:
- [ ] Track water levels (0-100%, like oxygen)
- [ ] Calculate water production based on system health
- [ ] Integrate with power (pumps require power; power down = water stops)
- [ ] Track disease spread (contaminated water = disease)
- [ ] Calculate resident sickness rates based on water quality
- [ ] Apply health degradation to sick residents over time
- [ ] Create medical demand when residents sick (integrates with future medical system)
- [ ] Display water quality (clean vs. contaminated)
- [ ] Support emergency water supply (bottled water, expensive, temporary)
- [ ] Show visible effects of contamination (residents get sick, visible animations)
- [ ] Enable disease epidemic if water offline too long

## Acceptance Criteria

Success means:
- [ ] **Water level always visible** - UI shows %, bar shows status - Verify: UI displays water level during normal operation
- [ ] **Power down stops water immediately** - Water offline when power fails (cascade) - Verify: turn off power, water production = 0%
- [ ] **Contaminated water spreads disease** - Water quality <50% = disease risk - Verify: measure disease spread rate at 40% water quality vs. 100%
- [ ] **Disease affects resident health** - Sick residents have reduced health, visible symptoms - Verify: sick resident shows illness animation, health bar reduced
- [ ] **Maintenance restores water system** - Fixing water returns to 100% - Verify: maintain water, production restored, disease spread halts
- [ ] **Disease takes time to kill** - Unlike oxygen (instant), water disease kills over hours - Verify: resident at 0% health dies after 30 game-minutes of sickness
- [ ] **Medical treatment possible** - Sick residents can be treated (future integration) - Verify: sick resident sent to medical facility, health recovers
- [ ] **Disease epidemic possible** - Many residents sick simultaneously creates crisis - Visual test: see epidemic with 50+ sick residents
- [ ] **Emergency water available** - Bottled water expensive but stops disease - Verify: activate emergency water, disease spread halts

## Scenarios by Example

### Scenario 1: Normal Operation (Well-Maintained)

**Given**:
- Water system health: 100%
- Power: running normally
- 100 residents in arcology

**When**: Time advances normally, no maintenance neglect

**Then**:
- Water production: 100% (full capacity)
- Water consumption: 100 liters/game-day (100 residents × 1 liter each)
- Water available: Surplus (recycling enables ~200% capacity)
- Water quality: 100% (clean, safe)
- Residents: healthy, no sickness

**And**:
- No disease
- No resident complaints about water
- System running perfectly

### Scenario 2: Water System Degradation (Preventable Crisis)

**Given**:
- Water system health: 100% on day 1
- Player neglects water maintenance for 50 days
- Degrading at 0.8% per day

**Day 1-30**: Slow degradation
- Water system health: 100% → 76%
- Water production: 76% (recycling less efficient)
- Water consumption: ~100 liters
- Available: Still surplus
- Water quality: 100% (still clean, system just less efficient)
- Residents: no complaints yet

**Day 30**: UI alert appears
- "Water system degraded to 76% health"
- Water pressure notice: "Water pressure declining"
- Residents: occasional comment "water pressure low"

**Day 31-45**: Continued degradation
- Water system health: 76% → 50%
- Water production: 50%
- Water consumption: 100 liters
- Now in deficit: losing water reserves
- Water reserves: depleting (from 100% → 80% → 60%)

**Day 45**: Critical alert
- "WATER SYSTEM CRITICAL (health 50%)"
- Water quality warning: "Water reserves critically low"
- If reserves hit 0%, water offline entirely

**Player performs maintenance**: $1,500 cost
- Water system health: 100% restored
- Production back to 100%
- Reserves recover to 100%
- Crisis averted

**Lesson**: "Water maintenance is cheaper than emergency. Plan ahead."

### Scenario 3: Power Loss Cascade (Water Goes Down)

**Given**:
- Power system fails (cascade trigger)
- Water system health: 80% (running well)

**When**: Power fails

**Then**:
- Pumps stop immediately (no power)
- Water production: 0% (no pumps)
- Water consumption: still ~100 liters/day
- Water reserves: 100% → depleting rapidly

**Within 1 hour** (game-time):
- Water reserves: 100% → 80%
- Water still flowing from pressure
- Residents: still have water

**Within 3 hours**:
- Water reserves: 80% → 40%
- Water pressure dropping
- Residents: notice weak water flow

**Within 5 hours**:
- Water reserves: 40% → 0%
- Water completely offline
- UI alert: "WATER SYSTEM OFFLINE (power down)"
- Residents: "No water! Can't shower!"

**Within 8 hours**:
- Disease risk increasing (no sanitation)
- First residents getting sick
- UI: "Disease spreading (contaminated water)"

**Within 24 hours**:
- 30% of population sick
- Residents complaining: "I'm sick!"
- Morale crashes from sickness complaints
- Medical demand spikes

**If power restored in first 5 hours**:
- Water pumps restart immediately
- Water reserves start regenerating (from recycling)
- Disease outbreak prevented

**If power restored after 24 hours**:
- Water restored, but disease already spreading
- Must wait for disease to clear (takes days)
- Medical treatment required for worst cases
- Several residents will die

**Lesson**: "Power failure cascades to water. Maintain power to prevent disease outbreak."

### Scenario 4: Disease Epidemic (Water Crisis)

**Given**:
- Water system offline for 3 days (some catastrophic failure)
- 150 residents in arcology
- Disease spreading unchecked

**Day 1 of water offline**:
- Disease starts spreading (no sanitation)
- 3-5 residents get sick

**Day 2**:
- Disease spreads: 15-20 residents sick (exponential)
- UI alert: "Disease spreading"
- Residents: visible coughing, visible illness animations
- Morale: decreasing due to sickness

**Day 3**:
- Disease spreads: 50+ residents sick
- Productivity crashes (sick residents can't work)
- Income drops (less work gets done)
- Medical demand overwhelming
- First deaths: 2-3 residents die from illness

**Day 4**:
- Disease epidemic: 80+ residents sick
- Building functioning minimally
- Multiple daily deaths
- Morale: near zero (residents panicked)
- Crisis state: **building barely functional**

**Player finally fixes water** (restores power, repairs water system)
- Water treatment resumes
- Disease stops spreading
- Sick residents start recovering (slowly, over days)

**Recovery phase** (days 5-10):
- Sick residents gradually heal (medical treatment speeds recovery)
- Death rate drops to 0
- Morale gradually recovers
- Population permanently reduced (deaths were real)

**Lesson**: "Water failure is slow-burn crisis. Ignore it and epidemic happens."

### Scenario 5: Smart Mitigation (Partial Solution)

**Given**:
- Power fails (water cascade begins)
- Player's budget: $10,000
- Options:
  1. Emergency power repair: $6,000 (restores water)
  2. Emergency water supply (bottled): $5,000 (temporary, doesn't fix system)
  3. Both: $11,000 (exceeds budget)

**Player chooses**: Emergency water ($5,000) first

**Result**:
- Bottled water deployed to building
- Water available (through emergency supply)
- Sanitation possible
- Disease outbreak prevented
- Power still down, but immediate crisis averted

**Later** (next month when income recovers):
- Emergency water supply exhausted (30-day supply)
- Must restore power or get more emergency water
- Power restoration preferred (permanent fix)
- Emergency power repair: $6,000

**Lesson**: "Sometimes partial solution buys time while fixing root cause."

## Edge Cases & Error Handling

**Edge Cases**:
- **Water level exactly 0%**: Disease begins, but doesn't instantly kill (unlike oxygen)
- **Disease reaches epidemic (80%+ sick)**: Building functioning minimally, possible game over by attrition
- **Power restored during disease outbreak**: Disease persists (water doesn't instantly cure existing illness)
- **Multiple disease sources**: Water + food failure simultaneously = double disease pressure
- **Quarantine mechanic** (future): Can isolate sick residents to slow spread
- **Resident immunity** (future): Some residents develop immunity, don't catch disease

**Error Conditions**:
- **Disease calculation infinite**: Cap disease spread at 95% population
- **Health degradation too fast**: Adjust degradation rate (currently kills after 30 days)
- **Water production calculation wrong**: Log error, force recalculation

## Performance & Constraints

**Performance Requirements**:
- Water level calculation: <1ms per update (once per game-hour)
- Disease spread calculation: <5ms (population-based, complex)
- Disease health degradation: <1ms per sick resident

**Technical Constraints**:
- Water level: 0-100% (reserves, like oxygen)
- Water production: depends on system health (%)
- Water consumption: scales with population (1 unit per ~10 residents)
- Disease spread: exponential function of contamination
- Disease death rate: 1-3% per day if untreated
- Treatment reduces death rate to 0.1% per day

**Design/Business Constraints**:
- Water failure less dramatic than oxygen (slow burn vs. instant)
- Creates different crisis type (epidemic vs. suffocation)
- Medical system integration needed (future mechanic)
- Quarantine/treatment possible but expensive (moral choice)

## Integration Points

**Systems this depends on**:
- **MAINTENANCE_SYSTEM.md**: Water system degradation, maintenance mechanics
- **PowerSystem**: Water pumps require power (power failure → water offline)
- **FAILURE_CASCADES.md**: Power failure disables water (cascade component)
- **ResidentSystem**: Water consumption scales with population

**Systems that depend on this**:
- **ResidentSystem**: Sick residents affect population
- **MEDICAL_SYSTEM.md** (future): Treatment of sick residents
- **SatisfactionSystem**: Disease and sickness reduce morale
- **EconomySystem**: Sick residents = reduced productivity = less income

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Water production = system health %
- [ ] Power down reduces water to 0%
- [ ] Disease spreads exponentially (2x sick every 12 hours)
- [ ] Disease kills residents at correct rate (1-3% per day)
- [ ] Medical treatment reduces death rate
- [ ] Maintenance restores system to 100%
- [ ] Emergency water stops disease spread
- [ ] Water level displayed correctly in UI

**Visual/Behavioral tests** (human observation):
- [ ] Sick residents show illness animation (coughing, weak walk)
- [ ] Disease UI alerts appear at thresholds
- [ ] Water pressure effect visible (weak flow animation)
- [ ] Disease epidemic is visually apparent (many sick residents)
- [ ] Power failure immediately disables water (visual connection)
- [ ] Emergency water deployment visible (UI effect)
- [ ] Dead residents disappear from building (graphic clarity)

**Integration tests**:
- [ ] Power failure cascades to water (verified)
- [ ] Disease reduces productivity (measure income)
- [ ] Sick residents demand medical care (system flag)
- [ ] Water maintenance costs money (economy integration)
- [ ] Water level persists in save/load

## Disease Spread Model (Proposal)

**Contagion rate** (without treatment):
- Day 1: 5 residents sick (initial)
- Day 2: 15 residents sick (3x growth)
- Day 3: 40 residents sick (2.5x growth)
- Day 4: 80 residents sick (2x growth)
- Day 5+: Growth slows, asymptotes at 95% (not all residents get sick)

**Death rate** (without treatment):
- 1-3% of sick residents die per game-day
- Vulnerable populations (elderly, children): 5-10% death rate
- Young adults: 0.5-1% death rate

**With medical treatment**:
- Death rate drops to 0.1% (nearly no deaths)
- Recovery time: 5 days to full health (vs. 10+ days untreated)

**With emergency bottled water**:
- No new infections (sanitation provided)
- Existing infections still need treatment
- Buys time while fixing water system

## Maintenance Costs (Proposal)

- **Normal water maintenance**: $1,500 (restores to 100%, scheduled)
- **Emergency water repair**: $3,000 (restores to 100%, immediate)
- **Emergency bottled water supply**: $5,000 (temporary 30-day supply, stops new infections)

Total monthly water maintenance: ~$2,000 at baseline population

## Definition of Done

This specification is complete when:
- [ ] Water production formula specified (health %)
- [ ] Water consumption formula specified (population-based)
- [ ] Disease spread formula specified (exponential contagion)
- [ ] Disease death rate specified (with/without treatment)
- [ ] Maintenance cost defined
- [ ] Emergency water mechanics defined
- [ ] UI representation designed (water level bar, disease alerts)
- [ ] Resident behavior during disease specified (animations, sounds)
- [ ] Power dependency specified (pumps need power)
- [ ] Cascade timing specified (water offline time to disease)

## Next Steps (Planning Phase)

1. Define exact disease contagion formula
2. Define death rate by age/vulnerability
3. Specify medical treatment mechanics (future integration)
4. Design UI (water bar, disease alert, epidemic warning)
5. Specify disease animations (coughing, weakness, death)
6. Plan integration with medical system (future)
7. Define quarantine mechanics (future nice-to-have)
