import { BaseStats, Monster, StatNames } from './types';

import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { UiElementProps } from './ui';
import { setStyles } from './elements';

type Props = UiElementProps & { monster?: Monster };

export class PlayerBox extends MonsterBox {
  constructor(props: Props) {
    super(props);
    setStyles(this.rootElement);
  }

  setMonster(monster?: MonsterC) {
    super.setMonster(monster);
    const stats = document.createElement('div');
    stats.style.flex = '1';
    stats.style.display = 'flex';
    stats.style.flexDirection = 'column';
    this.rootElement.appendChild(stats);
    this.addStat('str', stats);
    this.addStat('int', stats);
    this.addStat('def', stats);
    this.addStat('stamina', stats);
  }

  addStat(statName: keyof BaseStats, container: HTMLElement) {
    const stat = document.createElement('span');
    stat.style.flex = '1';
    stat.style.fontSize = '1.5vmin';
    stat.textContent = StatNames[statName] + ': ' + this.monster?.stats[statName] + '';
    container.appendChild(stat);
  }
}
