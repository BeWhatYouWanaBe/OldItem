/**
 * @desc 此脚本为扩展CocosCreator引擎API的相关方法
 */


/**@desc 扩展Animation的EventType用于区分动画回调类型 */
cc.Animation.prototype.EventType = cc.Enum({
  /**
   * !#en Emit when begin playing animation
   * !#zh 开始播放时触发
   * @property {String} PLAY
   * @static
   */
  PLAY: 'play',
  /**
   * !#en Emit when stop playing animation
   * !#zh 停止播放时触发
   * @property {String} STOP
   * @static
   */
  STOP: 'stop',
  /**
   * !#en Emit when pause animation
   * !#zh 暂停播放时触发
   * @property {String} PAUSE   
   * @static
   */
  PAUSE: 'pause',
  /**
   * !#en Emit when resume animation
   * !#zh 恢复播放时触发
   * @property {String} RESUME
   * @static
   */
  RESUME: 'resume',
  /**
   * !#en If animation repeat count is larger than 1, emit when animation play to the last frame
   * !#zh 假如动画循环次数大于 1，当动画播放到最后一帧时触发
   * @property {String} LASTFRAME
   * @static
   */
  LASTFRAME: 'lastframe',
  /**
   * !#en Emit when finish playing animation
   * !#zh 动画播放完成时触发
   * @property {String} FINISHED
   * @static
   */
  FINISHED: 'finished'
});
// 抖动 动画
cc.Shake = cc.ActionInterval.extend({
  _initial_x: 0,
  _initial_y: 0,
  _strength_x: 0,
  _strength_y: 0,
  /**
   *  创建抖动动画
   * @param {number} duration     动画持续时长
   * @param {number} strength_x   抖动幅度： x方向
   * @param {number} strength_y   抖动幅度： y方向
   * @returns {Shake}
   */
  ctor: function (duration, strength_x, strength_y) {
    cc.ActionInterval.prototype.ctor.call(this);
    this.initWithDuration(duration, strength_x, strength_y);
  },
  initWithDuration(duration, strength_x, strength_y) {
    cc.ActionInterval.prototype.initWithDuration.call(this, duration)
    this._strength_x = strength_x;
    this._strength_y = strength_y;
    return true;
  },
  update() {
    let randx = Math.randomInt(-this._strength_x, this._strength_x);
    let randy = Math.randomInt(-this._strength_y, this._strength_y);
    this.getTarget().setPosition(randx + this._initial_x, randy + this._initial_y);
  },
  startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._initial_x = target.x;
    this._initial_y = target.y;
  },
  stop() {
    this.getTarget().setPosition(new cc.Vec2(this._initial_x, this._initial_y));
    cc.ActionInterval.prototype.stop.call(this);
  },
});
/**
  *  创建抖动动画
  * @param {number} duration     动画持续时长
  * @param {number} strength_x   抖动幅度： x方向
  * @param {number} strength_y   抖动幅度： y方向
  * @returns {Shake}
*/
cc.shake = function (duration, strength_x, strength_y) {
  return new cc.Shake(duration, strength_x, strength_y);
};

/**@desc 扩展运算符 */
var Operation = {
  "+": (v1, v2) => parseInt(v1) + parseInt(v2),
  "-": (v1, v2) => parseInt(v1) - parseInt(v2),
  "*": (v1, v2) => parseInt(v1) * parseInt(v2),
  "/": (v1, v2) => parseInt(v1) / parseInt(v2),
  ">": (v1, v2) => parseInt(v1) > parseInt(v2),
  "<": (v1, v2) => parseInt(v1) < parseInt(v2),
  ">=": (v1, v2) => parseInt(v1) >= parseInt(v2),
  "<=": (v1, v2) => parseInt(v1) <= parseInt(v2),
  "=": (v1, v2) => parseInt(v1) == parseInt(v2)
}
window.Operation = Operation;

