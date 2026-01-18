# Implementation Plan - Arcology MVP

> Prioritized task list for Arcology MVP. Updated to reflect current codebase analysis and test status.

**Last Updated:** 2026-01-18 - Analyzed `src` and confirmed 24 failing tests.

## Executive Summary

**Current Status:**
- ✅ **Phase 0-4 (Core Systems): COMPLETE** - Audio, Economy, Time, Resource, Restaurant, Resident (Visuals/Traits) are implemented.
- ⚠️ **Phase 5 (Traffic Loop): PARTIALLY IMPLEMENTED**
    - `CongestionSystem.ts` and `LobbyExtensionSystem.ts` are implemented logic-wise.
    - **Missing Integration**: Residents ignore congestion (constant speed).
    - **Missing UI**: No way for player to trigger `extendLobby()`.
- ❌ **Validation**: 24 failing tests across critical systems (Mock issues, logic errors, integration gaps).

## Prioritized Task List

### IMMEDIATE (P0 - Validation Critical)

Fix the 24 failing tests to establish a stable baseline.

1.  **Fix GameScene.test.ts (9 failures)**
    -   **Issues**: `window.alert` not implemented, `createMockPhaserScene` missing graphics methods (setDepth, etc.), `auto-save` spy not called, `ESC` key test expects `PauseMenuScene` but got `UIScene`, undefined checks failing.
    -   **Task**: Update `src/test/setup.ts` to mock `window.alert`.
    -   **Task**: Update `createMockPhaserScene` in `src/test/setup.ts` to include missing graphics methods/spies.
    -   **Task**: Fix `GameScene` key handling or test expectation for ESC key (likely scene layering issue).
    -   **Task**: Debug auto-save timer logic in test environment.

2.  **Fix BootScene.test.ts (2 failures)**
    -   **Issues**: Spy argument mismatch (y-coordinate changed 670->310), `loadingText.destroy` is undefined.
    -   **Task**: Update test expectations to match current layout.
    -   **Task**: Ensure `loadingText` mock is correctly created/destroyed.

3.  **Fix ElevatorSystem.test.ts (1 failure)**
    -   **Issue**: `should update max floor when building grows` fails (expected 10, got 14).
    -   **Task**: Fix `update` logic in `ElevatorShaft` or test expectation regarding zone limits.

4.  **Fix ResidentSystem.test.ts (1 failure)**
    -   **Issue**: Office workers not leaving on weekends (count 6, expected 0).
    -   **Task**: Debug `spawnOfficeWorkers` / `removeOfficeWorkers` logic in `ResidentSystem.ts`.

5.  **Fix ResourceSystem.test.ts (10 failures)**
    -   **Issues**: Production/Consumption logic errors (0 produced), Rate mismatch (expected ~10, got ~100 or ~0), Floating point precision issues.
    -   **Task**: Debug `update` loop in `ResourceSystem` to ensure correct delta time usage and rate application.
    -   **Task**: Verify production scaling formulas match tests.

6.  **Fix RestaurantSystem.test.ts (4 failures)**
    -   **Issues**: Consuming food/calculating income when closed, Total demand calculation error.
    -   **Task**: Add `isRestaurantOpen` check to `processDailyOperations` loop.

7.  **Fix Sidebar.test.ts (1 failure)**
    -   **Issue**: Callback argument mismatch (`build-zone` vs `economy`).
    -   **Task**: Verify `setActiveSection` logic in `Sidebar.ts` and test expectations.

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
    -   **File**: `src/ui/components/RoomInfoPanel.ts`
    -   **Task**: Update `RoomInfoPanel` to detect if selected room is a Lobby.
    -   **Task**: Add "Current Width: X" display.
    -   **Task**: Add "Extend (+5)" and "Shrink (-5)" buttons.
    -   **Task**: Show cost/refund preview.

2.  **Connect to System**
    -   **File**: `src/ui/components/RoomInfoPanel.ts` / `GameScene.ts`
    -   **Task**: Wire UI buttons to `lobbyExtensionSystem.extendLobby()` via scene event or direct call.

### P3 - Polish & Balance

1.  **Tuning**: Adjust `CongestionSystem` thresholds and `Resident` movement speed constants.
2.  **Feedback**: Add audio/visual cues for high congestion (angry bubbles).

---

## Known Issues

- **Test vs Code Drift**: Significant drift in `ResourceSystem` and `RestaurantSystem` logic vs tests.
- **UI Gap**: `RoomInfoPanel` is generic and lacks specific controls for unique room types like Lobbies.

## Next Steps

1.  **Execute P0 Fixes**: Get to green state (Priority #1).
2.  **Implement P1**: Make congestion actually affect residents.
3.  **Implement P2**: Give player control over lobby size.
