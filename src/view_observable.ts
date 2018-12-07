import { WitcaseObservable } from './witcase_observable';

export class ViewObservable<T> extends WitcaseObservable<T>{
  public subscribe(observer: (t: T) => void){
    super.subscribe(observer); 
  }

  public publish(value?: T){
    super.publish(value);
  }
}

