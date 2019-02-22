const PLOT_DATA = require('../data/data_2');
const Plot = require('../../model/SyfsPlotModel');
const BackpackController = require('../../controller/BackpackController');
const GameStorageFileController = require('../../controller/GameStorageFileController');
const GameTaskController = require('../../controller/GameTaskController');
const GameRoleController = require('../../controller/GameRoleSystemController');

import { SelectType, moveSceneType, nodeRotationType, nodeReverseType, cameraShakeType } from "../view/enum/ViewDefinedEnum";
import { ActionType } from './enum/ActionTypeEnum';
import { DataCache } from '../data/DataCache';
//---------action委托

export function actionHandler(type, obj, callback) {
  //检测事件映射表的状态 
  actionMapping.initState || actionMapping.init();
  actionMapping[type](obj, callback);
}
/**
 * @description action映射表
 */
export var actionMapping = {};
/**
 * @description action映射表的初始化状态
 */
actionMapping.initState = false;
/**
 * @description 初始化action映射表方法
 */
actionMapping.init = function () {
  actionMapping[ActionType.WAITTIME] = (a, c) => _waitTime(a, c);

  // actionMapping[ActionType.PLAY_ANIM] = (a, c) => _playAnim(a, c);
  // actionMapping[ActionType.STOP_ANIM] = (a, c) => _stopAnim(a, c);
  // actionMapping[ActionType.SWITCH_SCENE] = (a, c) => _switchScene(a, c);
  actionMapping[ActionType.SWITCH_PLOTSCENE] = (a, c) => _switchPlotScene(a, c);
  actionMapping[ActionType.PLAYER_CHOOSE] = (a, c) => _showChoose(a, c);
  // actionMapping[ActionType.MOVE_SCENE] = (a, c) => _moveScene(a, c);
  actionMapping[ActionType.NODE_TO_OPACITY] = (a, c) => _nodeOpacity(a, c);
  actionMapping[ActionType.NODE_TO_ROTATE] = (a, c) => _nodeRotation(a, c);
  actionMapping[ActionType.NODE_TO_REVERSE] = (a, c) => _nodeReverse(a, c);
  actionMapping[ActionType.SCREEN_SHAKE] = (a, c) => _screenShake(a, c);
  actionMapping[ActionType.NODE_TO_GRAY] = (a, c) => _nodeToGray(a, c);
  actionMapping[ActionType.NODE_TO_NORMAL] = (a, c) => _nodeToNormal(a, c);
  actionMapping[ActionType.NODE_DESTROY] = (a, c) => _nodeDestory(a, c);
  // 人物系统
  actionMapping[ActionType.ROLE_CHOOSE_VIEW_SHOW] = (a, c) => showRoleAttribute(a, c);
  actionMapping[ActionType.ROLE_INFO_VIEW_SHOW] = (a, c) => showRoleInfo(a, c);
  // 测试
  actionMapping[ActionType.FUNCTION_TEST] = (a, c) => showRoleAttribute(a, c);
  actionMapping[ActionType.REMOVE_ROLE] = (a, c) => _nodeDestory(a, c);

  // actionMapping[ActionType.PROP_USE] = (a, c) => userProp(a, c);
  // actionMapping[ActionType.STORE_VIEW_SHOW] = (a, c) => showStoreView(a, c);
  // actionMapping[ActionType.TASK_VIEW_SHOW] = (a, c) => showTaskView(a, c);
  // actionMapping[ActionType.CLOSE_DIALOG] = (a, c) => closeDialog(a, c);
  actionMapping[ActionType.CREATE_DIALOG] = (a, c) => _towRoleChat(a, c);
  actionMapping[ActionType.ADD_ROLE] = (a, c) => _putRoleNode(a, c);

  // actionMapping[ActionType.FUNCTION_TEST] = (a, c) => showTaskView(a, c);
  // actionMapping[ActionType.FUNCTION_TEST] = (a, c) => showRoleAttribute(a, c);
  actionMapping.initState = true;
}
//TODO: xbf =====================
function _waitTime(obj, callback) {
  let time = obj.time;
  // this.scheduleOnce(callback,time)
  setTimeout(() => callback(), time);
}
/**@desc 播放动画*/
function _playAnim(obj, callback) {
  callback = callback || function () { }
  let anim = obj.targetNode.getComponent(cc.Animation);
  let startTime = obj.startTime || 0;
  obj.animName ? anim.play(obj.animName, startTime) : anim.play();
  anim.on('finished', callback, anim);
}
/**@desc 暂停动画 */
function _stopAnim(obj, callback) {
  callback = callback || function () { };
  let anim = obj.node.getComponent(cc.Animation);
  obj.animName ? anim.stop(obj.animName) : anim.stop();
  callback();
}
/**@desc 切换场景 */
function _switchScene(obj, callback) {
  callback = callback || function () { };
  cc.director.loadScene(obj.sceneName, callback);
}
/**@desc 预加载场景 */
function _preloadScene(obj, callback) {
  callback = callback || function () { };
  cc.director.preloadScene(obj.sceneName, callback);
}
/**@description 切换剧情场景 */
function _switchPlotScene(args, callback = function () { }) {


  callback();
}

