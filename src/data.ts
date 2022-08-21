import { Class, Race } from './types';

export const kid = {
  color: 'yellow',
  name: 'Kid',
  skills: [
    {
      name: 'cry',
      dmg: 0,
    },
    {
      name: 'scratch',
      dmg: 2,
    },
    {
      name: 'drool',
      dmg: 0,
    },
  ],
};

export const classes: Class[] = [
  kid,
  {
    color: 'red',
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
    color: 'gold',
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
    color: 'green',
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

export const human: Race = {
  width: 0.15,
  height: 0.15,
  name: 'Human',
  stats: {
    hp: 3,
    str: 3,
    int: 3,
    def: 3,
    stamina: 3,
  },
  skills: [
    {
      name: 'Struggle',
      dmg: 1,
    },
  ],
};

export const races: Race[] = [
  human,
  {
    width: 0.2,
    height: 0.25,
    name: 'Gargoyle',
    stats: {
      hp: 10,
      str: 10,
      int: 2,
      def: 5,
      stamina: 2,
    },
    skills: [
      {
        name: 'Claw',
        dmg: 3,
      },
    ],
  },
  {
    width: 0.2,
    height: 0.1,
    name: 'Dwarf',
    stats: {
      hp: 7,
      str: 7,
      int: 4,
      def: 4,
      stamina: 2,
    },
    skills: [
      {
        name: 'Dig',
        dmg: 2,
      },
    ],
  },
  {
    width: 0.15,
    height: 0.2,
    name: 'Vampire',
    stats: {
      hp: 5,
      str: 8,
      int: 9,
      def: 2,
      stamina: 4,
    },
    skills: [
      {
        name: 'Hypnotic Magnetic Glare',
        dmg: 0,
      },
    ],
  },
];
