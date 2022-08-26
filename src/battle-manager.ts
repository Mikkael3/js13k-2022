import { Dialog } from './dialog';
import { GameState } from './game-state';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Skill } from './types';
import { UiElement } from './ui';
import {GameUi} from "./game-ui";

export class BattleManager {
  canvas: HTMLCanvasElement;
  monsterOpponent?: MonsterC = undefined;
  monsterBox: MonsterBox;
  classChooseDialogOpen = false;

  constructor(monsterBox: MonsterBox, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.monsterBox = monsterBox;
    GameState.instance.monsterSprites.forEach((monster) => {
      monster.handler = () => this.selectForBattle(monster);
    });
  }

  selectForBattle(monster: MonsterC) {
    this.monsterOpponent = monster;
    monster.x = this.canvas.width / 2 - monster.width / 2;
    monster.y = this.canvas.height / 2 - monster.height / 2;
    monster.resetAnimation();
    GameState.instance.monsterSprites.forEach((monster) => {
      if (monster === this.monsterOpponent) {
        return;
      }

      monster.display = false;
    });

    // Set ui to show monster stats
    this.monsterBox.setMonster(monster);
  }

  getMonsterOpponent() {
    return this.monsterOpponent;
  }

  // Skill button clicked
  useSkill(skill: Skill, gameUi: GameUi) {
    if (!this.monsterOpponent) return;
    gameUi.unrender();
    this.monsterOpponent.hp -= skill.dmg;
    this.monsterBox.setMonster(this.monsterOpponent);
    if (this.monsterOpponent.hp <= 0) {
      this.killMonster();
      if (!this.classChooseDialogOpen) {
        this.showChooseClassDialog();
        this.classChooseDialogOpen = true;
      }
      return;
    }
    setTimeout(() => {
      gameUi.render();
    }, 1000);
  }

  private killMonster() {
    const gameState = GameState.instance;
    const index = gameState.monsterSprites.findIndex((m) => {
      return m === this.monsterOpponent;
    });
    if (index < 0) return;
    gameState.monsterSprites.splice(index, 1);
  }

  private showChooseClassDialog() {
    const { player } = GameState.instance;
    if (!this.monsterOpponent || !player) return;
    const options = [
      {
        title: player.monsterData.class.name,
        handler: (e: UiElement) => () => {
          if (this.monsterOpponent) {
            player.monsterData = {
              ...this.monsterOpponent.monsterData,
              class: player.monsterData.class,
            };
            this.monsterOpponent = undefined;
            this.monsterBox.setMonster(undefined);
            this.classChooseDialogOpen = false;
            e.unrender();
            // Show other monsters again
            GameState.instance.monsterSprites.forEach((monster) => (monster.display = true));
          }
        },
      },
      {
        title: this.monsterOpponent.monsterData.class.name,
        handler: (e: UiElement) => () => {
          if (this.monsterOpponent) {
            player.monsterData = this.monsterOpponent.monsterData;
            this.monsterOpponent = undefined;
            this.monsterBox.setMonster(undefined);
            this.classChooseDialogOpen = false;
            e.unrender();
            // Show other monsters again
            GameState.instance.monsterSprites.forEach((monster) => (monster.display = true));
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
