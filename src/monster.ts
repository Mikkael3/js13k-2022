import { BaseStats, Monster, Skill, StatStages, size } from './types';
import { Sprite, SpriteClass, Text, track } from 'kontra';

import { performSkill } from './battle';

export type MonsterProps = Partial<Sprite> & { monster: Monster };

export class MonsterC extends SpriteClass {
  text!: Text;
  // Show this sprite or not
  display = true;
  private _monsterData!: Monster;
  // Used for animation
  animationTime = 0;
  stats!: BaseStats;
  stopped = false;
  statStages: StatStages;

  constructor(props: MonsterProps) {
    super({
      ...props,
      color: undefined,
    });
    const { monster } = props;
    this.monsterData = monster;
    // Init mouse events
    track(this);

    this.statStages = {
      str: 0,
      int: 0,
      def: 0,
      wp: 0,
    };
  }

  set monsterData(monster: Monster) {
    this._monsterData = monster;
    this.width = size(monster.race.width);
    this.height = monster.race.height;
    this.stats = { ...this.monsterData.race.stats };
    Object.keys(this.stats).forEach((stringKey) => {
      if (stringKey in this.stats) {
        const key = stringKey as keyof BaseStats;
        this.stats[key] *= 10;
      }
    });
    this.stats.stamina = this.monsterData.race.stats.stamina;
    this.monsterSprite();
  }

  get monsterData() {
    return this._monsterData;
  }

  monsterSprite() {
    const spriteraw = this.monsterData.race.sprite.split('').map((i) => +i);

    const sprite = [];

    for (let i = 0; i < spriteraw.length; i += this.monsterData.race.width) {
      sprite.push(spriteraw.slice(i, i + this.monsterData.race.width));
    }

    this.children = [];

    sprite.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (!cell) return;
        this.addChild(
          Sprite({
            y: i * 4,
            x: j * 4,
            width: 4,
            height: 4,
            color: this.monsterData.class.color,
          }),
        );
      }),
    );
    this.text = Text({
      text: `${this.monsterData.class.name} ${this.monsterData.race.name}`,
      font: '8px Arial',
      color: 'black',
      x: 0,
      y: 0,
      width: this.width,
      anchor: { x: 0, y: 0 },
      textAlign: 'center',
    });
    // this.addChild(this.text);
  }

  /// Mouse events
  public onDown() {
    if (this.handler && this.display) this.handler(this);
  }

  public handler: ((monster: MonsterC) => void) | undefined;

  resetAnimation() {
    this.animationTime = 0;
  }

  update(dt: number): void {
    super.update();
    if (this.stopped) return;
    this.animationTime += dt;
    // Make monster move a little
    this.x += (Math.sign(Math.cos(this.animationTime)) * Math.cos(this.animationTime) ** 2) / 8;
    this.y += Math.sin(this.animationTime * 2.1) / 20;
  }

  draw(): void {
    super.draw();
  }

  render(): void {
    if (!this.display) return;
    super.render();
  }

  getSkills() {
    return [this.monsterData.class.skills, this.monsterData.race.skills].flat();
  }

  // This monster attacks target with a skill
  // Returns: damage
  attack(skill: Skill, target: MonsterC): number {
    return performSkill(skill, this, target);
  }
}
