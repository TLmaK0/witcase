import { Controller } from 'witcase';
import { StartupView } from '../views/startup_view';
import { Inject } from 'typescript-ioc';

/**
 * Startup controller
 */
export class StartupController extends Controller {
  constructor(@Inject private startupView: StartupView){
    super();
    this.startupView.welcomeMessage = 'Hello world!';
  }

  public welcome = () => {
    this.startupView.show();
  }
}
