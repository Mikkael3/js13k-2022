import { Sprite, SpriteClass, Text, getCanvas, track } from 'kontra';

import { Monster } from './types';

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

  //canvas-scaling
  canvasX: number;
  canvasY: number;
  fontSize = 1 / 50;

  constructor(props: MonsterProps) {
    super({
      ...props,
    });

    this.canvasX = props.x ?? 0;
    this.canvasY = props.y ?? 0;

    const { monster } = props;
    this.monsterData = monster;
    this.hp = monster.race.stats.hp;
    // Init mouse events
    track(this);
    this.setText();
  }

  set monsterData(monster: Monster) {
    this._monsterData = monster;
    this.color = monster.class.color;
    this.width = monster.race.width * getCanvas().width;
    this.height = monster.race.height * getCanvas().height;
    this.setText();
  }

  get monsterData() {
    return this._monsterData;
  }

  setText() {
    this.text = Text({
      text: `${this.monsterData.class.name} ${this.monsterData.race.name}`,
      font: `${getCanvas().width * this.fontSize}px Arial`,
      color: 'black',
      x: 0,
      y: 0,
      width: this.width,
      lineHeight: 10,
      textAlign: 'center',
    });
  }

  /// Mouse events
  public onDown() {
    if (this.handler) this.handler(this);
  }

  public handler: ((monster: MonsterC) => void) | undefined;

  resetAnimation() {
    this.animationTime = 0;
  }

  updateCanvasY(delta: number) {
    this.canvasY += delta;
    this.y = this.canvasY * getCanvas().height;
  }

  updateCanvasX(delta: number) {
    this.canvasX += delta;
    this.x = this.canvasX * getCanvas().width;
  }

  recalculateCanvas() {
    this.height = this.monsterData.race.height * getCanvas().height;
    this.width = this.monsterData.race.width * getCanvas().width;
    this.updateCanvasX(0);
    this.updateCanvasY(0);
    this.setText();
  }

  update(dt: number): void {
    super.update();
    this.animationTime += dt;
    // Make monster move a little
    this.updateCanvasX(
      (Math.sign(Math.cos(this.animationTime)) * Math.cos(this.animationTime) ** 2) /
        8 /
        getCanvas().width,
    );
    this.updateCanvasY(Math.sin(this.animationTime * 2.1) / 20 / getCanvas().width);
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
