
/**
 * @desc UI相对位置
 */
export const ViewPosition = cc.Enum({
  CENTER: 0,
  UP: 1,
  DOWN: 2,
})
/**
 * @desc 选择的类型
 */
export const SelectType = cc.Enum({
  DEFAULT: 0,
  TIME: 1,
})
/**
 * @desc 移动场景的类型
 */
export const moveSceneType = cc.Enum({
  DEFAULT: 0,
  CUSTOM_POINT: 1,
})
/**
 * @desc 节点旋转类型
 */
export const nodeRotationType = cc.Enum({
  ONCE: 0,
  LOOP: 1,
})

export const nodeReverseType = cc.Enum({
  HORIZONTAL: 0,
  VERTICAL: 1,
})

export const cameraShakeType = cc.Enum({
  SMALL: 0,
  MEDIUM: 1,
  BIG: 2,
})