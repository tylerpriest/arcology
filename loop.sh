#!/bin/bash

# Ralph Loop Script
# Usage:
#   ./loop.sh              # Build mode with Claude (default)
#   ./loop.sh plan         # Plan mode with Claude
#   ./loop.sh --agent      # Build mode with Cursor Agent (auto-run)
#   ./loop.sh --agent -i   # Build mode with Cursor Agent (interactive)
#   ./loop.sh plan --agent # Plan mode with Cursor Agent
#   ./loop.sh 20 --agent   # Build mode, 20 iterations, Cursor Agent

set -e

# Parse arguments
MODE="build"
MAX_ITERATIONS=0
USE_AGENT=false
INTERACTIVE=false

for arg in "$@"; do
    case $arg in
        plan)
            MODE="plan"
            ;;
        --agent)
            USE_AGENT=true
            ;;
        -i|--interactive)
            INTERACTIVE=true
            ;;
        [0-9]*)
            MAX_ITERATIONS=$arg
            ;;
    esac
done

# Select prompt file
if [[ "$MODE" == "plan" ]]; then
    PROMPT_FILE="PROMPT_plan.md"
else
    PROMPT_FILE="PROMPT_build.md"
fi

# Validate prompt file exists
if [[ ! -f "$PROMPT_FILE" ]]; then
    echo "Error: $PROMPT_FILE not found"
    echo "Create it from templates/PROMPT_${MODE}.md"
    exit 1
fi

echo "========================================"
echo "Ralph Loop - $MODE mode"
if [[ "$USE_AGENT" == "true" ]]; then
    if [[ "$INTERACTIVE" == "true" ]]; then
        echo "Agent: Cursor (interactive - can type input)"
    else
        echo "Agent: Cursor (auto-run mode)"
    fi
else
    echo "Agent: Claude (auto-approve enabled)"
fi
echo "Prompt: $PROMPT_FILE"
if [[ $MAX_ITERATIONS -gt 0 ]]; then
    echo "Max iterations: $MAX_ITERATIONS"
else
    echo "Iterations: unlimited (Ctrl+C to stop)"
fi
echo "========================================"
if [[ "$USE_AGENT" == "true" ]] && [[ "$INTERACTIVE" == "true" ]]; then
    echo ""
    echo "TIP: Type '/auto-run on' in agent to enable auto-approval."
fi
echo ""

ITERATION=0

# Function to detect critical TypeScript type errors in validation output
has_critical_errors() {
    local output="$1"
    # Check for TypeScript compilation errors (error TS#### pattern)
    if echo "$output" | grep -qE "error TS[0-9]+"; then
        return 0  # Has critical errors
    fi
    # Check for "Type error" or "TypeError" patterns
    if echo "$output" | grep -qiE "(type error|TypeError)"; then
        return 0  # Has critical errors
    fi
    return 1  # No critical errors (only warnings)
}

