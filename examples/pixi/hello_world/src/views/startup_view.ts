import { View, ViewComponentAdder } from 'witcase';

/**
 * Startup View
 */
export class StartupView extends View<[PIXI.Application, PIXI.loaders.Loader]> {
  public welcomeMessage: string;

  public create() {
    const text = new PIXI.Text(this.welcomeMessage, new PIXI.TextStyle({
      fill: '#ffffff', // gradient
    }));
    text.x = 100;
    text.y = 100;
    this.engine[0].stage.addChild(text);
  }
}
