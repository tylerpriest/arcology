import { AudioSystem } from '../systems/AudioSystem';

/**
 * Module-level reference to AudioSystem
 * Set by GameScene when AudioSystem is created
 */
let audioSystemRef: AudioSystem | null = null;

/**
 * Set the AudioSystem reference (called by GameScene)
 */
export function setAudioSystem(audioSystem: AudioSystem | null): void {
  audioSystemRef = audioSystem;
}

/**
 * Get AudioSystem reference
 * Returns null if AudioSystem is not available (e.g., GameScene not active)
 */
function getAudioSystem(): AudioSystem | null {
  return audioSystemRef;
}

/**
 * Play UI click sound if AudioSystem is available
 * Safe to call from anywhere - will silently fail if AudioSystem is not available
 * This can be called from HTML button click handlers
 */
export function playUIClick(): void {
  const audioSystem = getAudioSystem();
  if (audioSystem) {
    audioSystem.playUIClick();
  }
}

/**
 * Play menu open sound if AudioSystem is available
 * Safe to call from anywhere - will silently fail if AudioSystem is not available
 */
export function playMenuOpen(): void {
  const audioSystem = getAudioSystem();
  if (audioSystem) {
    audioSystem.playMenuOpen();
  }
}

/**
 * Play menu close sound if AudioSystem is available
 * Safe to call from anywhere - will silently fail if AudioSystem is not available
 */
export function playMenuClose(): void {
  const audioSystem = getAudioSystem();
  if (audioSystem) {
    audioSystem.playMenuClose();
  }
}
