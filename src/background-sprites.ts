import { getCanvas, randInt } from 'kontra';

import { GameSprite } from './sprite';
import { gameState } from './game-state';

export const initDefaultBackground = () => {
  const sky = new GameSprite({
    x: 0,
    y: 0,
    color: '#38205c',
    width: 1,
    height: 64 / 160,
  });

  const ground = new GameSprite({
    x: 0,
    y: 64 / 160,
    color: 'darkslategrey',
    width: 1,
    height: 96 / 160,
  });

  const path = new GameSprite({
    x: 100 / 240,
    y: 64 / 160,
    color: '#BC815F',
    width: 40 / 240,
    height: 96 / 160,
  });

  const moon = new GameSprite({
    x: 0.5,
    y: 0,
    color: '#FEFCD7',
    radius: 40 / 240,
    render: function () {
      if (!this.context || !this.color) return;
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x ?? 0, this.y ?? 0, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    },
  });

  const stars = Array.from(Array(12).keys()).map(() => {
    return new GameSprite({
      x: randInt(0, 100) / 240,
      y: randInt(0, 30) / 160,
      color: '#FEFCD7',
      radius: randInt(0, 4),
      render: function () {
        if (!this.context || !this.color) return;
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x ?? 0, this.y ?? 0, this.radius, 0, 2 * Math.PI);
        this.context.fill();
      },
      update(dt?) {
        if (this.radius !== 0) this.radius += dt;
        if (this.radius > getCanvas().width / 100) {
          this.radius = 0;
          setTimeout(() => {
            this.radius = dt;
          }, 1000);
        }
      },
    });
  });

  gameState.backgroundSprites.push(sky);
  gameState.backgroundSprites.push(ground);
  gameState.backgroundSprites.push(path);
  gameState.backgroundSprites.push(moon);
  gameState.backgroundSprites = [...gameState.backgroundSprites, ...stars];
};
