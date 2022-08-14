import { GameLoop, Sprite, init } from 'kontra';

init();

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

const loop = GameLoop({
  update: function () {
    sprites.forEach((s) => s.update());
    // if (sprite.x > canvas.width) {
    //   sprite.x = -sprite.width;
    // }
  },
  render: function () {
    sprites.forEach((s) => s.render());
  },
});

loop.start();
