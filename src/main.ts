import { GameLoop, getCanvas } from 'kontra';
import { createMonsterSprites, generateMonsterSet } from './monster-generator';

import { GameState } from './game-state';
import { GameUi } from './game-ui';
import { initDefaultBackground } from './background-sprites';

const canvas = getCanvas();

initDefaultBackground();

const gameState = GameState.instance;

createMonsterSprites(generateMonsterSet());

const gameUi = new GameUi({
  x: 0,
  y: 0.9,
  canvas,
  height: 0.1,
  width: 1,
  monster: gameState.player.monsterData,
  battleManager: gameState.battleManager,
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
    gameState.uiElements.forEach((element) => element.update());
    gameUi.update();
    gameState.monsterBox.update();
    gameState.playerBox.update();
    gameState.battleLog.update();
    fitCanvas();
    if (gameState.monsterSprites.length === 0) {
      console.log('monsers len 0');
      createMonsterSprites(generateMonsterSet());
    }
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