/**
 * @desc 选项功能
 */
function _showChoose(obj, callback) {
  if (obj.haveBg) {
    obj.background.node.active = obj.haveBg;
    obj.background.spriteFrame = obj.backgroundSprite;
  }
  var time = obj.time;
  var beFinsih = false;
  //计时功能部分
  // obj.selectTimeLabel.node.active = (obj.selectType == SelectType.TIME)
  var currTime = time;
  // obj.selectTimeLabel.string = currTime;
  if (obj.selectType == SelectType.TIME) {
    var interval = setInterval(() => {
      if (!beFinsih && currTime == 0) {
        clearInterval(interval);
        obj.selectCallback.forEach(handler => handler.emit([0]))
      } else {
        currTime--;
        obj.selectTimeLabel.string = currTime;
      }
    }, 1000);
  }
  //创建按钮并点击事件
  // let selectNum = obj.lastIndexs.length;
  cc.loader.loadRes('prefab/component/choosePrefab', (err, res) => {
    var node = cc.instantiate(res);
    cc.find('Canvas').addChild(node);
    node.getComponent('chooseCmpt').init(obj.indexList, obj.textList, (clickId) => {
      DataCache.plotIndexs.currPlotIndex = clickId;
      node.destroy();
      callback();
    });
  })
  // for (let i = 0; i < selectNum; i++) {
  //   var node = cc.instantiate(obj.selectPrefab);
  //   node.name = i.toString();
  //   obj.selectRoot.addChild(node);
  //   //初始化选项
  //   node.getComponent('selectComponent').init(i, '选项' + i, function (id) {
  //     beFinsih = true;
  //     //响应回调
  //     obj.selectCallback.forEach(handler => handler.emit([id]));
  //   });
  // }
}

var currPointIndex = 0;
function _moveScene(obj) {
  var touch = obj._clickEvent.touch;
  var moveVec = 0;
  // console.log(touch.getStartLocation(), touch.getLocation());
  //判断移动方向
  if ((touch.getLocation().x > touch.getStartLocation().x)) {
    moveVec = 1;
  }
  if ((touch.getLocation().x < touch.getStartLocation().x)) {
    moveVec = -1;
  }

  if (obj.moveSceneType == moveSceneType.DEFAULT) {
    //锁定移动
    if (obj.moveSceneCamera.x <= (cc.winSize.width / 2) - (obj.moveSceneMaxWidth / 2) && moveVec == 1) {
      obj.moveSceneCamera.x = (cc.winSize.width / 2) - (obj.moveSceneMaxWidth / 2);
      return;
    }
    if (obj.moveSceneCamera.x >= (obj.moveSceneMaxWidth / 2) - (cc.winSize.width / 2) && moveVec == -1) {
      obj.moveSceneCamera.x = (obj.moveSceneMaxWidth / 2) - (cc.winSize.width / 2);
      return;
    }
    obj.moveSceneCamera.x -= (touch.getLocationInView().x - touch.getPreviousLocationInView().x);
  } else if (obj.moveSceneType == moveSceneType.CUSTOM_POINT) {
    if (moveVec == -1 && currPointIndex < obj.moveScenePoints.length - 1) currPointIndex++;
    if (moveVec == 1 && currPointIndex > 0) currPointIndex--;
    var action = cc.moveTo(0.5, cc.v2(obj.moveScenePoints[currPointIndex].x, 0))
    obj.moveSceneCamera.runAction(action);
  }

}


function test() {
  let param = {}
  param.targetNode = xxx;
  
  _nodeDestory(param, () => {
    
  })
}

function _nodeDestory(obj, callback) {
  obj.targetNode.destroy();
  if (callback) callback();
}

function _nodeOpacity(obj) {
  obj.nodeOpacityNode.opacity = obj.nodeOpacityValue;
}

function _nodeRotation(obj) {
  var actionTo = cc.rotateBy(obj.nodeRotationSpeed, 360);
  obj.nodeRotationType == nodeRotationType.LOOP && obj.nodeRotationTarget.runAction(actionTo.repeatForever());
  obj.nodeRotationType == nodeRotationType.ONCE && obj.nodeRotationTarget.runAction(actionTo);
}

function _nodeReverse(obj) {
  if (obj.nodeReverseType == nodeReverseType.HORIZONTAL) {
    if (obj.nodeReverseTarget.scaleX == -1) {
      obj.nodeReverseTarget.scaleX = 1;
      return;
    }
    if (obj.nodeReverseTarget.scaleX == 1) {
      obj.nodeReverseTarget.scaleX = -1;
      return;
    }
  }
  if (obj.nodeReverseType == nodeReverseType.VERTICAL) {
    if (obj.nodeReverseTarget.scaleY == -1) {
      obj.nodeReverseTarget.scaleY = 1;
      return;
    }
    if (obj.nodeReverseTarget.scaleY == 1) {
      obj.nodeReverseTarget.scaleY = -1;
      return;
    }
  }
}

