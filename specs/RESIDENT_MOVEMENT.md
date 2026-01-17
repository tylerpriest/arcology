# Resident Movement & Pathfinding

**Scope**: Residents walk through the building using physics-based pathfinding, with movement taking time proportional to distance.

**Audience**: Resident Observer, Arcology Architect

**Related JTBDs**: JTBD 5 (residents walk, not float), JTBD 10 (navigate corridors realistically), JTBD 2 (lobby congestion creates expansion need)

**Status**: 🚧 In Progress (Replacing teleportation system)

## Overview

Residents move between rooms by walking through corridors and using vertical transport (elevators/stairs). Movement is not instantaneous—it takes time proportional to distance and floor changes. This creates:

- **Natural congestion**: Multiple residents using same corridors simultaneously
- **Schedule pressure**: Movement time affects whether residents arrive on time
- **Spatial problem-solving**: Building layout directly affects resident flow
- **Emergent gameplay**: Congestion creates need for lobby extension without being scripted

The movement system grounds the arcology in physical reality, making it feel like a place where people navigate infrastructure rather than an abstract management game.

## Capabilities

The system should:
- [ ] Calculate shortest pathfinding between any two rooms accounting for walls, floors, obstacles
- [ ] Animate residents walking along paths with smooth movement
- [ ] Track movement time based on distance and floor changes
- [ ] Create congestion when multiple residents use same corridors simultaneously
- [ ] Integrate with resident schedules (affect arrival times, punctuality)
- [ ] Support variable movement speed by resident type (office workers faster, children slower)
- [ ] Handle elevator/stair usage as part of movement
- [ ] Update movement in real-time as lobby dimensions change
- [ ] Display residents visually along paths (not teleporting)
- [ ] Log movement times for analytics and player observation

## Acceptance Criteria

Success means:
- [ ] **Movement time is consistent and predictable** - Same path takes same time every playthrough - Verify: movement time logged and consistent
- [ ] **Time calculation includes floor changes** - Going up 5 floors takes proportionally longer than 1 floor - Verify: movement time with 1 floor vs. 5 floors differs by 4x
- [ ] **Residents walk visibly from source to destination** - No teleportation, smooth animation - Visual test: watch resident walk from lobby to apartment
- [ ] **Movement time affects schedule adherence** - Resident arriving at 8:05 AM when 8:00 AM meeting starts is "late" - Verify: resident.isLate = true when arrival_time > scheduled_time
- [ ] **Congestion affects movement speed** - Corridor with 20 residents is slower than empty corridor - Verify: congested corridor movement 1.5-2x slower than empty
- [ ] **Pathfinding avoids walls and obstacles** - Residents never walk through solid walls - Visual/programmatic test: verify path contains no wall intersections
- [ ] **Variable speeds by resident type** - Office worker walks faster than child - Verify: office_worker_speed > child_speed
- [ ] **Movement updates dynamically with building changes** - If lobby extended mid-movement, congestion decreases - Visual test: movement slows → lobby extended → resident speeds up
- [ ] **All residents moving simultaneously maintain 60 FPS** - Even with 100+ residents moving - Performance test: profiler shows <16ms frame time

## Scenarios by Example

### Scenario 1: Simple Morning Commute (One Resident)

**Given**: Resident "Marcus" lives in apartment on floor 3, works in office on floor 5

