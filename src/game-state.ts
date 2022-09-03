import { buildClass, buildRace } from './types';
import { getCanvas, init, initPointer } from 'kontra';
import { human, kid } from './data';

import { BackGround } from './background-sprites';
import { BattleManager } from './battle-manager';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { UiElement } from './ui';
import { BattleLog } from './battle-log';

type GameStateI = {
  background: BackGround;
  monsterSprites: MonsterC[];
  player: Player;
  playerBox: MonsterBox;
  monsterBox: MonsterBox;
  battleManager: BattleManager;
  uiElements: UiElement[];
  battleLog: BattleLog;
};

export class GameState implements GameStateI {
  public background: BackGround;
  public monsterSprites: MonsterC[];
  public player: Player;
  public playerBox: MonsterBox;
  public monsterBox: MonsterBox;
  public battleManager: BattleManager;
  public uiElements: UiElement[];
  public battleLog: BattleLog;

  private static _instance: GameState;

  private constructor() {
    init();
    initPointer();
    this.background = new BackGround();
    this.monsterSprites = [];
    this.uiElements = [];
    this.battleLog = new BattleLog({
      x: 0,
      y: 0.45,
      height: 0.4,
      width: 0.3,
      canvas: getCanvas(),
      color: 'lightgray',
    });
    this.battleLog.render();
    this.player = new Player({
      x: 240,
      y: getCanvas().height / 1.5,
      monster: {
        level: 1,
        race: buildRace(human),
        class: buildClass(kid),
      },
    });

    this.playerBox = new MonsterBox({
      x: 0.7,
      y: 0.85,
      width: 0.3,
      height: 0.05,
      canvas: getCanvas(),
    });
    this.playerBox.setMonster(this.player);

    this.monsterBox = new MonsterBox({
      x: 0,
      y: 0,
      width: 0.3,
      height: 0.05,
      canvas: getCanvas(),
    });
    this.battleManager = new BattleManager(this.monsterBox, getCanvas());
  }

  public static get instance() {
    if (!this._instance) this._instance = new GameState();
    return this._instance;
  }
}

export default GameState.instance;
