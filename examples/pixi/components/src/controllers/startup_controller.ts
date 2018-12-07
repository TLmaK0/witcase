import { Controller } from 'witcase';
import { StartupView } from '../views/startup_view';
import { PixiEngine } from '../pixi_engine';

/**
 * Startup controller
 */
export class StartupController extends Controller<PixiEngine> {
  private startupView: StartupView;

  constructor() {
    super();
    this.startupView = new StartupView();
    this.startupView.dialogMessage = 'Hello world!';
  }

  public welcome = () => {
    this.startupView.show();
  }
}
