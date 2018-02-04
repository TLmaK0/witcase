import * as PIXI from 'pixi.js';
import { Listener } from 'keypress.js';
import { Witcase, BaseEngine } from 'witcase';
import { GameController } from './controllers/game_controller';
import { World } from 'p2';

import { Container } from 'typescript-ioc';


export class GameEngine {
  app: PIXI.Application = new PIXI.Application();
  loader: PIXI.loaders.Loader = PIXI.loader;
  keyboardPress: { [key: string]: boolean; } = {};
  world: World = new World({ gravity: [0, 9.82] }); 

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

  start(witcase: Witcase<GameEngine>, baseEngine: BaseEngine){
    document.body.appendChild(this.app.view);
    
    setTimeout(()=>{
      witcase.defaultAction = Container.get(GameController).startGame;

      document.addEventListener('keydown', (e: KeyboardEvent) => {
        this.keyboardPress[e.code] = true;
      });

      document.addEventListener('keyup', (e: KeyboardEvent) => {
        this.keyboardPress[e.code] = false;
      });

      baseEngine.preload();
      this.loadResources().load(() => {
        baseEngine.create();
        this.app.ticker.add((deltaTime: number) => {
          this.world.step(this.app.ticker.elapsedMS / 1000, deltaTime, 10);
          baseEngine.update();
        });
      });
    },0);
  }
};
