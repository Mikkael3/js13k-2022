import { MonsterC } from './monster';
import {Skill} from "./types";

export class Player extends MonsterC {
  skills: Skill[] = [];
  update(dt: number) {
    super.update(dt);
    if (this.stats.hp <= 0) {
      this.rotation += 0.1;
    }
  }

  onDown() {
    this.color = 'blue';
  }

  onUp() {
    this.color = 'limegreen';
  }
}
