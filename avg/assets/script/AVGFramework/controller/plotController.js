import { DataCache } from "../data/DataCache";
import { actionHandler } from "./actionController";
import { ActionType } from "./enum/ActionTypeEnum";
import { TestActionArgs, PlayAnimArgs, StopAnimArgs, SwitchSceneArgs, ShowChooseArgs, MoveSceneArgs, NodeOpacityArgs, NodeReverseArgs, NodeRotationArgs, CameraShake, LastIndexArgs, TowRoleChat, PutRoleArgs, NodeToGrayArgs, NodeToNormalArgs, SwitchStageArgs, WaitTimeArgs } from "./actionArguments";


var eventList = new Array();

var runNum = 0;

var canLastEvent = true;
var canClick = true;
/**
 * @description 事件处理器 处理剧情 返回事件列表
 */
export function eventFactory() {
  if (!canClick) return;
  canLastEvent = true;
  eventQueueProcess();
}

/**@description 事件队列处理器 自循环函数 */
function eventQueueProcess() {
  if (canLastEvent == false) return;
  canClick = false;
  let plot = DataCache.getCurrPlotData();
  let { lastIndex, actionType, actionArgs, conditionList, conditionType } = plot;
  if (actionType == ActionType.CREATE_DIALOG) {
    canLastEvent = false;
  }
  if (conditionListProcess(conditionList, conditionType))
    actionHandler(actionType, createActionArgs(actionArgs, actionType), () => {
      if (actionType !== ActionType.PLAYER_CHOOSE) {//如果当前不是选项的话
        DataCache.plotIndexs.currPlotIndex = lastIndex;//更新索引
      }
      canClick = true;
      eventQueueProcess();//继续执行
    });

}

/**
 * @description 创建action参数对象
 * @param {Array} args 参数表
 * @param {Enumerator} actionType action类型
 */
function createActionArgs(args, actionType) {
  actionArgsMapping.initState || actionArgsMapping.init();
  return actionArgsMapping[actionType](args);
}

/**
 * @description action参数映射表
 */
export var actionArgsMapping = {};

/**
 * @description action参数映射表的初始化状态
 */
actionArgsMapping.initState = false;
/**
 * @description 初始化action参数映射表方法
 */
actionArgsMapping.init = function () {
  // actionArgsMapping[ActionType.LASTINDEX] = args => new LastIndexArgs(args);
  // actionArgsMapping[ActionType.PLAY_ANIM] = args => new PlayAnimArgs(args);
  // actionArgsMapping[ActionType.STOP_ANIM] = args => new StopAnimArgs(args);
  // actionArgsMapping[ActionType.SWITCH_SCENE] = args => new SwitchSceneArgs(args);
  // actionArgsMapping[ActionType.SHOW_CHOOSE] = args => new ShowChooseArgs(args);
  // actionArgsMapping[ActionType.MOVE_SCENE] = args => new MoveSceneArgs(args);
  // actionArgsMapping[ActionType.NODE_OPACITY] = args => new NodeOpacityArgs(args);
  // actionArgsMapping[ActionType.NODE_ROTATION] = args => new NodeRotationArgs(args);
  // actionArgsMapping[ActionType.NODE_REVERSE] = args => new NodeReverseArgs(args);
  // actionArgsMapping[ActionType.CAMERA_SHAKE] = args => new CameraShake(args);
  // actionArgsMapping[ActionType.TOWROLE_CHAT] = args => new TowRoleChat(args);
  // actionArgsMapping[ActionType.PUTROLE] = args => new PutRoleArgs(args);
  // actionArgsMapping[ActionType.NODE_TO_GRAY] = args => new NodeToGrayArgs(args);
  // actionArgsMapping[ActionType.NODE_TO_NORMAL] = args => new NodeToNormalArgs(args);
  // actionArgsMapping[ActionType.NODE_DESTROY] = args => new NodeToNormalArgs(args);
  actionArgsMapping[ActionType.WAITTIME] = args => new WaitTimeArgs(args);

  actionArgsMapping[ActionType.SWITCH_PLOTSCENE] = args => new SwitchStageArgs(args);
  actionArgsMapping[ActionType.PLAYER_CHOOSE] = args => new ShowChooseArgs(args);
  actionArgsMapping[ActionType.NODE_TO_OPACITY] = args => new NodeOpacityArgs(args);
  actionArgsMapping[ActionType.NODE_TO_ROTATE] = args => new NodeRotationArgs(args);
  actionArgsMapping[ActionType.NODE_TO_REVERSE] = args => new NodeReverseArgs(args);
  actionArgsMapping[ActionType.SCREEN_SHAKE] = args => new CameraShake(args);
  actionArgsMapping[ActionType.NODE_TO_GRAY] = args => new NodeToGrayArgs(args);
  actionArgsMapping[ActionType.NODE_TO_NORMAL] = args => new NodeToNormalArgs(args);
  actionArgsMapping[ActionType.REMOVE_ROLE] = args => new NodeToNormalArgs(args);
  actionArgsMapping[ActionType.CREATE_DIALOG] = args => new TowRoleChat(args);
  actionArgsMapping[ActionType.ADD_ROLE] = args => new PutRoleArgs(args);

  actionArgsMapping.initState = true;

}
/**
 * @description 条件列表处理器
 * @param {*} conditionList 需要处理对条件列表
 * @param {*} conditionType 条件的类型（全部满足||满足多个）
 */
function conditionListProcess(conditionList, conditionType = 0) {
  var trueNum = 0;//满足的条件个数
  var res;
  if (conditionList && conditionList.length > 0) {
    conditionList.forEach(condition => {
      conditionAnalysis(condition) && trueNum++;
    });
  } else {
    return true;
  }

  switch (conditionType) {
    case 0:
      res = (trueNum == conditionList.length);
      break;
    default:
      break;
  }
  res || console.log('条件判断失败');
  return res;
}

/**
 * @description 条件判断器 
 * @param {String} condition 条件表达式
 * @returns 条件判断结果
 */
function conditionAnalysis(condition) {
  var attr, roleId, attrId, value, operator, arr;
  if (condition.indexOf('>=') != -1) {
    operator = ">=";
    arr = condition.split('>=');
  }
  if (condition.indexOf('<=') != -1) {
    operator = "<=";
    arr = condition.split('<=');
  }
  if (condition.indexOf('>') != -1) {
    operator = ">";
    arr = condition.split('>');
  }
  if (condition.indexOf('<') != -1) {
    operator = "<";
    arr = condition.split('<');
  }
  if (condition.indexOf('=') != -1) {
    operator = "=";
    arr = condition.split('=');
  }
  //获取角色ID 属性ID
  roleId = arr[0].split('-')[0];
  attrId = arr[0].split('-')[1];
  //取出属性值
  attr = DataCache.getAttrMap(roleId, attrId);
  value = arr[1];
  return Operation[operator](attr, value);
}