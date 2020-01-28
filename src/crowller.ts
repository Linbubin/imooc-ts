// ts -> .d.ts 翻译文件 @types/xxx -> js

import superagent from 'superagent'

class Crowller{
  private key = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.key}`
  private rawHtml = ''

  async getRawHtml(){
    const result = await superagent.get(this.url)
    console.log(result.text)
  }

  constructor(){
    this.getRawHtml()
  }
}

const xx = new Crowller()