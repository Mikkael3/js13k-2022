import { UiElement, UiElementProps } from './ui';

import { story } from './story';

type StoryProps = UiElementProps;

export class StoryBox extends UiElement {
  textElement: HTMLParagraphElement;
  continueElement: HTMLParagraphElement;
  text: string;
  lastBlink = performance.now();
  storyIndex = 0;
  dc = 'magenta';
  color = this.dc;

  constructor(props: StoryProps) {
    super(props);
    this.text = story[0] as string;
    const s = this.rootElement.style;
    this.textElement = document.createElement('p');
    this.textElement.textContent = this.text;
    this.rootElement.appendChild(this.textElement);
    this.continueElement = document.createElement('p');
    this.rootElement.appendChild(this.continueElement);
    s.color = this.color;
    s.padding = '1vmin';
    this.rootElement.onclick = () => {
      const handleEvent = () => {
        const storyEvent = story[++this.storyIndex];
        this.color = this.dc;
        if (typeof storyEvent === 'string') {
          this.text = storyEvent;
        } else if (typeof storyEvent === 'function') {
          storyEvent();
          handleEvent();
        } else {
          this.text = storyEvent.text;
          this.color = storyEvent.color;
        }
        s.color = this.color;
      };
      handleEvent();
    };
  }

  update() {
    super.update();
    if (performance.now() - this.lastBlink > 300) {
      this.lastBlink = performance.now();
      this.continueElement.textContent = this.continueElement.textContent
        ? ''
        : 'Click to Continue';
    }
    this.textElement.textContent = this.text;
  }
}
