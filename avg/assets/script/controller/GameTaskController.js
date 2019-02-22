/**
 *  @desc  游戏任务控制接口
 */

var TaskData = require('../AVGFramework/data/task_data');

var GameTaskController = {
    //  获得所有任务数据
    getAllTaskData: function () {
        return TaskData;
    },
    //  获取指定ID任务数据
    getTaskDataById: function (id) {
        for (let index in TaskData) {
            if (TaskData[index].id == id){
                return TaskData[index];
            }
        }
    },
    //  删除指定任务通过ID
    delTaskDataById: function (id) {
        let delIndex = -1;
        for (let index in TaskData) {
            if (TaskData[index].id == id){
                delIndex = index;
                break;
            }
        }
        if (delIndex == -1) return false;
        if (TaskData.splice(delIndex, 1)) return true;
        return false;
    },
}

module.exports = GameTaskController;