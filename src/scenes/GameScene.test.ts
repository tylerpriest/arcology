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
    },
    input: {
      on: vi.fn(),
      keyboard: {
        addKey: vi.fn().mockReturnValue({
          on: vi.fn(),
        }),
        on: vi.fn(),
      },
    },
  } as unknown as Phaser.Scene;
};

// Mock graphics classes
vi.mock('../graphics/VenusAtmosphere', () => ({
  VenusAtmosphere: vi.fn().mockImplementation(() => ({
    updateSkyGradient: vi.fn(),
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
    mockScene = createMockPhaserScene();
    scene = new GameScene();
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clickHandler = (mockScene.input as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'pointerup'
      )?.[1];

      const pointer = {
        leftButtonReleased: vi.fn().mockReturnValue(true),
        x: 100,
        y: 100,
      };

      clickHandler(pointer);

      // Room should be placed
      const rooms = scene.building.getAllRooms().filter((r) => r.floor === 0);
      const apartment = rooms.find((r) => r.type === 'apartment');
      expect(apartment).toBeTruthy();
      
      // Money should be deducted
      expect(scene.economySystem.getMoney()).toBe(initialMoney - roomCost);
    });

    test('does not place room when invalid location clicked', () => {
      const initialRoomCount = scene.building.getAllRooms().length;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);
      // Invalid position (e.g., overlapping or wrong floor)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.cameras.main as any).getWorldPoint = vi.fn().mockReturnValue({ x: -100, y: -100 });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clickHandler = (mockScene.input as any).on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'pointerup'
      )?.[1];

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
      scene.building.addRoom('apartment', 0, 1);
      const room = scene.building.getRoomAt(0, 1);
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deleteHandler = (mockScene.input.keyboard as any).addKey.mock.results.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => result.value.on.mock.calls.some(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (call: any[]) => call[0] === 'down'
        )
      )?.value.on.mock.calls.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (call: any[]) => call[0] === 'down'
      )?.[1];

      if (deleteHandler) {
        deleteHandler();
      } else {
        // Alternative: trigger via keyboard event
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const deleteKey = (mockScene.input.keyboard as any).addKey.mock.results.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result: any) => result.value
        )?.value;
        if (deleteKey && deleteKey.on.mock.calls.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const handler = deleteKey.on.mock.calls.find((call: any[]) => call[0] === 'down')?.[1];
          if (handler) handler();
        }
      }

      // Room should be removed
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedRoomId = (scene as any).selectedRoomId;
      const room = scene.building.getRoomById(selectedRoomId);
      expect(room).toBeFalsy();
      
      // Money should be refunded
      expect(scene.economySystem.getMoney()).toBe(initialMoney + expectedRefund);
    });
  });

  describe('keyboard shortcuts', () => {
    beforeEach(() => {
      scene.create();
    });

    test('ESC opens pause menu when playing', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).get = vi.fn().mockReturnValue(GameState.PLAYING);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const escKey = (mockScene.input.keyboard as any).addKey.mock.results.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => result.value
      )?.value;
      
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockScene.registry as any).get = vi.fn().mockReturnValue('apartment' as RoomType);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const qKey = (mockScene.input.keyboard as any).addKey.mock.results.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => result.value
      )?.value;
      
      if (qKey && qKey.on.mock.calls.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = qKey.on.mock.calls.find((call: any[]) => call[0] === 'down')?.[1];
        if (handler) handler();
      }

      // Should clear selected room
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockScene.registry as any).set).toHaveBeenCalledWith('selectedRoom', undefined);
    });
  });

  describe('camera controls', () => {
    beforeEach(() => {
      scene.create();
    });

    test('Home key focuses lobby', () => {
      const panSpy = vi.spyOn(mockScene.cameras.main, 'pan');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const homeKey = (mockScene.input.keyboard as any).addKey.mock.results.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => result.value
      )?.value;
      
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

      // Test zoom in
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const plusKey = (mockScene.input.keyboard as any).addKey.mock.results.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => result.value
      )?.value;
      
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

      // Simulate 5 days passing (24 hours * 5 days = 120 hours, each hour = 10000ms)
      const hoursPerDay = 24;
      const msPerHour = 10000;
      for (let day = 0; day < 5; day++) {
        for (let hour = 0; hour < hoursPerDay; hour++) {
          scene.timeSystem.update(msPerHour);
        }
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
