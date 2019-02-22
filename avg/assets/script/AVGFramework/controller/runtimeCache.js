export var prefabCache = {};

export var nodeCache = {};

export function nodeCreate(sceneNodeModule) {
  if (nodeCache[sceneNodeModule.id]) {
    return nodeCache[sceneNodeModule.id]
  } else {
    var node = cc.instantiate(prefabCache[sceneNodeModule.id]);
    cc.find('Canvas').addChild(node);
    let pos = sceneNodeModule.position;
    nodeCache[sceneNodeModule.id] = node;
    // node.setPosition(pos.x, pos.y);
    // node.zIndex(pos.z);
    return node;
  }
}