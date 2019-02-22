var plot = {
    "p1":{
        "msgId": "p1",
        "senderId": "role1",
        "plotPerson": ["role1", "role3"],
        "style":"video",
        "type": '3', // 剧情类型 0 旁白 1 独白 2 二人对话 3 三人对话
        "content": "叶小姐，早安，现在时间是6:00。",
        "showPosition": 'bottom',
        "events": [
            {
                "eventName": "send",
                "eventParam": "s2"
            }
        ]
    },
    "p2":{
        "msgId": "p1",
        "senderId": "role3",
        "plotPerson": ["role1", "role3"],
        "style":"video",
        "type": '3', // 剧情类型 0 旁白 1 独白 2 二人对话 3 三人对话
        "content": "第二句话",
        "showPosition": 'bottom',
        "events": [
            {
                "eventName": "send",
                "eventParam": "s2"
            }
        ]
    },
    "p3":{
        "msgId": "p1",
        "senderId": "role2",
        "plotPerson": ["role2", "role1"],
        "style":"video",
        "type": '3', // 剧情类型 0 旁白 1 独白 2 二人对话 3 三人对话
        "content": "叶小姐，早安，现在时间是6:00。",
        "showPosition": 'bottom',
        "events": [
            {
                "eventName": "send",
                "eventParam": "s2"
            }
        ]
    },
}

module.exports = plot;