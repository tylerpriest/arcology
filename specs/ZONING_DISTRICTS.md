# Zoning Districts System

**Scope**: The zoning system restricts building placement to designated map regions to enforce city organization and provide efficiency bonuses.
**Audience**: City Planner, Strategist
**Related JTBDs**: JTBD 1 (Place buildings strategically), JTBD 3 (Manage resources/efficiency)
**Status**: 🚧 Draft

## Overview

In a sprawling arcology, haphazard construction leads to inefficiency and chaos. The Zoning Districts system allows the architect to designate specific regions of the tower—floors, wings, or blocks—for specific uses: **Residential**, **Commercial**, **Industrial**, and **Agricultural**.

This system adds a layer of strategic planning *before* construction. Instead of placing individual buildings one by one, the player first defines the "Master Plan" by painting zones. This transforms the map from a blank canvas into a structured city.

Zoning is not strictly mandatory (you can build in "Unzoned" areas), but it is highly incentivized. Buildings placed in their matching zones receive efficiency or satisfaction bonuses, representing specialized infrastructure (e.g., quiet streets for homes, heavy power lines for factories). Conversely, placing incompatible buildings in a zoned area is restricted, preventing accidental "slums" or noise pollution.

## Capabilities

The system should:
- [ ] Allow players to paint rectangular regions of the map with specific Zone Types (Residential, Commercial, Industrial, Agricultural).
- [ ] Visually render zones as a semi-transparent colored overlay on the map grid.
- [ ] Enforce placement restrictions: Prevent construction of mismatched building types within a zone.
- [ ] Allow "Unzoned" areas where any building type can be constructed (default state).
- [ ] Apply "Zone Adherence Bonuses" to buildings placed within their matching zone (e.g., +10% efficiency).
- [ ] Handle "Non-conforming Use": If a zone is changed under existing buildings, flag them as non-conforming (penalty/warning).
- [ ] Provide tooltips explaining zone restrictions and active bonuses.

## Acceptance Criteria

Success means:
- [ ] **Player can paint distinct zones** - Can drag a rectangle to define "Residential Zone" on floors 10-20. - Verify: Map data reflects `zone_type` for those coordinates.
- [ ] **Visual feedback is clear** - Zones are color-coded (Green=Res, Blue=Com, Yellow=Ind, Brown=Agri). - Verify: Overlay shows correct colors over grid.
- [ ] **Placement restriction works** - Cannot build a `Factory` (Industrial) in a `Residential` zone. - Verify: Build action blocked, error message "Invalid Zone" displayed.
- [ ] **Correct placement allowed** - Can build an `Apartment` (Residential) in a `Residential` zone. - Verify: Build action succeeds.
- [ ] **Unzoned areas are flexible** - Can build `Factory` OR `Apartment` in unzoned area. - Verify: Both build actions succeed.
- [ ] **Bonuses are applied** - `Factory` in `Industrial Zone` produces 10% more resources. - Verify: `building.productionRate` is 1.1x base rate.
- [ ] **Re-zoning handles conflicts** - Changing a zone under an existing building triggers a "Non-conforming" state. - Verify: Building gets "Invalid Zone" status icon/penalty.

## Scenarios by Example

### Scenario 1: The Master Plan (Strategic Layout)

**Given**: An empty map (Floors 1-50).
**When**: Player selects "Industrial Zone" tool and paints Floors 1-5.
**Then**: Floors 1-5 appear with a yellow semi-transparent overlay.
**And**: The underlying map data for these tiles is updated to `ZoneType.INDUSTRIAL`.

### Scenario 2: Enforcing Rules (Placement Restriction)

**Given**: Floors 1-5 are zoned `INDUSTRIAL`.
**When**: Player tries to build a `Luxury Apartment` (Residential) on Floor 2.
**Then**: The placement preview shows red (invalid).
**And**: A tooltip displays "Requires: Residential Zone or Unzoned".
**And**: Clicking does not place the building.

