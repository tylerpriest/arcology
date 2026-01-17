# Specification Phase Documents - What You Have

## Five Core Vision Documents (Just Created)

### 1. AUDIENCE_JTBD.md
**What it is**: Complete definition of who plays Arcology and what they want to accomplish.

**Contains**:
- 3 audience personas (Architect, Systems Operator, Resident Observer)
- 13 concrete "Jobs to Be Done" with:
  - Context (why they want it)
  - Tension (what makes it hard)
  - Victory conditions (what success looks like)
  - Related activities
  - Thematic influences
- 4 core gameplay loops with detailed descriptions
- 8 system interactions (how loops connect)
- Thematic resonances (liminal spaces, god complex, cyberpunk, SimTower)
- Emotional beats across game life cycle (early/mid/late game, failure states)

**Why read it**: This is the source of truth for what makes Arcology special. Every spec should reference the JTBDs it enables.

---

### 2. VISION.md
**What it is**: Cohesive vision document translating JTBDs into design principles.

**Contains**:
- One-sentence pitch (the elevator pitch)
- 5 core design pillars with detailed explanation
- 4 core gameplay loops (Economic Cycle, Traffic Problem, Maintenance Crisis, Resident Stories)
- Thematic anchor (Liminal Space + Cyberpunk)
- 3 audience personas and their JTBDs
- Gameplay experience progression (Early/Mid/Late game emotional arcs)
- Unique value proposition table (vs. SimTower, vs. Cyberpunk games)
- Key design decisions (hard constraints, emergent vs. scripted, moral complexity)

**Why read it**: This explains WHY each design decision matters. It's the design philosophy document.

---

### 3. VISION_DEEP_DIVE.md
**What it is**: Philosophical deep-dive explaining why this design works as a game.

**Contains**:
- Core insight: "Constraints create emergence"
- Why movement matters (how walking creates emergent congestion loop)
- Why maintenance matters (budget competition, teaching without lecturing)
- Why 500+ agents matter (visibility, personification, conflict, emergence)
- Why map size matters (enabling distinct districts, stratification, diversity)
- Why liminal aesthetics matter (spectacle + observation = unique engagement)
- Why moral weight matters (consequences of mechanical choices)
- How this differs from SimTower (detailed comparison table)
- Why this works as a game (accessibility, depth, replayability)
- The philosophical underpinning (power and responsibility)

**Why read it**: If you need to explain the vision to someone else, this is your argument.

---

### 4. JTBD_TO_SPECS_MAPPING.md
**What it is**: Complete roadmap of which specifications are needed and in what order.

**Contains**:
- Mapping of 13 JTBDs → required specifications (1-2 level hierarchy)
- Categorization by priority:
  - 🔴 High Priority (7 specs) - Core to vision
  - 🟠 Medium Priority (6 specs) - Important for depth
  - 🟡 Lower Priority (20+ specs) - Polish and detail
- 5-phase writing sequence (Movement → Maintenance → Agents → Economy → Residents)
- Summary table showing:
  - All specs needed (~30 total)
  - Which already exist ✅
  - Which are high/medium/low priority
  - Which phase each belongs to

**Why read it**: This tells you what to build next and in what order. Use this to plan your specification work.

---

### 5. SPEC_PHASE_SUMMARY.md
**What it is**: Executive summary of all specification work (this is your quick reference).

**Contains**:
- What was accomplished (phase complete)
- Vision in one sentence
- All 13 JTBDs listed by audience
- 5 core design pillars
- 4 core gameplay loops
- Thematic anchors
- 30+ specs still to write (organized by phase)
- Key decisions locked in (design constraints)
- How this differs from MVP (feature comparison table)
- Next steps for Phase 2

**Why read it**: When you need a 5-minute refresh on what the vision is, read this.

---

## How to Use These Documents

