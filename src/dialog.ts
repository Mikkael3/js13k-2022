import { UiElement, UiElementProps } from './ui';
import { getButton, setStyles } from './elements';

type Option = {
  title: string;
  handler: (e: Dialog) => () => void;
};

type Props = UiElementProps & { options: Option[]; text: string };

/**
 * Box with a title and a list of buttons.
 */
export class Dialog extends UiElement {
  options: Option[];
  text: string;

  constructor(props: Props) {
    super(props);
    this.rootElement.style.display = 'flex';
    this.rootElement.style.flexFlow = 'column';
    this.rootElement.style.backgroundColor = 'transparent';
    this.options = props.options;
    this.text = props.text;
    this.setOptions();
  }

  setOptions() {
    this.rootElement.innerHTML = '';
    const text = document.createElement('div');
    setStyles(text);
    text.textContent = this.text;
    text.style.width = '100%';
    text.style.textAlign = 'center';
    text.style.height = 100 / 8 + '%';
    this.rootElement.appendChild(text);

    this.options.forEach((option) => this.addOption(option));
  }

  addOption(option: Option) {
    const button = getButton(option.title);
    button.style.height = 100 / 8 + '%';
    button.onclick = option.handler(this);
    this.rootElement.appendChild(button);
  }

  update(): void {
    super.update();
  }
}
