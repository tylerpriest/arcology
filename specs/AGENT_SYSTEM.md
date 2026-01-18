# Agent-Based Simulation System

**Scope**: Framework for 500+ independent agents with behaviors, scheduling, task allocation enabling emergent gameplay.

**Audience**: Systems Operator, Game Designer

**Related JTBDs**: JTBD 8 (500+ agents), JTBD 9 (emergent gameplay)

**Status**: 🚧 In Progress (Enables deep simulation)

## Overview

Instead of abstract "food production = 50 rations/day", the system has:
- **50 farm agents** tending crops
- **20 kitchen agents** processing food
- **30 maintenance workers** repairing systems
- **150+ resident agents** living, working, eating, sleeping
- **Plus service agents** (cleaners, processors, technicians)

**Total: 500+ agents** each with simple behaviors that create emergent complexity.

Agent-based simulation enables:
- **Visibility**: Player sees WHO is doing what, not just abstract numbers
- **Tangibility**: Infrastructure maintenance is visible (workers repairing)
- **Emergence**: Agents interact in unpredictable ways (busy workers = delayed repairs)
- **Stories**: "5 maintenance workers stuck in elevator" is drama
- **Learning**: Player understands why systems fail (workers too busy elsewhere)

Instead of **"why did food production drop?"** → **"oxygen failure called away 3 food processors"**

## Capabilities

The system should:
- [ ] Create 500+ agents at game start with initial properties (type, role, location)
- [ ] Assign agents to tasks based on availability and priority
- [ ] Schedule agent behaviors (work times, break times, sleep times)
- [ ] Track agent state (location, current task, health, fatigue)
- [ ] Move agents through building (use resident movement system)
- [ ] Calculate task completion time (depends on worker count, priority)
- [ ] Handle agent conflicts (two agents want same resource)
- [ ] Reassign agents when systems change (emergency prioritizes repairs)
- [ ] Track agent efficiency (tired workers = slower work)
- [ ] Display agent status to player (optional: see what agents are doing)
- [ ] Enable emergent behavior (agents choosing different tasks creating cascades)

## Acceptance Criteria

Success means:
- [ ] **500+ agents present in game** - Can create 500 agents without performance impact - Verify: create 500 agents, measure memory/CPU
- [ ] **Agents have tasks** - Each agent assigned to work, rest, or idle - Verify: all agents have state showing current activity
- [ ] **Task completion depends on agent count** - More workers = faster completion - Verify: 10 workers complete task 2x faster than 5 workers
- [ ] **Agents move through building** - Visible on screen going to work locations - Visual test: watch agents walk to farms/kitchens
- [ ] **Agent fatigue affects speed** - Tired agents work slower - Verify: tired agent work speed 50% of rested agent
- [ ] **Emergencies reassign agents** - Power failure calls maintenance workers - Verify: when power fails, 5 maintenance workers redirect to power system
- [ ] **Conflicts are resolved** - When multiple needs compete, priority system works - Verify: medical emergency takes priority over maintenance
- [ ] **Agent behavior creates emergence** - Unexpected consequences from agent interactions - Verify: oxygen failure calls away maintenance, causing power repair delay, cascading failures
- [ ] **Player can observe agents** (optional) - UI can show what agents are doing - Verify: UI panel shows "10 farm workers, 8 kitchen workers, 5 maintenance workers"

## Scenarios by Example

### Scenario 1: Normal Operation (Agents Working Smoothly)

**Given**:
- 50 farm agents tending crops
- 20 kitchen agents processing food
- 30 maintenance workers maintaining systems
- 150 resident agents living/working
- All systems healthy

**When**: Time advances normally, no crises

**Then**:
- Farm agents: Working in farms, harvesting crops regularly
- Kitchen agents: Processing crops into meals consistently
- Maintenance workers: Rotating through maintenance schedule
- Food production: 50 rations/day (from 50 farm agents working)
- Food processing: 50 rations/day (from 20 kitchen agents)
- Systems: Well-maintained (maintenance workers keeping health at 100%)
- Food balance: Steady surplus

**And**:
- Residents: Being fed regularly, no complaints
- Building: Functioning optimally
- No visible crises

### Scenario 2: Oxygen Failure Cascade (Agents Scramble)

**Given**:
- Oxygen system fails (health 0%)
- Maintenance workers initially distributed across all systems
  - 10 working on power
  - 8 working on water
  - 7 working on food systems
  - 5 idle

**When**: Oxygen fails → immediate crisis alert

**Then** (minute 0):
- Oxygen maintenance priority: CRITICAL (highest)
- 5 idle workers immediately assigned to oxygen repair
- Result: 5 workers on oxygen repair

**Within 1 minute** (minute 1):
- Oxygen repair estimated time: 15 minutes with 5 workers
- But oxygen critical in 10 minutes
- Priority system escalates: "Need more workers"
- 3 workers reassigned from water maintenance to oxygen
- New distribution:
  - Oxygen: 8 workers (was 5)
  - Water: 5 workers (was 8)
  - Power: 10 workers (unchanged)
  - Food: 7 workers (unchanged)

