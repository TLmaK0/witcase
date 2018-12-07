import { Inject, Singleton } from 'typescript-ioc';
import { Controller } from 'witcase';
import { Pong } from '../models/pong';
import { PlayersKeyboardView } from '../views/players_keyboard_view';
import { PlayersView } from '../views/players_view';

@Singleton
export class PlayersController extends Controller<Phaser.Game> {
  constructor(
    @Inject private playersView: PlayersView,
    @Inject private playersKeyboardView: PlayersKeyboardView,
    @Inject private pong: Pong
  ) {
    super();
    this.playersKeyboardView.onMovePlayer.subscribe(this.movePlayer);
    this.playersKeyboardView.onStopPlayer.subscribe(this.stopPlayer);
  }

  public preparePlayers = () => {
    this.playersView.show();
    this.playersKeyboardView.show();
  }

  public movePlayer = (move: [number, string]) => {
    switch (move[1]) {
      case 'up':
        this.pong.movePlayerUp(move[0]);
        break;
      case 'down':
        this.pong.movePlayerDown(move[0]);
        break;
      default:
        break;
    }
  }

  public stopPlayer = (playerId: number) => {
    this.pong.stopPlayer(playerId);
  }
}