### Scenario 3: The Efficiency Reward (Bonus Application)

**Given**: A `Hydroponic Farm` (Agricultural) produces 10 food/day.
**When**: Player paints "Agricultural Zone" under the farm.
**Then**: The farm detects it is in a matching zone.
**And**: Production increases to 11 food/day (+10% Zone Bonus).
**And**: UI shows "Zone Bonus: Active".

### Scenario 4: The Change of Heart (Re-zoning Conflict)

**Given**: A `Retail Store` (Commercial) exists on Floor 10 (Commercial Zone).
**When**: Player re-zones Floor 10 to `RESIDENTIAL`.
**Then**: The `Retail Store` remains but gains a "Non-conforming" status.
**And**: A warning icon appears above the building.
**And**: The store suffers a penalty (e.g., -20% revenue) due to operating in a restricted area.

### Scenario 5: Mixed-Use Edge Cases (Unzoned Flexibility)

**Given**: An area is "Unzoned" (default).
**When**: Player builds an Apartment next to a Factory.
**Then**: Both are allowed to be built.
**But**: Neither receives a Zone Bonus.
**And**: The Apartment suffers a "Noise Pollution" penalty (from standard simulation rules), unmitigated by zoning protections.

## Edge Cases & Error Handling

**Edge Cases**:
- **Partial Zoning**: Building occupies 2x2 tiles, but only 1 tile is zoned.
    - *Behavior*: Building is considered "In Zone" only if >50% of its footprint matches the zone. Otherwise "Unzoned" rules apply.
- **Overlapping Zones**: Painting a new zone over an old one.
    - *Behavior*: The new zone completely overwrites the old one (no dual-zoning).
- **Zoning Eraser**: Player uses an eraser tool.
    - *Behavior*: Tiles revert to "Unzoned".
- **Infrastructure Exemptions**: Elevators, Corridors, and Connectors.
    - *Behavior*: Infrastructure can be built in ANY zone without penalty/restriction. They are zone-neutral.

**Technical Constraints**:
- **Grid Data**: Map system must store a `zoneId` per tile (byte).
- **Performance**: Overlay rendering must be efficient (avoid drawing 10,000 separate rects; use tilemap or shader).
- **Check Frequency**: Building validity checked only on placement and on re-zoning events (not every frame).

## Integration Points

**Systems this depends on**:
- **MapSystem**: Stores the grid data (`zone_type` per coordinate).
- **BuildingSystem**: Definitions must include a `allowedZoneTypes` property.
- **UIScene**: Needs a new "Zoning Tool" mode and overlay rendering.

**Systems that depend on this**:
- **EconomySystem**: Calculates production/revenue based on `zoneBonus`.
- **SatisfactionSystem**: Residential happiness affected by zone suitability.
- **BuildMenu**: Needs to query MapSystem to validate placement previews.

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `MapSystem` correctly updates zone data when painted.
- [ ] `BuildingSystem.canPlace()` returns `false` if building type mismatches zone.
- [ ] `BuildingSystem.canPlace()` returns `true` if building matches zone or is unzoned.
- [ ] `ProductionSystem` calculates 1.1x output when building is in matching zone.
- [ ] `Infrastructure` (Elevators) returns `true` for placement in all zones.

**Visual tests**:
- [ ] Painting zones draws the correct color overlays.
- [ ] Overlay toggles on/off correctly.
- [ ] Placement preview turns red when hovering over invalid zone.
- [ ] "Non-conforming" icon appears correctly when re-zoning under existing buildings.

## Definition of Done

This specification is complete when:
- [ ] `ZoneType` enum is defined (RES, COM, IND, AGR, NONE).
- [ ] `MapData` structure includes zoning layer.
- [ ] UI tools for painting/erasing zones are specified.
- [ ] Bonus/Restriction logic is fully defined.
- [ ] Interaction with existing buildings (re-zoning) is handled.
