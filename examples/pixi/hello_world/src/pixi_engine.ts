import * as PIXI from 'pixi.js';
import { Witcase, BaseEngine } from 'witcase';
import { StartupController } from './controllers/startup_controller';

import { Container } from 'typescript-ioc';

export class PixiEngine {
  app: PIXI.Application = new PIXI.Application();
  loader: PIXI.loaders.Loader = PIXI.loader;

  private resourcesToLoad: Array<[string, string]> = [];

  load(resourceName: string, resourcePath: string){
    this.resourcesToLoad.push([resourceName, resourcePath]);
  }

  loadResources(){
    let loader = PIXI.loader;
    for (const resourceToLoad of this.resourcesToLoad) {
      loader = loader.add(resourceToLoad[0], resourceToLoad[1]);
    }
    return loader;
  }

  start(witcase: Witcase<PixiEngine>, baseEngine: BaseEngine){
    document.body.appendChild(this.app.view);
    setTimeout(()=>{
      witcase.defaultAction = Container.get(StartupController).welcome;

      baseEngine.preload();
      this.loadResources().load(() => {
        baseEngine.create();
        this.app.ticker.add(baseEngine.update);
      });
    },0);
  }
};
