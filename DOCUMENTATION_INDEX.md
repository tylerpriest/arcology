# Complete Documentation Index - Arcology Project

**Last Updated**: January 18, 2026  
**Status**: Phase 1 (Vision) ✅ Complete | Phase 2 (Specifications) 🚧 In Progress

## 🔴 START HERE BEFORE BUILDING

**Read IMPLEMENTATION_MANIFEST.md first** - This is your operational source of truth for:
- What specs are complete and ready to implement
- Which specs to read first for build/plan/spec modes
- Why UI/GRAPHICS is critical priority (implement with mechanics, not after)
- Current implementation status and next actions

---

## Vision & Strategy Documents

### AUDIENCE_JTBD.md
13 Jobs to Be Done across 3 personas. Foundation for all specification work.
- 3 audience personas (Architect, Systems Operator, Observer)
- 13 concrete JTBDs with context, tension, victory conditions
- 4 core gameplay loops with mechanics
- System interactions
- Thematic influences and emotional beats

**Reference this when**: Writing specs (ensure they enable JTBDs)

---

### VISION.md
High-level design philosophy and coherence document.
- 5 core design pillars
- 4 gameplay loops explained
- Unique value proposition vs. other games
- Key design decisions locked in
- Emotional arc progression

**Reference this when**: Making design decisions or checking coherence

---

### VISION_DEEP_DIVE.md
Philosophical foundation explaining why each design element works.
- Why constraints create emergence
- Why each core element matters
- Comparison to SimTower
- Why it works as a game
- The god-like power + responsibility theme

**Reference this when**: Defending design or explaining to skeptics

---

### PLAYER_EXPERIENCE_MAP.md
Hour-by-hour walkthrough of what it's like to play Arcology.
- Early game (wonder & learning)
- Mid game (momentum & crisis)
- Late game (mastery & narrative)
- Failure states
- Emotional beats

**Reference this when**: Understanding actual player experience

---

## Planning & Roadmap Documents

### JTBD_TO_SPECS_MAPPING.md
Complete roadmap of which specifications are needed and in what order.
- 13 JTBDs mapped to required specifications
- ~30 total specs needed
- Priority categorization (🔴 High, 🟠 Medium, 🟡 Lower)
- 5-phase writing sequence
- Dependencies between specs

**Reference this when**: Planning specification work or implementation order

---

### SPEC_PHASE_SUMMARY.md
Executive summary of Phase 1 completion (vision work).
- All 13 JTBDs listed
- 5 design pillars
- 4 gameplay loops
- 30+ specs needed in priority order
- Key decisions locked in
- MVP vs. Full Vision comparison

**Reference this when**: Needing a 5-minute refresh

---

### SPEC_PHASE_README.md
Meta-index of Phase 1 work and guide to using documentation.
- How to use each document
- Reading guides by role (designer, implementer, spec writer)
- Specification roadmap (what to build next)
- Key concepts to internalize
- Success criteria for Phase 1

**Reference this when**: Onboarding new team members

---

### SPEC_PHASE_DOCUMENTS.md
Detailed index of Phase 1 documents with purpose and content.
- Overview of 5 core vision documents
- How to use each
- Specification roadmap (5 phases)
- Key metrics and constraints
- Existing vs. new specifications

**Reference this when**: Navigating vision phase documents

---

### SPECS_CREATED_TODAY.md
Summary of 4 Phase 2 specifications created today.
- Summary of each spec
- How they enable the vision
- Next specs to write
- Key numbers established
- Remaining effort

**Reference this when**: Understanding current specification progress

---

## Core Specifications (Phase 1B & 2)

### specs/RESIDENT_MOVEMENT.md ✅
Residents walk through building using pathfinding, with movement taking time.

**Covers**: How residents move, pathfinding, movement time, schedules affected  
**Enables JTBDs**: 5, 10, 2  
**Key Mechanic**: Walking creates time cost, affects schedules  
**Lines**: ~400

---

### specs/CONGESTION_MECHANICS.md ✅
Bottlenecks form naturally when multiple residents use same corridors.

**Covers**: Congestion density, movement speed penalties, visual indicators, capacity limits  
**Enables JTBDs**: 2, 5, 10  
**Key Mechanic**: Congestion is emergent, not scripted  
**Lines**: ~350

---

### specs/LOBBY_EXTENSION.md ✅
Player extends lobby width to reduce congestion (spatial problem-solving).

**Covers**: Extension mechanics, costs, congestion reduction, strategic choices  
**Enables JTBDs**: 2, 3, 5  
**Key Mechanic**: Extends → solves congestion → building grows → congestion returns loop  
**Lines**: ~350

