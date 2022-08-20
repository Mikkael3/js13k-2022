import { UiElement, UiElementProps } from './ui';

import { Monster } from './types';

type Props = UiElementProps & { monster?: Monster };

/** Ui to show monster stats */
export class MonsterBox extends UiElement {
  monster?: Monster;

  constructor(props: Props) {
    super(props);
    this.rootElement.style.display = 'flex';
    this.rootElement.style.flexFlow = 'columnn';
  }

  setMonster(monster?: Monster) {
    if (!monster) this.unrender();
    else this.render();
    this.monster = monster;
    this.setText();
  }

  setText() {
    this.rootElement.innerHTML = '';
    if (!this.monster) return;
    this.addText(this.monster.race.name);
    this.addText(this.monster.class.name);
    this.addText(this.monster.race.stats.hp + '');
  }

  addText(text: string) {
    const race = document.createElement('div');
    race.textContent = text;
    this.rootElement.appendChild(race);
    race.style.flex = '1';
    race.style.textAlign = 'center';
  }

  update(): void {
    super.update();
  }
}
