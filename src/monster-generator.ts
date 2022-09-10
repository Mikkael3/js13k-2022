import { Monster, buildClass, buildRace } from './types';
import { advancedRaces, classes, entryRaces } from './data';
import { getCanvas, randInt } from 'kontra';

import { MonsterC } from './monster';
import gameState from './game-state';

export const generateMonsterSet = ( level = 1, amount = 3): Monster[] => {
  const races = level > 5 ? advancedRaces : entryRaces;
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
    gameState.monsterSprites.forEach((monster) => {
      monster.handler = () => gameState.battleManager.selectForBattle(monster);
    });
  });
};
