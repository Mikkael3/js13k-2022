import { UiElement, UiElementProps } from './ui';

import { MonsterC } from './monster';

type Props = UiElementProps & { monster: MonsterC };

/** Ui to show monster stats */
export class GameInfo extends UiElement {
  monster: MonsterC;

  constructor(props: Props) {
    super(props);
    this.monster = props.monster;
    this.rootElement.style.display = 'flex';
    this.rootElement.style.flexFlow = 'columnn';
    this.render();
  }

  setMonster(monster: MonsterC) {
    this.monster = monster;
    this.setText();
  }

  setText() {
    this.rootElement.innerHTML = '';
    this.addText(this.monster.monsterData.race.name);
    this.addText(this.monster.monsterData.class.name);
    this.addText(this.monster.hp + '');
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
