import { MonsterBox } from './monster-box';
import { UiElementProps } from './ui';
import {BaseStats, Monster, StatNames} from './types';
import { MonsterC } from './monster';

type Props = UiElementProps & { monster?: Monster };

export class PlayerBox extends MonsterBox {
  constructor(props: Props) {
    super(props);
    // this.rootElement.style.display = 'flex';
    // this.rootElement.style.flexDirection = 'column';
  }

  setMonster(monster?: MonsterC) {
    console.log('rendering playerbox');
    super.setMonster(monster);
    const stats = document.createElement('div');
    stats.style.display = 'flex';
    stats.style.flexDirection = 'column';
    this.rootElement.appendChild(stats);
    this.addStat('hp', stats);
    this.addStat('str', stats);
    this.addStat('int', stats);
    this.addStat('def', stats);
  }

  addStat(statName: keyof BaseStats, container: HTMLElement) {
    const stat = document.createElement('span');
    stat.textContent = StatNames[statName] + ': ' +  this.monster?.stats[statName] + '';
    container.appendChild(stat);
  }
}
