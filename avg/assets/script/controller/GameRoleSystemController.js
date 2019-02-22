/**
 *  @desc    人物属性系统控制类
 *  @author  CkBianbian
 *  @time    2018-11-1  11:19
 */
const RoleData = require('../AVGFramework/data/role_data');

var RoleAttributeController = {
    //  加载所有人物属性
    getAllRoleData: function () {
        return RoleData;
    },
    //  通过ID获取人物属性
    getRoleDataById: function (id) {
        return RoleData[id];
    },
    //  通过ID修改人物属性
    changeRoleAttributeById: function (id) {
        
        return RoleData[id];
    },
}

module.exports = RoleAttributeController;