import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { GameScene } from './GameScene';
import { Building } from '../entities/Building';
import { TimeSystem } from '../systems/TimeSystem';
import { EconomySystem } from '../systems/EconomySystem';
import { ResidentSystem } from '../systems/ResidentSystem';
import { ResourceSystem } from '../systems/ResourceSystem';
import { RestaurantSystem } from '../systems/RestaurantSystem';
import { SaveSystem } from '../systems/SaveSystem';
import { ElevatorSystem } from '../systems/ElevatorSystem';
import { AudioSystem } from '../systems/AudioSystem';
import { GameState } from '../utils/types';
import { ROOM_SPECS, RoomType } from '../utils/constants';
import Phaser from 'phaser';

// Mock Phaser Scene
const createMockPhaserScene = (): Phaser.Scene => {
  const graphics = {
    setDepth: vi.fn(),
    lineStyle: vi.fn(),
    lineBetween: vi.fn(),
    clear: vi.fn(),
    setBlendMode: vi.fn(),
    setAlpha: vi.fn(),
    fillStyle: vi.fn(),
    fillRect: vi.fn(),
    strokeCircle: vi.fn(),
    fillCircle: vi.fn(),
    strokeRect: vi.fn(),
    setPosition: vi.fn(),
    setVisible: vi.fn(),
    destroy: vi.fn(),
  };

  return {
    scene: {
      launch: vi.fn(),
      start: vi.fn(),
      restart: vi.fn(),
      manager: {
        getScene: vi.fn(),
      },
    },
    registry: {
      set: vi.fn(),
      get: vi.fn(),
      events: {
        on: vi.fn(),
      },
    },
    cameras: {
      main: {
        setBounds: vi.fn(),
        scrollX: 0,
        scrollY: 0,
        setZoom: vi.fn(),
        zoom: 0.5,
        pan: vi.fn(),
        zoomTo: vi.fn(),
        getWorldPoint: vi.fn().mockReturnValue({ x: 0, y: 436 }),
      },
    },
    scale: {
      height: 720,
    },
    add: {
      graphics: vi.fn().mockReturnValue(graphics),
      text: vi.fn().mockReturnValue({
        setText: vi.fn().mockReturnThis(),
        setColor: vi.fn().mockReturnThis(),
        setPosition: vi.fn().mockReturnThis(),
        setAlpha: vi.fn().mockReturnThis(),
        setFontSize: vi.fn().mockReturnThis(),
        setOrigin: vi.fn().mockReturnThis(),
        setDepth: vi.fn().mockReturnThis(),
        destroy: vi.fn(),
      }),
    },
    input: {
      on: vi.fn(),
      keyboard: {
        addKey: vi.fn(() => ({
          on: vi.fn(),
        })),
        on: vi.fn(),
      },
    },
  } as unknown as Phaser.Scene;
};

// Mock graphics classes
vi.mock('../graphics/VenusAtmosphere', () => ({
  VenusAtmosphere: vi.fn().mockImplementation(() => ({
    updateSkyGradient: vi.fn(),
    update: vi.fn(),
  })),
}));

vi.mock('../graphics/DayNightOverlay', () => ({
  DayNightOverlay: vi.fn().mockImplementation(() => ({
    update: vi.fn(),
  })),
}));

vi.mock('../graphics/AtmosphericEffects', () => ({
  AtmosphericEffects: vi.fn().mockImplementation(() => ({
    update: vi.fn(),
  })),
}));

vi.mock('../graphics/VolcanicGround', () => ({
  VolcanicGround: vi.fn().mockImplementation(() => ({
    draw: vi.fn(),
    update: vi.fn(),
  })),
}));

vi.mock('../graphics/BuildingFrame', () => ({
  BuildingFrame: vi.fn().mockImplementation(() => ({
    draw: vi.fn(),
    destroy: vi.fn(),
  })),
}));

vi.mock('../ui/UIManager', () => ({
  UIManager: vi.fn().mockImplementation(() => ({
    setVictoryCallbacks: vi.fn(),
    setGameOverCallbacks: vi.fn(),
    setCameraCallbacks: vi.fn(),
  })),
}));

