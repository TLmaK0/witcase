import { GameBody } from './game_body';
import { Box } from 'p2';

export class Trampoline extends GameBody{
  constructor(options?: {}){
    super(options);
    this.body.addShape(new Box({ width: 222, height: 2 }));
    this.addBodyToWorld();
  }
}
