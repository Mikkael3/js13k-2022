export type UiElementProps = {
  x: number;
  y: number;
  z?: number;
  height: number;
  width: number;
  color?: string;
  canvas?: HTMLCanvasElement;
};

export class UiElement {
  public rootElement: HTMLDivElement;
  public children: UiElement[] = [];
  public rendered = false;
  public canvas?: HTMLCanvasElement;
  public width: number;
  public height: number;
  public x: number;
  public y: number;

  constructor({ canvas, y, x, width, height, z = 100, color = 'white' }: UiElementProps) {
    this.rootElement = document.createElement('div');

    this.canvas = canvas;
    this.y = y;
    this.x = x;
    this.width = width;
    this.height = height;

    this.rootElement.style.zIndex = `${z}`;
    this.rootElement.style.background = color;
    this.rootElement.style.position = 'fixed';
    this.rootElement.style.overflow = 'hidden';
    this.fitElement();
  }

  fitElement = () => {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.rootElement.style.width = `${rect.width * this.width}px`;
    this.rootElement.style.height = `${rect.height * this.height}px`;

    this.rootElement.style.top = `${rect.y + rect.height * this.y}px`;
    this.rootElement.style.left = `${rect.x + rect.width * this.x}px`;
  };

  // This is not the same as GameObject's render. Don't call this every frame.
  render() {
    document.body.appendChild(this.rootElement);
    this.rendered = true;
  }

  unrender() {
    this.rootElement.remove();
    this.rendered = false;
  }

  update() {
    if (this.rendered) this.fitElement();
    this.children.forEach((child) => child.update());
  }
}
