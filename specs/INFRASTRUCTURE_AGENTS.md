# Infrastructure Agents & Specialization

**Scope**: Specific agent types that maintain and operate critical systems (maintenance workers, processors, technicians).

**Audience**: Systems Operator, Game Designer

**Related JTBDs**: JTBD 8 (500+ agents), JTBD 9 (emergent gameplay)

**Status**: 🚧 In Progress (Specific agent roles)

## Overview

Instead of abstract "maintenance system reduces degradation by X%", see:

- **8 oxygen specialists** checking scrubber filters, replacing clogged ones
- **10 power technicians** monitoring generators, repairing fuel cells
- **6 water technicians** treating contamination, fixing pipes
- **50 farm workers** planting, harvesting, watering crops
- **20 kitchen workers** processing food, preparing meals
- **20 cleaners** maintaining sanitation
- **5 managers** coordinating workers, assigning tasks

Each agent type has **specific behaviors** tied to their role.

This makes infrastructure **tangible**: Player sees WHO maintains systems, not just abstract numbers.

## Agent Types Specified

### Maintenance Workers (30 total)

**Role**: Monitor and maintain all critical systems

**Responsibilities**:
- Check system health daily
- Perform routine maintenance on degraded systems
- Emergency repairs when systems fail
- Prioritize by criticality (oxygen > power > water > food)

**Behaviors**:
```
Daily cycle:
1. Check oxygen system (30 min)
2. If degraded → Maintain oxygen (60 min)
3. Check power system (30 min)
4. If degraded → Maintain power (60 min)
5. Check water system (30 min)
6. If degraded → Maintain water (60 min)
7. Check food systems (30 min)
8. If degraded → Maintain food (60 min)
9. Break (30 min)
10. Repeat or emergency response

Maintenance time = base time / worker count
- 1 worker on oxygen: 120 minutes
- 2 workers: 60 minutes
- 4 workers: 30 minutes
```

**Emergency Behavior**:
- When system fails: "CRITICAL priority"
- All available workers redirect to failed system
- Work overtime if needed (fatigue accumulates)
- Continue until repair complete

**Example**: Oxygen failure
- 5 maintenance workers idle/between tasks
- Emergency alert: "Oxygen CRITICAL"
- All 5 redirect to oxygen repair
- Estimated time: 15 minutes with 5 workers (vs. 60 min with 1)
- Work completed, workers reassigned to other priorities

### Oxygen Specialists (8 workers, subset of maintenance)

**Role**: Expert maintenance on oxygen scrubbers

**Specialization**: 
- 2x faster at oxygen maintenance than general maintenance workers
- Can diagnose oxygen problems
- Can perform emergency oxygen generation if needed

**Behaviors**:
- Primary responsibility: Oxygen system maintenance
- Secondary: Help general maintenance during emergency
- Expertise allows faster repairs

**Example**: Oxygen degradation
- General maintenance worker: 2 hours to maintain oxygen
- Oxygen specialist: 1 hour to maintain oxygen (2x speed)

This creates incentive to hire specialists for critical systems.

### Power Technicians (10 workers, subset of maintenance)

**Role**: Expert maintenance on power generation and distribution

**Specialization**:
- 2x faster at power maintenance
- Can repair emergency power systems
- Can diagnose power cascades

**Key responsibility**: Power system is hub (affects everything)

**Behaviors**:
- Constant monitoring of power levels
- Preventative maintenance on power system
- Quick response to power emergencies

**Example**: Power failure
- General maintenance: 30 minutes repair time
- Power technician: 15 minutes repair time
- Building can restore power faster with specialists

### Water Technicians (8 workers, subset of maintenance)

**Role**: Expert on water system and contamination

**Specialization**:
- 2x faster at water maintenance
- Can purify contaminated water (treatment)
- Can diagnose disease sources

**Key behavior**: When disease outbreak, water technicians investigate water contamination

### Farm Workers (50 total)

**Role**: Grow food, harvest crops

