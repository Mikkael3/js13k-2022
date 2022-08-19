import { MonsterC } from './monster';
import { Player } from './player';
import {MonsterBox} from "./monster-box";

export class BattleManager {
  canvas: HTMLCanvasElement;
  player: Player;
  monsterOpponent: MonsterC | null = null;
  monsters: MonsterC[];
  monsterBox: MonsterBox;

  constructor(player: Player, monsters: MonsterC[], monsterBox: MonsterBox, canvas: HTMLCanvasElement) {
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
      monster.y = -monster.height / 2;
    });

    // Set ui to show monster stats
    this.monsterBox.setMonster(monster.monsterData);
  }

  getMonsterOpponent() {
    return this.monsterOpponent;
  }
}
