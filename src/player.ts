import { MonsterC } from './monster';

export class Player extends MonsterC {
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
