import express from 'express'
import router from './router'
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
const app = express()

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');//设置response编码为utf-8
  next()
})

// session
app.use(cookieSession({
  name: 'session',
  keys: ['billy'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)

app.listen(1234, () => {
  console.log('port :: 1234');
})