import { MonsterC } from './monster';
import { Sprite } from 'kontra';

type GameState = {
  backgroundSprites: Sprite[];
  monsterSprites: MonsterC[];
  player?: MonsterC;
};

export const gameState: GameState = {
  backgroundSprites: [],
  monsterSprites: [],
};
