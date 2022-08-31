import { Class, ClassProps, RaceProps } from './types';

export const kid: Class = {
  color: 'yellow',
  name: 'Kid',
  skills: [
    {
      name: 'cry',
      dmg: 100,
      type: 'fixed',
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

export const classes: ClassProps[] = [
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
        dmg: 0.2,
        type: 'str',
      },
      {
        name: 'Fury',
        type: 'boost',
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
      {
        name: 'Blessing',
        type: 'boost',
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
      {
        name: 'Backstab',
        type: 'status',
      },
    ],
  },
];

export const human: RaceProps = {
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

export const races: RaceProps[] = [
  human,
  {
    name: 'Gargoyle',
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
    name: 'Dwarf',
    sprite: [
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
    ],
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
    name: 'Vampire',
    sprite: [
      [0, 0, 1, 1, 1, 0, 0],
      [1, 0, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 1, 0, 0],
    ],
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
        type: 'status',
      },
    ],
  },
  {
    name: 'Minotaur',
    sprite: [
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ],
    stats: {
      hp: 6,
      str: 10,
      int: 1,
      def: 4,
      stamina: 2,
    },
    skills: [
      {
        name: 'Stomp',
        dmg: 0.75,
        type: 'str',
      },
    ],
  },
  {
    name: 'Mummy',
    sprite: [
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0],
      [1, 0, 0, 1, 0, 0, 1],
      [0, 0, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1],
    ],
    stats: {
      hp: 6,
      str: 2,
      int: 2,
      def: 7,
      stamina: 4,
    },
    skills: [
      {
        name: 'Bandages',
        type: 'status',
      },
    ],
  },
  {
    name: 'Slime',
    sprite: [
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 0],
    ],
    stats: {
      hp: 2,
      str: 2,
      int: 2,
      def: 2,
      stamina: 2,
    },
    skills: [
      {
        name: 'Ooze',
        type: 'fixed',
        dmg: 2,
      },
    ],
  },
  {
    name: 'Skeleton',
    sprite: [
      [0, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0],
    ],
    stats: {
      hp: 5,
      str: 5,
      int: 3,
      def: 6,
      stamina: 4,
    },
    skills: [
      {
        name: 'Osteoporosis',
        type: 'status',
      },
    ],
  },
];
