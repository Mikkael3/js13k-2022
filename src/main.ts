import { GameLoop } from 'kontra';
import { createMonsterSprites, generateMonsterSet } from './monster-generator';
import { GameState } from './game-state';
import { initDefaultBackground } from './background-sprites';

initDefaultBackground();

const gameState = GameState.instance;

createMonsterSprites(generateMonsterSet());

const loop = GameLoop({
  blur: true,
  update: (dt) => {
    gameState.update(dt);
  },
  render: () => {
    gameState.render();
  },
});

loop.start();
