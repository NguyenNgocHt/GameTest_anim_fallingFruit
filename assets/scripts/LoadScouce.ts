import { _decorator, Component, Node, resources, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadScouce")
export class LoadScouce extends Component {
  private static _instance: LoadScouce = null!;

  public static get instance(): LoadScouce {
    if (this._instance == null) {
      this._instance = new LoadScouce();
    }
    return this._instance;
  }
}
