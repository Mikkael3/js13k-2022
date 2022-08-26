import { human, kid } from './data';

import { BackGround } from './background-sprites';
import { MonsterC } from './monster';
import { Player } from './player';

type GameStateI = {
  background: BackGround;
  monsterSprites: MonsterC[];
  player: Player;
};

export class GameState implements GameStateI {
  public background: BackGround;
  public monsterSprites: MonsterC[];
  public player: Player;

  private static _instance: GameState;

  private constructor() {
    this.background = new BackGround();
    this.monsterSprites = [];
    this.player = new Player({
      x: 240,
      y: 110,
      monster: {
        level: 1,
        race: human,
        class: kid,
      },
    });
  }

  public static get instance() {
    if (!this._instance) this._instance = new GameState();
    return this._instance;
  }
}
