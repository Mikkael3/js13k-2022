import { BaseStats, Monster, Skill, size } from './types';
import { Sprite, SpriteClass, Text, track } from 'kontra';

export type MonsterProps = Partial<Sprite> & { monster: Monster };

export class MonsterC extends SpriteClass {
  text!: Text;
  // Show this sprite or not
  display = true;
  private _monsterData!: Monster;
  // Used for animation
  animationTime = 0;
  stats: BaseStats;
  stopped = false;

  constructor(props: MonsterProps) {
    super({
      ...props,
      color: undefined,
    });
    const { monster } = props;
    this.monsterData = monster;
    // Init mouse events
    track(this);

    this.stats = { ...this.monsterData.race.stats };
    Object.keys(this.stats).forEach((stringKey) => {
      if (stringKey in this.stats) {
        const key = stringKey as keyof BaseStats;
        this.stats[key] *= 10;
      }
    });
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
    if (!this.stopped) this.animationTime += dt;
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
    const type = skill.type;
    let damage = skill.value;
    if (type === 'int' || type === 'str') {
      const protection = (target.stats.def + target.stats[type]) / 2;
      const baseStat = (this.stats[type] / protection) * 10;
      damage = Math.ceil(skill.value * baseStat);
    }
    if (type === 'boost') {
      this.stats[skill.effect] = Math.ceil(skill.value * this.stats[skill.effect]);
      return 0;
    }
    if (type === 'status') {
      target.stats[skill.effect] = Math.floor(skill.value * target.stats[skill.effect]);
      if (target.stats[skill.effect] <= 0) target.stats[skill.effect] = 10;
      return 0;
    }
    target.stats.hp -= damage;
    return damage;
  }
}
