import * as PIXI from 'pixi.js';
import { PixiEngine } from './pixi_engine';
import { Witcase, BaseEngine } from 'witcase';

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
