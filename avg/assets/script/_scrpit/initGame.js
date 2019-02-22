import { PlotMsgModule } from '../AVGFramework/module/DataModules/plotMsgModule';
import { DataCache } from '../AVGFramework/data/DataCache';
import { eventFactory } from '../AVGFramework/controller/plotController';
import { prefabCache } from '../AVGFramework/controller/runtimeCache';


cc.Class({
  extends: cc.Component,

  properties: {

  },

  onLoad() {
    // var dc = new DataCache();
    DataCache.initCacheMap(() => {
      cc.loader.loadRes(DataCache.getSceneNodesMap('role_0').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('role_0').id] = res;
      });
      cc.loader.loadRes(DataCache.getSceneNodesMap('role_8').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('role_8').id] = res;
      });
      cc.loader.loadRes(DataCache.getSceneNodesMap('role_9').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('role_9').id] = res;
      });
      cc.loader.loadRes(DataCache.getSceneNodesMap('cmpt_0').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('cmpt_0').id] = res;
      });
      cc.loader.loadRes(DataCache.getSceneNodesMap('cmpt_1').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('cmpt_1').id] = res;
      });
      cc.loader.loadRes(DataCache.getSceneNodesMap('cmpt_2').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('cmpt_2').id] = res;
      });
      cc.loader.loadRes(DataCache.getSceneNodesMap('cmpt_3').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('cmpt_3').id] = res;
      });
      cc.loader.loadRes(DataCache.getSceneNodesMap('cmpt_4').resUrl, (err, res) => {
        prefabCache[DataCache.getSceneNodesMap('cmpt_4').id] = res;
        console.log(prefabCache);
      });

      // console.log(DataCache._sceneNodesMap);
      // for (const key in DataCache._sceneNodesMap) {
      //   console.log(DataCache._sceneNodesMap);
      //   const o = DataCache._sceneNodesMap[key];
      //   console.log(o.resUrl);
      //   cc.loader.loadRes(o.resUrl, (err, res) => {
      //     prefabCache[o.id] = res;
      
      //   });
      // }
    });

  },

  onClick() {
    // cc.find('Canvas/Main Camera').getComponent(cc.Animation).play();
    // cc.find('Canvas/screenFlicker').getComponent(cc.Animation).play();
    eventFactory();
  }
});