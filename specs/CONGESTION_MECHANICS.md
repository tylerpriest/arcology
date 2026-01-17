# Congestion Mechanics

**Scope**: Bottlenecks form naturally when multiple residents use same corridors/elevators simultaneously, creating visual and mechanical consequences.

**Audience**: Arcology Architect, Resident Observer

**Related JTBDs**: JTBD 2 (extend lobby to solve congestion), JTBD 5 (residents walk, creating congestion), JTBD 10 (navigate bottlenecks realistically)

**Status**: 🚧 In Progress (New system for walking-based movement)

## Overview

When many residents travel through the same space (lobby, stairwell, elevator queue), congestion emerges naturally. Congestion is not scripted—it emerges from residents following realistic movement patterns.

Congestion has consequences:
- **Movement slows**: Residents move at 30-70% of normal speed in congested areas
- **Schedules affected**: Residents arrive late to work, meetings, activities
- **Visually apparent**: Residents bunch together, creating observable jams
- **Solvable by player**: Extending lobby or adding stairs reduces congestion
- **Creates feedback loop**: Player sees problem → extends lobby → congestion goes away → building gets bigger → congestion returns at larger scale

This creates the **Traffic Loop** (JTBD 2), where congestion is a real problem with real solutions.

## Capabilities

The system should:
- [ ] Calculate congestion density for each space (residents per unit area)
- [ ] Apply movement speed penalty based on congestion level
- [ ] Update congestion metrics in real-time as residents move
- [ ] Display visual indicators of congestion (resident bunching, color shift)
- [ ] Integrate with resident satisfaction (congestion reduces morale)
- [ ] Track peak congestion times (when is traffic worst)
- [ ] Measure effectiveness of player solutions (does lobby extension work?)
- [ ] Create emergent bottlenecks (some spaces naturally congested due to layout)
- [ ] Generate congestion reports for player analysis
- [ ] Support future crisis mechanics (overflow during emergencies)

## Acceptance Criteria

Success means:
- [ ] **Congestion forms naturally without scripting** - Multiple residents same corridor creates slowdown - Verify: measure movement speed with 1 resident vs. 20 residents
- [ ] **Congestion is visually observable** - Player can see residents bunched together - Visual test: watch residents in crowded lobby
- [ ] **Congestion has measurable impact** - Residents late to activities when congested - Verify: arrival time differs by >30 seconds when corridor congested vs. empty
- [ ] **Lobby extension reduces congestion** - Wider space = less density = faster movement - Verify: congestion metric drops 30% when lobby extended 25%
- [ ] **Peak times visible to player** - UI shows when traffic is worst (e.g., 8:00-9:00 AM) - Visual test: see congestion spike during morning rush
- [ ] **Satisfaction affected by congestion** - Residents complain when constantly delayed - Verify: resident satisfaction -5 per congestion level for each room visit
- [ ] **Different spaces have different capacity limits** - Elevator has lower capacity than stairwell - Verify: elevator holds 4 residents, stairwell holds 8
- [ ] **Overflow behavior defined** - When space full, new residents wait/queue - Verify: queue forms when capacity exceeded
- [ ] **Congestion clears after peak times** - Early morning congestion gone by noon - Verify: congestion metric returns to baseline post-rush

## Scenarios by Example

### Scenario 1: Formation of Morning Rush

**Given**: 
- 8 office workers on floor 2, all with 8:00 AM start times
- Lobby is normal 20-unit width
- No queues exist at 7:55 AM

**When**: Time advances through 8:00 AM, residents leave apartments to go to work

**Then**:
- 8:00 AM: First resident leaves floor 2 apartment
- 8:01 AM: 2nd resident leaves apartment, meets 1st resident in lobby
- 8:02 AM: 3rd resident arrives, finds 2 ahead in elevator queue
- 8:03 AM: 4th, 5th residents arrive, lobby crowded (5 residents in 20-unit space)
- 8:04 AM: 6th, 7th, 8th residents arrive, lobby very crowded (8 residents, 0.4 per unit)
- Congestion level: 70% (high, approaching overflow)

