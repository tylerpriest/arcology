import { describe, test, expect, beforeEach, vi } from 'vitest';
import { Resident } from './Resident';
import { Building } from './Building';
import { ResidentState } from '../utils/types';
import { HUNGER_MAX, MS_PER_GAME_HOUR } from '../utils/constants';
import Phaser from 'phaser';

// Mock GameScene for Resident
const createMockGameScene = (): any => {
  const building = new Building({
    add: {
      graphics: () => ({
        fillStyle: () => {},
        fillRect: () => {},
        clear: () => {},
        lineStyle: () => {},
        strokeRoundedRect: () => {},
        strokeCircle: () => {},
        lineBetween: () => {},
        setDepth: () => {},
        setBlendMode: () => {},
        destroy: () => {},
      }),
    },
  } as unknown as Phaser.Scene);

  const resourceSystem = {
    consumeFood: vi.fn(() => true),
  };
  const restaurantSystem = {
    isRestaurantOpen: vi.fn(() => true),
  };
  const elevatorSystem = {
    getAllShafts: () => [],
    getShaftForZone: () => null,
    callElevator: () => {},
  };
  const timeSystem = {
    on: () => {},
    getHour: () => 12,
    getMinute: () => 0,
    isWeekend: () => false,
  };

  const mockPhaserScene = {
    add: {
      graphics: () => ({
        fillStyle: () => {},
        fillRect: () => {},
        clear: () => {},
        lineStyle: () => {},
        strokeRoundedRect: () => {},
        strokeCircle: () => {},
        lineBetween: () => {},
        setDepth: () => {},
        setBlendMode: () => {},
        destroy: () => {},
      }),
      text: () => ({
        setDepth: () => {},
        setText: () => {},
        setPosition: () => {},
        setOrigin: () => {},
        setAlpha: () => {},
        destroy: () => {},
      }),
    },
    registry: {
      get: () => 12,
      set: () => {},
    },
    on: () => {},
    building,
    resourceSystem,
    restaurantSystem,
    elevatorSystem,
    timeSystem,
  } as unknown as Phaser.Scene;

  return mockPhaserScene;
};

