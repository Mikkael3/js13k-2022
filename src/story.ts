export const storyTransitions = {
  zoom: (): void => {
    throw 'little zoom scene missing';
  },
  extraZoom: (): void => {
    throw 'extra close scene missing';
  },
  brokenHouse: (): void => {
    throw 'broken house missing';
  },
  doorZoom: (): void => {
    throw 'broken door zoom missing';
  },
  blackness: (): void => {
    throw 'blackness scene missing';
  },
  introBattle: (): void => {
    throw 'intro scene missing';
  },
  startGame: (): void => {
    throw 'no start game';
  },
  becomeGoblin: (): void => {
    throw 'no become goblin scene';
  },
};

export const story = [
  "I'm just a little girl, helpful and kind.",
  () => storyTransitions.startGame(),
  'Life is always fun, every day is nice.',
  () => storyTransitions.zoom(),
  'Helping others is what I love to do.',
  'I have a little secret. I can trade my life for another.',
  () => storyTransitions.extraZoom(),
  "It's my dearest dream. To save a life, even if it costs my own.",
  () => storyTransitions.brokenHouse(),
  'But then came the misfortune. Goblins attacked us.',
  () => storyTransitions.doorZoom(),
  "I was too late. I couldn't save anyone.",
  () => storyTransitions.blackness(),
  'A bloodied goblin rose. He wanted my life.',
  () => storyTransitions.introBattle(),
  "Oh no. I didn't mean to. Even if you killed my parents.",
  "I don't want you to die. I will save your life. I'll trade my own.",
  () => storyTransitions.becomeGoblin(),
  'But why am I a goblin now.',
  { text: 'They left me for dead.', color: 'red' },
  'Oh no. What should I do.',
  { text: 'I must take revenge!', color: 'red' },
  "No, I don't want to kill.",
  { text: 'You just have to save them. Like you "saved" me.', color: 'red' },
  'Yes, I must help! I must save.',
];
