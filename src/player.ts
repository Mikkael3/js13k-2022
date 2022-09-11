import { MonsterC } from './monster';
import { Skill } from './types';

export class Player extends MonsterC {
  // These skills are not shown.
  // The usable skills are in player.monsterData.{class|race}.skills
  skills: Skill[] = [];
  update(dt: number) {
    super.update(dt);
    if (this.stats.hp <= 0) {
      this.rotation += 0.1;
    }
  }
}
