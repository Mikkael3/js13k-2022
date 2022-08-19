import { Sprite, SpriteClass, Text, track } from 'kontra';

import { Monster } from './types';

type MonsterProps = Partial<Sprite> & { monster: Monster };

export class MonsterC extends SpriteClass {
  text: Text;
  monsterData: Monster;

  // inBattle = false;

  constructor(props: MonsterProps) {
    super(props);
    const { monster } = props;
    this.monsterData = monster;
    track(this);
    this.text = Text({
      text: `${monster.class.name} ${monster.race.name}`,
      font: '8px Arial',
      color: 'red',
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
    this.color = 'blue';
  }

  public handler: ((monster: MonsterC) => void) | undefined;

  onUp() {
    console.log('click up', this.text.text);
    this.color = 'limegreen';
  }

  onOver() {
    // console.log('in', this.text.text);
  }

  onOut() {
    console.log('out', this.text.text);
    this.color = 'limegreen';
  }

  update(_dt?: number | undefined, time = 0): void {
    super.update();
    // Make monster move a little
    this.x += (Math.sign(Math.cos(time)) * Math.cos(time) ** 2) / 8;
    this.y += Math.sin(time * 2.1) / 20;
  }

  draw(): void {
    super.draw();
    this.text.draw();
  }
}
