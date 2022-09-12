import { MonsterC } from './monster';
import { Skill } from './types';
import { UiElement } from './ui';
import gameState from './game-state';
import { getCanvas } from 'kontra';
import { story } from './story';

export class Player extends MonsterC {
  // These skills are not shown.
  // The usable skills are in player.monsterData.{class|race}.skills
  skills: Skill[] = [];
  launchRestart = true;
  update(dt: number) {
    super.update(dt);
    if (this.stats.hp <= 0 && this.launchRestart) {
      this.rotation += 0.1;
      this.launchRestart = false;
      const died = new UiElement({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        color: 'black',
        canvas: getCanvas(),
      });
      died.rootElement.textContent = 'You Died. Please try again!';
      died.rootElement.style.fontSize = '4vmin';
      died.rootElement.style.color = 'red';
      died.rootElement.style.display = 'flex';
      died.rootElement.style.alignItems = died.rootElement.style.justifyContent = 'center';

      gameState.gameUi.battleManager.battleEnded = true;
      died.render();
      setTimeout(() => {
        gameState.restartRounds();
        gameState.storyBox.storyIndex = 28;
        gameState.storyBox.text = (story[28] as { text: string }).text;
        gameState.round = 1;
        this.launchRestart = true;
        died.unrender();
      }, 2500);
    }
  }
}
