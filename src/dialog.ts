import { UiElement, UiElementProps } from './ui';

type Option = {
  title: string;
  handler: (e: Dialog) => () => void;
};

type Props = UiElementProps & { options: Option[]; text: string };

export class Dialog extends UiElement {
  options: Option[];
  text: string;

  constructor(props: Props) {
    super(props);
    this.rootElement.style.display = 'flex';
    this.rootElement.style.flexFlow = 'column';
    this.options = props.options;
    this.text = props.text;
    this.setOptions();
  }

  setOptions() {
    this.rootElement.innerHTML = '';

    const text = document.createElement('div');
    text.textContent = this.text;
    this.rootElement.appendChild(text);
    text.style.width = '100%';
    text.style.textAlign = 'center';

    this.options.forEach((option) => this.addOption(option));
  }

  addOption(option: Option) {
    const button = document.createElement('button');
    button.textContent = option.title;
    this.rootElement.appendChild(button);
    button.style.flex = '1';
    button.style.textAlign = 'center';
    button.onclick = option.handler(this);
  }

  update(): void {
    super.update();
  }
}
