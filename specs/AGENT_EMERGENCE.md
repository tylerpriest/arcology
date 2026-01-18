# Agent Emergence & Behavioral Rules

**Scope**: Simple behavioral rules for agents that create complex, surprising interactions (emergence).

**Audience**: Systems Operator, Game Designer

**Related JTBDs**: JTBD 8 (500+ agents), JTBD 9 (emergent gameplay)

**Status**: 🚧 In Progress (Emergence rules)

## Overview

Emergence is when simple rules create complex behavior. Examples:

**Individual rule**: "Fish swim together and avoid walls"
**Emergent behavior**: Schools of fish moving coherently

**Individual rule**: "Ants follow pheromone trails and mark new trails"
**Emergent behavior**: Colony solves maze, finds food sources

**In Arcology**:
**Individual rule**: "Maintenance workers maintain systems in priority order"
**Emergent behavior**: Power failure pulls workers away from food maintenance → food production drops → secondary crisis

These emergent behaviors are **not scripted**, they emerge from agent rules interacting with each other and the world.

## The Power of Emergence

Without emergence: "Oxygen failure → repair message → UI alert"
With emergence: "Oxygen failure → workers pulled away → power maintenance stalls → power system degrades → power failure cascades to water"

The second is **more dramatic** because it's **unpredictable** but **logical** (players can see why it happened).

## Core Behavioral Rules

### Resident Agent Behaviors

**Sleep Cycle**:
```
Rule: "If fatigue > 80% OR time = 11 PM → Go to apartment and sleep"
- Sleep duration: 8 hours (11 PM → 7 AM)
- Fatigue recovery: 100% per 8 hours sleep
- If disturbed (emergency alarm) → Wake up immediately
```

**Work Cycle**:
```
Rule: "If time = work hours AND job available → Go to job and work for 8 hours"
- Job types: Office, Kitchen, Farm, Medical, Service
- Work hours: Vary by job (office 8-5, farm 6 AM-6 PM, food service 6 AM-8 PM)
- Productivity: 100% if well-fed, rested; reduced if hungry, tired, sick
```

**Hunger Management**:
```
Rule: "If hunger > 50% → Find food and eat"
- Food sources: Kitchen (meals), Emergency rations
- Eating takes 15 minutes
- Hunger decreases 5% per food consumed
- Starvation occurs if hunger = 100% AND no food available for 5 days
```

**Health Management**:
```
Rule: "If sick → Go to medical facility"
- Medical assigns resident to bed
- Treatment duration: 3-5 days
- Recovery: Fatigue 20%, health restored
- If no medical available → Stay in apartment, recover slowly (10 days)
```

**Panic Response** (during crisis):
```
Rule: "If crisis alert → Show distress animation AND move to assembly point"
- Crisis types: Power down, Oxygen low, Food shortage, Disease outbreak
- Assembly point: Lobby (central location)
- If assembly point blocked → Find alternate shelter
- Panic reduces morale (-20), productivity (-100%)
- Panic resolves when crisis is resolved AND 1 hour passes
```

### Maintenance Worker Behaviors

**Maintenance Cycle**:
```
Rule: "Check all systems in priority order → Maintain degraded system"
Priority order:
1. Oxygen (critical, no game over alternative)
2. Power (cascades to others)
3. Water (disease vector)
4. Food (starvation threat)
5. Everything else

Base cycle time: 6 hours (check all systems)
```

**System Selection**:
```
Rule: "If multiple systems degraded → Work on highest priority"
- If oxygen at 20% and power at 30% → Work on oxygen first
- Oxygen is ALWAYS prioritized (game over threat)
- If all systems healthy → Perform preventative maintenance
```

**Emergency Response**:
```
Rule: "If system fails (health = 0%) → ALL available workers redirect to repair"
- Failed system is CRITICAL priority
- All other work paused (except critical life support)
- Workers continue until repair complete
- Secondary maintenance falls behind during emergency
```

**Fatigue Management**:
```
Rule: "If fatigue > 80% → Stop work and rest"
- Rest location: Breakroom/quarters
- Rest duration: 4 hours to recover fully
- Fatigue reduces efficiency:
  - 100% fatigue: 100% efficiency
  - 75% fatigue: 85% efficiency
  - 50% fatigue: 70% efficiency
  - 25% fatigue: 50% efficiency
- Very fatigued workers might take unscheduled breaks (emergent)
```

### Farm Worker Behaviors

**Growing Cycle**:
```
Rule: "Plant seeds → Water crops → Harvest when mature"
- Planting: 1 hour per farm
- Growing: 3 days (automatic, not agent action)
- Harvesting: 4 hours per farm at harvest time
- Production: 10 rations per farm when harvested
```

**Contingency**:
```
Rule: "If water system down → Crops wilt, production decreases"
- With water: 10 rations/harvest
- Without water (2+ days): 5 rations/harvest (half)
- Without water (5+ days): 0 rations/harvest (crops dead)
```

