# JTBD to Specifications Mapping

This document maps each Job to Be Done (JTBD) to the specification topics needed to realize it.

## Arcology Architect JTBDs

### JTBD 1: Place buildings and rooms strategically (Civilization-scale decisions)
**Specifications Needed**:
- `BUILDING.md` (already exists)
- `ECONOMY.md` (already exists) - Income/expense balance
- **NEW**: `ZONING_DISTRICTS.md` - Creating distinct zones (corporate, residential, luxury, industrial, slums)
- **NEW**: `LONG_TERM_PLANNING.md` - Multi-year financial planning, strategic expansion

### JTBD 2: Extend my lobby when crowded (Traffic flow management)
**Specifications Needed**:
- **NEW**: `LOBBY_EXTENSION.md` - Extending lobby length dynamically, cost/benefit, reduces congestion
- **NEW**: `CONGESTION_MECHANICS.md` - How congestion forms, affects residents, visibility
- **NEW**: `RESIDENT_MOVEMENT.md` - Pathfinding, movement speed, time cost
- `TIME_EVENTS.md` (already exists) - Timing of movement

### JTBD 3: Plan expansion sustainably (Multi-year finance strategy)
**Specifications Needed**:
- `ECONOMY.md` (already exists) - Income/expense mechanics
- **NEW**: `BANKRUPTCY_MECHANICS.md` - How financial collapse happens, warning signs, failure state
- **NEW**: `BUDGET_MANAGEMENT.md` - Tools for tracking income/expenses, forecasting, constraints
- **NEW**: `INVESTMENT_STRATEGY.md` - ROI calculations, expansion risk, maintenance vs. growth trade-offs

### JTBD 4: Build on larger map (Express grand vision)
**Specifications Needed**:
- **NEW**: `MAP_EXPANSION.md` - Increasing canvas from 40 to 100+ units wide
- **NEW**: `CAMERA_SYSTEM.md` - Panning, zooming, viewport management for larger canvas
- **NEW**: `ZONING_DISTRICTS.md` - Multiple distinct neighborhoods/zones on larger map
- **NEW**: `GENERATION.md` - Procedural or editor-based tools for creating larger cities

### JTBD 5: Residents walk (not float) (Physical reality)
**Specifications Needed**:
- **NEW**: `RESIDENT_MOVEMENT.md` - Walking, pathfinding, movement animation, time cost
- **NEW**: `CONGESTION_MECHANICS.md` - Bottlenecks, visible bunching, traffic patterns
- **NEW**: `STAIRS_ELEVATORS.md` - Queue mechanics, wait times, capacity limits
- `ELEVATORS.md` (already exists, needs updates for movement integration)

## Systems Operator JTBDs

### JTBD 6: Maintain oxygen scrubbers & critical systems (Infrastructure management)
**Specifications Needed**:
- **NEW**: `MAINTENANCE_SYSTEM.md` - Scheduling maintenance, degradation rates, failure thresholds
- **NEW**: `OXYGEN_SYSTEM.md` - Scrubbers, degradation, failure mechanics, oxygen levels
- **NEW**: `POWER_SYSTEM.md` - Power generation, distribution, failures, blackouts
- **NEW**: `FOOD_CHAINS.md` - Production chains, degradation if not maintained
- **NEW**: `WATER_WASTE_SYSTEMS.md` - Water, sewage, degradation mechanics
- **NEW**: `SYSTEM_MONITORING.md` - UI for tracking system health, warnings, diagnostics

### JTBD 7: Systems fail realistically (Consequence-driven maintenance)
**Specifications Needed**:
- **NEW**: `FAILURE_CASCADES.md` - How failures propagate (oxygen → power → elevators)
- **NEW**: `RESIDENT_REACTIONS.md` - How residents respond to system failures, panic, evacuation
- **NEW**: `EMERGENCY_RESPONSE.md` - How player responds to crises, prioritization, repair mechanics
- **NEW**: `DEGRADATION_MECHANICS.md` - Realistic degradation curves, early warnings, tipping points

