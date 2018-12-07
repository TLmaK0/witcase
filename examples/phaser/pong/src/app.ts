import * as Phaser from 'phaser-ce';
import { Witcase, BaseEngine } from 'witcase';
import { GameController } from './controllers/game_controller';
import { Container } from 'typescript-ioc';
/*
 * Bootstrap game
 */
window.onload = () => {
  let witcase = Witcase.create<Phaser.Game>();

  witcase.start((baseEngine: BaseEngine)=> {
    const game = new Phaser.Game(
      1000,
      750,
      Phaser.CANVAS,
      'content',
      {
        preload: () => {
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

          witcase.defaultAction = Container.get(GameController).startGame;
          baseEngine.preload();
        },
        create: baseEngine.create,
        update: baseEngine.update,
        render: baseEngine.render
      }
    );

    return game;
  });
};
