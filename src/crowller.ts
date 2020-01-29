// ts -> .d.ts 翻译文件 @types/xxx -> js

import superagent from 'superagent'
import cheerio from 'cheerio'

interface Course {
  title: string
  count: number
}

class Crowller{
  private key = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.key}`

  getCourseInfo(html: string){
    const $ = cheerio.load(html)
    const courseItem = $('.course-item')
    const courseInfos: Course[] = []
    courseItem.map((index, element) => {
      const desc = $(element).find('.course-desc')
      const title = desc.eq(0).text()
      const count = parseInt(desc.eq(1).text().split('：')[1])
      courseInfos.push({
        title, count
      })
    })
    const result = {
      time: new Date().getTime(),
      data: courseInfos
    }
    console.log(result)
  }

  async getRawHtml(){
    const result = await superagent.get(this.url)
    this.getCourseInfo(result.text)
  }

  constructor(){
    this.getRawHtml()
  }
}

const xx = new Crowller()