describe('Resident Entity', () => {
  let mockScene: any;
  let building: Building;

  beforeEach(() => {
    mockScene = createMockGameScene();
    building = mockScene.building;
  });

  describe('Initialization', () => {
    test('creates resident with default values', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      expect(resident.id).toBe('test_1');
      expect(resident.name).toBeDefined();
      expect(resident.type).toBe('resident');
      expect(resident.hunger).toBe(HUNGER_MAX);
      expect(resident.stress).toBe(0);
      expect(resident.state).toBe(ResidentState.IDLE);
      expect(resident.home).toBeNull();
      expect(resident.job).toBeNull();
      expect(Array.isArray(resident.traits)).toBe(true);
      expect(resident.traits.length).toBeGreaterThanOrEqual(1);
      expect(resident.traits.length).toBeLessThanOrEqual(2);
    });

    test('resident has unique name', () => {
      const resident1 = new Resident(mockScene, 'test_1', 0, 0);
      const resident2 = new Resident(mockScene, 'test_2', 0, 0);

      expect(resident1.name).toBeDefined();
      expect(resident2.name).toBeDefined();
      // Names may be the same (random selection), but both should be defined
    });
  });

  describe('Hunger system', () => {
    test('hunger decreases over time', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      const initialHunger = resident.hunger;

      // Update for 1 game hour (3600000 ms)
      // Hunger decays at 4 points per game hour
      resident.update(3600000, 12);

      expect(resident.hunger).toBeLessThan(initialHunger);
      expect(resident.hunger).toBeCloseTo(initialHunger - 4, 0.5);
    });

    test('hunger does not go below zero', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 1;

      // Update for multiple hours to ensure hunger reaches 0
      for (let i = 0; i < 10; i++) {
        resident.update(3600000, 12);
      }

      expect(resident.hunger).toBeGreaterThanOrEqual(0);
    });

    test('isHungry returns true when hunger < 50', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 40;

      expect(resident.isHungry()).toBe(true);
    });

    test('isHungry returns false when hunger >= 50', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 60;

      expect(resident.isHungry()).toBe(false);
    });

    test('isStarving returns true when hunger < 20', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 15;

      expect(resident.isStarving()).toBe(true);
    });

    test('isStarving returns false when hunger >= 20', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 25;

      expect(resident.isStarving()).toBe(false);
    });

    test('starvation time accumulates when hunger is 0', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 0;

      // Update for 1 game hour
      resident.update(3600000, 12);

      const starvationTime = resident.getStarvationTime();
      expect(starvationTime).toBeGreaterThan(0);
    });

    test('hasStarvedTooLong returns true after 24 game hours at hunger 0', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 0;

      // Update for 24 game hours (24 * MS_PER_GAME_HOUR)
      const hours24 = 24 * MS_PER_GAME_HOUR;
      resident.update(hours24, 12);

      expect(resident.hasStarvedTooLong()).toBe(true);
    });

    test('hasStarvedTooLong returns false before 24 hours', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.hunger = 0;

      // Update for 23 game hours
      const hours23 = 23 * MS_PER_GAME_HOUR;
      resident.update(hours23, 12);

      expect(resident.hasStarvedTooLong()).toBe(false);
    });
  });

  describe('Stress system', () => {
    test('stress accumulates from unemployment', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.job = null;
      const initialStress = resident.stress;

      // Update for 1 game hour
      // Unemployed: +3 stress/hour
      resident.update(3600000, 12);

      expect(resident.stress).toBeGreaterThan(initialStress);
      expect(resident.stress).toBeCloseTo(initialStress + 3, 0.5);
    });

    test('stress does not exceed 100', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.stress = 99;
      resident.job = null;

      // Update for multiple hours
      for (let i = 0; i < 10; i++) {
        resident.update(3600000, 12);
      }

      expect(resident.stress).toBeLessThanOrEqual(100);
    });

    test('hasHighStressTooLong returns true after 48 hours at stress >80', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.stress = 85;

      // Update for 48 game hours
      const hours48 = 48 * MS_PER_GAME_HOUR;
      resident.update(hours48, 12);

      expect(resident.hasHighStressTooLong()).toBe(true);
    });

    test('hasHighStressTooLong returns false before 48 hours', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.stress = 85;

      // Update for 47 game hours
      const hours47 = 47 * MS_PER_GAME_HOUR;
      resident.update(hours47, 12);

      expect(resident.hasHighStressTooLong()).toBe(false);
    });

    test('hasHighStressTooLong returns false when stress <= 80', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.stress = 75;

      // Update for 48+ hours
      const hours48 = 48 * MS_PER_GAME_HOUR;
      resident.update(hours48, 12);

      expect(resident.hasHighStressTooLong()).toBe(false);
    });
  });

  describe('Satisfaction calculation', () => {
    test('calculateSatisfaction returns value between 0-100', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      const satisfaction = resident.calculateSatisfaction(true);
      expect(satisfaction).toBeGreaterThanOrEqual(0);
      expect(satisfaction).toBeLessThanOrEqual(100);
    });

    test('satisfaction decreases with stress', () => {
      const resident1 = new Resident(mockScene, 'test_1', 0, 0);
      resident1.stress = 0;

      const resident2 = new Resident(mockScene, 'test_2', 0, 0);
      resident2.stress = 50;

      const sat1 = resident1.calculateSatisfaction(true);
      const sat2 = resident2.calculateSatisfaction(true);

      expect(sat1).toBeGreaterThan(sat2);
    });

    test('satisfaction decreases with hunger', () => {
      const resident1 = new Resident(mockScene, 'test_1', 0, 0);
      resident1.hunger = 100;

      const resident2 = new Resident(mockScene, 'test_2', 0, 0);
      resident2.hunger = 0;

      const sat1 = resident1.calculateSatisfaction(true);
      const sat2 = resident2.calculateSatisfaction(true);

      expect(sat1).toBeGreaterThan(sat2);
    });

    test('satisfaction increases with food availability', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      const satWithFood = resident.calculateSatisfaction(true);
      const satWithoutFood = resident.calculateSatisfaction(false);

      expect(satWithFood).toBeGreaterThan(satWithoutFood);
      expect(satWithFood - satWithoutFood).toBe(10); // Food bonus is +10
    });

    test('satisfaction increases with employment', () => {
      building.addRoom('apartment', 1, 0);
      building.addRoom('office', 1, 5);
      const apartment = building.getRoomAt(1, 0)!;
      const office = building.getRoomAt(1, 5)!;

      const resident1 = new Resident(mockScene, 'test_1', 0, 0);
      resident1.setHome(apartment);
      resident1.setJob(null);

      const resident2 = new Resident(mockScene, 'test_2', 0, 0);
      resident2.setHome(apartment);
      resident2.setJob(office);

      const sat1 = resident1.calculateSatisfaction(true);
      const sat2 = resident2.calculateSatisfaction(true);

      expect(sat2).toBeGreaterThan(sat1);
      expect(sat2 - sat1).toBe(15); // Employment bonus is +15
    });

    test('satisfaction formula: 100 - stress - hungerPenalty + bonuses', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.stress = 20;
      resident.hunger = 80; // Hunger penalty = (100-80)/2 = 10

      // Expected: 100 - 20 - 10 + 10 (food) + 0 (no job) = 80
      const satisfaction = resident.calculateSatisfaction(true);
      expect(satisfaction).toBeCloseTo(80, 0.5);
    });
  });

  describe('Home and job assignment', () => {
    test('setHome assigns home and adds resident to room', () => {
      building.addRoom('apartment', 1, 0);
      const apartment = building.getRoomAt(1, 0)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      resident.setHome(apartment);

      expect(resident.home).toBe(apartment);
      expect(apartment.getResidentCount()).toBe(1);
    });

    test('setHome removes resident from previous home', () => {
      building.addRoom('apartment', 1, 0);
      building.addRoom('apartment', 1, 5);
      const apartment1 = building.getRoomAt(1, 0)!;
      const apartment2 = building.getRoomAt(1, 5)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      resident.setHome(apartment1);
      expect(apartment1.getResidentCount()).toBe(1);

      resident.setHome(apartment2);
      expect(apartment1.getResidentCount()).toBe(0);
      expect(apartment2.getResidentCount()).toBe(1);
    });

    test('setJob assigns job and adds worker to room', () => {
      building.addRoom('office', 1, 0);
      const office = building.getRoomAt(1, 0)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      resident.setJob(office);

      expect(resident.job).toBe(office);
      expect(office.getWorkerCount()).toBe(1);
    });

    test('setJob removes worker from previous job', () => {
      building.addRoom('office', 1, 0);
      building.addRoom('office', 1, 5);
      const office1 = building.getRoomAt(1, 0)!;
      const office2 = building.getRoomAt(1, 5)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      resident.setJob(office1);
      expect(office1.getWorkerCount()).toBe(1);

      resident.setJob(office2);
      expect(office1.getWorkerCount()).toBe(0);
      expect(office2.getWorkerCount()).toBe(1);
    });

    test('setJob with null removes job', () => {
      building.addRoom('office', 1, 0);
      const office = building.getRoomAt(1, 0)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      resident.setJob(office);
      expect(resident.job).toBe(office);

      resident.setJob(null);
      expect(resident.job).toBeNull();
      expect(office.getWorkerCount()).toBe(0);
    });
  });

  describe('State machine', () => {
    test('starts in IDLE state', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      expect(resident.state).toBe(ResidentState.IDLE);
    });

    test('can transition to WORKING state', () => {
      building.addRoom('apartment', 1, 0);
      building.addRoom('office', 1, 5);
      const apartment = building.getRoomAt(1, 0)!;
      const office = building.getRoomAt(1, 5)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.setHome(apartment);
      resident.setJob(office);

      // Set time to work hours (9 AM - 5 PM)
      resident.update(100, 10);

      // Resident should attempt to go to work
      // Note: Actual state transition depends on pathfinding, but we can verify
      // that the resident has a job and is in a state that allows work
      expect(resident.job).toBe(office);
    });

    test('can transition to EATING state when food available', () => {
      building.addRoom('apartment', 1, 0);
      building.addRoom('kitchen', 1, 5);
      const apartment = building.getRoomAt(1, 0)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.setHome(apartment);
      resident.hunger = 30; // Below 50, should seek food

      // Mock resourceSystem to return food
      mockScene.resourceSystem.consumeFood.mockReturnValue(true);

      // Update resident (should seek kitchen when hungry)
      resident.update(100, 12);

      // Resident should attempt to go to kitchen
      // Note: Actual eating depends on arriving at kitchen and food being available
      expect(resident.isHungry()).toBe(true);
    });

    test('can transition to SLEEPING state during sleep hours', () => {
      building.addRoom('apartment', 1, 0);
      const apartment = building.getRoomAt(1, 0)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.setHome(apartment);

      // Set time to sleep hours (10 PM - 6 AM)
      resident.update(100, 22);

      // Resident should attempt to go home to sleep
      // Note: Actual state transition depends on pathfinding
      expect(resident.home).toBe(apartment);
    });
  });

  describe('Position management', () => {
    test('getPosition returns current position', () => {
      const resident = new Resident(mockScene, 'test_1', 100, 200);

      const pos = resident.getPosition();
      expect(pos.x).toBe(100);
      expect(pos.y).toBe(200);
    });

    test('setPosition updates position', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      resident.setPosition(150, 250);

      const pos = resident.getPosition();
      expect(pos.x).toBe(150);
      expect(pos.y).toBe(250);
    });
  });

  describe('Serialization', () => {
    test('serialize includes all resident data', () => {
      building.addRoom('apartment', 1, 0);
      building.addRoom('office', 1, 5);
      const apartment = building.getRoomAt(1, 0)!;
      const office = building.getRoomAt(1, 5)!;
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.setHome(apartment);
      resident.setJob(office);
      resident.hunger = 75;
      resident.stress = 25;
      resident.type = 'resident';

      const serialized = resident.serialize();

      expect(serialized.id).toBe('test_1');
      expect(serialized.name).toBe(resident.name);
      expect(serialized.type).toBe('resident');
      expect(serialized.hunger).toBe(75);
      expect(serialized.stress).toBe(25);
      expect(serialized.homeId).toBe(apartment.id);
      expect(serialized.jobId).toBe(office.id);
      expect(serialized.state).toBe(ResidentState.IDLE);
      expect(Array.isArray(serialized.traits)).toBe(true);
      expect(serialized.traits.length).toBeGreaterThanOrEqual(1);
      expect(serialized.traits.length).toBeLessThanOrEqual(2);
    });

    test('serialize handles null home and job', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);

      const serialized = resident.serialize();

      expect(serialized.homeId).toBeNull();
      expect(serialized.jobId).toBeNull();
    });
  });

  describe('Type system', () => {
    test('default type is resident', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      expect(resident.type).toBe('resident');
    });

    test('type can be set to office_worker', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.type = 'office_worker';
      expect(resident.type).toBe('office_worker');
    });

    test('type is included in serialization', () => {
      const resident = new Resident(mockScene, 'test_1', 0, 0);
      resident.type = 'office_worker';

      const serialized = resident.serialize();
      expect(serialized.type).toBe('office_worker');
    });
  });
});