---

### specs/MAINTENANCE_SYSTEM.md ✅
Systems degrade over time, fail if not maintained, have serious consequences.

**Covers**: Degradation mechanics, maintenance costs, emergency repairs, failure consequences  
**Enables JTBDs**: 6, 7, 8, 9, 3  
**Key Mechanic**: Creates tension between maintenance and expansion budgets  
**Lines**: ~450

---

## Existing Specifications (MVP Era)

These specs exist from previous MVP development. They will need updates to integrate with new systems:

- specs/BUILDING.md - Room placement, constraints
- specs/ECONOMY.md - Rent, revenue, cost management
- specs/ELEVATORS.md - Elevator system (needs integration with movement)
- specs/FOOD_SYSTEM.md - Production chains (will integrate with maintenance)
- specs/RESIDENTS.md - Resident system (will integrate with movement, stories)
- specs/TIME_EVENTS.md - Day/night cycle (integrates with degradation)
- specs/SAVE_LOAD.md - Game state persistence
- specs/UI_UX.md - User interface
- specs/MENUS.md - Menu system
- specs/GRAPHICS.md - Visual system
- specs/AUDIO.md - Sound system

---

## Specifications Still Needed (Phases 2-5)

### Phase 2: Maintenance & Failure (WRITE NEXT)
- [ ] FAILURE_CASCADES.md - How oxygen failure → power failure → elevator failure → resident panic
- [ ] OXYGEN_SYSTEM.md - Specific oxygen scrubber system, degradation, failure modes
- [ ] POWER_SYSTEM.md - Power generation, distribution, blackouts, cascade effects
- [ ] WATER_WASTE_SYSTEMS.md - Water/sewage systems

### Phase 3: Agents & Emergence
- [ ] AGENT_SYSTEM.md - Agent framework, behaviors, scheduling, task allocation
- [ ] AGENT_EMERGENCE.md - Behavioral rules creating surprising interactions
- [ ] INFRASTRUCTURE_AGENTS.md - Maintenance workers, processors, generators
- [ ] AGENT_COORDINATION.md - How agents communicate and coordinate

### Phase 4: Economy & Expansion
- [ ] ZONING_DISTRICTS.md - Creating distinct zones (corporate, residential, industrial)
- [ ] MAP_EXPANSION.md - Expanding from 40 to 100+ units wide
- [ ] BANKRUPTCY_MECHANICS.md - Economic collapse failure state
- [ ] INVESTMENT_STRATEGY.md - ROI, expansion risk, long-term planning

### Phase 5: Residents & Stories
- [ ] RESIDENT_AMBITIONS.md - Career paths, salary, success conditions
- [ ] EMPLOYMENT_SYSTEM.md - Job assignments, unemployment, salary mechanics
- [ ] SATISFACTION_MECHANICS.md - How systems affect morale, complaint system
- [ ] CRISIS_MECHANICS.md - How crises unfold, player response tools

---

## Document Organization

### By Purpose

**Vision & Direction**:
- AUDIENCE_JTBD.md
- VISION.md
- VISION_DEEP_DIVE.md
- PLAYER_EXPERIENCE_MAP.md

**Planning & Roadmap**:
- JTBD_TO_SPECS_MAPPING.md
- SPEC_PHASE_SUMMARY.md
- SPEC_PHASE_README.md
- SPEC_PHASE_DOCUMENTS.md

**Specifications (Phase 1B & 2)**:
- specs/RESIDENT_MOVEMENT.md
- specs/CONGESTION_MECHANICS.md
- specs/LOBBY_EXTENSION.md
- specs/MAINTENANCE_SYSTEM.md

**Specifications (MVP Era)**:
- specs/BUILDING.md
- specs/ECONOMY.md
- specs/ELEVATORS.md
- specs/FOOD_SYSTEM.md
- specs/RESIDENTS.md
- And 6 others

### By Audience

**Game Designers**:
- AUDIENCE_JTBD.md (what players want)
- VISION.md (design philosophy)
- VISION_DEEP_DIVE.md (why it works)
- PLAYER_EXPERIENCE_MAP.md (how it feels)

**Specification Writers**:
- JTBD_TO_SPECS_MAPPING.md (what to write)
- RESIDENT_MOVEMENT.md (example of high-quality spec)
- CONGESTION_MECHANICS.md (another example)
- Any of the 4 new specs (templates)

