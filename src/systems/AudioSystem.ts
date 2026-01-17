import Phaser from 'phaser';
import { GameSettings } from '../utils/types';

/**
 * Sound categories for volume control
 */
export enum SoundCategory {
  UI = 'UI',
  AMBIENT = 'AMBIENT',
  RESIDENT = 'RESIDENT',
  ALERT = 'ALERT',
  ELEVATOR = 'ELEVATOR',
  MONEY = 'MONEY',
}

/**
 * AudioSystem manages all game audio including sound effects, volume control, and audio asset loading.
 * Uses Phaser's WebAudio sound system for cross-browser compatibility.
 */
export class AudioSystem {
  private scene: Phaser.Scene;
  private sounds: Map<string, Phaser.Sound.BaseSound> = new Map();
  private audioContext: AudioContext | null = null;
  private masterVolume = 0.8; // 0.0 - 1.0
  private uiVolume = 1.0;
  private ambientVolume = 0.7;
  private muted = false;
  private categoryVolumes: Map<SoundCategory, number> = new Map();
  private activeAmbientSounds: Set<string> = new Set();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    
    // Initialize category volumes
    this.categoryVolumes.set(SoundCategory.UI, 1.0);
    this.categoryVolumes.set(SoundCategory.AMBIENT, 0.7);
    this.categoryVolumes.set(SoundCategory.RESIDENT, 0.6);
    this.categoryVolumes.set(SoundCategory.ALERT, 1.0); // Alerts always at full relative volume
    this.categoryVolumes.set(SoundCategory.ELEVATOR, 0.8);
    this.categoryVolumes.set(SoundCategory.MONEY, 0.9);

