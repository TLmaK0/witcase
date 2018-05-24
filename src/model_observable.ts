import { Observable, Observer } from '@reactivex/rxjs';

export class ModelObservable<T> {
  observable: Observable<T>;
  observer: Observer<() => T>;
  getModel: () => T;
}
