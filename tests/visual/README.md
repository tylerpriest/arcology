# Visual/UI Acceptance Criteria Tests

This directory contains browser-based visual tests for UI/UX and Graphics acceptance criteria that require visual inspection rather than programmatic validation.

## Setup

1. Install Playwright:
   ```bash
   npm install
   npx playwright install
   ```

2. Run the dev server (tests will start it automatically, but you can run it manually):
   ```bash
   npm run dev
   ```

## Running Tests

```bash
# Run all visual tests
npm run test:visual

# Run with UI mode (interactive)
npm run test:visual:ui

# Run specific test file
npx playwright test tests/visual/ui-ux.test.ts
```

## Test Structure

- `ui-ux.test.ts` - Tests for UI_UX.md acceptance criteria
- `graphics.test.ts` - Tests for GRAPHICS.md acceptance criteria

## Test Approach

These tests use screenshots and visual inspection to verify:
- Layout and visual hierarchy
- Styling (glass panels, scanlines, glitch effects)
- Color coding and visual feedback
- UI component appearance
- Graphics rendering (atmosphere, building, rooms, residents)

## Screenshots

Test screenshots are saved to `tests/visual/screenshots/` for visual verification. These are gitignored but can be reviewed locally.

## Future: LLM Review Integration

When `src/lib/llm-review.ts` is fully implemented, these tests can use LLM-as-judge for automated visual evaluation of screenshots, enabling:
- Automated visual style verification
- Aesthetic quality checks
- Brand consistency validation
- Subjective acceptance criteria evaluation

## Notes

- These tests require the game to be running (dev server)
- Some tests may need game state setup (rooms, residents, etc.)
- Visual tests are slower than unit tests and may be flaky
- Screenshots are used for manual review and future LLM integration
