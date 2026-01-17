# Specification Phase - Complete Documentation

**Phase**: 1 - Requirements Definition (JTBD & Vision)  
**Status**: ✅ Complete  
**Date Completed**: January 18, 2026  
**Next Phase**: Phase 2 - Planning (Write Detailed Specifications)

---

## What You Need to Know (TL;DR)

You've transformed a vague direction ("cyberpunk venus arcology simtower, oxygen scrubbers, walking, can't build without money, extend lobby, bigger map, 500 agents") into a complete, coherent vision with 13 concrete player desires (JTBDs) that drive 5 core gameplay loops and 5 design pillars.

**Core Vision**: A vertical city management game where you build a self-sustaining arcology on Venus, managing hundreds of interdependent systems and named residents, watching everything unfold in real-time with residents walking (not floating), where maintenance is gameplay, and cascading failures create unique stories every playthrough.

---

## Documents in This Phase

### 1. **AUDIENCE_JTBD.md** ⭐ START HERE
The foundation of everything. Defines:
- 3 audience personas (Architect, Systems Operator, Observer)
- 13 Jobs to Be Done with context, tension, victory conditions
- 4 core gameplay loops with detailed mechanics
- System interactions showing how loops connect
- Thematic influences (Cyberpunk 2077, SimTower, Black & White, Jones in Fast Lane, Liminal spaces)
- Emotional beats across a player's journey

**Read this if**: You need to understand what players want and why

---

### 2. **VISION.md** ⭐ CORE REFERENCE
High-level design philosophy. Defines:
- 5 core design pillars (Physical Realism, Economic Realism, Maintenance, Deep Sim, Scale)
- 4 gameplay loops explained and diagrammed
- Unique value proposition vs. SimTower and other games
- Key design decisions locked in
- Emotional arc progression (Early/Mid/Late game)

**Read this if**: You're making design decisions or need coherence check

---

### 3. **VISION_DEEP_DIVE.md** 🧠 WHY IT WORKS
Philosophical foundation explaining the reasoning. Explains:
- Why constraints create emergence
- Why each core element matters (movement, maintenance, agents, map size, aesthetics, morality)
- How this differs from SimTower
- Why it works as a game (accessibility, depth, replayability)
- The philosophical underpinning (power and responsibility as core theme)

**Read this if**: You need to defend or explain the vision to someone skeptical

---

### 4. **JTBD_TO_SPECS_MAPPING.md** 🗺️ BUILD ROADMAP
The specification roadmap. Shows:
- Which specs are needed for each JTBD (1-30 total specs)
- Priority categorization (🔴 High, 🟠 Medium, 🟡 Lower)
- 5-phase writing sequence (Movement → Maintenance → Agents → Economy → Residents)
- Integration dependencies between specs
- Which specs already exist (11) and which need writing (30+)

**Read this if**: You're planning specification work or need writing order

---

### 5. **SPEC_PHASE_SUMMARY.md** 📋 QUICK REFERENCE
Executive summary (2-3 page document). Lists:
- All 13 JTBDs organized by audience
- 5 design pillars
- 4 gameplay loops
- 30+ specs needed in priority order
- Key decisions locked in
- How this differs from MVP

**Read this if**: You need a 5-minute refresh or to brief someone else

---

### 6. **SPEC_PHASE_DOCUMENTS.md** 📚 THIS PHASE'S WORK
Index of what was created in this phase. Shows:
- Overview of all 5 core documents
- How to use each document
- The specification roadmap (what to build next)
- Key metrics and constraints
- How existing specs will need to be updated

**Read this if**: You're trying to understand where each document fits

---

### 7. **PLAYER_EXPERIENCE_MAP.md** 🎮 HOW IT FEELS
Detailed walkthrough of what it's like to play Arcology. Shows:
- Hour 1: Wonder & Learning
- Hour 2-4: Momentum & Discovery
- Hour 5-8: First Crisis (maintenance matters)
- Hour 8-12: Balancing Act (multiple systems)
- Hour 12-20: Traffic Crisis (lobby extension)
- Hour 20-40: Stratification & Moral Questions
- Hour 40-60: Mastery & Unique Story
- Failure states (economic collapse, resident catastrophe)
- Long-term play (100+ hours, emergent narratives)