**Behaviors**:
```
Harvest cycle (3 days):
Day 1: Plant seeds (1 worker, 1 hour)
Day 2-3: Grow (automatic, no worker needed)
Day 4: Harvest (1 worker, 4 hours)
Result: 10 rations per farm

Efficiency:
- 1 farm, 1 worker: 10 rations/cycle (4 hours work)
- 5 farms, 5 workers: 50 rations/cycle (4 hours work each)
- 5 farms, 2 workers: 20 rations/cycle (10 hours work each)
```

**Contingencies**:
- Power down → No effect on farms (but may affect grow lights in future)
- Water system down → Crops wilt, produce 50% yield
- Disease in water → Contaminated crops, but still harvestable

**Specialization** (future):
- Agricultural experts: Grow crops 20% faster
- Pest control: Keep yields high

### Kitchen Workers (20 total)

**Role**: Process crops into meals

**Behaviors**:
```
Processing cycle:
Input: Raw crops (quantity from farms)
Processing: 4 hours per batch
Output: Meals

Example:
- 50 crops available, 20 workers
- Processing: 50 crops → 50 meals (1:1 conversion)
- Time: 4 hours for 20 workers
- Meals produced: 50 meals

Efficiency:
- 20 workers: Process 50 crops in 4 hours
- 10 workers: Process 25 crops in 4 hours (bottlenecked)
- 5 workers: Process 12.5 crops in 4 hours

Formula: Meals_produced = (Crops_available * Workers) / 20 per 4 hours
```

**Contingencies**:
- No crops available → Workers idle (no production)
- Power down → Equipment stops (no production)
- Emergency food deployed → Distribute instead of process

**Specialization** (future):
- Master chefs: Process 20% more from same crops
- Food safety: Reduce food spoilage/waste

### Cleaners (20 total)

**Role**: Maintain sanitation, reduce disease vectors

**Behaviors**:
```
Cleaning cycle:
- Sweep common areas (30 min)
- Clean medical facilities (30 min)
- Disinfect contaminated areas (60 min if disease)
- Break (30 min)
- Repeat

Disease prevention:
- Without cleaners: Disease spreads 100%
- With cleaners: Disease spread 30% (70% reduction)
- More cleaners = better disease control
```

**Emergency response**:
- Disease outbreak → Focus on medical facility cleaning
- Disinfection removes contamination risk
- Reduces disease spread rate

**Example**: Disease outbreak
- With 20 cleaners: Disease spread reduced to 30% normal rate
- With 10 cleaners: Disease spread reduced to 60% normal rate
- With 0 cleaners: Disease spread unchecked (100%)

This makes cleaners valuable during epidemics.

### Managers/Dispatchers (5 total)

**Role**: Coordinate workers, assign tasks, manage priorities

**Behaviors**:
```
Management cycle:
- Monitor all system statuses (continuous)
- Receive alerts from maintenance (continuous)
- Assign workers to priorities (every 30 min)
- Mediate conflicts (worker scheduling)
- Report status to player (optional UI)

Priority assignment:
1. Emergency: System at 0% health
2. Critical: System below 20% health
3. High: System below 50% health
4. Normal: Preventative maintenance
5. Low: Non-critical tasks

When multiple emergencies:
- Manager makes priority decision
- Highest-criticality emergency gets most workers
- Other emergencies queued
```

**Decision-making**:
- Managers use rules (oxygen > power > water > food)
- Can recognize cascades (power down affects oxygen backup)
- Adapt to emergencies (reallocate workers)

**Example**: Power and oxygen both degraded
- Power at 20% health, oxygen at 30% health
- Both flagged for maintenance
- Manager assigns priority: Oxygen is more critical (game over threat)
- Oxygen gets 8 workers, power gets 3
- If power then fails: Oxygen workers continue, power emergency workers called
- Cascading failures are visible through manager assignments

## System Maintenance Specifications

### Oxygen System Maintenance

**Maintenance worker time**: 2 hours per oxygen specialist (1 hour with specialist)

**What happens**:
- Cleaner filters (accumulated Venus dust)
- Check seals and connections
- Replace degraded components
- Restores health to 100%

**Emergency repair**: 4x workers, 30 minutes completion time

### Power System Maintenance

**Maintenance worker time**: 3 hours per power technician (1.5 hours with specialist)

**What happens**:
- Inspect fuel cells
- Replace worn thermal regulators
- Check electrical distribution
- Restores health to 100%

