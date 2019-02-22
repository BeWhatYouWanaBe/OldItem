var GLOBAL_DATA = {
    // 用户设备信息
    'userDeviceInfo': {
        'width': 1080,
        'height': 1920,
    },
    // 剧情
    'plot':{
        'currentPlot': 'p1',
        'nextPlot': '',
        'timeInterval': true,
    },
    // 剧情文本节点
    'dialog': 'Canvas/plotDialog',
    // prefab位置
    'prefab': {
        'narrationDialogPrefab': 'prefab/NarrationDialog',
        'taskDialogPrefab': 'prefab/taskPrefab/TaskDataPrefab',
        'taskDataPrefab': 'prefab/taskPrefab/TaskPrefab',
    },
    // role图片节点
    'roleSprite': {
        'mainrole': 'sprite/role/syfs_lead_eyesOpen_01',
        'role1': 'sprite/role/syfs_emper_01',
        'role2': 'sprite/role/syfs_lead_eyesOpen_01',
        'role3': 'sprite/role/syfs_prince_01',
    },
    // role
    'role': {
        'rolePosition': {
            'leftRole': {
                'initPosition': {
                    'x': 1080 / 10 * 1,
                    'y': 1920 / 10 * 4
                },
                'activePosition': {
                    'x': 1080 / 10 * 2,
                    'y': 1920 / 10 * 5
                },
            },
            'rightRole': {
                'initPosition': {
                    'x': 1080 / 10 * 9,
                    'y': 1920 / 10 * 5
                },
                'activePosition': {
                    'x': 1080 / 10 * 8,
                    'y': 1920 / 10 * 5
                },
            },
        },
    },
    // 参数
    'param': {
        'time': {
            'default': 0.3,
        },
    },
    // function
    'getUserDeviceInfo': function () {
      let windowSize = cc.winSize;
      cc.log("width="+windowSize.width+",height="+windowSize.height);
      GLOBAL_DATA.userDeviceInfo.width = Math.round(windowSize.width);
      GLOBAL_DATA.userDeviceInfo.height = Math.round(windowSize.height);
    },
}

window.GLOBAL_DATA = GLOBAL_DATA;