import express from 'express'
import router from './router'
const app = express()

app.use(router)

app.listen(1234, () => {
  console.log('port :: 1234');
})