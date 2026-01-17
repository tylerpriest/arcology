# Complete Specifications Index - Arcology Project

**Last Updated**: January 18, 2026  
**Total Specifications**: 19 (7 created, 12 planned)  
**Status**: Phase 1B ✅ | Phase 2A ✅ | Phase 2B-5 🚧

---

## Specifications by Phase & Status

### Phase 1B: Movement & Traffic ✅ COMPLETE (3 specs)

#### 1. RESIDENT_MOVEMENT.md ✅
**Status**: Complete  
**Purpose**: Residents walk through building using pathfinding; movement takes time proportional to distance  
**Enables JTBDs**: 5, 10, 2  
**Key Mechanic**: Walking creates time cost → affects schedules → creates natural congestion  
**Integration**: → CONGESTION_MECHANICS, ResidentSystem, TimeSystem  
**Lines**: ~400  

---

#### 2. CONGESTION_MECHANICS.md ✅
**Status**: Complete  
**Purpose**: Bottlenecks form naturally when multiple residents use same corridors  
**Enables JTBDs**: 2, 5, 10  
**Key Mechanic**: Congestion is emergent (not scripted) → creates problem for player to solve  
**Integration**: ← RESIDENT_MOVEMENT | → LOBBY_EXTENSION, SatisfactionSystem  
**Lines**: ~350  

---

#### 3. LOBBY_EXTENSION.md ✅
**Status**: Complete  
**Purpose**: Player extends lobby width to reduce congestion (spatial problem-solving)  
**Enables JTBDs**: 2, 3, 5  
**Key Mechanic**: Extends → solves congestion → building grows → congestion returns loop  
**Integration**: ← CONGESTION_MECHANICS, RESIDENT_MOVEMENT | → EconomySystem  
**Lines**: ~350  

**Phase 1B Total**: ~1,100 lines | 3 detailed specs | 15 scenarios

---

### Phase 2A: Maintenance & Failure ✅ COMPLETE (4 specs)

#### 4. MAINTENANCE_SYSTEM.md ✅
**Status**: Complete  
**Purpose**: Systems degrade over time; require maintenance or fail with serious consequences  
**Enables JTBDs**: 6, 7, 8, 9, 3  
**Key Mechanic**: Creates tension between maintenance and expansion budgets  
**Integration**: → All critical systems, OxygenSystem, PowerSystem, FoodSystem  
**Key Numbers**: 
  - Degradation: 0.5-1.5% per day per system
  - Maintenance cost: $1,500-3,000 per system
  - Emergency repair: 2x normal cost
**Lines**: ~450  

---

#### 5. FAILURE_CASCADES.md ✅
**Status**: Complete  
**Purpose**: When one system fails, dependent systems degrade/fail; creates cascading crises  
**Enables JTBDs**: 7, 8, 9, 13  
**Key Mechanic**: Cascades are telegraphed (warnings before failure) creating drama  
**Integration**: ← MAINTENANCE_SYSTEM | Coordinates all system failures  
**Key Maps**:
  - Complete dependency graph
  - Cascade timing table (when secondaries hit)
  - Severity scores (single vs. triple cascade)
**Lines**: ~500  

---

#### 6. OXYGEN_SYSTEM.md ✅
**Status**: Complete  
**Purpose**: Oxygen scrubbers clean Venus atmosphere; critical infrastructure  
**Enables JTBDs**: 6, 7, 9  
**Key Mechanic**: 0% oxygen = game over (highest stakes system)  
**Integration**: ← MAINTENANCE_SYSTEM, FAILURE_CASCADES, PowerSystem  
**Key Numbers**:
  - Production = scrubber health %
  - Degradation: 1% per day unmaintained
  - Maintenance: $2,000 (normal), $4,000 (emergency)
  - Emergency oxygen: $5,000 (30-min supply)
  - Critical at <20% oxygen level
**Lines**: ~400  

---

#### 7. POWER_SYSTEM.md ✅
**Status**: Complete  
**Purpose**: Power generation/distribution; hub system affecting everything  
**Enables JTBDs**: 6, 7, 9  
**Key Mechanic**: Power failure cascades to elevators (stranded), oxygen (backup fails), water (offline)  
**Integration**: ← MAINTENANCE_SYSTEM, FAILURE_CASCADES | → ElevatorSystem, OXYGEN_SYSTEM, WaterSystem  
**Key Numbers**:
  - Typical capacity: 60 MW, demand: 50 MW (25% buffer)
  - Degradation: 1.5% per day unmaintained
  - Maintenance: $3,000 (normal), $6,000 (emergency)
  - Emergency battery: $3,000 (10-30 min backup)
  - Brownout at 80% capacity
