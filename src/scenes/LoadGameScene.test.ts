import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { LoadGameScene } from './LoadGameScene';
import Phaser from 'phaser';

// Mock Phaser Scene
const createMockPhaserScene = (): Phaser.Scene => {
  return {
    scene: {
      start: vi.fn(),
    },
    registry: {
      set: vi.fn(),
      get: vi.fn(),
    } as any,
    input: {
      keyboard: {
        on: vi.fn(),
      },
    },
  } as unknown as Phaser.Scene;
};

describe('LoadGameScene', () => {
  let scene: LoadGameScene;
  let mockScene: Phaser.Scene;

  beforeEach(() => {
    localStorage.clear();
    mockScene = createMockPhaserScene();
    scene = new LoadGameScene();
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    localStorage.clear();
    // Clean up DOM
    const overlay = document.querySelector('.load-game-menu')?.parentElement;
    if (overlay) {
      overlay.remove();
    }
  });

  describe('create', () => {
    test('creates load game UI with title', () => {
      scene.create();

      const title = document.querySelector('.load-game-menu h2');
      expect(title).toBeTruthy();
      expect(title?.textContent).toBe('LOAD GAME');
    });

    test('creates save slot buttons for all slots', () => {
      scene.create();

      const slotButtons = document.querySelectorAll('.save-slot-button');
      expect(slotButtons.length).toBe(4); // Slots 0-3
    });

    test('displays empty slots correctly', () => {
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const emptySlot = slotButtons.find((btn) => btn.textContent?.includes('Empty')) as HTMLElement;
      
      expect(emptySlot).toBeTruthy();
      expect(emptySlot?.style.opacity).toBe('0.5');
    });

    test('displays filled slots with metadata', () => {
      const mockSave = {
        timestamp: Date.now(),
        time: { day: 5 },
        residents: [{ id: '1' }, { id: '2' }],
        economy: { money: 20000 },
      };
      localStorage.setItem('arcology_save_0', JSON.stringify(mockSave));

      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const filledSlot = slotButtons[0] as HTMLElement;
      
      expect(filledSlot?.textContent).toContain('Auto-Save');
      expect(filledSlot?.textContent).toContain('Cycle: 5');
      expect(filledSlot?.textContent).toContain('Residents: 2');
      expect(filledSlot?.textContent).toContain('Credits:');
      expect(filledSlot?.style.opacity).toBe('1');
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const escHandler = (mockScene.input.keyboard as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'keydown-ESC'
      )?.[1];
      
      expect(escHandler).toBeTruthy();
      
      escHandler();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('MainMenuScene');
    });
  });

  describe('slot selection', () => {
    test('empty slot is not clickable', () => {
      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const emptySlot = slotButtons.find((btn) => btn.textContent?.includes('Empty')) as HTMLButtonElement;
      
      expect(emptySlot?.style.cursor).toBe('default');
    });

    test('filled slot is clickable', () => {
      const mockSave = {
        timestamp: Date.now(),
        time: { day: 5 },
        residents: [],
        economy: { money: 20000 },
      };
      localStorage.setItem('arcology_save_1', JSON.stringify(mockSave));

      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const filledSlot = slotButtons[1] as HTMLButtonElement;
      
      expect(filledSlot?.style.cursor).toBe('pointer');
    });

    test('clicking filled slot sets loadSaveSlot and starts GameScene', () => {
      const mockSave = {
        timestamp: Date.now(),
        time: { day: 5 },
        residents: [],
        economy: { money: 20000 },
      };
      localStorage.setItem('arcology_save_1', JSON.stringify(mockSave));

      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const filledSlot = slotButtons[1] as HTMLButtonElement;
      
      filledSlot.click();

      expect((mockScene.registry as any).set).toHaveBeenCalledWith('loadSaveSlot', 1);
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('GameScene');
    });
  });

  describe('getSaveSlotMetadata', () => {
    test('returns metadata for all slots', () => {
      const mockSave = {
        timestamp: Date.now(),
        time: { day: 3 },
        residents: [{ id: '1' }],
        economy: { money: 15000 },
      };
      localStorage.setItem('arcology_save_2', JSON.stringify(mockSave));

      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      expect(slotButtons.length).toBe(4);
      
      // Slot 2 should be filled
      expect(slotButtons[2]?.textContent).toContain('Slot 2');
      expect(slotButtons[2]?.textContent).toContain('Cycle: 3');
      expect(slotButtons[2]?.textContent).toContain('Residents: 1');
    });

    test('handles corrupted save data gracefully', () => {
      localStorage.setItem('arcology_save_1', 'invalid json');

      scene.create();

      const slotButtons = Array.from(document.querySelectorAll('.save-slot-button'));
      const corruptedSlot = slotButtons[1];
      
      expect(corruptedSlot?.textContent).toContain('Empty');
    });
  });

  describe('shutdown', () => {
    test('removes overlay from DOM', () => {
      scene.create();

      const overlay = document.querySelector('.load-game-menu')?.parentNode;
      expect(overlay).toBeTruthy();

      scene.shutdown();

      expect(document.querySelector('.load-game-menu')?.parentNode).toBeNull();
    });
  });
});
