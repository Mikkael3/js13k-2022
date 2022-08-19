import { GameLoop, Sprite, init, initPointer } from 'kontra';
import { human, kid } from './data';

import { BattleManager } from './battle-manager';
import { GameUi } from './game-ui';
import { Monster } from './types';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { generateMonsterSet } from './monster-generator';

const { canvas } = init();
initPointer();

const bgSprites = Array.from(Array(150).keys()).map((item) => {
  let color = 'darkslategray';
  if (item % 2) color = 'lightgray';
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

const monsterBox = new MonsterBox({
  x: 0,
  y: 0,
  width: 0.3,
  height: 0.05,
  monster: monsters[0],
  canvas,
});

monsterBox.render();

const monsterSprites = monsters.map((monster: Monster, index) => {
  const x = (canvas.width / 4) * (index + 1);
  const y = 10;

  return new MonsterC({
    x,
    y,
    dx: 0,
    monster,
  });
});

const player = new Player({
  x: canvas.width / 2,
  y: 110,
  monster: {
    level: 1,
    race: human,
    class: kid,
  },
});

const gameUi = new GameUi({
  x: 0,
  y: 1,
  canvas,
  height: 0.1,
  width: 1,
  monster: player.monsterData,
});
gameUi.render();

const battleManager = new BattleManager(player, monsterSprites, monsterBox, canvas);

const loop = GameLoop({
  blur: true,
  update: (dt) => {
    bgSprites.forEach((s) => s.update());
    player.update(dt);
    monsterSprites.forEach((s) => s.update(dt));
    gameUi.update();
    monsterBox.update();
  },
  render: () => {
    bgSprites.forEach((s) => s.render());
    player.render();
    monsterSprites.forEach((s) => {
      s.render();
    });
  },
});

loop.start();