function _screenShake(obj, callback) {
  var speed = obj.speed;
  var action;
  action = cc.sequence(cc.moveTo(speed, cc.v2(300, 0)), cc.moveTo(speed, cc.v2(0, 0)), cc.moveTo(speed, cc.v2(-300, 0)));
  cc.find('Canvas/Main Camera').runAction(cc.repeat(action, obj.time));
  if (callback) callback();
}

function _screenFlicker(obj, callback) {
  
}
//TODO: wck ======================
/**
*  @description  输出剧情
*  @param {参数包装} obj 
*  @param
*/
function _printPlot(obj) {
  let plot = _readCurrentPlot();
}



//  剧情对话
/**
 *  @desc  对话框效果
 */
function _narrationDialog(obj, plot) {
  var dialogParent = cc.director.getScene().getChildByName('Canvas').getChildByName('PlotDialog');
  // var narrationDialogNode = cc.instantiate(obj.prefabPool[2]); // TODO: 这里的对话框类型从数据中读取
  var narrationDialogNode = _chooseDialog(obj, plot);
  // 判断剧情显示的位置
  _setDialogPosition(narrationDialogNode, plot.showPosition);
  dialogParent.removeAllChildren();
  narrationDialogNode.parent = dialogParent;
  narrationDialogNode.getChildByName('RoleName').getComponent(cc.RichText).string = plot.senderId;
  return narrationDialogNode;
}

/**
 *  @desc  放置对话框
 */
function _putDialog(targetNode) {
  var dialogParent = cc.director.getScene().getChildByName('Canvas').getChildByName('dialogBox');
  dialogParent.removeAllChildren();
  // var dialogParent = cc.director.getScene().getChildByName('Canvas');
  targetNode.parent = dialogParent;
  // dialogParent.addChild(targetNode);
}

/**
 *  @desc  选择对话框
 */
function _chooseDialog(obj, plot) {
  if (plot.type == 0) return cc.instantiate(obj.prefabPool[0]); // 旁白
  if (plot.type == 1) return cc.instantiate(obj.prefabPool[1]); // 独白
  if (plot.type == 2 || plot.type == 3) { // 二人和三人对话
    if (_judgeRoleStatus(plot.senderId)) {
      return cc.instantiate(obj.prefabPool[2]);
    }
    return cc.instantiate(obj.prefabPool[1]);
  }
}

/**
 *  @desc  判断角色是否为主角
 */
function _judgeRoleStatus(roleName) {
  var reg = RegExp(/main/);
  return reg.test(roleName);
}

/**
 *  @desc  独白对话
 */
function _singlePersonChat(obj, plot) {
  console.info('singlePersonChat');
  // 测试方法，之后会注掉 
  let test_plot = _readCurrentPlot();
  _putLoadNode(test_plot.senderId);
  let narrationDialogNode = _narrationDialog(obj, test_plot);
  _pirntPlotTypewriter(narrationDialogNode.getChildByName('RoleDialog'), test_plot);
}

/**
 *  @desc  两人对话
 */
function _towPersonChat(obj, plot) {
  console.info('towPersonChat');
  let test_plot = _readCurrentPlot();// 测试方法，之后会注掉 
  if (_judgeRoleStatus(test_plot.senderId)) {
    _putLoadNode(test_plot.plotPerson[0], _nodeToGray);
  } else {
    _putLoadNode(test_plot.plotPerson[0], _nodeToNormal);
  }
  let narrationDialogNode = _narrationDialog(obj, test_plot);
  _pirntPlotTypewriter(narrationDialogNode.getChildByName('RoleDialog'), test_plot);
}

/**
 *  @desc  二人对话
 */
function _towRoleChat(obj, callback) {
  _setDialogPosition(obj.targetNode, obj.plot.dialogPos);
  _putDialog(obj.targetNode);
  _pirntPlotTypewriter(obj.targetNode, obj.plot, callback);
}

/**
 *  @desc  三人对话
 */
function _threePersonChat(obj, plot) {
  console.info('threePersonChat');
  let test_plot = _readCurrentPlot();// 测试方法，之后会注掉 
  if (_judgeRoleStatus(test_plot.senderId)) {
    for (let elm in test_plot.plotPerson) {
      console.info(test_plot.plotPerson[elm]);
      if (elm == 0) {
        _rightRoleMoveScaleGray(test_plot.plotPerson[elm]);
      } else {
        _leftRoleMoveScaleGray(test_plot.plotPerson[elm]);
      }
    }
  } else {
    for (let elm in test_plot.plotPerson) {
      console.info(test_plot.plotPerson[elm]);
      if (test_plot.plotPerson[elm] == test_plot.senderId) {
        if (elm == 0) {
          setTimeout(function () {
            _rightRoleMoveScaleNormal(test_plot.plotPerson[elm])
          }, 500);
        } else {
          setTimeout(function () {
            _leftRoleMoveScaleNormal(test_plot.plotPerson[elm])
          }, 500);
        }
      } else {
        if (elm == 0) {
          _rightRoleMoveScaleGray(test_plot.plotPerson[elm]);
        } else {
          _leftRoleMoveScaleGray(test_plot.plotPerson[elm]);
        }
      }
    }
  }
  setTimeout(function () {
    let narrationDialogNode = _narrationDialog(obj, test_plot);
    _pirntPlotTypewriter(narrationDialogNode.getChildByName('RoleDialog'), test_plot);
  }, 1000);
}





