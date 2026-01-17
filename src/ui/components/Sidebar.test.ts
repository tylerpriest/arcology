import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  let parent: HTMLElement;
  let sidebar: Sidebar;

  beforeEach(() => {
    parent = document.createElement('div');
    document.body.appendChild(parent);
    sidebar = new Sidebar(parent);
  });

  afterEach(() => {
    sidebar.destroy();
    document.body.removeChild(parent);
  });

  describe('Initialization', () => {
    test('creates sidebar element with correct structure', () => {
      const element = parent.querySelector('.sidebar');
      expect(element).toBeTruthy();
      expect(element?.classList.contains('glass-panel')).toBe(true);
    });

    test('has build-zone as default active section', () => {
      expect(sidebar.getActiveSection()).toBe('build-zone');
      const buildZoneBtn = parent.querySelector('[data-section="build-zone"]');
      expect(buildZoneBtn?.classList.contains('active')).toBe(true);
    });

    test('creates all navigation buttons', () => {
      const navButtons = parent.querySelectorAll('.nav-button');
      expect(navButtons.length).toBeGreaterThan(0);
      
      const sections = ['sector-view', 'build-zone', 'energy-grid', 'economy', 'heat-map', 'alerts'];
      sections.forEach((section) => {
        const btn = parent.querySelector(`[data-section="${section}"]`);
        expect(btn).toBeTruthy();
      });
    });
  });

  describe('toggleCollapse', () => {
    test('toggles collapsed state', () => {
      const element = parent.querySelector('.sidebar') as HTMLElement;
      expect(element.classList.contains('collapsed')).toBe(false);
      
      const collapseBtn = parent.querySelector('.collapse-toggle') as HTMLButtonElement;
      collapseBtn.click();
      
      expect(element.classList.contains('collapsed')).toBe(true);
    });

    test('updates chevron icon when collapsed', () => {
      const collapseBtn = parent.querySelector('.collapse-toggle') as HTMLButtonElement;
      const icon = collapseBtn.querySelector('.material-symbols-outlined') as HTMLElement;
      
      expect(icon.textContent).toBe('chevron_left');
      
      collapseBtn.click();
      
      expect(icon.textContent).toBe('chevron_right');
    });

    test('toggles back to expanded', () => {
      const element = parent.querySelector('.sidebar') as HTMLElement;
      const collapseBtn = parent.querySelector('.collapse-toggle') as HTMLButtonElement;
      
      collapseBtn.click();
      expect(element.classList.contains('collapsed')).toBe(true);
      
      collapseBtn.click();
      expect(element.classList.contains('collapsed')).toBe(false);
    });
  });

  describe('setActiveSection', () => {
    test('switches to different section', () => {
      sidebar.setSectionToggleCallback(() => {});
      
      const economyBtn = parent.querySelector('[data-section="economy"]') as HTMLElement;
      economyBtn.click();
      
      expect(sidebar.getActiveSection()).toBe('economy');
      expect(economyBtn.classList.contains('active')).toBe(true);
      
      const buildZoneBtn = parent.querySelector('[data-section="build-zone"]');
      expect(buildZoneBtn?.classList.contains('active')).toBe(false);
    });

    test('calls callback when section is activated', () => {
      let callbackSection = '';
      let callbackIsActive = false;
      
      sidebar.setSectionToggleCallback((section, isActive) => {
        callbackSection = section;
        callbackIsActive = isActive;
      });
      
      const economyBtn = parent.querySelector('[data-section="economy"]') as HTMLElement;
      economyBtn.click();
      
      expect(callbackSection).toBe('economy');
      expect(callbackIsActive).toBe(true);
    });

    test('calls callback for build-zone deactivation when switching to another section', () => {
      const callbacks: Array<{ section: string; isActive: boolean }> = [];
      
      sidebar.setSectionToggleCallback((section, isActive) => {
        callbacks.push({ section, isActive });
      });
      
      const economyBtn = parent.querySelector('[data-section="economy"]') as HTMLElement;
      economyBtn.click();
      
      // Should have two callbacks: economy activated, build-zone deactivated
      expect(callbacks.length).toBe(2);
      expect(callbacks.some(cb => cb.section === 'economy' && cb.isActive)).toBe(true);
      expect(callbacks.some(cb => cb.section === 'build-zone' && !cb.isActive)).toBe(true);
    });

    test('toggles build-zone off when clicking it while active', () => {
      const callbacks: Array<{ section: string; isActive: boolean }> = [];
      
      sidebar.setSectionToggleCallback((section, isActive) => {
        callbacks.push({ section, isActive });
      });
      
      const buildZoneBtn = parent.querySelector('[data-section="build-zone"]') as HTMLElement;
      buildZoneBtn.click(); // Click build-zone when it's already active
      
      expect(sidebar.getActiveSection()).toBe('sector-view');
      expect(buildZoneBtn.classList.contains('active')).toBe(false);
      
      // Should have callback for build-zone deactivation
      expect(callbacks.some(cb => cb.section === 'build-zone' && !cb.isActive)).toBe(true);
    });

    test('switches to sector-view when build-zone is toggled off', () => {
      const buildZoneBtn = parent.querySelector('[data-section="build-zone"]') as HTMLElement;
      const sectorViewBtn = parent.querySelector('[data-section="sector-view"]') as HTMLElement;
      
      buildZoneBtn.click(); // Toggle build-zone off
      
      expect(sidebar.getActiveSection()).toBe('sector-view');
      expect(sectorViewBtn.classList.contains('active')).toBe(true);
    });
  });

  describe('getActiveSection', () => {
    test('returns current active section', () => {
      expect(sidebar.getActiveSection()).toBe('build-zone');
      
      const economyBtn = parent.querySelector('[data-section="economy"]') as HTMLElement;
      economyBtn.click();
      
      expect(sidebar.getActiveSection()).toBe('economy');
    });
  });

  describe('setSectionToggleCallback', () => {
    test('sets callback function', () => {
      let callbackCalled = false;
      
      sidebar.setSectionToggleCallback(() => {
        callbackCalled = true;
      });
      
      const economyBtn = parent.querySelector('[data-section="economy"]') as HTMLElement;
      economyBtn.click();
      
      expect(callbackCalled).toBe(true);
    });

    test('replaces previous callback', () => {
      let firstCallbackCalled = false;
      let secondCallbackCalled = false;
      
      sidebar.setSectionToggleCallback(() => {
        firstCallbackCalled = true;
      });
      
      sidebar.setSectionToggleCallback(() => {
        secondCallbackCalled = true;
      });
      
      const economyBtn = parent.querySelector('[data-section="economy"]') as HTMLElement;
      economyBtn.click();
      
      expect(firstCallbackCalled).toBe(false);
      expect(secondCallbackCalled).toBe(true);
    });
  });

  describe('destroy', () => {
    test('removes element from DOM', () => {
      const element = parent.querySelector('.sidebar');
      expect(element).toBeTruthy();
      
      sidebar.destroy();
      
      expect(parent.querySelector('.sidebar')).toBeNull();
    });
  });
});
