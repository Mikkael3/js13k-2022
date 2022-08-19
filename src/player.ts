import { MonsterC } from './monster';

export class Player extends MonsterC {
  update(dt: number) {
    super.update(dt);
  }

  onDown() {
    this.color = 'blue';
  }

  onUp() {
    this.color = 'limegreen';
  }
}
