import { Sprite, SpriteClass, getCanvas } from 'kontra';

type Props = Partial<Sprite>;

export class GameSprite extends SpriteClass {
  //canvas-scaling
  canvasX: number;
  canvasY: number;
  canvasWidth: number;
  canvasHeight: number;
  canvasRadius: number;

  constructor(props: Props) {
    super({
      ...props,
    });

    this.canvasX = props.x ?? 0;
    this.canvasY = props.y ?? 0;
    this.canvasWidth = props.width ?? 0;
    this.canvasHeight = props.height ?? 0;
    this.canvasRadius = props.radius ?? 0;
  }

  updateCanvasY(delta: number) {
    this.canvasY += delta;
    this.y = this.canvasY * getCanvas().height;
  }

  updateCanvasX(delta: number) {
    this.canvasX += delta;
    this.x = this.canvasX * getCanvas().width;
  }

  recalculateCanvas() {
    this.height = this.canvasHeight * getCanvas().height;
    this.width = this.canvasWidth * getCanvas().width;
    this.radius = this.canvasRadius * getCanvas().width;
    this.updateCanvasX(0);
    this.updateCanvasY(0);
  }
}
