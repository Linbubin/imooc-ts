interface Obj {
  name: string
  age: number
  isHappy: boolean
}

class Test{
  constructor(private obj: Obj){}
  getValue<T extends keyof Obj>(key: T): Obj[T]{
    return this.obj[key]
  }
}