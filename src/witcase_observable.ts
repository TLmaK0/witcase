import { Observable, Observer, Subject } from '@reactivex/rxjs';

export class WitcaseObservable<T> {
  protected observable: Observable<T>;
  protected subject: Subject<T>;

  constructor(){
    this.subject = new Subject<T>();
    this.observable = new Observable<T>().multicast(this.subject);
  }

  protected subscribe(observer: (t: T) => void){
    this.observable.subscribe(observer);
  }

  protected publish(value?: T){
    this.subject.next(value);
  }
}

