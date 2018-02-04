import * as PIXI from 'pixi.js';

import { View, ViewComponentAdder, WatchFactory, Witcase } from 'witcase';

import { GameEngine } from '../game_engine';
import { Cannon } from '../models/cannon';
import { Human } from '../models/human';
import { Trampoline } from '../models/trampoline';

const cannon = require('../assets/images/cannon.png');
const human = require('../assets/images/human.png');
const trampoline = require('../assets/images/trampoline.png');


Witcase.preload<GameEngine>((engine: GameEngine) => {
  engine.load('cannon', cannon);
  engine.load('human', human);
  engine.load('trampoline', trampoline);
});

/**
 * Cannon View
 */
export class CircusView extends View<GameEngine> {
  private cannonSprite: PIXI.Sprite;
  private humanSprite: PIXI.Sprite;

  public cannon: Cannon;
  public human: Human;
  public trampoline: Trampoline;

  public create(_componentAdder: ViewComponentAdder<GameEngine>) {
    const trampolineSprite = new PIXI.Sprite(this.engine.loader.resources.trampoline.texture);
    trampolineSprite.position.x = this.trampoline.body.position[0];
    trampolineSprite.position.y = this.trampoline.body.position[1];

    trampolineSprite.scale.x = 0.5;
    trampolineSprite.scale.y = 0.5;

    this.engine.app.stage.addChild(trampolineSprite);

    this.humanSprite = new PIXI.Sprite(this.engine.loader.resources.human.texture);
    this.humanSprite.position.x = this.human.body.position[0];
    this.humanSprite.position.y = this.human.body.position[1];
    this.humanSprite.scale.x = 0.5;
    this.humanSprite.scale.y = 0.5;
    this.engine.app.stage.addChild(this.humanSprite);
    //this.humanSprite.visible = false;

    this.cannonSprite = new PIXI.Sprite(this.engine.loader.resources.cannon.texture);
    this.cannonSprite.position.x = this.cannon.x;
    this.cannonSprite.position.y = this.cannon.y;
    this.cannonSprite.scale.x = 0.5;
    this.cannonSprite.scale.y = 0.5;
    this.cannonSprite.anchor.set(0.5);
    this.cannonSprite.rotation = this.cannon.angle;

    this.engine.app.stage.addChild(this.cannonSprite);
  }

  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<number>(() => this.cannon.angle).subscribe(this.rotateCannon);
    watchFactory.create<boolean>(() => this.cannon.hasHuman()).subscribe(this.hideHuman);
  }

  public update(){
    this.moveHuman();
  }

  private rotateCannon = (angle: number) => {
   this.cannonSprite.rotation = angle;
  }

  private moveHuman = () => {
    this.humanSprite.rotation = this.human.body.interpolatedAngle;
    this.humanSprite.position.x = this.human.body.interpolatedPosition[0];
    this.humanSprite.position.y = this.human.body.interpolatedPosition[1];
  }

  private hideHuman = (hide: boolean) => {
    if (!hide) this.humanSprite.visible = true;
  }
}
