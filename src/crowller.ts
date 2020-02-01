// ts -> .d.ts 翻译文件 @types/xxx -> js

import superagent from 'superagent'
import path from 'path'
import DellAnalyzer from './dellAnalyzer'



export interface Analyzer {
  handleData(html:string, filePath: string) :void
}

class Crowller{
  private key = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.key}`

  async getRawHtml(){
    const result = await superagent.get(this.url)
    return result.text
  }

  async initSprider(){
    const html = await this.getRawHtml()
    this.analyzer.handleData(html, this.filePath)
  }

  constructor(private analyzer:Analyzer, private filePath: string){
    this.initSprider()
  }
}

const filePath = path.join(__dirname, '../data/course.json')

const analyzer = new DellAnalyzer()

export default function doSomething():void{
  new Crowller(analyzer, filePath)
}

doSomething()
console.log(12333)