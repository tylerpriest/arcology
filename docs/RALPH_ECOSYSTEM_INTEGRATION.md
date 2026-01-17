# Arcology & The Ralph Ecosystem

How Arcology's Specification Mode integrates with modern AI-driven development methodologies.

## Repository Ecosystem Overview

| Repository | Author | Focus | Version | Integration |
|---|---|---|---|---|
| **ralph-playbook** | Clayton Farr | Methodology guide | Reference | Foundational philosophy |
| **spec-kit** | GitHub | Spec-driven toolkit | v2.0+ | Specification structure |
| **openspec** | Fission-AI | Brownfield specs | v1.0+ | Change tracking patterns |
| **ralph** | snarktank | PRD-to-tasks automation | v1.0 | Task generation pattern |
| **ralph-claude-code** | frankbria | Claude Code integration | v0.9+ | Fresh context iteration |
| **ralph-orchestrator** | mikeyobrien | Multi-role orchestration | v2.0+ | Hat-based coordination |
| **ralph-tui** | subsy | Terminal UI monitoring | v1.0 | Observation & monitoring |
| **ccpm** | automazeio | Critical Chain PM | - | Task dependency chains |

## Arcology's Synthesis

Arcology combines patterns from **all eight** repositories into a cohesive three-phase workflow:

```
PHASE 1: SPECIFICATION (PROMPT_spec.md)
├── Input: One-liner requirement
├── Process: Interview + Snowflake expansion (inspired by Ralph Playbook)
├── Structure: Spec Kit's 9-section template
├── Output: AUDIENCE_JTBD.md + specs/*.md files
│
PHASE 2: PLANNING (PROMPT_plan.md)
├── Input: specs/*.md files
├── Process: Gap analysis (Spec Kit approach)
├── Coordination: Hat-based roles (Ralph Orchestrator inspired)
├── Output: IMPLEMENTATION_PLAN.md with prioritized tasks
│
PHASE 3: BUILDING (PROMPT_build.md)
├── Input: IMPLEMENTATION_PLAN.md
├── Process: Task-by-task implementation (snarktank/ralph pattern)
├── Validation: Fresh context each iteration (frankbria/ralph-claude-code)
├── Output: Working code + git commits
```

## Repository-by-Repository Integration

### 1. ralph-playbook (Clayton Farr)
**Reference**: https://github.com/ClaytonFarr/ralph-playbook

**What It Is**: Comprehensive guide to the Ralph Wiggum technique

**Arcology Adoption**:
- ✅ **Phase decomposition**: 3-phase workflow (Spec → Plan → Build)
- ✅ **Fresh context principle**: Each phase clears context, reads previous outputs
- ✅ **Backpressure enforcement**: Tests, lint, validation gates
- ✅ **JTBD framework**: AUDIENCE_JTBD.md for Jobs to Be Done
- ✅ **Topic of concern breakdown**: Topics → Specs (1:1 mapping)

**Key Concepts Borrowed**:
```
Ralph Playbook Says                    Arcology Does
─────────────────────────────────────  ────────────────────────────
"Define requirements first"            PROMPT_spec.md automates this
"Break JTBD into topics"               Topic Scope Test ensures clarity
"Specs as source of truth"             specs/* is the authority
"Fresh context per iteration"          Phase boundaries enforce this
"Backpressure over prescription"       Validation gates required
```

**File Mapping**:
- ralph-playbook: "Phase 1 - Define Requirements" → Arcology: `PROMPT_spec.md`
- ralph-playbook: "Phase 2 - Planning" → Arcology: `PROMPT_plan.md`
- ralph-playbook: "Phase 3 - Building" → Arcology: `PROMPT_build.md`

---

### 2. spec-kit (GitHub)
**Reference**: https://github.com/github/spec-kit

**What It Is**: Specification-driven development toolkit with Specify CLI

**Arcology Adoption**:
- ✅ **Specification structure**: 9-section template (Overview, Capabilities, Acceptance Criteria, etc.)
- ✅ **Constitution concept**: Project principles (docs/PRINCIPLES.md)
- ✅ **Acceptance criteria discipline**: WHAT (outcomes) not HOW (implementation)
- ✅ **Multi-AI tool support**: Agent-agnostic workflow
- ✅ **Living specs**: Specs evolve with project

