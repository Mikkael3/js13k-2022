import { UiElement, UiElementProps } from './ui';

type GameUiProps = UiElementProps;

export class GameUi extends UiElement {
  constructor(props: GameUiProps) {
    super(props);
    const uiElement = new UiElement({
      x: 0,
      y: 1,
      canvas: props.canvas,
      height: 0.1,
      width: 1,
    });
    this.rootElement.appendChild(uiElement.rootElement);
  }
}
