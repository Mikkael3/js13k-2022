import { Monster, Skill } from './types';
import { UiElement, UiElementProps } from './ui';

import { BattleManager } from './battle-manager';
import gameState from './game-state';
import { MonsterC } from './monster';
import { getButton } from './elements';

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
  }

  changeSkills(skills: Skill[]): void {
    this.rootElement.innerHTML = '';
    skills.forEach((skill) => {
      // Skill buttons
      const button = getButton(skill.name);
      if (skill.type === 'str') button.style.color = 'red';
      if (skill.type === 'int') button.style.color = 'blue';
      if (skill.type === 'status') button.style.color = 'violet';
      if (skill.type === 'boost') button.style.color = 'green';
      const span = document.createElement('span');
      span.textContent = `Cost: ${skill.cost}`;
      button.appendChild(span);
      button.style.flex = '1';

      button.onclick = () => {
        this.battleManager.useSkill(skill, this);
      };

      this.rootElement.appendChild(button);
    });
  }

  update() {
    super.update();
    if (this.monster !== this.battleManager.monOp) {
      this.monster = this.battleManager.monOp;
      if (this.monster) {
        this.render();
        this.changeSkills(gameState.player.getSkills() || []);
      } else {
        this.unrender();
        this.rootElement.innerHTML = '';
      }
    }
  }
}