**And**:
- First resident reaches elevator by 8:03 (3 seconds in lobby + queue wait)
- Last resident reaches elevator by 8:07 (5 seconds in lobby + queue wait)
- All residents experience 2-3 second movement delay due to crowding
- All arrive at work between 8:05-8:09 (5-9 minutes late)

### Scenario 2: Capacity Overflow

**Given**: 
- Elevator can hold 4 residents maximum
- 10 residents waiting to board
- Queue forms in lobby

**When**: Queue reaches 10 residents

**Then**:
- First 4 board elevator
- Next 4 board when first 4 exit (2 seconds later)
- 3rd group of 2 board after (4 seconds later)
- Total wait: 6 seconds for last 2 residents

**And**:
- Player observes visual queue forming in lobby (residents standing)
- Residents at back of queue get increasingly unhappy (delayed, frustrated)
- If queue grows too long (>20 residents), mood drops noticeably

### Scenario 3: Lobby Extension Solves Congestion

**Given**: 
- Same 8 office workers trying to use same lobby
- Lobby currently 20 units wide
- Congestion at 70% during rush

**When**: Player extends lobby to 30 units wide (50% wider)

**Then**:
- Same 8 residents in 30-unit space = 0.27 per unit (down from 0.4)
- Congestion level: 40% (medium, much better)
- Movement speed: back to 80% of normal (was 50%)
- Resident transit time through lobby: 2 seconds (down from 5 seconds)

**And**:
- Residents now arrive 8:05-8:07 (5-7 seconds late, not 5-9)
- Player notices: "Much better flow"
- Immediately: some residents arrive on time, mood improves

### Scenario 4: Stairwell Becomes Bottleneck

**Given**:
- Elevator broken (under maintenance)
- All 20 residents must use stairs
- Stairs are 2 units wide (narrow)

**When**: Elevator goes down, residents reroute to stairs

**Then**:
- 2 units of space for 20 residents = 10 per unit (extreme congestion)
- Congestion level: 99% (critical)
- Movement speed: 20% of normal (crawling)
- Queue backs up into corridor
- Corridor congestion: 80% (affected by overflow from stairs)

**And**:
- Residents extremely unhappy (massive delays)
- Some residents give up, reschedule activities
- Player sees: "This is unsustainable"
- Lesson: Elevator reliability is critical infrastructure

### Scenario 5: Layout Creates Natural Bottleneck

**Given**:
- Lobby connects to 4 stairwells
- But only 1 stairwell leads to residential floors 1-10
- Other 3 stairwells lead to different areas

**When**: 20 residents on floors 1-10 all try to use stairs simultaneously

**Then**:
- All 20 must use same 1 stairwell (no alternatives)
- Even though total stair capacity could handle them, bottleneck at junction
- Congestion at junction: 90%
- Congestion at destination stairwell: 50%

**And**:
- Player observes: congestion at junction, not in lobby
- Realizes: building layout creates bottleneck
- Solution: build additional stairwell or reroute to alternatives
- Lesson: infrastructure planning has spatial consequences

## Edge Cases & Error Handling

**Edge Cases**:
- **One resident in space**: No congestion (0.1 per unit) - Congestion metric = 0%
- **Space exactly at capacity**: Congestion = 90% but no queue forms yet
- **Space at 2x capacity**: Queue forms, overflow behavior - Congestion = 100%+
- **Multiple connections (lobby has 3 exits)**: Congestion distributed across exits
- **Congestion fluctuates second-to-second**: Peak at 8:05, drops at 8:06 - Smooth over 5-second window
- **Construction zone blocks passage**: Residents queue before blocked passage - Congestion at checkpoint, not throughout space
- **Elevator breaks mid-transit**: 4 residents trapped, reroute those waiting to stairs - Stair congestion spikes, elevator queue clears

