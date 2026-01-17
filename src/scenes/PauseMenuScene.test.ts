import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { PauseMenuScene } from './PauseMenuScene';
import { GameState } from '../utils/types';
import Phaser from 'phaser';

// Mock Phaser Scene
const createMockPhaserScene = (): Phaser.Scene => {
  return {
    scene: {
      start: vi.fn(),
      stop: vi.fn(),
      get: vi.fn(),
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

// Mock GameScene with TimeSystem
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockGameScene = (): any => {
  return {
    scene: {
      isActive: () => true,
    },
    timeSystem: {
      setSpeed: vi.fn(),
    },
  };
};

describe('PauseMenuScene', () => {
  let scene: PauseMenuScene;
  let mockScene: Phaser.Scene;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockGameScene: any;

  beforeEach(() => {
    mockScene = createMockPhaserScene();
    mockGameScene = createMockGameScene();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockScene.scene as any).get = vi.fn().mockReturnValue(mockGameScene);
    
    scene = new PauseMenuScene();
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    // Clean up DOM
    const overlay = document.querySelector('.pause-menu')?.parentElement;
    if (overlay) {
      overlay.remove();
    }
  });

  describe('create', () => {
    test('creates pause menu UI with all buttons', () => {
      scene.create();

      const menuContainer = document.querySelector('.pause-menu');
      expect(menuContainer).toBeTruthy();

      const buttons = menuContainer?.querySelectorAll('button');
      expect(buttons?.length).toBe(4);
      expect(buttons?.[0]?.textContent).toBe('Resume');
      expect(buttons?.[1]?.textContent).toBe('Save Game');
      expect(buttons?.[2]?.textContent).toBe('Settings');
      expect(buttons?.[3]?.textContent).toBe('Quit to Main Menu');
    });

    test('displays title', () => {
      scene.create();

      const title = document.querySelector('.pause-menu h2');
      expect(title?.textContent).toBe('PAUSED');
    });

    test('pauses game by setting speed to 0', () => {
      scene.create();

      expect(mockGameScene.timeSystem.setSpeed).toHaveBeenCalledWith(0);
    });

    test('sets game state to PAUSED', () => {
      scene.create();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.registry as any).set).toHaveBeenCalledWith('gameState', GameState.PAUSED);
    });

    test('handles missing GameScene gracefully', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.scene as any).get = vi.fn().mockReturnValue(null);
      
      expect(() => scene.create()).not.toThrow();
    });
  });

  describe('button clicks', () => {
    test('Resume button resumes game and stops pause scene', () => {
      scene.create();

      const resumeButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Resume'
      ) as HTMLButtonElement;
      
      resumeButton.click();

      expect(mockGameScene.timeSystem.setSpeed).toHaveBeenCalledWith(1);
      expect((mockScene.registry as any).set).toHaveBeenCalledWith('gameState', GameState.PLAYING);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).stop).toHaveBeenCalled();
    });

    test('Save Game button starts SaveGameScene', () => {
      scene.create();

      const saveGameButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Save Game'
      ) as HTMLButtonElement;
      
      saveGameButton.click();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('SaveGameScene');
    });

    test('Settings button starts SettingsScene', () => {
      scene.create();

      const settingsButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Settings'
      ) as HTMLButtonElement;
      
      settingsButton.click();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('SettingsScene');
    });

    test('Quit to Main Menu button stops GameScene and UIScene and starts MainMenuScene', () => {
      scene.create();

      const quitButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Quit to Main Menu'
      ) as HTMLButtonElement;
      
      quitButton.click();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).stop).toHaveBeenCalledWith('GameScene');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).stop).toHaveBeenCalledWith('UIScene');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('MainMenuScene');
    });
  });

  describe('ESC key handling', () => {
    test('ESC key resumes game', () => {
      scene.create();

      const escHandler = (mockScene.input.keyboard as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'keydown-ESC'
      )?.[1];
      
      expect(escHandler).toBeTruthy();
      
      escHandler();
      
      expect(mockGameScene.timeSystem.setSpeed).toHaveBeenCalledWith(1);
      expect((mockScene.registry as any).set).toHaveBeenCalledWith('gameState', GameState.PLAYING);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).stop).toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    test('removes overlay from DOM', () => {
      scene.create();

      const overlay = document.querySelector('.pause-menu')?.parentNode;
      expect(overlay).toBeTruthy();

      (scene as any).cleanup();

      expect(document.querySelector('.pause-menu')).toBeNull();
    });
  });

  describe('shutdown', () => {
    test('calls cleanup on shutdown', () => {
      scene.create();

      const overlay = document.querySelector('.pause-menu')?.parentNode;
      expect(overlay).toBeTruthy();

      scene.shutdown();

      expect(document.querySelector('.pause-menu')).toBeNull();
    });
  });
});
