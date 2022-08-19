import { UiElement, UiElementProps } from './ui';
import { Monster } from './types';

type GameUiProps = UiElementProps & {
  monster: Monster;
};

export class GameUi extends UiElement {
  constructor(props: GameUiProps) {
    super(props);
    this.rootElement.style.display = 'flex';

    [props.monster.race.skills, props.monster.class.skills].flat().forEach((skill) => {
      const button = document.createElement('button');
      button.style.flex = '1';
      button.textContent = skill.name;
      this.rootElement.appendChild(button);
    });
  }
}
