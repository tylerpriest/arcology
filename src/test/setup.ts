// Mock phaser3spectorjs before Phaser tries to load it
// This must be done before any Phaser imports
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Module = require('module');
  const originalRequire = Module.prototype.require;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Module.prototype.require = function (id: string, ...args: unknown[]) {
    if (id === 'phaser3spectorjs') {
      return {}; // Return empty object for optional dependency
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return originalRequire.apply(this, [id, ...args] as any);
  };
} catch {
  // Module mocking not available, will try other approach
}

import { vi } from 'vitest';

// Mock browser APIs that Phaser needs
class MockCanvas {
  getContext() {
    return {
      fillRect: () => {},
      clearRect: () => {},
      drawImage: () => {},
      getImageData: () => ({ data: [] }),
      putImageData: () => {},
      createImageData: () => ({ data: [] }),
      setTransform: () => {},
      resetTransform: () => {},
      save: () => {},
      restore: () => {},
      scale: () => {},
      rotate: () => {},
      translate: () => {},
      transform: () => {},
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      bezierCurveTo: () => {},
      quadraticCurveTo: () => {},
      arc: () => {},
      arcTo: () => {},
      rect: () => {},
      fill: () => {},
      stroke: () => {},
      clip: () => {},
      isPointInPath: () => false,
      measureText: () => ({ width: 0 }),
      fillText: () => {},
      strokeText: () => {},
      createLinearGradient: () => ({
        addColorStop: () => {},
      }),
      createRadialGradient: () => ({
        addColorStop: () => {},
      }),
      createPattern: () => null,
    };
  }

  width = 800;
  height = 600;
  style = {};
  setAttribute() {}
  addEventListener() {}
  removeEventListener() {}
}

global.HTMLCanvasElement = MockCanvas as unknown as typeof HTMLCanvasElement;

// Mock requestAnimationFrame
global.requestAnimationFrame = ((cb: FrameRequestCallback) =>
  setTimeout(() => cb(Date.now()), 16)) as unknown as typeof requestAnimationFrame;
global.cancelAnimationFrame = clearTimeout as unknown as typeof cancelAnimationFrame;

