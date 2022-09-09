import { ClassProps, RaceProps } from './types';

export const kid: ClassProps = {
  color: 'yellow',
  name: 'Kid',
  skills: [
    {
      name: 'cry',
      value: 0.9,
      type: 'status',
      effect: 'def',
    },
    {
      name: 'drool',
      type: 'boost',
      effect: 'str',
      value: 1.1,
    },
    {
      name: 'scratch',
      value: 0.2,
      type: 'str',
    },
    {
      name: 'kill',
      value: 100,
      type: 'fixed',
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
        value: 0.4,
        type: 'str',
      },
      {
        name: 'Cleave',
        value: 0.2,
        type: 'str',
      },
      {
        name: 'Fury',
        type: 'boost',
        value: 1.2,
        effect: 'str',
      },
    ],
  },
  {
    color: 'gold',
    name: 'Cleric',
    skills: [
      {
        name: 'Sacred Flame',
        value: 0.4,
        type: 'int',
      },
      {
        name: 'Banishment',
        value: 0.5,
        type: 'int',
      },
      {
        name: 'Blessing',
        type: 'boost',
        value: 1.2,
        effect: 'hp',
      },
    ],
  },
  {
    color: 'green',
    name: 'Rogue',
    skills: [
      {
        name: 'Sinister Strike',
        value: 0.6,
        type: 'str',
      },
      {
        name: 'Wound Poison',
        value: 0.3,
        type: 'int',
      },
      {
        name: 'Backstab',
        type: 'status',
        value: 0.8,
        effect: 'int',
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
      value: 0.1,
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
        value: 0.3,
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
        value: 0.2,
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
        value: 0.7,
        effect: 'int',
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
        value: 0.75,
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
        value: 0.8,
        effect: 'str',
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
        value: 2,
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
        value: 0.7,
        effect: 'def',
      },
    ],
  },
];

export const girlRace: RaceProps = {
  name: 'Girl',
  sprite: [
    [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  ],
  stats: {
    hp: 2,
    str: 1,
    int: 4,
    def: 0,
    stamina: 1,
  },
  skills: [
    {
      name: 'Hold kitchen knife threateningly',
      type: 'boost',
      value: 0.1,
      effect: 'def',
    },
  ],
};
