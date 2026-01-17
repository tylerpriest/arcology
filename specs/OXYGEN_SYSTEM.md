# Oxygen System

**Scope**: Oxygen scrubbers clean Venus atmosphere for arcology residents; system degrades, fails, and kills residents if oxygen depleted.

**Audience**: Systems Operator, Arcology Architect

**Related JTBDs**: JTBD 6 (maintain systems), JTBD 7 (failures feel critical), JTBD 9 (cascading failures)

**Status**: 🚧 In Progress (Critical infrastructure)

## Overview

Venus has a hostile atmosphere (sulfuric acid clouds, carbon dioxide, extreme pressure). The arcology is a sealed environment. Residents need breathable air.

Oxygen scrubbers remove CO2 and other contaminants from recirculated air, producing breathable oxygen. The system:
- **Requires maintenance**: Scrubber filters clog with Venus dust, degrading efficiency
- **Is critical**: Oxygen depletion = residents suffocate = game over
- **Is visible**: Players see oxygen level, can understand what "thin air" feels like
- **Creates drama**: Oxygen failure is the ultimate threat (unlike power, you can't survive without it)

This is the most critical system. Neglecting oxygen is the fastest path to game over.

## Capabilities

The system should:
- [ ] Track oxygen level (0-100%, where 100% is breathable, <20% is dangerous)
- [ ] Display oxygen level prominently in UI (player always knows status)
- [ ] Calculate oxygen production based on scrubber efficiency
- [ ] Apply degradation penalties as scrubber health declines
- [ ] Integrate with power system (oxygen scrubbers require power)
- [ ] Show visible effects as oxygen depletes (air gets "thin", UI effects, resident behavior)
- [ ] Create resident suffocation when oxygen reaches 0% (game over)
- [ ] Support emergency oxygen generation (expensive, temporary)
- [ ] Show oxygen quality (clean vs. stale) based on system health
- [ ] Enable partial solutions (emergency oxygen buys time while fixing scrubber)

## Acceptance Criteria

Success means:
- [ ] **Oxygen level always visible to player** - UI shows current %, bar color changes with level - Verify: 100% = green, 50% = yellow, 20% = red
- [ ] **Scrubber health affects oxygen production** - 50% health scrubber = 50% oxygen output - Verify: measure oxygen at 100% vs 50% scrubber health, confirm ~50% difference
- [ ] **Power down degrades oxygen quickly** - Without power backup, oxygen drops 2%/minute - Verify: turn off power, watch oxygen drain at 2%/minute rate
- [ ] **Oxygen failure is game over** - When oxygen reaches 0%, residents suffocate, game ends - Verify: oxygen reaches 0%, residents show death animation, game over screen
- [ ] **Maintenance restores scrubber to 100%** - Fixing oxygen system restores health to 100% - Verify: maintain oxygen system, health = 100%, oxygen production restored
- [ ] **Low oxygen affects resident behavior** - At <20% oxygen, residents panicked and vocal - Verify: oxygen at 10%, residents show panic animation, UI text "Residents suffocating!"
- [ ] **Emergency oxygen is available but expensive** - Costs $5,000, produces temporary oxygen (30 game-minutes) - Verify: activate emergency oxygen, oxygen level increases, is temporary
- [ ] **Oxygen level visible to residents** - Residents notice when air gets thin - Verify: oxygen <50%, residents mention "air feels thin"
- [ ] **Warning system alerts at critical levels** - UI alerts at 50%, 20%, 0% - Verify: see warnings at each threshold

## Scenarios by Example

### Scenario 1: Normal Operation (Well-Maintained)

**Given**:
- Scrubber health: 100%
- Oxygen level: 100%
- Power: running normally
- 50 residents in arcology

**When**: Time advances normally, no maintenance neglect

**Then**:
- Oxygen production: 100% (full capacity)
- Oxygen consumption: 50% (50 residents using air)
- Net: +50% oxygen production per hour (surplus)
- Oxygen level: stays at 100% (full, can't go higher)
- Residents: "Air is fresh and clean"

**And**:
- No alerts
- Residents happy (good air quality)
- Building operating normally

### Scenario 2: Scrubber Degradation (Preventable Crisis)

**Given**:
- Scrubber health: 100% on day 1
- Player neglects oxygen maintenance for 30 days
- Scrubber degrading at 1% per day

**Day 1-20**: Degradation beginning
- Scrubber health: 100% → 80%
- Oxygen production: 100% → 80%
- Oxygen consumption: ~40% (population stable)
- Net: +40% per hour (still surplus, no problem)
- Residents: no complaints yet

**Day 20**: UI alert appears
- "Oxygen system degraded to 80% health"
- Residents mention "air feels slightly recycled"
- Player notice: oxygen still fine, but system degrading

**Day 21-30**: Continued degradation
- Scrubber health: 80% → 50%
- Oxygen production: 50%
- Oxygen consumption: 40%
- Net: +10% per hour (tiny surplus, but still fine)
- Residents: "Air quality declining"

**Day 30**: Critical alert
- UI alert: "OXYGEN SYSTEM CRITICAL (health 50%)"
- Flashing warning
- Residents: "Air feels thin, hard to breathe"

**Player performs maintenance**: $2,000 cost
- Scrubber health: 100% restored
- Oxygen production: back to 100%
- Crisis averted

**Lesson**: "Regular maintenance keeps oxygen normal. Neglect leads to problems."

### Scenario 3: Power Loss Cascade (Most Dangerous)

**Given**:
- Oxygen scrubber at 80% health
- Power system running normally
- Oxygen level: 95% (slightly used)

**When**: Power system fails (cascade trigger)

**Then**:
- Oxygen scrubber loses power
- Scrubber can't operate
- Oxygen production: 0% (no scrubber function)
- Oxygen consumption: 45% (residents still breathing)
- Net: -45% per hour (oxygen dropping!)

**Immediately** (UI alert):
- "CRITICAL: Oxygen backup disabled (power system down)"
- Oxygen level shown in red, depleting fast
- Residents panicked: "We're suffocating!"

**Next 5 minutes**:
- Oxygen drops from 95% to 98% (wait, went up?)
  - Actually: initial backup oxygen supply (emergency reserves) buys small time
  - But only temporary (emergency reserves last ~5 minutes at full population)

**After 5 minutes**:
- Emergency reserves depleted
- Oxygen drops from 98% → 50% (rapid depletion now)
- Residents very panicked

**At minute 7**:
- Oxygen at 50%
- Residents sick, nauseous
- Productivity crashed to 0% (can't work when suffocating)

**At minute 10**:
- Oxygen at 20%
- Residents desperate, violent
- Some residents unconscious
- Emergency alert flashing: "SUFFOCATING!"

**At minute 12**:
- Oxygen at 0%
- Residents dead
- **Game Over**

**What player could do**:
1. **Emergency oxygen** ($5,000, deploys instantly)
   - Adds temporary oxygen (30-minute reserve)
   - Buys time while fixing power
   - Costs expensive, but saves lives

2. **Emergency power repair** ($6,000, 5-minute emergency)
   - Restores power immediately
   - Scrubber comes online
   - Oxygen production resumes
   - No temporary fix needed

3. **Both** ($11,000 total)
   - Deploy emergency oxygen immediately (buys time)
   - Then emergency power repair
   - Maximum safety

**Most players**: Choose emergency power because it's permanent fix and same cost as both.

**Lesson**: "Power failure is existential threat. Maintain power to maintain oxygen."

### Scenario 4: Population Growth Pressure

**Given**:
- Building started with 20 residents
- Now has 100 residents
- Oxygen system still same (original scrubber)
- Scrubber health: 100%

**When**: Population doubled

**Then**:
- Oxygen production: 100% (scrubber at capacity)
- Oxygen consumption: 100% (100 residents, higher rate at high density)
- Net: 0% (oxygen level flat, not increasing)
- Oxygen stays at 100%, but no buffer anymore

**Day 1**: Fine, but residents notice change
- "Air is getting thin" (even though oxygen %)
- Morale penalty from air quality perception

**Day 5**: No change yet
- But any system failure now critical (no oxygen buffer)

**When power fails** (hypothetically):
- Oxygen drops instantly (no surplus)
- Reaches critical in 2 minutes (vs. 12 minutes with small population)
- Game over in 5 minutes (vs. 12 with margin)

**Lesson**: "As population grows, system stress increases. Need bigger/better scrubbers."

**Solution**: Upgrade scrubber system? (future mechanic)
Or: Reduce population? (terrible choice)
Or: Maintain power religiously? (yes)

### Scenario 5: Multiple Failures (Death Spiral)

**Given**:
- Oxygen scrubber health: 30%
- Power system health: 25%
- Both degrading

**Day 1-20**: Slow degradation
- Oxygen: 100% → 85% (production down to 85%)
- Power: 100% → 75% (affected systems running on battery)
- Oxygen still adequate (production 85%, consumption 40%)

**Day 21-25**: Player ignores warnings
- Oxygen: 85% → 50% (health now 50%, production now 50%)
- Power: 75% → 25% (battery reserves draining fast)
- Oxygen: production 50%, consumption 45%
- Still okay, but margin tiny

**Day 26**: Critical moment
- Power hits 20% health
- Battery reserves critically low
- Player gets alert: "Power system critical, backup reserves 10%"
- Also: "Oxygen system degraded, production now 50%"

**Player hesitates**: Fix power ($3,000) or oxygen ($2,000)?
- Only has $4,000

**Player chooses oxygen** (cheaper, buys time)
- Day 27: Oxygen fixed, health 100%, production back to 100%

**Day 28**: Power fails (never fixed it)
- Power collapses to 0%
- Oxygen scrubber loses power immediately
- Oxygen production: 0%
- Oxygen level: 100% → crashes

**Player emergency oxygen** ($5,000, only has $1,000 from income)
- Can't afford it
- Oxygen drops to 50%
- Residents suffocating
- **Game over** (couldn't afford rescue)

**Lesson**: "Multiple system failure is spiral. Can't maintain everything with limited budget. Must prioritize ruthlessly."

## Edge Cases & Error Handling

**Edge Cases**:
- **Oxygen reaches exactly 0%**: Suffocation triggers (game over)
- **Oxygen drops below 0%**: Capped at 0%, suffocation triggered
- **Emergency oxygen deployed at 1% oxygen**: Still works, buys full 30 minutes
- **Scrubber fails while population increasing**: Oxygen drops faster (higher consumption rate)
- **Power restored while suffocating**: Oxygen production resumes but residents still dying (takes time to recover)
- **Multiple emergency oxygen deployments**: Stacks (30 min + 30 min = 60 min total)

**Error Conditions**:
- **Oxygen production calculation wrong**: Log error, force recalculation
- **Scrubber health doesn't affect production**: Force health→production mapping
- **Emergency oxygen doesn't deploy**: Refund player and try again

## Performance & Constraints

**Performance Requirements**:
- Oxygen level calculation: <1ms per update (once per game-minute)
- Production/consumption balance: <1ms calculation
- Emergency oxygen deployment: <100ms
- UI update: smooth, reflect real-time changes

**Technical Constraints**:
- Oxygen level: 0-100% (integral system, can't be bypassed)
- Scrubber health: 0-100% (affects oxygen production linearly)
- Oxygen consumption: scales with population (1% per ~10 residents)
- Power dependency: scrubber requires power (0 production if power down)
- Emergency oxygen: temporary boost (30-minute drain)

**Design/Business Constraints**:
- Oxygen must feel critical (highest stakes system)
- Oxygen failure = game over (no coming back from 0% oxygen)
- Maintenance cost meaningful but not impossible
- Emergency oxygen expensive (real choice, not trivial)
- Residents react visibly to low oxygen (immersion)

## Integration Points

**Systems this depends on**:
- **MAINTENANCE_SYSTEM.md**: Scrubber degradation, maintenance mechanics
- **PowerSystem**: Scrubber requires power to operate
- **FAILURE_CASCADES.md**: Power failure disables scrubber (cascade component)
- **ResidentSystem**: Oxygen consumption scales with population
- **TimeSystem**: Scrubber degradation tracked per day

**Systems that depend on this**:
- **ResidentSystem**: Oxygen affects resident health, survival
- **SatisfactionSystem**: Oxygen quality affects morale (thin air = unhappy)
- **EconomySystem**: Emergency oxygen costs money
- **NotificationSystem**: Oxygen alerts shown to player

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Oxygen production = scrubber health % (50% health = 50% production)
- [ ] Oxygen consumption scales with population (2x residents = 2x consumption)
- [ ] Power down reduces scrubber production to 0%
- [ ] Maintenance restores scrubber health to 100%
- [ ] Emergency oxygen provides 30-minute supply
- [ ] Oxygen reaches 0% triggers game over
- [ ] Oxygen level displayed correctly in UI
- [ ] Scrubber degradation 1% per day when unmaintained

**Visual/Behavioral tests** (human observation):
- [ ] Oxygen UI bar color changes (green→yellow→red)
- [ ] Oxygen depletion visible in real-time (bar drains when power down)
- [ ] Residents show distress when oxygen low (<20%)
- [ ] UI alerts appear at warning thresholds
- [ ] Emergency oxygen deployment visible (UI effect, level increase)
- [ ] Power failure immediately affects oxygen (visual connection)
- [ ] Game over screen when oxygen reaches 0%

**Integration tests**:
- [ ] Scrubber maintenance costs money (economy integration)
- [ ] Population growth increases oxygen consumption (resident integration)
- [ ] Power failure cascades to oxygen (cascade integration)
- [ ] Low oxygen affects resident morale (satisfaction integration)
- [ ] Oxygen level persists in save/load

## Oxygen Level Thresholds (Proposal)

| Level | State | Resident Reaction | Game Impact |
|-------|-------|------------------|------------|
| 100% | Perfect | "Fresh air" | No penalty |
| 75% | Good | "Air is fine" | Minor morale penalty (-1 morale per day) |
| 50% | Degraded | "Air feels thin" | Moderate morale penalty (-5), productivity -10% |
| 25% | Critical | "Hard to breathe" | Major morale penalty (-10), productivity -40% |
| 10% | Severe | "We're suffocating!" | Severe morale penalty (-20), productivity -80%, residents sick |
| 1% | Dying | "Save us!" | Residents passing out, health degrading |
| 0% | Dead | Silence | **Game Over** |

## Maintenance Costs (Proposal)

- **Normal oxygen maintenance**: $2,000 (restores to 100%, scheduled)
- **Emergency oxygen repair**: $4,000 (restores to 100%, immediate, replaces failing system)
- **Emergency oxygen supply**: $5,000 (temporary 30-minute boost, doesn't fix scrubber)
- **Oxygen system upgrade**: $8,000 (future mechanic: larger scrubber, higher production)

## Definition of Done

This specification is complete when:
- [ ] Oxygen production formula specified (health %)
- [ ] Oxygen consumption formula specified (population-based)
- [ ] Maintenance cost defined
- [ ] Emergency oxygen mechanics defined
- [ ] UI representation designed (bar, color, alerts)
- [ ] Resident behavior at different oxygen levels specified
- [ ] Game over condition at 0% oxygen specified
- [ ] Power dependency specified
- [ ] Integration with cascades specified

## Next Steps (Planning Phase)

1. Define exact production/consumption formulas
2. Specify resident behavior animations for low oxygen
3. Design UI alerts (warning at 50%, 20%, critical at 0%)
4. Specify emergency oxygen mechanic (temporary boost)
5. Plan integration with power system (dependency)
6. Define suffocation game over screen
7. Plan oxygen history tracking (for player learning)
