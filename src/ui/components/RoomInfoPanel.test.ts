import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { RoomInfoPanel } from './RoomInfoPanel';

describe('RoomInfoPanel', () => {
  let parent: HTMLElement;
  let roomInfoPanel: RoomInfoPanel;

  beforeEach(() => {
    parent = document.createElement('div');
    document.body.appendChild(parent);
    roomInfoPanel = new RoomInfoPanel(parent);
  });

  afterEach(() => {
    roomInfoPanel.destroy();
    document.body.removeChild(parent);
  });

  describe('Initialization', () => {
    test('creates room info panel element', () => {
      const element = parent.querySelector('.room-info-panel');
      expect(element).toBeTruthy();
      expect(element?.classList.contains('glass-panel')).toBe(true);
    });

    test('is hidden by default', () => {
      expect(roomInfoPanel.isVisible()).toBe(false);
      const element = parent.querySelector('.room-info-panel') as HTMLElement;
      expect(element.style.display).toBe('none');
    });

    test('has no room ID by default', () => {
      expect(roomInfoPanel.getRoomId()).toBeNull();
    });
  });

  describe('show', () => {
    test('displays panel with room information', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      
      expect(roomInfoPanel.isVisible()).toBe(true);
      expect(roomInfoPanel.getRoomId()).toBe('room-123');
    });

    test('displays room type name', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      
      const title = parent.querySelector('.room-info-title');
      expect(title?.textContent).toBe('Apartment');
    });

    test('displays room ID (truncated)', () => {
      roomInfoPanel.show('room-123456789', 'apartment', 2, 0, 100, 10);
      
      const idValue = Array.from(parent.querySelectorAll('.room-info-value'))
        .find(el => el.previousElementSibling?.textContent?.includes('ID:'));
      expect(idValue?.textContent).toBe('room-123');
    });

    test('displays residents count for capacity rooms', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      
      const residentsRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Residents:'));
      expect(residentsRow).toBeTruthy();
      expect(residentsRow?.textContent).toContain('2 / 4');
    });

    test('displays workers count for job rooms', () => {
      roomInfoPanel.show('room-123', 'office', 0, 3, 500, 50);
      
      const workersRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Workers:'));
      expect(workersRow).toBeTruthy();
      expect(workersRow?.textContent).toContain('3 / 8');
    });

    test('displays income with green color', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      
      const incomeRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Income:'));
      const incomeValue = incomeRow?.querySelector('.room-info-value') as HTMLElement;
      expect(incomeValue?.textContent).toBe('+100 CR/day');
      expect(incomeValue?.style.color).toBe('var(--green)');
    });

    test('displays expenses with magenta color', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      
      const expensesRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Expenses:'));
      const expensesValue = expensesRow?.querySelector('.room-info-value') as HTMLElement;
      expect(expensesValue?.textContent).toBe('-10 CR/day');
      expect(expensesValue?.style.color).toBe('var(--magenta)');
    });

    test('displays net income with green color when positive', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      
      const netRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Net:'));
      const netValue = netRow?.querySelector('.room-info-value') as HTMLElement;
      expect(netValue?.textContent).toBe('+90 CR/day');
      expect(netValue?.style.color).toBe('var(--green)');
    });

    test('displays net income with magenta color when negative', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 50, 100);
      
      const netRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Net:'));
      const netValue = netRow?.querySelector('.room-info-value') as HTMLElement;
      expect(netValue?.textContent).toBe('-50 CR/day');
      expect(netValue?.style.color).toBe('var(--magenta)');
    });

    test('formats large numbers with commas', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 12345, 6789);
      
      const incomeValue = Array.from(parent.querySelectorAll('.room-info-value'))
        .find(el => el.textContent?.includes('+12,345'));
      expect(incomeValue).toBeTruthy();
    });

    test('displays traits when provided', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10, ['Workaholic', 'Foodie']);
      
      const traitsRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Traits:'));
      expect(traitsRow).toBeTruthy();
      expect(traitsRow?.textContent).toContain('Workaholic, Foodie');
    });

    test('does not display traits row when empty', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10, []);
      
      const traitsRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Traits:'));
      expect(traitsRow).toBeFalsy();
    });

    test('displays tenant types when provided', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10, [], ['Resident']);
      
      const typesRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Types:'));
      expect(typesRow).toBeTruthy();
      expect(typesRow?.textContent).toContain('Resident');
    });

    test('displays multiple tenant types when provided', () => {
      roomInfoPanel.show('room-123', 'office', 0, 3, 500, 50, [], ['Office Worker', 'Resident']);
      
      const typesRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Types:'));
      expect(typesRow).toBeTruthy();
      expect(typesRow?.textContent).toContain('Office Worker, Resident');
    });

    test('does not display tenant types row when empty', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10, [], []);
      
      const typesRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Types:'));
      expect(typesRow).toBeFalsy();
    });

    test('does not display residents row for non-capacity rooms', () => {
      roomInfoPanel.show('room-123', 'lobby', 0, 0, 0, 0);
      
      const residentsRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Residents:'));
      expect(residentsRow).toBeFalsy();
    });

    test('does not display workers row for non-job rooms', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      
      const workersRow = Array.from(parent.querySelectorAll('.room-info-row'))
        .find(el => el.textContent?.includes('Workers:'));
      expect(workersRow).toBeFalsy();
    });
  });

  describe('hide', () => {
    test('hides panel', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      expect(roomInfoPanel.isVisible()).toBe(true);
      
      roomInfoPanel.hide();
      
      expect(roomInfoPanel.isVisible()).toBe(false);
      expect(roomInfoPanel.getRoomId()).toBeNull();
    });
  });

  describe('Close Button', () => {
    test('close button hides panel when clicked', () => {
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      expect(roomInfoPanel.isVisible()).toBe(true);
      
      const closeBtn = parent.querySelector('.room-info-close') as HTMLButtonElement;
      closeBtn.click();
      
      expect(roomInfoPanel.isVisible()).toBe(false);
    });
  });

  describe('getRoomId', () => {
    test('returns current room ID', () => {
      expect(roomInfoPanel.getRoomId()).toBeNull();
      
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      expect(roomInfoPanel.getRoomId()).toBe('room-123');
      
      roomInfoPanel.hide();
      expect(roomInfoPanel.getRoomId()).toBeNull();
    });
  });

  describe('isVisible', () => {
    test('returns visibility state', () => {
      expect(roomInfoPanel.isVisible()).toBe(false);
      
      roomInfoPanel.show('room-123', 'apartment', 2, 0, 100, 10);
      expect(roomInfoPanel.isVisible()).toBe(true);
      
      roomInfoPanel.hide();
      expect(roomInfoPanel.isVisible()).toBe(false);
    });
  });

  describe('destroy', () => {
    test('removes element from DOM', () => {
      const element = parent.querySelector('.room-info-panel');
      expect(element).toBeTruthy();
      
      roomInfoPanel.destroy();
      
      expect(parent.querySelector('.room-info-panel')).toBeNull();
    });
  });
});
