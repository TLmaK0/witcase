import { Witcase, BaseEngine } from 'witcase';
import { Container } from 'typescript-ioc';
import { GameEngine } from './game_engine';

/*
 * Bootstrap game
 */
window.onload = () => {
  let witcase = Witcase.create<GameEngine>();

  witcase.start((baseEngine: BaseEngine)=> {
    const game = new GameEngine();
    game.start(witcase, baseEngine);
    return game;
  });
};
