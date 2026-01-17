import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { SettingsScene } from './SettingsScene';
import { GameState } from '../utils/types';
import Phaser from 'phaser';

// Mock Phaser Scene
const createMockPhaserScene = (): Phaser.Scene => {
  return {
    scene: {
      start: vi.fn(),
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

// Mock AudioSystem
const createMockAudioSystem = () => {
  return {
    setMasterVolume: vi.fn(),
    setUIVolume: vi.fn(),
    setAmbientVolume: vi.fn(),
    setMuted: vi.fn(),
    isMuted: vi.fn().mockReturnValue(false),
  };
};

// Mock GameScene with AudioSystem
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockGameScene = (audioSystem?: any): any => {
  return {
    audioSystem: audioSystem || createMockAudioSystem(),
  };
};

describe('SettingsScene', () => {
  let scene: SettingsScene;
  let mockScene: Phaser.Scene;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockGameScene: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockAudioSystem: any;

  beforeEach(() => {
    localStorage.clear();
    mockScene = createMockPhaserScene();
    mockAudioSystem = createMockAudioSystem();
    mockGameScene = createMockGameScene(mockAudioSystem);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockScene.scene as any).get = vi.fn().mockReturnValue(mockGameScene);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockScene.registry as any).get = vi.fn().mockReturnValue(GameState.PLAYING);
    
    scene = new SettingsScene();
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    localStorage.clear();
    // Clean up DOM
    const overlay = document.querySelector('.settings-menu')?.parentElement;
    if (overlay) {
      overlay.remove();
    }
  });

  describe('create', () => {
    test('creates settings UI with all controls', () => {
      scene.create();

      const container = document.querySelector('.settings-menu');
      expect(container).toBeTruthy();

      const title = container?.querySelector('h2');
      expect(title?.textContent).toBe('SETTINGS');

      const sliders = container?.querySelectorAll('input[type="range"]');
      expect(sliders?.length).toBe(3); // Master, UI, Ambient volume

      const speedButtons = container?.querySelectorAll('button');
      // Should have 3 speed buttons (1x, 2x, 4x) + Reset + Back = 5 buttons
      expect(speedButtons?.length).toBeGreaterThanOrEqual(3);
    });

    test('loads default settings when no saved settings exist', () => {
      scene.create();

      const masterSlider = Array.from(document.querySelectorAll('input[type="range"]')).find(
        (input) => (input as HTMLInputElement).value === '80'
      ) as HTMLInputElement;
      expect(masterSlider).toBeTruthy();
    });

    test('loads saved settings from localStorage', () => {
      const savedSettings = {
        masterVolume: 50,
        uiVolume: 75,
        ambientVolume: 25,
        defaultGameSpeed: 2,
        muted: true,
      };
      localStorage.setItem('arcology_settings', JSON.stringify(savedSettings));

      scene = new SettingsScene();
      Object.assign(scene, mockScene);
      scene.create();

      const sliders = Array.from(document.querySelectorAll('input[type="range"]')) as HTMLInputElement[];
      expect(sliders[0].value).toBe('50');
      expect(sliders[1].value).toBe('75');
      expect(sliders[2].value).toBe('25');
      
      // Check mute toggle is in muted state
      const muteToggle = document.querySelector('[style*="left: 24px"]');
      expect(muteToggle).toBeTruthy();
    });

    test('updates AudioSystem when GameScene is active', () => {
      scene.create();

      expect(mockAudioSystem.setMasterVolume).toHaveBeenCalled();
      expect(mockAudioSystem.setUIVolume).toHaveBeenCalled();
      expect(mockAudioSystem.setAmbientVolume).toHaveBeenCalled();
      expect(mockAudioSystem.setMuted).toHaveBeenCalled();
    });

    test('handles missing GameScene gracefully', () => {
      (mockScene.scene as any).get = vi.fn().mockReturnValue(null);
      
      expect(() => scene.create()).not.toThrow();
    });
  });

  describe('volume sliders', () => {
    test('master volume slider updates AudioSystem and saves to localStorage', () => {
      scene.create();

      const masterSlider = Array.from(document.querySelectorAll('input[type="range"]'))[0] as HTMLInputElement;
      masterSlider.value = '60';
      masterSlider.dispatchEvent(new Event('input'));

      expect(mockAudioSystem.setMasterVolume).toHaveBeenCalledWith(0.6);
      
      const saved = JSON.parse(localStorage.getItem('arcology_settings') || '{}');
      expect(saved.masterVolume).toBe(60);
    });

    test('UI volume slider updates AudioSystem and saves to localStorage', () => {
      scene.create();

      const uiSlider = Array.from(document.querySelectorAll('input[type="range"]'))[1] as HTMLInputElement;
      uiSlider.value = '90';
      uiSlider.dispatchEvent(new Event('input'));

      expect(mockAudioSystem.setUIVolume).toHaveBeenCalledWith(0.9);
      
      const saved = JSON.parse(localStorage.getItem('arcology_settings') || '{}');
      expect(saved.uiVolume).toBe(90);
    });

    test('ambient volume slider updates AudioSystem and saves to localStorage', () => {
      scene.create();

      const ambientSlider = Array.from(document.querySelectorAll('input[type="range"]'))[2] as HTMLInputElement;
      ambientSlider.value = '30';
      ambientSlider.dispatchEvent(new Event('input'));

      expect(mockAudioSystem.setAmbientVolume).toHaveBeenCalledWith(0.3);
      
      const saved = JSON.parse(localStorage.getItem('arcology_settings') || '{}');
      expect(saved.ambientVolume).toBe(30);
    });

    test('volume slider updates value display', () => {
      scene.create();

      const masterSlider = Array.from(document.querySelectorAll('input[type="range"]'))[0] as HTMLInputElement;
      const valueDisplay = masterSlider.parentElement?.querySelector('span');
      
      masterSlider.value = '45';
      masterSlider.dispatchEvent(new Event('input'));

      expect(valueDisplay?.textContent).toBe('45%');
    });
  });

  describe('speed selector', () => {
    test('speed buttons update defaultGameSpeed and save to localStorage', () => {
      scene.create();

      const speedButtons = Array.from(document.querySelectorAll('button')).filter(
        (btn) => btn.textContent === '1x' || btn.textContent === '2x' || btn.textContent === '4x'
      );
      
      const speed2xButton = speedButtons.find((btn) => btn.textContent === '2x') as HTMLButtonElement;
      speed2xButton.click();

      const saved = JSON.parse(localStorage.getItem('arcology_settings') || '{}');
      expect(saved.defaultGameSpeed).toBe(2);
    });

    test('selected speed button has active styling', () => {
      scene.create();

      const speedButtons = Array.from(document.querySelectorAll('button')).filter(
        (btn) => btn.textContent === '1x' || btn.textContent === '2x' || btn.textContent === '4x'
      );
      
      const speed1xButton = speedButtons.find((btn) => btn.textContent === '1x') as HTMLButtonElement;
      const initialBackground = speed1xButton.style.background;
      
      expect(initialBackground).toContain('var(--primary)');
    });
  });

  describe('reset to defaults', () => {
    test('reset button restores default settings', () => {
      // Set custom settings
      localStorage.setItem('arcology_settings', JSON.stringify({
        masterVolume: 50,
        uiVolume: 75,
        ambientVolume: 25,
        defaultGameSpeed: 4,
        muted: true,
      }));

      scene = new SettingsScene();
      Object.assign(scene, mockScene);
      scene.create();

      const resetButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Reset to Defaults'
      ) as HTMLButtonElement;
      
      resetButton.click();

      const saved = JSON.parse(localStorage.getItem('arcology_settings') || '{}');
      expect(saved.masterVolume).toBe(80);
      expect(saved.uiVolume).toBe(100);
      expect(saved.ambientVolume).toBe(50);
      expect(saved.defaultGameSpeed).toBe(1);
      expect(saved.muted).toBe(false);
    });

    test('reset button updates AudioSystem', () => {
      scene.create();

      const resetButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Reset to Defaults'
      ) as HTMLButtonElement;
      
      resetButton.click();

      expect(mockAudioSystem.setMasterVolume).toHaveBeenCalledWith(0.8);
      expect(mockAudioSystem.setUIVolume).toHaveBeenCalledWith(1.0);
      expect(mockAudioSystem.setAmbientVolume).toHaveBeenCalledWith(0.5);
      expect(mockAudioSystem.setMuted).toHaveBeenCalledWith(false);
    });
  });

  describe('back button', () => {
    test('back button returns to PauseMenuScene when game is paused', () => {
      (mockScene.registry as any).get = vi.fn().mockReturnValue(GameState.PAUSED);
      
      scene.create();

      const backButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Back'
      ) as HTMLButtonElement;
      
      backButton.click();

      expect((mockScene.scene as any).start).toHaveBeenCalledWith('PauseMenuScene');
    });

    test('back button returns to MainMenuScene when game is not paused', () => {
      (mockScene.registry as any).get = vi.fn().mockReturnValue(GameState.MAIN_MENU);
      
      scene.create();

      const backButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Back'
      ) as HTMLButtonElement;
      
      backButton.click();

      expect((mockScene.scene as any).start).toHaveBeenCalledWith('MainMenuScene');
    });
  });

  describe('ESC key handling', () => {
    test('ESC key triggers goBack', () => {
      scene.create();

      const escHandler = (mockScene.input.keyboard as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'keydown-ESC'
      )?.[1];
      
      expect(escHandler).toBeTruthy();
      
      escHandler();
      
      expect((mockScene.scene as any).start).toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    test('removes overlay from DOM', () => {
      scene.create();

      const overlay = document.querySelector('.settings-menu')?.parentNode;
      expect(overlay).toBeTruthy();

      (scene as any).cleanup();

      expect(document.querySelector('.settings-menu')).toBeNull();
    });
  });

  describe('shutdown', () => {
    test('calls cleanup on shutdown', () => {
      scene.create();

      const overlay = document.querySelector('.settings-menu')?.parentNode;
      expect(overlay).toBeTruthy();

      scene.shutdown();

      expect(document.querySelector('.settings-menu')).toBeNull();
    });
  });

  describe('mute toggle', () => {
    test('mute toggle exists in UI', () => {
      scene.create();

      const muteLabel = Array.from(document.querySelectorAll('label')).find(
        (label) => label.textContent === 'Mute Audio'
      );
      expect(muteLabel).toBeTruthy();
    });

    test('mute toggle updates AudioSystem and saves to localStorage', () => {
      scene.create();

      const muteToggle = document.querySelector('[style*="left: 2px"]')?.parentElement as HTMLElement;
      expect(muteToggle).toBeTruthy();
      
      muteToggle.click();

      expect(mockAudioSystem.setMuted).toHaveBeenCalledWith(true);
      
      const saved = JSON.parse(localStorage.getItem('arcology_settings') || '{}');
      expect(saved.muted).toBe(true);
    });

    test('mute toggle visual state updates when clicked', () => {
      scene.create();

      const muteToggle = document.querySelector('[style*="left: 2px"]')?.parentElement as HTMLElement;
      const toggleSwitch = muteToggle.querySelector('div[style*="left:"]') as HTMLElement;
      
      expect(toggleSwitch.style.left).toBe('2px');
      
      muteToggle.click();

      // After click, toggle should be in muted position
      const updatedToggle = document.querySelector('[style*="left: 24px"]') as HTMLElement;
      expect(updatedToggle).toBeTruthy();
    });

    test('mute toggle can be toggled back to unmuted', () => {
      // Set initial state to muted
      localStorage.setItem('arcology_settings', JSON.stringify({
        masterVolume: 80,
        uiVolume: 100,
        ambientVolume: 50,
        defaultGameSpeed: 1,
        muted: true,
      }));

      scene = new SettingsScene();
      Object.assign(scene, mockScene);
      scene.create();

      const muteToggle = document.querySelector('[style*="left: 24px"]')?.parentElement as HTMLElement;
      expect(muteToggle).toBeTruthy();
      
      muteToggle.click();

      expect(mockAudioSystem.setMuted).toHaveBeenCalledWith(false);
      
      const saved = JSON.parse(localStorage.getItem('arcology_settings') || '{}');
      expect(saved.muted).toBe(false);
    });

    test('mute label click also toggles mute', () => {
      scene.create();

      const muteLabel = Array.from(document.querySelectorAll('label')).find(
        (label) => label.textContent === 'Mute Audio'
      ) as HTMLLabelElement;
      
      muteLabel.click();

      expect(mockAudioSystem.setMuted).toHaveBeenCalledWith(true);
    });
  });
});
