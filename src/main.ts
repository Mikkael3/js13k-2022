import { GameLoop, Sprite, SpriteClass, Text, init, initPointer, track } from 'kontra';

import { Monster } from './types';
import { MonsterBox } from './monster-box';
import { generateMonsterSet } from './monster-generator';
import { GameUi } from './game-ui';

const { canvas } = init();
initPointer();

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

const monsterBox = new MonsterBox({
  x: 0,
  y: 0,
  width: 0.3,
  height: 0.2,
  monster: monsters[0],
});

monsterBox.render();

type MonsterProps = Partial<Sprite> & { monster: Monster };

class MonsterC extends SpriteClass {
  text: Text;
  monsterData: Monster;

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
  onDown() {
    // handle on down events on the sprite
    console.log('click down', this.text.text);
    this.color = 'blue';
  }

  onUp() {
    // handle on up events on the sprite
    console.log('click up', this.text.text);
    this.color = 'limegreen';
  }

  onOver() {
    console.log('in', this.text.text);
  }

  onOut() {
    console.log('out', this.text.text);
    this.onUp();
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

class Player extends MonsterC {
  update(dt: number, time: number) {
    super.update(dt, time);
  }

  onDown() {
    // handle on down events on the sprite
    console.log('click down', this.text.text);
    this.color = 'blue';
  }

  onUp() {
    // handle on up events on the sprite
    console.log('click up', this.text.text);
    this.color = 'limegreen';
  }

  onOver() {
    console.log('in', this.text.text);
  }
}

const monsterSprites = monsters.map((monster: Monster, index) => {
  const x = (canvas.width / 4) * (index + 1);
  const y = 10;
  const width = 22;
  const height = 44;

  return new MonsterC({
    x,
    y,
    color: 'limegreen',
    width,
    height,
    dx: 0,
    monster,
  });
});

const player = new Player({
  x: canvas.width / 2,
  y: 100,
  color: 'yellow',
  width: 20,
  height: 30,
  monster: {
    race: { name: 'human', skills: [{ name: 'struggle', dmg: 1 }] },
    class: {
      name: 'kid',
      skills: [
        {
          name: 'Bash',
          dmg: 4,
        },
        {
          name: 'Cleave',
          dmg: 3,
        },
      ],
    },
    hp: 5,
  },
});

console.log('monsters', monsters);
console.log('skills:');
monsters.forEach((monster) => {
  console.log(getSkills(monster));
});

const gameUi = new GameUi({
  x: 0,
  y: 1,
  canvas,
  height: 0.1,
  width: 1,
  monster: player.monsterData,
});
gameUi.render();

let time = 0;
const loop = GameLoop({
  blur: true,
  update: (dt) => {
    bgSprites.forEach((s) => s.update());
    player.update(dt, time);
    monsterSprites.forEach((s) => s.update(dt, time));
    gameUi.update();
    monsterBox.update();
    time += dt;
  },
  render: () => {
    bgSprites.forEach((s) => s.render());
    player.render();
    monsterSprites.forEach((s) => {
      s.render();
    });
  },
});

loop.start();
