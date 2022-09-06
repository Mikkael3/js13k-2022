import { UiElement, UiElementProps } from './ui';

import { setStyles } from './elements';

export class BattleLog extends UiElement {
  constructor(props: UiElementProps) {
    super(props);
    const style = this.rootElement.style;
    setStyles(this.rootElement);
    style.display = 'flex';
    style.flexDirection = 'column';
    style.overflow = 'auto';
    style.boxSizing = 'border-box';
  }

  addLine(text: string) {
    const textLine = document.createElement('p');
    textLine.style.border = '0.25vh dotted black';
    textLine.textContent = text;
    textLine.style.margin = '1px';
    this.rootElement.prepend(textLine);
  }

  update(): void {
    super.update();
  }
}
