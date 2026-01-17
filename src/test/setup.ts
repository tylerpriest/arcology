// Mock phaser3spectorjs before Phaser tries to load it
// This must be done before any Phaser imports
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Module = require('module');
  const originalRequire = Module.prototype.require;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Module.prototype.require = function(id: string, ...args: unknown[]) {
    if (id === 'phaser3spectorjs') {
      return {}; // Return empty object for optional dependency
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return originalRequire.apply(this, [id, ...args] as any);
  };
} catch {
  // Module mocking not available, will try other approach
}

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
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
  configurable: true,
});

// Also set it directly for Phaser's checks
(global as any).window = mockWindow;

// Mock document with documentElement (required by Phaser)
// Note: We preserve jsdom's document but ensure Phaser-specific properties exist
// jsdom should already be available from vitest's jsdom environment
if (global.document) {
  // jsdom is available, just ensure Phaser-specific properties exist
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
  // onmousewheel is deprecated but Phaser may check for it
  // Use type assertion to avoid TypeScript error
  if (!(global.document.documentElement as any).onmousewheel) {
    Object.defineProperty(global.document.documentElement, 'onmousewheel', {
      value: null,
      writable: true,
    });
  }
  
  // Override createElement for canvas to return our mock (Phaser needs specific canvas behavior)
  const originalCreateElement = global.document.createElement.bind(global.document);
  global.document.createElement = function(tagName: string, options?: ElementCreationOptions) {
    if (tagName.toLowerCase() === 'canvas') {
      return new MockCanvas() as unknown as HTMLCanvasElement;
    }
    return originalCreateElement(tagName, options);
  };
} else {
  // Fallback if jsdom is not available (shouldn't happen with vitest jsdom environment)
  const mockDocumentElement = {
    ontouchstart: null,
    onwheel: null,
    onmousewheel: null,
  };

  // Type for elements with children property
  interface ElementWithChildren {
    children?: Node[];
    style: Record<string, unknown>;
    setAttribute: () => void;
    addEventListener: () => void;
    removeEventListener: () => void;
    appendChild: (child: Node) => Node;
    removeChild: (child: Node) => Node;
    querySelector: (selector: string) => Node | null;
    querySelectorAll: () => Node[];
    classList: {
      contains: () => boolean;
      add: () => void;
      remove: () => void;
    };
  }

  Object.defineProperty(global, 'document', {
    value: {
      createElement: (tag: string): HTMLElement => {
        if (tag === 'canvas') {
          return new MockCanvas() as unknown as HTMLCanvasElement;
        }
        const element: ElementWithChildren = {
          style: {},
          setAttribute: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          appendChild: function(child: Node) {
            if (!this.children) this.children = [];
            this.children.push(child);
            return child;
          },
          removeChild: function(child: Node) {
            if (this.children) {
              const index = this.children.indexOf(child);
              if (index > -1) this.children.splice(index, 1);
            }
            return child;
          },
          querySelector: function(_selector: string) {
            if (!this.children) return null;
            // Simple mock - just return first child if it matches
            return this.children[0] || null;
          },
          querySelectorAll: function() {
            return this.children || [];
          },
          classList: {
            contains: () => false,
            add: () => {},
            remove: () => {},
          },
        };
        return element as unknown as HTMLElement;
      },
      body: {
        appendChild: function(child: Node) {
          if (!this.children) this.children = [];
          this.children.push(child);
          return child;
        },
        removeChild: function(child: Node) {
          if (this.children) {
            const index = this.children.indexOf(child);
            if (index > -1) this.children.splice(index, 1);
          }
          return child;
        },
        children: [] as Node[],
      },
      getElementById: () => null,
      documentElement: mockDocumentElement,
    },
  });
}

// Mock navigator (required by Phaser for touch detection)
Object.defineProperty(global, 'navigator', {
  value: {
    maxTouchPoints: 0,
    msPointerEnabled: false,
    pointerEnabled: false,
    getGamepads: null,
  },
  writable: true,
  configurable: true,
});
