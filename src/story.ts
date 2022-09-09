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
  startGame: (): void => {
    throw 'no start game';
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
  // todo show broken house. zoom out
  () => storyTransitions.brokenHouse(),
  'But then came the misfortune. Goblins attacked us.',
  "I was too late. I couldn't save anyone.",
  'The bloodied goblin rose. He wanted my life.',
  () => {
    console.log('start intro fight now');
  },
  "Oh no. I didn't mean to. Even if you killed my parents.",
  "I don't want you to die. I will save your life. I'll trade my own.",
  'But why am I a goblin now.',
  'They left me for dead.',
  'Oh no. What should I do.',
  'I must take revenge!',
  "No, I don't want to kill.",
  'You just have to save them. Like you saved me.',
  'Yes, I want to help! I want to save.',
];
