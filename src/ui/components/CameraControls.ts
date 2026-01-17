export class CameraControls {
  private element: HTMLDivElement;
  private isExpanded = false;
  private onFocusLobby?: () => void;
  private onZoomIn?: () => void;
  private onZoomOut?: () => void;
  private onZoomReset?: () => void;
  private onZoomFit?: () => void;

  constructor(parent: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'camera-controls';
    
    this.element.innerHTML = `
      <button class="camera-controls-toggle" title="Camera Controls" aria-label="Camera Controls">
        <span class="material-symbols-outlined">center_focus_strong</span>
      </button>
      <div class="camera-controls-panel glass-panel" style="display: none;">
        <div class="camera-controls-header">
          <span class="camera-controls-title">VIEW CONTROLS</span>
          <button class="camera-controls-close" aria-label="Close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="camera-controls-body">
          <button class="camera-control-btn" data-action="focus-lobby">
            <span class="material-symbols-outlined">home</span>
            <span>Focus Lobby</span>
            <span class="camera-control-shortcut">Home</span>
          </button>
          <button class="camera-control-btn" data-action="zoom-in">
            <span class="material-symbols-outlined">zoom_in</span>
            <span>Zoom In</span>
            <span class="camera-control-shortcut">+</span>
          </button>
          <button class="camera-control-btn" data-action="zoom-out">
            <span class="material-symbols-outlined">zoom_out</span>
            <span>Zoom Out</span>
            <span class="camera-control-shortcut">-</span>
          </button>
          <button class="camera-control-btn" data-action="zoom-reset">
            <span class="material-symbols-outlined">fit_screen</span>
            <span>Reset Zoom</span>
            <span class="camera-control-shortcut">0</span>
          </button>
          <button class="camera-control-btn" data-action="zoom-fit">
            <span class="material-symbols-outlined">view_in_ar</span>
            <span>Fit Building</span>
            <span class="camera-control-shortcut">F</span>
          </button>
          <div class="camera-controls-hint">
            <span class="material-symbols-outlined">mouse</span>
            <span>Right-click drag or WASD/Arrow keys to pan</span>
          </div>
        </div>
      </div>
    `;

    parent.appendChild(this.element);

    // Setup event listeners
    const toggleBtn = this.element.querySelector('.camera-controls-toggle') as HTMLButtonElement;
    const closeBtn = this.element.querySelector('.camera-controls-close') as HTMLButtonElement;
    const controlBtns = this.element.querySelectorAll('.camera-control-btn');

    toggleBtn.addEventListener('click', () => {
      this.toggle();
    });

    closeBtn.addEventListener('click', () => {
      this.hide();
    });

    controlBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = (btn as HTMLElement).dataset.action;
        this.handleAction(action || '');
      });
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isExpanded && !this.element.contains(e.target as Node)) {
        this.hide();
      }
    });
  }

  private toggle(): void {
    this.isExpanded = !this.isExpanded;
    const panel = this.element.querySelector('.camera-controls-panel') as HTMLDivElement;
    panel.style.display = this.isExpanded ? 'block' : 'none';
  }

  private hide(): void {
    this.isExpanded = false;
    const panel = this.element.querySelector('.camera-controls-panel') as HTMLDivElement;
    panel.style.display = 'none';
  }

  private handleAction(action: string): void {
    switch (action) {
      case 'focus-lobby':
        if (this.onFocusLobby) this.onFocusLobby();
        break;
      case 'zoom-in':
        if (this.onZoomIn) this.onZoomIn();
        break;
      case 'zoom-out':
        if (this.onZoomOut) this.onZoomOut();
        break;
      case 'zoom-reset':
        if (this.onZoomReset) this.onZoomReset();
        break;
      case 'zoom-fit':
        if (this.onZoomFit) this.onZoomFit();
        break;
    }
  }

  setCallbacks(
    onFocusLobby?: () => void,
    onZoomIn?: () => void,
    onZoomOut?: () => void,
    onZoomReset?: () => void,
    onZoomFit?: () => void
  ): void {
    this.onFocusLobby = onFocusLobby;
    this.onZoomIn = onZoomIn;
    this.onZoomOut = onZoomOut;
    this.onZoomReset = onZoomReset;
    this.onZoomFit = onZoomFit;
  }

  destroy(): void {
    this.element.remove();
  }
}
