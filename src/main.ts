import { GameLoop, Sprite, init } from 'kontra';

import { UiElement } from './ui';
import { generateMonsterSet } from './monster-generator';

const { canvas } = init();

const uiElement = new UiElement({
  x: 0,
  y: 0,
  canvas,
  height: 0.5,
  width: 0.5,
});

uiElement.render();

const sprites = Array.from(Array(150).keys()).map((item) => {
  let color = 'white';
  if (item % 2) color = 'black';
  return Sprite({
    x: (item * 16) % 240,
    y: Math.floor(item / 15) * 16,
    color,
    width: 16,
    height: 16,
    dx: 0,
  });
});

const monsters = generateMonsterSet();

console.log(monsters);

const loop = GameLoop({
  update: () => {
    uiElement.update();
    sprites.forEach((s) => s.update());
    // if (sprite.x > canvas.width) {
    //   sprite.x = -sprite.width;
    // }
  },
  render: () => {
    sprites.forEach((s) => s.render());
  },
});

loop.start();
