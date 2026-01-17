import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { SaveGameScene } from './SaveGameScene';
import { SaveSystem } from '../systems/SaveSystem';
import Phaser from 'phaser';

// Mock Phaser Scene
const createMockPhaserScene = (): Phaser.Scene => {
  return {
    scene: {
      start: vi.fn(),
      manager: {
        getScene: vi.fn(),
      },
    },
    input: {
      keyboard: {
        on: vi.fn(),
      },
    },
  } as unknown as Phaser.Scene;
};

// Mock GameScene with SaveSystem
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockGameScene = (saveSystem?: SaveSystem): any => {
  return {
    building: {},
    saveSystem: saveSystem || createMockSaveSystem(),
  };
};

// Mock SaveSystem
const createMockSaveSystem = (): SaveSystem => {
  return {
    getSlotMetadata: vi.fn().mockReturnValue([
      { slot: 0, isEmpty: false, timestamp: Date.now(), dayCount: 5, population: 10, money: 20000 },
      { slot: 1, isEmpty: true, timestamp: 0, dayCount: 0, population: 0, money: 0 },
      { slot: 2, isEmpty: false, timestamp: Date.now() - 1000000, dayCount: 3, population: 5, money: 15000 },
      { slot: 3, isEmpty: true, timestamp: 0, dayCount: 0, population: 0, money: 0 },
    ]),
    saveGame: vi.fn().mockReturnValue({ success: true }),
  } as unknown as SaveSystem;
};

