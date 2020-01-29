// ts -> .d.ts 翻译文件 @types/xxx -> js

import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface Course {
  title: string
  count: number
}

interface CourseInfo {
  time: number;
  data: Course[];
}

interface Content {
  [key: string]: Course[]
}

class Crowller{
  private key = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.key}`
  private dataJsonPath :string = ''

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
    return result
  }

  generateJsonContent(courseInfo: CourseInfo){
    this.dataJsonPath = path.join(__dirname, '../data/course.json')
    let fileContent: Content = {}
    if(fs.existsSync(this.dataJsonPath)){
      fileContent = JSON.parse(fs.readFileSync(this.dataJsonPath, 'utf8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }

  writeFile(content: string){
    fs.writeFileSync(this.dataJsonPath, content)
  }

  async getRawHtml(){
    const result = await superagent.get(this.url)
    return result.text
    
  }

  async initSprider(){
    const html = await this.getRawHtml()
    const courseInfo: CourseInfo = this.getCourseInfo(html)
    const content = this.generateJsonContent(courseInfo)
    this.writeFile(JSON.stringify(content))
  }

  constructor(){
    this.initSprider()
  }
}

const xx = new Crowller()