**Lines**: ~450  

**Phase 2A Total**: ~1,850 lines | 4 detailed specs | 15 scenarios

---

### Phase 2B: Additional Infrastructure 🚧 PLANNED (3 specs)

#### 8. WATER_WASTE_SYSTEM.md 🚧
**Status**: Planned  
**Purpose**: Water distribution and sewage; depends on power; disease spreads if offline  
**Enables JTBDs**: 6, 7  
**Key Mechanic**: Water offline → disease spreads → health degrades → deaths  
**Estimated Lines**: 400  

---

#### 9. FOOD_CHAINS.md 🚧
**Status**: Planned  
**Purpose**: Farm → Kitchen → Meals production pipeline; residents starve if fails  
**Enables JTBDs**: 6, 7  
**Key Mechanic**: Food failure → starvation → game over (second highest stakes)  
**Estimated Lines**: 400  

---

#### 10. MEDICAL_SYSTEM.md 🚧
**Status**: Planned  
**Purpose**: Healthcare infrastructure; depends on power, water; disease management  
**Enables JTBDs**: 6, 7  
**Key Mechanic**: Sick residents demand medical care; understaffed or unpowered = deaths  
**Estimated Lines**: 350  

**Phase 2B Total**: ~1,150 lines | 3 detailed specs (estimated)

---

### Phase 3: Agents & Emergence 🔴 HIGH PRIORITY (3 specs)

#### 11. AGENT_SYSTEM.md 🚧
**Status**: Planned  
**Purpose**: Framework for 500+ agents with behaviors, scheduling, task allocation  
**Enables JTBDs**: 8, 9  
**Key Mechanic**: Agents create genuine emergence (not scripted events)  
**Estimated Lines**: 450  

---

#### 12. AGENT_EMERGENCE.md 🚧
**Status**: Planned  
**Purpose**: Behavioral rules for agents creating surprising interactions  
**Enables JTBDs**: 8, 9  
**Key Mechanic**: Simple rules create complex emergent behavior  
**Estimated Lines**: 400  

---

#### 13. INFRASTRUCTURE_AGENTS.md 🚧
**Status**: Planned  
**Purpose**: Specific agents (maintenance workers, processors, generators, cleaners)  
**Enables JTBDs**: 8  
**Key Mechanic**: Instead of abstract "food production", see agents working  
**Estimated Lines**: 350  

**Phase 3 Total**: ~1,200 lines | 3 detailed specs (estimated)

---

### Phase 4: Economy & Expansion 🟠 MEDIUM PRIORITY (4 specs)

#### 14. ZONING_DISTRICTS.md 🚧
**Status**: Planned  
**Purpose**: Creating distinct zones (corporate, residential, industrial) on larger map  
**Enables JTBDs**: 1, 4  
**Key Mechanic**: Zoning enables economic stratification visible on map  
**Estimated Lines**: 350  

---

#### 15. MAP_EXPANSION.md 🚧
**Status**: Planned  
**Purpose**: Expanding canvas from 40 to 100+ units wide  
**Enables JTBDs**: 4  
**Key Mechanic**: Larger map enables megacity feel and distinct neighborhoods  
**Estimated Lines**: 400  

---

#### 16. BANKRUPTCY_MECHANICS.md 🚧
**Status**: Planned  
**Purpose**: Economic collapse failure state  
**Enables JTBDs**: 3  
**Key Mechanic**: Unsustainable finances → bankruptcy → game over  
**Estimated Lines**: 300  

---

#### 17. INVESTMENT_STRATEGY.md 🚧
**Status**: Planned  
**Purpose**: ROI calculations, expansion risk, long-term planning  
**Enables JTBDs**: 3  
**Key Mechanic**: Players think years ahead, not month-to-month  
**Estimated Lines**: 350  

**Phase 4 Total**: ~1,400 lines | 4 detailed specs (estimated)

---

### Phase 5: Residents & Stories 🟡 MEDIUM PRIORITY (4 specs)

