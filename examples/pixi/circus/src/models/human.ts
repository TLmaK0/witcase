import { GameBody } from './game_body';
import { Box } from 'p2';

export class Human extends GameBody{
  constructor(options?: {}){
    super(options);
    this.body.addShape(new Box({ width: 113, height: 54 }));
    this.addBodyToWorld();
  }
}
