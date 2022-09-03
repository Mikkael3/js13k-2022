import { UiElement, UiElementProps } from './ui';

import { Monster } from './types';
import { MonsterC } from './monster';

type Props = UiElementProps & { monster?: Monster };

/** Ui to show monster stats */
export class MonsterBox extends UiElement {
  monster?: MonsterC;

  constructor(props: Props) {
    super(props);
  }

  setMonster(monster?: MonsterC) {
    if (!monster) this.unrender();
    else this.render();
    this.monster = monster;
    const container = document.createElement('div');
    container.style.display = 'flex';
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(container);
    this.setText(container);
  }

  setText(container: HTMLElement) {
    if (!this.monster) return;
    this.addText(this.monster.monsterData.race.name, container);
    this.addText(this.monster.monsterData.class.name, container);
    this.addText(this.monster.stats.hp + '', container);
  }

  addText(text: string, container: HTMLElement) {
    const race = document.createElement('div');
    container.appendChild(race);
    race.textContent = text;
    race.style.flex = '1';
    race.style.textAlign = 'center';
  }

  update(): void {
    super.update();
  }
}