#### 18. RESIDENT_AMBITIONS.md 🚧
**Status**: Planned  
**Purpose**: Individual residents have career paths, salary expectations, ambitions  
**Enables JTBDs**: 11, 12  
**Key Mechanic**: Residents as individuals with goals creates emotional investment  
**Estimated Lines**: 400  

---

#### 19. EMPLOYMENT_SYSTEM.md 🚧
**Status**: Planned  
**Purpose**: Job assignments, salary, unemployment mechanics  
**Enables JTBDs**: 11, 12  
**Key Mechanic**: Unemployed residents visible problem; creates moral weight  
**Estimated Lines**: 400  

---

#### 20. SATISFACTION_MECHANICS.md 🚧
**Status**: Planned  
**Purpose**: How systems affect resident morale, complaint system  
**Enables JTBDs**: 11, 12  
**Key Mechanic**: Residents vocal about problems; guides player decisions  
**Estimated Lines**: 350  

---

#### 21. CRISIS_MECHANICS.md 🚧
**Status**: Planned  
**Purpose**: How crises unfold, player response tools, time pressure  
**Enables JTBDs**: 13  
**Key Mechanic**: Player must respond under pressure; moments of intensity  
**Estimated Lines**: 350  

**Phase 5 Total**: ~1,500 lines | 4 detailed specs (estimated)

---

## Summary by Category

### Critical Infrastructure Systems (Highest Priority)
1. **MAINTENANCE_SYSTEM.md** ✅ - All systems degrade
2. **FAILURE_CASCADES.md** ✅ - Systems interconnected
3. **OXYGEN_SYSTEM.md** ✅ - Most critical (game over if depleted)
4. **POWER_SYSTEM.md** ✅ - Hub system (affects everything)
5. **WATER_WASTE_SYSTEM.md** 🚧 - Disease vector
6. **FOOD_CHAINS.md** 🚧 - Starvation game over

### Movement & Traffic Systems (Enables Early Game)
1. **RESIDENT_MOVEMENT.md** ✅ - Walking, pathfinding
2. **CONGESTION_MECHANICS.md** ✅ - Bottlenecks
3. **LOBBY_EXTENSION.md** ✅ - Player solution

### Agent & Emergence Systems (Enables Deep Simulation)
1. **AGENT_SYSTEM.md** 🚧 - 500+ agents
2. **AGENT_EMERGENCE.md** 🚧 - Behavioral rules
3. **INFRASTRUCTURE_AGENTS.md** 🚧 - Specific agents

### Economic & Expansion Systems (Enables Long-term Play)
1. **ZONING_DISTRICTS.md** 🚧 - Distinct zones
2. **MAP_EXPANSION.md** 🚧 - Larger canvas
3. **BANKRUPTCY_MECHANICS.md** 🚧 - Economic failure
4. **INVESTMENT_STRATEGY.md** 🚧 - Long-term planning

### Resident & Story Systems (Enables Emotional Connection)
1. **RESIDENT_AMBITIONS.md** 🚧 - Character stories
2. **EMPLOYMENT_SYSTEM.md** 🚧 - Jobs, unemployment
3. **SATISFACTION_MECHANICS.md** 🚧 - Morale system
4. **CRISIS_MECHANICS.md** 🚧 - Emergencies

---

## Dependency Chains

### The Early Game Chain (Hour 0-20)
```
RESIDENT_MOVEMENT.md
    ↓ (residents walk)
CONGESTION_MECHANICS.md
    ↓ (congestion emerges)
LOBBY_EXTENSION.md
    ↓ (player extends lobby)
    (natural progression teaches spatial reasoning)
```

### The Maintenance Drama Chain (Hour 10-60)
```
MAINTENANCE_SYSTEM.md (all systems degrade)
    ↓
FAILURE_CASCADES.md (systems interconnected)
    ↓ branches into:
    OXYGEN_SYSTEM.md (most critical)
    POWER_SYSTEM.md (cascades to everything)
    WATER_WASTE_SYSTEM.md (disease vector)
    FOOD_CHAINS.md (starvation)
    ↓
    Creates sustained tension throughout game
```

### The Deep Simulation Chain (Hour 30+)
```
AGENT_SYSTEM.md (framework)
    ↓
AGENT_EMERGENCE.md (behavioral rules)
    ↓
INFRASTRUCTURE_AGENTS.md (specific agents)
    ↓ (players observe agents maintaining systems)
    (understand why maintenance matters)
```

