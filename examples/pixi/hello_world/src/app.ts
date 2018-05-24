import * as PIXI from 'pixi.js';
import { Witcase, BaseEngine } from 'witcase';
import { StartupController } from './controllers/startup_controller';
import { Container } from 'typescript-ioc';

/*
 * Bootstrap game
 */
window.onload = () => {
  let witcase = Witcase.create<[PIXI.Application, PIXI.loaders.Loader]>();

  witcase.start((baseEngine: BaseEngine)=> {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);
    setTimeout(()=>{
      baseEngine.preload();

      witcase.defaultAction = Container.get(StartupController).welcome;

      baseEngine.create();
      witcase.engine[1].load(() => {
        app.ticker.add(baseEngine.update);
      });
    },0);
    return [app, PIXI.loader];
  });
};
