export class ViewHelper {
  public static positionToView(bodyPosition: number[], spritePosition: any){
    spritePosition.x = bodyPosition[0];
    spritePosition.y = 600 - bodyPosition[1];
  }
}
