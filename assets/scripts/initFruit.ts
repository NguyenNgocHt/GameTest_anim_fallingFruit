import { _decorator, Component, Node, tween } from "cc";
import { FruitFalling } from "./FruitFalling";
const { ccclass, property } = _decorator;

@ccclass("initFruit")
export class initFruit extends Component {
  @property(Node)
  posStart1: Node = null;
  @property(Node)
  fruitGroup1: Node = null;
  @property(Node)
  posTagetGroup: Node = null;

  @property(Node)
  posStart2: Node = null;
  @property(Node)
  fruitGroup2: Node = null;
  rowNumber: number = 6;
  columnNumber: number = 6;
  distance_2_icon: number = 100;
  list_iconNode1: Node[] = [];
  list_iconNode2: Node[] = [];
  start() {}
  public initFruitGroup(listIconNode1: Node[], listIconNode2: Node[]) {
    this.initFruitGroup1(listIconNode1);
    this.initFruitGroup2(listIconNode2);
  }
  initFruitGroup1(listIconNode: Node[]) {
    this.list_iconNode1 = [];
    let listIcon = listIconNode;
    let posTaget = this.posStart1.getWorldPosition();
    let posTagetNode = this.posTagetGroup.children;
    console.log("list icon node", listIconNode);
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        let k = i * this.rowNumber + j;
        console.log(k);
        this.list_iconNode1.push(listIcon[k]);
        this.fruitGroup1.addChild(listIcon[k]);
        listIconNode[k].setPosition(0, 0);
        listIconNode[k].setWorldPosition(posTaget.x + j * this.distance_2_icon, posTaget.y - i * this.distance_2_icon, 0);
        console.log(listIconNode[k]);
        let fruitFallingControl = listIconNode[k].getComponent(FruitFalling);
        if (fruitFallingControl) {
          fruitFallingControl.setColumn(j);
          fruitFallingControl.setPosTaget(posTagetNode[j].getWorldPosition());
        }
      }
    }
  }
  initFruitGroup2(listIconNode: Node[]) {
    this.list_iconNode2 = [];
    let listIcon = listIconNode;
    let posTaget = this.posStart2.getWorldPosition();
    console.log("list icon node", listIconNode);
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        let k = i * this.rowNumber + j;
        console.log(k);
        this.list_iconNode2.push(listIcon[k]);
        this.fruitGroup2.addChild(listIcon[k]);
        listIconNode[k].setPosition(0, 0);
        listIconNode[k].setWorldPosition(posTaget.x + j * this.distance_2_icon, posTaget.y - i * this.distance_2_icon, 0);
        console.log(listIconNode[k]);
        let fruitFallingControl = listIconNode[k].getComponent(FruitFalling);
        if (fruitFallingControl) {
          fruitFallingControl.setColumn(j);
          fruitFallingControl.setPosTaget(this.list_iconNode1[k].getWorldPosition());
        }
      }
    }
  }
  public iconFalling_1() {
    let delayCot = 0.1;
    let delayHang = 0.6;
    let addHang = 0.1;
    let addDelayCot = 0.3;
    let childs = this.fruitGroup1.children;
    console.log(childs);
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        let k = i * this.rowNumber + j;
        let fallingControler = childs[k].getComponent(FruitFalling);
        if (fallingControler) {
          tween(this.node)
            .delay(delayCot)
            .delay(delayHang)
            .call(() => {
              fallingControler.fruitFalling();
            })
            .start();
        }
        delayCot += addDelayCot;
      }
      delayHang -= addHang;
      delayCot = 0.1;
    }
  }
  public iconFalling_2() {
    let delayCot = 0.1;
    let delayHang = 0.6;
    let addHang = 0.1;
    let addDelayCot = 0.3;
    let childs = this.fruitGroup2.children;
    console.log(childs);
    for (let i = 0; i < this.rowNumber; i++) {
      for (let j = 0; j < this.columnNumber; j++) {
        let k = i * this.rowNumber + j;
        let fallingControler = childs[k].getComponent(FruitFalling);
        if (fallingControler) {
          tween(this.node)
            .delay(delayCot)
            .delay(delayHang)
            .call(() => {
              fallingControler.movingBytween();
            })
            .start();
        }
        delayCot += addDelayCot;
      }
      delayHang -= addHang;
      delayCot = 0.1;
    }
  }
  update(deltaTime: number) {}
}
