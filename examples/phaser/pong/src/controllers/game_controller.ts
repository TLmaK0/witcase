import { Inject, Singleton } from 'typescript-ioc';
import { Controller } from 'witcase';
import { Pong } from '../models/pong';
import { FieldView } from '../views/field_view';
import { PlayersController } from './players_controller';

/**
 * Game controller
 */
@Singleton
export class GameController extends Controller<Phaser.Game> {
  constructor(
    @Inject private fieldView: FieldView,
    @Inject private pong: Pong,
    @Inject private playersController: PlayersController
  ){
    super();
  }

  public startGame = () => {
    this.playersController.preparePlayers();
    this.pong.startGame();
    this.fieldView.show();
  }
}
