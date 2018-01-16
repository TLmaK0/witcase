/**
 */

import * as Phaser from 'phaser-ce';
import { AsyncSubject } from '@reactivex/rxjs';

import { Controller } from './controller';
import { IActionParams } from './i_action_params';
import { IControllerMap } from './i_controller_map';
import { PhysicBody } from './physic_body';
import { Guid } from './guid';

/** Bootstrap for the phaser-mvc.
 * Useage:
 * import { FrameController } from 'phaser-mvc';
 * import { LandEditorController } from 'phaser-mvc';
 * window.onload = () => {
 * const boot = new Bootstrap();
 * boot.addController('FrameController', FrameController);
 */

export class Bootstrap {
  private static preloadComponents: ((game: Phaser.Game) => void)[] = [];

  public game: Phaser.Game;
  protected controllers: IControllerMap = {};
  private startAction: [string, string, IActionParams];

  public static onInit: AsyncSubject<Bootstrap> = new AsyncSubject<Bootstrap>();

  public constructor(public width: number = 1920, public height: number = 1080){
  }

  public static preload(preload: (game: Phaser.Game) => void): void {
    Bootstrap.preloadComponents.push(preload);
  }

  public start(controllerName: string, controllerAction: string, params: IActionParams): void {
    this.startAction = [controllerName, controllerAction, params];
    this.game = new Phaser.Game(
      this.width,
      this.height,
      Phaser.CANVAS,
      'content',
      { preload: this.preload,
        create: this.create,
        update: this.update});
  }

  public preload = (): void => {
    for (const preload of Bootstrap.preloadComponents) {
      preload(this.game);
    }
  }

  public create = (): void => {
    this.worldCustomizations();

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.goTo(this.startAction[0], this.startAction[1], this.startAction[2]);

    Bootstrap.onInit.next(this);
    Bootstrap.onInit.complete();
  }

  private worldMaterial: Phaser.Physics.P2.Material;
  public static worldMaterialOptions: any = {};

  private worldCustomizations(){
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
    Bootstrap.worldMaterialOptions = {
      restitution: 0
    };

    this.game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
    this.game.physics.p2.gravity.y = 100;
  }

  public createBody(body: PhysicBody){
    const physicBody = new Phaser.Physics.P2.Body(this.game, this.game.add.sprite(0,0, null), body.x, body.y, body.mass);
    physicBody.velocity.x = body.velocity[0];
    physicBody.velocity.y = body.velocity[1];
    physicBody.angle = body.angle;

    const material = this.game.physics.p2.createMaterial(Guid.newGuid(), physicBody);
    const options = body.getPhysicsConfiguration();

    this.generateContacts(material, options.material);
    return physicBody;
  }

  private generateContacts(material: Phaser.Physics.P2.Material, options: any){
    let contactOptions: any = {};
    for (const key in options){
      contactOptions[key] = Bootstrap.worldMaterialOptions[key] + options[key];
    }

    const contactMaterial = this.game.physics.p2.createContactMaterial(material, this.worldMaterial, contactOptions);
  }

  public update = (): void => {
    for (const controllerName of Object.keys(this.controllers)) {
      this.updateController(<Controller>this.controllers[controllerName]);
    }
  }

  public addController<T extends Controller>(name: string, controllerType: new () => T): void {
    if (this.controllers[name] != null) throw EvalError(`Controller ${name} already registered.`);

    const controller: T = new controllerType();
    controller.bootstrap = this;
    this.controllers[name] = controller;
  }

  public goTo(controllerName: string, controllerAction: string, params: IActionParams): void {
    /*tslint:disable:no-any*/
    const controller: any = this.controllers[controllerName];
    /*tslint:enable:no-any*/
    if (!controller) {
      throw EvalError(`Controller ${controllerName} not exist. Be sure you load it in bootstrap.`);
    }
    /*tslint:disable:no-unsafe-any*/
    controller[controllerAction](params);
    /*tslint:enable:no-unsafe-any*/
  }

  private updateController(controller: Controller): void {
    for (const viewName of Object.keys(controller.views)) {
      controller.getView(viewName).updateView();
    }
  }
}