**Emergency repair**: 8x workers, 30 minutes completion time

### Water System Maintenance

**Maintenance worker time**: 2 hours per water technician (1 hour with specialist)

**What happens**:
- Check pumps and pipes
- Treat contamination (if present)
- Clean filters and reservoirs
- Restores health to 100%

**Contamination treatment**: 1 hour with water technician (vs. 2 hours general)

### Food Production Maintenance

**Farm maintenance**: Part of farming cycle (no separate maintenance)
- Crops need water: If water down 2+ days, yield reduced
- Equipment needs power: If power down, equipment can't run
- But farm growing cycle continues

**Kitchen maintenance** (equipment): 1 hour general maintenance, 30 min with specialist
- Clean equipment
- Replace worn parts
- Restores processing capacity

## Agent Coordination Scenarios

### Scenario 1: Oxygen Failure → Automatic Response

**Hour 0**: Oxygen system fails
- Manager: Receives critical alert "Oxygen 0%"
- Decision: Maximum priority to oxygen
- Assignment: All 8 oxygen specialists + 12 general maintenance

**Hour 0:15**: Workers redirect
- Oxygen specialists arrive at scrubber facility
- General maintenance workers begin assisting
- Total: 20 workers on emergency oxygen repair

**Hour 0:30**: Repair in progress
- Oxygen specialists lead repair (experts)
- General maintenance assist
- Time estimate: 30 minutes with 20 workers
- Players see: Activity at oxygen facility, workers crowding

**Hour 1:00**: Repair complete
- Oxygen system health: 100% restored
- Oxygen production: Back to normal
- Workers reassigned to other priorities

**Result**: Emergency response from agents, no player input needed (automatic)

### Scenario 2: Multiple Failures Require Triage

**Given**:
- Power failing (health 15%)
- Water degrading (health 40%)
- Food production behind (farm workers fatigued)
- 30 total maintenance workers

**Crisis decision**:
- Manager must allocate 30 workers across multiple priorities
- Oxygen: Healthy (no workers)
- Power: 15 workers (urgent, prevents cascade)
- Water: 8 workers (important, disease vector)
- Food: 7 workers (normal maintenance)

**Result**: Worker allocation reflects priorities

If player disagrees with manager's priorities (future mechanic), could override.

### Scenario 3: Cascade Through Agent Reallocation

**Hour 0**: Power begins degrading (health 50%)
- Manager: Assigns 5 workers to power maintenance
- Other priorities: Normal staffing

**Hour 2**: Emergency alert - Power critical (health 20%)
- Manager: Escalates power, adds 5 more workers
- Workers pulled from: Water (now 4), Food (now 3)
- Power now: 10 workers

**Hour 4**: Emergency alert - Power failing (health 5%)
- Manager: Emergency all-hands response
- Available workers: 5 idle
- All reassigned to power emergency
- Water: Down to 4 workers
- Food: Down to 3 workers

**Hour 5**: Power restored (health 100%)
- Workers: Reassigned back to normal tasks
- Water: Degraded 15% during shortage (but survived)
- Food: Slightly behind schedule (but okay)

**Result**: Power emergency created secondary effects (water degraded, food behind) visible through agent reallocation, not scripted cascades

## Definition of Done

This specification is complete when:
- [ ] All 9 agent types defined with behaviors
- [ ] System maintenance times specified for each type
- [ ] Specialist advantages defined (2x faster, etc.)
- [ ] Agent coordination rules specified
- [ ] Manager decision-making specified
- [ ] Contingency behaviors for each type defined
- [ ] Emergency response behaviors specified
- [ ] Agent fatigue effects on work specified
- [ ] Worker assignment priorities specified

## Next Steps (Planning Phase)

1. Define exact maintenance times per system
2. Specify specialist bonuses (2x speed, diagnostics, etc.)
3. Create agent assignment UI (optional player override)
4. Plan manager decision algorithm (priority weighting)
5. Specify agent communication/coordination (if any)
6. Define emergency response protocols
7. Specify agent skill leveling (optional: workers improve over time)
8. Plan agent recruitment/training (hiring new workers)
