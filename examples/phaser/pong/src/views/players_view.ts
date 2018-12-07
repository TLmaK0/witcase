import { Inject, Singleton } from 'typescript-ioc';
import { View, ViewComponentAdder } from 'witcase';
import { Pong } from '../models/pong';
import { Player } from '../models/player';

import * as _ from 'lodash';

/**
 * Players View
 */
@Singleton
export class PlayersView extends View<Phaser.Game> {
  private players: Phaser.Graphics[] = [];

  constructor(
    @Inject private pong: Pong
  ){
    super();
  }

  public create(_componentAdder: ViewComponentAdder<Phaser.Game>) {
    this.players.push(this.engine.add.graphics(0, 0));
    this.players.push(this.engine.add.graphics(0, 0));
    this.drawPlayers(this.pong.players);
    this.onChange(() => this.pong.players).subscribe(this.drawPlayers);
  }

  private drawPlayers = (players: Player[]) => {
    this.moveLine(this.players[0], players[0].posX, players[0].posY, players[0].height);
    this.moveLine(this.players[1], players[1].posX, players[1].posY, players[1].height);
  }

  private moveLine(line: Phaser.Graphics, origX: number, origY: number, length: number) {
    line.clear();
    line.lineStyle(20, 0xffffff);
    line.moveTo(origX, origY);
    line.lineTo(origX, origY + length);
    line.endFill();
  }
}
