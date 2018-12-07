import { WitcaseObservable } from './witcase_observable';

export class RouteActionParams {
  constructor(public route: string, public action?: string, public params?: string){}
}

export class RouteService extends WitcaseObservable<RouteActionParams> {
  public goTo(route: string, action?: string, params?: any){
    this.publish(new RouteActionParams(route, action, params));
  }

  public onRoute(route: string, observer: (routeParams: RouteActionParams) => void){
    this.observable.filter((routeActionParams: RouteActionParams) => routeActionParams.route == route).subscribe(observer);
  }
}
