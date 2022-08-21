import { gameState } from './game-state';

export class CanvasUtils {
  aspectRatio = 1.5; //3/2

  width = 0;

  constructor(public canvas: HTMLCanvasElement) {}

  fitCanvas() {
    let width = innerWidth;
    let height = innerHeight;

    const maxHeight = innerHeight;
    const maxWidth = innerWidth;

    if (maxHeight * this.aspectRatio < maxWidth) {
      height = maxHeight;
      width = maxHeight * this.aspectRatio;
    } else {
      height = maxWidth / this.aspectRatio;
    }

    if (this.width === width) return;

    this.width = width;

    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    this.canvas.width = width;
    this.canvas.height = height;

    gameState.monsterSprites.forEach((sprite) => sprite.recalculateCanvas());
    gameState.backgroundSprites.forEach((sprite) => {
      sprite.recalculateCanvas();
    });
  }
}