**Implementers/Developers**:
- SPEC_PHASE_README.md (orientation guide)
- Individual specs for what you're building
- VISION.md (when design feels unclear)
- PLAYER_EXPERIENCE_MAP.md (for context)

**Project Managers**:
- SPECS_CREATED_TODAY.md (progress summary)
- SPEC_PHASE_SUMMARY.md (status)
- JTBD_TO_SPECS_MAPPING.md (roadmap)

---

## Reading Paths

### New to Project (New Team Member)
1. SPEC_PHASE_README.md (5 min orientation)
2. VISION.md (10 min core philosophy)
3. JTBD_TO_SPECS_MAPPING.md (10 min roadmap)
4. Individual spec for your assignment

**Total**: ~30 minutes to orientation

### Writing a Specification
1. JTBD_TO_SPECS_MAPPING.md (find your spec)
2. Read the 2-3 related JTBDs from AUDIENCE_JTBD.md
3. Look at one of the 4 new specs (RESIDENT_MOVEMENT, CONGESTION_MECHANICS, LOBBY_EXTENSION, MAINTENANCE_SYSTEM) as template
4. Write spec following same format and quality level
5. Reference VISION.md to ensure coherence

### Implementing a Feature
1. SPEC_PHASE_README.md (if new)
2. The specification for your feature
3. VISION.md (if design questions arise)
4. PLAYER_EXPERIENCE_MAP.md (for context of how feature feels)

### Defending Design Decisions
1. VISION.md (5 min core principles)
2. VISION_DEEP_DIVE.md (10 min detailed reasoning)
3. AUDIENCE_JTBD.md (for specific JTBD context)

---

## Key Statistics

**Vision Phase** (Completed):
- 6 major documents
- ~4,000 lines of vision/strategy documentation
- 13 detailed JTBDs
- 4 core gameplay loops mapped
- 5 design pillars defined
- ~30 specifications identified

**Specifications Phase** (In Progress):
- 4 high-priority specs completed
- ~1,500 lines of detailed specification
- 9 scenarios per spec (average)
- Each spec: acceptance criteria, testing strategy, edge cases, integration points
- MVP + new specs: ~20 existing specifications

**Quality Metrics**:
- Average spec: 350-450 lines
- Average scenarios: 5-6 per spec
- Acceptance criteria: 8-10 per spec
- Integration points: 4-6 per spec

---

## What's Established

✅ Vision is coherent and complete  
✅ JTBDs are concrete and specific  
✅ Gameplay loops are defined  
✅ Design pillars are locked in  
✅ Movement system specified  
✅ Congestion mechanics specified  
✅ Lobby extension mechanic specified  
✅ Maintenance system specified  
✅ Roadmap for remaining specs clear  
✅ Quality standards established for future specs

---

## What's Next

1. **FAILURE_CASCADES.md** - How maintenance failures cascade
2. **OXYGEN_SYSTEM.md** - Specific oxygen system
3. **POWER_SYSTEM.md** - Specific power system
4. **AGENT_SYSTEM.md** - Framework for 500+ agents
5. And ~20 more specifications following same quality

---

## File Locations

**Vision & Strategy**:
- /AUDIENCE_JTBD.md
- /VISION.md
- /VISION_DEEP_DIVE.md
- /PLAYER_EXPERIENCE_MAP.md

**Planning & Documentation**:
- /JTBD_TO_SPECS_MAPPING.md
- /SPEC_PHASE_SUMMARY.md
- /SPEC_PHASE_README.md
- /SPEC_PHASE_DOCUMENTS.md
- /SPECS_CREATED_TODAY.md
- /DOCUMENTATION_INDEX.md (this file)

**Specifications** (New):
- /specs/RESIDENT_MOVEMENT.md
- /specs/CONGESTION_MECHANICS.md
- /specs/LOBBY_EXTENSION.md
- /specs/MAINTENANCE_SYSTEM.md

**Specifications** (Existing):
- /specs/BUILDING.md
- /specs/ECONOMY.md
- /specs/ELEVATORS.md
- /specs/FOOD_SYSTEM.md
- /specs/RESIDENTS.md
- /specs/TIME_EVENTS.md
- /specs/SAVE_LOAD.md
- /specs/UI_UX.md
- /specs/MENUS.md
- /specs/GRAPHICS.md
- /specs/AUDIO.md

---

**Status**: Comprehensive documentation of vision and initial specifications complete. Ready for Phase 2 spec writing and planning phase.

**Next Step**: Write FAILURE_CASCADES.md (5-phase specification for how system failures cascade through interconnected systems).
