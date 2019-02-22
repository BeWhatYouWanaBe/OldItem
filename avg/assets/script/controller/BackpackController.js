/**
 *  @desc    背包控制接口
 *  @time    2018-10-29  10:20
 *  @author  CkBianbian
 */

const Prop = require('../AVGFramework/data/prop_data');
const Player = require('../AVGFramework/data/player_data');
const PropModel = require('../model/SyfsPropModel');

var BackpackController = {
    // 加载所有道具方法
    loadAllProp: function () {
        let props = [];
        for (let i = 0; i < Player.prop.length; i++) {
            let propId = Player.prop[i].id;
            let propNum = Player.prop[i].num;
            if (Prop[propId]) {
                let newProp = new PropModel(Prop[propId], propNum);
                props.push(newProp);
            } else {
                console.info('没有道具:', propId);
                continue;
            }
        }
        if(props) return props;
        return null;
    },
    // 通过道具ID查询道具
    loadPropById: function (id) {
        if(!id) return null;
        let propNum = 0;
        for (let i = 0; i < Player.prop.length; i++) {
            if (Player.prop[i].id == id) {
                propNum = Player.prop[i].num;
                break;
            }
        }
        return new PropModel(Prop[id], propNum);
    },
    // 减少某个道具数量
    reduceProp: function (id) {
        let propNum = 0;
        for (let i = 0; i < Player.prop.length; i++) {
            if (Player.prop[i].id == id) {
                propNum = Player.prop[i].num;
                if (propNum > 0) {
                    propNum -= 1;
                    Player.prop[i].num = propNum;
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    },
    // 增加某个道具数量
    addProp: function (id) {
        let propNum = 0;
        for (let i = 0; i < Player.prop.length; i++) {
            if (Player.prop[i].id == id) {
                propNum = Player.prop[i].num;
                propNum += 1;
                Player.prop[i].num = propNum;
                return true;
            }
        }
        return false;
    },
}
module.exports = BackpackController;