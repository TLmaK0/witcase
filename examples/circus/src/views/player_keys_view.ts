import { View, ViewComponentAdder, WatchFactory, ViewNotifier } from 'witcase';

import { GameEngine } from '../game_engine';

/**
 * Players Keys View
 */

export class PlayerKeysView extends View<GameEngine> {
  rotateCannon: ViewNotifier<string> = new ViewNotifier<string>();
  rotateCannonStop: ViewNotifier<void> = new ViewNotifier<void>();
  launchHuman: ViewNotifier<void> = new ViewNotifier<void>();


  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<[boolean, boolean]>(() => [
      this.engine.keyboardPress['ArrowLeft'],
      this.engine.keyboardPress['ArrowRight']
    ]).subscribe(this.moveCannon);

    watchFactory.create<boolean>(() => this.engine.keyboardPress['Space']).subscribe(this.launchHumanNow);
  }

  private moveCannon = (areKeysDown: [boolean, boolean]) => {
    if (areKeysDown[0]) this.rotateCannon.publish('clockwise');
    else if (areKeysDown[1]) this.rotateCannon.publish('counter-clockwise');
    else this.rotateCannonStop.publish();
  }

  private launchHumanNow = (launchHuman: boolean) => {
    if (launchHuman) this.launchHuman.publish();
  }
}

