# Congestion Mechanics

**Scope**: Bottlenecks form naturally when multiple residents use same corridors/elevators simultaneously, creating visual and mechanical consequences.

**Audience**: Arcology Architect, Resident Observer

**Related JTBDs**: JTBD 2 (extend lobby to solve congestion), JTBD 5 (residents walk, not float), JTBD 10 (navigate bottlenecks realistically)

**Status**: ✅ Ready (Formulas and Mechanics Defined)

## Overview

When many residents travel through the same space (lobby, stairwell, elevator queue), congestion emerges naturally. Congestion is not scripted—it emerges from residents following realistic movement patterns.

Congestion has consequences:
- **Movement slows**: Residents move at 30-70% of normal speed in congested areas
- **Schedules affected**: Residents arrive late to work, meetings, activities
- **Visually apparent**: Residents bunch together, creating observable jams
- **Solvable by player**: Extending lobby or adding stairs reduces congestion
- **Creates feedback loop**: Player sees problem → extends lobby → congestion goes away → building gets bigger → congestion returns at larger scale

This creates the **Traffic Loop** (JTBD 2), where congestion is a real problem with real solutions.

## Formulas & Constants

### 1. Capacity Calculation
Each room/entity has a maximum "Comfortable Capacity" (100% load) based on its dimensions.

**Formula**:
`Capacity (Residents) = FloorArea / SpacePerResident`

**Constants**:
- **Lobby**: Width × 1.0 (High density allowed). Example: 20-unit lobby = 20 residents.
- **Corridor**: Width × 0.8.
- **Stairwell**: Fixed capacity = 8 residents.
- **Elevator**: Fixed capacity = 12 residents (standard), 24 (freight).

### 2. Congestion Level
The real-time load on a space.

**Formula**:
`Congestion Level (C) = CurrentResidentCount / Capacity`

**Thresholds**:
- **0.0 - 0.5 (Green)**: Free flow. No penalties.
- **0.5 - 0.8 (Yellow)**: Moderate traffic. Slight slowing.
- **0.8 - 1.0 (Orange)**: Heavy traffic. Noticeable delays.
- **1.0+ (Red)**: Overcrowding. Severe delays. Max visual density.

### 3. Movement Speed Penalty
Speed decreases non-linearly as congestion rises.

**Formula**:
- If `C <= 0.5`: `SpeedMultiplier = 1.0`
- If `0.5 < C <= 1.0`: `SpeedMultiplier = 1.0 - ((C - 0.5) * 0.8)`
  - At C=0.5, Mult=1.0
  - At C=0.75, Mult=0.8
  - At C=1.0, Mult=0.6
- If `C > 1.0`: `SpeedMultiplier = 0.6 * (1 / C)`
  - At C=1.2, Mult=0.5
  - At C=2.0, Mult=0.3
  - **Minimum Clamp**: `0.1` (Residents never completely stop, just crawl).

### 4. Satisfaction Penalty
Residents lose satisfaction for every second spent in high congestion.

**Formula**:
- If `C > 0.8`: `SatisfactionDelta = -1 per game-minute`
- If `C > 1.2`: `SatisfactionDelta = -3 per game-minute`

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
- [ ] **Different spaces have different capacity limits** - Elevator has lower capacity than stairwell - Verify: elevator holds 12 residents, stairwell holds 8
- [ ] **Overflow behavior defined** - When space full, new residents wait/queue - Verify: queue forms when capacity exceeded
- [ ] **Congestion clears after peak times** - Early morning congestion gone by noon - Verify: congestion metric returns to baseline post-rush

## Scenarios by Example

### Scenario 1: Formation of Morning Rush

**Given**: 
- 8 office workers on floor 2, all with 8:00 AM start times
- Lobby is normal 20-unit width (Capacity 20)
- No queues exist at 7:55 AM

**When**: Time advances through 8:00 AM, residents leave apartments to go to work

**Then**:
- 8:00 AM: First resident leaves floor 2 apartment
- 8:01 AM: 2nd resident leaves apartment, meets 1st resident in lobby
- 8:02 AM: 3rd resident arrives, finds 2 ahead in elevator queue
- 8:03 AM: 4th, 5th residents arrive, lobby crowded (5 residents in 20-unit space)
- 8:04 AM: 6th, 7th, 8th residents arrive, lobby very crowded (8 residents, 0.4 per unit)
- Congestion level: 0.4 (40%) -> Green (Speed 1.0)

**And**:
- First resident reaches elevator by 8:03 (3 seconds in lobby + queue wait)
- Last resident reaches elevator by 8:07 (5 seconds in lobby + queue wait)
- All residents experience normal movement speed (C < 0.5)
- **Note**: This scenario shows *healthy* flow. Congestion logic handles light traffic gracefully.

### Scenario 2: Capacity Overflow (Severe)

**Given**: 
- Lobby Capacity = 20.
- 30 residents crowd into lobby due to broken elevator.

**When**: Congestion calculation runs.

**Then**:
- `C` = 30 / 20 = 1.5.
- `SpeedMultiplier` = 0.6 * (1 / 1.5) = 0.4.
- Residents move at 40% speed.
- Visuals: Residents bunched tightly. Overlay shows Red.

**And**:
- Player observes massive slowdown.
- Residents get angry (-3 satisfaction/min).
- Player motivated to fix elevator or extend lobby.

### Scenario 3: Lobby Extension Solves Congestion

**Given**: 
- 30 residents in 20-unit lobby (C=1.5, Speed=0.4).
- Player extends lobby to 40 units ($2000 cost).

**When**: Extension completes.

**Then**:
- New Capacity = 40.
- New `C` = 30 / 40 = 0.75.
- New `SpeedMultiplier` = 1.0 - ((0.75 - 0.5) * 0.8) = 1.0 - 0.2 = 0.8.
- Speed doubles (0.4 -> 0.8).
- Visuals: Residents spread out. Overlay turns Yellow.

**And**:
- Player feels immediate reward for investment.

## Edge Cases & Error Handling

**Edge Cases**:
- **One resident in space**: No congestion (0.05 C) - Speed 1.0.
- **Space exactly at capacity (C=1.0)**: Speed 0.6. Noticeable drag.
- **Space at 2x capacity (C=2.0)**: Speed 0.3. Crawling.
- **Congestion fluctuates**: Smooth calculation over 1-second rolling average to prevent jittery movement.

**Error Conditions**:
- **Zero Capacity**: If width=0 (bug), default to Capacity=1 to avoid div/0.
- **Negative Count**: Should be impossible, clamp to 0.

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

## Testing Strategy

How to verify this works:

**Programmatic tests** (automated):
- [ ] Formula verification: Input 30 residents/20 cap -> Output 1.5 C, 0.4 Speed.
- [ ] Speed clamping: Input 100 residents/20 cap -> Output 0.1 Speed (min).
- [ ] Capacity calculation: Lobby width 20 -> Cap 20.
- [ ] Satisfaction decay: resident.satisfaction drops when in C > 0.8.

**Visual/Behavioral tests** (human observation):
- [ ] Residents visibly bunched in congested areas.
- [ ] Congestion UI shows Red when C > 1.0.
- [ ] Lobby extension visibly improves flow.
- [ ] Residents slow down as they enter crowded zone.

## Definition of Done

This specification is complete when:
- [x] Congestion calculation formula defined
- [x] Speed penalty function specified
- [x] Capacity limits for each space type defined
- [ ] UI representation designed (how player sees congestion) -> See UI_VISUAL_FEEDBACK.md
- [ ] Integration with movement speed specified
- [ ] Integration with satisfaction specified
- [ ] All edge cases handled