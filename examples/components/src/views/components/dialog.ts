import { ViewComponent, Witcase } from 'witcase';

import { PixiEngine } from '../../pixi_engine';

const dialog = require('../../assets/images/dialog.png');
const close_button = require('../../assets/images/close_button.png');

Witcase.preload<PixiEngine>((engine: PixiEngine) => {
  engine.load('dialog', dialog);
  engine.load('close_button', close_button);
});

export class Dialog extends ViewComponent<PixiEngine> {
  private group: PIXI.Container;

  constructor(private text: string){
    super();
  };

  public create() {
    this.group = new PIXI.Container();

    this.engine.app.stage.addChild(this.group);
    this.group.visible = false;
    const dialog = new PIXI.Sprite(this.engine.loader.resources.dialog.texture);
    dialog.x = 100;
    dialog.y = 100;

    this.group.addChild(dialog);

    const button = new PIXI.Sprite(this.engine.loader.resources.close_button.texture);
    button.x = 350;
    button.y = 100;
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', this.close);

    this.group.addChild(button);

    const text = new PIXI.Text(this.text, new PIXI.TextStyle({ fill: '#000000' }));
    text.x = 140;
    text.y = 150;

    this.group.addChild(text);
  }

  public close = () => {
    this.group.visible = false;
  }

  public open = () => {
    this.group.visible = true;
  }

}
