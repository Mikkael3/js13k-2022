import { ClassProps, RaceProps, Skill, buildClass, buildRace } from './types';

import { randInt } from 'kontra';

export const skills: Record<string, Partial<Skill>> = {
  // start of str moves
  struggle: {
    name: 'Struggle',
    value: 5,
    cost: 0,
  },
  stumble: {
    name: 'Stumble',
    value: 10,
  },
  pound: {
    name: 'Pound',
    value: 15,
    cost: 0,
  },
  scratch: {
    name: 'scratch',
    value: 20,
  },
  bite: {
    name: 'Bite',
    value: 35,
    cost: 2,
  },
  dig: {
    name: 'Dig',
    value: 25,
  },
  cleave: {
    name: 'Cleave',
    value: 30,
    cost: 2,
  },
  claw: {
    name: 'Claw',
    value: 40,
    cost: 2,
  },
  shatteredBottle: {
    name: 'Shattered Bottle',
    value: 40,
    cost: 3,
  },
  bash: {
    name: 'Bash',
    value: 45,
    cost: 3,
  },
  sinisterStrike: {
    name: 'Sinister Strike',
    value: 60,
    cost: 5,
  },
  stomp: {
    name: 'Stomp',
    value: 75,
    cost: 5,
  },
  /// Start of int moves
  hustle: {
    name: 'Hustle',
    value: 10,
    type: 'int',
    cost: 0,
  },
  badOmen: {
    name: 'Bad omen',
    value: 15,
    type: 'int',
  },
  screech: {
    name: 'Screech',
    value: 25,
    type: 'int',
    cost: 2,
  },
  woundPoison: {
    name: 'Wound Poison',
    value: 30,
    type: 'int',
    cost: 2,
  },
  sacredFlame: {
    name: 'Sacred Flame',
    value: 40,
    type: 'int',
    cost: 3,
  },
  banishment: {
    name: 'Banishment',
    value: 50,
    type: 'int',
    cost: 4,
  },
  startingConversation: {
    name: 'Starting Conversation',
    value: 60,
    type: 'int',
    cost: 5,
  },
  thunderStorm: {
    name: 'Thunderstorm',
    value: 75,
    type: 'int',
    cost: 5,
  },
  // start of fixed moves
  kill: {
    name: 'Ooze',
    type: 'fixed',
    value: 500,
  },
  // start of boosts
  drool: {
    name: 'drool',
    type: 'boost',
    value: 1,
    cost: 2,
  },
  pointlessLife: {
    name: 'Pointless Life',
    type: 'boost',
    value: 2,
  },
  fury: {
    name: 'Fury',
    type: 'boost',
    value: 2,
    cost: 2,
  },
  innerStr: {
    name: 'Inner Strength',
    type: 'boost',
    value: 3,
    cost: 3,
  },
  //wp
  grin: {
    name: 'Grin',
    type: 'boost',
    value: 2,
    effect: 'wp',
    cost: 2,
  },
  rollingStone: {
    name: 'Rolling stone',
    type: 'boost',
    value: 3,
    effect: 'wp',
    cost: 2,
  },
  //int
  scienceMagazine: {
    name: 'Science Magazine',
    type: 'boost',
    value: 3,
    effect: 'int',
    cost: 3,
  },
  //hp
  mindfulness: {
    name: 'Mindfulness',
    type: 'boost',
    value: 1.1,
    effect: 'hp',
    cost: 2,
  },
  heal: {
    name: 'Heal',
    type: 'boost',
    value: 1.15,
    effect: 'hp',
    cost: 2,
  },
  blessing: {
    name: 'Blessing',
    type: 'boost',
    value: 1.2,
    effect: 'hp',
    cost: 3,
  },
  //def
  hold: {
    name: 'Hold kitchen knife threateningly',
    type: 'boost',
    value: 1,
    effect: 'def',
  },
  mudSpin: {
    name: 'Mud spin',
    type: 'boost',
    value: 3,
    effect: 'def',
    cost: 2,
  },
  //start of statuses
  cry: {
    name: 'Cry',
    value: -1,
    type: 'status',
    effect: 'def',
    cost: 2,
  },
  warcry: {
    name: 'Warcry',
    value: -2,
    type: 'status',
    effect: 'def',
    cost: 2,
  },
  osteoporosis: {
    name: 'Osteoporosis',
    type: 'status',
    value: -3,
    effect: 'def',
    cost: 3,
  },
  pathfind: {
    name: 'Pathding',
    type: 'status',
    value: -1,
    effect: 'wp',
  },
  spook: {
    name: 'Spook',
    type: 'status',
    value: -3,
    effect: 'wp',
    cost: 3,
  },
  backstab: {
    name: 'Backstab',
    type: 'status',
    value: -2,
    effect: 'int',
    cost: 3,
  },
  serveDrink: {
    name: 'Serve Drink',
    type: 'status',
    value: -2,
    effect: 'int',
    cost: 2,
  },
  hypnotic: {
    name: 'Hypnotic Magnetic Glare',
    type: 'status',
    value: -3,
    effect: 'int',
    cost: 3,
  },
  smallTalk: {
    name: 'Small talk',
    type: 'status',
    value: -1,
    effect: 'str',
  },
  bandage: {
    name: 'Bandages',
    type: 'status',
    value: -3,
    cost: 3,
  },
};

