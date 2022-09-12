import { UiElement, UiElementProps } from './ui';

import { Monster } from './types';
import { MonsterC } from './monster';
import { setStyles } from './elements';

type Props = UiElementProps & { monster?: Monster };

/** Ui to show monster stats */
export class MonsterBox extends UiElement {
  monster?: MonsterC;
  hpBar: HTMLDivElement;
  container: HTMLDivElement;
  stamina = false;

  constructor(props: Props) {
    super(props);
    setStyles(this.rootElement);
    this.rootElement.style.fontSize = '1.5vmin';
    this.hpBar = document.createElement('div');
    this.container = document.createElement('div');
    this.rootElement.appendChild(this.container);
    this.rootElement.appendChild(this.hpBar);
  }

  setMonster(monster?: MonsterC) {
    if (!monster) this.unrender();
    else this.render();
    this.monster = monster;
    this.container.style.height = '50%';
    this.container.style.display = 'flex';
    this.container.innerHTML = '';
    if (this.monster)
      this.addText(
        `${this.monster.monsterData.class.name} ${this.monster.monsterData.race.name}`,
        this.container,
      );
  }

  addText(text: string, container: HTMLElement) {
    const race = document.createElement('div');
    container.appendChild(race);
    race.textContent = text;
    race.style.flex = '1';
    race.style.textAlign = 'center';
  }

  drawHpBar() {
    if (this.monster) {
      this.hpBar.style.textAlign = 'center';
      this.hpBar.innerHTML = '';
      this.hpBar.textContent = `HP: ${this.monster?.stats.hp} / ${
        this.monster?.monsterData.race.stats.hp * 10
      } ${this.stamina ? 'Sta: ' + this.monster.stats.stamina : ''}`;
    }
  }

  update(): void {
    super.update();
    this.drawHpBar();
  }
}
