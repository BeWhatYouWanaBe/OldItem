/**
 * @desc 模型基类
 */
export class ModuleDataBase {
  constructor() {
    if (new.target === ModuleDataBase)
      throw new Error("ModuleDataBase can't instantiation");
  }
  // getData(p, o) {
  //   o = o || this;
  //   return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
  // }
}

