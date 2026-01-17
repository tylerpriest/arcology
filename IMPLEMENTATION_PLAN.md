# Implementation Plan - Arcology MVP

> Prioritized task list for Arcology MVP. Updated to reflect current codebase analysis and test status.

**Last Updated:** 2026-01-18 - Analyzed `src` and tests. 20 test failures confirmed.

## Executive Summary

**Current Status:**
- ✅ **Phase 0-4 (Core Systems): COMPLETE** - Audio, Economy, Time, Resource, Restaurant, Resident (Visuals/Traits) are implemented.
- ⚠️ **Phase 5 (Traffic Loop): PARTIALLY IMPLEMENTED**
    - `CongestionSystem.ts` and `LobbyExtensionSystem.ts` are implemented but isolated.
    - `Resident.ts` has movement logic but ignores congestion.
    - **Missing Integration**: Residents walk at constant speed regardless of crowding.
    - **Missing UI**: No way for player to trigger `extendLobby()`.
- ❌ **Validation**: 20 failing tests (Mock issues, logic errors, and integration gaps).

## Prioritized Task List

### IMMEDIATE (P0 - Validation Critical)

Fix the 20 failing tests to establish a stable baseline.

1.  **Fix GameScene.test.ts (9 failures)**
    -   **Issue**: `window.alert` not implemented in jsdom.
    -   **Issue**: `createMockPhaserScene` missing `setDepth` and other graphics methods on spies.
    -   **Issue**: `auto-save` spy not called (logic error or mock time issue).
    -   **Issue**: `ESC` key test expects `PauseMenuScene` but got `UIScene`.
    -   **Task**: Update `src/test/setup.ts` to mock `window.alert`.
    -   **Task**: Update `createMockPhaserScene` in `src/test/setup.ts` to include missing graphics methods.
    -   **Task**: Fix `GameScene` key handling or test expectation for ESC key.

2.  **Fix BootScene.test.ts (2 failures)**
    -   **Issue**: Spy argument mismatch for progress bar (y-coordinate changed).
    -   **Issue**: `loadingText.destroy` is undefined.
    -   **Task**: Update test expectations to match current layout.
    -   **Task**: Ensure `loadingText` mock is correctly created/destroyed.

3.  **Fix ElevatorSystem.test.ts (1 failure)**
    -   **Issue**: `should update max floor when building grows` fails (expected 10, got 14).
    -   **Task**: Fix `update` logic in `ElevatorShaft` or test expectation regarding zone limits.

4.  **Fix ResidentSystem.test.ts (1 failure)**
    -   **Issue**: Office workers not leaving on weekends (count 6, expected 0).
    -   **Task**: Debug `spawnOfficeWorkers` / `removeOfficeWorkers` logic in `ResidentSystem.ts`.

5.  **Fix ResourceSystem.test.ts (5 failures)**
    -   **Issue**: Production/Consumption logic errors (0 produced).
    -   **Issue**: Rate mismatch (expected ~10, got ~100).
    -   **Task**: Debug `update` loop in `ResourceSystem` to ensure correct delta time usage and rate application.

6.  **Fix RestaurantSystem.test.ts (3 failures)**
    -   **Issue**: `processDailyOperations` consuming food when closed.
    -   **Issue**: Income calculation mismatch.
    -   **Task**: Add `isRestaurantOpen` check to `processDailyOperations` loop.

7.  **Fix Sidebar.test.ts (1 failure)**
    -   **Issue**: Callback argument mismatch (`build-zone` vs `economy`).
    -   **Task**: Verify `setActiveSection` logic in `Sidebar.ts`.

### P1 - Traffic Loop Integration (Congestion)

Connect the implemented `CongestionSystem` to gameplay.

1.  **Apply Congestion to Movement**
    -   **File**: `src/entities/Resident.ts`
    -   **Task**: Inject `CongestionSystem` into `Resident`.
    -   **Task**: In `updateWalking` and `updateWalkingToElevator`, call `congestionSystem.getSpeedPenalty(currentRoomId)`.
    -   **Task**: Multiply movement speed by penalty factor.

2.  **Congestion Visualization**
    -   **File**: `src/graphics/CongestionOverlay.ts` (New)
    -   **Task**: Create overlay that colors rooms based on `congestionSystem.getCongestionLevel()`.
    -   **Task**: Toggle with 'C' key or UI button.

### P2 - Lobby Extension UI

Enable the player to use the existing `LobbyExtensionSystem`.

1.  **Add Extension Controls**
    -   **File**: `src/ui/components/LobbyControlPanel.ts` (New) or extend `RoomInfoPanel.ts`.
    -   **Task**: When Lobby is selected, show "Current Width: X".
    -   **Task**: Add "Extend (+5)" and "Shrink (-5)" buttons.
    -   **Task**: Show cost/refund preview.

2.  **Connect to System**
    -   **File**: `src/scenes/GameScene.ts`
    -   **Task**: Wire UI buttons to `lobbyExtensionSystem.extendLobby()`.

### P3 - Polish & Balance

1.  **Tuning**: Adjust `CongestionSystem` thresholds and `Resident` movement speed constants.
2.  **Feedback**: Add audio/visual cues for high congestion (angry bubbles?).

---

## Known Issues

- **Test vs Code Drift**: `GameScene.test.ts` does not check for `congestionSystem` or `lobbyExtensionSystem` presence.
- **UI Gap**: `BuildMenu.ts` has no extension controls.

## Next Steps

1.  **Execute P0 Fixes**: Get to green state.
2.  **Implement P1**: Make congestion actually affect residents.
3.  **Implement P2**: Give player control over lobby size.