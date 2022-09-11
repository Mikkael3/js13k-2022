import { Monster, StatNames, StatStages } from './types';
import { UiElement, UiElementProps } from './ui';

import { MonsterBox } from './monster-box';
import { MonsterC } from './monster';
import { setStyles } from './elements';

type Props = UiElementProps & { monster?: Monster };

export class PlayerBox extends MonsterBox {
  stats: UiElement;
  constructor(props: Props) {
    super(props);
    this.stats = new UiElement({
      ...props,
      y: 0.76,
      height: 0.1,
    });
    this.stats.render();
    setStyles(this.stats.rootElement);
    this.stats.rootElement.style.fontSize = '1.5vmin';
  }

  setMonster(monster?: MonsterC) {
    super.setMonster(monster);
  }

  handleStats() {
    const mon = this.monster;
    if (!mon) return;
    const stat = document.createElement('div');
    stat.style.display = 'grid';
    stat.style.height = '100%';
    stat.style.textAlign = 'center';
    stat.style.gridTemplateColumns = '1fr 1fr';
    ['str', 'int', 'def', 'wp'].forEach((k) => {
      const key = k as keyof StatStages;
      const s = document.createElement('div');
      const l = document.createElement('div');
      const v = document.createElement('div');
      l.textContent = `${StatNames[key]}`;
      v.textContent = `${mon.stats[key]} ${mon.statStages[key] > 0 ? '+' : ''}${
        mon.statStages[key] === 0 ? '' : mon.statStages[key]
      }`;
      s.appendChild(l);
      s.appendChild(v);
      stat.appendChild(s);
    });
    this.stats.rootElement.innerHTML = '';
    this.stats.rootElement.appendChild(stat);
  }
  update() {
    super.update();
    this.stats.update();

    this.handleStats();
  }
}