### JTBD 8: 500+ agents working on systems (Deep simulation)
**Specifications Needed**:
- **NEW**: `AGENT_SYSTEM.md` - Agent framework, behaviors, scheduling, task allocation
- **NEW**: `MAINTENANCE_WORKER_AGENTS.md` - Workers repairing systems
- **NEW**: `INFRASTRUCTURE_AGENTS.md` - Power generators, oxygen processors, cleaners
- **NEW**: `AGENT_COORDINATION.md` - How agents communicate, prioritize, respond to emergencies
- **NEW**: `AGENT_EMERGENCE.md` - Behavioral rules creating surprising interactions

### JTBD 9: Emergent gameplay from system interactions (Unique stories)
**Specifications Needed**:
- `FAILURE_CASCADES.md` - Cascading failures create story moments
- `AGENT_EMERGENCE.md` - Agent interactions create surprise
- **NEW**: `RANDOMNESS_SYSTEM.md` - Controlled randomness enabling emergence (system failures, agent behaviors)
- **NEW**: `NARRATIVE_TRACKING.md` - Recording significant events ("Year 3: The Blackout")
- **NEW**: `SAVE_ANALYSIS.md` - Tools for analyzing unique playthroughs, emergent patterns

### JTBD 10: See residents navigate corridors (Pathfinding feels real)
**Specifications Needed**:
- `RESIDENT_MOVEMENT.md` - Movement system with time cost
- `CONGESTION_MECHANICS.md` - Visible congestion, bunching
- `STAIRS_ELEVATORS.md` - Queue behavior, wait times
- **NEW**: `ANIMATION_SYSTEM.md` - Walking animation, speed variation by resident type
- **NEW**: `SCHEDULE_INTEGRATION.md` - Movement time affects schedule adherence

## Resident Observer JTBDs

### JTBD 11: Understand residents' stories (Emotional investment)
**Specifications Needed**:
- `RESIDENTS.md` (already exists, needs expansion)
- **NEW**: `RESIDENT_TRAITS.md` - Trait system, meaning, story implications (already partially exists)
- **NEW**: `RESIDENT_AMBITIONS.md` - Career paths, salary expectations, success conditions
- **NEW**: `RESIDENT_GENERATION.md` - How residents are created, traits assigned, stories generated
- **NEW**: `RESIDENT_UI.md` - How to display resident stories to player (name, traits, occupation, goals)

### JTBD 12: Watch residents succeed/fail based on systems (Visible consequences)
**Specifications Needed**:
- `ECONOMY.md` - How income/employment works
- `FOOD_SYSTEM.md` (already exists)
- **NEW**: `EMPLOYMENT_SYSTEM.md` - Job assignments, salary, unemployment consequences
- **NEW**: `SATISFACTION_MECHANICS.md` - How systems affect resident happiness/retention
- **NEW**: `FAILURE_CONDITIONS.md` - How residents fail (unemployment, starvation, unsafe conditions)
- **NEW**: `SUCCESS_TRACKING.md` - How to measure and display resident success/thriving

### JTBD 13: Respond to crises (Feel like managing emergencies)
**Specifications Needed**:
- `EMERGENCY_RESPONSE.md` - Player tools for responding to crises
- `SYSTEM_MONITORING.md` - Detecting problems early
- **NEW**: `CRISIS_MECHANICS.md` - How crises unfold, urgency, time pressure
- **NEW**: `PRIORITY_SYSTEM.md` - Managing multiple failures, choosing what to fix first
- **NEW**: `REPAIR_MECHANICS.md` - How to repair systems, costs, time requirements

## Summary: Specification Topics Needed

### Already Exist ✅
- BUILDING.md
- ECONOMY.md
- ELEVATORS.md
- FOOD_SYSTEM.md
- RESIDENTS.md
- TIME_EVENTS.md
- SAVE_LOAD.md
- UI_UX.md
- MENUS.md
- GRAPHICS.md
- AUDIO.md

### High Priority (Core to Vision) 🔴
1. **RESIDENT_MOVEMENT.md** - Walking, pathfinding, time cost
2. **CONGESTION_MECHANICS.md** - How bottlenecks form and affect gameplay
3. **MAINTENANCE_SYSTEM.md** - System degradation, failure mechanics
4. **FAILURE_CASCADES.md** - How failures propagate and create drama
5. **AGENT_SYSTEM.md** - Framework for 500+ agent-based simulation
6. **ZONING_DISTRICTS.md** - Creating distinct neighborhoods on map
7. **LOBBY_EXTENSION.md** - Dynamic lobby resizing as traffic management

