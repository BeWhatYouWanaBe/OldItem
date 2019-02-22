
/**
 * @desc view组件执行事件枚举类型
 */
export const ActionType = cc.Enum({
  //TODO:数据类型action
  /**@description 等待 */
  WAITTIME: 0,
  //TODO:显示类型action
  /**@description 创建对话框 */
  CREATE_DIALOG: 100,
  /**@description 添加角色 */
  ADD_ROLE: 101,
  /**@description 移除角色 */
  REMOVE_ROLE: 102,
  /**@description 修改节点透明度 */
  NODE_TO_OPACITY: 103,
  /**@description 立绘变灰 */
  NODE_TO_GRAY: 104,
  /**@description 立绘恢复*/
  NODE_TO_NORMAL: 105,
  /**@description 节点缩放 */
  NODE_TO_SCALE: 106,
  /**@description 节点移动 */
  NODE_TO_MOVE: 107,
  /**@description 节点旋转 */
  NODE_TO_ROTATE: 108,
  /**@description 节点镜像 */
  NODE_TO_REVERSE: 109,
  /**@description 屏幕震动 */
  SCREEN_SHAKE: 110,
  /**@description 屏幕闪烁 */
  SCREEN_FLICKER: 111,
  //TODO:其他action
  /**@description 切换剧情场景 */
  SWITCH_PLOTSCENE: 200,
  /**@description 显示选项 */
  PLAYER_CHOOSE: 201,
});
