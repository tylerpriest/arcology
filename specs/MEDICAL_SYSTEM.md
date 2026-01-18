# Medical System

**Scope**: Healthcare infrastructure that treats sick residents, prevents deaths, manages epidemics.

**Audience**: Systems Operator, Arcology Architect

**Related JTBDs**: JTBD 6 (maintain systems), JTBD 7 (failures critical), JTBD 13 (respond to crises)

**Status**: 🚧 In Progress (Healthcare management)

## Overview

The medical system addresses health crises:
- **Treats disease**: When residents get sick (from water contamination), medical facilities provide treatment
- **Manages injuries**: Accidents in building cause injuries requiring treatment
- **Prevents deaths**: Treatment dramatically reduces death rates from sickness
- **Requires resources**: Medical facilities need power, water, medical supplies
- **Creates burden**: Disease epidemic creates medical demand that can overwhelm facilities

Medical system is different from other systems:
- **Not critical like oxygen** (doesn't cause game over)
- **Not infrastructure like power** (but dependent on power)
- **Responsive to crises** (medical demand spikes during epidemics)
- **Optional but valuable** (game can be won without medical, but harder)

Without medical facilities:
- Disease death rate: 1-3% per day (slow but steady losses)
- Epidemic spreads unchecked
- Population gradually declines

With medical facilities:
- Disease death rate: <0.1% per day (nearly prevented)
- Epidemic contained
- Population stable

## Capabilities

The system should:
- [ ] Track medical facility count and capacity (beds available)
- [ ] Calculate medical demand based on sick resident count
- [ ] Support medical facility construction (rooms like other rooms)
- [ ] Calculate treatment success rate (depends on staffing, supplies)
- [ ] Show medical status (beds full, empty, overwhelmed)
- [ ] Integrate with disease system (sick residents go to medical facilities)
- [ ] Track medical supply levels (antibiotics, equipment, bandages)
- [ ] Apply treatment costs (supplies, staff salaries)
- [ ] Show recovery time (sick residents get better over days)
- [ ] Display capacity warnings (medical overwhelmed alerts)
- [ ] Support medical staff assignments (future: agents working medical)

## Acceptance Criteria

Success means:
- [ ] **Medical facilities visible in UI** - Player knows bed capacity and occupancy - Verify: UI shows "Medical: 10 beds, 8 occupied (80%)"
- [ ] **Sick residents automatically go to medical** - Disease treatment assigned when outbreak occurs - Verify: disease outbreak triggers medical assignment
- [ ] **Treatment reduces death rate** - Treated residents have <0.1% death rate (vs. 1-3% untreated) - Verify: compare death rates treated vs. untreated
- [ ] **Medical facilities require resources** - Staff salaries, medical supplies, power - Verify: medical maintenance costs money
- [ ] **Overwhelmed medical creates crisis** - If beds full, treatment less effective - Verify: 100% bed occupancy increases death rate
- [ ] **Maintenance restores facilities** - Fixing medical improves treatment - Verify: maintain medical, death rate improves
- [ ] **Player can build more facilities** - Expand capacity to handle epidemics - Verify: build new medical room, capacity increases
- [ ] **Recovery time is visible** - Residents in medical for 3-5 days before discharge - Verify: resident medical stay duration matches expectation
- [ ] **Staff limits system** - Can't treat more patients than staff available - Verify: 10 doctors can treat 20 patients simultaneously, so needs work

## Scenarios by Example

### Scenario 1: No Medical Facilities (Hard Mode)

**Given**:
- No medical facilities in building
- Disease outbreak begins (water contamination)
- 50 residents get sick

**When**: Disease spreads without medical treatment

**Then**:
- Day 1: 50 residents sick (no treatment possible)
- Death rate: 2-3% per day (untreated)
- Day 1: 1-2 residents die
- Day 2: 98 residents sick, 2-3 die
- Day 3: 100+ residents sick (exceeds population), 3-5 die
- Day 4-5: Death rate continues 2-3% per day
- Day 10: ~30% population dead (45/150 residents)

**Result**:
- Massive population loss
- Morale crashed
- Economic loss (population = labor = income)
- Building functional but weakened

**Lesson**: "Medical facilities valuable but not critical for survival."

### Scenario 2: One Medical Facility (Adequate)

**Given**:
- 1 medical facility (10 beds, staffed)
- Disease outbreak: 50 residents sick

**When**: Outbreak occurs, residents go to medical

**Then**:
- Day 1: First 10 sick residents assigned to medical (beds full)
- Remaining 40 residents waiting for beds (untreated)
- Day 1 deaths: 5 treated (0.1% death rate) + 30 untreated (2% death rate)
  - Result: 0 treated deaths + 0-1 untreated death (expected 1 of 40)
  
- Day 2: First 10 residents recover (discharged after 3-5 day stay, assume 3 days here)
  - Actually: stay 3 days, so none discharged yet
  - Still: 10 treated (same ones), 40 untreated
  - Deaths: 0 treated + 1 untreated
  
- Day 3: First wave (originally 10) discharged, replaced by 10 new
  - 10 treated (new batch), 40 untreated
  - Deaths: 0 treated + 1 untreated
  
- Day 4-6: Continuous cycle
  - 10 treated (rotating), 40 untreated
  - Treated deaths negligible (<0.1% per day)
  - Untreated deaths 2% per day (0-1 per day)
  
- Day 10: Disease spreading slows (fewer susceptible), untreated still high
- Day 15: Outbreak contained
- **Total deaths**: ~10-15 (vs. ~45 without medical)
- **Medical saved**: ~30 lives

**Lesson**: "One medical facility helps but not enough for large epidemic."

### Scenario 3: Multiple Facilities (Epidemic Control)

**Given**:
- 3 medical facilities (30 beds total, staffed)
- Disease outbreak: 100 residents sick simultaneously

**When**: Outbreak occurs

**Then**:
- Day 1: First 30 residents assigned to medical
- Remaining 70 untreated
- Deaths: 0 treated + 1-2 untreated

- Day 2: Same (no one discharged yet, 3-day stay)
- Deaths: 0 treated + 1-2 untreated

- Day 3: First batch discharged (3-day stay complete)
- New 30 admitted
- Continuing cycle: 30 treated, 70 untreated
- Deaths: 0 treated + 1-2 untreated

- Day 7: Outbreak likely peaked (100% of susceptible infected)
- Now: controlling existing cases
- Deaths: 0 treated + 1-2 untreated

- Day 15: Outbreak contained
- **Total deaths**: ~15-20
- **Medical impact**: ~40-50% of sick received treatment

**Lesson**: "More medical facilities mean better epidemic control. But still can't treat everyone."

### Scenario 4: Medical Overwhelm (Crisis)

**Given**:
- 2 medical facilities (20 beds)
- Epidemic: 200 residents sick (10x capacity)

**When**: Massive outbreak beyond medical capacity

**Then**:
- Medical beds: 20 / 200 = 10% of sick can be treated
- 90% untreated

**What happens**:
- Medical staff working overtime (overwork penalty, reduced quality)
- Treatment effectiveness drops 50% (overworked staff)
- Treated death rate: 0.2% (vs. normal 0.1%)
- Untreated death rate: 2-3% (unchanged)

**Result**:
- Medical overwhelmed alert: "Medical system at 150% capacity!"
- Building crisis: Death rate terrible
- Only solution: Wait for epidemic to peak and decline, or...
- Build more medical facilities immediately ($10,000 each)
- Or: Medical triage (treat worst cases, let others recover naturally)

**Lesson**: "Medical can be overwhelmed. Need surge capacity for worst-case epidemics."

### Scenario 5: Medical Supply Chain Crisis

**Given**:
- 3 medical facilities fully functional
- Disease outbreak: 80 residents sick
- Medical supplies running low (not enough antibiotics)

**When**: Treatment begins, but supplies depleted

**Then**:
- First 30 residents treated (supplies available)
- Treatment works normally: <0.1% death rate

- Day 3: Supplies depleted (only 30 doses available, need more)
- Next batch of sick arrives, no supplies available
- Treatment effectiveness drops to 50% (without proper medications)
- Treated death rate: 0.5% (half-treated)

**Player options**:
1. Emergency medical supplies ($5,000) - restores supplies
2. Reduce population to reduce demand (terrible)
3. Focus resources on worst cases (triage)

**Most players**: Emergency supplies

**Lesson**: "Medical supplies are consumable resource. Need to budget for epidemics."

## Edge Cases & Error Handling

**Edge Cases**:
- **Medical facility overcrowded (150% capacity)**: Reduces treatment effectiveness
- **Medical facility understaffed**: Fewer patients can be treated simultaneously
- **Multiple sources of injury** (disease + accidents): Medical demand spikes
- **Medical facility offline (power down)**: Treatment stops, sick remain untreated
- **Resident fully recovered**: Discharged from medical, returns to normal life
- **Staff shortage**: Residents can take medical jobs (future: agents)
- **Supply depletion**: Medical can continue with reduced effectiveness

**Error Conditions**:
- **Medical staff count negative**: Cap at 0 (no treatment)
- **Treatment calculation overflow**: Cap at 100% (can't treat more than available)
- **Death rate calculation wrong**: Log error, recalculate

## Performance & Constraints

**Performance Requirements**:
- Medical demand calculation: <1ms per update (once per game-hour)
- Treatment assignment: <5ms when new sick residents arrive
- Recovery tracking: <1ms per sick resident

**Technical Constraints**:
- Medical facility = room type (costs money, takes space, like other rooms)
- Beds = capacity metric (each facility has fixed bed count)
- Medical staff = skill metric (affects treatment quality, staffing optional)
- Supplies = consumable resource (depletes during treatment, must replenish)
- Treatment duration = fixed (3-5 days per patient)
- Treatment effectiveness = depends on supplies, staffing, capacity

**Design/Business Constraints**:
- Medical should feel valuable but not essential
- Player can win without medical (hard mode)
- Medical systems should enable player to handle epidemics
- Medical supplies should be managed carefully (costs money)
- Overwhelm should create decision points (treat everyone or triage?)

## Integration Points

**Systems this depends on**:
- **WATER_WASTE_SYSTEM.md**: Sick residents are treated, disease source
- **FOOD_CHAINS.md**: Nutrition affects recovery speed
- **PowerSystem**: Medical facilities require power
- **ResidentSystem**: Residents go to medical when sick
- **MAINTENANCE_SYSTEM.md**: Medical facilities require maintenance

**Systems that depend on this**:
- **ResidentSystem**: Treatment affects resident recovery
- **SatisfactionSystem**: Epidemic (medical crisis) affects morale
- **EconomySystem**: Medical supplies cost money
- **AGENT_SYSTEM.md** (future): Medical staff agents

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Treatment reduces death rate (<0.1% vs. 1-3% untreated)
- [ ] Medical capacity limits patient assignments
- [ ] Treatment duration consistent (3-5 days)
- [ ] Supplies consumed correctly (1 dose per treatment)
- [ ] Staff shortage reduces treatment capacity
- [ ] Power down stops treatment
- [ ] Maintenance restores facility effectiveness
- [ ] Medical demand calculated correctly

**Visual/Behavioral tests** (human observation):
- [ ] Medical beds display occupancy (UI shows current/max)
- [ ] Sick residents visibly go to medical facilities
- [ ] Treatment facility shows activity (staff working animation)
- [ ] Supply depletion warning appears at low levels
- [ ] Overwhelm alert visible when beds full
- [ ] Recovered residents discharged, return to normal
- [ ] Death rate noticeably lower with medical (visual population comparison)

**Integration tests**:
- [ ] Disease outbreak triggers medical assignment
- [ ] Medical supplies cost money (budget impact)
- [ ] Power loss stops medical (cascade integration)
- [ ] Resident recovery visible in population stats
- [ ] Medical maintenance costs money

## Medical Facilities Design (Proposal)

**Medical Facility Type** (room type):
- **Size**: 3 units wide
- **Cost**: $4,000 per facility
- **Capacity**: 10 beds per facility
- **Maintenance**: $500 per facility (same as other rooms)
- **Staff requirement**: 2 doctors per 10 beds (optional, affects quality)
- **Supply cost**: $200 per patient treated (consumable)

**Scaling**:
- 1 facility: 10 beds (good for 50 residents)
- 2 facilities: 20 beds (good for 100 residents)
- 3 facilities: 30 beds (good for 200 residents)
- Ratio: ~1 bed per 5-10 residents for comfort

## Treatment & Recovery Times (Proposal)

**Disease treatment**:
- Duration: 3-5 days (varies by disease severity)
- Success rate: 95%+ with supplies and staffing
- Without supplies: 50% effectiveness
- Without staff: 70% effectiveness
- Overworked (>100% capacity): 60% effectiveness

**Injury treatment**:
- Duration: 1-3 days (depends on severity)
- Surgical injuries: 3-5 days

**Recovery time** (after discharge):
- Residents weak for 1-2 days
- Full productivity returns day 3

## Definition of Done

This specification is complete when:
- [ ] Medical facility type defined (room type, cost, capacity)
- [ ] Treatment formula specified (effectiveness by supply/staff/capacity)
- [ ] Medical demand formula specified (based on sick residents)
- [ ] Recovery time specified (duration in medical facility)
- [ ] Supply consumption specified (per patient)
- [ ] Staff roles defined (doctors, nurses)
- [ ] Overwhelm behavior specified (what happens at >100% capacity)
- [ ] UI representation designed (medical beds display, occupancy)
- [ ] Integration with disease/injury systems specified
- [ ] Power dependency specified

## Next Steps (Planning Phase)

1. Define exact treatment effectiveness formula
2. Specify medical staff roles and requirements
3. Specify supply consumption rates
4. Design medical facility UI (bed display, occupancy%)
5. Define overwhelm behaviors (reduced effectiveness)
6. Plan integration with disease epidemics
7. Specify recovery animations
8. Define medical skill/training (staff quality affects treatment)
