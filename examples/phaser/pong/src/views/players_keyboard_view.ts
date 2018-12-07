import { Singleton } from 'typescript-ioc';
import { View, ViewComponentAdder, ViewObservable } from 'witcase';

/**
 * Players View
 */
@Singleton
export class PlayersKeyboardView extends View<Phaser.Game> {
  onMovePlayer: ViewObservable<[number, string]> = new ViewObservable<[number, string]>();
  onStopPlayer: ViewObservable<number> = new ViewObservable<number>();

  public create(_componentAdder: ViewComponentAdder<Phaser.Game>) {
    this.watchForKeys(0, [Phaser.Keyboard.W, Phaser.Keyboard.S]);
    this.watchForKeys(1, [Phaser.Keyboard.O, Phaser.Keyboard.K]);
  }

  private watchKeyPlayer = (playerKeyPressed: [number, boolean, boolean]) => {
    if (playerKeyPressed[1] || playerKeyPressed[2]) {
      this.onMovePlayer.publish([playerKeyPressed[0], playerKeyPressed[1] ? 'up' : 'down']);
    } else this.onStopPlayer.publish(playerKeyPressed[0]);
  }

  private watchForKeys(playerId: number, keys: number[]){
    this.onChange<[number, boolean, boolean]>(() => [
      playerId,
      this.engine.input.keyboard.isDown(keys[0]),
      this.engine.input.keyboard.isDown(keys[1])
    ]).subscribe(this.watchKeyPlayer);
  }
}
