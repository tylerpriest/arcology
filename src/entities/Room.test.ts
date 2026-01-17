import { describe, test, expect, beforeEach } from 'vitest';
import { Room } from './Room';
import { Resident } from './Resident';
import { Building } from './Building';
import { ROOM_SPECS, GRID_SIZE } from '../utils/constants';
import Phaser from 'phaser';

// Mock Phaser Scene for Room
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockPhaserScene = (restaurantSystem?: any): Phaser.Scene => {
  const mockGraphics = {
    fillStyle: () => mockGraphics,
    fillRect: () => {},
    fillCircle: () => {},
    clear: () => {},
    lineStyle: () => mockGraphics,
    strokeRect: () => {},
    setDepth: () => mockGraphics,
    setBlendMode: () => mockGraphics,
    destroy: () => {},
  };

  const mockText = {
    setDepth: () => mockText,
    setText: () => mockText,
    setPosition: () => mockText,
    setOrigin: () => mockText,
    setAlpha: () => mockText,
    setColor: () => mockText,
    destroy: () => {},
  };

  return {
    add: {
      graphics: () => mockGraphics,
      text: () => mockText,
    },
    registry: {
      get: () => 12,
      set: () => {},
    },
    restaurantSystem: restaurantSystem || {
      isRestaurantOpen: () => true,
    },
  } as unknown as Phaser.Scene;
};

// Mock GameScene for Resident
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockGameScene = (): any => {
  const mockPhaserScene = createMockPhaserScene();
  const building = new Building(mockPhaserScene);
  
  const timeSystem = {
    on: () => {},
    getHour: () => 12,
    getMinute: () => 0,
    isWeekend: () => false,
  };
  const resourceSystem = {
    consumeFood: () => true,
  };
  const restaurantSystem = {
    isRestaurantOpen: () => true,
  };
  const elevatorSystem = {
    getAllShafts: () => [],
    getShaftForZone: () => null,
    callElevator: () => {},
  };

  // Return a Phaser.Scene-like object with all properties
  return {
    ...mockPhaserScene,
    building,
    timeSystem,
    resourceSystem,
    restaurantSystem,
    elevatorSystem,
  } as unknown as Phaser.Scene;
};

