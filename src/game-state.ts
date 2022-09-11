import { buildClass, buildRace } from './types';
import { createMonsterSprites, generateMonsterSet } from './monster-generator';
import { getCanvas, init, initPointer } from 'kontra';
import { human, kid } from './data';

import { BackGround } from './background-sprites';
import { BattleLog } from './battle-log';
import { BattleManager } from './battle-manager';
// import { createMonsterSprites, generateMonsterSet } from './monster-generator';
import { GameUi } from './game-ui';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { PlayerBox } from './player-box';
import { UiElement } from './ui';

type GameStateI = {
  background: BackGround;
  monsterSprites: MonsterC[];
  player: Player;
  playerBox: MonsterBox;
  monsterBox: MonsterBox;
  battleManager: BattleManager;
  uiElements: UiElement[];
  battleLog: BattleLog;
  gameUi: GameUi;
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
  public gameUi: GameUi;
  public showPlayer = false;
  public round = 0;
  public introEnded = false;

  private static _instance: GameState;

  private constructor() {
    init();
    const canvas = getCanvas();
    initPointer();
    this.background = new BackGround();
    this.monsterSprites = [];
    this.uiElements = [];
    this.battleLog = new BattleLog({
      x: 0,
      y: 0.45,
      height: 0.4,
      width: 0.3,
      canvas,
      color: 'lightgray',
    });
    this.battleLog.render();
    this.player = new Player({
      x: 240,
      y: canvas.height / 1.5,
      monster: {
        level: 1,
        race: buildRace(human),
        class: buildClass(kid),
      },
    });

    this.playerBox = new PlayerBox({
      x: 0.8,
      y: 0.7,
      width: 0.2,
      height: 0.06,
      canvas,
    });
    this.playerBox.setMonster(this.player);

    this.monsterBox = new MonsterBox({
      x: 0,
      y: 0,
      width: 0.2,
      height: 0.06,
      canvas,
    });
    this.battleManager = new BattleManager(this.monsterBox, canvas);
    this.gameUi = new GameUi({
      x: 0,
      y: 0.9,
      canvas,
      height: 0.1,
      width: 1,
      monster: this.player.monsterData,
      battleManager: this.battleManager,
    });
  }

  public static get instance() {
    if (!this._instance) this._instance = new GameState();
    return this._instance;
  }

  public update(dt: number) {
    this.background.update(dt);
    this.player?.update(dt);
    this.monsterSprites.forEach((s) => s.update(dt));
    this.uiElements.forEach((element) => element.update());
    this.gameUi.update();
    this.monsterBox.update();
    this.playerBox.update();
    this.battleLog.update();
    fitCanvas();
    if (this.monsterSprites.length === 0 && this.introEnded) {
      this.round++;
      createMonsterSprites(generateMonsterSet(this.round));
    }
  }

  public render() {
    this.background.render();
    if (this.showPlayer) {
      this.player?.render();
    }
    this.monsterSprites.forEach((s) => {
      s.render();
    });
  }

  /**
   * Remove ui elements
   */
  public unrenderUi() {
    this.playerBox.unrender();
    this.monsterBox.unrender();
    this.uiElements.forEach((element) => element.unrender());
    this.battleLog.unrender();
    this.gameUi.unrender();
  }

  /**
   * Add ui elements back
   */
  public renderUi() {
    this.playerBox.render();
    // this.monsterBox.render();
    this.uiElements.forEach((element) => element.render());
    this.battleLog.render();
    // this.gameUi.render();
  }
}

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

  getCanvas().style.width = width + 'px';
  getCanvas().style.height = height + 'px';
};

export default GameState.instance;
