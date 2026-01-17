import Phaser from 'phaser';
import { GameSettings, GameState } from '../utils/types';
import { playUIClick, playMenuOpen, playMenuClose } from '../utils/audio';

const SETTINGS_KEY = 'arcology_settings';
const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 80,
  uiVolume: 100,
  ambientVolume: 50,
  defaultGameSpeed: 1,
  muted: false,
};

export class SettingsScene extends Phaser.Scene {
  private settingsContainer!: HTMLDivElement;
  private settings: GameSettings;

  constructor() {
    super({ key: 'SettingsScene' });
    this.settings = this.loadSettings();
  }

  create(): void {
    // Play menu open sound
    playMenuOpen();

    this.createSettingsUI();
    
    // Load current settings into AudioSystem if GameScene is active
    const gameScene = this.scene.get('GameScene') as any;
    if (gameScene && gameScene.audioSystem) {
      const audioSystem = gameScene.audioSystem;
      audioSystem.setMasterVolume(this.settings.masterVolume / 100);
      audioSystem.setUIVolume(this.settings.uiVolume / 100);
      audioSystem.setAmbientVolume(this.settings.ambientVolume / 100);
      audioSystem.setMuted(this.settings.muted);
    }
  }

  private loadSettings(): GameSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
    return { ...DEFAULT_SETTINGS };
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  private createSettingsUI(): void {
    // Create overlay background
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 300;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Create settings container
    this.settingsContainer = document.createElement('div');
    this.settingsContainer.className = 'settings-menu glass-panel';
    this.settingsContainer.style.cssText = `
      width: 500px;
      max-height: 80vh;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      overflow-y: auto;
    `;

    // Title
    const title = document.createElement('h2');
    title.textContent = 'SETTINGS';
    title.style.cssText = `
      font-size: 32px;
      font-weight: 700;
      color: var(--primary);
      text-shadow: 0 0 15px rgba(0, 204, 170, 0.5);
      margin: 0;
      letter-spacing: 2px;
      text-align: center;
    `;
    this.settingsContainer.appendChild(title);

    // Master Volume
    this.settingsContainer.appendChild(this.createVolumeSlider('Master Volume', 'masterVolume'));

    // UI Volume
    this.settingsContainer.appendChild(this.createVolumeSlider('UI Volume', 'uiVolume'));

    // Ambient Volume
    this.settingsContainer.appendChild(this.createVolumeSlider('Ambient Volume', 'ambientVolume'));

    // Mute Toggle
    this.settingsContainer.appendChild(this.createMuteToggle());

    // Default Game Speed
    this.settingsContainer.appendChild(this.createSpeedSelector());

    // Reset to Defaults button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset to Defaults';
    resetBtn.className = 'menu-button';
    resetBtn.style.cssText = `
      width: 100%;
      padding: 12px 24px;
      background: rgba(60, 30, 30, 0.8);
      border: 2px solid var(--secondary);
      border-radius: 8px;
      color: var(--text-primary);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 10px;
    `;
      resetBtn.addEventListener('click', () => {
        playUIClick();
      this.settings = { ...DEFAULT_SETTINGS };
      this.saveSettings();
      
      // Update AudioSystem if it exists
      const gameScene = this.scene.get('GameScene') as any;
      if (gameScene && gameScene.audioSystem) {
        const audioSystem = gameScene.audioSystem;
        audioSystem.setMasterVolume(this.settings.masterVolume / 100);
        audioSystem.setUIVolume(this.settings.uiVolume / 100);
        audioSystem.setAmbientVolume(this.settings.ambientVolume / 100);
        audioSystem.setMuted(this.settings.muted);
      }
      
      this.cleanup();
      this.create();
    });
    this.settingsContainer.appendChild(resetBtn);

    // Back button
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.className = 'menu-button';
    backBtn.style.cssText = `
      width: 100%;
      padding: 16px 24px;
      background: rgba(30, 40, 38, 0.8);
      border: 2px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-primary);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 10px;
    `;
    backBtn.addEventListener('click', () => {
      playUIClick();
      this.goBack();
    });
    this.settingsContainer.appendChild(backBtn);

    overlay.appendChild(this.settingsContainer);
    document.body.appendChild(overlay);

    // ESC key to go back
    this.input.keyboard?.on('keydown-ESC', () => {
      this.goBack();
    });
  }