**Error Conditions**:
- **Congestion metric >200%**: Flag error (shouldn't happen), cap at 100% - Log anomaly for debugging
- **Queue gets stuck**: Residents waiting >5 minutes - Flag as error, unstick queue
- **Congestion doesn't update**: Space shows 0% when 20 residents present - Trigger recalculation

## Performance & Constraints

**Performance Requirements**:
- Congestion calculation <5ms per space (even with 100+ residents)
- Update every 0.5 seconds (not every frame)
- Memory for congestion tracking: <1MB (even with 100 spaces)
- Pathfinding unaffected by congestion calculations

**Technical Constraints**:
- Must integrate with RESIDENT_MOVEMENT.md (movement speed adjusted based on congestion)
- Must integrate with SatisfactionSystem (congestion affects morale)
- Congestion metrics must be visible to player (UI shows current/peak congestion)
- Must work with dynamic spaces (lobby changing size affects congestion)

**Design/Business Constraints**:
- Congestion must feel like real problem (not abstract penalty)
- Player must understand cause (too many residents in small space)
- Player must see solution (extend space, add exits, improve flow)
- Congestion shouldn't punish player, should educate (this is how cities work)

## Integration Points

**Systems this depends on**:
- **RESIDENT_MOVEMENT.md**: Movement speed penalty applied based on congestion
- **Building System**: Space dimensions affect congestion density calculation
- **ResidentSystem**: Number of residents in space determines congestion
- **TimeSystem**: Peak times (8 AM, 12 PM, 6 PM) create congestion cycles
- **ElevatorSystem**: Elevator queue contributes to congestion

**Systems that depend on this**:
- **SatisfactionSystem**: Congestion reduces resident morale (−5 per congestion level)
- **LOBBY_EXTENSION.md**: Player reduces congestion by extending spaces
- **EconomySystem**: Late arrivals from congestion reduce productivity/income
- **Diagnostics System**: Player uses congestion reports to plan improvements

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Congestion density calculated correctly (residents ÷ space area)
- [ ] Movement speed reduced proportionally (2x congestion = 0.5x speed)
- [ ] Peak times identified automatically (rush hour detection)
- [ ] Queue forms when capacity exceeded
- [ ] Lobby extension reduces congestion measurably (30-40% reduction for 50% size increase)
- [ ] Different spaces have correct capacity limits
- [ ] Congestion clears post-rush (metric returns to baseline)

**Visual/Behavioral tests** (human observation):
- [ ] Residents visibly bunch in congested areas (not spread out)
- [ ] Congestion UI shows during rush hour (turns red/orange)
- [ ] Player can diagnose congestion by observing (see where bunching is worst)
- [ ] Lobby extension visibly improves flow (residents spread out)
- [ ] Stairwell congestion looks worse than elevator congestion (narrower space)
- [ ] Peak times match actual rush hours (8 AM, 12 PM, 6 PM)
- [ ] Elevator queue visible and well-behaved

**Integration tests**:
- [ ] Movement speed actually reduces in congested areas (timed walk-through)
- [ ] Resident mood reduced during congestion (check satisfaction delta)
- [ ] Lobby extension immediately improves satisfaction (next update)
- [ ] Congestion metrics visible in UI (player sees current/peak)

## Definition of Done

This specification is complete when:
- [ ] Congestion calculation formula defined
- [ ] Speed penalty function specified
- [ ] Capacity limits for each space type defined
- [ ] UI representation designed (how player sees congestion)
- [ ] Integration with movement speed specified
- [ ] Integration with satisfaction specified
- [ ] Bottle neck behavior specified
- [ ] Peak time detection algorithm specified
- [ ] All edge cases handled

## Congestion Level Scale

Define the human experience at each level:

- **0-20%** (Empty to Light): Fast movement, smooth flow, no player notice
- **20-40%** (Moderate): Noticeable slowdown, residents moving carefully, player observes
- **40-60%** (High): Clear bunching, residents shuffling, delays of 1-3 seconds
- **60-80%** (Very High): Significant jams, visible queue, 5-10 second delays
- **80-100%** (Critical): Overflow, residents waiting minutes, queue backs up
- **100%+** (Severe): Emergency situation, residents giving up, mood crashes

## Next Steps (Planning Phase)

1. Define exact congestion formula (residents/space_area → congestion_%)
2. Define speed penalty curve (1.0 speed at 0% congestion → 0.2 speed at 100% congestion)
3. Define capacity limits: elevator, stairwell, corridor, lobby by width
4. Design UI element to show congestion (color, meter, text)
5. Plan integration with RESIDENT_MOVEMENT.md
6. Plan peak time detection (recurring rush hours vs. unusual spikes)
