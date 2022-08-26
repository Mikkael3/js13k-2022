import { Sprite, SpriteClass, Text, track } from 'kontra';

import {Monster, Skill} from './types';

type MonsterProps = Partial<Sprite> & { monster: Monster };

export class MonsterC extends SpriteClass {
  text!: Text;
  // Show this sprite or not
  display = true;
  private _monsterData!: Monster;
  // Used for animation
  animationTime = 0;

  // Current monster hp
  hp: number;

  constructor(props: MonsterProps) {
    super({
      ...props,
      color: undefined,
    });
    const { monster } = props;
    this.monsterData = monster;
    this.hp = monster.race.stats.hp;
    // Init mouse events
    track(this);
  }

  set monsterData(monster: Monster) {
    this._monsterData = monster;
    this.width = monster.race.width;
    this.height = monster.race.height;
    this.monsterSprite();
  }

  get monsterData() {
    return this._monsterData;
  }

  monsterSprite() {
    const sprite = this.monsterData.race.sprite;

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
    this.addChild(this.text);
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
    super.draw();
  }

  render(): void {
    if (!this.display) return;
    super.render();
  }

  getSkills() {
    return [this.monsterData.class.skills, this.monsterData.race.skills].flat();
  }

  attack(skill: Skill, target: MonsterC) {
    target.hp -= skill.dmg;
  }
}
