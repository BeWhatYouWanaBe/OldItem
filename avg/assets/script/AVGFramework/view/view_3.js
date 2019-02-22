import { ActionType } from "../controller/enum/ActionTypeEnum";
import { SelectType, moveSceneType, nodeRotationType, nodeReverseType, cameraShakeType } from "./enum/ViewDefinedEnum";
import { actionHandler } from "../controller/actionController";


var InputEvent = cc.Enum({
  TOUCH_END: 0,
  TOUCH_MOVE: 1,
});

cc.Class({
  extends: cc.Component,
  properties: {
    _clickEvent: cc.Touch,
    /**
     * @desc 节点触发事件
     */
    InputEvent: {
      default: InputEvent.TOUCH_END,
      type: InputEvent
    },
    /**
     * @desc 点击事件类型
     */
    ActionType: {
      default: ActionType.PLAY_ANIM,
      type: ActionType
    },
    /**
     * @desc 播放动画的目标节点
     */
    targetNode: {
      default: null,
      type: cc.Node,
      visible() { return this.ActionType == ActionType.PLAY_ANIM || this.ActionType == ActionType.STOP_ANIM },
      tooltip: "目标节点"
    },
    /**
     * @desc 动画名
     */
    animName: {
      default: "",
      visible() { return this.ActionType == ActionType.PLAY_ANIM || this.ActionType == ActionType.STOP_ANIM },
      tooltip: "目标动画名"
    },
    /**
     * @desc 动画播放的开始帧
     */
    startTime: {
      default: 0,
      visible() { return this.ActionType == ActionType.PLAY_ANIM },
      tooltip: "当前动画开始播放事件（单位：秒）"
    },
    //动画回调
    animCallbacks: {
      default: [],
      type: cc.Component.EventHandler,
      visible() { return this.ActionType == ActionType.PLAY_ANIM },
      tooltip: "动画播放回调 共六个 0-5对应onPlay onStop onLastframe onFinished onPause onResume",
    },
    /**
     * @desc 切换场景名 string类型
     */
    switchSceneName: {
      default: "",
      visible() { return this.ActionType == ActionType.SWITCH_SCENE },
      tooltip: "切换到的场景名"
    },
    /**
     * @desc 切换场景完成时的回调
     */
    switchSceneCallback: {
      default: null,
      type: cc.Component.EventHandler,
      visible() { return this.ActionType == ActionType.SWITCH_SCENE },
      tooltip: "切换场景完成时回调",
    },
    /**
     *  @desc  对话框prefab
     */
    prefabPool: {
      default: [],
      type: cc.Prefab,
      visible() { return this.ActionType == ActionType.FUNCTION_TEST 
        || this.ActionType == ActionType.TASK_VIEW_SHOW 
        || this.ActionType == ActionType.STORE_VIEW_SHOW
        || this.ActionType == ActionType.ROLE_CHOOSE_VIEW_SHOW
        || this.ActionType == ActionType.ROLE_INFO_VIEW_SHOW
      },
      tooltip: "所有类型对话框预制体",
    },
    /**
     *  @desc  图片资源spriteFrame
     */
    spriteFramePool: {
      default: [],
      type: cc.SpriteFrame,
      visible() { return this.ActionType == ActionType.FUNCTION_TEST || this.ActionType == ActionType.TASK_VIEW_SHOW || this.ActionType == ActionType.STORE_VIEW_SHOW || this.ActionType == ActionType.ROLE_VIEW_SHOW},
      tooltip: "图片资源",
    },
    /**
     * @desc 选项类型
     */
    selectType: {
      default: SelectType.DEFAULT,
      type: SelectType,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE },
      tooltip: "选项类型",
    },
    /**
    * @desc 选项是否有背景
    */
    haveBg: {
      default: true,
      visible() { return this.ActionType == ActionType.SHOW_CHOOSE },
      tooltip: "选项是否有背景",
    },
    /**
    * @desc 如果有背景 背景图片资源
    */
    backgroundSprite: {
      default: null,
      type: cc.SpriteFrame,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE && this.haveBg == true },
      tooltip: "背景图片",
    },
    /**
     * @desc 倒计时模式下 倒计时的时常
     */
    selectTime: {
      default: 0,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE && this.selectType === SelectType.TIME },
      tooltip: "倒计时时长",
    },
    /**
     * @desc 倒计时label
     */
    selectTimeLabel: {
      default: null,
      type: cc.Label,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE && this.selectType === SelectType.TIME },
      tooltip: "用于展现倒计时的label",
    },
    /**
    * @desc 选项数量
    */
    selectNum: {
      default: 0,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE },
      tooltip: "可以选择的数量"
    },
    /**
     * @desc 选项按钮的根节点
     */
    selectRoot: {
      default: null,
      type: cc.Node,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE && this.ActionType == ActionType.SHOW_CHOOSE },
      tooltip: "选项按钮的根节点",
    },
    /**
     * @desc 选项组件的背景
     */
    background: {
      default: null,
      type: cc.Sprite,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE && this.ActionType == ActionType.SHOW_CHOOSE },
      tooltip: "选项组件的背景",
    },
    /**
     * @desc 选项按钮的预制体
     */
    selectPrefab: {
      default: null,
      type: cc.Prefab,
      visible() { return this.ActionType === ActionType.SHOW_CHOOSE && this.ActionType == ActionType.SHOW_CHOOSE },
      tooltip: "选项按钮的预制体",
    },
    /**@desc 选项完成时的回调 */
    selectCallback: {
      default: [],
      type: cc.Component.EventHandler,
      visible() { return this.ActionType == ActionType.SHOW_CHOOSE },
      tooltip: "选项完成时回调"
    },
    /**
     * @desc 场景的相机
     */
    moveSceneCamera: {
      default: null,
      type: cc.Node,
      visible() { return this.ActionType == ActionType.MOVE_SCENE },
      tooltip: "场景的相机"
    },
    moveSceneType: {
      default: moveSceneType.DEFAULT,
      type: moveSceneType,
      visible() { return this.ActionType == ActionType.MOVE_SCENE },
      tooltip: "移动场景的类型"
    },
    moveScenePoints: {
      default: [],
      type: cc.Vec2,
      visible() { return this.ActionType == ActionType.MOVE_SCENE && this.moveSceneType == moveSceneType.CUSTOM_POINT },
    },
    /**
     * @desc 场景最大宽度
     */
    moveSceneMaxWidth: {
      default: 0,
      visible() { return this.ActionType == ActionType.MOVE_SCENE },
      tooltip: "场景最大宽度,如果超出实际宽度会导致有黑边",
    },
    /**
     * @desc 节点
     */
    nodeOpacityNode: {
      default: null,
      type: cc.Node,
      visible() { return this.ActionType == ActionType.NODE_OPACITY }
    },
    /**
     * @desc 节点透明度
     */
    nodeOpacityValue: {
      default: 0,
      visible() { return this.ActionType == ActionType.NODE_OPACITY }
    },
    /**
     * @desc 节点旋转目标
     */
    nodeRotationTarget: {
      default: null,
      type: cc.Node,
      visible() { return this.ActionType == ActionType.NODE_ROTATION },
    },
    /**
     * @desc 节点旋转类型
     */
    nodeRotationType: {
      default: nodeRotationType.ONCE,
      type: nodeRotationType,
      visible() { return this.ActionType == ActionType.NODE_ROTATION },
    },
    /**
     * @desc 节点旋转速度 
     */
    nodeRotationSpeed: {
      default: 0,
      visible() { return this.ActionType == ActionType.NODE_ROTATION },
    },
    /**
    * @desc 节点镜像目标
    */
    nodeReverseTarget: {
      default: null,
      type: cc.Node,
      visible() { return this.ActionType == ActionType.NODE_REVERSE },
    },
    /**
     * @desc 节点镜像类型 
     */
    nodeReverseType: {
      default: nodeReverseType.HORIZONTAL,
      type: nodeReverseType,
      visible() { return this.ActionType == ActionType.NODE_REVERSE },
    },
    /**
     * @desc 相机抖动目标
     */
    cameraShakeTarget: {
      default: null,
      type: cc.Node,
      visible() { return this.ActionType == ActionType.CAMERA_SHAKE },
    },
    /**
     * @desc 相机抖动类型 
     */
    cameraShakeType: {
      default: cameraShakeType.SMALL,
      type: cameraShakeType,
      visible() { return this.ActionType == ActionType.CAMERA_SHAKE },
    },
    /**
     * @desc 抖动时长
     */
    cameraShakeTime: {
      default: 0,
      visible() { return this.ActionType == ActionType.CAMERA_SHAKE },
    },

    cameraShakeSpeed: {
      default: 0.1,
      visible() { return this.ActionType == ActionType.CAMERA_SHAKE },
    }
  },

  /**@desc 初始化组件相关 */
  onLoad() {
    this.InputEvent == InputEvent.TOUCH_END && this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    this.InputEvent == InputEvent.TOUCH_MOVE && this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onClick, this);
  },

  onClick(event, customData) {
    this._clickEvent = event;
    actionHandler(this.ActionType, this);
  },
});

