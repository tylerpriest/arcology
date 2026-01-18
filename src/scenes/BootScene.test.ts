import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { BootScene } from './BootScene';
import Phaser from 'phaser';

// Mock Phaser Scene
const createMockPhaserScene = (): Phaser.Scene => {
  const progressBar = {
    clear: vi.fn(),
    fillStyle: vi.fn(),
    fillRect: vi.fn(),
    destroy: vi.fn(),
  };

  const progressBox = {
    fillStyle: vi.fn(),
    fillRect: vi.fn(),
    destroy: vi.fn(),
  };

  const loadingText = {
    setOrigin: vi.fn().mockReturnThis(),
    destroy: vi.fn(),
  };

  return {
    scene: {
      start: vi.fn(),
    },
    cameras: {
      main: {
        width: 1280,
        height: 720,
      },
    },
    add: {
      graphics: vi.fn().mockReturnValueOnce(progressBar).mockReturnValueOnce(progressBox),
      text: vi.fn().mockReturnValue(loadingText),
    },
    load: {
      on: vi.fn(),
    },
  } as unknown as Phaser.Scene;
};

describe('BootScene', () => {
  let scene: BootScene;
  let mockScene: Phaser.Scene;

  beforeEach(() => {
    mockScene = createMockPhaserScene();
    scene = new BootScene();
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('preload', () => {
    test('creates progress bar and loading text', () => {
      scene.preload();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.add as any).graphics).toHaveBeenCalledTimes(2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.add as any).text).toHaveBeenCalledWith(
        640, // width / 2
        310, // height / 2 - 50
        'Loading...',
        expect.objectContaining({
          fontSize: '20px',
          color: '#ffffff',
        })
      );
    });

    test('sets up progress event handler', () => {
      scene.preload();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onCall = (mockScene.load as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'progress'
      );
      expect(onCall).toBeTruthy();
      expect(typeof onCall[1]).toBe('function');
    });

    test('sets up complete event handler', () => {
      scene.preload();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onCall = (mockScene.load as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'complete'
      );
      expect(onCall).toBeTruthy();
      expect(typeof onCall[1]).toBe('function');
    });

    test('progress handler updates progress bar', () => {
      scene.preload();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const progressHandler = (mockScene.load as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'progress'
      )?.[1];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const progressBar = (mockScene.add as any).graphics.mock.results[0].value;
      
      progressHandler(0.5);

      expect(progressBar.clear).toHaveBeenCalled();
      expect(progressBar.fillStyle).toHaveBeenCalledWith(0x4a9eff, 1);
      expect(progressBar.fillRect).toHaveBeenCalledWith(490, 345, 150, 30); // width/2 - 150, height/2 - 15, 300 * 0.5, 30
    });

    test('complete handler destroys progress elements', () => {
      scene.preload();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const completeHandler = (mockScene.load as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'complete'
      )?.[1];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const progressBar = (mockScene.add as any).graphics.mock.results[0].value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const progressBox = (mockScene.add as any).graphics.mock.results[1].value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const loadingText = (mockScene.add as any).text.mock.results[0].value;

      completeHandler();

      expect(progressBar.destroy).toHaveBeenCalled();
      expect(progressBox.destroy).toHaveBeenCalled();
      expect(loadingText.destroy).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    test('starts MainMenuScene', () => {
      scene.create();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).start).toHaveBeenCalledWith('MainMenuScene');
    });
  });
});
