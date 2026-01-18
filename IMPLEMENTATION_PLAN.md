# Implementation Plan - Arcology

> **Master Roadmap** transforming specs into a living city.
> **Status**: Ready for Execution.
> **Last Updated**: 2026-01-18

## Executive Summary

This plan executes the **21 completed specifications** to transform the current prototype into a deep, interconnected simulation. We proceed in **5 distinct phases**, validating each loop before adding complexity.

**Current State**: Basic systems exist (Time, Economy, Residents) but are isolated. Traffic loop is partially built.
**Goal**: Integrate Traffic → Add Maintenance → Add Infrastructure → Expand Economy → Deepen Simulation.

---

## Phase 0: Stability & Validation (Immediate Priority)

**Goal**: Establish a green test suite and stable baseline before adding new systems.
**Status**: ⚠️ 6 Tests Failing

- [ ] **Fix GameScene Camera Tests** (P0)
    - `tests/visual/ui-ux.test.ts` or `src/scenes/GameScene.test.ts`
    - Fix keyboard key mocking and event handling in tests.
- [ ] **Fix BootScene Layout Tests** (P0)
    - Update coordinates in test expectations to match current UI layout.
- [ ] **Fix ElevatorSystem Test** (P0)
    - Fix `update max floor` logic error (off by one/zone limit).
- [ ] **Fix ResidentSystem Office Logic** (P0)
    - Debug `removeOfficeWorkers` to ensure count drops to 0 on weekends.
- [ ] **Fix ResourceSystem Production** (P0)
    - Debug `update` loop delta time usage; fix production rates.
- [ ] **Fix RestaurantSystem Logic** (P0)
    - Add `isRestaurantOpen` check to prevent food consumption/income when closed.
- [ ] **Fix Sidebar Callback** (P0)
    - Ensure `setActiveSection` calls correct callback with correct ID.

---

## Phase 1: The Traffic Loop (Movement & Congestion)

**Goal**: Make "Movement" the primary physical constraint. Residents must physically travel, creating congestion that the player solves.
**Specs**: `RESIDENT_MOVEMENT`, `CONGESTION_MECHANICS`, `LOBBY_EXTENSION`

- [ ] **Integrate Congestion System** (P1)
    - [ ] **Update Resident**: Inject `CongestionSystem`. Modulate speed based on room congestion.
    - [ ] **Visuals**: Create `CongestionOverlay` to visualize bottlenecks (heatmap).
    - [ ] **Tuning**: Adjust penalties so 10+ residents in a lobby feels "slow".
- [ ] **Implement Lobby Extension** (P1)
    - [ ] **UI**: Add "Extend Lobby" button to `RoomInfoPanel` when Lobby is selected.
    - [ ] **Logic**: Connect button to `LobbyExtensionSystem.extendLobby()`.
    - [ ] **Visuals**: Ensure extended lobbies render correctly (wider sprite or repeating texture).

---

## Phase 2: The Maintenance Loop (Survival)

**Goal**: Make "Decay" the primary time constraint. Systems degrade and fail, forcing the player to manage infrastructure.
**Specs**: `MAINTENANCE_SYSTEM`, `OXYGEN_SYSTEM`, `POWER_SYSTEM`, `FAILURE_CASCADES`

- [ ] **Implement Maintenance System** (P2)
    - [ ] **Core**: Create `MaintenanceSystem` to track `condition` (0-100%) of all mechanical rooms.
    - [ ] **Degradation**: Apply daily decay rates based on room type.
    - [ ] **Repair**: Add `Repair` action (cost $ + time) to restore condition.
- [ ] **Implement Oxygen System** (P2)
    - [ ] **Core**: Create `OxygenSystem`. Track `oxygenLevel` (global or per floor).
    - [ ] **Production**: `AlgaeTank` / `AirScrubber` rooms produce oxygen.
    - [ ] **Consumption**: Residents consume oxygen.
    - [ ] **Failure**: If `oxygenLevel` < 20%, trigger "Hypoxia" state (residents leave/die).
- [ ] **Implement Power System** (P2)
    - [ ] **Core**: Create `PowerSystem`. Track `gridLoad` vs `gridCapacity`.
    - [ ] **Production**: `Generator` rooms add capacity.
    - [ ] **Consumption**: All rooms consume power.
    - [ ] **Blackout**: If demand > supply, random rooms lose power (functionality stops).
- [ ] **Implement Failure Cascades** (P2)
    - [ ] **Logic**: If `Maintenance` < 0%, room stops working.
    - [ ] **Cascade**: Oxygen room fails → Oxygen drops → Residents panic.
    - [ ] **Cascade**: Power room fails → Elevators stop → Traffic deadlock.

---

## Phase 3: Infrastructure & Biology (Needs)

**Goal**: Deepen the simulation with physical needs. Residents are biological entities, not just numbers.
**Specs**: `WATER_WASTE_SYSTEM`, `FOOD_CHAINS`, `MEDICAL_SYSTEM`

- [ ] **Implement Water & Waste** (P3)
    - [ ] **Core**: `WaterSystem`. `WaterTreatment` rooms needed.
    - [ ] **Pipe Layer**: Abstract connection; buildings need water access.
    - [ ] **Disease**: Poor waste management increases disease risk.
- [ ] **Implement Food Supply Chain** (P3)
    - [ ] **Production**: `Hydroponics` (Raw Food) → `Kitchen` (Meals) → `Restaurant` (Service).
    - [ ] **Logistics**: Agents must transport Raw Food to Kitchens.
    - [ ] **Starvation**: If chain breaks, restaurants empty → residents starve.
- [ ] **Implement Medical System** (P3)
    - [ ] **Clinics**: Treat disease and injuries.
    - [ ] **Health**: Track resident health status.

---

## Phase 4: Economy & Expansion (Growth)

**Goal**: Give the player tools to manage a massive city (Macro-management).
**Specs**: `ZONING_DISTRICTS`, `MAP_EXPANSION`, `BANKRUPTCY_MECHANICS`, `INVESTMENT_STRATEGY`

- [ ] **Implement Zoning System** (P4)
    - [ ] **Map Data**: Add `ZoneLayer` to grid (Residential, Commercial, Industrial).
    - [ ] **Bonuses**: Buildings in correct zone get efficiency/happiness buff.
    - [ ] **UI**: Paint tool for zones.
- [ ] **Implement Map Expansion** (P4)
    - [ ] **Logic**: Unlock new map chunks for $ cost.
    - [ ] **Camera**: Update camera bounds to handle wider maps.
- [ ] **Implement Bankruptcy & Loans** (P4)
    - [ ] **Loans**: Take loan (cash now, daily interest).
    - [ ] **Game Over**: If balance < -$10,000 for 3 days.

---

## Phase 5: Residents & Stories (Emergence)

**Goal**: Make the city feel alive with unique stories and emergent crises.
**Specs**: `AGENT_EMERGENCE`, `RESIDENT_AMBITIONS`, `SATISFACTION_MECHANICS`, `CRISIS_MECHANICS`

- [ ] **Deepen Resident Simulation** (P5)
    - [ ] **Traits**: traits affect needs (e.g., "Claustrophobic" hates elevators).
    - [ ] **Ambitions**: "Want to live on top floor", "Want to work in medical".
- [ ] **Implement Employment Market** (P5)
    - [ ] **Labor**: Residents have skills/education.
    - [ ] **Jobs**: Buildings require specific workers.
- [ ] **Implement Crisis System** (P5)
    - [ ] **Events**: Fire, Riot, Epidemic events triggered by low stats.
    - [ ] **Response**: Player must dispatch emergency crews (Agents).