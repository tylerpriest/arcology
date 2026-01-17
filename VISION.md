# Arcology: Vision & Direction

> A Cyberpunk Venus Arcology Simulator combining deep systems, emergent gameplay, and god-like urban design with liminal space aesthetics.

## One-Sentence Pitch

A vertical city management game where you build a self-sustaining arcology on Venus, managing hundreds of interdependent systems and named residents, watching everything unfold in real-time with residents walking (not floating), where maintenance is gameplay, and cascading failures create unique stories every playthrough.

## Core Design Pillars

### 1. Physical Realism Over Abstraction
Residents **walk** through corridors, taking time to navigate. This creates:
- **Natural bottlenecks**: Lobbies become congested, delaying residents
- **Spatial problem-solving**: Extending lobbies costs money but solves congestion
- **Visible infrastructure**: Stairs, elevators, corridors are not just graphics—they're critical systems affecting gameplay
- **Emergence from design**: Building layouts naturally create traffic patterns and stories

### 2. Economic Realism Over Abstraction
You **can't build without money**. This creates:
- **Real strategic tension**: Early decisions lock in future possibilities
- **Meaningful trade-offs**: Apartment expansion vs. maintenance investment vs. luxury districts
- **Risk management**: Risky expansion vs. safe, steady growth
- **Multi-year planning**: Players think years ahead, not just next month

### 3. Maintenance as Core Gameplay
Systems **fail in dramatic ways** when unmaintained. This creates:
- **Cascading failures**: Oxygen → Power → Elevators → Resident panic
- **Preventative vs. reactive gameplay**: Good planning avoids crises; poor planning creates drama
- **Moral weight**: Ignoring maintenance to save money has real consequences for residents
- **Unique stories**: Each playthrough generates "Year 3: The Great Blackout" narratives

### 4. Deep Simulation (500+ Agents)
Instead of abstract resource meters, see:
- **Named maintenance workers** repairing oxygen scrubbers
- **Power generators** maintaining infrastructure
- **Cleaners** tidying corridors
- **Residents** with names, traits, ambitions, fates
- **Emergent interactions**: Agents create surprise behaviors and stories

### 5. Scale & Scope Enable Vision
- **100+ unit-wide map** (vs. 40-unit MVP)
- **Massive arcology** with distinct zones: corporate, residential, industrial, luxury, slums
- **Generational play**: Decades of in-game time, residents are born/work/retire/die
- **Massive feel**: Not a small community but a megacity on Venus

## The Core Loops

### Loop 1: Economic Cycle
```
Place apartments → Generate income → Cover maintenance costs → Systems stay operational
```
If you build too aggressively without maintaining systems → cascading failures → residents die → game over.

### Loop 2: Traffic Problem
```
Residents walk through lobbies → Congestion emerges → Delays residents → Reduces productivity
Player extends lobby → Traffic flows smoothly → Productivity restored → Build more → Congestion returns
```
This repeats at increasing scale, creating natural expansion points.

### Loop 3: Maintenance Crisis
```
Ignore maintenance for 30 days → System degrades → Player notices → Scramble to fix
But while fixing oxygen → power system ignored → power fails → elevators stop → residents trapped
```
Creates dramatic moments and teaches players the cost of neglect.

### Loop 4: Resident Stories
```
New resident spawns with traits/ambitions → Player's building determines their fate
Unemployed? Underfed? Safe? Thriving? → Resident's story unfolds based on player's choices
```
Creates emotional investment in individual residents.

## Thematic Anchor: Liminal Space + Cyberpunk

### Liminal Space Aesthetics
- **Beauty in efficiency**: Clean, geometric corridors are almost eerie
- **Uncanny emptiness**: Floors empty during off-hours create atmospheric tension
- **Neon against darkness**: Industrial interior contrasts with alien Venus landscape
- **80s/90s retro-futurism**: Abandoned corporate facility aesthetic

### Cyberpunk Sensibility
- **Neon-lit megacity**: Massive, self-contained corporate arcology
- **Economic stratification**: Luxury penthouses above service workers above slums
- **Systems oppressing individuals**: Residents subject to arcology's survival economics
- **God-like perspective**: You are the architect of this world's fate

## Audience Personas & Their JTBDs

### Arcology Architect
"I want to build a self-sustaining vertical city that works long-term."
- JTBD 1: Place buildings strategically (civilization-scale decisions)
- JTBD 2: Extend lobbies to manage traffic (spatial problem-solving)
- JTBD 3: Plan expansion sustainably (multi-year strategy)
- JTBD 4: Build on a larger map (express grand vision)
- JTBD 5: See residents walk through building (feel of real place)