### If you're the architect/designer:
1. Start with **VISION.md** (core philosophy)
2. Deep dive with **VISION_DEEP_DIVE.md** (understand why)
3. Reference **AUDIENCE_JTBD.md** (when writing specs, ensure you're addressing JTBDs)

### If you're writing specifications:
1. Read **JTBD_TO_SPECS_MAPPING.md** (what to write, in what order)
2. For each spec you write, reference the JTBDs it addresses (from AUDIENCE_JTBD.md)
3. Ensure acceptance criteria align with JTBD victory conditions

### If you're implementing code:
1. Read **SPEC_PHASE_SUMMARY.md** (high-level overview)
2. Read the specific specification for what you're building (from specs/ directory)
3. Reference VISION.md when design decisions feel unclear

### If you're explaining the game to others:
1. Use the one-sentence pitch from VISION.md
2. Use the thematic anchor section if they want to know the vibe
3. Use VISION_DEEP_DIVE.md if they want to understand the design philosophy

---

## The Specification Roadmap (Next 4 Phases)

### Phase 1: Movement & Traffic (JTBDs 2, 5, 10)
High priority. Blocks many other specs.
- RESIDENT_MOVEMENT.md - Walking, pathfinding, movement animation
- CONGESTION_MECHANICS.md - How bottlenecks form, visual impact
- LOBBY_EXTENSION.md - Dynamic resizing, cost/benefit, reduces congestion
- STAIRS_ELEVATORS.md - Queue mechanics, wait times, capacity

### Phase 2: Maintenance & Failure (JTBDs 6, 7, 9)
High priority. Core to tension system.
- MAINTENANCE_SYSTEM.md - System degradation, failure thresholds
- FAILURE_CASCADES.md - How failures propagate through systems
- OXYGEN_SYSTEM.md - Scrubber degradation, failure, oxygen levels
- POWER_SYSTEM.md - Power generation, distribution, blackouts

### Phase 3: Agents & Emergence (JTBDs 8, 9)
High priority. Enables deep simulation.
- AGENT_SYSTEM.md - Agent framework, behaviors, scheduling
- AGENT_EMERGENCE.md - Behavioral rules creating surprising interactions
- INFRASTRUCTURE_AGENTS.md - Maintenance workers, processors, generators

### Phase 4: Economy & Expansion (JTBDs 1, 3, 4)
Medium priority. Builds on earlier specs.
- ZONING_DISTRICTS.md - Creating distinct neighborhoods
- MAP_EXPANSION.md - Expanding canvas from 40 to 100+ units
- BANKRUPTCY_MECHANICS.md - How financial collapse happens
- INVESTMENT_STRATEGY.md - ROI, expansion risk, trade-offs

### Phase 5: Residents & Stories (JTBDs 11, 12, 13)
Medium priority. Leverages other systems.
- RESIDENT_AMBITIONS.md - Career paths, goals, success conditions
- EMPLOYMENT_SYSTEM.md - Job assignments, salary, unemployment
- SATISFACTION_MECHANICS.md - How systems affect happiness
- CRISIS_MECHANICS.md - How crises unfold, player response tools

---

## Key Metrics & Constraints (From VISION)

### Economic
- Starting money: $20,000
- Must be able to build without running out
- Maintenance costs must compete with expansion for budget
- No "easy farming" of money (scarcity is core)

### Physical
- Grid unit: 64px
- Building width: 100+ units (up from 40 MVP)
- Map height: 20+ floors (scalable)
- Movement time: 1-3 seconds between adjacent rooms

### Systemic
- 500+ agents (residents + workers + infrastructure)
- Maintenance failing within 30 days of neglect
- Cascading failures (oxygen → power → elevators)
- Named residents with traits and ambitions

### Thematic
- Liminal space + cyberpunk aesthetics
- God-like perspective (top-down view)
- Moral weight (consequences of choices)
- Emergent narratives (no scripted events)

---

## Documents Already Existing (From Before This Phase)

These specs already exist from MVP development:

- **BUILDING.md** - Room placement, constraints, height limits
- **ECONOMY.md** - Rent, revenue, cost management
- **ELEVATORS.md** - Elevator system, state machine
- **FOOD_SYSTEM.md** - Farm→Kitchen→Meals production chain
- **RESIDENTS.md** - Resident system, spawning, schedules
- **TIME_EVENTS.md** - Day/night cycle, time tracking
- **SAVE_LOAD.md** - Game state persistence
- **UI_UX.md** - User interface specifications
- **MENUS.md** - Menu system
- **GRAPHICS.md** - Visual system, rendering
- **AUDIO.md** - Sound system, music

**These will need to be updated** to integrate with new systems (maintenance, agents, larger map, movement).

---

## How This Specification Work Enables 500+ Agents

The detailed JTBD work enables agent-based simulation because:

1. **JTBDs demand observation**: "I want to see residents navigate" → need visible agents
2. **JTBDs demand emergence**: "Unique stories each playthrough" → need agent interactions
3. **JTBDs demand depth**: "500+ agents" → specification prevents chaos, creates coherence
4. **JTBDs demand consequence**: "Systems fail when unmaintained" → agents need to be visible for players to understand failures

By specifying JTBDs first, we ensure the 500+ agents serve actual gameplay needs, not just be a number.

---

**Status**: Specification phase complete. Ready for Planning Phase (writing specs 1-30).
