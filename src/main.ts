import { GameLoop, GameObjectClass } from 'kontra';
import { GameState } from './game-state';
import { initDefaultBackground } from './background-sprites';
import { MonsterC, MonsterProps } from './monster';
import { girl, kid } from './data';
import { buildClass, buildRace } from './types';

initDefaultBackground();

const gameState = GameState.instance;

class Intro extends GameObjectClass {
  constructor() {
    super({
      x: 80,
      y: 100,
      color: '#FEFCD7',
      radius: 40,
      dx: 0,
      render: function () {
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
      },
    });
  }

  // draw() {
  //   this.context.fillStyle = this.color;
  //   this.context.beginPath();
  //   // this.context.to
  //   this.context.arc(this.x ?? 0, this.y ?? 0, this.radius, 0, 2 * Math.PI);
  //   this.context.fill();
  // }
}

gameState.unrender();
gameState.monsterSprites = [];

class Girl extends MonsterC {
  constructor(props: MonsterProps) {
    super(props);
  }
}

const girlC = new Girl({
  x: 100,
  y: 180,
  monster: {
    race: buildRace(girl),
    class: {...buildClass(kid), color: 'violet'},
    level: 1,
  },
});
// const roof = Sprite({
//   x: 0,
//   y: 64,
//   color: 'black',
//   width: 240,
//   height: 240,
//   dx: 0,
// });

const intro = new Intro();
// intro.addChild(ground);

// createMonsterSprites(generateMonsterSet());
const loop = GameLoop({
  blur: true,
  update: (dt) => {
    gameState.update(dt);
    intro.update();
    // girlC.update();
  },
  render: () => {
    gameState.render();
    intro.render();
    girlC.render();
  },
});

loop.start();
