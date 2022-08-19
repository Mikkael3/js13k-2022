import { GameLoop, GameObject, init, Sprite, SpriteClass, Text, Animation } from 'kontra';

import { generateMonsterSet } from './monster-generator';
import { Monster } from './types';

const { canvas } = init();

const bgSprites = Array.from(Array(150).keys()).map((item) => {
  let color = 'darkslategray';
  if (item % 2) color = 'lightgray';
  return Sprite({
    x: (item * 16) % 240,
    y: Math.floor(item / 15) * 16,
    color,
    width: 16,
    height: 16,
    dx: 0,
  });
});

const getSkills = (monster: Monster) => {
  return [monster.race.skills, monster.class.skills].flat();
};

const monsters = generateMonsterSet();

class MonsterC extends SpriteClass {
  text: Text;

  constructor(properties: {
    /// Sprite object properties
    color?: string;
    image?: HTMLImageElement | HTMLCanvasElement;
    animations?: { [name: string]: Animation };
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    context?: CanvasRenderingContext2D;
    dx?: number;
    dy?: number;
    ddx?: number;
    ddy?: number;
    ttl?: number;
    anchor?: { x: number; y: number };
    children?: GameObject[];
    opacity?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
    update?: (dt?: number) => void;
    render?: () => void;
    [props: string]: unknown;
    /// Added properties for monster
    // Text on top of monster
    text: string;
  }) {
    super(properties);

    this.text = Text({
      text: properties.text,
      font: '8px Arial',
      color: 'red',
      x: 0,
      y: 0,
      width: this.width,
      anchor: { x: 0.5, y: 0.5 },
      textAlign: 'center'
    });
  }

  update(dt?: number | undefined, time = 0): void {
    super.update();
    // Make monster move a little
    this.x += Math.sign(Math.cos(time*1)) * Math.cos(time)**2 / 8;
    this.y += Math.sin(time * 2.1) / 20;
  }

  draw(): void {
    super.draw();
    this.text.draw();
  }
}

const monsterSprites = monsters.map((monster: Monster, index) => {
  const x = canvas.width / 4 * (index + 1);
  const y = 100;
  const width = 22;
  const height = 44;
  const text = `${monster.class.name}\n${monster.race.name}`;

  return new MonsterC({
    x,
    y,
    color: 'limegreen',
    width,
    height,
    dx: 0,
    text,
  });
});

console.log('monsters', monsters);
console.log('skills:');
monsters.forEach((monster) => {
  console.log(getSkills(monster));
});

let time = 0;
const loop = GameLoop({
  update: (dt) => {
    bgSprites.forEach((s) => s.update());
    monsterSprites.forEach((s) => s.update(dt, time));
    time += dt;
  },
  render: () => {
    bgSprites.forEach((s) => s.render());
    monsterSprites.forEach((s) => {
      s.render()
    });
  },
});

loop.start();
