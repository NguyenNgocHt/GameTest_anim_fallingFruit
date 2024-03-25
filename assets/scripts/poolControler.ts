import { _decorator, Component, instantiate, Node, Prefab, Sprite, resources, SpriteFrame } from "cc";
import { LoadScouce } from "./LoadScouce";
const { ccclass, property } = _decorator;
enum FRUIT_NAME_STATUS {
  apple,
  grapes,
  orange,
  pineapple,
  strawberry,
}
@ccclass("poolControler")
export class poolControler extends Component {
  FRUIT_NAME: string[] = ["apple", "grapes", "orange", "pineapple", "strawberry"];
  @property(Prefab)
  fruitPrefab: Prefab = null;
  @property(Node)
  appleGroup: Node = null;
  @property(Node)
  orangesGroup: Node = null;
  @property(Node)
  grapesGroup: Node = null;
  @property(Node)
  pineapplesGroup: Node = null;
  @property(Node)
  strawberrysGroup: Node = null;
  private appleList: Node[] = [];
  private orangesList: Node[] = [];
  private grapesList: Node[] = [];
  private pineappleList: Node[] = [];
  private strawberryList: Node[] = [];
  private numberFruit: number = 50;

  onLoad() {
    this.initPool_apples();
    this.initPool_oranges();
    this.initPool_grapes();
    this.initPool_pineapples();
    this.initPool_strawberrys();
  }
  initPool_fruit(fruitName: string, fruitList: Node[], fruitGroupNode: Node) {
    if (this.fruitPrefab) {
      let nodePrefab = instantiate(this.fruitPrefab);
      if (nodePrefab) {
        let imageFruitNode = nodePrefab.getChildByPath("image");
        if (imageFruitNode) {
          let imageSprite = imageFruitNode.getComponent(Sprite);
          let imageFrame_path = "img/fruit/" + fruitName + "/spriteFrame";
          resources.load(imageFrame_path, SpriteFrame, (error, spriteFrame) => {
            if (spriteFrame) {
              imageSprite.spriteFrame = spriteFrame;
            } else {
              console.log(`load popup background error: ${error}`);
            }
          });
          fruitGroupNode.addChild(nodePrefab);
          nodePrefab.setPosition(0, 0);
          fruitList.push(nodePrefab);
          nodePrefab.active = false;
        }
      }
    }
  }
  initPool_apples() {
    for (let i = 0; i < this.numberFruit; i++) {
      this.initPool_fruit(this.FRUIT_NAME[0], this.appleList, this.appleGroup);
    }
    console.log(this.appleGroup);
    console.log(this.appleList);
  }
  initPool_oranges() {
    for (let i = 0; i < this.numberFruit; i++) {
      this.initPool_fruit(this.FRUIT_NAME[2], this.orangesList, this.orangesGroup);
    }
    console.log(this.orangesList);
    console.log(this.orangesGroup);
  }
  initPool_grapes() {
    for (let i = 0; i < this.numberFruit; i++) {
      this.initPool_fruit(this.FRUIT_NAME[1], this.grapesList, this.grapesGroup);
    }
    console.log(this.grapesGroup);
    console.log(this.grapesList);
  }
  initPool_pineapples() {
    for (let i = 0; i < this.numberFruit; i++) {
      this.initPool_fruit(this.FRUIT_NAME[3], this.pineappleList, this.pineapplesGroup);
    }
    console.log(this.pineappleList);
    console.log(this.pineapplesGroup);
  }
  initPool_strawberrys() {
    for (let i = 0; i < this.numberFruit; i++) {
      this.initPool_fruit(this.FRUIT_NAME[4], this.strawberryList, this.strawberrysGroup);
    }
    console.log(this.strawberryList);
    console.log(this.strawberrysGroup);
  }
  public getPoolFruit(fruitName: FRUIT_NAME_STATUS): Node {
    if (fruitName == FRUIT_NAME_STATUS.apple) {
      if (this.appleList.length > 0) {
        let iconNode = this.appleList.pop();
        return iconNode;
      } else {
        this.initPool_apples();
        let iconMode = this.appleList.pop();
        return iconMode;
      }
    }
    if (fruitName == FRUIT_NAME_STATUS.orange) {
      if (this.orangesList.length > 0) {
        let iconNode = this.orangesList.pop();
        return iconNode;
      } else {
        this.initPool_oranges();
        let iconMode = this.orangesList.pop();
        return iconMode;
      }
    }
    if (fruitName == FRUIT_NAME_STATUS.grapes) {
      if (this.grapesList.length > 0) {
        let iconNode = this.grapesList.pop();
        return iconNode;
      } else {
        this.initPool_grapes();
        let iconMode = this.grapesList.pop();
        return iconMode;
      }
    }
    if (fruitName == FRUIT_NAME_STATUS.pineapple) {
      if (this.pineappleList.length > 0) {
        let iconMode = this.pineappleList.pop();
        return iconMode;
      } else {
        this.initPool_pineapples();
        let iconMode = this.pineappleList.pop();
        return iconMode;
      }
    }
    if (fruitName == FRUIT_NAME_STATUS.strawberry) {
      if (this.strawberryList.length > 0) {
        let iconMode = this.strawberryList.pop();
        return iconMode;
      } else {
        this.initPool_strawberrys();
        let iconMode = this.strawberryList.pop();
        return iconMode;
      }
    }
  }
  public pushIconNode(fruitName: FRUIT_NAME_STATUS, iconNode: Node) {
    if (fruitName == FRUIT_NAME_STATUS.apple) {
      if (iconNode.parent) {
        iconNode.removeFromParent();
      }
      this.setIconPieceToValueOrigin(iconNode);
      this.appleList.push(iconNode);
      this.appleGroup.addChild(iconNode);
      iconNode.setPosition(0, 0);
      iconNode.active = false;
    }
    if (fruitName == FRUIT_NAME_STATUS.grapes) {
      if (iconNode.parent) {
        iconNode.removeFromParent();
      }
      this.setIconPieceToValueOrigin(iconNode);
      this.grapesList.push(iconNode);
      this.grapesGroup.addChild(iconNode);
      iconNode.setPosition(0, 0);
      iconNode.active = false;
    }
    if (fruitName == FRUIT_NAME_STATUS.orange) {
      if (iconNode.parent) {
        iconNode.removeFromParent();
      }
      this.setIconPieceToValueOrigin(iconNode);
      this.orangesList.push(iconNode);
      this.orangesGroup.addChild(iconNode);
      iconNode.setPosition(0, 0);
      iconNode.active = false;
    }
    if (fruitName == FRUIT_NAME_STATUS.pineapple) {
      if (iconNode.parent) {
        iconNode.removeFromParent();
      }
      this.setIconPieceToValueOrigin(iconNode);
      this.pineappleList.push(iconNode);
      this.pineapplesGroup.addChild(iconNode);
      iconNode.setPosition(0, 0);
      iconNode.active = false;
    }
    if (fruitName == FRUIT_NAME_STATUS.strawberry) {
      if (iconNode.parent) {
        iconNode.removeFromParent();
      }
      this.setIconPieceToValueOrigin(iconNode);
      this.strawberryList.push(iconNode);
      this.strawberrysGroup.addChild(iconNode);
      iconNode.setPosition(0, 0);
      iconNode.active = false;
    }
  }
  setIconPieceToValueOrigin(iconNode: Node) {}
}
