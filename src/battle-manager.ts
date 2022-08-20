import { Dialog } from './dialog';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Player } from './player';
import { UiElement } from './ui';
import { monsterSprites } from './monster-sprites';

export class BattleManager {
  canvas: HTMLCanvasElement;
  player: Player;
  monsterOpponent?: MonsterC = undefined;
  monsters: MonsterC[];
  monsterBox: MonsterBox;

  constructor(
    player: Player,
    monsters: MonsterC[],
    monsterBox: MonsterBox,
    canvas: HTMLCanvasElement,
  ) {
    this.canvas = canvas;
    this.player = player;
    this.monsters = monsters;
    this.monsterBox = monsterBox;
    monsters.forEach((monster) => {
      monster.handler = () => this.selectForBattle(monster);
    });
  }

  selectForBattle(monster: MonsterC) {
    this.monsterOpponent = monster;
    monster.x = this.canvas.width / 2 - monster.width / 2;
    monster.y = this.canvas.height / 2 - monster.height / 2;
    monster.resetAnimation();
    this.monsters.forEach((monster) => {
      if (monster === this.monsterOpponent) {
        return;
      }
      // Move battling monster to middle
      monster.y = -monster.height / 2;
    });

    // Set ui to show monster stats
    this.monsterBox.setMonster(monster.monsterData);
  }

  getMonsterOpponent() {
    return this.monsterOpponent;
  }

  killCurrentMonster() {
    if (!this.monsterOpponent) return;
    monsterSprites.splice(
      monsterSprites.findIndex((m) => {
        return m === this.monsterOpponent;
      }),
      1,
    );
    const options = [
      {
        title: this.player.monsterData.class.name,
        handler: (e: UiElement) => () => {
          if (this.monsterOpponent) {
            this.player.monsterData = {
              ...this.monsterOpponent.monsterData,
              class: this.player.monsterData.class,
            };
            this.monsterOpponent = undefined;
            this.monsterBox.setMonster(undefined);
            e.unrender();
          }
        },
      },
      {
        title: this.monsterOpponent.monsterData.class.name,
        handler: (e: UiElement) => () => {
          if (this.monsterOpponent) {
            this.player.monsterData = this.monsterOpponent.monsterData;
            this.monsterOpponent = undefined;
            this.monsterBox.setMonster(undefined);
            e.unrender();
          }
        },
      },
    ];
    const dialog = new Dialog({
      options,
      text: 'Choose Class:',
      x: 0.2,
      y: 0.2,
      width: 0.6,
      height: 0.6,
      canvas: this.monsterBox.canvas,
    });
    dialog.render();
  }
}
