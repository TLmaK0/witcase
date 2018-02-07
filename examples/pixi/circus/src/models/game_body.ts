import { Witcase } from 'witcase';
import { Body, Box } from 'p2';

import  { GameEngine } from '../game_engine';

export class GameBody {
  body: Body;

  constructor(options: {} = { mass: 1, position: [0, 0] }){
    this.body = new Body(options);
  }

  protected addBodyToWorld(){
    (<GameEngine>Witcase.current.engine).world.addBody(this.body);
  }
}
