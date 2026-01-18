# Food Production Chains

**Scope**: Farm → Kitchen → Meal production pipeline; residents starve if food production fails.

**Audience**: Systems Operator, Arcology Architect

**Related JTBDs**: JTBD 6 (maintain systems), JTBD 7 (failures critical), JTBD 9 (cascading failures)

**Status**: 🚧 In Progress (Critical infrastructure)

## Overview

The arcology's food system on Venus:
- **Grows crops**: Hydroponic farms produce vegetables
- **Processes crops**: Kitchens convert crops into meals
- **Distributes meals**: Residents eat meals to survive

Food production requires:
- **Farm space**: Hydroponic growing chambers
- **Power**: Grow lights, climate control, equipment
- **Water**: Irrigation, nutrient delivery
- **Kitchen equipment**: Preparation, cooking, processing

Food failure cascade:
- **Farm fails** → No crops produced
- **Kitchen fails** → Crops can't be processed into meals
- **Distribution fails** → Meals not available
- **Result**: Residents starve → deaths → game over

Unlike maintenance-only systems (oxygen, water, power), food is both a **system** (production) and a **resource** (consumption). Starvation is second only to oxygen as a game-over threat.

## Capabilities

The system should:
- [ ] Track food inventory (quantity available)
- [ ] Calculate farm production based on farm count and health
- [ ] Calculate kitchen processing capacity
- [ ] Calculate food consumption based on population
- [ ] Show food balance (surplus or deficit)
- [ ] Degrade farm/kitchen health when unmaintained
- [ ] Apply starvation when food = 0
- [ ] Display food level prominently in UI
- [ ] Show starvation effects (hungry residents, reduced productivity)
- [ ] Enable emergency food rations (expensive, temporary)
- [ ] Support food rationing (reduce portions, extend supply)
- [ ] Create realistic starvation timeline (slower than oxygen, faster than disease)

## Acceptance Criteria

Success means:
- [ ] **Food level always visible** - UI shows quantity and days remaining - Verify: UI displays "Food: 500 rations, 10 days at current consumption"
- [ ] **Production matches consumption when healthy** - Well-designed building has food surplus - Verify: measure production vs. consumption at 100% farm/kitchen health
- [ ] **Farm degradation reduces production** - 50% farm health = 50% food production - Verify: compare production at 100% vs 50% health
- [ ] **Kitchen degradation reduces processing** - 50% kitchen health = 50% processing capacity - Verify: even with crops available, meals produced at reduced rate
- [ ] **Food deficit accumulates** - When consumption > production, inventory depletes - Verify: lose 10% food per day when deficit 10%
- [ ] **Starvation visible** - At <20% food, residents show hunger signs - Visual test: residents complain "I'm hungry", visible animation changes
- [ ] **Starvation kills** - At 0% food, residents die within 5 days - Verify: population declines 2-5% per day at 0% food
- [ ] **Maintenance restores production** - Fixing farm/kitchen increases production - Verify: maintain farm, production jumps to healthy level
- [ ] **Emergency rations available** - High-cost temporary solution - Verify: cost $2,000 per 50-ration supply, lasts 5 days

## Scenarios by Example

### Scenario 1: Balanced Food System (Well-Designed)

**Given**:
- 100 residents
- 5 farms (each produces 10 rations/day)
- 2 kitchens (each processes 25 rations/day)
- Farm health: 100%, Kitchen health: 100%

**When**: Normal operation

**Then**:
- Total farm production: 50 rations/day
- Total processing capacity: 50 rations/day
- Food consumption: ~50 rations/day (1 per resident)
- Food balance: 0% (perfectly balanced, no surplus, no deficit)
- Food inventory: stable at current level

**And**:
- Residents well-fed, no complaints
- No starvation risk
- Production = consumption = stability

### Scenario 2: Farm Degradation (Preventable Crisis)

**Given**:
- 100 residents, 5 farms, 2 kitchens
- Farm health: 100% on day 1
- Player neglects farm maintenance for 40 days
- Farm degrading at 1% per day

**Day 1-25**: Slow degradation
- Farm health: 100% → 75%
- Farm production: 50 → 37.5 rations/day
- Consumption: 50 rations/day
- Deficit: 12.5 rations/day (losing food reserves)
- Food inventory: 500 → drops slowly

**Day 25**: UI alert appears
- "Farm system degraded to 75% health"
- Residents notice: "Smaller portions lately"
- Morale: minor penalty (-2)

