import {Router, Request} from 'express'
import doSomething from './crowller'

const router = Router()

interface LoginRequest extends Request {
  body: {
    password ?: string
  }
}

router.post('/aaa', (req: LoginRequest, res) => {
  const { password } = req.body;
  if(password === '123'){
    console.log(password)
    res.end('done success')
  }else{
    res.end(`error :: ${password}`)
  }
})

router.get('/login', (req, res)=> {
  res.end(`<html>
    <body>
      <form action="/aaa" method="post">
        <input type="password" name="password" />
        <button type="submit">tijiao</button>
      </form>
    </body>
  </html>`)
})

router.get('/', (req, res) => {
  res.end('hello world')
})

export default router