**Read this if**: You want to feel what the game is actually like to play

---

### 8. **This Document** 📖 YOU ARE HERE
Meta-index and roadmap for phase 2.

---

## How to Use These Documents

### I'm a Game Designer/Creative Lead
Read in this order:
1. VISION.md (core philosophy)
2. VISION_DEEP_DIVE.md (why it works)
3. AUDIENCE_JTBD.md (what players want)
4. PLAYER_EXPERIENCE_MAP.md (how it feels)

Use SPEC_PHASE_SUMMARY.md as quick reference.

---

### I'm Writing Specifications
Read in this order:
1. JTBD_TO_SPECS_MAPPING.md (what to write, in what order)
2. For each spec you write:
   - Read the relevant JTBDs from AUDIENCE_JTBD.md
   - Read the relevant design pillar from VISION.md
   - Ensure your spec advances those JTBDs
   - Define acceptance criteria that match JTBD victory conditions

---

### I'm Implementing Code
Read in this order:
1. SPEC_PHASE_SUMMARY.md (high-level overview)
2. The specific specification for what you're building
3. VISION.md (when design decisions feel unclear)
4. PLAYER_EXPERIENCE_MAP.md (to understand context)

---

### I'm Explaining This to Others
Use these elevator pitches:

**30 seconds**: 
"Arcology is a vertical city management game where you build a self-sustaining city on Venus. Residents walk (not teleport), creating real traffic problems. Systems degrade and fail, making maintenance critical. Multiple systems can cascade into dramatic crises. Every playthrough is unique because emergence comes from system interactions, not scripted events."

**2 minutes**:
Use the SPEC_PHASE_SUMMARY.md version.

**5 minutes**:
Use VISION.md + VISION_DEEP_DIVE.md opening.

---

## The Big Picture

```
JTBD (What players want)
    ↓
VISION (Design principles to achieve JTBDs)
    ↓
GAMEPLAY LOOPS (Core mechanics that create JTBDs)
    ↓
DESIGN PILLARS (Foundations supporting loops)
    ↓
SPECIFICATIONS (Detailed system designs)
    ↓
IMPLEMENTATION (Code that realizes specs)
```

This phase established everything above the "SPECIFICATIONS" line.

---

## Phase 2: Next Steps

### Immediate (This Week)
1. Review all documentation with team
2. Build consensus on vision
3. Identify any gaps or disagreements
4. Lock in design decisions

### Short-term (Next 2 Weeks)
1. Start writing high-priority specs (Movement, Congestion, Maintenance)
2. Use JTBD_TO_SPECS_MAPPING.md as guide
3. Each spec should reference the JTBDs it serves
4. Define acceptance criteria based on JTBD victory conditions

### Medium-term (Weeks 3-4)
1. Write remaining specs (Agents, Economy, Residents)
2. Identify dependencies and integration points
3. Create IMPLEMENTATION_PLAN.md with prioritized tasks
4. Begin implementation based on spec roadmap

---

## Key Concepts to Internalize

### Emergence Over Scripting
- No "story missions" or developer-scripted events
- Crises emerge from system interactions (oxygen failure → power cascade → resident panic)
- Each playthrough is genuinely different

### Constraints Create Gameplay
- Limited money forces meaningful trade-offs
- Walking creates natural congestion
- Maintenance competes with expansion for budget
- Scarcity is the source of tension and strategy

### Moral Weight Without Moralizing
- Game doesn't judge your choices
- But consequences unfold visibly (demolish slums → unemployment, ignore maintenance → deaths)
- Player feels the weight of decisions

### Residents as Individuals
- Named residents with traits and ambitions
- Player recognizes them and cares about their fates
- Creating narrative through observation, not choice trees

