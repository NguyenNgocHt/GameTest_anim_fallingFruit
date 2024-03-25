import { _decorator, Component, Label, Node, tween, Tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;
enum FALLING_STATUS {
  NO_STATUS,
  START,
  STOP,
}
@ccclass("FruitFalling")
export class FruitFalling extends Component {
  @property(Label)
  labelCheck: Label = null;
  private isFalling: boolean = false;
  speed2: number = 250;
  speed: number = 0.1;
  dx: number = 0;
  dy: number = 0;
  column: number = 0;
  countFalling: number = 0;
  posTaget: Vec3 = new Vec3(0, 0, 0);
  fallingStatus: FALLING_STATUS = FALLING_STATUS.NO_STATUS;
  start() {}
  public setColumn(column: number) {
    this.column = column;
  }
  public setPosTaget(posTaget: Vec3) {
    this.posTaget = posTaget;
  }
  public fruitFalling() {
    this.fallingStatus = FALLING_STATUS.START;
    // let time = this.calculateDistance(this.node.getWorldPosition(), this.posTaget) / this.speed;
    // Tween.stopAllByTarget(this.node);
    // tween(this.node).to(time, { worldPosition: this.posTaget }).start();
  }
  movingBytween() {
    let time = this.calculateDistance(this.node.getWorldPosition(), this.posTaget) / this.speed2;
    Tween.stopAllByTarget(this.node);
    tween(this.node).to(time, { worldPosition: this.posTaget }, { easing: "elasticInOut" }).start();
  }
  calculateDistance(pos1: Vec3, pos2: Vec3): number {
    const deltaX = pos2.x - pos1.x;
    const deltaY = pos2.y - pos1.y;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return distance;
  }
  update(deltaTime: number) {
    let p = this.node.getWorldPosition();
    let q = new Vec3(p.x + this.speed * this.dx, p.y + this.speed * this.dy, 0);
    if (this.fallingStatus == FALLING_STATUS.START) {
      this.node.setWorldPosition(q.x, q.y, 0);
      this.falling_Start(this.node.worldPosition);
    } else if (this.fallingStatus == FALLING_STATUS.STOP) {
    }
  }
  falling_Start(pos: Vec3) {
    if (pos.y > this.posTaget.y) {
      this.dy = -1;
      this.dx = 0;
      this.speed += 0.2;
    } else {
      this.fallingStatus = FALLING_STATUS.STOP;
      this.countFalling = 0;
      this.speed = 0;
    }
  }
}
