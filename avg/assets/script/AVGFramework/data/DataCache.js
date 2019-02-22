import { AttrMappingUrl, RoleAttrDir, RoleNameUrl, PlotsMappingUrl, PlotsDir, SceneConfigDir, SceneMappingUrl } from "./Constant";
import { PlotMsgModule } from "../module/DataModules/plotMsgModule";
import { SceneNodeModule } from "../module/DataModules/sceneNodeModule";
import { RoleAttrModule } from "../module/DataModules/roleAttrModule";

export class DataCache {
  static created = false;
  static instance = null;
  constructor() {
    if (!DataCache.created) {
      DataCache.created = true;
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }
  //============================

  //剧情相关索引
  static plotIndexs = {
    currOperaIndex: "0",
    currPlotIndex: "e0",
  }
  /**
   * @description 游戏剧情map
   */
  static _plotDataMap = new Map();
  /**
   * @description 游戏内属性map
   */
  static _attrMap = new Map();
  /**
   * @description 人物姓名
   */
  static _roleNameMap = new Map();
  /**
   * @description 场景名
   */
  // _sceneNameMap = new Map();
  /**
   * @description 场景节点配置
   */
  static _sceneNodesMap = new Map();
  //初始化map 
  static initCacheMap(callback) {
    //加载属性映射表
    // cc.loader.loadResDir('json', (comp, total, item) => { console.log('已完成：' + comp, '总共：' + total) }, (err, res) => {
    cc.loader.loadResDir('json', (err, res) => {
      //==========处理人物name
      let names = cc.loader.getRes(RoleNameUrl).json;
      for (let k1 in names) {
        if (!names.hasOwnProperty(k1)) return;
        let v1 = names[k1];
        this._roleNameMap.set(k1, v1.name);
      }

      //==========处理人物属性
      let attrMapping = cc.loader.getRes(AttrMappingUrl).json;
      for (let k2 in attrMapping) {
        if (!attrMapping.hasOwnProperty(k2)) return;
        let v2 = attrMapping[k2]
        let table = cc.loader.getRes(RoleAttrDir + '/' + attrMapping[k2].tableName).json;
        let tempMap = new Map();
        for (let k3 in table) {
          if (!table.hasOwnProperty(k3)) return;
          let v3 = table[k3];
          //==========根据属性处理对应的值
          switch (v3.attrType) {
            case 'number':
              v3.value = parseInt(v3.value);
              break;
            case 'string':
              v3.value = String(v3.value);
              break;
            case 'boolean':
              v3.value = Boolean(v3.value);
              break;
            default:
              console.log('人物属性类型错误,请检查json文件类型配置');
              break;
          }
          tempMap.set(k3, new RoleAttrModule(v3));
        }
        this._attrMap.set(v2.id, tempMap);
      }

      //==========处理剧情表
      let plotMapping = cc.loader.getRes(PlotsMappingUrl).json;
      for (let k4 in plotMapping) {
        if (!plotMapping.hasOwnProperty(k4)) return;
        let v4 = plotMapping[k4];
        let table = cc.loader.getRes(PlotsDir + '/' + v4.tableName).json;
        let tempMap = new Map();
        for (let k5 in table) {
          let v5 = table[k5];
          tempMap.set(k5, new PlotMsgModule(v5));
        }
        this._plotDataMap.set(k4, tempMap);
      }

      //==========加载场景配置文件夹
      let sceneMapping = cc.loader.getRes(SceneMappingUrl).json;
      for (let k in sceneMapping) {
        if (!sceneMapping.hasOwnProperty(k)) return;
        let v = sceneMapping[k];
        // this._sceneNameMap.set(k, v.name);
        // let table = cc.loader.getRes(SceneConfigDir + '/' + v.name).json;
        // let tempMap = new Map();
        // for (let k in table) {
        //   let v = table[k];
        //   tempMap.set(k, new SceneNodeModule(v));
        // }
        this._sceneNodesMap.set(k, v);
      }
      //==========释放资源
      cc.loader.releaseResDir(RoleAttrDir);
      if (callback) callback();
    });
  };
  /**
   * @description 获取AttrMap中的属性
   * @param {String} key1 人物ID
   * @param {String} key2 属性ID
   * @returns {Object} value
   */
  static getAttrMap(key1, key2) {
    //校验参数合法性
    if (key1 && key2)
      return this._attrMap.get(key1).get(key2).value;
    else
      throw new Error('getAttrMap参数不能为空');
  }
  /**
   * @description 设置AttrMap中的属性
   * @param {String} key1 人物ID
   * @param {String} key2 属性ID
   */
  static setAttrMap(key1, key2, value) {
    //校验参数合法性
    if (key1 && key2 && value) {
      //校验合法值
      if (this._attrMap.get(key1).get(key2).attrType == 'number') {
        let min = this._attrMap.get(key1).get(key2).ranges[0];
        let max = this._attrMap.get(key1).get(key2).ranges[1];
        if (value < min) { this._attrMap.get(key1).get(key2).value = min; return; }
        if (value > max) { this._attrMap.get(key1).get(key2).value = max; return; }
      }
      this._attrMap.get(key1).get(key2).value = value;
    }
    else {
      throw new Error('setAttrMap参数不能为空');
    }
  }
  /**
     * @description 获取当前剧情数据
     * @returns {PlotMsgModule} 消息数据模型对象
     */
  static getCurrPlotData() {
    return this._plotDataMap.get(this.plotIndexs.currOperaIndex).get(this.plotIndexs.currPlotIndex);
  }
  /**
   * @description 获取剧情数据
   * @param {String} key1 剧本Id
   * @param {String} key2 对话Id
   * @returns {PlotMsgModule} 消息数据模型对象
   */
  static getPlotDataMap(key1, key2) {
    //校验参数合法性
    if (key1 && key2)
      return this._plotDataMap.get(key1).get(key2);
    else
      throw new Error('getPlotDataMap参数不能为空');
  }
  /**
   * @description 获取资源配置
   * @param {String} key 资源Id
   * @returns {SceneNodeModule} 节点数据模型对象
   */
  static getSceneNodesMap(key) {
    //校验参数合法性
    if (key)
      return this._sceneNodesMap.get(key);
    else
      throw new Error('getSceneNodesMap参数不能为空');
  }
  /**
   * @description 
   * @param {String} key 人物Id
   * @returns {String} 人物姓名
   */
  static getRoleNameMap(key) {
    //校验参数合法性
    if (key)
      return this._roleNameMap.get(key);
    else
      throw new Error('getRoleNameMap参数不能为空');
  }
  /**
   * @description
   * @param {String} key 场景Id
   * @returns {String} 场景名
   */
  static getSceneNameMap(key) {
    //校验参数合法性
    if (key)
      return this._sceneNameMap.get(key);
    else
      throw new Error('getSceneNameMap参数不能为空');
  }
}

