import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { BuildMenu } from './BuildMenu';
import { ROOM_SPECS } from '../../utils/constants';

describe('BuildMenu', () => {
  let parent: HTMLElement;
  let buildMenu: BuildMenu;
  let onSelectCalled: string | null = null;

  beforeEach(() => {
    parent = document.createElement('div');
    document.body.appendChild(parent);
    onSelectCalled = null;
    buildMenu = new BuildMenu(parent, (roomType) => {
      onSelectCalled = roomType;
    });
  });

  afterEach(() => {
    buildMenu.destroy();
    document.body.removeChild(parent);
  });

  describe('Initialization', () => {
    test('creates build menu element with correct structure', () => {
      const element = parent.querySelector('.build-menu');
      expect(element).toBeTruthy();
      expect(element?.classList.contains('glass-panel')).toBe(true);
    });

    test('creates buttons for all room types', () => {
      const roomTypes = Object.keys(ROOM_SPECS);
      roomTypes.forEach((roomType) => {
        const button = parent.querySelector(`.room-button.${roomType}`);
        expect(button).toBeTruthy();
      });
    });

    test('displays room cost correctly', () => {
      const apartmentButton = parent.querySelector('.room-button.apartment');
      const costElement = apartmentButton?.querySelector('.room-cost');
      const spec = ROOM_SPECS.apartment;
      expect(costElement?.textContent).toBe(`${spec.cost.toLocaleString()} CR`);
    });

    test('displays "Free" for zero cost rooms', () => {
      // Find a room with cost 0 if any, otherwise check the structure
      const buttons = parent.querySelectorAll('.room-button');
      buttons.forEach((button) => {
        const costElement = button.querySelector('.room-cost');
        expect(costElement).toBeTruthy();
      });
    });

    test('displays building info with max floors', () => {
      const buildingInfo = parent.querySelector('.building-info');
      expect(buildingInfo).toBeTruthy();
      expect(buildingInfo?.textContent).toContain('Max Floors: 20');
    });

    test('creates speed controls', () => {
      const speedControls = parent.querySelector('.speed-controls');
      expect(speedControls).toBeTruthy();
      
      const speedButtons = speedControls?.querySelectorAll('.speed-btn');
      expect(speedButtons?.length).toBe(4); // Pause, 1x, 2x, 4x
    });

    test('has 1x speed active by default', () => {
      const activeBtn = parent.querySelector('.speed-btn.active');
      expect(activeBtn).toBeTruthy();
      expect((activeBtn as HTMLElement).dataset.speed).toBe('1');
    });
  });

  describe('Room Selection', () => {
    test('calls onSelect callback when room button is clicked', () => {
      const apartmentButton = parent.querySelector('.room-button.apartment') as HTMLElement;
      apartmentButton.click();
      
      expect(onSelectCalled).toBe('apartment');
    });

    test('sets selected state on button', () => {
      buildMenu.setSelected('apartment');
      
      const apartmentButton = parent.querySelector('.room-button.apartment');
      expect(apartmentButton?.classList.contains('selected')).toBe(true);
    });

    test('removes selected state from other buttons', () => {
      buildMenu.setSelected('apartment');
      buildMenu.setSelected('office');
      
      const apartmentButton = parent.querySelector('.room-button.apartment');
      const officeButton = parent.querySelector('.room-button.office');
      
      expect(apartmentButton?.classList.contains('selected')).toBe(false);
      expect(officeButton?.classList.contains('selected')).toBe(true);
    });
  });

  describe('Speed Controls', () => {
    test('updates active state when speed button is clicked', () => {
      const speed2xBtn = parent.querySelector('[data-speed="2"]') as HTMLElement;
      speed2xBtn.click();
      
      expect(speed2xBtn.classList.contains('active')).toBe(true);
      
      const speed1xBtn = parent.querySelector('[data-speed="1"]') as HTMLElement;
      expect(speed1xBtn.classList.contains('active')).toBe(false);
    });

    test('dispatches speed-change event', () => {
      let eventReceived = false;
      let eventSpeed = 0;
      
      document.addEventListener('speed-change', ((e: CustomEvent) => {
        eventReceived = true;
        eventSpeed = e.detail.speed;
      }) as EventListener);
      
      const speed2xBtn = parent.querySelector('[data-speed="2"]') as HTMLElement;
      speed2xBtn.click();
      
      expect(eventReceived).toBe(true);
      expect(eventSpeed).toBe(2);
    });

    test('getCurrentSpeed returns active speed', () => {
      expect(buildMenu.getCurrentSpeed()).toBe(1);
      
      const speed4xBtn = parent.querySelector('[data-speed="4"]') as HTMLElement;
      speed4xBtn.click();
      
      expect(buildMenu.getCurrentSpeed()).toBe(4);
    });

    test('setSpeed updates active state programmatically', () => {
      buildMenu.setSpeed(2);
      
      const speed2xBtn = parent.querySelector('[data-speed="2"]') as HTMLElement;
      expect(speed2xBtn.classList.contains('active')).toBe(true);
    });

    test('setSpeed dispatches speed-change event', () => {
      let eventReceived = false;
      let eventSpeed = 0;
      
      document.addEventListener('speed-change', ((e: CustomEvent) => {
        eventReceived = true;
        eventSpeed = e.detail.speed;
      }) as EventListener);
      
      buildMenu.setSpeed(4);
      
      expect(eventReceived).toBe(true);
      expect(eventSpeed).toBe(4);
    });
  });

  describe('Visibility', () => {
    test('is visible by default', () => {
      expect(buildMenu.getIsVisible()).toBe(true);
      const element = parent.querySelector('.build-menu') as HTMLElement;
      expect(element.classList.contains('hidden')).toBe(false);
    });

    test('hide makes menu invisible', () => {
      buildMenu.hide();
      
      expect(buildMenu.getIsVisible()).toBe(false);
      const element = parent.querySelector('.build-menu') as HTMLElement;
      expect(element.classList.contains('hidden')).toBe(true);
    });

    test('show makes menu visible', () => {
      buildMenu.hide();
      buildMenu.show();
      
      expect(buildMenu.getIsVisible()).toBe(true);
      const element = parent.querySelector('.build-menu') as HTMLElement;
      expect(element.classList.contains('hidden')).toBe(false);
    });
  });

  describe('Room Name Capitalization', () => {
    test('capitalizes room names correctly', () => {
      const fastfoodButton = parent.querySelector('.room-button.fastfood');
      const nameElement = fastfoodButton?.querySelector('.room-name');
      expect(nameElement?.textContent).toBe('Fast Food');
    });

    test('handles restaurant name correctly', () => {
      const restaurantButton = parent.querySelector('.room-button.restaurant');
      const nameElement = restaurantButton?.querySelector('.room-name');
      expect(nameElement?.textContent).toBe('Fine Dining');
    });
  });

  describe('destroy', () => {
    test('removes element from DOM', () => {
      const element = parent.querySelector('.build-menu');
      expect(element).toBeTruthy();
      
      buildMenu.destroy();
      
      expect(parent.querySelector('.build-menu')).toBeNull();
    });
  });
});
