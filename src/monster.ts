import { Sprite, SpriteClass, Text, track } from 'kontra';

import { Monster } from './types';

type MonsterProps = Partial<Sprite> & { monster: Monster };

export class MonsterC extends SpriteClass {
  text: Text;
  monsterData: Monster;
  // Used for animation
  animationTime = 0;

  // inBattle = false;

  constructor(props: MonsterProps) {
    super({
      ...props,
      color: props.monster.class.color,
      width: props.monster.race.width,
      height: props.monster.race.height,
    });
    const { monster } = props;
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

  /// Mouse events
  public onDown() {
    console.log('click down', this.text.text);
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
    super.draw();
    this.text.draw();
  }
}