while true; do
    ITERATION=$((ITERATION + 1))

    echo "----------------------------------------"
    echo "Iteration $ITERATION starting..."
    echo "----------------------------------------"

    # Run the agent with the prompt
    if [[ "$USE_AGENT" == "true" ]]; then
        # Cursor Agent CLI
        if [[ "$INTERACTIVE" == "true" ]]; then
            # Interactive mode - allows typing input
            if [[ "$MODE" == "plan" ]]; then
                agent --plan "$(cat "$PROMPT_FILE")"
            else
                agent "$(cat "$PROMPT_FILE")"
            fi
        else
            # Auto-run mode - non-interactive
            if [[ "$MODE" == "plan" ]]; then
                agent --print --plan --output-format text "$(cat "$PROMPT_FILE")"
            else
                agent --print --output-format text "$(cat "$PROMPT_FILE")"
            fi
        fi
    else
        # Claude CLI (default)
        cat "$PROMPT_FILE" | claude \
            --dangerously-skip-permissions \
            --model opus \
            --verbose \
            --output-format stream-json
    fi

    EXIT_CODE=$?

    if [[ $EXIT_CODE -ne 0 ]]; then
        if [[ "$USE_AGENT" == "true" ]]; then
            echo "Cursor exited with code $EXIT_CODE"
        else
            echo "Claude exited with code $EXIT_CODE"
        fi
        echo "Stopping loop."
        exit $EXIT_CODE
    fi

    # Run validation and push changes (build mode only)
    if [[ "$MODE" == "build" ]]; then
        echo ""
        echo "Running validation..."
        set +e
        # Capture validation output to both stdout and a temp file
        VALIDATION_OUTPUT=$(npm run validate 2>&1)
        VALIDATION_EXIT_CODE=$?
        set -e
        
        # Always log validation failures to validation.log for agent reference
        # Note: Agents should append their attempted fixes to this file to prevent retrying failed fixes or repeatedly trying to fix something that is just a warning
        if [[ $VALIDATION_EXIT_CODE -ne 0 ]]; then
            # Preserve previous fix attempts if they exist
            PREVIOUS_ATTEMPTS=""
            if [[ -f validation.log ]]; then
                # Extract any "=== Attempted Fix ===" sections from previous log
                PREVIOUS_ATTEMPTS=$(grep -A 1000 "=== Attempted Fix ===" validation.log 2>/dev/null || true)
            fi
            
            {
                echo "=== Validation Failed ==="
                echo "Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
                echo "Iteration: $ITERATION"
                echo "Exit Code: $VALIDATION_EXIT_CODE"
                echo ""
                echo "$VALIDATION_OUTPUT"
                echo ""
                echo "=== End Validation Log ==="
            } > validation.log
            
            # Append previous fix attempts if any exist
            if [[ -n "$PREVIOUS_ATTEMPTS" ]]; then
                echo "" >> validation.log
                echo "$PREVIOUS_ATTEMPTS" >> validation.log
            fi
        fi
        
        if [[ $VALIDATION_EXIT_CODE -eq 0 ]]; then
            echo "✓ Validation passed"
            # Clear validation.log on successful validation
            if [[ -f validation.log ]]; then
                rm validation.log
            fi
            # Check if there are commits to push (commits ahead of origin/arcology)
            set +e
            # Try to get upstream branch name
            UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)
            if [[ -n "$UPSTREAM" ]]; then
                UNPUSHED_COMMITS=$(git rev-list --count "$UPSTREAM"..HEAD 2>/dev/null)
            else
                # No upstream set, check if origin/arcology exists
                if git show-ref --verify --quiet refs/remotes/origin/arcology; then
                    UNPUSHED_COMMITS=$(git rev-list --count origin/arcology..HEAD 2>/dev/null)
                else
                    UNPUSHED_COMMITS="0"
                fi
            fi
            set -e
            
            if [[ -z "$UNPUSHED_COMMITS" ]] || [[ "$UNPUSHED_COMMITS" == "0" ]]; then
                # No unpushed commits - check if there are uncommitted changes
                if git diff --quiet && git diff --staged --quiet; then
                    echo "No changes to push"
                else
                    echo "Validation passed but no commit found - agent should have committed"
                    echo "Skipping push (agent needs to commit changes)"
                fi
            else
                echo "Pushing $UNPUSHED_COMMITS commit(s)..."
                git push origin arcology 2>/dev/null || git push -u origin arcology 2>/dev/null || echo "Push failed"
            fi
        else
            # Validation failed - check if critical errors exist
            if has_critical_errors "$VALIDATION_OUTPUT"; then
                echo "✗ Validation failed - critical type errors detected"
                echo "Push blocked - must fix type errors before proceeding"
                echo "Validation errors logged to validation.log"
            else
                echo "⚠ Validation has warnings (lint/test) but no critical type errors"
                echo "Push allowed - warnings logged to validation.log for next iteration"
                # Allow push to proceed even with warnings
                set +e
                # Try to get upstream branch name
                UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)
                if [[ -n "$UPSTREAM" ]]; then
                    UNPUSHED_COMMITS=$(git rev-list --count "$UPSTREAM"..HEAD 2>/dev/null)
                else
                    # No upstream set, check if origin/arcology exists
                    if git show-ref --verify --quiet refs/remotes/origin/arcology; then
                        UNPUSHED_COMMITS=$(git rev-list --count origin/arcology..HEAD 2>/dev/null)
                    else
                        UNPUSHED_COMMITS="0"
                    fi
                fi
                set -e
                
                if [[ -z "$UNPUSHED_COMMITS" ]] || [[ "$UNPUSHED_COMMITS" == "0" ]]; then
                    # No unpushed commits - check if there are uncommitted changes
                    if git diff --quiet && git diff --staged --quiet; then
                        echo "No changes to push"
                    else
                        echo "Warnings present but no commit found - agent should have committed"
                        echo "Skipping push (agent needs to commit changes)"
                    fi
                else
                    echo "Pushing $UNPUSHED_COMMITS commit(s) despite warnings..."
                    git push origin arcology 2>/dev/null || git push -u origin arcology 2>/dev/null || echo "Push failed"
                fi
            fi
            # Always display validation output to stdout
            echo "$VALIDATION_OUTPUT"
        fi
    fi

    echo ""
    echo "Iteration $ITERATION complete."
    echo ""

    # Check iteration limit
    if [[ $MAX_ITERATIONS -gt 0 ]] && [[ $ITERATION -ge $MAX_ITERATIONS ]]; then
        echo "Reached max iterations ($MAX_ITERATIONS). Stopping."
        exit 0
    fi

    # Small delay between iterations
    sleep 2
done
