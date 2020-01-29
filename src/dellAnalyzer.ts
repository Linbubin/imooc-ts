import {Analyzer} from './crowller'
import cheerio from 'cheerio'
import fs from 'fs'

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

export default class DellAnalyzer implements Analyzer {
  private getCourseInfo(html: string){
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
  private generateJsonContent(courseInfo: CourseInfo, filePath:string){
    
    let fileContent: Content = {}
    if(fs.existsSync(filePath)){
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }

  private writeFile(content: string, filePath: string){
    fs.writeFileSync(filePath, content)
  }
  handleData(html: string, filePath: string){
    const courseInfo: CourseInfo = this.getCourseInfo(html)
    const content = this.generateJsonContent(courseInfo, filePath)
    this.writeFile(JSON.stringify(content), filePath)
  }
}