**When**: Time advances to 8:00 AM (Marcus's work start time)

**Then**: 
- Marcus leaves apartment
- Walks to lobby (approximately 3 seconds)
- Waits in elevator queue (0-5 seconds depending on congestion)
- Rides elevator to floor 5 (2 seconds)
- Walks to office (2 seconds)
- Arrives at 8:07 AM

**And**: 
- Marcus.isLate = true (arrived after 8:00 start time)
- His productivity is slightly reduced (late arrival noted in daily log)
- Elapsed movement time: 7 seconds (tracked in resident.movementLog)

### Scenario 2: Rush Hour Congestion (Multiple Residents)

**Given**: 
- 20 office workers on floors 1-4
- All scheduled to work on floor 5-10
- All start times staggered by 1 minute (8:00, 8:01, 8:02... 8:20)

**When**: Time advances through 8:00-8:20 AM

**Then**:
- First resident (8:00 start) finds empty lobby, quick elevator, arrives 8:02
- By 8:15, lobby has 15 residents waiting for elevator
- Residents arriving after 8:15 experience:
  - Crowded corridor (visual bunching)
  - Long elevator queue (5-10 second wait)
  - Slower overall movement (congestion penalty)
  - Later arrival times (8:20+)

**And**:
- Elevator queue is visibly full
- Residents stand in queue, not disappear
- Queue processes in FIFO order
- Later residents observe this and can see why they're delayed

### Scenario 3: Multi-Floor Commute (Distance Matters)

**Given**: Resident "Yuki" lives on floor 1, works on floor 12

**When**: Yuki walks at 8:00 AM

**Then**:
- Lobby walk: 2 seconds
- Elevator queue: 2 seconds (assuming empty)
- Elevator ride (11 floors): 4 seconds (takes longer for distance)
- Corridor walk to office: 3 seconds
- **Total: 11 seconds** (takes 4x longer than 1-floor resident)

**And**:
- Yuki arrives at 8:11 AM (11 seconds later than 8:00 start)
- Yuki is marked late
- Yuki's schedule is updated: expected movement time 11 seconds added to future calculations

### Scenario 4: Lobby Extension Changes Movement (Dynamic Update)

**Given**: 
- Lobby is 20 units wide
- 15 residents in lobby, congested, moving slow (moving at 50% base speed)
- 5 residents waiting in elevator queue

**When**: Player extends lobby to 30 units wide

**Then**:
- Immediately: Congestion metric drops (fewer residents per unit area)
- Immediately: Residents spread out (visual change, less bunching)
- Immediately: Movement speed increases (back to base speed)
- Next resident in queue: Experiences shorter queue wait
- Next commute: All residents moving faster

**And**:
- Movement time through lobby drops from 5 seconds to 2.5 seconds
- Residents arriving on time when previously late
- Player observes: smoother traffic, happier residents

### Scenario 5: Stairs vs. Elevator Trade-off

**Given**: 
- Elevator is broken (under maintenance, 30-minute repair)
- 10 residents in elevator queue waiting

**When**: Elevator breaks, residents must reroute

**Then**:
- Residents in queue detect elevator failure
- Reroute to stairs (if available)
- Stair movement slower (requires climbing animations)
- Movement time increases 50% (stairs slower than elevator)
- Stairs can handle fewer simultaneous residents (capacity limit)

**And**:
- Stair queue forms instead of elevator queue
- Some residents may timeout/cancel activity if stairs too crowded
- Player observes: increased congestion during elevator maintenance
- Lesson: Elevator reliability affects flow

## Edge Cases & Error Handling

**Edge Cases**:
- **Residents blocked by construction zone**: Pathfinding returns null (no valid route) → resident stays in current room and waits 30 seconds, then retries
- **Multiple residents same tile simultaneously**: All occupy same space (visual overlap) → movement continues, game handles overlap gracefully
- **Elevator capacity exceeded**: Queue prevents boarding → residents wait in queue, respecting capacity
- **Pathfinding request > 50 floor difference**: Flag as unusual but allow (sky lobbies handle this) → add extra time penalty
- **Resident movement interrupted by system failure**: Mid-elevator resident experiences emergency descent → 3-second descent + floor shaking animation
- **Path deleted during movement** (room demolished): Resident at destination instead, movement time refunded
- **Movement timeout** (resident stuck >5 minutes): Flag as error, teleport to destination (emergency)

**Error Conditions**:
- **Pathfinding infinite loop**: Timeout after 1 second, use A* fallback algorithm
- **No valid path exists**: Return error, resident stays in origin room, reschedules activity
- **Performance spike** (movement calculation >50ms): Defer calculation next frame
- **Memory leak** (movement vectors accumulate): Clear completed movement objects after 5 minutes

## Performance & Constraints

**Performance Requirements**:
- Pathfinding for any start/destination: <50ms (even with 500+ agents moving)
- Path updates when lobby extended: <100ms (not frame-blocking)
- Simultaneous movement of 100+ residents: maintains 60 FPS
- Movement animation smooth at 60 FPS (no stuttering)
- Memory for movement objects: <10MB (even with 500 active movements)

**Technical Constraints**:
- Movement system must integrate with existing ElevatorSystem (queue mechanics)
- Pathfinding must account for dynamic obstacles (other residents, construction)
- Movement time calculations feed into ResidentSystem schedules
- Visual movement must match calculated time (no desync)
- Movement affects congestion metrics which affect resident satisfaction

**Design/Business Constraints**:
- Movement feels organic, not mechanical or jerky
- Player must be able to observe and understand movement patterns
- Congestion must be visually clear (player can diagnose problems)
- Movement time must be predictable (residents plan activities based on commute time)
- Walking should feel like real infrastructure, not padding/busywork

## Scenarios by Example (Extended)

### Scenario 6: The Cascading Jam (Multiple Issues)

**Given**:
- Normal traffic: lobby 20 units, efficient flow
- Suddenly: elevator breaks (maintenance starts)
- All residents reroute to stairs
- Stairs 2 units wide, can't handle all traffic

**When**: 10 residents simultaneously try to reach stairs

**Then**:
- Stairs form queue of 10 residents
- Movement speed in stairwell: 0.3x normal (stairs are slow)
- Corridor leading to stairs: 0.5x normal (bottleneck)
- Residents arriving to work 2-3 minutes late
- Domino effect: office workers late → productivity down → less income

**And**:
- Player observes: massive visible jam in stairwell
- Player realizes: need more stairs OR fix elevator urgently
- Creates decision: spend $1,000 to extend stairs OR $5,000 to fix elevator early?

## Integration Points

**Systems this depends on**:
- **ElevatorSystem**: Movement uses elevator queue mechanics, capacity limits
- **StairSystem**: Movement uses stairs when elevators unavailable
- **TimeSystem**: Movement time calculated in-game minutes/seconds
- **ScheduleSystem**: Movement time affects whether resident arrives on time
- **RoomSystem**: Start/end points for pathfinding
- **BuildingSystem**: Building layout (walls, room boundaries) for pathfinding

**Systems that depend on this**:
- **CongestionSystem**: Movement density creates congestion metrics
- **ResidentSystem**: Arrival times and schedule adherence depend on movement time
- **EconomySystem**: Late arrivals reduce productivity → reduce income
- **SatisfactionSystem**: Movement delays affect resident happiness
- **LobbyExtensionSystem**: Player extends lobby to improve movement flow

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated, measurable):
- [ ] Pathfinding returns valid route between any two rooms
- [ ] Movement time consistent for same path (±0.2 second variance)
- [ ] Floor changes add proportional time (11 floors ≈ 4x vs. 1 floor)
- [ ] Congestion reduces movement speed measurably (>20 residents = 50% speed reduction)
- [ ] Elevator queue processes FIFO, respects capacity
- [ ] Schedule integration: late arrivals marked correctly
- [ ] Performance: pathfinding <50ms, movement <16ms per frame with 100+ residents

