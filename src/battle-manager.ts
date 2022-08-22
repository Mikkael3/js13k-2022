import { Dialog } from './dialog';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Skill } from './types';
import { UiElement } from './ui';
import { gameState } from './game-state';

export class BattleManager {
  canvas: HTMLCanvasElement;
  monsterOpponent?: MonsterC = undefined;
  monsterBox: MonsterBox;
  classChooseDialogOpen = false;

  constructor(monsterBox: MonsterBox, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.monsterBox = monsterBox;
    gameState.monsterSprites.forEach((monster) => {
      monster.handler = () => this.selectForBattle(monster);
    });
  }

  selectForBattle(monster: MonsterC) {
    this.monsterOpponent = monster;
    monster.x = this.canvas.width / 2 - monster.width / 2;
    monster.y = this.canvas.height / 2 - monster.height / 2;
    monster.resetAnimation();
    gameState.monsterSprites.forEach((monster) => {
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
  useSkill(skill: Skill) {
    if (!this.monsterOpponent) return;
    this.monsterOpponent.hp -= skill.dmg;
    this.monsterBox.setMonster(this.monsterOpponent);
    if (this.monsterOpponent.hp <= 0) {
      this.killMonster();
      if (!this.classChooseDialogOpen) {
        this.showChooseClassDialog();
        this.classChooseDialogOpen = true;
      }
    }
  }

  private killMonster() {
    const index = gameState.monsterSprites.findIndex((m) => {
      return m === this.monsterOpponent;
    });
    if (index < 0) return;
    gameState.monsterSprites.splice(index, 1);
  }

  private showChooseClassDialog() {
    const { player } = gameState;
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
            gameState.monsterSprites.forEach((monster) => (monster.display = true));
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
            gameState.monsterSprites.forEach((monster) => (monster.display = true));
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
