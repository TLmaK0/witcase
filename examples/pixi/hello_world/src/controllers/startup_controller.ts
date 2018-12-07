import { Controller } from 'witcase';
import { StartupView } from '../views/startup_view';
import { Inject, Singleton } from 'typescript-ioc';
import { PixiEngine } from '../pixi_engine';

/**
 * Startup controller
 */
@Singleton
export class StartupController extends Controller<PixiEngine>{
  constructor(@Inject private startupView: StartupView){
    super();
    this.startupView.welcomeMessage = 'Hello world!';
  }

  public welcome = () => {
    this.startupView.show();
  }
}
