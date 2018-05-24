import { Witcase } from './witcase';
import { ModelObservable } from './model_observable';
import { ModelObservableFactory } from './model_observable_factory';
import { ViewObservable } from './view_observable';

/**
 * Adds a component to the view and other view components
 */
export class ViewComponentAdder<T> {
  constructor(private components: ViewComponent<T>[], private view: View<T>) {}

  public addComponent<S extends ViewComponent<T>>(component: S): S {
    this.components.push(component);
    component.createComponent(this, this.view);

    return component;
  }
}

/**
 * Input and ouput for the application
 */
export abstract class View<T> {
  protected components: ViewComponent<T>[] = [];
  private modelObservableFactory: ModelObservableFactory = new ModelObservableFactory();
  private componentAdder: ViewComponentAdder<T> = new ViewComponentAdder<T>(this.components, this);
  public onCreated: ViewObservable<void> = new ViewObservable<void>();
  private created = false;

  //TODO: we should inject with typescript-ioc
  constructor(private witcase: Witcase<T> = Witcase.current){
    this.witcase.registerView(this);
  }

  public create(_componentAdder: ViewComponentAdder<T>) {
    //empty, can be overrided or not
  }
  public update() {
    //empty, can be overrided or not
  }
  public render() {
    //empty, can be overrided or not
  }

  public show() {
    this.createView();
  }

  get engine(): T { return this.witcase.engine; }

  private createView() {
    if (this.created) return;
    this.created = true;

    for (const component of this.components) {
      component.createComponent(this.componentAdder, this);
    }
    this.create(this.componentAdder);
    this.onCreated.publish();
    this.updateOnModelChange(this.modelObservableFactory);
  }

  public updateView() {
    if (!this.created) return;
    for (const component of this.components) {
      component.updateComponent(this.componentAdder);
    }
    this.checkModels();
    this.update();
  }

  public renderView() {
    if (!this.created) return;
    for (const component of this.components) {
      component.renderComponent();
    }
    this.render();
  }

  public destroy() {
    for (const component of this.components) {
      component.destroyComponent();
    }
    this.witcase.unregisterView(this);
    this.destroy();
  }

  public updateOnModelChange(_modelObservableFactory: ModelObservableFactory){
    //this should be overrided or not
  }

  private checkModels(){
    for(const modelObservable of this.modelObservableFactory.modelObservables){
      modelObservable.observer.next(modelObservable.getModel());
    }
  }
}

/**
 * Component to be showed in view
 */
export abstract class ViewComponent<T> {
  public view: View<T>;
  protected components: ViewComponent<T>[] = [];

  public create(_componentAdder: ViewComponentAdder<T>): void {
    //empty, can be overrided or not
  }

  public update(_componentAdder: ViewComponentAdder<T>): void {
    //empty, can be overrided or not
  }

  public render(): void {
    //empty, can be overrided or not
  }

  public destroy(): void {
    //empty, can be overrided or not
  }

  public createComponent(componentAdder: ViewComponentAdder<T>, view: View<T>): void {
    this.view = view;
    this.create(componentAdder);
    for (const component of this.components) {
      component.createComponent(componentAdder, view);
    }
  }

  public updateComponent(componentAdder: ViewComponentAdder<T>): void {
    this.update(componentAdder);
    for (const component of this.components) {
      component.updateComponent(componentAdder);
    }
  }

  public renderComponent(): void {
    this.render();
    for (const component of this.components) {
      component.renderComponent();
    }
  }

  public destroyComponent(): void {
    for (const component of this.components) {
      component.destroyComponent();
    }
    this.destroy();
  }

  protected get engine(): T {
    return this.view.engine;
  }
}