  private createVolumeSlider(label: string, key: keyof GameSettings): HTMLDivElement {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.style.cssText = `
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    `;

    const sliderContainer = document.createElement('div');
    sliderContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
    `;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = String(this.settings[key] as number);
    slider.style.cssText = `
      flex: 1;
      height: 6px;
      background: rgba(30, 40, 38, 0.8);
      border-radius: 3px;
      outline: none;
      cursor: pointer;
    `;

    const valueDisplay = document.createElement('span');
    valueDisplay.textContent = `${this.settings[key]}%`;
    valueDisplay.style.cssText = `
      min-width: 50px;
      text-align: right;
      font-size: 14px;
      color: var(--text-secondary);
      font-family: monospace;
    `;

    slider.addEventListener('input', (e) => {
      const value = parseInt((e.target as HTMLInputElement).value, 10);
      (this.settings[key] as number) = value;
      valueDisplay.textContent = `${value}%`;
      this.saveSettings();
      
      // Update AudioSystem if it exists (GameScene may not be active)
      const gameScene = this.scene.get('GameScene') as any;
      if (gameScene && gameScene.audioSystem) {
        const audioSystem = gameScene.audioSystem;
        if (key === 'masterVolume') {
          audioSystem.setMasterVolume(value / 100);
        } else if (key === 'uiVolume') {
          audioSystem.setUIVolume(value / 100);
        } else if (key === 'ambientVolume') {
          audioSystem.setAmbientVolume(value / 100);
        }
      }
    });

    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(valueDisplay);

    container.appendChild(labelEl);
    container.appendChild(sliderContainer);

    return container;
  }

  private createMuteToggle(): HTMLDivElement {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    `;

    const labelEl = document.createElement('label');
    labelEl.textContent = 'Mute Audio';
    labelEl.style.cssText = `
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      cursor: pointer;
      flex: 1;
    `;

    const toggleContainer = document.createElement('div');
    toggleContainer.style.cssText = `
      position: relative;
      width: 50px;
      height: 26px;
      background: ${this.settings.muted ? 'var(--primary)' : 'rgba(30, 40, 38, 0.8)'};
      border: 2px solid ${this.settings.muted ? 'var(--primary)' : 'var(--border-color)'};
      border-radius: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
    `;

    const toggleSwitch = document.createElement('div');
    toggleSwitch.style.cssText = `
      position: absolute;
      top: 2px;
      left: ${this.settings.muted ? '24px' : '2px'};
      width: 18px;
      height: 18px;
      background: ${this.settings.muted ? '#000' : 'var(--text-primary)'};
      border-radius: 50%;
      transition: all 0.2s ease;
    `;

    const toggleHandler = () => {
      this.settings.muted = !this.settings.muted;
      this.saveSettings();
      
      // Update toggle visual state
      toggleContainer.style.background = this.settings.muted ? 'var(--primary)' : 'rgba(30, 40, 38, 0.8)';
      toggleContainer.style.borderColor = this.settings.muted ? 'var(--primary)' : 'var(--border-color)';
      toggleSwitch.style.left = this.settings.muted ? '24px' : '2px';
      toggleSwitch.style.background = this.settings.muted ? '#000' : 'var(--text-primary)';
      
      // Update AudioSystem if it exists
      const gameScene = this.scene.get('GameScene') as any;
      if (gameScene && gameScene.audioSystem) {
        gameScene.audioSystem.setMuted(this.settings.muted);
      }
    };

    const wrappedToggleHandler = () => {
      playUIClick();
      toggleHandler();
    };
    toggleContainer.addEventListener('click', wrappedToggleHandler);
    labelEl.addEventListener('click', wrappedToggleHandler);

    toggleContainer.appendChild(toggleSwitch);
    container.appendChild(labelEl);
    container.appendChild(toggleContainer);

    return container;
  }

  private createSpeedSelector(): HTMLDivElement {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;

    const labelEl = document.createElement('label');
    labelEl.textContent = 'Default Game Speed';
    labelEl.style.cssText = `
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      gap: 8px;
    `;

    const speeds: (1 | 2 | 4)[] = [1, 2, 4];
    speeds.forEach((speed) => {
      const btn = document.createElement('button');
      btn.textContent = `${speed}x`;
      btn.style.cssText = `
        flex: 1;
        padding: 12px;
        background: ${this.settings.defaultGameSpeed === speed ? 'var(--primary)' : 'rgba(30, 40, 38, 0.8)'};
        border: 2px solid ${this.settings.defaultGameSpeed === speed ? 'var(--primary)' : 'var(--border-color)'};
        border-radius: 8px;
        color: ${this.settings.defaultGameSpeed === speed ? '#000' : 'var(--text-primary)'};
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      `;

      btn.addEventListener('click', () => {
        playUIClick();
        this.settings.defaultGameSpeed = speed;
        this.saveSettings();
        // Update button styles
        speeds.forEach((s, i) => {
          const button = buttonContainer.children[i] as HTMLButtonElement;
          if (s === speed) {
            button.style.background = 'var(--primary)';
            button.style.borderColor = 'var(--primary)';
            button.style.color = '#000';
          } else {
            button.style.background = 'rgba(30, 40, 38, 0.8)';
            button.style.borderColor = 'var(--border-color)';
            button.style.color = 'var(--text-primary)';
          }
        });
      });

      buttonContainer.appendChild(btn);
    });

    container.appendChild(labelEl);
    container.appendChild(buttonContainer);

    return container;
  }

  private goBack(): void {
    // Play menu close sound
    playMenuClose();

    // Return to previous scene
    const gameState = this.registry.get('gameState');
    if (gameState === GameState.PAUSED) {
      // Return to pause menu (will be recreated)
      this.scene.start('PauseMenuScene');
    } else {
      // Return to main menu
      this.scene.start('MainMenuScene');
    }
  }

  private cleanup(): void {
    const overlay = this.settingsContainer?.parentNode;
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }

  shutdown(): void {
    this.cleanup();
  }
}
