
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
function funcDecorator(obj: any, key: string, desc: PropertyDescriptor){
  // 如果是static静态方法 { [Function: Todo] getName: [Function] } 'getName'
  // 普通方法 Todo { getName: [Function] } 'getName'
  // console.log(obj, key, desc)

  desc.value = () => '1111'
}
class Todo{
  constructor(private name:string="billy"){}

  @funcDecorator
  getName(){
    return this.name
  }
}

const a = new Todo()
console.log(a.getName())