import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { UIScene } from './UIScene';
import { ROOM_SPECS, RoomType, UI_COLORS, GRID_SIZE } from '../utils/constants';
import Phaser from 'phaser';

// Mock Phaser Scene
const createMockPhaserScene = (): Phaser.Scene => {
  const graphics = {
    setDepth: vi.fn(),
    setBlendMode: vi.fn(),
    clear: vi.fn(),
    lineStyle: vi.fn(),
    strokeRect: vi.fn(),
    fillStyle: vi.fn(),
    fillRect: vi.fn(),
  };

  return {
    scene: {
      get: vi.fn(),
    },
    add: {
      graphics: vi.fn().mockReturnValue(graphics),
    },
    registry: {
      get: vi.fn(),
      events: {
        on: vi.fn(),
      },
    },
  } as unknown as Phaser.Scene;
};

// Mock GameScene
const createMockGameScene = (): any => {

  return {
    input: {
      on: vi.fn(),
    },
    cameras: {
      main: {
        getWorldPoint: vi.fn().mockReturnValue({ x: 320, y: 250 }),
        scrollX: 0,
        scrollY: 0,
      },
    },
  };
};

describe('UIScene', () => {
  let scene: UIScene;
  let mockScene: Phaser.Scene;
  let mockGameScene: any;

  beforeEach(() => {
    mockScene = createMockPhaserScene();
    mockGameScene = createMockGameScene();
    (mockScene.scene as any).get = vi.fn().mockReturnValue(mockGameScene);
    
    scene = new UIScene();
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    test('creates ghost preview graphics', () => {
      scene.create();

      expect((mockScene.add as any).graphics).toHaveBeenCalledTimes(2);
    });

    test('sets ghost preview depth', () => {
      scene.create();

      const graphics = (mockScene.add as any).graphics.mock.results[0].value;
      expect(graphics.setDepth).toHaveBeenCalledWith(100);
    });

    test('sets ghost glow blend mode', () => {
      scene.create();

      const glowGraphics = (mockScene.add as any).graphics.mock.results[1].value;
      expect(glowGraphics.setBlendMode).toHaveBeenCalledWith(Phaser.BlendModes.ADD);
      expect(glowGraphics.setDepth).toHaveBeenCalledWith(99);
    });

    test('listens for pointer move events', () => {
      scene.create();

      expect(mockGameScene.input.on).toHaveBeenCalledWith('pointermove', expect.any(Function));
    });

    test('listens for selectedRoom registry changes', () => {
      scene.create();

      expect((mockScene.registry as any).events.on).toHaveBeenCalledWith(
        'changedata-selectedRoom',
        expect.any(Function)
      );
    });
  });

  describe('updateGhostPreview', () => {
    test('clears preview when no room is selected', () => {
      (mockScene.registry as any).get = vi.fn().mockReturnValue(undefined);
      
      scene.create();

      const pointerHandler = mockGameScene.input.on.mock.calls.find(
        (call: any[]) => call[0] === 'pointermove'
      )?.[1];

      const pointer = { x: 640, y: 360 };
      pointerHandler(pointer);

      const ghostPreview = (mockScene.add as any).graphics.mock.results[0].value;
      expect(ghostPreview.clear).toHaveBeenCalled();
    });

    test('draws ghost preview for valid placement', () => {
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);
      
      scene.create();

      const pointerHandler = mockGameScene.input.on.mock.calls.find(
        (call: any[]) => call[0] === 'pointermove'
      )?.[1];

      const pointer = { x: 640, y: 360 };
      pointerHandler(pointer);

      const ghostPreview = (mockScene.add as any).graphics.mock.results[0].value;
      const ghostGlow = (mockScene.add as any).graphics.mock.results[1].value;

      // Should draw glow
      expect(ghostGlow.fillStyle).toHaveBeenCalledWith(UI_COLORS.validPlacement, 0.15);
      expect(ghostGlow.fillRect).toHaveBeenCalled();

      // Should draw border
      expect(ghostPreview.lineStyle).toHaveBeenCalledWith(2, UI_COLORS.validPlacement, 0.8);
      expect(ghostPreview.strokeRect).toHaveBeenCalled();

      // Should draw room indicator
      expect(ghostPreview.fillStyle).toHaveBeenCalledWith(UI_COLORS.validPlacement, 0.3);
      expect(ghostPreview.fillRect).toHaveBeenCalled();
    });

    test('draws ghost preview for invalid placement', () => {
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);
      
      // Mock getWorldPoint to return a position that's invalid (e.g., wrong floor)
      mockGameScene.cameras.main.getWorldPoint = vi.fn().mockReturnValue({ x: 320, y: 1000 }); // Too high/low
      
      scene.create();

      const pointerHandler = mockGameScene.input.on.mock.calls.find(
        (call: any[]) => call[0] === 'pointermove'
      )?.[1];

      const pointer = { x: 640, y: 360 };
      pointerHandler(pointer);

      const ghostGlow = (mockScene.add as any).graphics.mock.results[1].value;

      // Should use invalid placement color
      expect(ghostGlow.fillStyle).toHaveBeenCalledWith(UI_COLORS.invalidPlacement, 0.15);
    });

    test('calculates ghost position correctly', () => {
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);
      const spec = ROOM_SPECS.apartment;
      
      // Mock world point at specific position
      mockGameScene.cameras.main.getWorldPoint = vi.fn().mockReturnValue({ x: 320, y: 250 });
      mockGameScene.cameras.main.scrollX = 0;
      mockGameScene.cameras.main.scrollY = 0;
      
      scene.create();

      const pointerHandler = mockGameScene.input.on.mock.calls.find(
        (call: any[]) => call[0] === 'pointermove'
      )?.[1];

      const pointer = { x: 640, y: 360 };
      pointerHandler(pointer);

      const groundY = 500;
      const worldPoint = { x: 320, y: 250 };
      const floor = Math.floor((groundY - worldPoint.y) / GRID_SIZE);
      const position = Math.floor(worldPoint.x / GRID_SIZE);
      const x = position * GRID_SIZE;
      const y = groundY - (floor + 1) * GRID_SIZE;
      const w = spec.width * GRID_SIZE;
      const h = GRID_SIZE;

      const ghostGlow = (mockScene.add as any).graphics.mock.results[1].value;
      expect(ghostGlow.fillRect).toHaveBeenCalledWith(x, y, w, h);
    });
  });
});
