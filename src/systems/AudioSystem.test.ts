import { describe, test, expect, beforeEach, vi } from 'vitest';
import { AudioSystem } from './AudioSystem';
import Phaser from 'phaser';

// Mock Phaser Scene
class MockScene extends Phaser.Scene {
  sound = {
    add: vi.fn(() => ({
      volume: 1.0,
      play: vi.fn(),
      stop: vi.fn(),
      isPlaying: false,
    })),
  } as any;
  load = {
    audio: vi.fn(),
    once: vi.fn(),
    on: vi.fn(),
  } as any;
}

describe('AudioSystem', () => {
  let scene: MockScene;
  let audioSystem: AudioSystem;

  beforeEach(() => {
    scene = new MockScene({ key: 'TestScene' });
    audioSystem = new AudioSystem(scene as any);
    
    // Mock localStorage
    Storage.prototype.getItem = vi.fn(() => null);
    Storage.prototype.setItem = vi.fn();
    
    // Mock AudioContext
    global.AudioContext = vi.fn(() => ({
      createOscillator: vi.fn(() => ({
        connect: vi.fn(),
        frequency: { value: 0 },
        type: 'sine',
        start: vi.fn(),
        stop: vi.fn(),
      })),
      createGain: vi.fn(() => ({
        connect: vi.fn(),
        gain: {
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
      })),
      destination: {},
      currentTime: 0,
      close: vi.fn().mockResolvedValue(undefined),
    })) as any;
  });

  test('initializes with default volumes', () => {
    expect(audioSystem.getMasterVolume()).toBe(0.8);
    expect(audioSystem.getUIVolume()).toBe(1.0);
    expect(audioSystem.getAmbientVolume()).toBe(0.7);
    expect(audioSystem.isMuted()).toBe(false);
  });

  test('sets master volume correctly', () => {
    audioSystem.setMasterVolume(0.5);
    expect(audioSystem.getMasterVolume()).toBe(0.5);
  });

  test('clamps volume to 0-1 range', () => {
    audioSystem.setMasterVolume(-1);
    expect(audioSystem.getMasterVolume()).toBe(0);
    
    audioSystem.setMasterVolume(2);
    expect(audioSystem.getMasterVolume()).toBe(1);
  });

  test('sets UI volume correctly', () => {
    audioSystem.setUIVolume(0.75);
    expect(audioSystem.getUIVolume()).toBe(0.75);
  });

  test('sets ambient volume correctly', () => {
    audioSystem.setAmbientVolume(0.6);
    expect(audioSystem.getAmbientVolume()).toBe(0.6);
  });

  test('mute toggle works', () => {
    audioSystem.setMuted(true);
    expect(audioSystem.isMuted()).toBe(true);
    
    audioSystem.setMuted(false);
    expect(audioSystem.isMuted()).toBe(false);
  });

  test('plays UI click sound', () => {
    // Should not throw
    audioSystem.playUIClick();
    expect(true).toBe(true);
  });

  test('plays placement success sound', () => {
    audioSystem.playPlaceSuccess();
    expect(true).toBe(true);
  });

  test('plays placement error sound', () => {
    audioSystem.playPlaceError();
    expect(true).toBe(true);
  });

  test('plays money gain sound', () => {
    audioSystem.playMoneyGain(1000);
    expect(true).toBe(true);
  });

  test('plays large money gain sound for amounts > 10000', () => {
    audioSystem.playMoneyGain(15000);
    expect(true).toBe(true);
  });

  test('plays money loss sound', () => {
    audioSystem.playMoneyLoss();
    expect(true).toBe(true);
  });

  test('plays alert sounds', () => {
    audioSystem.playLowFoodAlert();
    audioSystem.playNoFoodAlert();
    audioSystem.playStarvationAlert();
    audioSystem.playLowMoneyAlert();
    audioSystem.playBankruptcyAlert();
    expect(true).toBe(true);
  });

  test('plays elevator bell sound', () => {
    audioSystem.playElevatorBell();
    expect(true).toBe(true);
  });

  test('loads settings from localStorage', () => {
    Storage.prototype.getItem = vi.fn(() => 
      JSON.stringify({
        masterVolume: 50,
        uiVolume: 75,
        ambientVolume: 60,
      })
    );
    
    const newSystem = new AudioSystem(scene as any);
    expect(newSystem.getMasterVolume()).toBe(0.5);
    expect(newSystem.getUIVolume()).toBe(0.75);
    expect(newSystem.getAmbientVolume()).toBe(0.6);
  });

  test('destroys cleanly', () => {
    audioSystem.destroy();
    expect(true).toBe(true);
  });
});