**Reassignment During Crisis**:
```
Rule: "If power fails → Some farm workers reassigned to help with emergency"
- Power failure doesn't directly affect farms (crops grow fine)
- But critical workers might be reassigned to other priorities
- Optional: Farm workers help with manual repairs if desperate
```

### Kitchen Worker Behaviors

**Processing Cycle**:
```
Rule: "Take raw food → Process into meals → Distribute"
- Input: Raw crops from farm (quantity: harvested crops)
- Processing: 4 hours per batch
- Output: Meals (25 meals per batch at full capacity)
- Efficiency: Depends on worker count
  - 20 workers: 25 meals/batch
  - 10 workers: 12-13 meals/batch
  - 5 workers: 6-7 meals/batch
  - 0 workers: 0 meals
```

**Bottleneck**:
```
Rule: "If input (crops) insufficient → Wait for harvest"
- Cannot produce without ingredients
- Workers idle if no crops available
- Becomes visible bottleneck if farm behind schedule
```

**Emergency Rationing**:
```
Rule: "If emergency food deployed → Distribute to residents"
- Takes priority over normal processing
- Each emergency ration goes directly to resident
- Faster distribution (5 min per 50 rations vs. 4 hours processing)
```

## Emergent Scenarios From Rules

### Scenario 1: Power Failure Cascade (Agent-Driven)

**Trigger**: Power system fails

**From POWER_SYSTEM rules**: Elevators stop, oxygen backup disabled

**From AGENT rules**:

**Minute 0**: Power fails
- Maintenance manager: "CRITICAL: Power system offline"
- Priority shift: All available maintenance workers → Power repair
- Current distribution:
  - Power repair: 8 workers (now 20 reassigned)
  - Oxygen: 5 workers (continue normal maintenance)
  - Water: 4 workers (continue)
  - Food: 3 workers (continue)

**Minute 1-2**: Workers rush to power system
- Farm workers: Neutral (no direct impact)
- Kitchen workers: Neutral (crops already processed)
- Residents: Confused (lights dimmed, elevators stopped)

**Minute 3**: Reassignment happens
- Power repair progressing with 20 workers
- Oxygen maintenance: Still 5 workers
- Water maintenance: Still 4 workers
- Food maintenance: Only 3 workers (below optimal)

**Minute 5**: Secondary effects emerge
- Water workers behind schedule (understaffed)
- Food production: On track (3 workers sufficient short-term)
- Water system health: Begins degrading (not being maintained)

**Minute 15**: Power repair progressing
- Estimated completion: 10 more minutes
- Water maintenance: 2 days behind schedule now
- Oxygen maintenance: Normal
- Food production: Normal

**Minute 25**: Power restored
- Elevators come back online
- Oxygen backup online
- 20 workers reassigned away from power
- 5 workers reassigned to water maintenance (now has 9 total)

**Minute 35**: Water maintenance catches up
- Water health stabilized
- Back to normal maintenance schedules

**Result**: Power crisis resolved, but water maintenance delayed. No secondary failure because water had 2-day buffer before critical level.

**What happened**: Agent rules (prioritize by criticality) + worker limits (only 30 total) created natural cascade. Water wasn't IGNORED, but fell behind due to resource constraints.

### Scenario 2: Fatigue Spiral (Emergent Problem)

**Trigger**: Building at capacity, all workers stressed

**From AGENT rules**:

**Day 1**: Normal operation
- All workers at 100% efficiency
- Production on schedule
- No issues

**Day 2-3**: Demand increases
- New residents arrived (construction complete)
- Food demand: +20% (more mouths)
- Farm workers: Overtime (working 10 hours instead of 8)
- Kitchen workers: Overtime
- Maintenance workers: Overtime
- Fatigue rising: 80% → 90% → 95%

**Day 4**: Fatigue hits threshold
- Farm workers: Fatigue > 80%, begin taking breaks
- Kitchen workers: Fatigue > 80%, taking breaks
- Maintenance workers: Fatigue > 80%, some on mandatory rest
- Result: Fewer workers actually working
- Food production: Drops 20% (workers fatigued)
- Maintenance: Drops 30% (many resting)

**Day 5**: Secondary effects
- Food production behind schedule
- Maintenance falling behind
- Food inventory: Dropping (production < consumption)
- Maintenance schedules: Delays accumulating

**Day 6**: Decision point
- UI shows: "Farm workers exhausted"
- Player realizes: Need more workers OR give rest day
- Options:
  1. Build more farms (hire more workers) - expensive
  2. Give rest day (production stops today) - accept short-term pain
  3. Push through (workers collapse? eventual consequence?)

**Player chooses**: Give farm workers a rest day

**Day 7**: Rest day
- Farm workers: Resting (no production today)
- Food: 0 rations produced
- Food consumption: Still 100 rations/day
- Net: -100 rations from inventory

