import { randInt } from 'kontra';
import { classes, races } from './data';
import { Monster } from './types';

export const generateMonsterSet = (amount = 3): Monster[] => {
  return Array.from(Array(amount)).map((): Monster => {
    return {
      race: races[randInt(0, 2)],
      class: classes[randInt(0, 2)],
      hp: 10,
    };
  });
};
