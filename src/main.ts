import { GameLoop, Sprite, init, initPointer } from 'kontra';
import { human, kid } from './data';

import { GameUi } from './game-ui';
import { Monster } from './types';
import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { generateMonsterSet } from './monster-generator';
import {BattleManager} from "./battle-manager";

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
  height: 0.05,
  monster: monsters[0],
  canvas,
});

monsterBox.render();

export class Player extends MonsterC {
  update(dt: number) {
    super.update(dt);
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
  y: 110,
  color: 'yellow',
  width: 20,
  height: 30,
  monster: {
    level: 1,
    race: human,
    class: kid,
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

const battleManager = new BattleManager(player, monsterSprites, canvas);

const loop = GameLoop({
  blur: true,
  update: (dt) => {
    bgSprites.forEach((s) => s.update());
    player.update(dt);
    monsterSprites.forEach((s) => s.update(dt));
    gameUi.update();
    monsterBox.update();
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
