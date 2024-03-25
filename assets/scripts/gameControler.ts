import { _decorator, Component, Node } from "cc";
import { poolControler } from "./poolControler";
import { initFruit } from "./initFruit";
const { ccclass, property } = _decorator;
enum FRUIT_NAME_STATUS {
  apple,
  grapes,
  orange,
  pineapple,
  strawberry,
}
@ccclass("gameControler")
export class gameControler extends Component {
  @property(poolControler)
  poolControl: poolControler = null;
  @property(Node)
  fruitGroup: Node = null;
  private listIconFruit1: Node[] = [];
  private listIconFruit2: Node[] = [];
  rowNumber: number = 6;
  columnNumber: number = 6;
  onLoad() {
    this.scheduleOnce(function () {
      this.initFuitTable();
    }, 0.2);
  }
  initFuitTable() {
    this.listIconFruit1 = [];
    this.listIconFruit2 = [];
    this.listIconFruit1 = this.getListIconFruit();
    this.listIconFruit2 = this.getListIconFruit();
    console.log("list iconFruit", this.listIconFruit1);
    console.log("list iconFruit", this.listIconFruit2);
    let fruitGroupControl = this.fruitGroup.getComponent(initFruit);
    fruitGroupControl.initFruitGroup(this.listIconFruit1, this.listIconFruit2);
  }
  getListIconFruit(): Node[] {
    let listIconNode: Node[] = [];
    for (let i = 0; i < this.rowNumber * this.columnNumber; i++) {
      let indexFruitRandom = this.RandomNumber(0, 4);
      let iconNode = this.poolControl.getPoolFruit(indexFruitRandom);
      if (iconNode) {
        iconNode.active = true;
        listIconNode.push(iconNode);
      }
    }
    return listIconNode;
  }
  onClickFalling() {
    let fruitGroupControl = this.fruitGroup.getComponent(initFruit);
    fruitGroupControl.iconFalling_1();
    this.scheduleOnce(function () {
      fruitGroupControl.iconFalling_2();
    }, 1.5);
  }
  RandomNumber(minNumber: number, maxNumber: number): number {
    return Math.floor(Math.random() * maxNumber) + minNumber;
  }
}
