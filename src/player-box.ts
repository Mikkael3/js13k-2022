import { Monster, StatNames, StatStages } from './types';
import { UiElement, UiElementProps } from './ui';

import { MonsterBox } from './monster-box';
import gameState from './game-state';
import { setStyles } from './elements';

type Props = UiElementProps & { monster?: Monster };

export class PlayerBox extends MonsterBox {
  stats: UiElement;
  round: UiElement;
  constructor(props: Props) {
    super(props);
    this.stats = new UiElement({
      ...props,
      y: 0.76,
      height: 0.14,
    });
    this.round = new UiElement({
      ...props,
      y: 0.66,
      height: 0.04,
    });
    this.stamina = true;
    setStyles(this.stats.rootElement);
    setStyles(this.round.rootElement);
    this.stats.rootElement.style.fontSize = '1.5vmin';
  }

  render(): void {
    super.render();
    this.stats.render();
    this.round.render();
  }

  unrender(): void {
    super.unrender();
    this.stats.unrender();
    this.round.unrender();
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
      if (key === 'str') l.style.color = 'red';
      if (key === 'int') l.style.color = 'blue';
      if (key === 'def') l.style.color = 'red';
      if (key === 'wp') l.style.color = 'blue';
    });
    this.stats.rootElement.innerHTML = '';
    this.stats.rootElement.appendChild(stat);
    this.round.rootElement.innerHTML = '';
    this.round.rootElement.style.textAlign = 'center';
    if (gameState.round) this.round.rootElement.textContent = `Area: ${gameState.round - 1}`;
  }

  update() {
    super.update();
    this.stats.update();
    this.round.update();
    this.handleStats();
  }
}
