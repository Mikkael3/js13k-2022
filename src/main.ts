import { GameLoop, Sprite, SpriteClass } from 'kontra';
import { Monster, buildClass, buildRace } from './types';
import { MonsterC, MonsterProps } from './monster';
import { girlRace, goblin, kid, starterGoblin } from './data';

import gameState from './game-state';
import { createMonsterSprites } from './monster-generator';
import { initDefaultBackground } from './background-sprites';
import { storyTransitions } from './story';

initDefaultBackground();
class House extends SpriteClass {
  public doorColor = 'sienna';
  public windowColor = 'white';

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
    const c = this.context;
    if (!c || !this.color) return;
    // house wall
    c.fillStyle = 'darkred';
    c.beginPath();
    c.lineTo(0, 0);
    c.lineTo(0, 70);
    c.lineTo(100, 70);
    c.lineTo(100, 0);
    c.closePath();
    c.fill();
    // roof
    c.fillStyle = 'grey';
    c.beginPath();
    c.lineTo(-10, 0);
    c.lineTo(50, -50);
    c.lineTo(110, 0);
    c.closePath();
    c.fill();
    // door
    c.fillStyle = this.doorColor;
    c.fillRect(60, 30, 25, 40);
    // window
    c.fillStyle = this.windowColor;
    c.fillRect(25, 30, 20, 20);
  }
}

gameState.unrenderUi();
gameState.monsterSprites = [];

class Girl extends MonsterC {
  constructor(props: MonsterProps) {
    super(props);
  }

  update(dt: number) {
    super.update(dt * 8);
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

gameState.background.addChild(house);
gameState.background.addChild(girl);

// Second scene.
storyTransitions.zoom = () => {
  girl.y -= 18;
  gameState.background.setScale(5, 5);
  gameState.background.y -= 80;
  gameState.background.x -= 80;
};
///////////////
// Third scene
storyTransitions.extraZoom = () => {
  gameState.background.setScale(16, 16);
  gameState.background.y -= 600;
  gameState.background.x -= 520;
};
///////////////
// Fourth scene
storyTransitions.brokenHouse = () => {
  house.doorColor = 'black';
  house.windowColor = 'black';
  gameState.background.setScale(3, 3);
  gameState.background.y = 0;
  gameState.background.x = 0;
  gameState.background.removeChild(girl);
};
///////////////
// Fifth scene
storyTransitions.doorZoom = () => {
  gameState.background.setScale(8, 8);
  gameState.background.x = -300;
  gameState.background.y = -250;
};
const blackness = Sprite({
  width: 10000,
  height: 10000,
  color: 'black',
});
///////////////
// Sixth scene
storyTransitions.blackness = () => {
  gameState.background.addChild(blackness);
  gameState.background.setScale(2, 2);
};
//////////////
// Seventh scene: intro battle
storyTransitions.introBattle = () => {
  const woundedGoblin: Monster = {
    race: {
      ...buildRace(goblin),
      skills: [],
    },
    class: buildClass({
      color: 'green',
      name: 'Wounded',
      skills: [
        {
          name: 'Stumble',
          value: -1,
          type: 'boost',
          effect: 'hp',
          flavor: 'Goblin fell on top of you and skewered himself on the knife.',
          cost: 0,
        },
      ],
    }),
    level: 1,
  };
  createMonsterSprites([woundedGoblin]);
  gameState.monsterSprites[0].stats.hp = 1;
  gameState.player.monsterData = girl.monsterData;
  gameState.player.monsterData.class.name = 'Little';
  gameState.battleManager.setPlayerSkills([]);
  gameState.storyBox.unrender();
  gameState.renderUi();
  gameState.battleManager.selectForBattle(gameState.monsterSprites[0]);
  gameState.background.setScale(2, 2);
  gameState.background.x = 0;
  gameState.background.y = 0;
  girl.setScale(0.25, 0.25);
  girl.x = 115;
  girl.y = 110;
  gameState.background.addChild(girl);
  const oldBattleEndCb = gameState.battleManager.battleEndCb;
  // Change battle end to skill choosing skills for this intro
  gameState.battleManager.battleEndCb = () => {
    gameState.storyBox.render();
    if (!gameState.battleManager.monOp) return;
    gameState.battleManager.battleEnded = true;
    gameState.battleManager.monOp.rotation = Math.PI / 2;
    gameState.battleManager.monOp.color = 'red';
    gameState.battleManager.monOp.stopped = true;
    // Restore battleManager to regular
    gameState.battleManager.battleEndCb = oldBattleEndCb;
  };
};

storyTransitions.becomeGoblin = () => {
  if (!gameState.battleManager.monOp) return;
  gameState.player.skills = starterGoblin.class.skills;
  gameState.battleManager.monOp.monsterData = starterGoblin;
  gameState.battleManager.killMonster();
  gameState.battleManager.skillsChosenCb();
  gameState.showPlayer = true;
  gameState.background.removeChild(girl);
};

//////////////
// Start Game scene
storyTransitions.startGame = () => {
  gameState.background.removeChild(blackness);
  gameState.renderUi();
  gameState.introEnded = true;
  gameState.background.removeChild(house);
  gameState.background.removeChild(girl);
  gameState.background.setScale(2, 2);
  gameState.showPlayer = true;
  gameState.storyBox.unrender();
  gameState.round = 1;
};
const loop = GameLoop({
  blur: true,
  update: (dt) => {
    gameState.update(dt);
  },
  render: () => {
    gameState.render();
  },
});

loop.start();
