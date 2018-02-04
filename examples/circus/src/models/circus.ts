import { Cannon } from '../models/cannon';
import { Human } from '../models/human';
import { Trampoline } from '../models/trampoline';

export class Circus {
  public cannon: Cannon;
  public human: Human;
  public trampoline: Trampoline;

  constructor(){
    this.human = new Human();
    this.cannon = new Cannon();

    this.cannon.x = 100;
    this.cannon.y = 500;

    this.trampoline = new Trampoline({ mass: 0, position: [300, 500] });
  }
}
