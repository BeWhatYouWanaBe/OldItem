import { DataCache } from "../data/DataCache";
import { nodeCreate } from "./runtimeCache";




export class WaitTimeArgs {
  constructor(args) {
    this.time = args.time;
  }
}


export class PlayAnimArgs {
  constructor(args) {
    this.targetNode = nodeCreate(DataCache.getSceneNodesMap(args[0], args[1]));
    this.animName = args[2];
    this.startTime = args[3];
  }
}

export class StopAnimArgs {
  constructor(args) {
    this.targetNode = targetNode;
    this.animName = animName;
  }
}
export class SwitchSceneArgs {
  constructor(args) {
    this.switchSceneName = switchSceneName;
  }
}

export class PreloadSceneArgs {
  constructor(args) {
    this.switchSceneName = switchSceneName;
  }
}
export class ShowChooseArgs {
  constructor(args) {
    this.selectType = args[0];
    this.haveBg = args[1];
    this.selectPos = args[2];
    this.indexList = args[3];
    this.textList = args[4];
    this.time = args[5];
  }
}

export class MoveSceneArgs {
  constructor() {

  }
}

export class NodeOpacityArgs {
  constructor(args) {
    this.nodeOpacityNode = nodeOpacityNode;
    this.nodeOpacityValue = nodeOpacityValue;
  }
}

export class NodeRotationArgs {
  constructor(args) {
    this.nodeRotationSpeed = nodeRotationSpeed;
    this.nodeRotationType = nodeRotationType;
    this.nodeRotationTarget = nodeRotationTarget;
  }
}

export class NodeReverseArgs {
  constructor(args) {
    this.nodeReverseType = nodeReverseType;
    this.nodeReverseTarget = nodeReverseTarget;
  }
}

export class CameraShake {
  constructor(args) {
    this.speed = args[0];
    this.time = args[1];
  }
}


export class TowPersonChat {
  constructor(args) {
    this.targetNode = nodeCreate(DataCache.getSceneNodesMap(args[2]));
  }
}

export class TowRoleChat {
  constructor(args) {
    this.targetNode = nodeCreate(DataCache.getSceneNodesMap(args.dialogPrefab));
    this.plot = args;
  }
}


export class PutRoleArgs {
  constructor(args) {
    this.targetNode = nodeCreate(DataCache.getSceneNodesMap(args.roleId));
    this.x = args.x;
    this.y = args.y;
    this.isGray = args.isGray;
  }
}


export class NodeToGrayArgs {
  constructor(args) {
    this.targetNode = nodeCreate(DataCache.getSceneNodesMap(args.roleId));
    // this.instant = args.instant;
    this.time = args.time / 1000;
  }
}

export class NodeToNormalArgs {
  constructor(args) {
    this.targetNode = nodeCreate(DataCache.getSceneNodesMap(args.roleId));
    // this.instant = args.instant;
    this.time = args.time / 1000;
  }
}

export class NodeDestroyArgs {
  constructor(args) {
    this.targetNode = nodeCreate(DataCache.getSceneNodesMap('0', args[0]));
  }
}
/**@description 切换下一场剧情 */
export class SwitchStageArgs {
  constructor(args) {
    this.backgroundId = args.backgroundId;
    // this.roleIdList = args.roleIdList;
  }
}