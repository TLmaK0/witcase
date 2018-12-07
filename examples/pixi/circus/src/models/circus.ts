import { Cannon } from '../models/cannon';
import { Human } from '../models/human';
import { Trampoline } from '../models/trampoline';

import { Witcase } from 'witcase';
import { Body, Plane } from 'p2';
import  { GameEngine } from '../game_engine';
import { Singleton } from 'typescript-ioc';

@Singleton
export class Circus {
  public cannon: Cannon;
  public human: Human;
  public trampoline: Trampoline;

  constructor(){
    this.human = new Human();
    this.cannon = new Cannon();

    this.cannon.x = 100;
    this.cannon.y = 100;

    this.trampoline = new Trampoline({ mass: 0, position: [500, 50] });


    const floor = new Body({ position: [0, 0] });
    floor.addShape(new Plane());
    (<GameEngine>Witcase.current.engine).world.addBody(floor);
  }
}