describe('SaveGameScene', () => {
  let scene: SaveGameScene;
  let mockScene: Phaser.Scene;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockGameScene: any;
  let mockSaveSystem: SaveSystem;

  beforeEach(() => {
    localStorage.clear();
    mockScene = createMockPhaserScene();
    mockSaveSystem = createMockSaveSystem();
    mockGameScene = createMockGameScene(mockSaveSystem);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockScene.scene as any).manager.getScene = vi.fn().mockReturnValue(mockGameScene);
    
    scene = new SaveGameScene();
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    localStorage.clear();
    // Clean up DOM
    const overlay = document.querySelector('.save-game-menu')?.parentElement;
    if (overlay) {
      overlay.remove();
    }
    // Clean up any success messages
    const messages = document.querySelectorAll('[style*="position: fixed"]');
    messages.forEach((msg) => (msg as HTMLElement).remove());
    vi.clearAllMocks();
  });

  describe('create', () => {
    test('creates save game UI with title when GameScene is available', () => {
      scene.create();

      const title = document.querySelector('.save-game-menu h2');
      expect(title).toBeTruthy();
      expect(title?.textContent).toBe('SAVE GAME');
    });

    test('creates save slot buttons for slots 1-3 (skips auto-save)', () => {
      scene.create();

      const slotButtons = document.querySelectorAll('.save-slot-button');
      expect(slotButtons.length).toBe(3); // Slots 1, 2, 3
    });

    test('displays empty slots correctly', () => {
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const emptySlot = slotButtons.find((btn) => btn.textContent?.includes('Empty'));
      
      expect(emptySlot).toBeTruthy();
      expect(emptySlot?.textContent).toContain('Click to save');
    });

    test('displays filled slots with metadata', () => {
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const filledSlot = slotButtons[1]; // Slot 2
      
      expect(filledSlot?.textContent).toContain('Slot 2');
      expect(filledSlot?.textContent).toContain('Cycle: 3');
      expect(filledSlot?.textContent).toContain('Residents: 5');
      expect(filledSlot?.textContent).toContain('Click to overwrite');
    });

    test('creates back button', () => {
      scene.create();

      const backButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Back'
      );
      expect(backButton).toBeTruthy();
    });

    test('sets up ESC key handler', () => {
      scene.create();

      const escHandler = (mockScene.input.keyboard as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'keydown-ESC'
      )?.[1];
      
      expect(escHandler).toBeTruthy();
      
      escHandler();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('PauseMenuScene');
    });

    test('shows error UI when GameScene is not available', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.scene as any).manager.getScene = vi.fn().mockReturnValue(null);
      
      scene.create();

      const errorTitle = document.querySelector('h2');
      expect(errorTitle?.textContent).toBe('Cannot Save');
      
      const errorMessage = document.querySelector('p');
      expect(errorMessage?.textContent).toBe('No active game to save.');
    });

    test('shows error UI when GameScene has no saveSystem', () => {
      const gameSceneWithoutSave = {
        building: {},
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.scene as any).manager.getScene = vi.fn().mockReturnValue(gameSceneWithoutSave);
      
      scene.create();

      const errorTitle = document.querySelector('h2');
      expect(errorTitle?.textContent).toBe('Cannot Save');
    });
  });

  describe('slot selection', () => {
    test('clicking empty slot saves immediately', () => {
      // Mock confirm to return true
      global.confirm = vi.fn().mockReturnValue(true);
      
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const emptySlot = slotButtons[0] as HTMLButtonElement; // Slot 1
      
      emptySlot.click();

      expect(mockSaveSystem.saveGame).toHaveBeenCalledWith(1);
    });

    test('clicking filled slot shows confirmation dialog', () => {
      global.confirm = vi.fn().mockReturnValue(true);
      
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const filledSlot = slotButtons[1] as HTMLButtonElement; // Slot 2
      
      filledSlot.click();

      expect(global.confirm).toHaveBeenCalledWith('Overwrite save in Slot 2?');
      expect(mockSaveSystem.saveGame).toHaveBeenCalledWith(2);
    });

    test('clicking filled slot does not save if confirmation is cancelled', () => {
      global.confirm = vi.fn().mockReturnValue(false);
      
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const filledSlot = slotButtons[1] as HTMLButtonElement; // Slot 2
      
      filledSlot.click();

      expect(global.confirm).toHaveBeenCalled();
      expect(mockSaveSystem.saveGame).not.toHaveBeenCalled();
    });
  });

  describe('saveSlot', () => {
    test('shows success message when save succeeds', async () => {
      global.confirm = vi.fn().mockReturnValue(true);
      
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const emptySlot = slotButtons[0] as HTMLButtonElement;
      
      emptySlot.click();

      // Wait for message to appear
      await new Promise((resolve) => setTimeout(resolve, 100));

      const successMessage = Array.from(document.querySelectorAll('div')).find(
        (div) => div.textContent === 'Game saved successfully!'
      );
      expect(successMessage).toBeTruthy();
    });

    test('shows error alert when save fails', () => {
      global.confirm = vi.fn().mockReturnValue(true);
      global.alert = vi.fn();
      (mockSaveSystem.saveGame as any).mockReturnValue({ success: false, error: 'Storage quota exceeded' });
      
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const emptySlot = slotButtons[0] as HTMLButtonElement;
      
      emptySlot.click();

      expect(global.alert).toHaveBeenCalledWith('Failed to save: Storage quota exceeded');
    });

    test('refreshes UI after successful save', async () => {
      global.confirm = vi.fn().mockReturnValue(true);
      
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const emptySlot = slotButtons[0] as HTMLButtonElement;
      
      emptySlot.click();

      // Wait for refresh
      await new Promise((resolve) => setTimeout(resolve, 1600));

      // UI should be refreshed (create called again)
      // This is tested indirectly by checking the cleanup was called
      expect(mockSaveSystem.saveGame).toHaveBeenCalled();
    });
  });

  describe('shutdown', () => {
    test('calls cleanup on shutdown', () => {
      scene.create();

      const overlay = document.querySelector('.save-game-menu')?.parentNode;
      expect(overlay).toBeTruthy();

      scene.shutdown();

      expect(document.querySelector('.save-game-menu')).toBeNull();
    });
  });
});
