import { Class, Race } from './types';

export const classes: Class[] = [
  {
    name: 'Barbarian',
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
  {
    name: 'Cleric',
    skills: [
      {
        name: 'Sacred Flame',
        dmg: 4,
      },
      {
        name: 'Banishment',
        dmg: 5,
      },
    ],
  },
  {
    name: 'Rogue',
    skills: [
      {
        name: 'Sinister Strike',
        dmg: 6,
      },
      {
        name: 'Wound Poison',
        dmg: 3,
      },
    ],
  },
];

export const races: Race[] = [
  {
    name: 'Gargoyle',
    skills: [
      {
        name: 'Claw',
        dmg: 3,
      },
    ],
  },
  {
    name: 'Dwarf',
    skills: [
      {
        name: 'Dig',
        dmg: 2,
      },
    ],
  },
  {
    name: 'Vampire',
    skills: [
      {
        name: 'Hypnotic Magnetic Glare',
        dmg: 0
      },
    ],
  },
];