/* 节点相关操作 */
/**
 *  @desc  设置对话框的位置
 */
function _setDialogPosition(targetNode, showPosition = '2') {
  switch (showPosition) {
    case '0': {
      targetNode.setPosition(GLOBAL_DATA.userDeviceInfo.width / 2, GLOBAL_DATA.userDeviceInfo.height);
      break;
    }
    case '1': {
      targetNode.setPosition(GLOBAL_DATA.userDeviceInfo.width / 2, GLOBAL_DATA.userDeviceInfo.height / 2);
      break;
    }
    case '2': {
      targetNode.setPosition(GLOBAL_DATA.userDeviceInfo.width / 2, targetNode.height);
      break;
    }
  }
}

/**
 *  @desc  精灵节点变GRAY
 *  @param  {string}  nodeName 
 *  @param  {cc.Node}  targetNode 
 *  @param  {number}  time
 */
function _nodeToGray(obj, callback) {
  obj.time = obj.time || GLOBAL_DATA.param.time.default;
  if (!obj.targetNode) return;
  let tintAction = cc.tintTo(obj.time, 120, 120, 120);
  // if (!obj.instant) {
  //   return tintAction;
  // }

  // obj.targetNode.runAction(cc.sequence(tintAction, cc.callFunc(callback, obj.targetNode)));
  obj.targetNode.runAction(tintAction);
  if (callback) callback();
}

/**
 * @desc  精灵节点变NORMAL
 * @param {*} targetNode 
 * @param {*} nodeName 
 * @param {*} time 
 */
function _nodeToNormal(obj, callback) {
  obj.time = obj.time || GLOBAL_DATA.param.time.default;
  if (!obj.targetNode) return;
  let tintAction = cc.tintTo(obj.time, 255, 255, 255);
  // if (!obj.instant) {
  //   return tintAction;
  // }
  // obj.targetNode.runAction(cc.sequence(tintAction, cc.callFunc(callback, obj.targetNode)));
  obj.targetNode.runAction(tintAction);
  if (callback) callback();
}

/**
 *  @desc  改变节点颜色
 *  @param {cc.Node} targetNode  目标节点
 *  @param {Array} color  rpg值数组
 *  @param {number} time  变换时间
 */
function _nodeToBlack (targetNode, color=[0, 0, 0], time=0, instant=false) {
  if (targetNode) return;
  let tintAction = cc.tintTo(time, color[0], color[1], color[2]);
  if (!instant) {
    return tintAction;
  }
  targetNode.runAction(tintAction);
}

/**
 *  @desc  节点缩放
 *  @param  {string}  nodeName
 *  @param  {cc.Node}  targetNode
 *  @param  {number}  scaleRate
 *  @param  {number}  time
 */
function _nodeScale(targetNode = null, nodeName = null, scaleRate = 0.9, time, instant = true) {
  time = time || GLOBAL_DATA.param.time.default;
  if (!targetNode) {
    targetNode = cc.find(nodeName);
  }
  if (!targetNode) return;
  let scaleAction = cc.scaleTo(time, scaleRate);
  if (!instant) {
    return scaleAction;
  }
  targetNode.runAction(scaleAction);
}

/**
 *  @desc  指定位置节点移动
 *  @param  {string}  targetName
 *  @param  {cc.Node}  targetNode
 *  @param  {function}  callBackFunc
 *  @param  {number}  x
 *  @param  {number}  y
 */
function _nodePointMove(targetNode, targetName, x = 0, y = 0, callBackFunc, time, instant = true) {
  time = time || GLOBAL_DATA.param.time.default;
  if (!targetNode) {
    targetNode = cc.find(targetName);
  }
  if (!targetNode) return;
  let moveAction = cc.moveTo(time, cc.v2(x, y));
  if (!instant) {
    return moveAction;
  }
  targetNode.runAction(moveAction);
}

/**
 *  @desc  相对节点位置移动
 *  @param {string}  spriteFrameName 
 *  @param {function}  callBackFunc 
 *  @param {number}  x 
 *  @param {number}  y 
 */
function _nodeRelationMove(targetNode, targetName, x = 0, y = 0, callBackFunc, time, instant = true) {
  time = time || GLOBAL_DATA.param.time.default;
  if (!targetNode) {
    targetNode = cc.find(targetName);
  }
  if (!targetNode) return;
  let moveAction = cc.moveBy(time, cc.v2(x, y));
  if (!instant) {
    return moveAction;
  }
  targetNode.runAction(moveAction);
}

/**
 *  @desc  加载节点
 */
