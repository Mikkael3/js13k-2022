import { MonsterC } from './monster';
import { Skill } from './types';
import { UiElement } from './ui';
import gameState from './game-state';
import { getCanvas } from 'kontra';

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
      died.rootElement.style.justifyContent = 'center';
      died.rootElement.style.alignItems = 'center';
      gameState.gameUi.battleManager.battleEnded = true;
      died.render();
      setTimeout(() => {
        gameState.restartRounds();
        this.launchRestart = true;
        died.unrender();
      }, 2500);
    }
  }
}