### Systems Operator
"I want to manage complex interdependent systems and watch them interact."
- JTBD 6: Maintain critical systems (oxygen, power, food chains)
- JTBD 7: Feel consequences when systems fail (maintenance matters)
- JTBD 8: Observe 500+ agents interacting (deep simulation)
- JTBD 9: Experience emergent crises (unique stories each playthrough)
- JTBD 10: Watch residents navigate infrastructure (physical reality)

### Resident Observer
"I want residents to be individuals I care about, not abstract metrics."
- JTBD 11: Know residents' stories (traits, ambitions, fates)
- JTBD 12: See consequences of my decisions (moral weight)
- JTBD 13: Manage crises under pressure (dramatic moments)

## Gameplay Experience

### Early Game (First Year)
- **Wonder**: Building a city on Venus is cool
- **Urgency**: Limited money, need income quickly
- **Learning**: Understanding system interactions

Player places apartments → hires office workers → food production → everything works.

### Mid Game (Year 2-5)
- **Confidence**: "I've got this under control"
- **Overextension**: Expanding too fast
- **First crisis**: Oxygen scrubber fails → PANIC → recovery feels heroic

Player learns maintenance matters. Starts planning preventatively.

### Late Game (Year 5+)
- **Mastery**: Predicting cascading failures
- **Investment**: Knowing residents by name, caring about their fates
- **Narratives**: "Year 7: We survived the power grid collapse because I built redundancy"

## Unique Value Proposition

| Aspect | vs. SimTower | vs. Cyberpunk Games |
|--------|---|---|
| **Residents walk** | Teleportation feels abstract | Creates emergent traffic gameplay |
| **Maintenance gameplay** | Just money numbers | Dramatic failures, cascading crises |
| **500+ agents** | Abstract production meters | Deep simulation with emergence |
| **Physics-based movement** | No congestion | Natural bottlenecks force decisions |
| **Larger map** | Encourages megacity thinking | Multiple distinct zones/districts |
| **Liminal aesthetic** | - | Combines brutalism with neon |

## Key Design Decisions

### Hard Constraints (Not Cosmetic)
- **Can't build without money**: Hard stop, not a suggestion
- **Residents walk**: Movement has cost (time, resources, congestion)
- **Systems fail**: Maintenance is not optional
- **Oxygen is critical**: Failure is game over (not just inconvenient)

### Emergent Rather Than Scripted
- **No "events"**: Crises emerge from system interactions
- **No "story missions"**: Player's choices create narrative
- **No "win condition"**: Open-ended sandbox with failure states (bankruptcy, oxygen depletion)
- **Unique playthroughs**: Deep enough simulation that surprises happen

### Moral Complexity
- **Can't save everyone**: Resource limits force hard choices
- **Stratification is natural**: Corporate zones above worker zones above slums
- **Indirect control**: You build systems, residents respond—you don't control them
- **Consequences persist**: Bad decisions compound, good planning prevents crises

## Next Steps for Specification

Each core system needs detailed specifications defining:
- **Maintenance System**: How systems degrade, failure cascades, what agents maintain what
- **Resident Movement**: Pathfinding, congestion, lobby extensions, wait times
- **Economic Systems**: Income/expenses, maintenance costs, bankruptcy mechanics
- **Agent-Based Simulation**: 500+ agents, their behaviors, interactions, emergence
- **Larger Map**: 100+ unit width, zoning, district mechanics
- **Crisis Mechanics**: How failures cascade, telegraphing, emergency response
- **Resident Stories**: Traits, ambitions, success/failure conditions, narrative tracking

---

## Context for 500+ Agents Concept

Instead of thinking "my arcology has 50 residents", think:
- **50 residents** (people living/working)
- **20 maintenance workers** (oxygen, power, food systems)
- **15 power generation agents** (generating electricity)
- **15 oxygen processors** (scrubbing atmosphere)
- **20 food production agents** (farms, kitchens)
- **30 cleaner agents** (keeping spaces operational)
- **50+ infrastructure agents** (elevators, water, waste)
- **Plus coordination agents** (managers, dispatchers)

These aren't UI elements. They're agents with simple behaviors that create emergent complexity.

When oxygen scrubber fails:
- Oxygen processor agents go idle
- Maintenance workers get dispatched
- Power demand spikes (emergency repairs)
- Oxygen levels drop → residents notice → panic
- Cascades become visible because you see agents affected

This is why 500+ agents matter: genuine emergence, surprise, and drama.
