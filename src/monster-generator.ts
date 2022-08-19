import { classes, races } from './data';

import { Monster } from './types';
import { randInt } from 'kontra';

export const generateMonsterSet = (amount = 3, level = 1): Monster[] => {
  return Array.from(Array(amount)).map((): Monster => {
    return {
      race: races[randInt(0, 2)],
      class: classes[randInt(0, 2)],
      level,
    };
  });
};