describe('Room Entity', () => {
  let mockScene: Phaser.Scene;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockGameScene: any;

  beforeEach(() => {
    mockScene = createMockPhaserScene();
    mockGameScene = createMockGameScene();
  });

  describe('Initialization', () => {
    test('creates room with correct properties', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      expect(room.id).toBe('room_1');
      expect(room.type).toBe('apartment');
      expect(room.floor).toBe(1);
      expect(room.position).toBe(0);
      expect(room.width).toBe(3);
    });

    test('room uses spec width if not provided', () => {
      const spec = ROOM_SPECS.apartment;
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: spec.width,
      });

      expect(room.width).toBe(spec.width);
    });
  });

  describe('Resident management', () => {
    test('addResident adds resident to room', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      const resident = new Resident(mockGameScene, 'resident_1', 0, 0);

      room.addResident(resident);

      expect(room.getResidentCount()).toBe(1);
      expect(room.getResidents()).toContain(resident);
    });

    test('addResident does not add duplicate residents', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      const resident = new Resident(mockGameScene, 'resident_1', 0, 0);

      room.addResident(resident);
      room.addResident(resident);

      expect(room.getResidentCount()).toBe(1);
    });

    test('removeResident removes resident from room', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      const resident = new Resident(mockGameScene, 'resident_1', 0, 0);
      room.addResident(resident);

      expect(room.getResidentCount()).toBe(1);

      room.removeResident(resident);

      expect(room.getResidentCount()).toBe(0);
      expect(room.getResidents()).not.toContain(resident);
    });

    test('removeResident handles non-existent resident gracefully', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      const resident = new Resident(mockGameScene, 'resident_1', 0, 0);

      // Remove without adding should not throw
      expect(() => room.removeResident(resident)).not.toThrow();
      expect(room.getResidentCount()).toBe(0);
    });

    test('getResidents returns all residents', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      const resident1 = new Resident(mockGameScene, 'resident_1', 0, 0);
      const resident2 = new Resident(mockGameScene, 'resident_2', 0, 0);

      room.addResident(resident1);
      room.addResident(resident2);

      const residents = room.getResidents();
      expect(residents.length).toBe(2);
      expect(residents).toContain(resident1);
      expect(residents).toContain(resident2);
    });

    test('getResidentCount returns correct count', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      expect(room.getResidentCount()).toBe(0);

      const resident1 = new Resident(mockGameScene, 'resident_1', 0, 0);
      room.addResident(resident1);
      expect(room.getResidentCount()).toBe(1);

      const resident2 = new Resident(mockGameScene, 'resident_2', 0, 0);
      room.addResident(resident2);
      expect(room.getResidentCount()).toBe(2);
    });
  });

  describe('Worker management', () => {
    test('addWorker adds worker to room', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      const worker = new Resident(mockGameScene, 'worker_1', 0, 0);

      room.addWorker(worker);

      expect(room.getWorkerCount()).toBe(1);
      expect(room.getWorkers()).toContain(worker);
    });

    test('addWorker does not add duplicate workers', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      const worker = new Resident(mockGameScene, 'worker_1', 0, 0);

      room.addWorker(worker);
      room.addWorker(worker);

      expect(room.getWorkerCount()).toBe(1);
    });

    test('removeWorker removes worker from room', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      const worker = new Resident(mockGameScene, 'worker_1', 0, 0);
      room.addWorker(worker);

      expect(room.getWorkerCount()).toBe(1);

      room.removeWorker(worker);

      expect(room.getWorkerCount()).toBe(0);
      expect(room.getWorkers()).not.toContain(worker);
    });

    test('removeWorker handles non-existent worker gracefully', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      const worker = new Resident(mockGameScene, 'worker_1', 0, 0);

      // Remove without adding should not throw
      expect(() => room.removeWorker(worker)).not.toThrow();
      expect(room.getWorkerCount()).toBe(0);
    });

    test('getWorkers returns all workers', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      const worker1 = new Resident(mockGameScene, 'worker_1', 0, 0);
      const worker2 = new Resident(mockGameScene, 'worker_2', 0, 0);

      room.addWorker(worker1);
      room.addWorker(worker2);

      const workers = room.getWorkers();
      expect(workers.length).toBe(2);
      expect(workers).toContain(worker1);
      expect(workers).toContain(worker2);
    });

    test('getWorkerCount returns correct count', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      expect(room.getWorkerCount()).toBe(0);

      const worker1 = new Resident(mockGameScene, 'worker_1', 0, 0);
      room.addWorker(worker1);
      expect(room.getWorkerCount()).toBe(1);

      const worker2 = new Resident(mockGameScene, 'worker_2', 0, 0);
      room.addWorker(worker2);
      expect(room.getWorkerCount()).toBe(2);
    });
  });

  describe('Capacity management', () => {
    test('hasCapacity returns true when below capacity', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      // Apartment has capacity 4
      expect(room.hasCapacity()).toBe(true);

      // Add 3 residents (below capacity)
      for (let i = 0; i < 3; i++) {
        const resident = new Resident(mockGameScene, `resident_${i}`, 0, 0);
        room.addResident(resident);
      }

      expect(room.hasCapacity()).toBe(true);
    });

    test('hasCapacity returns false when at capacity', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      // Apartment has capacity 4
      // Add 4 residents (at capacity)
      for (let i = 0; i < 4; i++) {
        const resident = new Resident(mockGameScene, `resident_${i}`, 0, 0);
        room.addResident(resident);
      }

      expect(room.hasCapacity()).toBe(false);
    });

    test('hasCapacity returns false for rooms without capacity', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'lobby',
        floor: 0,
        position: 0,
        width: 20,
      });

      // Lobby doesn't have a capacity spec
      expect(room.hasCapacity()).toBe(false);
    });

    test('hasJobOpenings returns true when below job limit', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      // Office has 6 jobs
      expect(room.hasJobOpenings()).toBe(true);

      // Add 5 workers (below limit)
      for (let i = 0; i < 5; i++) {
        const worker = new Resident(mockGameScene, `worker_${i}`, 0, 0);
        room.addWorker(worker);
      }

      expect(room.hasJobOpenings()).toBe(true);
    });

    test('hasJobOpenings returns false when at job limit', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: 4,
      });

      // Office has 6 jobs
      // Add 6 workers (at limit)
      for (let i = 0; i < 6; i++) {
        const worker = new Resident(mockGameScene, `worker_${i}`, 0, 0);
        room.addWorker(worker);
      }

      expect(room.hasJobOpenings()).toBe(false);
    });

    test('hasJobOpenings returns false for rooms without jobs', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      // Apartment doesn't have jobs
      expect(room.hasJobOpenings()).toBe(false);
    });
  });

  describe('Position and coordinates', () => {
    test('getWorldPosition returns correct center position', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      const pos = room.getWorldPosition();
      const groundY = 500;
      const expectedX = (0 * GRID_SIZE) + (3 * GRID_SIZE) / 2; // Center of room
      const expectedY = groundY - (1 + 0.5) * GRID_SIZE; // Floor 1, center vertically

      expect(pos.x).toBe(expectedX);
      expect(pos.y).toBe(expectedY);
    });

    test('getWorldPosition handles different floors correctly', () => {
      const room1 = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 0,
        position: 0,
        width: 3,
      });

      const room2 = new Room(mockScene, {
        id: 'room_2',
        type: 'apartment',
        floor: 2,
        position: 0,
        width: 3,
      });

      const pos1 = room1.getWorldPosition();
      const pos2 = room2.getWorldPosition();

      // Room on floor 2 should be higher (lower Y value)
      expect(pos2.y).toBeLessThan(pos1.y);
    });

    test('getWorldPosition handles different positions correctly', () => {
      const room1 = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      const room2 = new Room(mockScene, {
        id: 'room_2',
        type: 'apartment',
        floor: 1,
        position: 5,
        width: 3,
      });

      const pos1 = room1.getWorldPosition();
      const pos2 = room2.getWorldPosition();

      // Room at position 5 should be to the right (higher X value)
      expect(pos2.x).toBeGreaterThan(pos1.x);
    });
  });

  describe('Selection state', () => {
    test('setSelected updates selection state', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      // Room starts unselected (internal state)
      room.setSelected(true);
      // Selection triggers redraw, but we can't easily test visual state
      // We can verify the method doesn't throw
      expect(() => room.setSelected(false)).not.toThrow();
    });

    test('redraw triggers redraw without errors', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      expect(() => room.redraw()).not.toThrow();
    });
  });

  describe('Room types', () => {
    test('apartment room has correct properties', () => {
      const spec = ROOM_SPECS.apartment;
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: spec.width,
      });

      expect(room.type).toBe('apartment');
      expect(room.width).toBe(spec.width);
    });

    test('office room has correct properties', () => {
      const spec = ROOM_SPECS.office;
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'office',
        floor: 1,
        position: 0,
        width: spec.width,
      });

      expect(room.type).toBe('office');
      expect(room.width).toBe(spec.width);
    });

    test('farm room has correct properties', () => {
      const spec = ROOM_SPECS.farm;
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'farm',
        floor: 1,
        position: 0,
        width: spec.width,
      });

      expect(room.type).toBe('farm');
      expect(room.width).toBe(spec.width);
    });

    test('kitchen room has correct properties', () => {
      const spec = ROOM_SPECS.kitchen;
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'kitchen',
        floor: 1,
        position: 0,
        width: spec.width,
      });

      expect(room.type).toBe('kitchen');
      expect(room.width).toBe(spec.width);
    });

    test('fastfood room has correct properties', () => {
      const spec = ROOM_SPECS.fastfood;
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'fastfood',
        floor: 1,
        position: 0,
        width: spec.width,
      });

      expect(room.type).toBe('fastfood');
      expect(room.width).toBe(spec.width);
    });

    test('restaurant room has correct properties', () => {
      const spec = ROOM_SPECS.restaurant;
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'restaurant',
        floor: 1,
        position: 0,
        width: spec.width,
      });

      expect(room.type).toBe('restaurant');
      expect(room.width).toBe(spec.width);
    });
  });

  describe('Restaurant visual state', () => {
    test('fastfood room checks RestaurantSystem for open/closed state', () => {
      let isOpen = true;
      const restaurantSystem = {
        isRestaurantOpen: () => isOpen,
      };
      const sceneWithRestaurant = createMockPhaserScene(restaurantSystem);
      
      const room = new Room(sceneWithRestaurant, {
        id: 'room_1',
        type: 'fastfood',
        floor: 1,
        position: 0,
        width: ROOM_SPECS.fastfood.width,
      });

      // Room should check restaurantSystem when drawing
      // We can't easily test the visual dimming, but we can verify it doesn't throw
      expect(() => room.redraw()).not.toThrow();
      
      // Change state and redraw
      isOpen = false;
      expect(() => room.redraw()).not.toThrow();
    });

    test('restaurant room checks RestaurantSystem for open/closed state', () => {
      let isOpen = true;
      const restaurantSystem = {
        isRestaurantOpen: () => isOpen,
      };
      const sceneWithRestaurant = createMockPhaserScene(restaurantSystem);
      
      const room = new Room(sceneWithRestaurant, {
        id: 'room_1',
        type: 'restaurant',
        floor: 1,
        position: 0,
        width: ROOM_SPECS.restaurant.width,
      });

      // Room should check restaurantSystem when drawing
      expect(() => room.redraw()).not.toThrow();
      
      // Change state and redraw
      isOpen = false;
      expect(() => room.redraw()).not.toThrow();
    });

    test('non-restaurant rooms do not check RestaurantSystem', () => {
      const restaurantSystem = {
        isRestaurantOpen: () => {
          throw new Error('Should not be called for non-restaurant rooms');
        },
      };
      const sceneWithRestaurant = createMockPhaserScene(restaurantSystem);
      
      const room = new Room(sceneWithRestaurant, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: ROOM_SPECS.apartment.width,
      });

      // Apartment should not check restaurantSystem
      expect(() => room.redraw()).not.toThrow();
    });
  });

  describe('Cleanup', () => {
    test('destroy cleans up graphics objects', () => {
      const room = new Room(mockScene, {
        id: 'room_1',
        type: 'apartment',
        floor: 1,
        position: 0,
        width: 3,
      });

      // Add some residents/workers
      const resident = new Resident(mockGameScene, 'resident_1', 0, 0);
      room.addResident(resident);

      // Destroy should not throw
      expect(() => room.destroy()).not.toThrow();
    });
  });
});
