import { ModuleDataBase } from "./moduleDataBase";

export class SceneNodeModule extends ModuleDataBase {
  constructor(obj) {
    super();

    this.id = obj.id;
    this.resUrl = obj.resUrl;
    this.resType = obj.resType;
    
  }
}