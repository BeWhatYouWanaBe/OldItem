

cc.Class({
  extends: cc.Component,
  properties: {
    selectPrefab: cc.Prefab,
    selectRoot: cc.Node,
  },
  /**
   * @desc 初始化选项
   * @param {*} id 选项id
   * @param {*} text 选项内容
   * @param {*} callback 点击回调  
   */
  init(indexList, textList, callback) {
    for (let i = 0; i < indexList.length; i++) {
      let index = indexList[i];
      let text = textList[i];
      this.insSelectNode(index, text, callback);
    }
  },

  insSelectNode(id, text, callback) {
    let selectNode = cc.instantiate(this.selectPrefab);
    selectNode.name = id;
    this.selectRoot.addChild(selectNode);
    selectNode.getComponent('selectCmpt').init(id, text, callback);
  }

});