### The Expansion Chain (Hour 20+)
```
ZONING_DISTRICTS.md (distinct zones)
    ↓
MAP_EXPANSION.md (larger canvas)
    ↓ (enables megacity feel)
    INVESTMENT_STRATEGY.md (long-term planning)
    ↓
    Enables generational play
```

### The Story Chain (Hour 40+)
```
RESIDENT_AMBITIONS.md (characters with stories)
    ↓
EMPLOYMENT_SYSTEM.md (jobs matter)
    ↓
SATISFACTION_MECHANICS.md (morale reflects decisions)
    ↓
    Players invest emotionally in residents
```

---

## Quality Metrics (Completed Specs)

**Specs Completed**: 7
**Total Lines**: ~2,950
**Average Per Spec**: 421 lines
**Range**: 350-500 lines

**Scenario Coverage**:
- Total scenarios written: 35+
- Average per spec: 5-6
- Range: 4-6 per spec

**Acceptance Criteria**:
- Total: 68+
- Average per spec: 9-10
- All measurable/testable

**Edge Cases**:
- Total: 35+
- Average per spec: 5
- All with recovery behavior

---

## JTBD Coverage

| JTBD | Covered By | Status |
|------|-----------|--------|
| JTBD 1 (place strategically) | ZONING_DISTRICTS | 🚧 Planned |
| JTBD 2 (extend lobby) | LOBBY_EXTENSION | ✅ Complete |
| JTBD 3 (plan sustainably) | INVESTMENT_STRATEGY, BANKRUPTCY | 🚧 Planned |
| JTBD 4 (larger map) | MAP_EXPANSION | 🚧 Planned |
| JTBD 5 (residents walk) | RESIDENT_MOVEMENT | ✅ Complete |
| JTBD 6 (maintain systems) | MAINTENANCE_SYSTEM | ✅ Complete |
| JTBD 7 (systems fail) | FAILURE_CASCADES | ✅ Complete |
| JTBD 8 (500+ agents) | AGENT_SYSTEM | 🚧 Planned |
| JTBD 9 (emergent gameplay) | FAILURE_CASCADES, AGENT_EMERGENCE | ✅ Complete (Cascades), 🚧 Planned (Agents) |
| JTBD 10 (navigate corridors) | RESIDENT_MOVEMENT, CONGESTION | ✅ Complete |
| JTBD 11 (understand stories) | RESIDENT_AMBITIONS | 🚧 Planned |
| JTBD 12 (see consequences) | EMPLOYMENT_SYSTEM, SATISFACTION | 🚧 Planned |
| JTBD 13 (respond to crises) | CRISIS_MECHANICS | 🚧 Planned |

---

## Implementation Reading Order

**New to Project**: Start here
1. RESIDENT_MOVEMENT.md (foundation of gameplay)
2. MAINTENANCE_SYSTEM.md (tension system)
3. FAILURE_CASCADES.md (drama system)

**Want to understand Movement**: 
1. RESIDENT_MOVEMENT.md
2. CONGESTION_MECHANICS.md
3. LOBBY_EXTENSION.md

**Want to understand Maintenance**:
1. MAINTENANCE_SYSTEM.md
2. FAILURE_CASCADES.md
3. OXYGEN_SYSTEM.md
4. POWER_SYSTEM.md

**Want to understand Everything**: Read in spec order (1-21)

---

## Remaining Work

**Specifications**: 12 planned (21 total when complete)
**Estimated lines**: ~7,000 total documentation when complete
**Estimated writing time**: 5-6 more days at current pace
**Then**: Planning phase (integration mapping): 2-3 days
**Then**: Implementation can begin

---

## Version History

**Session 1** (2 hours):
- Created vision documents (AUDIENCE_JTBD, VISION, etc.)
- Established 13 JTBDs, 5 pillars, 4 loops
- Created specification roadmap

**Session 2** (ongoing):
- Phase 1B: RESIDENT_MOVEMENT, CONGESTION_MECHANICS, LOBBY_EXTENSION
- Phase 2A: MAINTENANCE_SYSTEM, FAILURE_CASCADES, OXYGEN_SYSTEM, POWER_SYSTEM
- Phase 2B-5: Planned (12 specs remaining)

---

**Status**: 7 of 21 specifications complete (33%)  
**Next Priority**: Phase 2B (water, food, medical systems)  
**Then**: Phase 3 (agents), Phase 4 (economy), Phase 5 (residents)  

Comprehensive specification framework is establishing the complete vision.
