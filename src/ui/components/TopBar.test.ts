import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  let parent: HTMLElement;
  let topBar: TopBar;

  beforeEach(() => {
    parent = document.createElement('div');
    document.body.appendChild(parent);
    topBar = new TopBar(parent);
  });

  afterEach(() => {
    topBar.destroy();
    document.body.removeChild(parent);
  });

  describe('Initialization', () => {
    test('creates top bar element with correct structure', () => {
      const element = parent.querySelector('.top-bar');
      expect(element).toBeTruthy();
      expect(element?.classList.contains('glass-panel')).toBe(true);
    });

    test('displays initial values', () => {
      const moneyValue = parent.querySelector('[data-stat="money"]');
      const foodValue = parent.querySelector('[data-stat="food"]');
      const populationValue = parent.querySelector('[data-stat="population"]');
      
      expect(moneyValue?.textContent).toBe('20,000 CR');
      expect(foodValue?.textContent).toBe('Rations: 0');
      expect(populationValue?.textContent).toBe('Residents: 0');
    });

    test('has clickable credits stat', () => {
      const moneyStat = parent.querySelector('.stat.money') as HTMLElement;
      expect(moneyStat.style.cursor).toBe('pointer');
      expect(moneyStat.title).toBe('Click to view economy breakdown');
    });
  });

  describe('updateMoney', () => {
    test('updates money value with formatting', () => {
      topBar.updateMoney(50000);
      const moneyValue = parent.querySelector('[data-stat="money"]');
      expect(moneyValue?.textContent).toBe('50,000 CR');
    });

    test('formats large numbers with commas', () => {
      topBar.updateMoney(1234567);
      const moneyValue = parent.querySelector('[data-stat="money"]');
      expect(moneyValue?.textContent).toBe('1,234,567 CR');
    });

    test('applies negative color when value is negative', () => {
      topBar.updateMoney(-1000);
      const moneyStat = parent.querySelector('.stat.money') as HTMLElement;
      expect(moneyStat.style.getPropertyValue('--stat-color')).toBe('#e44a8a');
    });

    test('removes negative color when value is positive', () => {
      topBar.updateMoney(-1000);
      topBar.updateMoney(1000);
      const moneyStat = parent.querySelector('.stat.money') as HTMLElement;
      expect(moneyStat.style.getPropertyValue('--stat-color')).toBe('');
    });
  });

  describe('updateFood', () => {
    test('updates food value with floor', () => {
      topBar.updateFood(42.7);
      const foodValue = parent.querySelector('[data-stat="food"]');
      expect(foodValue?.textContent).toBe('Rations: 42');
    });

    test('handles zero food', () => {
      topBar.updateFood(0);
      const foodValue = parent.querySelector('[data-stat="food"]');
      expect(foodValue?.textContent).toBe('Rations: 0');
    });
  });

  describe('updatePopulation', () => {
    test('updates population value', () => {
      topBar.updatePopulation(150);
      const populationValue = parent.querySelector('[data-stat="population"]');
      expect(populationValue?.textContent).toBe('Residents: 150');
    });

    test('handles zero population', () => {
      topBar.updatePopulation(0);
      const populationValue = parent.querySelector('[data-stat="population"]');
      expect(populationValue?.textContent).toBe('Residents: 0');
    });
  });

  describe('updateStars', () => {
    test('displays correct number of stars', () => {
      topBar.updateStars(3);
      const starsValue = parent.querySelector('[data-stat="stars"]');
      expect(starsValue?.textContent).toBe('⭐⭐⭐');
    });

    test('caps stars at 5', () => {
      topBar.updateStars(10);
      const starsValue = parent.querySelector('[data-stat="stars"]');
      expect(starsValue?.textContent).toBe('⭐⭐⭐⭐⭐');
    });

    test('displays dash for zero stars', () => {
      topBar.updateStars(0);
      const starsValue = parent.querySelector('[data-stat="stars"]');
      expect(starsValue?.textContent).toBe('—');
    });
  });

  describe('updateSatisfaction', () => {
    test('updates satisfaction value with rounding', () => {
      topBar.updateSatisfaction(75.7);
      const satisfactionValue = parent.querySelector('[data-stat="satisfaction"]');
      expect(satisfactionValue?.textContent).toBe('76/100');
    });

    test('displays dash for undefined satisfaction', () => {
      topBar.updateSatisfaction(undefined);
      const satisfactionValue = parent.querySelector('[data-stat="satisfaction"]');
      expect(satisfactionValue?.textContent).toBe('—');
    });

    test('displays dash for NaN satisfaction', () => {
      topBar.updateSatisfaction(NaN);
      const satisfactionValue = parent.querySelector('[data-stat="satisfaction"]');
      expect(satisfactionValue?.textContent).toBe('—');
    });

    test('applies green color for satisfaction >= 80', () => {
      topBar.updateSatisfaction(85);
      const satisfactionStat = parent.querySelector('.stat.satisfaction') as HTMLElement;
      expect(satisfactionStat.style.getPropertyValue('--stat-color')).toBe('var(--green)');
    });

    test('applies cyan color for satisfaction >= 60 and < 80', () => {
      topBar.updateSatisfaction(70);
      const satisfactionStat = parent.querySelector('.stat.satisfaction') as HTMLElement;
      expect(satisfactionStat.style.getPropertyValue('--stat-color')).toBe('var(--cyan)');
    });

    test('applies amber color for satisfaction >= 40 and < 60', () => {
      topBar.updateSatisfaction(50);
      const satisfactionStat = parent.querySelector('.stat.satisfaction') as HTMLElement;
      expect(satisfactionStat.style.getPropertyValue('--stat-color')).toBe('var(--amber)');
    });

    test('applies magenta color for satisfaction < 40', () => {
      topBar.updateSatisfaction(30);
      const satisfactionStat = parent.querySelector('.stat.satisfaction') as HTMLElement;
      expect(satisfactionStat.style.getPropertyValue('--stat-color')).toBe('var(--magenta)');
    });
  });

  describe('updateDay', () => {
    test('updates day value', () => {
      topBar.updateDay(5);
      const dayValue = parent.querySelector('[data-stat="day"]');
      expect(dayValue?.textContent).toBe('Cycle 5');
    });
  });

  describe('updateTime', () => {
    test('formats AM time correctly', () => {
      topBar.updateTime(6.5); // 6:30 AM
      const timeValue = parent.querySelector('[data-stat="time"]');
      expect(timeValue?.textContent).toBe('6:30 AM');
    });

    test('formats PM time correctly', () => {
      topBar.updateTime(14.25); // 2:15 PM
      const timeValue = parent.querySelector('[data-stat="time"]');
      expect(timeValue?.textContent).toBe('2:15 PM');
    });

    test('handles noon correctly', () => {
      topBar.updateTime(12.0); // 12:00 PM
      const timeValue = parent.querySelector('[data-stat="time"]');
      expect(timeValue?.textContent).toBe('12:00 PM');
    });

    test('handles midnight correctly', () => {
      topBar.updateTime(0.0); // 12:00 AM
      const timeValue = parent.querySelector('[data-stat="time"]');
      expect(timeValue?.textContent).toBe('12:00 AM');
    });

    test('pads minutes with zero', () => {
      topBar.updateTime(9.05); // 9:05 AM
      const timeValue = parent.querySelector('[data-stat="time"]');
      expect(timeValue?.textContent).toBe('9:05 AM');
    });
  });

  describe('onCreditsClick', () => {
    test('calls callback when credits stat is clicked', () => {
      let callbackCalled = false;
      topBar.setOnCreditsClick(() => {
        callbackCalled = true;
      });

      const moneyStat = parent.querySelector('.stat.money') as HTMLElement;
      moneyStat.click();

      expect(callbackCalled).toBe(true);
    });

    test('does not call callback if not set', () => {
      const moneyStat = parent.querySelector('.stat.money') as HTMLElement;
      expect(() => moneyStat.click()).not.toThrow();
    });
  });

  describe('destroy', () => {
    test('removes element from DOM', () => {
      const element = parent.querySelector('.top-bar');
      expect(element).toBeTruthy();
      
      topBar.destroy();
      
      expect(parent.querySelector('.top-bar')).toBeNull();
    });
  });
});
