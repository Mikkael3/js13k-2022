import { GameLoop, Sprite, init, randInt } from 'kontra';

import { UiElement } from './ui';

const { canvas } = init();

const uiElement = new UiElement({
  x: 0,
  y: 0,
  canvas,
  height: 0.5,
  width: 0.5,
});

// uiElement.render();

const sprites = Array.from(Array(150).keys()).map((item) => {
  let color = 'white';
  if (item % 2) color = 'green';
  if (item % 3) color = 'red';
  return Sprite({
    x: (item * 16) % 240,
    y: Math.floor(item / 15) * 16,
    color,
    width: 16,
    height: 16,
    dx: 0,
    randirx: 1,//randInt(-5, 5) + 0.5,
    randiry: 1,//randInt(-5, 5) + 0.5,
  });
});

let tick = 0;
const loop = GameLoop({
  update: () => {
    uiElement.update();
    sprites.forEach((sprite: Sprite) => {
      sprite.x += sprite.randirx;
      sprite.y += sprite.randiry;
      
      if (!randInt(0, 1000)) {
        sprite.randirx = randInt(-5,5) + 0.5;
        sprite.randiry = randInt(-5, 5) + 0.5;
      }
      tick++;
      if (sprite.x > canvas.width) {
        sprite.x = -sprite.width;
      }

      if (sprite.y > canvas.height) {
        sprite.y = -sprite.height;
      }
      sprite.update();

    })


  },
  render: () => {
    sprites.forEach((s) => s.render());
  },
});

loop.start();