**Day 26-40**: Continued degradation
- Farm health: 75% → 40%
- Farm production: 37.5 → 20 rations/day
- Deficit: 30 rations/day (serious now)
- Food inventory: 500 → 100 remaining (only 2 days of food left)

**Day 40**: Critical alert
- "FARM SYSTEM CRITICAL (health 40%)"
- Residents: "We're running out of food!"
- Morale: significant penalty (-10)
- Food inventory: 100 rations (2 days at current consumption)

**Player performs maintenance**: $2,000 cost
- Farm health: 100% restored
- Production: back to 50 rations/day
- Food inventory: surplus recovered over next week
- Crisis averted

**Lesson**: "Farm maintenance is cheapest prevention. Letting it degrade is expensive."

### Scenario 3: Kitchen Failure (Processing Bottleneck)

**Given**:
- Farms producing 50 rations/day (crops available)
- 1 kitchen only, health: 100%
- Kitchen capacity: 25 rations/day (can only process 25, not 50)

**Result**:
- Crops produced: 50/day
- Crops processed: 25/day
- **Bottleneck**: Crops pile up, meals shortage
- Food available: only 25 rations/day (not 50)
- Consumption: 50 rations/day
- **Deficit**: 25 rations/day

**Solution**: Build 2nd kitchen
- Kitchen capacity: 50 rations/day (matches production)
- Food balance: restored

**Lesson**: "Kitchen bottleneck is real problem. Need enough kitchen capacity to process farm output."

### Scenario 4: Double Failure (Cascade)

**Given**:
- Both farms and kitchens degraded (neglected)
- Farm health: 40%
- Kitchen health: 30%

**When**: Normal operation

**Then**:
- Farm production: 50 → 20 rations/day (40% health)
- Kitchen capacity: 50 → 15 rations/day (30% health)
- **Bottleneck**: Kitchen can only process 15 of 20 crops produced
- Food available: 15 rations/day
- Consumption: 50 rations/day
- **Massive deficit**: 35 rations/day

**Result**:
- Food inventory depletes rapidly (5-7 days supply left)
- Residents panicked: "We're starving!"
- Morale: critical
- No time to fix both systems before starvation

**Player must choose**:
1. Fix farm first ($2,000) - increases production, but kitchen still bottlenecked
2. Fix kitchen first ($2,000) - increases processing, but production still low
3. Emergency rations ($2,000 per 50 rations) - buys time while fixing systems
4. Both emergency rations + both maintenance = $8,000 (expensive)

**Most players**: Emergency rations + fix farm + fix kitchen (total $6,000 over time)

**Lesson**: "Maintain both production and processing. Neglecting either creates crisis."

### Scenario 5: Population Boom (System Stress)

**Given**:
- Building started with 50 residents, farms designed for 50
- Population now: 150 residents
- Farms: still only 5 (designed for 50)
- Farm production: 50 rations/day (designed for 50, insufficient for 150)

**Result**:
- Consumption: 150 rations/day (3x original)
- Production: 50 rations/day (same as before, not scaled)
- **Deficit**: 100 rations/day
- Food inventory: depleting at 3 rations/day
- Time until starvation: 33 days

**Solutions**:
1. Build more farms (each farm = 10 rations/day)
   - Need 15 farms total for balance
   - Cost: $30,000 (expensive)
   
2. Demolish apartments to reduce population (terrible choice)
   - Reduces consumption but loses income
   - Players never choose this

3. Emergency rations + build farms gradually
   - Buys time while expanding food production
   - Spreads cost over months

**Lesson**: "As population grows, food infrastructure must scale. Plan ahead."

## Edge Cases & Error Handling

