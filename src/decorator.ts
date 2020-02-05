
// 类装饰器
// function Todo(){
//   return function <T extends new (...arg:any[])=>any>(constructor: T){
//     return class extends constructor{
//       name = 'billy'
//       getName(){
//         return this.name
//       }
//     }
//   }
// }

// const Tesst = Todo()(class Person{
//   name: string
//   constructor(name: string){
//     this.name = name
//   }
// })
// const test = new Tesst('wuqiu')
// console.log(test.getName())



// 方法装饰器
// function funcDecorator(obj: any, key: string, desc: PropertyDescriptor){
//   // 如果是static静态方法 { [Function: Todo] getName: [Function] } 'getName'
//   // 普通方法 Todo { getName: [Function] } 'getName'
//   // console.log(obj, key, desc)

//   desc.value = () => '1111'
// }
// class Todo{
//   constructor(private name:string="billy"){}

//   @funcDecorator
//   getName(){
//     return this.name
//   }
// }

// const a = new Todo()
// console.log(a.getName())


// 访问器的装饰器
// function visitDecorator(obj: any, key: string, desc: PropertyDescriptor){
//   console.log(obj, key, desc)
//   // 也可以修改writable 来使其不能被改变
//   desc.writable = false
// }
// class Todo{
//   private _name: string
//   constructor(name:string){
//     this._name = name
//   }
//   @visitDecorator
//   set name(v:string){
//     this._name = v
//   }
//   get name(){
//     return this._name
//   }
// }
// const a = new Todo('billy')
// a.name = '123'
// console.log(a.name)


// 属性装饰器
// function keyDecorator(obj:any, key:string){
//   console.log(obj, key) // Todo {} 'name'
// }
// 也可以返回一个prototypedesc
// function keyDecorator(obj:any, key:string): any{
//   return {
//     writable: false
//   }
// }
// class Todo{
//   @keyDecorator
//   name: string
//   constructor(name:string){
//     this.name = name
//   }
// }
// const a = new Todo('billy')
// a.name = '123'
// console.log(a.name)


// 参数装饰器
// function paramDecorator(obj: any, key: string, index: number){
//   console.log(obj, key, index) // Todo { getSome: [Function] } 'getSome' 0
// }
// class Todo{
//   getSome(@paramDecorator a:string, b:string){
//     return `${a}, ${b}`
//   }
// }
// const a = new Todo()
// console.log(a.getSome('aaaa', 'bbb'))


// demo
const testx: any = undefined
function testDecorator(obj: any, key: string, desc: PropertyDescriptor){
  const fn = desc.value
  desc.value = () => {
    try{
      fn()
    }catch(e){
      console.log('出错了：：', e)
    }
  }
}
class Todo{
  @testDecorator
  getName(){
    return testx.name
  }
  @testDecorator
  getValue(){
    return testx.value
  }
  @testDecorator
  getAge(){
    return testx.age
  }
}
const a = new Todo()
a.getName()