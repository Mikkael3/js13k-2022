import { Monster, Skill } from './types';
import { UiElement, UiElementProps } from './ui';

import { BattleManager } from './battle-manager';
import { GameState } from './game-state';
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
      button.style.flex = '1';

      button.onclick = () => {
        this.battleManager.useSkill(skill, this);
      };

      this.rootElement.appendChild(button);
    });
  }

  update() {
    super.update();
    if (this.monster !== this.battleManager.getMonsterOpponent()) {
      this.monster = this.battleManager.getMonsterOpponent();
      if (this.monster) {
        this.render();
        this.changeSkills(GameState.instance.player.getSkills() || []);
      } else {
        this.unrender();
        this.rootElement.innerHTML = '';
      }
    }
  }
}