**Key Concepts Borrowed**:
```
Spec Kit Says                          Arcology Does
──────────────────────────────────────  ────────────────────────────
"Specs before code"                    Phase 1: Generate specs
"One spec per component"               Topic Scope Test enforces 1:1
"Acceptance criteria = behavioral"     Only measurable outcomes
"Constitution guides all decisions"    PRINCIPLES.md referenced in building
"Specs are executable"                 Specs drive IMPLEMENTATION_PLAN.md
```

**Template Mapping**:
```
Spec Kit Template          → Arcology Template
─────────────────────────────────────────────
/specify output            → PROMPT_spec.md output
Spec structure             → 9-section template (Overview, Capabilities, Acceptance Criteria, Scenarios, Edge Cases, Performance, Integration, Testing)
Constitution              → docs/PRINCIPLES.md
/plan output              → IMPLEMENTATION_PLAN.md
/tasks output             → Task list in plan
```

---

### 3. openspec (Fission-AI)
**Reference**: https://github.com/Fission-AI/OpenSpec

**What It Is**: Spec-driven development with source-of-truth vs proposals pattern

**Arcology Adoption**:
- ✅ **Source of truth separation**: specs/* is current, changes are proposals
- ✅ **Delta tracking**: Track what changed (ADDED/MODIFIED/REMOVED)
- ✅ **Brownfield-friendly**: Works great for existing features
- ✅ **Change grouping**: Features bundled together (openspec/changes/FEATURE/)
- ✅ **Schema validation**: Structured requirement definitions

**Key Concepts Borrowed**:
```
OpenSpec Says                          Arcology Does
──────────────────────────────────────  ────────────────────────────
"Specs/ is the truth"                  specs/* is read-only source
"Changes/ are proposals"                Phase 1 output is spec delta
"ADDED/MODIFIED/REMOVED"               Spec files show full state
"Change tracking per feature"          IMPLEMENTATION_PLAN.md groups by feature
"Delta format for diffs"               Specs show complete behavior
```

**Architecture Mapping**:
```
OpenSpec Structure         Arcology Structure
──────────────────────────  ──────────────────────────
openspec/specs/            specs/
openspec/changes/FEATURE/  (Phase 1 output: new/updated specs)
openspec/changes/FEATURE/specs/  (Delta of changed specs)
openspec/changes/FEATURE/tasks.md (Implementation tasks)
```

**When to Use OpenSpec Pattern**:
- Multiple specs need updating in one change → Group in IMPLEMENTATION_PLAN.md
- Cross-spec dependencies → Document in Integration Points
- Spec evolution tracking → Git history shows spec changes

---

### 4. ralph (snarktank)
**Reference**: https://github.com/snarktank/ralph

**What It Is**: Autonomous PRD-to-implementation loop

**Arcology Adoption**:
- ✅ **PRD as structured data**: specs/* + IMPLEMENTATION_PLAN.md
- ✅ **Task decomposition**: Small, completable units
- ✅ **Pass/fail tracking**: Task completion status in plan
- ✅ **Progress file**: IMPLEMENTATION_PLAN.md updated after each task
- ✅ **Fresh Amp instances**: Each phase with clean context
- ✅ **Skill system**: Modular instructions (PROMPT_spec, PROMPT_plan, PROMPT_build)

**Key Concepts Borrowed**:
```
Ralph Says                             Arcology Does
──────────────────────────────────────  ────────────────────────────
"PRD in JSON structure"                specs/*.md + IMPLEMENTATION_PLAN.md
"Each task is a user story"            Tasks derived from specs
"Small, testable units"                Each task completable in one context
"Progress tracking"                    IMPLEMENTATION_PLAN.md tracks status
"Fresh context per iteration"          Phase boundaries + fresh reads
"Append learnings"                     IMPLEMENTATION_PLAN.md updated
```

**PRD Pattern Mapping**:
```
Ralph PRD Structure              Arcology Structure
────────────────────────────────  ────────────────────────────
prd.json: {stories: [{...}]}    IMPLEMENTATION_PLAN.md: Prioritized tasks
story.passes: true/false        Task status: ✅/❌/🚧
prd.json: track state           IMPLEMENTATION_PLAN.md: source of truth
progress.txt: learnings         IMPLEMENTATION_PLAN.md: discovery notes
```

---

### 5. ralph-claude-code (frankbria)
**Reference**: https://github.com/frankbria/ralph-claude-code

**What It Is**: Ralph loop implementation for Claude Code with advanced features

**Arcology Adoption**:
- ✅ **Autonomous loops**: Each phase is a self-contained loop
- ✅ **Circuit breaker pattern**: Validation gates prevent bad code
- ✅ **Dual-condition exit**: Multiple completion indicators
- ✅ **Session continuity**: IMPLEMENTATION_PLAN.md preserves state
- ✅ **Error handling**: Validation failures recorded
- ✅ **Rate limiting awareness**: Respect API limits

**Key Concepts Borrowed**:
```
ralph-claude-code Says                 Arcology Does
──────────────────────────────────────  ────────────────────────────
"Fresh Amp instance per iteration"     Fresh context per phase
"Dual-condition completion"            Phase completion requires both done + explicit handoff
"Circuit breaker prevents loops"       Validation failures = stop, don't loop
"Error accumulation prevention"        validation.log tracks issues
"Session continuity via files"         IMPLEMENTATION_PLAN.md is memory
```

**Loop Pattern**:
```
ralph-claude-code Loop       Arcology Phase Loop
──────────────────────────────────────────────────
Initialize                   Read inputs (specs, code, plan)
Fresh context                Clear context at phase boundary
Execute task                  Implement single task
Validate                      Run tests/lint/typecheck
Error handling                Log failures, fix or note
Update state                  Mark complete, update plan
Repeat or exit                Next phase or continue
```

---

### 6. ralph-orchestrator (mikeyobrien)
**Reference**: https://github.com/mikeyobrien/ralph-orchestrator

**What It Is**: Advanced orchestration with hat-based roles and presets

**Arcology Adoption** (Future Potential):
- 🔄 **Hat system**: Specialized roles (Spec-Writer, Planner, Builder, Reviewer)
- 🔄 **Event-driven**: Phase transitions via explicit events
- 🔄 **Presets**: Pre-configured workflows (spec-driven, tdd, feature, etc.)
- 🔄 **Scratchpad memory**: Shared state across roles
- 🔄 **Backpressure gates**: Quality requirements before phase transition

**Current Arcology Pattern** (Manual Hats):
```
Current Approach                       Future (Ralph Orchestrator Model)
────────────────────────────────────────────────────────────────────────
Phase 1: Specification                 Hat: Spec-Writer (event triggered)
Phase 2: Planning                      Hat: Planner (event triggered)
Phase 3: Building                      Hat: Builder (event triggered)
Manual handoff                         Event-driven transition
IMPLEMENTATION_PLAN.md                 Scratchpad.md (shared memory)
Validation gates                       Backpressure gates (explicit)
```

**When to Adopt Ralph Orchestrator**:
- Complex workflows with multiple agents
- Specialized reviewer roles needed
- TDD or other specific patterns
- Advanced session management

---

### 7. ralph-tui (subsy)
**Reference**: https://github.com/subsy/ralph-tui

**What It Is**: Terminal UI for monitoring Ralph execution

**Arcology Adoption** (Observability):
- 🔄 **Real-time monitoring**: Watch phase execution
- 🔄 **Status dashboard**: Current phase progress
- 🔄 **Log streaming**: See what agent is doing
- 🔄 **Event history**: Track all transitions
- 🔄 **Manual controls**: Pause/resume/skip capabilities

**Future Integration**:
```
Arcology Phase Execution           ralph-tui Monitor
─────────────────────────────────────────────────────────
SPEC phase running                 [PHASE 1: SPECIFICATION] (Active)
  ↓ Agent asks questions           [?] Awaiting user input: JTBD clarification
  ↓ User responds                  [✓] Input received
  ↓ Agent generates specs          [⚙] Generating specs/TOPIC_1.md...
  ↓ Specs complete                 [✓] SPEC phase complete
     ↓
PLAN phase starting                [PHASE 2: PLANNING] (Queued → Active)
  ↓ Agent analyzes code            [⚙] Scanning src/* ...
  ↓ Agent creates tasks            [⚙] Creating IMPLEMENTATION_PLAN.md...
  ↓ Plan complete                  [✓] PLAN phase complete
     ↓
BUILD phase starting               [PHASE 3: BUILDING] (Queued → Active)
  ↓ Agent implements task 1        [⚙] Implementing Task 1/42
  ↓ Tests pass                     [✓] Tests pass
  ↓ Validation passes              [✓] Validation pass
  ↓ Committed                      [✓] Committed
```

---

### 8. ccpm (automazeio)
**Reference**: https://github.com/automazeio/ccpm

**What It Is**: Critical Chain Project Management for task scheduling

**Arcology Adoption** (Task Dependencies):
- 🔄 **Dependency chains**: Some specs depend on others
- 🔄 **Critical path**: Priority ordering in IMPLEMENTATION_PLAN.md
- 🔄 **Task buffering**: Reduce task overruns with buffers
- 🔄 **Resource constraints**: Single context window per phase

**Task Dependency Example**:
```
Arcology Task Chain

Phase 1 SPECS: Define requirements
├── Spec: Building system
├── Spec: Room types (depends on: Building system)
├── Spec: Residents (depends on: Room types)
├── Spec: Hunger system (depends on: Residents)
└── Spec: Food system (depends on: Hunger system)
   ↓
Phase 2 PLAN: Create implementation tasks
├── Task: Room placement (no dependencies)
├── Task: Room types (depends on: Room placement)
├── Task: Resident spawning (depends on: Room types)
├── Task: Hunger decay (depends on: Resident spawning)
└── Task: Food production (depends on: Hunger decay)
   ↓
Phase 3 BUILD: Implement in dependency order
└── Execute tasks respecting dependencies
```

**Where CCPM Helps**:
- Identify critical path in IMPLEMENTATION_PLAN.md
- Predict completion time (task duration × critical path)
- Optimize parallel work (independent tasks)
- Buffer management (CCPM buffers before critical path)

---

## Synthesis Matrix

How Arcology combines all eight repositories:

| Capability | Playbook | Spec-Kit | OpenSpec | Ralph | Claude | Orchestrator | TUI | CCPM |
|---|---|---|---|---|---|---|---|---|
| **Specification** | ✅ JTBD | ✅ Template | ✅ Delta | - | - | - | - | - |
| **Planning** | ✅ Gap analysis | ✅ Constitution | ✅ Change tracking | ✅ Task gen | - | - | - | ✅ Chains |
| **Building** | ✅ Phase loop | - | - | ✅ Task exec | ✅ Fresh context | - | - | - |
| **Orchestration** | - | - | - | ✅ Multi-instance | ✅ Error handling | ✅ Hat system | - | - |
| **Observation** | - | - | - | - | - | - | ✅ Dashboard | - |

---

## Best Practices from Each Repository

### From ralph-playbook
```markdown
1. Separate concerns into phases
2. Fresh context prevents hallucination
3. Backpressure prevents compounding errors
4. JTBD before implementation
5. Document learnings in AGENTS.md
```

### From spec-kit
```markdown
1. Constitution guides all decisions
2. Acceptance criteria are behavioral (outcomes)
3. Specs are living documents
4. Multi-tool agent support
5. Clear role definitions
```

### From openspec
```markdown
1. Separate truth (specs/) from proposals (changes/)
2. Track what changed (delta format)
3. Group related specs by feature
4. Version specs alongside code
5. Archive completed changes
```

### From ralph (snarktank)
```markdown
1. Structure PRD as executable JSON/YAML
2. Break PRD into small user stories
3. Track completion status explicitly
4. Append learnings to progress file
5. Fresh instance per story (isolation)
```

### From ralph-claude-code
```markdown
1. Dual-condition exit gates
2. Circuit breaker for stuck loops
3. Session continuity via files
4. Error accumulation tracking
5. Rate limiting awareness
```

### From ralph-orchestrator
```markdown
1. Specialized role/hat system
2. Event-driven transitions
3. Shared scratchpad memory
4. Explicit backpressure gates
5. Configurable workflows (presets)
```

### From ralph-tui
```markdown
1. Real-time phase monitoring
2. Status dashboard visibility
3. Log streaming for debugging
4. Event history tracking
5. Manual execution controls
```

### From ccpm
```markdown
1. Dependency chain mapping
2. Critical path analysis
3. Task buffering
4. Parallel task identification
5. Completion time estimation
```

---

## Implementation Roadmap

### Phase 1: Current (Arcology v0.1)
- ✅ Ralph Playbook foundation (3-phase workflow)
- ✅ Spec Kit structure (spec template)
- ✅ OpenSpec patterns (source of truth)
- ✅ Ralph task generation (IMPLEMENTATION_PLAN.md)
- ✅ Fresh context principle (phase boundaries)

### Phase 2: Near-term (Arcology v0.2)
- 🔄 ralph-claude-code validation gates (stricter error handling)
- 🔄 CCPM dependency analysis (task chains)
- 🔄 Better error accumulation tracking (validation.log)
- 🔄 Integration point discovery (system mapping)

### Phase 3: Medium-term (Arcology v1.0)
- 🔄 ralph-orchestrator hat system (multi-role coordination)
- 🔄 Event-driven transitions (explicit handoffs)
- 🔄 Scratchpad memory (shared state)
- 🔄 Preset workflows (TDD, spec-driven, refactor)

### Phase 4: Long-term (Arcology v2.0)
- 🔄 ralph-tui integration (monitoring dashboard)
- 🔄 Advanced circuit breaker (stuck detection)
- 🔄 Multi-backend support (Claude, Cursor, Codeium, etc.)
- 🔄 Plugin architecture (custom roles/hats)

---

## Key Differences from Standard Ralph Loop

| Aspect | Standard Ralph | Arcology |
|---|---|---|
| **Loop trigger** | Continuous until done | Phase boundaries (intentional) |
| **Context clarity** | Single-phase loop | Three explicit phases |
| **Role definition** | Generic planner/builder | Spec-Writer → Planner → Builder |
| **Spec handling** | Implicit in chat | Explicit, versioned specs/* |
| **Acceptance criteria** | JIRA/doc-based | Spec-driven, integrated |
| **Observability** | Logs only | IMPLEMENTATION_PLAN.md + validation.log |
| **Handoff mechanism** | Git commits + progress.txt | IMPLEMENTATION_PLAN.md + phase artifacts |
| **Error recovery** | Retry same task | Mark failed, note, continue or escalate |

---

## When to Use Each Repository Directly

| Repository | When to Use Directly | Why |
|---|---|---|
| **ralph-playbook** | Understand methodology | Reference architecture |
| **spec-kit** | Need CLI tooling | `specify` command-line setup |
| **openspec** | Multi-spec changes | Change tracking, delta management |
| **ralph** | Multiple stories/instances | PRD structure, multi-instance loops |
| **ralph-claude-code** | Advanced error handling | Circuit breaker, rate limiting, session mgmt |
| **ralph-orchestrator** | Complex workflows | Hat system, preset patterns, TUI |
| **ralph-tui** | Monitoring/visibility | Real-time dashboard |
| **ccpm** | Task scheduling | Dependency chains, critical path |

---

## Reference Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      ARCOLOGY FRAMEWORK                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PROMPT_spec.md (Phase 1: Specification)                       │
│  ├── Input: One-liner requirement                              │
│  ├── Process: Interview + Snowflake expansion                  │
│  │   (ralph-playbook: JTBD breakdown)                          │
│  │   (spec-kit: Constitution → Specification)                  │
│  ├── Output: AUDIENCE_JTBD.md + specs/*.md                    │
│  └── Tools: Structured questioning, scenario building         │
│                                                                 │
│  PROMPT_plan.md (Phase 2: Planning)                            │
│  ├── Input: specs/* + src/* (code)                             │
│  ├── Process: Gap analysis + Prioritization                    │
│  │   (openspec: Change tracking)                               │
│  │   (ralph: Task generation)                                  │
│  │   (ccpm: Dependency chains)                                 │
│  ├── Output: IMPLEMENTATION_PLAN.md                            │
│  └── Tools: Code search, dependency analysis, prioritization   │
│                                                                 │
│  PROMPT_build.md (Phase 3: Building)                           │
│  ├── Input: IMPLEMENTATION_PLAN.md                             │
│  ├── Process: Task-by-task implementation                      │
│  │   (ralph-claude-code: Fresh context, validation)            │
│  │   (ralph: Completion tracking)                              │
│  │   (ralph-tui: Status monitoring)                            │
│  ├── Output: Working code + git commits                        │
│  └── Tools: Testing, validation, commit management            │
│                                                                 │
│  Orchestration Layer (Future: ralph-orchestrator)              │
│  ├── Phase coordination                                        │
│  ├── Event-driven transitions                                  │
│  ├── Backpressure gates                                        │
│  └── Scratchpad memory                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Conclusion

Arcology synthesizes **eight** modern AI-driven development repositories into a cohesive, three-phase workflow that is:

- **Specification-first** (Spec Kit, Ralph Playbook)
- **Requirement-driven** (OpenSpec, Ralph)
- **Validated at every step** (ralph-claude-code)
- **Structured and observable** (ralph-orchestrator, ralph-tui)
- **Dependency-aware** (CCPM)

By borrowing best practices from each repository while maintaining simplicity through clear phase boundaries, Arcology provides a practical implementation of the Ralph methodology suitable for both small teams and large codebases.

