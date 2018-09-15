import { Witcase } from './witcase';
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
export abstract class View<T> extends ModelObservableFactory {
  protected components: ViewComponent<T>[] = [];
  private componentAdder: ViewComponentAdder<T> = new ViewComponentAdder<T>(this.components, this);
  public onCreated: ViewObservable<void> = new ViewObservable<void>();
  private created = false;

  //TODO: we should inject with typescript-ioc
  constructor(private witcase: Witcase<T> = Witcase.current){
    super();
    this.witcase.registerView(this);
  }

  public create(_componentAdder: ViewComponentAdder<T>) {
    //empty, can be overrided or not
  }
  public update(_componentAdder: ViewComponentAdder<T>) {
    //empty, can be overrided or not
  }
  public render() {
    //empty, can be overrided or not
  }

  public show() {
    this.createView();
    for (const component of this.components) {
      component.showComponent();
    }
  }

  public hide() {
    for (const component of this.components) {
      component.hideComponent();
    }
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
  }

  public updateView() {
    if (!this.created) return;
    for (const component of this.components) {
      component.updateComponent(this.componentAdder);
    }
    this.update(this.componentAdder);
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
}

/**
 * Component to be showed in view
 */
export abstract class ViewComponent<T> {
  public view: View<T>;
  protected components: ViewComponent<T>[] = [];
  private _visible: boolean = true;
  private _localCall: boolean = false;

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

  public hideComponent(): void {
    this._localCall = true;
    this.hide();
  }

  private hideAllComponents() {
    for (const component of this.components) {
      component.hideComponent();
    }
  }

  public showComponent(): void {
    if (this._visible) {
      this._localCall = true;
      this.show();
    }
  }

  private showAllComponents() {
    for (const component of this.components) {
      component.showComponent();
    }
  }

  public hide(): void {
    this.hideAllComponents();
    if (this._localCall) this._localCall = false; //no set _visible false if show comes from view show method
    else this._visible = false;
  }

  public show(): void {
    this.showAllComponents();
    if (this._localCall) this._localCall = false; //no set _visible true if show comes from view show method
    else this._visible = true;
  }

  protected get engine(): T {
    return this.view.engine;
  }
}
