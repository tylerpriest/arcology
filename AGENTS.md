# AGENTS.md

> Operational guide for Arcology development.

## Quick Start

```bash
npm install && npm run dev  # localhost:5173
```

## Validation

**IMPORTANT**: Always run validation after implementing code. Do not ask if you should - just execute it.

```bash
npm run validate  # Runs: typecheck + lint + test (all in one command)
```

This command:
- Runs TypeScript type checking (`npm run typecheck`)
- Runs ESLint (`npm run lint`)
- Runs all tests (`npm test`)

**Workflow**: Implement → Run tests → Run `npm run validate` → Fix any errors → Re-run validation until it passes → Commit → Push

## How to Work (Fresh Context)

This project uses the **Ralph methodology** with **Spec-Driven Development**.

1. **Check mode** - Specifying, planning, or building?
   - Specifying: Read `PROMPT_spec.md` (define requirements, create specs)
   - Planning: Read `PROMPT_plan.md` (analyze specs vs code, create tasks)
   - Building: Read `PROMPT_build.md` (implement tasks, test, validate)

2. **Check state**
   - Specs exist? Read `specs/*` for requirements
   - Audience defined? Read `AUDIENCE_JTBD.md` for context
   - Plan exists? Read `IMPLEMENTATION_PLAN.md` for tasks

3. **Check specs** - Read `specs/*` for detailed requirements

### Key Files

| File | Purpose |
|------|---------|
| PROMPT_spec.md | Specification mode instructions (Phase 1) |
| PROMPT_plan.md | Planning mode instructions (Phase 2) |
| PROMPT_build.md | Building mode instructions (Phase 3) |
| AUDIENCE_JTBD.md | Target audiences and their jobs to be done |
| specs/*.md | Feature requirements (one per topic of concern) |
| IMPLEMENTATION_PLAN.md | Prioritized tasks derived from specs |
| docs/SPECIFICATION_GUIDE.md | How to use spec mode (examples, patterns) |
| docs/PRINCIPLES.md | Coding standards |

### Methodology Docs

- `docs/SPECIFICATION_GUIDE.md` - How to use spec mode (examples, patterns, common mistakes)
- `docs/RALPH_PLAYBOOK.md` - Deep methodology for spec-driven development
- `docs/PRINCIPLES.md` - Coding standards

## Project Structure

```
src/
├── main.ts           # Phaser game initialization
├── scenes/
│   ├── BootScene.ts  # Asset loading
│   ├── GameScene.ts  # Main gameplay
│   └── UIScene.ts    # HUD overlay
├── entities/
│   ├── Building.ts   # Tower structure
│   ├── Floor.ts      # Individual floor
│   ├── Room.ts       # Base room class
│   └── Resident.ts   # Individual person
├── systems/
│   ├── TimeSystem.ts      # Day/night cycle
│   ├── EconomySystem.ts   # Money management
│   ├── ResidentSystem.ts  # Population
│   └── ResourceSystem.ts  # Food production
├── utils/
│   ├── constants.ts  # Game constants
│   └── types.ts      # TypeScript types
└── test/
    └── setup.ts      # Vitest setup
```

## Operational Notes

- Camera: Right-click drag to pan, scroll wheel to zoom
- Build: Click room type in bottom menu, then click on grid to place
- Room placement validates floor constraints and overlap

## Codebase Patterns

- Systems communicate via scene references (e.g., `this.scene.building`)
- UI updates via Phaser Registry events
- Rooms stored in `Building.rooms` Map by ID
- Residents stored in `ResidentSystem.residents` array
