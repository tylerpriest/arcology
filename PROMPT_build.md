# Building Mode

You are in BUILDING mode. Implement features from the plan.

## Instructions

0a. Study `specs/*` with up to 500 parallel Sonnet subagents to learn the application specifications.
0b. Study @IMPLEMENTATION_PLAN.md to understand the current plan.
0c. Study @AGENTS.md for build/run commands and operational notes.
0d. **Check for validation.log** - If `validation.log` exists, read it immediately. It contains validation errors from a previous iteration. 
   - **Priority when fixing**: Fix critical type errors first (they block push), then warnings (lint/test) with up to 20 parallel sub-agents to fix documented errors, prioritizing type errors.
   - **Update log with attempts**: If you try to fix an error but cannot resolve it, append to `validation.log` what you attempted and why it failed. This prevents future iterations from retrying the same failed fixes. Format: `=== Attempted Fix === [timestamp] [error] [what you tried] [why it failed] === End Attempt ===`

1. Your task is to implement functionality per the specifications. Follow @IMPLEMENTATION_PLAN.md and choose the most important item to address.

2. Before making changes, search the codebase (don't assume not implemented) using Sonnet subagents. You may use up to 500 parallel Sonnet subagents for searches/reads and only 1 Sonnet subagent for build/tests. Use Opus subagents when complex reasoning is needed (debugging, architectural decisions).

3. **Implement functionality and write tests**. After implementing, immediately run the tests for that unit of code using `npm test` or the specific test file. If functionality is missing then it's your job to add it as per the specifications.

4. **Run validation immediately after tests pass**. Do NOT ask if you should run validation - just execute `npm run validate` (see @AGENTS.md). This runs typecheck + lint + test. If validation fails, errors are automatically logged to `validation.log` with full details. 
   - **When fixing validation issues, prioritize in this order:**
     1. **Critical type errors first** - Must fix before committing/pushing. Push is blocked until type errors are resolved. Fix these immediately.
     2. **Warnings (lint/test) second** - Try to fix after type errors are resolved, but push is allowed even if warnings remain. Warnings are logged to `validation.log` for next iteration.
   - **Document failed fix attempts**: If you try to fix an error but cannot resolve it, append to `validation.log` what you attempted and why it failed. This prevents future iterations from retrying the same failed fixes. Format: `=== Attempted Fix === [timestamp] [error] [what you tried] [why it failed] === End Attempt ===`
   - Always try to fix all errors, but focus on critical type errors first. You won't be blocked from pushing progress if only warnings remain.

5. **Update @IMPLEMENTATION_PLAN.md** - Mark the completed task, remove resolved items, add any new findings.

6. **Commit and push**:
   - If validation passes: commit and push normally
   - If only warnings (lint/test): commit and push allowed - warnings logged for next iteration
   - If critical type errors: must fix before committing/pushing
   ```bash
   git add -A
   git commit -m "feat: description of changes"
   git push
   ```

## Important Rules

- **DO NOT ask questions** - Execute commands directly. Do not ask "Should I run validation?" or "Are tests ready?" - just run them.
- **Execute, don't describe** - Do not say "tests are ready to run" - actually run `npm test` and `npm run validate`.
- If validation has critical type errors, fix them before committing - push is blocked until type errors are resolved.
- If validation has only warnings (lint/test), try to fix them but push is allowed - warnings can be fixed incrementally.
- If tests unrelated to your work fail, resolve them as part of the increment.
- Implement functionality completely - placeholders waste time.
- Capture the why in documentation, not just what.
- Single sources of truth, no migrations/adapters.
- Keep @IMPLEMENTATION_PLAN.md current with learnings.
- Keep @AGENTS.md operational only (no status updates or progress notes).
- For bugs you notice, resolve them or document in @IMPLEMENTATION_PLAN.md.
