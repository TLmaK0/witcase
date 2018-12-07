import { Controller } from 'witcase';
import { Circus } from '../models/circus';
import { CircusController } from './circus_controller';
import { GameEngine } from '../game_engine';

import { Inject } from 'typescript-ioc';
/**
 * Game controller
 */
export class GameController extends Controller<GameEngine> {
  constructor(
    @Inject private circusController: CircusController,
    @Inject private circus: Circus
  ){
    super();
  }

  public startGame = () => {
    this.circusController.prepareCannon(this.circus.human,
                                        this.circus.cannon,
                                        this.circus.trampoline);
  }
}
