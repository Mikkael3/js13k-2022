import { UiElement, UiElementProps } from './ui';

import { Monster } from './types';

type Props = UiElementProps & { monster: Monster };

export class MonsterBox extends UiElement {
  constructor(props: Props) {
    super(props);
    const button = document.createElement('button');
    button.textContent = props.monster.race.name;
    this.rootElement.appendChild(button);
  }
}