function _putLoadNode(spriteFrameName, callBackFunc = null, x, y) {
  var roleNodeParent = cc.director.getScene().getChildByName('Canvas').getChildByName('RoleBox');
  var newRoleNode;
  x = x || GLOBAL_DATA.userDeviceInfo.width / 2;
  y = y || GLOBAL_DATA.userDeviceInfo.height / 2;
  if (roleNodeParent.getChildByName(spriteFrameName)) {
    console.info('node has here early');
    newRoleNode = roleNodeParent.getChildByName(spriteFrameName);
    callBackFunc ? callBackFunc(newRoleNode) : null;
  } else {
    cc.loader.loadRes(GLOBAL_DATA.roleSprite[spriteFrameName], cc.SpriteFrame, function (err, spriteFrame) {
      if (err) {
        cc.error(err.message || err);
        return;
      }
      newRoleNode = new cc.Node(spriteFrameName);
      var sp = newRoleNode.addComponent(cc.Sprite);
      sp.spriteFrame = spriteFrame;
      newRoleNode.setPosition(x, y);
      newRoleNode.parent = roleNodeParent;
      callBackFunc ? callBackFunc(newRoleNode) : null;
    });
  }
}

/**
 *  @desc  放置节点
 */
function _putRoleNode(obj, callback) {

  // console.log(callback);
  var roleNodeParent = cc.director.getScene();
  if (!obj.targetNode) return;
  obj.x = obj.x || GLOBAL_DATA.userDeviceInfo.width / 2;
  obj.y = obj.y || GLOBAL_DATA.userDeviceInfo.height / 2;
  obj.targetNode.setPosition(obj.x, obj.y);
  roleNodeParent.addChild(obj.targetNode);
  if (obj.isGray) {
    obj.targetNode.color = new cc.Color(120, 120, 120, 255);
  }
  // if (callback) callback();
  callback();
}

/**
 *  @desc  节点移动和缩放以及变灰
 */
function _nodeMoveScaleGray(targetNode, targetName, callBackFunc, x, y, time) {
  time = time || GLOBAL_DATA.param.time.default;
  x = x || GLOBAL_DATA.role.rolePosition.leftRole.initPosition.x;
  y = y || GLOBAL_DATA.role.rolePosition.leftRole.initPosition.y;
  if (!targetNode) {
    targetNode = cc.find(targetName);
  }
  let moveAction = _nodePointMove(targetNode, null, x, y, null, time, false);
  let scaleAction = _nodeScale(targetNode, null, 0.9, time, false);
  let grayAction = _nodeToGray(targetNode, null, time, false);
  targetNode.runAction(cc.spawn(moveAction, scaleAction, grayAction));
  targetNode.zIndex = 1000;
}

function _nodeRightMoveScaleGray(targetNode, targetName, callBackFunc, x, y, time) {
  time = time || GLOBAL_DATA.param.time.default;
  x = x || GLOBAL_DATA.role.rolePosition.rightRole.initPosition.x;
  y = y || GLOBAL_DATA.role.rolePosition.rightRole.initPosition.y;
  if (!targetNode) {
    targetNode = cc.find(targetName);
  }
  let moveAction = _nodePointMove(targetNode, null, x, y, null, time, false);
  let scaleAction = _nodeScale(targetNode, null, 0.9, time, false);
  let grayAction = _nodeToGray(targetNode, null, time, false);
  targetNode.runAction(cc.spawn(moveAction, scaleAction, grayAction));
  targetNode.zIndex = 1000;
}

/**
 *  @desc  节点移动和变大以及高亮
 */
function _nodeMoveScaleNormal(targetNode, targetName, callBackFunc, x, y, time) {
  time = time || GLOBAL_DATA.param.time.default;
  x = x || GLOBAL_DATA.role.rolePosition.leftRole.activePosition.x;
  y = y || GLOBAL_DATA.role.rolePosition.leftRole.activePosition.y;
  if (!targetNode) {
    targetNode = cc.find(targetName);
  }
  let moveAction = _nodePointMove(targetNode, null, x, y, null, time, false);
  let scaleAction = _nodeScale(targetNode, null, 1, time, false);
  let grayAction = _nodeToNormal(targetNode, null, time, false);
  targetNode.runAction(cc.spawn(moveAction, scaleAction, grayAction));
  targetNode.zIndex = 1001;
}

function _nodeRightMoveScaleNormal(targetNode, targetName, callBackFunc, x, y, time) {
  time = time || GLOBAL_DATA.param.time.default;
  x = x || GLOBAL_DATA.role.rolePosition.rightRole.activePosition.x;
  y = y || GLOBAL_DATA.role.rolePosition.rightRole.activePosition.y;
  if (!targetNode) {
    targetNode = cc.find(targetName);
  }
  let moveAction = _nodePointMove(targetNode, null, x, y, null, time, false);
  let scaleAction = _nodeScale(targetNode, null, 1, time, false);
  let grayAction = _nodeToNormal(targetNode, null, time, false);
  targetNode.runAction(cc.spawn(moveAction, scaleAction, grayAction));
  targetNode.zIndex = 1001;
}

/**
 *  @desc  判断人物节点是否存在
 */
function _judgeRoleNodeAlive(spriteFrameName) {
  var roleNodeParent = cc.director.getScene().getChildByName('Canvas').getChildByName('RoleBox');
  if (roleNodeParent.getChildByName(spriteFrameName)) {
    return roleNodeParent.getChildByName(spriteFrameName);
  }
  return false;
}

/**
 *  @desc  左边人物缩小移动变灰
 */
