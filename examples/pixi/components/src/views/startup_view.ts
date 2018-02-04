import { View, ViewComponentAdder } from 'witcase';
import { PixiEngine } from '../pixi_engine';
import { Dialog } from './components/dialog';

/**
 * Startup View
 */
export class StartupView extends View<PixiEngine> {
  public dialogMessage: string;

  public create(componentAdder: ViewComponentAdder<PixiEngine>) {
    const dialog = new Dialog(this.dialogMessage);
    componentAdder.addComponent(dialog);
    dialog.open();
  }
}