### Medium Priority (Important for Depth) 🟠
8. **OXYGEN_SYSTEM.md** - Critical infrastructure maintenance
9. **POWER_SYSTEM.md** - Electricity, blackouts, cascades
10. **AGENT_EMERGENCE.md** - Behavioral rules creating surprise
11. **RESIDENT_AMBITIONS.md** - Individual character stories and goals
12. **EMERGENCY_RESPONSE.md** - Player tools for crisis management
13. **MAP_EXPANSION.md** - Larger canvas implementation

### Lower Priority (Polish & Depth) 🟡
14. **BANKRUPTCY_MECHANICS.md**
15. **DEGRADATION_MECHANICS.md**
16. **ANIMATION_SYSTEM.md**
17. **SCHEDULE_INTEGRATION.md**
18. **RANDOMNESS_SYSTEM.md**
19. **NARRATIVE_TRACKING.md**
20. And additional supporting specs...

## Specification Writing Order

### 🔴 CRITICAL PRIORITY: UI/Graphics Visual Feedback
**Integrate alongside all other phases (don't defer until end)**

Write UI/Graphics specs for visual feedback on all systems:
- **UI_VISUAL_FEEDBACK.md** - Animations, health indicators, cascade visualization, alerts, crisis UI
- **GRAPHICS_ANIMATION_ENHANCEMENTS.md** - Animation timings, system visuals, particle effects, screen effects

**Why Critical**: Player understanding of mechanics depends entirely on visual feedback. Every mechanic (placement, health, cascades, congestion, crises) needs clear visual communication. Implement these specs **alongside Phase 1-3** core mechanics, not after.

**Integration**: Each Phase 1-5 mechanic implementation must include corresponding UI/Graphics from these specs.

---

### Phase 1: Core Movement & Traffic (JTBDs 2, 5, 10)
Write specs for physical reality loop:
1. RESIDENT_MOVEMENT.md
2. CONGESTION_MECHANICS.md
3. LOBBY_EXTENSION.md
4. STAIRS_ELEVATORS.md

**UI/Graphics for Phase 1**: Building placement animations, resident walking animations, congestion bunching effects

### Phase 2: Maintenance & Failure (JTBDs 6, 7, 9)
Write specs for maintenance crisis loop:
5. MAINTENANCE_SYSTEM.md
6. FAILURE_CASCADES.md
7. OXYGEN_SYSTEM.md
8. POWER_SYSTEM.md

**UI/Graphics for Phase 2**: Health bar progression (4 states), cascade visualization, emergency lighting, system-specific glows

### Phase 3: Agents & Emergence (JTBDs 8, 9)
Write specs for deep simulation:
9. AGENT_SYSTEM.md
10. AGENT_EMERGENCE.md
11. INFRASTRUCTURE_AGENTS.md

**UI/Graphics for Phase 3**: Worker activity displays, agent redirect animations, particle effects for maintenance

### Phase 4: Economy & Expansion (JTBDs 1, 3, 4)
Write specs for long-term strategy:
12. ZONING_DISTRICTS.md
13. MAP_EXPANSION.md
14. BANKRUPTCY_MECHANICS.md
15. INVESTMENT_STRATEGY.md

**UI/Graphics for Phase 4**: Zone visual differentiation, expanded canvas rendering

### Phase 5: Residents & Stories (JTBDs 11, 12, 13)
Write specs for emotional engagement:
16. RESIDENT_AMBITIONS.md
17. EMPLOYMENT_SYSTEM.md
18. SATISFACTION_MECHANICS.md
19. CRISIS_MECHANICS.md

**UI/Graphics for Phase 5**: Resident story UI, mood/satisfaction indicators

---

## How Specs Drive Implementation

Each spec should define:
- **What the system does** (not how)
- **Acceptance criteria** (how to verify it works)
- **Scenarios** (concrete examples)
- **Integration points** (what other systems depend on this)
- **Edge cases** (what could go wrong)

This allows implementation teams (or AI agents) to work on multiple specs in parallel with confidence that systems will integrate correctly.

The JTBD mapping ensures:
- Every spec serves one or more JTBDs
- JTBDs aren't forgotten or underspecified
- Cross-dependencies are documented
- Implementation priority is clear