**Edge Cases**:
- **Food at exactly 0%**: Starvation begins (but doesn't instant-kill like oxygen)
- **Food production = consumption exactly**: Inventory stable, no growth or depletion
- **Multiple farms/kitchens**: Calculate total production and processing
- **Farm/kitchen demolished**: Production/processing capacity drops immediately
- **New farm built**: Capacity increases immediately, but needs time to grow first crop
- **Food rationing activated**: Reduce consumption by 20%, extends supply 25% longer
- **Emergency rations deployed**: Adds to food supply, temporary boost

**Error Conditions**:
- **Food level below 0**: Capped at 0%, starvation triggered
- **Production calculation wrong**: Log error, recalculate
- **Starvation not killing**: Force resident death at 0% food

## Performance & Constraints

**Performance Requirements**:
- Food balance calculation: <1ms per update (once per game-day)
- Population-based consumption calculation: <1ms
- Farm/kitchen efficiency calculation: <1ms

**Technical Constraints**:
- Food quantity: integral (can't have fractional rations)
- Farm production: 10 rations/day per farm at 100% health
- Kitchen processing: 25 rations/day per kitchen at 100% health
- Population-based consumption: 1 ration per 10 residents per day
- Starvation death rate: 2-5% of population per day at 0% food
- Emergency rations: $2,000 per 50 rations, lasts 5 days at normal population

**Design/Business Constraints**:
- Food failure feels serious but manageable (slower than oxygen death)
- Starvation creates moral weight (named residents dying from hunger)
- Player can always prevent starvation with planning or emergency rations
- Farm/kitchen maintenance is meaningful cost
- Food scaling with population creates natural expansion tension

## Integration Points

**Systems this depends on**:
- **MAINTENANCE_SYSTEM.md**: Farm/kitchen degradation, maintenance
- **PowerSystem**: Farms require power (grow lights, climate control)
- **WATER_WASTE_SYSTEM.md**: Farms require water (irrigation)
- **ResidentSystem**: Food consumption scales with population
- **TimeSystem**: Food production tracked per day

**Systems that depend on this**:
- **ResidentSystem**: Starvation kills residents
- **SatisfactionSystem**: Food shortage reduces morale, hunger complaints
- **EconomySystem**: Starvation costs money (residents die, less income)
- **ElevatorSystem** (future): Residents won't work if starving (productivity 0%)

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Farm production = farm count × health % (50 base per farm)
- [ ] Kitchen processing = kitchen count × health % (25 base per kitchen)
- [ ] Food consumption scales with population (1 per 10 residents)
- [ ] Food balance calculated correctly (production - consumption)
- [ ] Starvation kills at correct rate (2-5% per day)
- [ ] Maintenance restores farm/kitchen to 100%
- [ ] Emergency rations add to food supply
- [ ] Food level displayed correctly in UI

**Visual/Behavioral tests** (human observation):
- [ ] Hungry residents show visual signs (clutching stomach, weaker animation)
- [ ] Starvation UI alerts appear at thresholds (20%, critical, death)
- [ ] Food rationing reduces consumption visibly (smaller portions)
- [ ] Dead residents from starvation disappear (population decreases)
- [ ] Emergency rations deployment visible (UI effect)
- [ ] Farm/kitchen status visible in UI (current production)

**Integration tests**:
- [ ] Power down affects farm production (grow lights require power)
- [ ] Water down affects farm production (irrigation needs water)
- [ ] Population growth increases consumption (verify math)
- [ ] Food shortage reduces productivity (resident morale/work)
- [ ] Food maintenance costs money (economy integration)

## Food System Scaling (Proposal)

| Building Size | Population | Farms Needed | Kitchens Needed | Daily Rations Needed | Monthly Cost |
|---------------|-----------|----------------|-----------------|------------------|------------|
| 10 floors, 50 residents | 50 | 5 farms | 2 kitchens | 50 | $3,000 |
| 15 floors, 100 residents | 100 | 10 farms | 4 kitchens | 100 | $6,000 |
| 20 floors, 200 residents | 200 | 20 farms | 8 kitchens | 200 | $12,000 |

## Maintenance Costs (Proposal)

- **Farm maintenance** (per farm): $500 (restores to 100%)
- **Kitchen maintenance** (per kitchen): $400 (restores to 100%)
- **Emergency food rations**: $2,000 per 50 rations (30-day supply)
- **Emergency farm expansion**: Speed up new farm growth ($5,000 to accelerate)

Typical monthly maintenance: $5,000-10,000 depending on farm/kitchen count

## Definition of Done

This specification is complete when:
- [ ] Farm production formula specified (health % × count)
- [ ] Kitchen processing formula specified (health % × count)
- [ ] Food consumption formula specified (population-based)
- [ ] Starvation death rate specified
- [ ] Maintenance cost defined per farm/kitchen
- [ ] Emergency rations mechanics defined
- [ ] Food rationing mechanics defined (reduce consumption option)
- [ ] UI representation designed (food bar, rations display, alerts)
- [ ] Integration with power/water specified
- [ ] Starvation animations/effects specified

## Next Steps (Planning Phase)

1. Define exact production/processing formulas
2. Specify rationing mechanic (20% reduction option)
3. Specify food growth time for new farms (how long until production)
4. Design UI (food inventory display, consumption rate, production rate)
5. Specify starvation animations (residents weaker, slower)
6. Plan integration with power/water cascades
7. Define death animation for starvation
8. Specify emergency ration UI and mechanics
