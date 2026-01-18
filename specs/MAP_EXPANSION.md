# Map Expansion System

**Scope**: The map expansion system enables players to purchase adjacent land plots to increase the buildable area horizontally, transforming the tower from a needle to a broad arcology.
**Audience**: City Planner, Strategist
**Related JTBDs**: JTBD 1 (Place buildings strategically), JTBD 3 (Manage resources/efficiency)
**Status**: ✅ Complete

## Overview

Arcology begins with a constrained footprint—a narrow "needle" tower on a limited plot of land. As the city grows vertically, it also needs to grow horizontally to support the massive base required for structural stability and to accommodate sprawling industrial or agricultural zones that don't fit well in vertical shafts.

The Map Expansion system allows players to purchase "Land Deeds" for adjacent plots to the left and right of the starting area. Each expansion unlocks a fixed width of buildable terrain. This mechanic acts as a major economic sink and a pacing mechanism, preventing the player from sprawling too early while providing a long-term goal.

Expansions may also have different characteristics (e.g., a "Geothermal Plot" with power bonuses or a "Toxic Plot" requiring cleanup), adding strategic variety to expansion choices.

## Capabilities

The system should:
- [ ] Define the map as a collection of "Plots" (Start Plot, Left Expansion 1, Right Expansion 1, etc.).
- [ ] Enforce "Buildable Bounds": Construction is only allowed within owned plots.
- [ ] specific UI to view and purchase adjacent plots.
- [ ] Calculate the cost of expansion (progressive scaling: 2nd plot costs more than 1st).
- [ ] Dynamically update the camera bounds and grid system when the map size changes.
- [ ] Support "Plot Traits": Expansions can have intrinsic properties (e.g., "Rocky Soil" - higher foundation cost).

## Acceptance Criteria

Success means:
- [ ] **Restricted start** - Player begins with only the central 50-tile wide plot. - Verify: Cannot build at x=-10 or x=60.
- [ ] **Purchase mechanic** - Player can spend Credits to unlock "West Wing" or "East Wing". - Verify: Credits deducted, bounds updated.
- [ ] **Boundaries update** - Upon purchase, buildable area expands by N tiles. - Verify: Can now build in the new area.
- [ ] **Camera adapts** - Camera panning limits extend to cover the new area. - Verify: Can scroll to see new land.
- [ ] **Progressive cost** - Each subsequent expansion is more expensive. - Verify: Plot 1 = 10k, Plot 2 = 25k.
- [ ] **Visual distinction** - Unowned land looks "locked" or "fogged" but visible. - Verify: Visual cue for unowned territory.

## Scenarios by Example

### Scenario 1: The First Expansion

**Given**: Player has filled the starting plot (Width 50) and has 20,000 Credits.
**When**: Player clicks the "Expand East" button on the map edge.
**Then**: 10,000 Credits are deducted.
**And**: The map bounds extend +30 tiles to the right.
**And**: The camera pans to reveal the new empty land.
**And**: A "New Land Acquired" notification appears.

### Scenario 2: Hitting the Boundary

**Given**: Player owns only the starting plot (x: 0 to 50).
**When**: Player tries to place a module at x: 55.
**Then**: The placement preview shows red.
**And**: A tooltip says "Outside Owned Territory".
**And**: Construction is blocked.

### Scenario 3: Insufficient Funds

**Given**: Player has 500 Credits.
**When**: Player tries to buy "West Expansion" (Cost: 10,000).
**Then**: The purchase button is disabled/greyed out.
**And**: A tooltip shows "Insufficient Funds (Need 9,500 more)".

### Scenario 4: Max Expansion

**Given**: Player has purchased all available plots (Map width 200).
**When**: Player looks for more expansion options.
**Then**: No expansion buttons appear.
**And**: UI indicates "Maximum Territory Reached".

## Edge Cases & Error Handling

**Edge Cases**:
- **Residents in transit**: Resident is walking when map bounds change.
    - *Behavior*: No impact, bounds only restrict *building* placement.
- **Save/Load**: Loading a game with expanded map.
    - *Behavior*: Map size and camera bounds must be restored correctly from save file.
- **Distant Pathfinding**: Pathfinding to far edge of new expansion.
    - *Behavior*: Resident movement logic must handle larger coordinate ranges without performance dip.

**Technical Constraints**:
- **Grid Size**: The underlying grid array/map structure must either be pre-allocated for max size or dynamically resizeable. (Pre-allocation of max 250x250 is likely safest/easiest).
- **Coordinate System**: X=0 should be the center or left edge of *starting* plot? (Recommendation: X=0 is center of starting plot, expansions go negative and positive).

## Integration Points

**Systems this depends on**:
- **EconomySystem**: To deduct funds.
- **MapSystem**: To update bounds and grid data.
- **CameraControls**: To update pan limits.

**Systems that depend on this**:
- **BuildingSystem**: Checks bounds before placement.
- **ZoningSystem**: Can paint zones on new land.

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `MapSystem.isBuildable(x, y)` returns false for unowned coordinates.
- [ ] `MapSystem.expand(direction)` updates bounds and deducts cost.
- [ ] `CameraControls` updates limits after expansion event.

**Visual tests**:
- [ ] "Locked" terrain is visually distinct (e.g., darker, grid lines off).
- [ ] Expansion animation or visual transition is smooth.
- [ ] Camera can pan to the new edge.

## Definition of Done

This specification is complete when:
- [ ] `MapSystem` supports variable bounds.
- [ ] UI for buying land is implemented.
- [ ] Camera bounds update logic is implemented.
- [ ] Expansion costs and config are defined.
