import { Class, Race } from './types';

export const kid: Class = {
  color: 'yellow',
  name: 'Kid',
  skills: [
    {
      name: 'cry',
      dmg: 100,
      type: 'int',
    },
    {
      name: 'scratch',
      dmg: 0.1,
      type: 'str',
    },
    {
      name: 'drool',
      dmg: 0.5,
      type: 'int',
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
        dmg: 0.4,
        type: 'str',
      },
      {
        name: 'Cleave',
        dmg: 0.3,
        type: 'str',
      },
    ],
  },
  {
    color: 'gold',
    name: 'Cleric',
    skills: [
      {
        name: 'Sacred Flame',
        dmg: 0.4,
        type: 'int',
      },
      {
        name: 'Banishment',
        dmg: 0.5,
        type: 'int',
      },
    ],
  },
  {
    color: 'green',
    name: 'Rogue',
    skills: [
      {
        name: 'Sinister Strike',
        dmg: 0.6,
        type: 'str',
      },
      {
        name: 'Wound Poison',
        dmg: 0.3,
        type: 'int',
      },
    ],
  },
];

const size = (size: number) => size * 4;

export const human: Race = {
  width: size(4),
  height: size(5),
  name: 'Human',
  stats: {
    hp: 3,
    str: 4,
    int: 4,
    def: 4,
    stamina: 3,
  },
  skills: [
    {
      name: 'Struggle',
      dmg: 0.1,
      type: 'str',
    },
  ],
  sprite: [
    [0, 1, 1, 0],
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
  ],
};

export const races: Race[] = [
  human,
  {
    width: size(5),
    height: size(8),
    sprite: [
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [0, 1, 0, 1, 0],
    ],
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
        dmg: 0.3,
        type: 'str',
      },
    ],
  },
  {
    width: size(5),
    height: size(4),
    sprite: [
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
    ],
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
        dmg: 0.2,
        type: 'str',
      },
    ],
  },
  {
    width: size(4),
    height: size(7),
    sprite: [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
    ],
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
        type: 'int',
      },
    ],
  },
];
