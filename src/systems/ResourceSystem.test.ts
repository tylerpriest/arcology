import { describe, test, expect, beforeEach } from 'vitest';
import { ResourceSystem } from './ResourceSystem';
import { Building } from '../entities/Building';
import { ROOM_SPECS } from '../utils/constants';
import Phaser from 'phaser';

// Mock Phaser Scene for Building
const createMockPhaserScene = (): Phaser.Scene => {
  // Create mock graphics and text objects that return themselves for chaining
  const mockGraphics = {
    fillStyle: () => mockGraphics,
    fillRect: () => {},
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
  } as unknown as Phaser.Scene;
};

describe('ResourceSystem', () => {
  let resourceSystem: ResourceSystem;
  let building: Building;
  let mockScene: Phaser.Scene;

  beforeEach(() => {
    mockScene = createMockPhaserScene();
    building = new Building(mockScene);
    resourceSystem = new ResourceSystem();
  });

  describe('Initial state', () => {
    test('starts with zero raw food', () => {
      expect(resourceSystem.getRawFood()).toBe(0);
    });

    test('starts with zero processed food', () => {
      expect(resourceSystem.getFood()).toBe(0);
    });
  });

  describe('Farm food production', () => {
    test('farms produce raw food over time', () => {
      building.addRoom('farm', 1, 0);

      // Update for 1 game hour (3600000 ms = 1 hour)
      // Farm produces 10 units/day, so 10/24 = 0.4167 per hour
      // Formula: (spec.foodProduction / 24) * hourDelta * 10
      // For 1 hour: (10 / 24) * 1 * 10 = 4.167
      resourceSystem.update(3600000, building);

      const rawFood = resourceSystem.getRawFood();
      expect(rawFood).toBeGreaterThan(0);
      // Should be approximately 4.167, allow some tolerance for floating point
      expect(rawFood).toBeCloseTo(4.167, 1);
    });

    test('multiple farms produce more raw food', () => {
      building.addRoom('farm', 1, 0);
      building.addRoom('farm', 1, 5);

      resourceSystem.update(3600000, building);

      const rawFood = resourceSystem.getRawFood();
      // Two farms should produce approximately double
      expect(rawFood).toBeCloseTo(8.333, 1);
    });

    test('no farms produce no raw food', () => {
      // No farms added
      resourceSystem.update(3600000, building);

      expect(resourceSystem.getRawFood()).toBe(0);
    });

    test('farm production scales with time', () => {
      building.addRoom('farm', 1, 0);

      // Update for 2 hours
      resourceSystem.update(7200000, building);

      const rawFood = resourceSystem.getRawFood();
      // Should be approximately double the 1-hour amount
      expect(rawFood).toBeCloseTo(8.333, 1);
    });
  });

  describe('Kitchen food processing', () => {
    test('kitchens convert raw food to processed food', () => {
      building.addRoom('kitchen', 1, 0);

      // Add some raw food first
      resourceSystem.addRawFood(100);
      expect(resourceSystem.getRawFood()).toBe(100);
      expect(resourceSystem.getFood()).toBe(0);

      // Update for 1 game hour
      // Kitchen processes 20 units/day, so 20/24 = 0.8333 per hour
      // Formula: (spec.foodProcessing / 24) * hourDelta * 10
      // For 1 hour: (20 / 24) * 1 * 10 = 8.333
      resourceSystem.update(3600000, building);

      const rawFood = resourceSystem.getRawFood();
      const processedFood = resourceSystem.getFood();

      // Raw food should decrease
      expect(rawFood).toBeLessThan(100);
      // Processed food should increase
      expect(processedFood).toBeGreaterThan(0);
      expect(processedFood).toBeCloseTo(8.333, 1);
    });

    test('kitchens cannot process more raw food than available', () => {
      building.addRoom('kitchen', 1, 0);

      // Add only 5 units of raw food
      resourceSystem.addRawFood(5);

      // Update for 1 hour (would normally process 8.333, but only 5 available)
      resourceSystem.update(3600000, building);

      const rawFood = resourceSystem.getRawFood();
      const processedFood = resourceSystem.getFood();

      // All raw food should be consumed
      expect(rawFood).toBe(0);
      // Only 5 units should be processed
      expect(processedFood).toBe(5);
    });

    test('multiple kitchens process more food', () => {
      building.addRoom('kitchen', 1, 0);
      building.addRoom('kitchen', 1, 5);

      resourceSystem.addRawFood(100);

      resourceSystem.update(3600000, building);

      const processedFood = resourceSystem.getFood();
      // Two kitchens should process approximately double
      expect(processedFood).toBeCloseTo(16.667, 1);
    });

    test('no kitchens process no food', () => {
      resourceSystem.addRawFood(100);

      resourceSystem.update(3600000, building);

      // Raw food should remain unchanged
      expect(resourceSystem.getRawFood()).toBe(100);
      // No processed food should be created
      expect(resourceSystem.getFood()).toBe(0);
    });
  });

  describe('Food chain (farm → kitchen → processed)', () => {
    test('complete food chain works end-to-end', () => {
      building.addRoom('farm', 1, 0);
      building.addRoom('kitchen', 1, 5);

      // Start with no food
      expect(resourceSystem.getRawFood()).toBe(0);
      expect(resourceSystem.getFood()).toBe(0);

      // Update for 1 hour
      console.log('Farms count:', building.getFarms().length);
      resourceSystem.update(3600000, building);
      console.log('Raw food after update:', resourceSystem.getRawFood());

      // Farm should produce raw food
      const rawFood = resourceSystem.getRawFood();
      // rawFood might be 0 if kitchen consumed it all

      // Kitchen should process some of it
      const processedFood = resourceSystem.getFood();
      expect(processedFood).toBeGreaterThan(0);

      // Raw food should be less than what farm produced (some was processed)
      expect(rawFood).toBeLessThan(4.167);
    });

    test('multiple farms and kitchens scale production', () => {
      building.addRoom('farm', 1, 0);
      building.addRoom('farm', 1, 5);
      building.addRoom('kitchen', 1, 10);
      building.addRoom('kitchen', 1, 15);

      resourceSystem.update(3600000, building);

      // Should have processed food
      expect(resourceSystem.getFood()).toBeGreaterThan(0);
    });

    test('kitchen processing rate limits production', () => {
      // Add 1 farm and 1 kitchen
      // Farm produces 10/day = 0.4167/hour
      // Kitchen processes 20/day = 0.8333/hour
      // Kitchen can process more than farm produces, so all raw food should be processed
      building.addRoom('farm', 1, 0);
      building.addRoom('kitchen', 1, 5);

      // Update for 24 hours (full day)
      resourceSystem.update(86400000, building);

      // After a full day, farm should have produced 10 units
      // Kitchen should have processed all of it (since it processes faster)
      const rawFood = resourceSystem.getRawFood();
      const processedFood = resourceSystem.getFood();

      // Most raw food should be processed (kitchen processes faster than farm produces)
      expect(rawFood).toBeLessThan(2); // Some may accumulate if processing lags slightly
      expect(processedFood).toBeGreaterThan(8); // Most should be processed
    });
  });

  describe('Food consumption', () => {
    test('consumeFood reduces processed food when available', () => {
      resourceSystem.addProcessedFood(100);
      expect(resourceSystem.getFood()).toBe(100);

      const success = resourceSystem.consumeFood(30);

      expect(success).toBe(true);
      expect(resourceSystem.getFood()).toBe(70);
    });

    test('consumeFood fails when insufficient food', () => {
      resourceSystem.addProcessedFood(20);

      const success = resourceSystem.consumeFood(30);

      expect(success).toBe(false);
      expect(resourceSystem.getFood()).toBe(20); // Unchanged
    });

    test('consumeFood can consume all available food', () => {
      resourceSystem.addProcessedFood(50);

      const success = resourceSystem.consumeFood(50);

      expect(success).toBe(true);
      expect(resourceSystem.getFood()).toBe(0);
    });

    test('consumeFood handles zero consumption', () => {
      resourceSystem.addProcessedFood(100);

      const success = resourceSystem.consumeFood(0);

      expect(success).toBe(true);
      expect(resourceSystem.getFood()).toBe(100); // Unchanged
    });
  });

  describe('Food management methods', () => {
    test('addRawFood increases raw food', () => {
      expect(resourceSystem.getRawFood()).toBe(0);

      resourceSystem.addRawFood(50);

      expect(resourceSystem.getRawFood()).toBe(50);
    });

    test('addProcessedFood increases processed food', () => {
      expect(resourceSystem.getFood()).toBe(0);

      resourceSystem.addProcessedFood(75);

      expect(resourceSystem.getFood()).toBe(75);
    });

    test('setFood sets both raw and processed food', () => {
      resourceSystem.setFood(100, 200);

      expect(resourceSystem.getRawFood()).toBe(100);
      expect(resourceSystem.getFood()).toBe(200);
    });

    test('setFood can reset food to zero', () => {
      resourceSystem.addRawFood(50);
      resourceSystem.addProcessedFood(75);

      resourceSystem.setFood(0, 0);

      expect(resourceSystem.getRawFood()).toBe(0);
      expect(resourceSystem.getFood()).toBe(0);
    });

    test('addRawFood can add to existing food', () => {
      resourceSystem.addRawFood(30);
      resourceSystem.addRawFood(20);

      expect(resourceSystem.getRawFood()).toBe(50);
    });

    test('addProcessedFood can add to existing food', () => {
      resourceSystem.addProcessedFood(40);
      resourceSystem.addProcessedFood(60);

      expect(resourceSystem.getFood()).toBe(100);
    });
  });

  describe('Production rates match spec', () => {
    test('farm production rate matches ROOM_SPECS', () => {
      const spec = ROOM_SPECS.farm;
      expect(spec.foodProduction).toBe(10); // 10 units per day

      building.addRoom('farm', 1, 0);

      // Update for 24 hours (full day)
      resourceSystem.update(86400000, building);

      // Should produce approximately 100 units (10 * 10 multiplier)
      const rawFood = resourceSystem.getRawFood();
      expect(rawFood).toBeCloseTo(100, 0.5);
    });

    test('kitchen processing rate matches ROOM_SPECS', () => {
      const spec = ROOM_SPECS.kitchen;
      expect(spec.foodProcessing).toBe(20); // 20 units per day

      building.addRoom('kitchen', 1, 0);
      resourceSystem.addRawFood(300);

      // Update for 24 hours (full day)
      resourceSystem.update(86400000, building);

      // Should process approximately 200 units (20 * 10 multiplier)
      const processedFood = resourceSystem.getFood();
      expect(processedFood).toBeCloseTo(200, 0.5);
    });
  });

  describe('Edge cases', () => {
    test('update with zero delta produces no food', () => {
      building.addRoom('farm', 1, 0);

      resourceSystem.update(0, building);

      expect(resourceSystem.getRawFood()).toBe(0);
    });

    test('update with very small delta produces minimal food', () => {
      building.addRoom('farm', 1, 0);

      resourceSystem.update(1, building); // 1 ms

      const rawFood = resourceSystem.getRawFood();
      expect(rawFood).toBeGreaterThanOrEqual(0);
      expect(rawFood).toBeLessThan(0.001); // Very small amount
    });

    test('kitchen processes available raw food even if less than capacity', () => {
      building.addRoom('kitchen', 1, 0);
      resourceSystem.addRawFood(1); // Only 1 unit

      resourceSystem.update(3600000, building);

      // Should process the 1 unit
      expect(resourceSystem.getRawFood()).toBe(0);
      expect(resourceSystem.getFood()).toBe(1);
    });

    test('multiple updates accumulate food production', () => {
      building.addRoom('farm', 1, 0);

      // Update 24 times for 1 hour each
      for (let i = 0; i < 24; i++) {
        resourceSystem.update(3600000, building);
      }

      // Should have approximately 100 units (1 day of production)
      const rawFood = resourceSystem.getRawFood();
      expect(rawFood).toBeCloseTo(100, 0.5);
    });
  });
});
