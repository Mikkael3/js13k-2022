import { GameLoop, init, initPointer } from 'kontra';
import { background, initDefaultBackground } from './background-sprites';
import { human, kid } from './data';

import { BattleManager } from './battle-manager';
import { GameUi } from './game-ui';
import { Monster } from './types';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { generateMonsterSet } from './monster-generator';
import { monsterSprites } from './monster-sprites';

const { canvas } = init();
initPointer();

const monsters = generateMonsterSet();

const monsterBox = new MonsterBox({
  x: 0,
  y: 0,
  width: 0.3,
  height: 0.05,
  canvas,
});

initDefaultBackground();

monsters.forEach((monster: Monster, index) => {
  const x = (canvas.width / 4) * (index + 1);
  const y = 10;

  monsterSprites.push(
    new MonsterC({
      x,
      y,
      dx: 0,
      monster,
    }),
  );
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

const battleManager = new BattleManager(player, monsterSprites, monsterBox, canvas);

const gameUi = new GameUi({
  x: 0,
  y: 0.9,
  canvas,
  height: 0.1,
  width: 1,
  monster: player.monsterData,
  battleManager,
});

const loop = GameLoop({
  blur: true,
  update: (dt) => {
    background.sprites.forEach((s) => s.update(dt));
    player.update(dt);
    monsterSprites.forEach((s) => s.update(dt));
    gameUi.update();
    monsterBox.update();
  },
  render: () => {
    background.sprites.forEach((s) => s.render());
    player.render();
    monsterSprites.forEach((s) => {
      s.render();
    });
  },
});

loop.start();
