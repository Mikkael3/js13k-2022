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
  width: 4,
  sprite: '01101111011011111001',
};

export const races: RaceProps[] = [
  human,
  {
    name: 'Gargoyle',
    width: 5,
    sprite: '1101111111011101111110001110111101101010',
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
    width: 5,
    sprite: '01110101011111110001',
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
    width: 7,
    sprite: '00111001011101011111000111000001000010101001111100010100',
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
    width: 8,
    sprite:
      '0010001000110110001111000001100000011000011111100101101001011010000110000001100000011000',
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
    width: 7,
    sprite: '000110000111000001000011111010010100101010100100100101000010111',
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
    width: 9,
    sprite: '000001000000010000000010000000111000001111100011111111011111110111111110',
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
    width: 7,
    sprite: '011111001010100111110000100011111110001000111111100010000001000011011001000100100010',
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
  width: 13,
  sprite:
    '00011000110000011111111100001010101010000101111101000010111110100001000100010011100111001110110011100110000011111000000001111100000001111111000001111111110000000101000000000010100000',
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
