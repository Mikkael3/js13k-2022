import { Monster, Skill } from './types';
import { UiElement, UiElementProps } from './ui';

import { BattleManager } from './battle-manager';
import { MonsterC } from './monster';
import { gameState } from './game-state';

type GameUiProps = UiElementProps & {
  monster: Monster;
  battleManager: BattleManager;
};

export class GameUi extends UiElement {
  battleManager: BattleManager;
  monster?: MonsterC;

  constructor(props: GameUiProps) {
    super(props);
    this.battleManager = props.battleManager;
    this.rootElement.style.display = 'flex';

    // [props.monster.race.skills, props.monster.class.skills].flat().forEach((skill) => {
    // this.renderUi(skill);
    // });
  }

  changeSkills(skills: Skill[]): void {
    this.rootElement.innerHTML = '';
    skills.forEach((skill) => {
      // Skill buttons
      const button = document.createElement('button');
      button.onclick = () => {
        this.battleManager.useSkill(skill);
      };
      button.style.flex = '1';
      button.textContent = skill.name;
      this.rootElement.appendChild(button);
    });
  }

  update() {
    super.update();
    if (this.monster !== this.battleManager.getMonsterOpponent()) {
      this.monster = this.battleManager.getMonsterOpponent();
      if (this.monster) {
        this.render();
        this.changeSkills(gameState.player?.getSkills() || []);
      } else {
        this.unrender();
        this.rootElement.innerHTML = '';
      }
    }
  }
}