**Visual/Behavioral tests** (human observation):
- [ ] Residents walk smoothly, no teleportation
- [ ] Movement matches calculated time (visual spot-check)
- [ ] Congestion visually apparent (residents bunched)
- [ ] Elevator queue forms and processes visibly
- [ ] Lobby extension noticeably improves traffic flow
- [ ] Stair usage looks like fallback (residents hesitant to use stairs)
- [ ] Emergency descent from broken elevator is visually dramatic

**Integration tests**:
- [ ] Movement time feeds into schedule system (arrival times updated)
- [ ] Congestion metrics used by satisfaction system (verified in resident mood)
- [ ] Lobby extension immediately improves flow (next movement faster)
- [ ] Elevator failure forces stairs (verified path calculation)

## Definition of Done

This specification is complete when:
- [ ] All acceptance criteria defined and testable
- [ ] All scenarios documented with expected outcomes
- [ ] Edge cases identified and recovery behavior specified
- [ ] Integration points mapped to dependent systems
- [ ] Performance requirements defined with metrics
- [ ] Testing strategy complete with success conditions
- [ ] Technical feasibility confirmed (pathfinding algorithm chosen)

## Next Steps (Planning Phase)

1. Choose pathfinding algorithm (A*, Dijkstra, simple grid search)
2. Define movement speed constants by resident type
3. Define congestion penalty function (how many residents = how much slowdown)
4. Define elevator/stair queue behavior in detail
5. Design movement animation system (smooth interpolation)
6. Plan integration with CongestionSystem (to be specified)