export const kid: ClassProps = {
  color: 'yellow',
  name: 'Kid',
  skills: [skills.cry, skills.drool, skills.scratch],
};

export const classes: ClassProps[] = [
  kid,
  {
    color: 'red',
    name: 'Barbarian',
    skills: [skills.cleave, skills.bash, skills.fury],
  },
  {
    color: 'gold',
    name: 'Cleric',
    skills: [skills.sacredFlame, skills.blessing, skills.banishment],
  },
  {
    color: 'green',
    name: 'Rogue',
    skills: [skills.sinisterStrike, skills.woundPoison, skills.backstab],
  },
  {
    color: 'blue',
    name: 'Monk',
    skills: [skills.pound, skills.mindfulness, skills.innerStr],
  },
  {
    color: 'violet',
    name: 'Bartender',
    skills: [skills.serveDrink, skills.shatteredBottle, skills.smallTalk],
  },
  {
    color: 'cyan',
    name: 'Scientist',
    skills: [skills.scienceMagazine, skills.hustle, skills.startingConversation],
  },
];

export const human: RaceProps = {
  name: 'Human',
  stats: {
    hp: 3,
    str: 3,
    int: 3,
    def: 2,
    stamina: 3,
    wp: 2,
  },
  skills: [skills.struggle],
  width: 7,
  sprite: '00111000111110110101101111100111110001110011111111011101101110100101000110110',
};

export const goblin: RaceProps = {
  name: 'Goblin',
  stats: {
    hp: 2,
    str: 3,
    def: 3,
    stamina: 4,
    wp: 2,
  },
  skills: [skills.stumble],
  width: 4,
  sprite: '00101111010011111001',
};

export const girlRace: RaceProps = {
  name: 'Girl',
  width: 13,
  sprite:
    '00011000110000011111111100001010101010000101111101000010111110100001000100010011100111001110110011100110000011111000000001111100000001111111000001111111110000000101000000000010100000',
  stats: {
    hp: 2,
    int: 4,
    def: 0,
  },
  skills: [skills.hold],
};

export const entryRaces: RaceProps[] = [
  goblin,
  human,
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
      wp: 2,
    },
    skills: [skills.ooze],
  },
  {
    name: 'Rat',
    width: 7,
    sprite: '100111111111100001010',
    stats: {
      str: 5,
      def: 3,
      stamina: 3,
      wp: 3,
    },
    skills: [skills.bite],
  },
  {
    name: 'Bat',
    width: 9,
    sprite: '010111010101111101',
    stats: {
      int: 5,
      def: 3,
      stamina: 3,
      wp: 3,
    },
    skills: [skills.screech],
  },
  {
    name: 'Dhalion',
    width: 7,
    sprite: '00001100000010000011000010100011110000011100011110011110011111100100010111011',
    stats: {
      hp: 5,
      def: 3,
      stamina: 3,
      wp: 3,
    },
    skills: [skills.heal],
  },
  {
    name: 'Elf',
    width: 9,
    sprite: '000111000111111111001111100000010000001111100001010100001010100000101000000101000',
    stats: {
      hp: 3,
      str: 3,
      int: 3,
      def: 2,
      stamina: 2,
      wp: 5,
    },
    skills: [skills.pathfind],
  },
  {
    name: 'Ipotane',
    width: 5,
    sprite: '100001111111111100101001011011',
    stats: {
      str: 5,
      int: 5,
      stamina: 5,
    },
    skills: [skills.pointlessLife],
  },
  {
    name: 'Imp',
    width: 7,
    sprite: '001110010111010101010001110100111110010100',
    stats: {
      hp: 2,
      str: 2,
      int: 2,
      stamina: 5,
      wp: 5,
    },
    skills: [skills.grin],
  },
  {
    name: 'Spider',
    width: 9,
    sprite: '001000100001010100111111111011111110101010101001000100',
    stats: {
      hp: 2,
      str: 2,
      int: 3,
      def: 5,
      stamina: 2,
    },
    skills: [skills.badOmen],
  },
];

