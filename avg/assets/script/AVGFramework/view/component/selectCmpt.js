

var mCallback;
cc.Class({
  extends: cc.Component,
  properties: {
    TextBox: cc.RichText,
  },
  /**
   * @desc 初始化选项
   * @param {*} id 选项id
   * @param {*} text 选项内容
   * @param {*} callback 点击回调  
   */
  init(id, text, callback) {
    this.TextBox.string = '<color=ffffff>' + text + '</>';
    mCallback = callback;
  },

  onClick() {
    // console.log(this.name);
    mCallback(this.node.name);
  }
});