function _leftRoleMoveScaleGray(roleName) {
  if (_judgeRoleNodeAlive(roleName)) {
    let elmNode = _judgeRoleNodeAlive(roleName);
    _nodeMoveScaleGray(elmNode, null, null, GLOBAL_DATA.role.rolePosition.leftRole.initPosition.x, GLOBAL_DATA.role.rolePosition.leftRole.initPosition.y);
  } else {
    _putLoadNode(roleName, _nodeMoveScaleGray, GLOBAL_DATA.role.rolePosition.leftRole.initPosition.x, GLOBAL_DATA.role.rolePosition.leftRole.initPosition.y);
  }
}

/**
 *  @desc  右边人物缩小移动变灰
 */
function _rightRoleMoveScaleGray(roleName) {
  if (_judgeRoleNodeAlive(roleName)) {
    let elmNode = _judgeRoleNodeAlive(roleName);
    _nodeMoveScaleGray(elmNode, null, null, GLOBAL_DATA.role.rolePosition.rightRole.initPosition.x, GLOBAL_DATA.role.rolePosition.rightRole.initPosition.y);
  } else {
    _putLoadNode(roleName, _nodeRightMoveScaleGray, GLOBAL_DATA.role.rolePosition.rightRole.initPosition.x, GLOBAL_DATA.role.rolePosition.rightRole.initPosition.y);
  }
}

/**
 *  @desc  左边人物放大移动高亮
 */
function _leftRoleMoveScaleNormal(roleName) {
  if (_judgeRoleNodeAlive(roleName)) {
    let elmNode = _judgeRoleNodeAlive(roleName);
    _nodeMoveScaleNormal(elmNode);
  } else {
    _putLoadNode(roleName, _nodeMoveScaleNormal, GLOBAL_DATA.role.rolePosition.leftRole.initPosition.x, GLOBAL_DATA.role.rolePosition.leftRole.initPosition.y);
  }
}

/**
 *  @desc  右边人物放大移动高亮
 */
function _rightRoleMoveScaleNormal(roleName) {
  if (_judgeRoleNodeAlive(roleName)) {
    let elmNode = _judgeRoleNodeAlive(roleName);
    _nodeRightMoveScaleNormal(elmNode);
  } else {
    _putLoadNode(roleName, _nodeRightMoveScaleNormal, GLOBAL_DATA.role.rolePosition.rightRole.initPosition.x, GLOBAL_DATA.role.rolePosition.rightRole.initPosition.y);
  }
}

/**
 *  @desc  弹窗弹出
 *  @param {} targetNode 
 */
function propShow(targetNode) {

}

/**
 * @desc  关闭弹窗
 * @param  {} targetNode 
 */
function closeDialog(obj) {
  let rootNode = _findRootNode(obj._clickEvent.target);
  rootNode.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(function (event) {
    console.log(event);
    event.removeAllChildren();
    event.destroy();
  }, rootNode, rootNode)));
}

/**
 * @desc  寻找节点根节点
 * @param {cc.Node} targetNode 
 */
function _findRootNode(targetNode) {
  let targetNodeParent = targetNode.parent;
  if (targetNodeParent.parent == null) {
    return targetNode;
  }else{
    return _findRootNode(targetNodeParent);
  }
}



/* 剧情相关功能 */
/**
*  @description  判断当前剧情是否读取完毕
*/
function _isReadOver(targetNode) {
  let plot = _readCurrentPlot();
  if (targetNode.getComponent(cc.RichText).string == plot.content) return true;
  return false;
}

/**
*  @description  读取当前剧情
*/
function _readCurrentPlot() {
  let plot = new Plot(PLOT_DATA[GLOBAL_DATA.plot.currentPlot]);
  return plot;
}

/**
*  @description  打字机形式文本输出
*  @param  {*}  obj
*  @param  {*}  plotArray
*  @param  {*}  flag
*/
function _pirntPlotTypewriter(targetNode, plot, callback) {
  targetNode.getChildByName('RoleName').getComponent(cc.RichText).string = DataCache.getRoleNameMap(plot.senderId);
  targetNode.getChildByName('RoleDialog').getComponent(cc.RichText).string = '';
  // console.info(targetNode);
  if (!plot.content) { console.error('plot dose not definey'); return; }
  let plotArray = plot.content.split('');
  // console.info(plotArray);
  _pirntPlotTypewriter._printTimeout = function (targetNode, plotArray) {
    if (targetNode) {
      let pintTimeout = setTimeout(function () {
        if (plotArray[0] && GLOBAL_DATA.plot.timeInterval) {
          targetNode.getChildByName('RoleDialog').getComponent(cc.RichText).string += plotArray[0];
          plotArray.shift();
          _pirntPlotTypewriter._printTimeout(targetNode, plotArray);
        } else {
          clearTimeout(pintTimeout);
          if (callback) callback();
        }
      }, 50);
    }
  }
  _pirntPlotTypewriter._printTimeout(targetNode, plotArray);
}

/**
 *  @desc 直接输出文本
 */
function _printPlotInstant(targetNode, plot) {
  targetNode.getComponent(cc.RichText).string = plot.content;
}

