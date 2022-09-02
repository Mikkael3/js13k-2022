import { UiElement, UiElementProps } from './ui';

export class BattleLog extends UiElement {
  constructor(props: UiElementProps) {
    super(props);
    this.rootElement.style.outline = 'gray solid 2px';
    this.rootElement.style.display = 'flex';
    this.rootElement.style.flexDirection = 'column';
    this.rootElement.style.overflow = 'auto';
  }

  addLine(text: string) {
    const textLine = document.createElement('p');
    textLine.textContent = text;
    this.rootElement.prepend(textLine);
  }

  update(): void {
    super.update();
  }
}
