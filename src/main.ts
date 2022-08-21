import { GameLoop, init, initPointer } from 'kontra';
import { human, kid } from './data';

import { BattleManager } from './battle-manager';
import { CanvasUtils } from './canvas-utils';
import { GameUi } from './game-ui';
import { Monster } from './types';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { gameState } from './game-state';
import { generateMonsterSet } from './monster-generator';
import { initDefaultBackground } from './background-sprites';

const { canvas } = init();

export const canvasUtils = new CanvasUtils(canvas);

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
  //relative to canvas 0-1
  const x = 0.33 * (index + 0.15);
  const y = 0.1;

  gameState.monsterSprites.push(
    new MonsterC({
      x,
      y,
      dx: 0,
      monster,
    }),
  );
});

const player = new Player({
  x: 0.5,
  y: 11 / 16,
  monster: {
    level: 1,
    race: human,
    class: kid,
  },
});

gameState.monsterSprites.push(player);

const battleManager = new BattleManager(player, gameState.monsterSprites, monsterBox, canvas);

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
    gameState.backgroundSprites.forEach((s) => s.update(dt));
    gameState.monsterSprites.forEach((s) => s.update(dt));
    gameUi.update();
    monsterBox.update();
    canvasUtils.fitCanvas();
  },
  render: () => {
    gameState.backgroundSprites.forEach((s) => s.render());
    player.render();
    gameState.monsterSprites.forEach((s) => {
      s.render();
    });
  },
});

loop.start();
