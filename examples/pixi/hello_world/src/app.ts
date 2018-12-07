import * as PIXI from 'pixi.js';
import { Witcase, BaseEngine } from 'witcase';
import { StartupController } from './controllers/startup_controller';
import { PixiEngine } from './pixi_engine';
import { Container } from 'typescript-ioc';

/*
 * Bootstrap game
 */
window.onload = () => {
  let witcase = Witcase.create<PixiEngine>();

  witcase.start((baseEngine: BaseEngine)=> {
    const pixiEngine = new PixiEngine(); 
    pixiEngine.start(witcase, baseEngine);
    return pixiEngine;
  });
};
