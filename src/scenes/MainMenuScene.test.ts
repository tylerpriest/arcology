import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { MainMenuScene } from './MainMenuScene';
import { GameState } from '../utils/types';
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
    input: {},
    cameras: {
      main: {
        width: 1280,
        height: 720,
      },
    },
    add: {},
    load: {},
  } as unknown as Phaser.Scene;
};

// Mock VenusAtmosphere
vi.mock('../graphics/VenusAtmosphere', () => ({
  VenusAtmosphere: vi.fn().mockImplementation(() => ({
    updateSkyGradient: vi.fn(),
  })),
}));

describe('MainMenuScene', () => {
  let scene: MainMenuScene;
  let mockScene: Phaser.Scene;

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    
    // Create mock scene
    mockScene = createMockPhaserScene();
    scene = new MainMenuScene();
    // Copy mock properties to scene
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    // Clean up DOM
    const menuContainer = document.querySelector('.main-menu');
    if (menuContainer) {
      menuContainer.remove();
    }
    localStorage.clear();
  });

  describe('create', () => {
    test('creates menu UI with all buttons', () => {
      scene.create();

      const menuContainer = document.querySelector('.main-menu');
      expect(menuContainer).toBeTruthy();

      const buttons = menuContainer?.querySelectorAll('button');
      expect(buttons?.length).toBe(4);
      expect(buttons?.[0]?.textContent).toBe('New Game');
      expect(buttons?.[1]?.textContent).toBe('Continue');
      expect(buttons?.[2]?.textContent).toBe('Load Game');
      expect(buttons?.[3]?.textContent).toBe('Settings');
    });

    test('displays title', () => {
      scene.create();

      const title = document.querySelector('.main-menu h1');
      expect(title?.textContent).toBe('ARCOLOGY');
    });

    test('displays version badge', () => {
      scene.create();

      const version = document.querySelector('.main-menu div:last-child');
      expect(version?.textContent).toBe('v0.1.0');
    });

    test('enables Continue button when auto-save exists', () => {
      // Create mock auto-save
      const mockSave = {
        timestamp: Date.now(),
        time: { day: 5 },
        residents: [],
        economy: { money: 20000 },
      };
      localStorage.setItem('arcology_save_0', JSON.stringify(mockSave));

      scene.create();

      const continueButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Continue'
      ) as HTMLButtonElement;
      expect(continueButton).toBeTruthy();
      expect(continueButton.disabled).toBe(false);
      expect(continueButton.style.opacity).toBe('1');
    });

    test('disables Continue button when no auto-save exists', () => {
      scene.create();

      const continueButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Continue'
      ) as HTMLButtonElement;
      expect(continueButton).toBeTruthy();
      expect(continueButton.disabled).toBe(true);
      expect(continueButton.style.opacity).toBe('0.5');
    });
  });

  describe('button clicks', () => {
    test('New Game button starts GameScene', () => {
      scene.create();

      const newGameButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'New Game'
      ) as HTMLButtonElement;
      
      newGameButton.click();

      expect((mockScene.registry as any).set).toHaveBeenCalledWith('gameState', GameState.PLAYING);
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('GameScene');
    });

    test('Continue button loads auto-save and starts GameScene', () => {
      const mockSave = {
        timestamp: Date.now(),
        time: { day: 5 },
        residents: [],
        economy: { money: 20000 },
      };
      localStorage.setItem('arcology_save_0', JSON.stringify(mockSave));

      scene.create();

      const continueButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Continue'
      ) as HTMLButtonElement;
      
      continueButton.click();

      expect((mockScene.registry as any).set).toHaveBeenCalledWith('loadSaveSlot', 0);
      expect((mockScene.registry as any).set).toHaveBeenCalledWith('gameState', GameState.PLAYING);
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('GameScene');
    });

    test('Continue button does nothing when no auto-save exists', () => {
      scene.create();

      const continueButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Continue'
      ) as HTMLButtonElement;
      
      const startCallCount = (mockScene.scene as any).start.mock.calls.length;
      continueButton.click();

      // Should not start GameScene if no auto-save
      expect((mockScene.scene as any).start.mock.calls.length).toBe(startCallCount);
    });

    test('Load Game button starts LoadGameScene', () => {
      scene.create();

      const loadGameButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Load Game'
      ) as HTMLButtonElement;
      
      loadGameButton.click();

      expect((mockScene.scene as any).start).toHaveBeenCalledWith('LoadGameScene');
    });

    test('Settings button starts SettingsScene', () => {
      scene.create();

      const settingsButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Settings'
      ) as HTMLButtonElement;
      
      settingsButton.click();

      expect((mockScene.scene as any).start).toHaveBeenCalledWith('SettingsScene');
    });
  });

  describe('cleanup', () => {
    test('removes menu container from DOM', () => {
      scene.create();

      const menuContainer = document.querySelector('.main-menu');
      expect(menuContainer).toBeTruthy();

      (scene as any).cleanup();

      expect(document.querySelector('.main-menu')).toBeNull();
    });
  });

  describe('shutdown', () => {
    test('calls cleanup on shutdown', () => {
      scene.create();

      const menuContainer = document.querySelector('.main-menu');
      expect(menuContainer).toBeTruthy();

      scene.shutdown();

      expect(document.querySelector('.main-menu')).toBeNull();
    });
  });
});
