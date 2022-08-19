import { MonsterC } from './monster';
import { Player } from './player';

export class BattleManager {
  canvas: HTMLCanvasElement;
  player: Player;
  monsterOpponent: MonsterC | null = null;
  monsters: MonsterC[];

  constructor(player: Player, monsters: MonsterC[], canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.player = player;
    this.monsters = monsters;
    monsters.forEach((monster) => {
      monster.handler = () => this.selectForBattle(monster);
    });
  }

  selectForBattle(monster: MonsterC) {
    this.monsterOpponent = monster;
    monster.x = this.canvas.width / 2 - monster.width / 2;
    monster.y = this.canvas.height / 2 - monster.height / 2;
    monster.resetAnimation();
    // todo move other monsters away
  }

  getMonsterOpponent() {
    return this.monsterOpponent;
  }
}
