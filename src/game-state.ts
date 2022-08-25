import { MonsterC } from './monster';
import { BackGround } from './background-sprites';

type GameState = {
  background: BackGround;
  monsterSprites: MonsterC[];
  player?: MonsterC;
};

export const gameState: GameState = {
  background: new BackGround(),
  monsterSprites: [],
};
