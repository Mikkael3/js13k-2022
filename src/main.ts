import { GameLoop, init, initPointer } from 'kontra';
import { human, kid } from './data';

import { BattleManager } from './battle-manager';
import { GameUi } from './game-ui';
import { Monster } from './types';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { gameState } from './game-state';
import { generateMonsterSet } from './monster-generator';
import { initDefaultBackground } from './background-sprites';

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

  gameState.monsterSprites.push(
    new MonsterC({
      x,
      y,
      dx: 0,
      monster,
    }),
  );
});

gameState.player = new Player({
  x: canvas.width / 2,
  y: 110,
  monster: {
    level: 1,
    race: human,
    class: kid,
  },
});

const battleManager = new BattleManager(monsterBox, canvas);

const gameUi = new GameUi({
  x: 0,
  y: 0.9,
  canvas,
  height: 0.1,
  width: 1,
  monster: gameState.player.monsterData,
  battleManager,
});

const fitCanvas = () => {
  let width = innerWidth;
  let height = innerHeight;

  const maxHeight = innerHeight;
  const maxWidth = innerWidth;
  const aspectRatio = 3 / 2;

  if (maxHeight * aspectRatio < maxWidth) {
    height = maxHeight;
    width = maxHeight * aspectRatio;
  } else {
    height = maxWidth / aspectRatio;
  }

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
};

const loop = GameLoop({
  blur: true,
  update: (dt) => {
    gameState.background.update(dt);
    gameState.player?.update(dt);
    gameState.monsterSprites.forEach((s) => s.update(dt));
    gameUi.update();
    monsterBox.update();
    fitCanvas();
  },
  render: () => {
    gameState.background.render();
    gameState.player?.render();
    gameState.monsterSprites.forEach((s) => {
      s.render();
    });
  },
});

loop.start();
