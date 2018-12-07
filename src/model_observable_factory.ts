import { Observable, Observer } from '@reactivex/rxjs';
import * as _ from 'lodash';

class ModelObservable<T> {
  observable: Observable<T>;
  observer: Observer<() => T>;
  getModel: () => T;
}

export class ModelObservableFactory {
  private modelObservables: ModelObservable<any>[] = [];

  private createModelObservable<T>(getModel: () => T): Observable<T> {
    const modelObservable = new ModelObservable<T>();

    modelObservable.observable = Observable.create(
      (observer: Observer<() => T>) => modelObservable.observer = observer
    ).map(
      (model: T) => _.cloneDeep(model)
    ).distinctUntilChanged(
      (prev: T, next: T) => _.isEqual(prev, next)
    );

    modelObservable.getModel = getModel;

    this.modelObservables.push(modelObservable); 

    return modelObservable.observable.skip(1); //we wait until change
  }

  protected onChange<T>(getModel: () => T): Observable<T> {
    return this.createModelObservable(getModel);
  }

  public checkModelChanges(){
    for(const modelObservable of this.modelObservables){
      modelObservable.observer.next(modelObservable.getModel());
    }
  }
}
