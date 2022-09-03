import { UiElement, UiElementProps } from './ui';

export class BattleLog extends UiElement {
  constructor(props: UiElementProps) {
    super(props);
    const style = this.rootElement.style;
    style.border = 'darkgrey solid 0.5vh';
    style.display = 'flex';
    style.flexDirection = 'column';
    style.overflow = 'auto';
    style.boxSizing = 'border-box';
  }

  addLine(text: string) {
    const textLine = document.createElement('p');
    textLine.style.margin = '1px';
    textLine.textContent = text;
    this.rootElement.prepend(textLine);
  }

  update(): void {
    super.update();
  }
}