export const advancedRaces: RaceProps[] = [
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
      wp: 3,
    },
    skills: [skills.claw],
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
      wp: 4,
    },
    skills: [skills.dig],
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
      wp: 6,
    },
    skills: [skills.hypnotic],
  },
  {
    name: 'Minotaur',
    width: 8,
    sprite:
      '0010001000110110001111000001100000011000011111100101101001011010000110000001100000011000',
    stats: {
      hp: 6,
      str: 10,
      def: 4,
      stamina: 2,
      wp: 2,
    },
    skills: [skills.stomp],
  },
  {
    name: 'Mummy',
    width: 7,
    sprite: '000110000111000001000011111010010100101010100100100101000010111',
    stats: {
      hp: 6,
      str: 3,
      int: 3,
      def: 7,
      stamina: 4,
      wp: 7,
    },
    skills: [skills.bandage],
  },
  {
    name: 'Skeleton',
    width: 7,
    sprite: '011111001010100111110000100011111110001000111111100010000001000011011001000100100010',
    stats: {
      hp: 5,
      str: 5,
      int: 3,
      def: 7,
      stamina: 4,
      wp: 4,
    },
    skills: [skills.osteoporosis],
  },
  {
    name: 'Ghost',
    width: 5,
    sprite: '011101111110101111111111110101',
    stats: {
      hp: 5,
      int: 5,
      def: 3,
      stamina: 5,
      wp: 10,
    },
    skills: [skills.spook],
  },
  {
    name: 'Varaha',
    width: 7,
    sprite: '001001000111100101101011111100011000111111111111000111100011110001001000100100',
    stats: {
      hp: 10,
      str: 5,
      def: 5,
      stamina: 5,
      wp: 4,
    },
    skills: [skills.mudSpin],
  },
  {
    name: 'Roc',
    width: 11,
    sprite:
      '100000000001100000000001000000001011011100110010100011000111111100000011000011100110011001111111100',
    stats: {
      hp: 7,
      str: 5,
      int: 10,
      def: 5,
      stamina: 3,
      wp: 5,
    },
    skills: [skills.thunderStorm],
  },
  {
    name: 'Troll',
    width: 6,
    sprite: '100000110011100011100111100111111111000101',
    stats: {
      hp: 10,
      str: 3,
      int: 3,
      def: 7,
      stamina: 5,
      wp: 7,
    },
    skills: [skills.rollingStone],
  },
];

const lord: ClassProps = {
  name: 'Lord',
  color: 'black',
  skills: [
    {
      name: 'Ultimate Attack',
      type: 'random',
    },
  ],
};

const chimera: RaceProps = {
  name: 'Chimera',
  stats: {
    hp: 10,
    str: 10,
    int: 10,
    wp: 10,
    def: 10,
    stamina: 10,
  },
  width: 40,
  sprite: Array.from(Array(800))
    .map(() => [0, 1][randInt(0, 1)])
    .join(),
};

export const lordChimera = {
  race: buildRace(chimera),
  class: buildClass(lord),
  level: 10,
};

export const starterGoblin = {
  race: buildRace(goblin),
  class: { ...buildClass(kid), color: 'silver', name: 'Reborn' },
  level: 1,
};

const hobgoblin: RaceProps = {
  name: 'Hobgoblin',
  stats: {
    hp: 5,
    str: 5,
    int: 5,
    wp: 5,
    def: 5,
    stamina: 5,
  },
  width: 7,
  sprite: '11111111111111110101101111100111110001110011111111011101101110100101001110111',
  skills: [skills.warcry],
};

const rex: ClassProps = {
  name: 'Rex',
  color: 'vermillion',
  skills: [skills.bash, skills.fury, skills.pound],
};

export const rexHobgoblin = {
  race: buildRace(hobgoblin),
  class: { ...buildClass(rex) },
  level: 5,
};
