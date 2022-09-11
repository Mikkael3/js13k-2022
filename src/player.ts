import { MonsterC } from './monster';
import { Skill } from './types';
import gameState from './game-state';

export class Player extends MonsterC {
  // These skills are not shown.
  // The usable skills are in player.monsterData.{class|race}.skills
  skills: Skill[] = [];
  launchRestart = true;
  update(dt: number) {
    super.update(dt);
    if (this.stats.hp <= 0 && this.launchRestart) {
      this.rotation += 0.1;
      this.launchRestart = false;
      setTimeout(() => {
        gameState.restartRounds();
        this.launchRestart = true;
      }, 1000);
    }
  }
}
