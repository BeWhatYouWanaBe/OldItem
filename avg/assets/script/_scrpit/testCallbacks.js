import { eventFactory } from "../AVGFramework/controller/plotController"

var x = 0;
cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    targetNode: cc.Node,
  },

  onclick() {
    console.log('aaaa');
    let tintAction1 = cc.tintTo(0, 120, 120, 120);
    this.targetNode.runAction(tintAction1);
    setTimeout(() => {
      let tintAction2 = cc.tintTo(0.3, 255, 255, 255);
      this.targetNode.runAction(tintAction2);
    }, 30);
  }
  // LIFE-CYCLE CALLBACKS:

  // onLoad() {
  //   this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TOUCH_MOVE, this);
  // },

  // TOUCH_START() {

  // },
  // TOUCH_MOVE(event) {
  //   // console.log(event);
  //   var touch = event.touch;
  //   // console.log(touch);
  //   this.bg.x -= (touch.getLocationInView().x - touch.getPreviousLocationInView().x);
  //   // this.bg.y += (touch.getLocationInView().y - touch.getPreviousLocationInView().y);
  // },
  // TOUCH_END() {

  // },
  // TOUCH_CANCEL() {

  // },
  // selectCallback(id) {
  //   console.log('完成选项：'+id);
  // }

  // update (dt) {},
});
