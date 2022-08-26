import { GameObjectClass, Sprite, randInt } from 'kontra';

import GameState from './game-state';

export const initDefaultBackground = () => {
  const sky = Sprite({
    x: 0,
    y: 0,
    color: '#38205c',
    width: 280,
    height: 64,
    dx: 0,
  });

  const ground = Sprite({
    x: 0,
    y: 64,
    color: 'darkslategrey',
    width: 280,
    height: 96,
    dx: 0,
  });

  const path = Sprite({
    x: 100,
    y: 64,
    color: '#BC815F',
    width: 40,
    height: 96,
    dx: 0,
  });

  const moon = Sprite({
    x: 120,
    y: 0,
    color: '#FEFCD7',
    radius: 40,
    dx: 0,
    render: function () {
      if (!this.context || !this.color) return;
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x ?? 0, this.y ?? 0, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    },
  });

  const stars = Array.from(Array(12).keys()).map(() => {
    return Sprite({
      x: randInt(0, 100),
      y: randInt(0, 30),
      color: '#FEFCD7',
      radius: randInt(0, 4),
      dx: 0,
      render: function () {
        if (!this.context || !this.color) return;
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x ?? 0, this.y ?? 0, this.radius, 0, 2 * Math.PI);
        this.context.fill();
      },
      update(dt?) {
        if (this.radius !== 0) this.radius += dt;
        if (this.radius > 3) {
          this.radius = 0;
          setTimeout(() => {
            this.radius = dt;
          }, 1000);
        }
      },
    });
  });

  const backGround = new BackGround({
    scaleX: 2,
    scaleY: 2,
  });
  backGround.addChild(sky);
  backGround.addChild(ground);
  backGround.addChild(path);
  backGround.addChild(moon);
  stars.forEach((star) => backGround.addChild(star));
  GameState.background = backGround;
};

export class BackGround extends GameObjectClass {}