/**
*  @description  通过名字获取目标节点
*  @param {参数包装} obj 
*/
function _findDialogTextNode(obj) {
  return cc.find(GLOBAL_DATA[obj.target]);
}



// 背包系统
/**
 *  @desc  加载背包
 */
function loadBackpack(obj) {
  let props = BackpackController.loadAllProp();
  if (!props) console.info('null props')
  let propBackpackNode = cc.instantiate(obj.prefabPool[0]);
  let propboxNode = propBackpackNode.getChildByName('PropBox');
  let propUrlList = [];
  for (let i = 0; i < props.length; i++) {
    propUrlList.push(props[i].url);
  }
  if (propUrlList.length > 0) {
    cc.loader.loadResArray(propUrlList, cc.SpriteFrame, function (err, assets) {
      if (err) {
        cc.error(err);
        return;
      }
      var spriteFrames = assets;
      console.info(spriteFrames);
      for (let i = 0; i < spriteFrames.length; i++) {
        var propNode = cc.instantiate(obj.prefabPool[1]);
        propNode.name = props[i].id;
        propNode.getComponent(cc.Sprite).spriteFrame = spriteFrames[i];
        propNode.getChildByName('PropNum').getComponent(cc.Label).string = props[i].num;
        propboxNode.addChild(propNode);
      }
    });
  }
  _addPrefab(propBackpackNode);
}

/**
 *  @desc  使用物品
 */
function userProp(obj) {
  let targetNode = obj._clickEvent.target;
  let propNum = targetNode.getChildByName('PropNum').getComponent(cc.Label).string;
  if (BackpackController.reduceProp(targetNode.name)) {
    targetNode.getChildByName('PropNum').getComponent(cc.Label).string = parseInt(propNum) - 1;
  }
  console.info(targetNode.name);
}

/**
 *  @desc  添加预制体到scene的指定位置下
 */
function _addPrefab(node, x, y) {
  var scene = cc.director.getScene();
  if (x && y) node.setPosition(x, y);
  scene.addChild(node);
}



//  存档系统
/**
 *  @desc  显示存档界面
 */
function showStoreView(obj) {
  let storeFileViewNode = _loadStorageData();
  storeFileViewNode.setPosition(GLOBAL_DATA.userDeviceInfo.width / 2, GLOBAL_DATA.userDeviceInfo.height / 2);
  storeFileViewNode.runAction(cc.fadeOut(1));
  storeFileViewNode.runAction(cc.fadeIn(1));
}

/**
 *  @desc  加载存档
 */
function _loadStorageData() {
  let storageDatas = GameStorageFileController.loadAllStorageData();
  let storeFileViewNode = cc.find('StoreDataPrefab');
  for (let key in storageDatas) {
    if (storageDatas[key].status) {
      storeFileViewNode.children[key].getChildByName('FileName').getComponent(cc.RichText).string = '已存档';
      storeFileViewNode.children[key].getChildByName('FileDescription').getComponent(cc.RichText).string = '测试存档' + key;
      storeFileViewNode.children[key].getChildByName('FileStoreTime').getComponent(cc.RichText).string = storageDatas[key].time;
    }
  }
  return storeFileViewNode;
}



// 任务系统
/**
 *  @desc  显示任务界面
 */
function showTaskView(obj) {
  // _loadTaskView();
  let taskViewNode = cc.find('TaskDataPrefab');
  console.info(taskViewNode);
  if (!taskViewNode) {
    taskViewNode = _loadTaskViewByPrefab(obj);
    _addPrefab(taskViewNode, GLOBAL_DATA.userDeviceInfo.width / 2, GLOBAL_DATA.userDeviceInfo.height / 2);
  }
  taskViewNode.runAction(cc.sequence(cc.fadeIn(0.3), cc.callFunc(function(taskViewNode){
    _cleanCompletedTask(taskViewNode);
  }, taskViewNode, taskViewNode)));
}

/**
 *  @desc  遍历任务消除已完成任务
 */
function _cleanCompletedTask(targetNode) {
  let taskNodes = targetNode.getChildByName('TaskPanelPrefab').getChildByName('TaskBox').children;
  for (let index in taskNodes) {
    if (GameTaskController.getTaskDataById(taskNodes[index].name).status == 1) {
      if (GameTaskController.delTaskDataById(taskNodes[index].name)) {
        taskNodes[index].runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(_removeNode, taskNodes[index], taskNodes[index])));
      }
    }
  }
}

/**
 *  @desc  移除节点
 */
function _removeNode (targetNode) {
  targetNode.destroy();
}

/**
 *  @desc  加载任务
 */
