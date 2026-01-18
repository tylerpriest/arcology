# Employment System

**Scope**: The employment system manages the labor market, matching residents to job openings in buildings, handling work shifts, and processing salary payments that fuel the consumer economy.
**Audience**: Simulator
**Related JTBDs**: JTBD 2 (Residents thrive), JTBD 3 (Economic viability)
**Status**: ✅ Complete

## Overview

In Arcology, the economy is circular. Buildings produce value, but they need workers to do so. Residents need goods/services, but they need money to buy them. The Employment System connects these two needs.

Unlike simple games where "jobs" are just a statistic, Arcology simulates the actual relationship:
1.  **Job Search**: Residents look for open positions.
2.  **Commute**: Residents must physically travel to their workplace.
3.  **Productivity**: Buildings only operate if staffed (or efficiency scales with staffing).
4.  **Wages**: Money flows from the Building (or State) to the Resident, who then flows it back to Services/Rent.

## Capabilities

The system should:
- [ ] Define **Job Slots** for buildings (e.g., Factory = 10 Workers, Office = 5 Workers).
- [ ] Run a **Job Search** process for unemployed residents.
- [ ] Assign residents to specific workplaces.
- [ ] Enforce **Work Shifts** (e.g., 09:00 - 17:00).
- [ ] Calculate and transfer **Salaries** (Daily or Weekly).
- [ ] Handle **Unemployment** (Firing if building destroyed, quitting if unpaid).

## Acceptance Criteria

Success means:
- [ ] **Jobs are filled** - Unemployed residents find open slots. - Verify: `resident.job` is not null.
- [ ] **Staffing affects output** - Factory with 5/10 workers produces 50% (or less) output. - Verify: Production rate scales.
- [ ] **Commuting happens** - Residents pathfind to work at 08:00. - Verify: Visual observation of morning rush.
- [ ] **Salaries are paid** - Resident money increases, Building/Player money decreases (if state-owned). - Verify: Wealth transfer logs.
- [ ] **Job loss handled** - Destroying a workplace resets employees to "Unemployed". - Verify: Residents seek new jobs.

## Scenarios by Example

### Scenario 1: The Morning Rush

**Given**: 50 Residents employed at "Tech Corp" on Floor 10. Time is 07:50.
**When**: Clock hits 08:00.
**Then**: All 50 residents change state to `COMMUTING`.
**And**: They pathfind from their homes to Floor 10.
**And**: Elevators experience congestion spike.

### Scenario 2: The Labor Shortage

**Given**: Player builds a massive Industrial Zone (1000 jobs) but only has 200 Residents.
**When**: Simulation runs.
**Then**: Factories operate at ~20% efficiency.
**And**: "Worker Shortage" warning appears on buildings.
**And**: Wage demands might rise (Optional complexity).

### Scenario 3: Payday

**Given**: Resident works at Office (Salary: 50/day).
**When**: Shift ends (17:00).
**Then**: Resident receives +50 Credits.
**And**: Player (Employer) loses 50 Credits.

## Edge Cases & Error Handling

**Edge Cases**:
- **Cannot reach work**: Path is blocked.
    - *Behavior*: Resident tries for X hours, then gives up/quits or marks "Absent". Building efficiency drops.
- **Multiple shifts**: 24-hour buildings (Hospitals).
    - *Behavior*: Split jobs into Day/Night shift slots? (MVP: Just one shift for simplicity, or "3 shifts" abstractly). *Decision: Single shift 9-5 for MVP simplicity.*

## Integration Points

**Systems this depends on**:
- **ResidentSystem**: Manages resident state/data.
- **BuildingSystem**: Defines job slots per building.
- **TimeSystem**: Triggers shift start/end.

**Systems that depend on this**:
- **EconomySystem**: Residents need money to buy things.
- **ResourceSystem**: Production depends on workers.

## Testing Strategy

How to verify this works:

**Programmatic tests**:
- [ ] `EmploymentSystem.assignJob()` links resident and building.
- [ ] `Building.getEfficiency()` returns 0.5 if 50% staffed.
- [ ] `Resident.update()` triggers commute at shift start.

## Definition of Done

This specification is complete when:
- [ ] `Job` interface defined.
- [ ] Matching logic implemented.
- [ ] Commute logic integrated into `ResidentSystem`.
- [ ] Salary logic implemented.
