
/// <reference path="./demo.ts" />
// 只能拿来做提示，不能让打包的时候将两个文件打包在一起， 所以还得单独设置

namespace Tsest{
  export class Todo{
    constructor(){
      new Demo.A()
      new Demo.B()
      new Demo.C()
      new Demo.D()
    }
  }
}