import { View, ViewComponentAdder, ViewObservable } from 'witcase';

import { GameEngine } from '../game_engine';

/**
 * Players Keys View
 */

export class PlayerKeysView extends View<GameEngine> {
  rotateCannon: ViewObservable<string> = new ViewObservable<string>();
  rotateCannonStop: ViewObservable<void> = new ViewObservable<void>();
  launchHuman: ViewObservable<void> = new ViewObservable<void>();


  public create(){
    this.onChange<[boolean, boolean]>(() => [
      this.engine.keyboardPress['ArrowRight'],
      this.engine.keyboardPress['ArrowLeft']
    ]).subscribe(this.moveCannon);

    this.onChange<boolean>(() => this.engine.keyboardPress['Space']).subscribe(this.launchHumanNow);
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

