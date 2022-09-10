import { ClassProps, RaceProps, Skill } from './types';

export const skills: Record<string, Partial<Skill>> = {
  // start of str moves
  struggle: {
    name: 'Struggle',
    value: 5,
    type: 'str',
    cost: 0,
  },
  stumble: {
    name: 'Stumble',
    value: 10,
    type: 'str',
    cost: 1,
  },
  pound: {
    name: 'Pound',
    value: 15,
    type: 'str',
    cost: 0,
  },
  scratch: {
    name: 'scratch',
    value: 20,
    type: 'str',
    cost: 1,
  },
  dig: {
    name: 'Dig',
    value: 25,
    type: 'str',
    cost: 1,
  },
  cleave: {
    name: 'Cleave',
    value: 30,
    type: 'str',
    cost: 2,
  },
  claw: {
    name: 'Claw',
    value: 35,
    type: 'str',
    cost: 2,
  },
  shatteredBottle: {
    name: 'Shattered Bottle',
    value: 40,
    type: 'str',
    cost: 3,
  },
  bash: {
    name: 'Bash',
    value: 45,
    type: 'str',
    cost: 3,
  },
  sinisterStrike: {
    name: 'Sinister Strike',
    value: 60,
    type: 'str',
    cost: 5,
  },
  stomp: {
    name: 'Stomp',
    value: 75,
    type: 'str',
    cost: 5,
  },
  /// Start of int moves
  hustle: {
    name: 'Hustle',
    value: 10,
    type: 'int',
    cost: 0,
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
  // start of fixed moves
  ooze: {
    name: 'Ooze',
    type: 'fixed',
    value: 5,
    cost: 1,
  },
  kill: {
    name: 'kill',
    value: 100,
    type: 'fixed',
    cost: 0,
  },
  // start of boosts
  drool: {
    name: 'drool',
    type: 'boost',
    effect: 'str',
    value: 1,
    cost: 1,
  },
  fury: {
    name: 'Fury',
    type: 'boost',
    value: 2,
    effect: 'str',
    cost: 2,
  },
  innerStr: {
    name: 'Inner Strength',
    type: 'boost',
    value: 3,
    effect: 'str',
    cost: 3,
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
    cost: 1,
  },
  //start of statuses
  osteoporosis: {
    name: 'Osteoporosis',
    type: 'status',
    value: -3,
    effect: 'def',
    cost: 3,
  },
  backstab: {
    name: 'Backstab',
    type: 'status',
    value: -2,
    effect: 'int',
    cost: 3,
  },
  cry: {
    name: 'cry',
    value: -1,
    type: 'status',
    effect: 'def',
    cost: 1,
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
    cost: 1,
  },
  bandage: {
    name: 'Bandages',
    type: 'status',
    value: -3,
    effect: 'str',
    cost: 3,
  },
};

export const kid: ClassProps = {
  color: 'yellow',
  name: 'Kid',
  skills: [skills.cry, skills.drool, skills.scratch, skills.kill],
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
    name: 'Rocket Scientist',
    skills: [skills.scienceMagazine, skills.hustle, skills.startingConversation],
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
  skills: [skills.struggle],
  width: 4,
  sprite: '01101111011011111001',
};

export const goblin: RaceProps = {
  name: 'Goblin',
  stats: {
    hp: 2,
    str: 3,
    int: 1,
    def: 5,
    stamina: 4,
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
    str: 1,
    int: 4,
    def: 0,
    stamina: 1,
  },
  skills: [skills.hold],
};

export const races: RaceProps[] = [
  goblin,
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
      int: 1,
      def: 4,
      stamina: 2,
    },
    skills: [skills.stomp],
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
    skills: [skills.bandage],
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
    skills: [skills.ooze],
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
    skills: [skills.osteoporosis],
  },
];
