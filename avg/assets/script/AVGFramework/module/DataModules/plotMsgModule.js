import { ModuleDataBase } from "./ModuleDataBase";

/**
 * @desc 剧情数据模型
 */
export class PlotMsgModule extends ModuleDataBase {
  constructor(obj) {
    super();

    this.msgId = obj.id;
    this.lastIndex = obj.lastIndex;
    this.actionType = obj.actionType;
    this.actionArgs = obj.actionArgs;
    this.conditionList = (obj.conditionList) ? obj.conditionList.slice() : null;
    // if (obj.conditionList) 
    //   this.conditionList = obj.conditionList.slice();

  }
}