// Mock window properties Phaser expects
const mockWindow = {
  addEventListener: () => {},
  removeEventListener: () => {},
  devicePixelRatio: 1,
  innerWidth: 1280,
  innerHeight: 720,
  ontouchstart: null,
  alert: vi.fn(),
  AudioContext: class {
    createOscillator() {
      return {
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { value: 0, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
        onended: null,
      };
    }
    createGain() {
      return {
        connect: vi.fn(),
        gain: {
          value: 0,
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
      };
    }
    destination = {};
    currentTime = 0;
    close() {
      return Promise.resolve();
    }
    decodeAudioData() {
      return Promise.resolve({});
    }
  },
  webkitAudioContext: class {
    createOscillator() {
      return {
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { value: 0, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
        onended: null,
      };
    }
    createGain() {
      return {
        connect: vi.fn(),
        gain: {
          value: 0,
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
      };
    }
    destination = {};
    currentTime = 0;
    close() {
      return Promise.resolve();
    }
    decodeAudioData() {
      return Promise.resolve({});
    }
  },
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
  configurable: true,
});

// Also set it directly for Phaser's checks
(global as any).window = mockWindow;

// Mock document with documentElement (required by Phaser)
if (global.document) {
  if (!global.document.documentElement.ontouchstart) {
    Object.defineProperty(global.document.documentElement, 'ontouchstart', {
      value: null,
      writable: true,
    });
  }
  if (!global.document.documentElement.onwheel) {
    Object.defineProperty(global.document.documentElement, 'onwheel', {
      value: null,
      writable: true,
    });
  }
  if (!(global.document.documentElement as any).onmousewheel) {
    Object.defineProperty(global.document.documentElement, 'onmousewheel', {
      value: null,
      writable: true,
    });
  }

  const originalCreateElement = global.document.createElement.bind(global.document);
  global.document.createElement = function (tagName: string, options?: ElementCreationOptions) {
    if (tagName.toLowerCase() === 'canvas') {
      return new MockCanvas() as unknown as HTMLCanvasElement;
    }
    return originalCreateElement(tagName, options);
  };
}

// Mock navigator
Object.defineProperty(global, 'navigator', {
  value: {
    maxTouchPoints: 0,
    msPointerEnabled: false,
    pointerEnabled: false,
    getGamepads: () => [],
  },
  writable: true,
  configurable: true,
});

// Mock Phaser completely to avoid issues with missing methods
vi.mock('phaser', () => {
  // Real EventEmitter for proper event handling in tests
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class EventEmitter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private listeners: { [key: string]: Array<(...args: any[]) => void> } = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event: string, callback: (...args: any[]) => void) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
      return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(event: string, callback: (...args: any[]) => void) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
      }
      return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once(event: string, callback: (...args: any[]) => void) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrappedCallback = (...args: any[]) => {
        callback(...args);
        this.off(event, wrappedCallback);
      };
      return this.on(event, wrappedCallback);
    }

    emit(event: string, ...args: any[]) {
      if (this.listeners[event]) {
        this.listeners[event].forEach((callback) => callback(...args));
      }
      return this;
    }

    removeAllListeners(event?: string) {
      if (event) {
        delete this.listeners[event];
      } else {
        this.listeners = {};
      }
      return this;
    }
  }

  const mockGraphics = () => {
    const graphics: any = {
      clear: vi.fn(() => graphics),
      fillStyle: vi.fn(() => graphics),
      lineStyle: vi.fn(() => graphics),
      fillRect: vi.fn(() => graphics),
      strokeRect: vi.fn(() => graphics),
      fillCircle: vi.fn(() => graphics),
      strokeCircle: vi.fn(() => graphics),
      fillRoundedRect: vi.fn(() => graphics),
      strokeRoundedRect: vi.fn(() => graphics),
      lineBetween: vi.fn(() => graphics),
      setDepth: vi.fn(() => graphics),
      setBlendMode: vi.fn(() => graphics),
      setAlpha: vi.fn(() => graphics),
      setPosition: vi.fn(() => graphics),
      setVisible: vi.fn(() => graphics),
      setScrollFactor: vi.fn(() => graphics),
      setOrigin: vi.fn(() => graphics),
      setScale: vi.fn(() => graphics),
      setRotation: vi.fn(() => graphics),
      setTint: vi.fn(() => graphics),
      setInteractive: vi.fn(() => graphics),
      on: vi.fn(() => graphics),
      off: vi.fn(() => graphics),
      once: vi.fn(() => graphics),
      destroy: vi.fn(),
    };
    return graphics;
  };

  const mockText = () => {
    const text: any = {
      setText: vi.fn(() => text),
      setPosition: vi.fn(() => text),
      setOrigin: vi.fn(() => text),
      setAlpha: vi.fn(() => text),
      setDepth: vi.fn(() => text),
      setColor: vi.fn(() => text),
      setFontSize: vi.fn(() => text),
      setFontStyle: vi.fn(() => text),
      setVisible: vi.fn(() => text),
      destroy: vi.fn(),
      x: 0,
      y: 0,
      text: '',
    };
    return text;
  };

  class MockScene {
    add = {
      graphics: mockGraphics,
      text: mockText,
    };
    registry = {
      get: vi.fn(),
      set: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
    };
    events = {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    };
    cameras = {
      main: {
        setBounds: vi.fn(),
        setZoom: vi.fn(),
        pan: vi.fn(),
        zoomTo: vi.fn(),
        scrollX: 0,
        scrollY: 0,
        zoom: 1,
      },
    };
    time = {
      addEvent: vi.fn(),
    };
    input = {
      on: vi.fn(),
      keyboard: {
        addKey: vi.fn(() => ({ on: vi.fn() })),
        on: vi.fn(),
      },
    };
  }

  return {
    default: {
      Math: {
        Clamp: (v: number, min: number, max: number) => Math.min(Math.max(v, min), max),
      },
      Events: {
        EventEmitter: EventEmitter,
      },
      GameObjects: {
        Graphics: class {},
        Text: class {},
      },
      Scene: MockScene,
      BlendModes: {
        ADD: 1,
        MULTIPLY: 2,
        SCREEN: 3,
      },
      Input: {
        Keyboard: {
          KeyCodes: {
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            Q: 81,
            ESC: 27,
            DELETE: 46,
            HOME: 36,
            PLUS: 187,
            MINUS: 189,
            ZERO: 48,
            F: 70,
            W: 87,
            A: 65,
            S: 83,
            D: 68,
            UP: 38,
            LEFT: 37,
            DOWN: 40,
            RIGHT: 39,
            SPACE: 32,
          },
        },
      },
    },
    Events: {
      EventEmitter: EventEmitter,
    },
    BlendModes: {
      ADD: 1,
      MULTIPLY: 2,
      SCREEN: 3,
    },
    Input: {
      Keyboard: {
        KeyCodes: {
          ONE: 49,
          TWO: 50,
          THREE: 51,
          FOUR: 52,
          FIVE: 53,
          SIX: 54,
          SEVEN: 55,
          Q: 81,
          ESC: 27,
          DELETE: 46,
          HOME: 36,
          PLUS: 187,
          MINUS: 189,
          ZERO: 48,
          F: 70,
          W: 87,
          A: 65,
          S: 83,
          D: 68,
          UP: 38,
          LEFT: 37,
          DOWN: 40,
          RIGHT: 39,
          SPACE: 32,
        },
      },
    },
    Scene: MockScene,
  };
});
