/**
 *  @desc    游戏存档接口
 *  @time    2018-10-29  10:15
 *  @author  CkBianbian
 */

const StorageData = require('../AVGFramework/data/storage_data');

var StorageFileController = {
    //  加载所有存档
    loadAllStorageData: function () {
        let gameStorageFile = StorageData.gameStorageFile;
        return gameStorageFile;
    },
    //  加载存档通过ID
    loadStorageFileById: function (id) {
        return StorageData.gameStorageFile[id];
    },
    //  修改存档通过ID
    storeStorageFileById: function (id, storeData) {
        StorageData.gameStorageFile[id] = storeData;
        if (StorageData.gameStorageFile[id] === storeData) return true;
        return false;
    },
}

module.exports = StorageFileController;