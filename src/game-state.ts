import { createMonsterSprites, generateMonsterSet } from './monster-generator';
import { getCanvas, init, initPointer } from 'kontra';

import { BackGround } from './background-sprites';
import { BattleLog } from './battle-log';
import { BattleManager } from './battle-manager';
// import { createMonsterSprites, generateMonsterSet } from './monster-generator';
import { GameUi } from './game-ui';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { PlayerBox } from './player-box';
import { StoryBox } from './story-box';
import { UiElement } from './ui';
import { starterGoblin } from './data';

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
  public monsterSprites!: MonsterC[];
  public player!: Player;
  public playerBox!: MonsterBox;
  public monsterBox!: MonsterBox;
  public battleManager!: BattleManager;
  public uiElements!: UiElement[];
  public battleLog!: BattleLog;
  public gameUi!: GameUi;
  public showPlayer = false;
  public round = 0;
  public introEnded = false;
  public storyBox!: StoryBox;

  private static _instance: GameState;

  private constructor() {
    init();
    initPointer();
    this.background = new BackGround();
    this.restartRounds();
    this.storyBox.render();
  }

  public static get instance() {
    if (!this._instance) this._instance = new GameState();
    return this._instance;
  }

  restartRounds() {
    this.round = 0;
    const canvas = getCanvas();
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
      monster: starterGoblin,
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
    this.gameUi.unrender();
    this.gameUi = new GameUi({
      x: 0,
      y: 0.9,
      canvas,
      height: 0.1,
      width: 1,
      monster: this.player.monsterData,
      battleManager: this.battleManager,
    });
    this.storyBox = new StoryBox({
      x: 0.6,
      y: 0,
      width: 0.4,
      height: 0.166,
      color: 'black',
      canvas: getCanvas(),
    });
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
    if (!this.introEnded) this.storyBox.update();
    fitCanvas();
    if (!this.introEnded) return;
    if (this.monsterSprites.length === 0) {
      this.round++;
      if (this.round < 4) {
        createMonsterSprites(generateMonsterSet(this.round));
      } else if (this.round === 4) {
        // story``
        // TODO pitaskohan tan olla no-op
        // Round 4:
        // - Show story box
        // - "My home is just over yonder. Let's pay my pal Rex a visit."
        // - spawn 3 normal monsters
        // laita tama storyyn: createMonsterSprites(generateMonsterSet(this.round));
      }
      // TODO tanne eri roundien handlaus

      // Round 5:
      // - "Hi old pal."
      //" - Who the fuck are you?"
      // - "You left me to die but I was saved. I think you'll need saving as well."
      // - "Seems I'll need to shut up your mad ramblings."
      // - spawn goblin warlord
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
