import {Router, Request, Response} from 'express'
import doSomething from './crowller'
import fs from 'fs'
import path from 'path'

const router = Router()

interface LoginRequest extends Request {
  body: {
    password ?: string
  }
}

router.post('/aaa', (req: LoginRequest, res) => {
  const { password } = req.body;
  if(req.session){
    const { isLogin } = req.session
    if(!isLogin){
      if(password === '123'){
        req.session.isLogin = true
        returnRes(res, '登录成功', 'search', '爬')
        res.end('')
      }else{
        returnRes(res, '密码错误', 'login', '登陆')
      }
    }else{
      returnRes(res, '已经登陆', 'search', '爬')
    }
  }else{
    res.end('session 设置失败')
  }
})

router.get('/search', (req, res) => {
  if(req.session){
    const { isLogin } = req.session
    console.log('x::', isLogin)
    if(isLogin){
      doSomething()
      returnRes(res, '爬取成功', 'seeFile', '查看文件内容')
    }else{
      returnRes(res, '未登录', 'login', '登陆')
    }
  }else{
    res.end('session 设置失败')
  }
})

router.get('/seeFile', (req, res) => {
  const filePath = path.join(__dirname, '../data/course.json')
  if(fs.existsSync(filePath)){
    const text = fs.readFileSync(filePath, 'utf8')
    res.json(JSON.parse(text))
  }else{
    returnRes(res, '文件不存在，请先爬取', 'search', '爬')
  }
})

router.get('/login', (req, res)=> {
  if(req.session){
    const { isLogin } = req.session
    if(isLogin){
      returnRes(res, '已经登陆', 'logout', '注销')
    }else{
      res.end(`<html>
        <body>
          <form action="/aaa" method="post">
            <input type="password" name="password" />
            <button type="submit">tijiao</button>
          </form>
        </body>
      </html>`)
    }
  }else{
    res.end('session 设置失败')
  }
})

router.get('/logout', (req, res) => {
  if(req.session){
    const { isLogin } = req.session
    let text: string
    if(isLogin){
      req.session.isLogin = false
      text = '已经注销'
      
    }else{
      text = '未登录'
    }
    returnRes(res, text, 'login', '登陆')
  }else{
    res.end('session 设置失败')
  }
})

router.get('/', (req, res) => {
  returnRes(res, 'hello world', 'login', '请登陆')
})

function returnRes(res: Response, text: string, url: string, urltext:string){
  res.end(`
    <html>
      <body>
        <h1>${text}</h1>
        <a href="/${url}">${urltext}</a>
      </body>
    </html>
  `)
}

export default router