describe('GameScene', () => {
  let scene: GameScene;
  let mockScene: Phaser.Scene;

  beforeEach(() => {
    localStorage.clear();
    window.alert = vi.fn();
    mockScene = createMockPhaserScene();
    scene = new GameScene();
    // Add Phaser.Math mock for zoom functions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (scene as any).Phaser = { Math: { Clamp: vi.fn() } };
    Object.assign(scene, mockScene);
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Clean up window event listeners
    const blurListeners = (window as any).__blurListeners || [];
    blurListeners.forEach((listener: () => void) => {
      window.removeEventListener('blur', listener);
    });
    (window as any).__blurListeners = [];
  });

  describe('create', () => {
    test('initializes all systems', () => {
      scene.create();

      expect(scene.timeSystem).toBeInstanceOf(TimeSystem);
      expect(scene.economySystem).toBeInstanceOf(EconomySystem);
      expect(scene.resourceSystem).toBeInstanceOf(ResourceSystem);
      expect(scene.building).toBeInstanceOf(Building);
      expect(scene.elevatorSystem).toBeInstanceOf(ElevatorSystem);
      expect(scene.residentSystem).toBeInstanceOf(ResidentSystem);
      expect(scene.restaurantSystem).toBeInstanceOf(RestaurantSystem);
      expect(scene.saveSystem).toBeInstanceOf(SaveSystem);
      expect(scene.audioSystem).toBeInstanceOf(AudioSystem);
    });

    test('sets game state to PLAYING', () => {
      scene.create();

      expect((mockScene.registry as any).set).toHaveBeenCalledWith('gameState', GameState.PLAYING);
    });

    test('creates initial lobby', () => {
      scene.create();

      const lobby = scene.building.getAllRooms().find((r) => r.type === 'lobby' && r.floor === 0);
      expect(lobby).toBeTruthy();
    });

    test('creates elevator shaft for lobby', () => {
      scene.create();

      const shafts = scene.elevatorSystem.getAllShafts();
      expect(shafts.length).toBeGreaterThan(0);
    });

    test('launches UIScene', () => {
      scene.create();

      expect((mockScene.scene as any).launch).toHaveBeenCalledWith('UIScene');
    });

    test('sets up camera bounds and zoom', () => {
      scene.create();

      expect((mockScene.cameras.main as any).setBounds).toHaveBeenCalled();
      expect((mockScene.cameras.main as any).setZoom).toHaveBeenCalledWith(0.5);
    });

    test('loads save if loadSaveSlot is set', () => {
      const mockSave = {
        timestamp: Date.now(),
        time: { day: 5, hour: 12, minute: 0 },
        residents: [],
        economy: { money: 20000 },
        building: { rooms: [] },
        resources: { rawFood: 0, processedFood: 0 },
      };
      localStorage.setItem('arcology_save_1', JSON.stringify(mockSave));

      (mockScene.registry as any).get = vi.fn().mockReturnValue(1);

      scene.create();

      // Should attempt to load save
      expect((mockScene.registry as any).get).toHaveBeenCalledWith('loadSaveSlot');
    });
  });

  describe('room placement', () => {
    beforeEach(() => {
      scene.create();
    });

    test('places room when valid location clicked', () => {
      const initialMoney = scene.economySystem.getMoney();
      const roomCost = ROOM_SPECS.apartment.cost;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.cameras.main as any).getWorldPoint = vi.fn().mockReturnValue({ x: 64, y: 436 });

      // Simulate click
      // There are two pointerup handlers: first resets drag, second handles clicks
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pointerupCalls = (mockScene.input as any).on.mock.calls.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'pointerup'
      );
      // The second handler is the click handler (first is drag reset)
      const clickHandler = pointerupCalls[1]?.[1];

      const pointer = {
        leftButtonReleased: vi.fn().mockReturnValue(true),
        x: 100,
        y: 100,
      };

      clickHandler(pointer);

      // Room should be placed
      const rooms = scene.building.getAllRooms().filter((r) => r.floor === 1);
      const apartment = rooms.find((r) => r.type === 'apartment');
      expect(apartment).toBeTruthy();

      // Money should be deducted
      expect(scene.economySystem.getMoney()).toBe(initialMoney - roomCost);
    });

    test('does not place room when invalid location clicked', () => {
      const initialRoomCount = scene.building.getAllRooms().length;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);
      // Invalid floor (floor 100 exceeds MAX_FLOORS_MVP of 20)
      // floor = (500 - y) / 64 = 100 => y = 500 - 6400 = -5900
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.cameras.main as any).getWorldPoint = vi.fn().mockReturnValue({ x: 64, y: -5900 });

      // There are two pointerup handlers: first resets drag, second handles clicks
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pointerupCalls = (mockScene.input as any).on.mock.calls.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'pointerup'
      );
      // The second handler is the click handler (first is drag reset)
      const clickHandler = pointerupCalls[1]?.[1];

      const pointer = {
        leftButtonReleased: vi.fn().mockReturnValue(true),
        x: 100,
        y: 100,
      };

      clickHandler(pointer);

      // Room count should not change
      expect(scene.building.getAllRooms().length).toBe(initialRoomCount);
    });
  });

  describe('room demolition', () => {
    beforeEach(() => {
      scene.create();
      // Place a room first
      scene.building.addRoom('apartment', 1, 0);
      const room = scene.building.getRoomAt(1, 0);
      if (room) {
        // Access private property via type assertion for testing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (scene as any).selectedRoomId = room.id;
      }
    });

    test('demolishes room and refunds 50% cost', () => {
      const initialMoney = scene.economySystem.getMoney();
      const roomCost = ROOM_SPECS.apartment.cost;
      const expectedRefund = Math.floor(roomCost * 0.5);

      // Debug key indices
      const addKeyCalls = (mockScene.input.keyboard as any).addKey.mock.calls;
      console.log(
        'addKey calls:',
        addKeyCalls.map((c: any[]) => c[0])
      );

      // DELETE is the 10th key added (Index 9: 1-7, Q, ESC, DELETE)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deleteKey = (mockScene.input.keyboard as any).addKey.mock.results[9]?.value;

      if (deleteKey && deleteKey.on.mock.calls.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const deleteHandler = deleteKey.on.mock.calls.find(
          (call: any[]) => call[0] === 'down'
        )?.[1];
        if (deleteHandler) deleteHandler();
      }

      // Room should be removed
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedRoomId = (scene as any).selectedRoomId;
      expect(selectedRoomId).toBeNull(); // Should be null after demolition

      // Money should be refunded
      expect(scene.economySystem.getMoney()).toBe(initialMoney + expectedRefund);
    });
  });

  describe('keyboard shortcuts', () => {
    beforeEach(() => {
      scene.create();
    });

    test('ESC opens pause menu when playing', () => {
      // Clear mock calls from scene creation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.scene as any).launch.mockClear();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).get = vi.fn().mockReturnValue(GameState.PLAYING);

      // ESC is the 9th key added (Index 8: 1-7, Q, ESC)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const escKey = (mockScene.input.keyboard as any).addKey.mock.results[8]?.value;

      if (escKey && escKey.on.mock.calls.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = escKey.on.mock.calls.find((call: any[]) => call[0] === 'down')?.[1];
        if (handler) handler();
      }

      // Should launch pause menu
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.scene as any).launch).toHaveBeenCalledWith('PauseMenuScene');
    });

    test('Space toggles pause', () => {
      const setSpeedSpy = vi.spyOn(scene.timeSystem, 'setSpeed');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spaceHandler = (mockScene.input.keyboard as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'keydown-SPACE'
      )?.[1];

      if (spaceHandler) {
        spaceHandler();
        expect(setSpeedSpy).toHaveBeenCalled();
      }
    });

    test('Q cancels room selection', () => {
      // Clear registry calls from previous tests
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).set.mockClear();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);

      // Q is the 8th key added (Index 7: 1-7, Q)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const qKey = (mockScene.input.keyboard as any).addKey.mock.results[7]?.value;

      if (qKey && qKey.on.mock.calls.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = qKey.on.mock.calls.find((call: any[]) => call[0] === 'down')?.[1];
        if (handler) handler();
      }

      // Should clear selected room
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const setCalls = (mockScene.registry as any).set.mock.calls;
      const selectedRoomCall = setCalls.find((call: any[]) => call[0] === 'selectedRoom');
      expect(selectedRoomCall).toEqual(['selectedRoom', undefined]);
    });
  });

  describe('camera controls', () => {
    beforeEach(() => {
      scene.create();
    });

    test('Home key focuses lobby', () => {
      const panSpy = vi.spyOn(mockScene.cameras.main, 'pan');

      // HOME is Index 10
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const homeKey = (mockScene.input.keyboard as any).addKey.mock.results[10]?.value;

      if (homeKey && homeKey.on.mock.calls.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = homeKey.on.mock.calls.find((call: any[]) => call[0] === 'down')?.[1];
        if (handler) handler();
      }

      // Should pan to lobby
      expect(panSpy).toHaveBeenCalled();
    });

    test('zoom controls work', () => {
      const zoomToSpy = vi.spyOn(mockScene.cameras.main, 'zoomTo');

      // PLUS is Index 11
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const plusKey = (mockScene.input.keyboard as any).addKey.mock.results[11]?.value;

      if (plusKey && plusKey.on.mock.calls.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = plusKey.on.mock.calls.find((call: any[]) => call[0] === 'down')?.[1];
        if (handler) handler();
      }

      // Should zoom
      expect(zoomToSpy).toHaveBeenCalled();
    });
  });

  describe('save/load integration', () => {
    beforeEach(() => {
      scene.create();
    });

    test('auto-saves every 5 days', () => {
      const saveSpy = vi.spyOn(scene.saveSystem, 'saveGame');

      // Simulate 5 days passing by calling GameScene.update
      // Each update call represents 16ms, so we need many calls
      const msPerHour = 10000; // From TimeSystem
      const msPerDay = 24 * msPerHour;
      const totalMs = 5 * msPerDay;

      // Update in chunks to simulate time passing
      for (let ms = 0; ms < totalMs; ms += 16) {
        scene.update(0, 16);
      }

      // Should trigger auto-save
      expect(saveSpy).toHaveBeenCalledWith(0);
    });
  });

  describe('update loop', () => {
    beforeEach(() => {
      scene.create();
    });

    test('updates all systems', () => {
      const timeUpdateSpy = vi.spyOn(scene.timeSystem, 'update');
      const residentUpdateSpy = vi.spyOn(scene.residentSystem, 'update');
      const elevatorUpdateSpy = vi.spyOn(scene.elevatorSystem, 'update');

      scene.update(0, 16); // time=0, delta=16ms

      expect(timeUpdateSpy).toHaveBeenCalled();
      expect(residentUpdateSpy).toHaveBeenCalled();
      expect(elevatorUpdateSpy).toHaveBeenCalled();
    });
  });
});
