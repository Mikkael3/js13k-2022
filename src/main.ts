import { GameLoop, Sprite, SpriteClass } from 'kontra';
import { GameState } from './game-state';
import { initDefaultBackground } from './background-sprites';
import { MonsterC, MonsterProps } from './monster';
import { girlRace, kid } from './data';
import { buildClass, buildRace } from './types';

initDefaultBackground();

const gameState = GameState.instance;

class House extends SpriteClass {
  constructor(props: Partial<Sprite>) {
    super({
      ...props,
      color: '#FEFCD7',
      radius: 40,
      dx: 0,
    });
  }

  draw() {
    super.draw();
    if (!this.context || !this.color) return;
    // house wall
    this.context.fillStyle = 'darkred';
    this.context.beginPath();
    this.context.lineTo(0, 0);
    this.context.lineTo(0, 70);
    this.context.lineTo(100, 70);
    this.context.lineTo(100, 0);
    this.context.closePath();
    this.context.fill();
    // roof
    this.context.fillStyle = 'grey';
    this.context.beginPath();
    this.context.lineTo(-10, 0);
    this.context.lineTo(50, -50);
    this.context.lineTo(110, 0);
    this.context.closePath();
    this.context.fill();
    this.context.fillStyle = 'sienna';
    this.context.fillRect(60, 30, 25, 40);
    this.context.fillStyle = 'white';
    this.context.fillRect(25, 30, 20, 20);
  }

  // draw() {
  //   this.context.fillStyle = this.color;
  //   this.context.beginPath();
  //   // this.context.to
  //   this.context.arc(this.x ?? 0, this.y ?? 0, this.radius, 0, 2 * Math.PI);
  //   this.context.fill();
  // }
}

gameState.unrenderUi();
gameState.monsterSprites = [];

class Girl extends MonsterC {
  constructor(props: MonsterProps) {
    super(props);
  }
  update(dt: number) {
    super.update(dt*8);
  }
}

const girl = new Girl({
  x: 40,
  y: 68,
  scaleX: 0.5,
  scaleY: 0.5,
  monster: {
    race: buildRace(girlRace),
    class: { ...buildClass(kid), color: 'violet' },
    level: 1,
  },
});

const house = new House({
  x: 32,
  y: 30,
  scaleX: 0.6,
  scaleY: 0.6,
});
gameState.background.setScale(3, 3);

// Second scene.
// girl.y -= 18;
// gameState.background.setScale(5, 5);
// gameState.background.y -= 80;
// gameState.background.x -= 80;
///////////////
///////////////
// Third scene
// gameState.background.setScale(16, 16);
// gameState.background.y -= 600;
// gameState.background.x -= 520;
//////////////

gameState.background.addChild(house);
gameState.background.addChild(girl);

// createMonsterSprites(generateMonsterSet());
const loop = GameLoop({
  blur: true,
  update: (dt) => {
    gameState.update(dt);
    // house.update();
    // girl.update();
  },
  render: () => {
    gameState.render();
    // house.render();
    // girl.render();
  },
});

loop.start();