    // Try to initialize Web Audio API context
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not available, audio will be limited:', error);
    }

    // Load settings from localStorage
    this.loadSettings();
  }

  /**
   * Load audio settings from localStorage
   */
  private loadSettings(): void {
    try {
      const stored = localStorage.getItem('arcology_settings');
      if (stored) {
        const settings: GameSettings = JSON.parse(stored);
        this.masterVolume = (settings.masterVolume || 80) / 100;
        this.uiVolume = (settings.uiVolume || 100) / 100;
        this.ambientVolume = (settings.ambientVolume || 50) / 100;
      }
    } catch (error) {
      console.error('Failed to load audio settings:', error);
    }
  }

  /**
   * Update master volume (0.0 - 1.0)
   */
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllSoundVolumes();
  }

  /**
   * Update UI volume (0.0 - 1.0)
   */
  setUIVolume(volume: number): void {
    this.uiVolume = Math.max(0, Math.min(1, volume));
    this.categoryVolumes.set(SoundCategory.UI, volume);
    this.updateCategoryVolumes(SoundCategory.UI);
  }

  /**
   * Update ambient volume (0.0 - 1.0)
   */
  setAmbientVolume(volume: number): void {
    this.ambientVolume = Math.max(0, Math.min(1, volume));
    this.categoryVolumes.set(SoundCategory.AMBIENT, volume);
    this.updateCategoryVolumes(SoundCategory.AMBIENT);
  }

  /**
   * Set muted state
   */
  setMuted(muted: boolean): void {
    this.muted = muted;
    this.updateAllSoundVolumes();
  }

  /**
   * Get current master volume
   */
  getMasterVolume(): number {
    return this.masterVolume;
  }

  /**
   * Get current UI volume
   */
  getUIVolume(): number {
    return this.uiVolume;
  }

  /**
   * Get current ambient volume
   */
  getAmbientVolume(): number {
    return this.ambientVolume;
  }

  /**
   * Get muted state
   */
  isMuted(): boolean {
    return this.muted;
  }

  /**
   * Update all sound volumes based on current settings
   */
  private updateAllSoundVolumes(): void {
    this.sounds.forEach((sound) => {
      if (sound && sound.isPlaying) {
        this.updateSoundVolume(sound);
      }
    });
  }

  /**
   * Update volumes for a specific category
   */
  private updateCategoryVolumes(_category: SoundCategory): void {
    // This would need sound metadata to track categories
    // For now, we update all sounds
    this.updateAllSoundVolumes();
  }

  /**
   * Calculate and apply volume for a sound based on category and master volume
   */
  private updateSoundVolume(sound: Phaser.Sound.BaseSound, category: SoundCategory = SoundCategory.UI): void {
    if (!sound) return;
    
    const categoryVol = this.categoryVolumes.get(category) || 1.0;
    const finalVolume = this.muted ? 0 : this.masterVolume * categoryVol;
    (sound as any).volume = finalVolume;
  }


  /**
   * Play a sound by ID
   */
  playSound(soundId: string, category: SoundCategory = SoundCategory.UI, volume: number = 1.0): void {
    if (this.muted) return;

    const sound = this.sounds.get(soundId);
    if (sound) {
      const categoryVol = this.categoryVolumes.get(category) || 1.0;
      const finalVolume = this.masterVolume * categoryVol * volume;
      (sound as any).volume = finalVolume;
      sound.play();
    } else {
      // For MVP: Generate a simple tone if sound file doesn't exist
      this.playGeneratedSound(soundId, category, volume);
    }
  }

  /**
   * Play a generated sound (fallback when audio files aren't loaded)
   */
  private playGeneratedSound(soundId: string, category: SoundCategory, volume: number): void {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Map sound IDs to frequencies and types
      const soundConfig = this.getSoundConfig(soundId);
      oscillator.frequency.value = soundConfig.frequency;
      oscillator.type = soundConfig.type;

      const categoryVol = this.categoryVolumes.get(category) || 1.0;
      const finalVolume = this.muted ? 0 : this.masterVolume * categoryVol * volume * 0.3;
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(finalVolume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + soundConfig.duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + soundConfig.duration);
    } catch (error) {
      console.warn(`Failed to play generated sound ${soundId}:`, error);
    }
  }

  /**
   * Get sound configuration for generated sounds
   */
  private getSoundConfig(soundId: string): { frequency: number; type: OscillatorType; duration: number } {
    const configs: Record<string, { frequency: number; type: OscillatorType; duration: number }> = {
      // UI Sounds
      ui_click: { frequency: 800, type: 'sine', duration: 0.1 },
      ui_open: { frequency: 600, type: 'sine', duration: 0.2 },
      ui_close: { frequency: 400, type: 'sine', duration: 0.2 },
      place_success: { frequency: 1000, type: 'sine', duration: 0.15 },
      place_error: { frequency: 200, type: 'square', duration: 0.2 },
      demolish: { frequency: 150, type: 'square', duration: 0.3 },
      
      // Money Sounds
      money_gain: { frequency: 1200, type: 'sine', duration: 0.2 },
      money_loss: { frequency: 400, type: 'sine', duration: 0.2 },
      money_big_gain: { frequency: 1500, type: 'sine', duration: 0.4 },
      
      // Alert Sounds
      alert_low_food: { frequency: 600, type: 'square', duration: 0.3 },
      alert_no_food: { frequency: 800, type: 'square', duration: 0.4 },
      alert_starvation: { frequency: 300, type: 'square', duration: 0.5 },
      alert_low_money: { frequency: 500, type: 'square', duration: 0.3 },
      alert_bankruptcy: { frequency: 200, type: 'square', duration: 1.0 },
      
      // Elevator Sounds
      elevator_bell: { frequency: 392, type: 'sine', duration: 0.3 }, // G4 pitch
      elevator_doors_open: { frequency: 300, type: 'sine', duration: 0.5 },
      elevator_doors_close: { frequency: 250, type: 'sine', duration: 0.5 },
      
      // Resident Sounds
      footstep: { frequency: 100, type: 'square', duration: 0.05 },
      eating: { frequency: 200, type: 'square', duration: 0.1 },
    };

    return configs[soundId] || { frequency: 440, type: 'sine', duration: 0.2 };
  }

  /**
   * Load an audio file and register it
   */
  loadSound(key: string, path: string, category: SoundCategory = SoundCategory.UI): void {
    this.scene.load.audio(key, path);
    this.scene.load.once(`filecomplete-audio-${key}`, () => {
      const sound = this.scene.sound.add(key);
      this.sounds.set(key, sound);
      this.updateSoundVolume(sound, category);
    });
  }

  /**
   * Preload all essential UI and alert sounds
   */
  preloadEssentialSounds(): void {
    // UI sounds
    // this.loadSound('ui_click', 'assets/audio/ui_click.mp3', SoundCategory.UI);
    // this.loadSound('ui_open', 'assets/audio/ui_open.mp3', SoundCategory.UI);
    // this.loadSound('ui_close', 'assets/audio/ui_close.mp3', SoundCategory.UI);
    // this.loadSound('place_success', 'assets/audio/place_success.mp3', SoundCategory.UI);
    // this.loadSound('place_error', 'assets/audio/place_error.mp3', SoundCategory.UI);
    
    // Alert sounds
    // this.loadSound('alert_low_food', 'assets/audio/alert_low_food.mp3', SoundCategory.ALERT);
    // this.loadSound('alert_starvation', 'assets/audio/alert_starvation.mp3', SoundCategory.ALERT);
    // this.loadSound('alert_bankruptcy', 'assets/audio/alert_bankruptcy.mp3', SoundCategory.ALERT);
    
    // Money sounds
    // this.loadSound('money_gain', 'assets/audio/money_gain.mp3', SoundCategory.MONEY);
    // this.loadSound('money_loss', 'assets/audio/money_loss.mp3', SoundCategory.MONEY);
    
    // Elevator sounds
    // this.loadSound('elevator_bell', 'assets/audio/elevator_bell.mp3', SoundCategory.ELEVATOR);
    
    // For MVP, we use generated sounds instead
    // When audio files are added, uncomment the above and remove the generated sound fallback
  }

  // Convenience methods for specific sound types

  /**
   * Play UI click sound
   */
  playUIClick(): void {
    this.playSound('ui_click', SoundCategory.UI);
  }

  /**
   * Play menu open sound
   */
  playMenuOpen(): void {
    this.playSound('ui_open', SoundCategory.UI);
  }

  /**
   * Play menu close sound
   */
  playMenuClose(): void {
    this.playSound('ui_close', SoundCategory.UI);
  }

  /**
   * Play room placement success sound
   */
  playPlaceSuccess(): void {
    this.playSound('place_success', SoundCategory.UI);
  }

  /**
   * Play room placement error sound
   */
  playPlaceError(): void {
    this.playSound('place_error', SoundCategory.UI);
  }

  /**
   * Play room demolition sound
   */
  playDemolish(): void {
    this.playSound('demolish', SoundCategory.UI);
  }

  /**
   * Play money gain sound
   */
  playMoneyGain(amount: number = 0): void {
    if (amount > 10000) {
      this.playSound('money_big_gain', SoundCategory.MONEY);
    } else {
      this.playSound('money_gain', SoundCategory.MONEY);
    }
  }

  /**
   * Play money loss sound
   */
  playMoneyLoss(): void {
    this.playSound('money_loss', SoundCategory.MONEY);
  }

  /**
   * Play low food alert sound
   */
  playLowFoodAlert(): void {
    this.playSound('alert_low_food', SoundCategory.ALERT);
  }

  /**
   * Play no food alert sound
   */
  playNoFoodAlert(): void {
    this.playSound('alert_no_food', SoundCategory.ALERT);
  }

  /**
   * Play starvation alert sound
   */
  playStarvationAlert(): void {
    this.playSound('alert_starvation', SoundCategory.ALERT);
  }

  /**
   * Play low money alert sound
   */
  playLowMoneyAlert(): void {
    this.playSound('alert_low_money', SoundCategory.ALERT);
  }

  /**
   * Play bankruptcy alert sound
   */
  playBankruptcyAlert(): void {
    this.playSound('alert_bankruptcy', SoundCategory.ALERT);
  }

  /**
   * Play elevator bell sound (G4 pitch - 392 Hz)
   */
  playElevatorBell(): void {
    this.playSound('elevator_bell', SoundCategory.ELEVATOR);
  }

  /**
   * Cleanup when scene is destroyed
   */
  destroy(): void {
    this.sounds.forEach((sound) => {
      if (sound && sound.isPlaying) {
        sound.stop();
      }
    });
    this.sounds.clear();
    this.activeAmbientSounds.clear();
    
    if (this.audioContext) {
      this.audioContext.close().catch(console.error);
      this.audioContext = null;
    }
  }
}
