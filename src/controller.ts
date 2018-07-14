import { Witcase } from './witcase';
import { ModelObservableFactory } from './model_observable_factory';

/**
 * Controller accepts input from view and converts modifieds the model.
 */
export abstract class Controller<T> extends ModelObservableFactory {

  //TODO: we should inject with typescript-ioc
  constructor(private witcase: Witcase<T> = Witcase.current){
    super();
    this.witcase.registerController(this);
  }

}
