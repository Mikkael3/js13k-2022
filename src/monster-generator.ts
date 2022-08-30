import { Monster, buildClass, buildRace } from './types';
import { classes, races } from './data';
import { getCanvas, randInt } from 'kontra';

import { MonsterC } from './monster';
import gameState from './game-state';

export const generateMonsterSet = (amount = 3, level = 1): Monster[] => {
  return Array.from(Array(amount)).map((): Monster => {
    return {
      race: buildRace(races[randInt(0, races.length - 1)]),
      class: buildClass(classes[randInt(0, classes.length - 1)]),
      level,
    };
  });
};

export const createMonsterSprites = (monsters: Monster[]) => {
  monsters.forEach((monster: Monster, index) => {
    const x = (getCanvas().width / 4) * (index + 1);
    const y = 100;

    gameState.monsterSprites.push(
      new MonsterC({
        x,
        y,
        dx: 0,
        monster,
      }),
    );
    console.log('sprietes mosnter: ', gameState.monsterSprites);
    gameState.monsterSprites.forEach((monster) => {
      monster.handler = () => gameState.battleManager.selectForBattle(monster);
    });
  });
};
