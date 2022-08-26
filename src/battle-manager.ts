import { Dialog } from './dialog';
import gameState, { GameState } from './game-state';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { Skill } from './types';
import { UiElement } from './ui';
import { GameUi } from './game-ui';
import { GameObject, randInt } from 'kontra';

export class BattleManager {
  canvas: HTMLCanvasElement;
  monsterOpponent?: MonsterC = undefined;
  monsterBox: MonsterBox;
  classChooseDialogOpen = false;

  constructor(monsterBox: MonsterBox, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.monsterBox = monsterBox;
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

  shakeObject(object: GameObject, timeout = 0) {
    setTimeout(() => {
      setTimeout(() => {
        object.x += 20;
      }, 100);
      setTimeout(() => {
        object.x -= 40;
      }, 300);
      setTimeout(() => {
        object.x += 20;
      }, 500);
    }, timeout);
  }

  // Skill button clicked
  useSkill(skill: Skill, gameUi: GameUi) {
    if (!this.monsterOpponent) return;
    gameUi.unrender();

    gameState.player.attack(skill, this.monsterOpponent);

    this.monsterBox.setMonster(this.monsterOpponent);
    if (this.monsterOpponent.hp <= 0) {
      gameState.player.hp = this.monsterOpponent.monsterData.race.stats.hp;
      this.killMonster();
      if (!this.classChooseDialogOpen) {
        this.showChooseClassDialog();
        this.classChooseDialogOpen = true;
      }
      return;
    }
    // Shake background when taking a hit
    this.shakeObject(this.monsterOpponent);
    this.shakeObject(gameState.background, 500);
    setTimeout(() => {
      if (!this.monsterOpponent) return;
      const randomSkill =
        this.monsterOpponent.getSkills()[randInt(0, this.monsterOpponent.getSkills().length - 1)];
      this.monsterOpponent.attack(randomSkill, gameState.player);
      gameState.playerBox.setMonster(gameState.player);
    });
    // Get control back after enemy finishes
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
            gameState.playerBox.setMonster(gameState.player);
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
            gameState.playerBox.setMonster(gameState.player);
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
