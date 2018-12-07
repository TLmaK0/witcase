import { Inject, Singleton } from 'typescript-ioc';
import { View, ViewComponentAdder, Witcase } from 'witcase';
import { Pong } from '../models/pong';
import { Ball } from '../models/ball';
import { Score } from '../models/score';
import { Scoreboard } from './components/scoreboard';

const pongWav = require('../assets/audios/pong.wav');
const failWav = require('../assets/audios/fail.wav');

Witcase.preload<Phaser.Game>((engine: Phaser.Game) => {
  engine.load.audio('pongWav', pongWav);
  engine.load.audio('failWav', failWav);
});

/**
 * Field View
 */
@Singleton
export class FieldView extends View<Phaser.Game> {
  private scorePlayer1: number;
  private scorePlayer2: number;
  private scoreboard: Scoreboard;
  private ball: Phaser.Graphics;
  private lastBallPosition: number[] = [0, 0];
  private pongEffect: Phaser.Sound;
  private failEffect: Phaser.Sound;
  private lastSpeed: number;
  private lastSlope: number;

  constructor(
    @Inject private pong: Pong
  ){
    super();
  }

  public create(componentAdder: ViewComponentAdder<Phaser.Game>) {
    this.createNet();
    this.ball = this.engine.add.graphics(0, 0);
    this.pongEffect = this.engine.add.audio('pongWav');
    this.failEffect = this.engine.add.audio('failWav');
    this.scoreboard = componentAdder.addComponent(new Scoreboard(this.pong.bounds));
    this.onChange<[number, number]>(() => [this.pong.ball.posX, this.pong.ball.posY]).subscribe(this.updateBall);
    this.onChange<Score>(() => this.pong.score).subscribe(this.updateScore);
    this.onChange<[number, number]>(() => [this.pong.ball.slope, this.pong.ball.speed]).subscribe(this.bounceBall);
  }

  private bounceBall = (_slopeSpeed: [number, number]) => {
    this.pongEffect.play();
  }

  private updateScore = (score: Score) => {
    this.failEffect.play();
    this.scoreboard.scorePlayer1 = score.player1;
    this.scoreboard.scorePlayer2 = score.player2;
  }

  private updateBall = (pos: [number, number]) => {
    this.drawVerticalLine(this.ball, pos[0], pos[1], 10);
  }

  private createNet() {
    const bounds = this.pong.bounds;
    for (let y = 0; y < bounds[1]; y += 40) {
      this.drawVerticalLine(this.engine.add.graphics(0, 0), bounds[0] / 2, y, 20);
    }
  }

  private drawVerticalLine(line: Phaser.Graphics, origX: number, origY: number, length: number) {
    line.clear();
    line.lineStyle(10, 0xffffff);
    line.moveTo(origX,
                origY);
    line.lineTo(origX,
                origY + length);
    line.endFill();
  }
}
