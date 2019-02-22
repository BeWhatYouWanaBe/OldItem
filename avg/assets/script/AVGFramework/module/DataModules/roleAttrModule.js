import { ModuleDataBase } from "./moduleDataBase";


export class RoleAttrModule extends ModuleDataBase {
  constructor(obj) {
    super();

    this.id = obj.id;
    this.attrType = obj.attrType;
    this.value = obj.value;
    this.ranges = new Array();
    if (obj.ranges) {
      obj.ranges.slice()
    }
  }
}