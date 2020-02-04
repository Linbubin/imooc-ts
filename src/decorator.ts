
function Todo(){
  return function <T extends new (...arg:any[])=>any>(constructor: T){
    return class extends constructor{
      name = 'billy'
      getName(){
        return this.name
      }
    }
  }
}

const Tesst = Todo()(class Person{
  name: string
  constructor(name: string){
    this.name = name
  }
})

const test = new Tesst('wuqiu')

console.log(test.getName())
