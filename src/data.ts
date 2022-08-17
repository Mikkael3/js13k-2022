import { Class, Race } from './types';

export const classes: Class[] = [
  {
    name: 'Barbarian',
    skills: [
      {
        name: 'Bash',
      },
      {
        name: 'Cleave',
      },
    ],
  },
  {
    name: 'Cleric',
    skills: [
      {
        name: 'Sacred Flame',
      },
      {
        name: 'Banishment',
      },
    ],
  },
  {
    name: 'Rogue',
    skills: [
      {
        name: 'Sinister Strike',
      },
      {
        name: 'Wound Poison',
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
      },
    ],
  },
  {
    name: 'Dwarf',
    skills: [
      {
        name: 'Dig',
      },
    ],
  },
  {
    name: 'Vampire',
    skills: [
      {
        name: 'Hypnotic Magnetic Glare',
      },
    ],
  },
];
