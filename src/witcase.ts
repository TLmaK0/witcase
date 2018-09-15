/**
 */
import { Controller } from './controller';
import { BaseEngine } from './base_engine';
import { View } from './view';
import { Guid } from './guid';
import { RouteService } from './route_service';

export class Witcase<T> implements BaseEngine {
  public engine: T;

  public defaultAction: () => void;

  public static current: any;

  private views: View<T>[] = [];
  private controllers: Controller<T>[] = [];

  public router: RouteService = new RouteService();

  private constructor(){
  }

  public static create<T>(){
    Witcase.current = new Witcase<T>();
    return Witcase.current;
  }

  public start(engineStarter: (baseEngine: BaseEngine) => T): void {
    this.engine = engineStarter(this);
  }

  public create = (): void => {
    this.defaultAction();
  }

  private static resourceLoaders: ((engine: any) => void)[] = [];

  public static preload<T>(resourceLoader: (engine: T)=>void):void {
    Witcase.resourceLoaders.push(resourceLoader);
  }

  public preload = (): void => {
    for (const resourceLoader of Witcase.resourceLoaders){
      resourceLoader(this.engine);
    }
  }

  public update = (): void => {
    for (const controller of this.controllers){
      controller.checkModelChanges();
    }

    for (const view of this.views){
      view.checkModelChanges();
      view.updateView();
    }
  }

  public render = (): void => {
    for (const view of this.views){
      view.renderView();
    }
  }

  public registerView(view: View<T>){
    this.views.push(view);
  }

  public unregisterView(viewToRemove: View<T>){
    this.views = this.views.filter((view) => { return viewToRemove !== view });
  }

  public registerController(controller: Controller<T>){
    this.controllers.push(controller);
  }
}
