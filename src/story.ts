import gameState from './game-state';

export const storyTransitions = {
  zoom: (): void => {
    //pass
  },
  extraZoom: (): void => {
    //pass
  },
  brokenHouse: (): void => {
    //pass
  },
  doorZoom: (): void => {
    //pass
  },
  blackness: (): void => {
    //pass
  },
  introBattle: (): void => {
    //pass
  },
  startGame: (): void => {
    //pass
  },
  becomeGoblin: (): void => {
    //pass
  },
  midBossApproach: (): void => {
    gameState.showMiddleBoss = true;
  },
  resumeFight: (): void => {
    gameState.battleManager.selectForBattle(gameState.monsterSprites[0]);
    gameState.storyBox.unrender();
  },
  // todo generic after battle scene
};

export const story = [
  "I'm just a little girl, helpful and kind.",
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
  { text: "The road is dangerous. There'll be many a monster in need of saving.", color: 'red' },
  () => storyTransitions.startGame(),
  // Next ones after a few rounds normal battles
  // No monsters visible
  { text: "My home is just over yonder. Let's pay my pal Rex a visit.", color: 'red' },
  () => storyTransitions.midBossApproach(),
  // One goblin enemy visible
  { text: 'Hi old pal.', color: 'red' },
  { text: 'Who the fuck are you?', color: 'green' },
  { text: "You left me to die but I was saved. I think you'll need saving as well.", color: 'red' },
  { text: "Seems I'll need to shut up your mad ramblings.", color: 'green' },
  () => storyTransitions.resumeFight(),
  // After fight
  {
    text: 'We were forced to attack humans because our normal hunting grounds were taken over by a weird giant beast.',
    color: 'green',
  },
  "I'll make them stop. I'll save them too!",
  // Chimera
  { text: 'Greetings child.', color: 'white' },
  { text: 'I can see you host a number of souls in your body.', color: 'white' },
  {
    text: 'I once was like you but ultimately souls prefer to hold their original shape.',
    color: 'white',
  },
  { text: 'What happened to me will happen to you, eventually.', color: 'white' },
  { text: "I don't wish such a terrible fate for anyone.", color: 'white' },
  { text: 'I shall set your soul free.', color: 'white' },
  // Final battle start
];
