import * as PIXI from 'pixi.js';

import { View, ViewComponentAdder, WatchFactory, Witcase } from 'witcase';

import { GameEngine } from '../game_engine';
import { Cannon } from '../models/cannon';
import { Human } from '../models/human';
import { Trampoline } from '../models/trampoline';
import { ViewHelper } from '../helpers/view_helper';

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
  private trampolineSprite: PIXI.Sprite;

  public cannon: Cannon;
  public human: Human;
  public trampoline: Trampoline;

  public create(_componentAdder: ViewComponentAdder<GameEngine>) {
    this.trampolineSprite = new PIXI.Sprite(this.engine.loader.resources.trampoline.texture);
    this.trampolineSprite.anchor.set(0.5);

    ViewHelper.positionToView(this.trampoline.body.position, this.trampolineSprite.position);

    this.trampolineSprite.scale.x = 0.5;
    this.trampolineSprite.scale.y = 0.5;

    this.engine.app.stage.addChild(this.trampolineSprite);

    this.humanSprite = new PIXI.Sprite(this.engine.loader.resources.human.texture);
    ViewHelper.positionToView(this.human.body.position, this.humanSprite.position);

    this.humanSprite.anchor.set(0.5);
    this.humanSprite.scale.x = 0.5;
    this.humanSprite.scale.y = 0.5;
    this.humanSprite.visible = false;

    this.engine.app.stage.addChild(this.humanSprite);

    this.cannonSprite = new PIXI.Sprite(this.engine.loader.resources.cannon.texture);
    ViewHelper.positionToView([this.cannon.x, this.cannon.y], this.cannonSprite.position);
    this.cannonSprite.scale.x = 0.5;
    this.cannonSprite.scale.y = 0.5;
    this.cannonSprite.anchor.set(0.5);
    this.cannonSprite.rotation = -this.cannon.angle;

    this.engine.app.stage.addChild(this.cannonSprite);
  }

  public updateOnModelChange(watchFactory: WatchFactory){
    watchFactory.create<number>(() => this.cannon.angle).subscribe(this.rotateCannon);
    watchFactory.create<boolean>(() => this.cannon.hasHuman()).subscribe(this.hideHuman);
  }

  public update(){
    this.moveHuman();
    
    this.trampolineSprite.rotation = this.trampoline.body.interpolatedAngle;
    ViewHelper.positionToView(this.trampoline.body.position, this.trampolineSprite.position);
  }

  private rotateCannon = (angle: number) => {
   this.cannonSprite.rotation = -angle;
  }

  private moveHuman = () => {
    this.humanSprite.rotation = -this.human.body.interpolatedAngle;
    ViewHelper.positionToView(this.human.body.position, this.humanSprite.position);
  }

  private hideHuman = (hide: boolean) => {
    if (!hide) this.humanSprite.visible = true;
  }
}