**Day 8**: Recovery
- Farm workers: Recovered (fatigue 20%, recovering to 100%)
- Production: Normal again
- Food: Back to schedule

**Result**: Fatigue created emergent problem (tired workers less productive) that forced player choice (invest in workers or accept losses).

### Scenario 3: Medical Overwhelm (Cascading Demand)

**Trigger**: Large disease outbreak (200 residents sick)

**From AGENT rules**:

**Hour 0**: Disease outbreak begins
- Medical system: 2 facilities, 20 beds total
- Sick residents: 200 (10x capacity)
- Medical rule: "If sick → Go to medical"
- Result: 20 residents go to medical, 180 wait outside

**Hour 1-3**: Medical facility overrun
- 20 beds full, 80+ waiting in corridors
- Medical staff: Overwhelmed (can treat 20, want to treat 200)
- Hospital rule: "If overwhelmed → Reduce treatment quality"
- Medical workers: Fatigued (working overtime)

**Hour 4-6**: Secondary effects
- Medical workers: Fatigue rising
- Treatment efficiency: Dropping (overworked staff)
- Death rate: Increasing (less effective treatment)
- Resident panic: Spreading (seeing so many sick)

**Hour 12**: Crisis point
- Medical staff: Collapsed, taking mandatory breaks
- No treatment happening (staff resting)
- Residents: Dying faster than being treated
- Morale: Crashing (seeing deaths)

**Player options**:
1. Build more medical facilities - Expensive, slow
2. Deploy emergency supplies - Helps but temporary
3. Quarantine sick residents - Reduces exposure

**Player chooses**: Build more medical facility

**Hour 24**: New facility online
- 10 more beds available
- Medical staff: Recovered from break
- Now 30 beds total (vs. 200 sick)
- Still overwhelmed, but better

**Hour 48**: Outbreak peaks
- 200 sick residents declining to 150 (recovered, died)
- Treatment keeping up better with more beds
- Deaths: Still occurring but slowing

**Result**: Medical overwhelm created emergent crisis (overworked staff reduce quality) that forced expansion decision.

## Non-Scripted Events

These scenarios emerge from agent rules, not developer scripts:

✅ **Agents get fatigued** → Productivity drops (emergent)
✅ **Tired workers take breaks** → Maintenance falls behind (emergent)
✅ **Emergency pulls workers away** → Secondary maintenance stalls (emergent)
✅ **Sick residents overwhelm medical** → Quality drops, deaths (emergent)
✅ **Food workers fatigued** → Production drops → Food shortage (emergent)
✅ **Multiple crises compete** → Agents must choose priorities (emergent)

None of these are hardcoded. They emerge from:
1. Individual agent rules (e.g., "If fatigued → Rest")
2. Resource limits (only 30 maintenance workers)
3. Task priorities (Oxygen > Power > Water)
4. System interdependencies (Power failure affects water)

## Emergent Storylines

Players observe emergent narratives:

**"The Week Food Production Stopped"**
- Farm workers fatigued from overtime
- All took rest day same day
- Food production = 0 for 24 hours
- Residents panicked
- Day 2: Production resumed, crisis over

**"The Medical Collapse"**
- Disease outbreak overwhelmed 2 medical facilities
- Medical staff worked 48 hours straight
- Fatigue hit, quality dropped dramatically
- Death rate spiked
- Built new facility, hired more staff
- Eventually stabilized

**"The Power Cascade"**
- Power system failed
- Maintenance pulled away from water
- Water couldn't be maintained
- Water degraded for 40 hours
- Power came back online
- Saved water from complete failure
- Each system was on brink of cascade

These stories are **unique to each playthrough** because they emerge from agent interactions.

## Behavioral Complexity

Individual rules are **simple**:
- "If tired → Rest"
- "If hungry → Eat"
- "If critical system down → Fix it"

But combinations create **complexity**:
- Tired + Hungry + Critical system down = What does worker prioritize?
- No food + Tired + Emergency = Workers can't work effectively, causing cascade

This is **emergence**: Simple rules, complex behavior.

## Definition of Done

This specification is complete when:
- [ ] All agent types have behavioral rules defined
- [ ] Decision trees specified (when rule A vs rule B applies)
- [ ] Priority system specified (how agents choose when rules conflict)
- [ ] Emergent scenarios documented (at least 5-10)
- [ ] Fatigue mechanics specified
- [ ] Panic mechanics specified
- [ ] Rest/recovery mechanics specified
- [ ] Contingency behaviors defined (when normal action impossible)

## Next Steps (Planning Phase)

1. Detail decision trees for each agent type
2. Specify priority resolution (tie-breaking)
3. Document 10+ emergent scenarios
4. Specify contingency behaviors (blocked paths, resources unavailable)
5. Plan interaction between agent types (residents affect workers)
6. Specify agent communication (if any: dispatch alerts, priority changes)
7. Plan emergence testing (how to verify emergence is occurring)
