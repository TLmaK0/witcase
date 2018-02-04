import { Human } from './human';

export class Cannon {
  public x: number;
  public y: number;
  public angle: number = 0.1;

  private cannonUpdateTimer: number;

  private human: Human | any;

  private previusHumanMass: number;

  public insertHuman(human: Human){
    human.body.position = [this.x - 33, this.y];
    human.body.angle = this.angle;
    this.previusHumanMass = human.body.mass;
    human.body.mass = 0; //don't move human in the cannon
    this.human = human;
  }

  public hasHuman() {
    return !!this.human;
  }

  public rotateClockwise() {
    this.rotateStop();
    this.rotate(-0.01);
    this.cannonUpdateTimer = setTimeout(this.rotateClockwise.bind(this), 10);
  }

  public rotateCounterclockwise() {
    this.rotateStop();
    this.rotate(0.01);
    this.cannonUpdateTimer = setTimeout(this.rotateCounterclockwise.bind(this), 10);
  }

  public rotateStop() {
    clearTimeout(this.cannonUpdateTimer);
  }

  public launchHuman(){
    if (!this.human) return;
    this.human.body.mass = this.previusHumanMass;
    this.human.body.velocity[0] = Math.cos(this.angle) * 100;
    this.human.body.velocity[1] = Math.sin(this.angle) * 100;
    this.human.body.angle = this.angle;
    this.human = null;
  }

  private rotate(angle: number) {
    this.angle = (this.angle + angle) % (2 * Math.PI);
  }
}
