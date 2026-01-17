import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Show loading progress
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add
      .text(width / 2, height / 2 - 50, 'Loading...', {
        fontSize: '20px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x4a9eff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Load assets here
    // this.load.image('tileset', 'assets/tileset.png');
    // this.load.spritesheet('resident', 'assets/resident.png', { frameWidth: 16, frameHeight: 32 });
    
    // Audio assets will be loaded here when audio files are added
    // For MVP, AudioSystem uses programmatically generated sounds
    // Example:
    // this.load.audio('ui_click', 'assets/audio/ui_click.mp3');
    // this.load.audio('place_success', 'assets/audio/place_success.mp3');
    // this.load.audio('money_gain', 'assets/audio/money_gain.mp3');
    // this.load.audio('elevator_bell', 'assets/audio/elevator_bell.mp3');
  }

  create(): void {
    this.scene.start('MainMenuScene');
  }
}
