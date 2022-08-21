import { GameSprite } from './sprite';
import { MonsterC } from './monster';

type GameState = {
  backgroundSprites: GameSprite[];
  monsterSprites: MonsterC[];
};

export const gameState: GameState = {
  backgroundSprites: [],
  monsterSprites: [],
};
