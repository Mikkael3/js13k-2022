import { Sprite, SpriteClass, Text, track } from 'kontra';

import { Monster } from './types';

type MonsterProps = Partial<Sprite> & { monster: Monster };

export class MonsterC extends SpriteClass {
  text: Text;
  // Show this sprite or not
  display = true;
  private _monsterData!: Monster;
  // Used for animation
  animationTime = 0;

  constructor(props: MonsterProps) {
    super({
      ...props,
    });
    const { monster } = props;
    // this.monsterData = monster;
    this.monsterData = monster;
    track(this);
    this.text = Text({
      text: `${monster.class.name} ${monster.race.name}`,
      font: '8px Arial',
      color: 'black',
      x: 0,
      y: 0,
      width: this.width,
      anchor: { x: 0.5, y: 0.5 },
      textAlign: 'center',
    });
  }

  set monsterData(monster: Monster) {
    this._monsterData = monster;
    this.color = monster.class.color;
    this.width = monster.race.width;
    this.height = monster.race.height;
    this.text = Text({
      text: `${monster.class.name} ${monster.race.name}`,
      font: '8px Arial',
      color: 'black',
      x: 0,
      y: 0,
      width: this.width,
      anchor: { x: 0.5, y: 0.5 },
      textAlign: 'center',
    });

  }

  get monsterData() {
    return this._monsterData;
  }

  /// Mouse events
  public onDown() {
    if (this.handler) this.handler(this);
  }

  public handler: ((monster: MonsterC) => void) | undefined;

  resetAnimation() {
    this.animationTime = 0;
  }

  update(dt: number): void {
    super.update();
    this.animationTime += dt;
    // Make monster move a little
    this.x += (Math.sign(Math.cos(this.animationTime)) * Math.cos(this.animationTime) ** 2) / 8;
    this.y += Math.sin(this.animationTime * 2.1) / 20;
  }

  draw(): void {
    if (!this.display) return;
    super.draw();
    this.text.draw();
  }

  getSkills() {
    return [this.monsterData.class.skills, this.monsterData.race.skills].flat();
  }
}
