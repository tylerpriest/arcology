# Crisis & Disaster System

**Scope**: The crisis system introduces high-stakes, emergent threats (Fire, Riot, Epidemic) that disrupt the status quo and test the resilience of the player's design and response infrastructure.
**Audience**: Player
**Related JTBDs**: JTBD 2 (Recover from mistakes/Test resilience)
**Status**: ✅ Complete

## Overview

A perfect city is boring. The Crisis System introduces chaos. These are not random "Godzilla attacks" but logical consequences of the simulation (mostly).

-   **Fire**: Result of poor maintenance or overcrowding.
-   **Riot**: Result of low happiness/high unemployment.
-   **Epidemic**: Result of poor sanitation/crowding.

The player must respond by designing resilient systems (sprinklers, security, medical coverage) or by active intervention (locking down sectors, venting atmosphere).

## Capabilities

The system should:
- [ ] **Trigger Crises** based on risk accumulation (Risk = Density * MaintenanceState).
- [ ] **Simulate Spread**: Fire/Disease spreads to adjacent tiles.
- [ ] **Visualize Threat**: Fire particles, smoke, infected icons.
- [ ] **Enable Response**:
    - [ ] Passive: Service buildings (Fire Station) dispatch drones.
    - [ ] Active: Player clicks to activate "Emergency Venting" or "Lockdown" (Costs money/energy).
- [ ] **Inflict Damage**: Buildings damaged/destroyed, residents injured/killed.

## Acceptance Criteria

Success means:
- [ ] **Risk is tracked** - Each building has a `fireRisk` or `crimeRisk`. - Verify: Inspector shows risk.
- [ ] **Fire triggers** - When risk hits threshold (RNG), fire starts. - Verify: Building state becomes `ON_FIRE`.
- [ ] **Fire spreads** - If unchecked, neighbor catches fire after X ticks. - Verify: 1 fire -> 2 fires.
- [ ] **Drones respond** - Fire Station spawns a drone that travels to fire. - Verify: Drone extinguishes fire.
- [ ] **Damage is permanent** - Extinguished building is `DAMAGED` (needs repair). - Verify: Cannot be used until fixed.

## Scenarios by Example

### Scenario 1: The Kitchen Fire

**Given**: A Fast Food restaurant has 0% maintenance.
**When**: Simulation tick.
**Then**: Fire starts!
**And**: Smoke particles appear.
**And**: Residents flee the room.

### Scenario 2: The Cascade

**Given**: Fire starts in a dense apartment block. No Fire Station nearby.
**When**: 10 seconds pass.
**Then**: Fire spreads to Left, Right, and Top neighbors.
**And**: "Major Fire" alert triggers.
**And**: Elevators in that shaft are disabled.

### Scenario 3: The Response

**Given**: Fire is spreading.
**When**: Player builds a Fire Station nearby (Emergency build).
**Then**: Station deploys 3 Drones.
**And**: Drones hover over fires, spraying foam.
**And**: Fires extinguished one by one.

## Edge Cases & Error Handling

**Edge Cases**:
- **Fire in Vacuum**: Can fire exist in vacuum/low oxygen?
    - *Behavior*: No. Venting oxygen should extinguish fire (cool mechanic!).
- **Save/Load**: Saving while fire is raging.
    - *Behavior*: Fire state and spread timer must persist.

## Integration Points

**Systems this depends on**:
- **MaintenanceSystem**: Low maintenance increases risk.
- **AtmosphereSystem** (Oxygen): Oxygen feeds fire.

**Systems that depend on this**:
- **ResidentSystem**: Residents flee/die.

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `CrisisSystem` triggers event based on probability.
- [ ] `FireEvent` spreads to neighbors.
- [ ] `FireStation` dispatches agents.

## Definition of Done

This specification is complete when:
- [ ] Fire logic implemented (Start, Spread, Extinguish).
- [ ] Fire Station agent logic implemented.
- [ ] Visual FX for fire/smoke.
- [ ] Damage state logic.