**At minute 3**:
- Water maintenance falls behind due to only 5 workers
- Water system health starts degrading faster
- But oxygen still on track for repair

**At minute 8**:
- Oxygen repair on schedule (5 min remaining with 8 workers)
- Water maintenance now 2 days behind schedule
- Power maintenance continues normally
- Food production continuing (no agent shortage)

**At minute 13**:
- Oxygen repair completes
- Maintenance workers complete emergency oxygen repair
- 3 workers reassigned back to water maintenance
- Water maintenance back to normal staffing
- Crisis resolved

**Result**:
- Oxygen system restored (health 100%)
- Water maintenance delayed 2 days (health degraded slightly, but no failure)
- Overall: Crisis managed through agent reallocation

**What happened**: Agents dynamically reallocated to handle emergency. This created secondary effect (water maintenance fell behind) but manageable.

**Lesson**: "When crisis hits, agents redirect. Can create secondary problems if not careful."

### Scenario 3: Perfect Storm (Multiple Agents Tied Up)

**Given**:
- 30 total maintenance workers
- Power system needs major repair (12 workers, 30 minutes)
- Oxygen needs urgent maintenance (8 workers, 15 minutes)
- Water has critical failure (10 workers, 25 minutes)
- Food processing equipment breaks (6 workers, 20 minutes)

**Total needed**: 36 worker-units (but only 30 available)

**When**: All 4 systems need repair simultaneously

**Then** (game-time):
- Priority assignment:
  1. Oxygen: CRITICAL (8 workers assigned) - most dangerous
  2. Water: CRITICAL (6 workers assigned) - disease risk
  3. Power: HIGH (8 workers assigned) - affects everything
  4. Food: MEDIUM (6 workers assigned - wait, that's 28, we need 30 total)
  
Wait, let me recalculate:
- Oxygen: 8 workers (critical)
- Water: 8 workers (critical)
- Power: 8 workers (critical)
- Food: 6 workers (medium)
- Total: 30 workers (all allocated, none idle)

**Outcome**:
- Oxygen repair: 15 min (on schedule)
- Water repair: ~30 min (slower, understaffed)
- Power repair: ~45 min (slower, understaffed)
- Food repair: ~30 min (slower, understaffed)

**At minute 15**:
- Oxygen repair completes
- 8 workers freed
- Reassigned to power (now has 16, can finish in ~20 min)

**At minute 20**:
- Power repair completes
- Elevators come back online (if they were down)
- 8 workers freed
- Reassigned to water (already has 8, now 16, can finish in ~12 min)

**At minute 32**:
- Water repair completes
- 8 workers freed
- Food processing still working (6 workers) - completes ~minute 30

**Timeline**:
- Oxygen: Online minute 15 ✓
- Power: Online minute 20 ✓
- Water: Online minute 32 ⚠️ (delayed, but before disease outbreak)
- Food: Online minute 30 ✓

**Result**: Everything eventually fixed, but water delayed longer. No cascading failure because power restored in time to help water repair.

**Lesson**: "Multiple crises can overload workers. Prioritization matters. Sequential fixing is better than simultaneous attempt."

### Scenario 4: Agent Fatigue (Tired Workers)

**Given**:
- 50 farm workers working 16 hours/day for 10 days (overtime)
- All fatigued (efficiency 60% of normal)
- Food production dropping (expected 50 rations, getting 30)

**When**: Building faces food shortage from fatigue

**Then**:
- Food production: 50 × 0.6 (fatigue) = 30 rations/day
- Food consumption: 100 rations/day (for 150 residents)
- Deficit: 70 rations/day

**Player observes**:
- Food inventory dropping rapidly
- UI shows "Farm workers fatigued (60% efficiency)"

**Player's options**:
1. Give workers 1-day rest (production stops, but workers recover to 100%)
2. Build more farms (hire more workers)
3. Accept food shortage (emergency rations, consume reserves)

**Player chooses**: Give workers rest day
- Day 1: No food production (0 rations)
- Day 2: Food production back to normal (50 rations)
- Net: -100 day 1 + 50 day 2 = -50 total rations for 2 days

**Result**:
- Workers recovered
- Food production normal again
- But 100 rations consumed from reserves

**Lesson**: "Overworking agents reduces efficiency. Need to manage worker schedule."

## Edge Cases & Error Handling

**Edge Cases**:
- **No workers available for task**: Task queued, waits for worker
- **Worker dies**: Task reassigned to another worker
- **Agent moves to wrong location**: Pathfinding error, agent reroutes
- **Task completion changes mid-task**: Priority change, worker reassigned
- **Agent stuck (elevator broken, blocking path)**: Alternate path or wait
- **Two agents compete for same resource**: Queue system, first-come-first-served
- **Too many agents in same room**: Congestion slowdown (agents move slower)

**Error Conditions**:
- **Agent count mismatch**: Log error, count agents
- **Task allocation fails**: Revert to previous allocation
- **Agent state corrupted**: Reset to idle state

## Performance & Constraints

**Performance Requirements**:
- Agent update <1ms per agent (500 agents = <500ms, but spread across frames)
- Task assignment <10ms (when priorities change)
- Pathfinding for agents <2ms per agent
- Total agent system <50ms per frame (60 FPS = 16ms available, but 3 frames = 50ms acceptable)

**Technical Constraints**:
- Each agent: position, state, task, health, fatigue
- Task system: priority queue, assignment algorithm
- Agent types: Resident, Maintenance, Farm, Kitchen, Technician (extensible)
- Task types: Maintain, Repair, Produce, Work, Rest (extensible)

**Design/Business Constraints**:
- Agents not fully visible (too many to display all)
- But visibility of critical agents important (where are maintenance workers?)
- Agents shouldn't feel random (behavior must be understandable)
- Agent UI optional but useful (current activity display)

## Integration Points

**Systems this depends on**:
- **RESIDENT_MOVEMENT.md**: Agents move through building
- **Building System**: Agent locations, room types
- **TimeSystem**: Agent scheduling based on time
- **All maintenance systems**: Agents maintain oxygen, power, water, food

**Systems that depend on this**:
- **MAINTENANCE_SYSTEM.md**: Maintenance completion depends on agent count
- **FAILURE_CASCADES.md**: Agents getting pulled away from maintenance causes cascades
- **OXYGEN_SYSTEM.md, POWER_SYSTEM.md, WATER_WASTE_SYSTEM.md, FOOD_CHAINS.md**: All depend on agents
- **INFRASTRUCTURE_AGENTS.md**: Specific agent types working on systems

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] 500 agents created without crash or memory overload
- [ ] Task assignment works (agent assigned to task, completes it)
- [ ] Task time scales with agent count (2x agents = 0.5x time)
- [ ] Fatigue affects agent efficiency (<100% when tired)
- [ ] Priority reassignment works (agents switch tasks on emergency)
- [ ] Agent pathfinding works (agents reach task locations)
- [ ] Agents rest properly (recover from fatigue)