function _loadTaskView() {
  let taskDatas = GameTaskController.getAllTaskData();
  cc.loader.loadRes(GLOBAL_DATA.prefab.taskDialogPrefab, function (err, dialogPrefab) {
    if (err) {
      cc.error(err.message || err);
      return;
    }
    let dialogPrefabNode = cc.instantiate(dialogPrefab);
    let taskBoxNode = dialogPrefabNode.getChildByName('TaskBox');
    console.info(taskBoxNode);
    cc.loader.loadRes(GLOBAL_DATA.prefab.taskDataPrefab, function (err, dataPrefab) {
      if (err) {
        cc.error(err.message || err);
        return;
      }
      for (let key in taskDatas) {
        let dataPrefabNode = cc.instantiate(dataPrefab);
        dataPrefabNode.name = taskDatas[key]['0'];
        dataPrefabNode.getChildByName('TaskNumber').getComponent(cc.RichText).string = taskDatas[key]['0'];
        dataPrefabNode.getChildByName('TaskName').getComponent(cc.RichText).string = taskDatas[key]['3'];
        dataPrefabNode.getChildByName('TaskContent').getComponent(cc.RichText).string = taskDatas[key]['4'];
        taskBoxNode.addChild(dataPrefabNode);
      }
    });
    console.info(dialogPrefabNode);
    return dialogPrefabNode;
  });
}

/**
 *  @desc  通过传入预制体加载任务
 */
function _loadTaskViewByPrefab(obj) {
  let taskDatas = GameTaskController.getAllTaskData();
  let dialogPrefabNode = cc.instantiate(obj.prefabPool[0]);
  let taskBoxNode = dialogPrefabNode.getChildByName('TaskPanelPrefab').getChildByName('TaskBox');
  for (let key in taskDatas) {
    let dataPrefabNode = cc.instantiate(obj.prefabPool[1]);
    dataPrefabNode.name = taskDatas[key].id;
    dataPrefabNode.getChildByName('TaskNumber').getComponent(cc.RichText).string = taskDatas[key].id;
    dataPrefabNode.getChildByName('TaskName').getComponent(cc.RichText).string = taskDatas[key].title;
    dataPrefabNode.getChildByName('TaskContent').getComponent(cc.RichText).string = taskDatas[key].content;
    taskBoxNode.addChild(dataPrefabNode);
  }
  return dialogPrefabNode;
}



//  人物系统
/**
 *  @desc  人物界面展示
 */
function showRoleAttribute(obj) {
  let roleDatas = GameRoleController.getAllRoleData();
  _loadRoleViewByPrefab(obj);
}

/**
 *  @desc  加载人物数据到预制体中
 */
function _loadRoleViewByPrefab(obj) {
  let rolePropertyNode = cc.instantiate(obj.prefabPool[0]);
  let roleNodes = rolePropertyNode.getChildByName('RolePropertyPannel').getChildByName('RolePropertyBox').getChildByName('view').getChildByName('content').children;
  for (let index in roleNodes) {
    roleNodes[index].zIndex = roleNodes.length - index + 1000;
  }
  _addPrefab(rolePropertyNode);
}

/**
 *  @desc  显示人物角色详细信息
 */
function showRoleInfo (obj) {
  let roleInfoNode = _loadRoleInfo(obj);
  _addPrefab(roleInfoNode);
  roleInfoNode.getComponent(cc.PageView).scrollToPage(parseInt(obj._clickEvent.target.name.split('')[1]), 0);
}

/**
 *  @desc  加载人物属性详细信息
 */
function _loadRoleInfo (obj) {
  let rolePropertyPageNode = cc.instantiate(obj.prefabPool[2]);
  let rolePropertyPageContent = rolePropertyPageNode.getChildByName('view').getChildByName('content');
  let roleInfoPrefabs = _loadAllRoleInfoPrefab(obj);
  for (let index in roleInfoPrefabs) {
    rolePropertyPageContent.addChild(roleInfoPrefabs[index]);
  }
  return rolePropertyPageNode;
}

/**
 *  @desc  加载所有人物详细信息
 */
function _loadAllRoleInfoPrefab (obj) {
  let roleDatas = GameRoleController.getAllRoleData();
  let roleInfoPrefabs = [];
  for (let key in roleDatas) {
    let roleModel = roleDatas[key];
    let roleInfoNode;
    if (roleModel.status == 1) { // 正常显示信息
      roleInfoNode = cc.instantiate(obj.prefabPool[1]);
      let propertyNodes = roleInfoNode.getChildByName('RoleInfoPannel').getChildByName('RoleInfo').children;
      for (let key in propertyNodes) {
        let childrenNodes = propertyNodes[key].children;
        if (childrenNodes.length == 2) {
          childrenNodes[1].getComponent(cc.RichText).string = roleModel[key] + '';
        } else if (childrenNodes.length == 3) {
          let progressBar = childrenNodes[1]._components;
          if (roleModel[key]==10) {
            continue;
          } else if (roleModel[key] < 10) {
            progressBar[1].progress = 1 - (10 - roleModel[key]) / 10;
          } else {
            progressBar[2].progress = 1 - (roleModel[key] - 10) / 10;
          }
        }
      }
    } else if (roleModel.status == 0) { // 角色未开启
      roleInfoNode = cc.instantiate(obj.prefabPool[0]);
    } else if (roleModel.status == 2) { // 未开启
      continue;
    }
    roleInfoPrefabs.push(roleInfoNode);
  }
  return roleInfoPrefabs;
}

// 商城系统
/**
 *  @desc  显示商城界面
 */
function mallShow (obj, callback) {
  
}