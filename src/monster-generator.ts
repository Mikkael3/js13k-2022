import { classes, races } from './data';
import { Monster } from './types';

export const generateMonsterSet = (amount = 3): Monster[] => {
  return Array.from(Array(amount)).map((): Monster => {
    return {
      race: races[Math.floor(Math.random() * (races.length - 1))],
      class: classes[Math.floor(Math.random() * (classes.length - 1))],
      hp: 10,
    };
  });
};