**Visual/Behavioral tests** (human observation):
- [ ] Agents visible moving through building (at least critical ones)
- [ ] Agents appear to be working (at jobs, performing tasks)
- [ ] Emergency causes visible agent scramble (workers redirecting)
- [ ] Fatigued agents visible slower (movement reduced)
- [ ] System health affects agent assignments (critical systems get more workers)

**Integration tests**:
- [ ] Oxygen repair completion depends on agent count
- [ ] Maintenance worker shortage causes system degradation
- [ ] Emergency prioritization actually reassigns workers
- [ ] Agent fatigue causes production slowdown
- [ ] Multiple crises cause agent contention

## Agent Types (Proposal)

| Type | Count | Role | Where |
|------|-------|------|-------|
| **Resident** | 150+ | Live, work, consume | Apartments, offices, kitchens |
| **Farm Worker** | 50 | Tend crops, harvest | Farms |
| **Kitchen Worker** | 20 | Process food, prepare meals | Kitchens |
| **Maintenance Worker** | 30 | Maintain all systems | Maintenance areas |
| **Power Technician** | 10 | Maintain power system | Power generation |
| **Oxygen Specialist** | 8 | Maintain scrubbers | Oxygen systems |
| **Water Technician** | 8 | Maintain water/sewage | Water systems |
| **Cleaner** | 20 | Keep building clean | Common areas |
| **Medical Staff** | 5-15 | Treat patients | Medical facilities |
| **Manager/Dispatcher** | 3-5 | Assign tasks, prioritize | Central location |

**Total**: 350-520 agents depending on building size

Each agent type has simple behaviors that create complex interactions.

## Behavioral Rules (High-Level)

**Farm Worker**: 
- "Go to farm → Work while healthy → Produce food"
- When health low → Rest
- When emergency → Help with other tasks

**Maintenance Worker**:
- "Check system health → If degraded, maintain → If failed, repair"
- Priority: Oxygen > Power > Water > Food > Other
- When multiple systems need repair → Highest priority first

**Resident**:
- "Sleep, wake, work, eat, relax"
- "If sick → Go to medical"
- "If hungry → Get food"
- "If scared → Panic" (during crises)

Full behavioral rules specified in AGENT_EMERGENCE.md

## Definition of Done

This specification is complete when:
- [ ] Agent framework architecture specified
- [ ] Agent types defined (9-10 types)
- [ ] Task system defined (priority, assignment, completion)
- [ ] Scheduling system defined (sleep, work, rest cycles)
- [ ] Fatigue system specified (affects efficiency)
- [ ] Performance requirements met (<50ms per frame)
- [ ] Integration points mapped (how agents interact with other systems)
- [ ] UI options designed (optional agent display)
- [ ] Testing strategy complete

## Next Steps (Planning Phase)

1. Define exact task completion formulas (base time / agent count)
2. Specify fatigue recovery rates
3. Define priority system for task assignment
4. Design agent UI (optional display of agent activity)
5. Plan behavioral rules for each agent type (AGENT_EMERGENCE.md)
6. Specify emergent behavior scenarios
7. Plan performance optimization strategies
8. Define agent persistence in save/load