### 500+ Agents as Design Tool
- Not just a number, but a philosophy
- Instead of abstract "food production meter", see workers, farms, kitchens
- Agents create visibility, personification, conflict, emergence

---

## The 13 JTBDs at a Glance

**Architect** (Strategic builder)
1. Place buildings strategically
2. Extend lobby when crowded
3. Plan expansion sustainably
4. Build on larger map
5. Residents walk (not float)

**Systems Operator** (Deep simulation enthusiast)
6. Maintain oxygen & critical systems
7. Systems fail realistically
8. 500+ agents creating emergence
9. Unique stories each playthrough
10. See residents navigate corridors

**Resident Observer** (Story-driven)
11. Understand residents' stories
12. Watch residents succeed/fail
13. Respond to crises

---

## The 5 Design Pillars

1. **Physical Realism** - Walking, movement time, congestion
2. **Economic Realism** - Scarcity, trade-offs, financial planning
3. **Maintenance as Gameplay** - Cascading failures, dramatic crises
4. **Deep Simulation** - 500+ agents, emergence, surprise
5. **Scale & Scope** - 100+ unit map, distinct districts, megacity feel

---

## The 4 Core Loops

1. **Economic Cycle** - Apartments → Income → Maintenance → Survival
2. **Traffic Problem** - Walking → Congestion → Extension → Relief → Growth → Repeat
3. **Maintenance Crisis** - Neglect → Degrade → Failure → Cascade → Crisis → Recovery
4. **Resident Stories** - Spawn → Fate → Narrative

---

## Success Criteria for Phase 1

✅ Coherent vision that explains why each element matters  
✅ 13 concrete JTBDs instead of vague direction  
✅ 5 design pillars that support all JTBDs  
✅ 4 gameplay loops that are internally consistent  
✅ Roadmap for 30+ specifications  
✅ Understanding of how 500+ agents enable emergence  
✅ Clear differentiation from SimTower and other games  

---

## What's Locked In

✅ Residents walk (not teleport)  
✅ Movement has time cost  
✅ Congestion is real, not cosmetic  
✅ Lobby extension solves traffic  
✅ Money is scarce (hard constraint)  
✅ Systems degrade when unmaintained  
✅ Failures cascade dramatically  
✅ 500+ agents are core, not cosmetic  
✅ Residents are individuals with names  
✅ Map is 100+ units (enable districts)  
✅ Liminal space + cyberpunk aesthetics  
✅ God-like perspective (top-down)  
✅ Emergence over scripting  
✅ Moral weight without moralizing  

---

## Documents to Read Before Phase 2

**Required**:
- AUDIENCE_JTBD.md (foundation)
- VISION.md (philosophy)
- JTBD_TO_SPECS_MAPPING.md (roadmap)

**Recommended**:
- VISION_DEEP_DIVE.md (defense of design)
- PLAYER_EXPERIENCE_MAP.md (feel of game)
- SPEC_PHASE_SUMMARY.md (quick reference)

**Reference**:
- SPEC_PHASE_DOCUMENTS.md (how to use docs)

---

## Questions This Phase Answered

✅ What do different players want to accomplish?  
✅ Why does walking matter instead of teleportation?  
✅ How do 500+ agents enable emergence?  
✅ Why is maintenance core gameplay?  
✅ What does a larger map enable?  
✅ How do these elements connect into coherent loops?  
✅ What's unique about this vs. SimTower/Cyberpunk games?  
✅ How does the game feel moment-to-moment?  
✅ What specs need to be written?  
✅ In what order should specs be written?  

---

## The Vision Endures

Everything in this phase is locked in. You can add details through specs, but the core vision won't change.

Residents will walk. Systems will fail. Money will be scarce. Maintenance will matter. 500+ agents will create emergence. The map will be massive. Each playthrough will be unique.

This is your north star for all specification and implementation work.

---

**Status**: Phase 1 Complete ✅  
**Next**: Phase 2 - Writing Detailed Specifications  
**Ready to proceed**: YES

Good luck. This is going to be an incredible game.
