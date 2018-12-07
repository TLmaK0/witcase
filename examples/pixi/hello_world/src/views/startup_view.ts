import { View, ViewComponentAdder } from 'witcase';
import { Singleton } from 'typescript-ioc';
import { PixiEngine } from '../pixi_engine';

/**
 * Startup View
 */
@Singleton
export class StartupView extends View<PixiEngine> {
  public welcomeMessage: string;

  public create(_componentAdder: ViewComponentAdder<PixiEngine>) {
    const text = new PIXI.Text(this.welcomeMessage, new PIXI.TextStyle({
      fill: '#ffffff', // gradient
    }));
    text.x = 100;
    text.y = 100;
    this.engine.app.stage.addChild(text);
  }
}
