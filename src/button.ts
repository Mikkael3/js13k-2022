import { UiElement, UiElementProps } from './ui';

type ButtonProps = UiElementProps & {
  text: string;
};
export class Button extends UiElement {
  constructor(props: ButtonProps) {
    super(props);
    const button = document.createElement('button');
    button.textContent = props.text;
    this.rootElement.appendChild(button);
  }
}
